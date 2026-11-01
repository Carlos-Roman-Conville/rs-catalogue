import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { checkRecords } from './check.ts'
import { canonical } from './canonical.ts'
import type { Alias, LoadedCatalogue, LoadedRecord } from './load.ts'
import { validateRecord } from './schema.ts'
import type { CatalogueRecord } from './schema.ts'

const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0

function compilePayload(catalogue: LoadedCatalogue): string {
  const records = [...catalogue.records].sort((a, b) => compare(a.id, b.id))
  const aliases = [...catalogue.aliases].sort((a, b) => compare(a.old, b.old))
  const body = canonical({ format: 1, records, aliases })
  return `${JSON.stringify(body)}\n`
}

/** Canonical UTF-8 snapshot and lowercase hex sha256 of its bytes. Throws when `checkRecords` fails. */
export function compileCatalogue(catalogue: LoadedCatalogue): { json: string; hash: string } {
  const failures = checkRecords(catalogue)
  if (failures.length) throw new Error(`Invalid catalogue:\n${failures.join('\n')}`)
  const json = compilePayload(catalogue)
  const hash = createHash('sha256').update(json, 'utf8').digest('hex')
  return { json, hash }
}

function parseCompiledText(text: string): LoadedCatalogue {
  let value: unknown
  try { value = JSON.parse(text) as unknown }
  catch { return { records: [], entries: [], aliases: [], failures: ['compiled catalogue: bad JSON'] } }
  if (value === null || typeof value !== 'object' || !('format' in value) || (value as { format: unknown }).format !== 1) {
    return { records: [], entries: [], aliases: [], failures: ['compiled catalogue: expected format 1'] }
  }
  const root = value as { records?: unknown; aliases?: unknown }
  if (!Array.isArray(root.records)) return { records: [], entries: [], aliases: [], failures: ['compiled catalogue: expected records array'] }
  if (!Array.isArray(root.aliases)) return { records: [], entries: [], aliases: [], failures: ['compiled catalogue: expected aliases array'] }
  const failures: string[] = [], entries: LoadedRecord[] = [], aliases: Alias[] = []
  root.records.forEach((row: unknown, i) => {
    const errors = validateRecord(row)
    failures.push(...errors.map(error => `compiled catalogue records[${i}]: ${error}`))
    if (!errors.length) {
      const record = row as CatalogueRecord
      const match = /^catalogue\/([a-z_]+)\.([a-z0-9]+(?:-[a-z0-9]+)*(?:\.[0-9]+)?)$/.exec(record.id)
      const slug = match?.[2] ?? record.id.split('/').at(-1) ?? 'record'
      const kind = match?.[1] ?? record.kind
      const file = record.scope === 'universal'
        ? `data/${kind}/${slug}.json`
        : `fixtures/_compiled/${kind}/${slug}.json`
      entries.push({ file, record })
    }
  })
  root.aliases.forEach((row: unknown, i) => {
    if (row === null || typeof row !== 'object' || !('old' in row) || !('new' in row) || typeof (row as Alias).old !== 'string' || typeof (row as Alias).new !== 'string') {
      failures.push(`compiled catalogue aliases[${i}]: expected {old, new} strings`)
    } else aliases.push({ old: (row as Alias).old, new: (row as Alias).new })
  })
  entries.sort((a, b) => compare(a.record.id, b.record.id) || compare(a.file, b.file))
  aliases.sort((a, b) => compare(a.old, b.old))
  return { records: entries.map(entry => entry.record), entries, aliases, failures: failures.sort() }
}

/** Load a compiled snapshot; `catalogue_hash` is sha256 of the file bytes exactly as stored. */
export function readCompiledCatalogue(filePath: string): { catalogue: LoadedCatalogue; catalogue_hash: string } {
  const text = readFileSync(filePath, 'utf8')
  const catalogue_hash = createHash('sha256').update(text, 'utf8').digest('hex')
  const catalogue = parseCompiledText(text)
  const failures = [...catalogue.failures, ...checkRecords(catalogue)]
  if (failures.length) throw new Error(`Invalid catalogue:\n${failures.join('\n')}`)
  return { catalogue, catalogue_hash }
}
