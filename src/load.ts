import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { validateRecord } from './schema.ts'
import type { CatalogueRecord } from './schema.ts'

export interface Alias { old: string; new: string }
export interface LoadedRecord { file: string; record: CatalogueRecord }
export interface LoadedCatalogue { records: CatalogueRecord[]; entries: LoadedRecord[]; aliases: Alias[]; failures: string[] }

function children(dir: string) {
  try { return readdirSync(dir, { withFileTypes: true }) }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error }
}
function jsonFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of children(dir)) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...jsonFiles(path))
    else if (entry.isFile() && entry.name.endsWith('.json')) files.push(path)
  }
  return files.sort()
}
/** Load valid records and retain parse/schema failures for the V1 checker. Missing roots are empty. */
export function loadRecordsSync(repoRoot: string): LoadedCatalogue {
  const entries: LoadedRecord[] = [], aliases: Alias[] = [], failures: string[] = []
  const aliasPath = join(repoRoot, 'data', 'aliases.json')
  const files = jsonFiles(join(repoRoot, 'data')).filter(file => file !== aliasPath)
  for (const fixture of children(join(repoRoot, 'fixtures'))) {
    if (fixture.isDirectory()) files.push(...jsonFiles(join(repoRoot, 'fixtures', fixture.name, 'records')))
  }
  const display = (file: string) => relative(repoRoot, file).replaceAll('\\', '/')
  function parse(file: string): unknown {
    const text = readFileSync(file, 'utf8')
    try { return JSON.parse(text) as unknown }
    catch { failures.push(`${display(file)}: bad JSON`); return undefined }
  }
  for (const file of files.sort()) {
    const value = parse(file)
    if (value === undefined) continue
    const errors = validateRecord(value)
    failures.push(...errors.map(error => `${display(file)}: ${error}`))
    if (!errors.length) entries.push({ file: display(file), record: value as CatalogueRecord })
  }
  try {
    const value = parse(aliasPath)
    if (value !== undefined) {
      if (!Array.isArray(value)) failures.push('data/aliases.json: expected array')
      else value.forEach((row: unknown, i) => {
        if (row === null || typeof row !== 'object' || !('old' in row) || !('new' in row) || typeof row.old !== 'string' || typeof row.new !== 'string' || !row.old || !row.new) failures.push(`data/aliases.json[${i}]: expected {old, new} strings`)
        else aliases.push({ old: row.old, new: row.new })
      })
    }
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  entries.sort((a, b) => a.record.id < b.record.id ? -1 : a.record.id > b.record.id ? 1 : a.file < b.file ? -1 : a.file > b.file ? 1 : 0)
  aliases.sort((a, b) => a.old < b.old ? -1 : a.old > b.old ? 1 : 0)
  return { records: entries.map(entry => entry.record), entries, aliases, failures: failures.sort() }
}

/** Async compatibility entry point for existing loaders and check scripts. */
export async function loadRecords(repoRoot: string): Promise<LoadedCatalogue> {
  return loadRecordsSync(repoRoot)
}

/** Resolve alias chains; cycles and dangling references have no live result. */
export function createIdResolver(catalogue: Pick<LoadedCatalogue, 'records' | 'aliases'>) {
  const ids = new Set(catalogue.records.map(record => record.id))
  const aliases = new Map(catalogue.aliases.map(alias => [alias.old, alias.new]))
  return (id: string): string | undefined => {
    const seen = new Set<string>()
    while (aliases.has(id)) {
      if (seen.has(id)) return undefined
      seen.add(id)
      id = aliases.get(id)!
    }
    return ids.has(id) ? id : undefined
  }
}
