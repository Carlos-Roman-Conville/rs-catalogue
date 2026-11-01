// @rex/catalogue: the public surface grows unit by unit (DESIGN §2.2).
import { qualify } from '@rex/kernel'
import { fileURLToPath } from 'node:url'
import { filterWithheldRecord, createWithholdGuard } from './benchmark.ts'
import { compileCatalogue, readCompiledCatalogue } from './build.ts'
import { checkRecords } from './check.ts'
import { createIdResolver, loadRecordsSync } from './load.ts'
import { createDateReader } from './date-reader.ts'
import { createLabeler } from './label.ts'
import { createWindowQuery } from './window.ts'
export * from './schema.ts'
export * from './load.ts'
export * from './check.ts'
export * from './dates.ts'
export * from './regions.ts'
export * from './window.ts'

/** The engine prefix every catalogue id carries (DESIGN §2.1). */
export const ENGINE = 'catalogue'

/** Qualify a local id `<kind>.<slug>` as `catalogue/<kind>.<slug>`. */
export function catalogueId(local: string): string {
  return qualify(ENGINE, local)
}

export interface OpenOptions {
  heldOut?: 'withhold' | 'include'
  /** Path to `dist/catalogue.json` (or equivalent); reads the snapshot instead of `data/`. */
  compiled?: string
}

/** Load and validate a snapshot of native data and fixture records once, for configuration. */
export function openCatalogue(
  repoRoot = fileURLToPath(new URL('../', import.meta.url)),
  options: OpenOptions = {},
) {
  const heldOut = options.heldOut ?? 'withhold'
  let catalogue
  let catalogue_hash: string
  if (options.compiled) {
    const loaded = readCompiledCatalogue(options.compiled)
    catalogue = loaded.catalogue
    catalogue_hash = loaded.catalogue_hash
  } else {
    catalogue = loadRecordsSync(repoRoot)
    const failures = checkRecords(catalogue)
    if (failures.length) throw new Error(`Invalid catalogue:\n${failures.join('\n')}`)
    catalogue_hash = compileCatalogue(catalogue).hash
  }
  const resolve = createIdResolver(catalogue)
  const guard = createWithholdGuard(catalogue, heldOut)
  const records = new Map(catalogue.records.map(record => [record.id, record]))
  const { label } = createLabeler(catalogue)
  const { date } = createDateReader(catalogue)
  return {
    catalogue_hash,
    get(id: string) {
      const record = records.get(resolve(id) ?? '')
      if (record === undefined) return undefined
      const clone = structuredClone(record)
      return heldOut === 'withhold' ? filterWithheldRecord(clone, guard) : clone
    },
    window: createWindowQuery(catalogue, { heldOut }),
    label,
    date,
  }
}
