import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { HARNESS_PATHS } from './benchmark.ts'

/** Immediate engine directories only; dependencies and the catalogue itself are exempt. */
export function toolchainEngines(root: string): string[] {
  return readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !['catalogue', 'node_modules'].includes(entry.name))
    .filter(entry => existsSync(join(root, entry.name, 'kernel.json')) || existsSync(join(root, entry.name, 'src')))
    .map(entry => entry.name).sort()
}

type Token = { text: string; offset: number; quoted: boolean }

// Keep strings atomic and discard comments, so documentation is not mistaken for an import.
function tokens(source: string): Token[] {
  const pattern = /\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[\w$]+|[^\s]/g
  return [...source.matchAll(pattern)]
    .filter(match => !match[0].startsWith('//') && !match[0].startsWith('/*'))
    .map(match => ({ text: match[0], offset: match.index, quoted: /^["'`]/.test(match[0]) }))
}

function importFailures(source: string, file: string, root: string): number[] {
  const ts = tokens(source)
  const failures: number[] = []
  const text = (i: number) => ts[i]?.text
  const catalogueSource = resolve(root, 'catalogue', 'src') + sep
  const isCatalogue = (i: number): boolean => {
    if (!ts[i]?.quoted) return false
    const specifier = text(i).slice(1, -1)
    if (specifier === '@rex/catalogue' || specifier.startsWith('@rex/catalogue/')) return true
    return (specifier.startsWith('./') || specifier.startsWith('../')) &&
      resolve(dirname(file), specifier).startsWith(catalogueSource)
  }
  const namedLabels = (start: number, end: number, separator: string): boolean => {
    if (text(start) !== '{' || text(end - 1) !== '}') return false
    const names = ts.slice(start + 1, end - 1).map(t => t.text).join(' ')
    return names.split(',').filter(part => part.trim()).length > 0 &&
      names.split(',').filter(part => part.trim()).every(part =>
        new RegExp(`^\\s*(?:type\\s+)?label(?:\\s+${separator}\\s+[\\w$]+)?\\s*$`).test(part))
  }
  for (let i = 0; i < ts.length; i++) {
    if (ts[i].quoted || !['import', 'require', 'export'].includes(text(i))) continue
    if (text(i - 1) === '.') continue
    if (text(i + 1) === '(') {
      if (!isCatalogue(i + 2) || text(i + 3) !== ')') continue
      let start = i
      if (text(start - 1) === 'await') start--
      // A direct .label selection, or a label-only destructuring assignment, is safe.
      let end = i + 4
      while (text(start - 1) === '(' && text(end) === ')') { start--; end++ }
      let allowed = text(end) === '.' && text(end + 1) === 'label'
      if (text(start - 1) === '=') {
        let binding = start - 2
        while (binding >= 0 && !['const', 'let', 'var', ';', '='].includes(text(binding))) binding--
        allowed ||= ['const', 'let', 'var'].includes(text(binding)) && namedLabels(binding + 1, start - 1, ':')
      }
      if (!allowed) failures.push(ts[i].offset)
      continue
    }
    if (text(i) === 'require') continue
    let end = i + 1
    while (end < ts.length && ![';', 'from'].includes(text(end)) && !ts[end].quoted) end++
    const module = text(end) === 'from' ? end + 1 : end
    if (!isCatalogue(module)) continue
    const start = text(i + 1) === 'type' ? i + 2 : i + 1
    if (!namedLabels(start, end, 'as')) failures.push(ts[i].offset)
  }
  return failures
}

function heldOutIncludeFailures(source: string, file: string, root: string): number[] {
  const ts = tokens(source)
  const failures: number[] = []
  const text = (i: number) => ts[i]?.text
  const catalogueTest = resolve(root, 'catalogue', 'test') + sep
  if (resolve(file).startsWith(catalogueTest)) return failures
  const relative = file.startsWith(root) ? file.slice(root.length).replace(/^[/\\]/, '').replaceAll('\\', '/') : file.replaceAll('\\', '/')
  if (HARNESS_PATHS.includes(relative)) return failures
  for (let i = 0; i < ts.length; i++) {
    if (text(i) !== 'heldOut') continue
    let j = i + 1
    while (j < ts.length && text(j) !== ':' && text(j) !== 'include' && !ts[j]?.quoted) j++
    if (text(j) !== ':') continue
    j++
    while (j < ts.length && text(j) !== 'include' && !ts[j]?.quoted) j++
    if (ts[j]?.quoted && text(j).slice(1, -1) === 'include') failures.push(ts[i].offset)
  }
  return failures
}

function kernelFailures(value: unknown, path: string, failures: string[]): void {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) {
    value.forEach((child, i) => kernelFailures(child, `${path}[${i}]`, failures))
    return
  }
  const row = value as Record<string, unknown>
  const check = (quantity: unknown, location: string) => {
    if (typeof quantity === 'string' && quantity.startsWith('catalogue.') && !quantity.includes('label')) {
      failures.push(`${location}: forbidden catalogue read ${quantity} (labels only)`)
    } else if (quantity && typeof quantity === 'object') {
      const ref = quantity as Record<string, unknown>
      check(ref.quantity ?? ref.id, location)
    }
  }
  for (const [key, child] of Object.entries(row)) {
    if (key === 'reads' || key === 'read') {
      if (Array.isArray(child)) child.forEach((q, i) => check(q, `${path}.${key}[${i}]`))
      else check(child, `${path}.${key}`)
    }
    kernelFailures(child, `${path}.${key}`, failures)
  }
  if (row.direction === 'in' || row.direction === 'input') check(row.quantity, `${path}.quantity`)
}

/** V2a: inspect text only, never import or execute an engine. Returns sorted failure lines. */
export function scanToolchain(root: string): string[] {
  const failures: string[] = []
  for (const engine of toolchainEngines(root)) {
    const kernel = join(root, engine, 'kernel.json')
    if (existsSync(kernel)) {
      try { kernelFailures(JSON.parse(readFileSync(kernel, 'utf8')), `${engine}/kernel.json`, failures) }
      catch { failures.push(`${engine}/kernel.json: cannot read valid JSON`) }
    }
    const walk = (relative: string) => {
      for (const entry of readdirSync(join(root, relative), { withFileTypes: true })) {
        if (entry.name === 'node_modules') continue
        const file = `${relative}/${entry.name}`
        if (entry.isDirectory()) walk(file)
        else if (entry.isFile()) {
          const absolute = join(root, file)
          const source = readFileSync(absolute, 'utf8')
          for (const offset of importFailures(source, absolute, root)) {
            const line = source.slice(0, offset).split('\n').length
            failures.push(`${file}:${line}: forbidden @rex/catalogue import (labels only)`)
          }
          for (const offset of heldOutIncludeFailures(source, absolute, root)) {
            const line = source.slice(0, offset).split('\n').length
            failures.push(`${file}:${line}: forbidden heldOut include (harness only)`)
          }
        }
      }
    }
    if (existsSync(join(root, engine, 'src'))) walk(`${engine}/src`)
  }
  return failures.sort()
}
