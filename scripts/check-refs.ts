import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { openCatalogue } from '../src/index.ts'
import { findRefs, resolveRef } from '../src/refs.ts'
import type { ReferenceCatalogue } from '../src/refs.ts'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
function files(dir: string, extension: string): string[] {
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error }
  return entries.flatMap(entry => {
    if (['node_modules', 'dist'].includes(entry.name)) return []
    const path = join(dir, entry.name)
    return entry.isDirectory() ? files(path, extension) : entry.isFile() && path.endsWith(extension) ? [path] : []
  }).sort()
}

/** Read-only scan; all engine data is universal, while source may mention game fixtures. */
export function checkRefs(root: string, catalogue: ReferenceCatalogue) {
  const failures: string[] = []
  const counts: { engine: string; count: number }[] = []
  for (const engine of readdirSync(root, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!engine.isDirectory() || ['catalogue', 'node_modules', 'dist'].includes(engine.name)) continue
    const engineRoot = join(root, engine.name)
    if (resolve(engineRoot) === resolve(repoRoot)) continue
    let count = 0
    for (const [folder, extension] of [['data', '.json'], ['src', '.ts']] as const) {
      for (const file of files(join(engineRoot, folder), extension)) {
        for (const { ref, line } of findRefs(readFileSync(file, 'utf8'))) {
          count++
          const result = resolveRef(catalogue, ref)
          const reason = !result.ok ? result.reason : folder === 'data' && result.record.scope !== 'universal'
            ? `universal data references ${result.record.scope}` : undefined
          if (reason) failures.push(`${file}:${line}: ${ref}: ${reason}`)
        }
      }
    }
    counts.push({ engine: engine.name, count })
  }
  return { failures, counts }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length && (args.length !== 2 || args[0] !== '--root')) {
    console.error('Usage: check-refs.ts [--root <dir>]')
    process.exitCode = 1
  } else {
    const result = checkRefs(args[1] ?? 'E:/AI Programs/Toolchain', openCatalogue(repoRoot))
    for (const { engine, count } of result.counts) console.log(`${engine}: ${count} refs`)
    if (!result.counts.some(row => row.count)) console.log('0 refs')
    for (const failure of result.failures) console.error(failure)
    if (result.failures.length) process.exitCode = 1
  }
}
