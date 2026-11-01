// @rex/catalogue: the public surface grows unit by unit (DESIGN §2.2).
import { qualify } from '@rex/kernel'
import { fileURLToPath } from 'node:url'
import { filterWithheldRecord, createWithholdGuard } from './benchmark.ts'
import { checkRecords } from './check.ts'
import { createIdResolver, loadRecordsSync } from './load.ts'
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
}

/** Load and validate a snapshot of native data and fixture records once, for configuration. */
export function openCatalogue(
  repoRoot = fileURLToPath(new URL('../', import.meta.url)),
  options: OpenOptions = {},
) {
  const heldOut = options.heldOut ?? 'withhold'
  const catalogue = loadRecordsSync(repoRoot)
  const failures = checkRecords(catalogue)
  if (failures.length) throw new Error(`Invalid catalogue:\n${failures.join('\n')}`)
  const resolve = createIdResolver(catalogue)
  const guard = createWithholdGuard(catalogue, heldOut)
  const records = new Map(catalogue.records.map(record => [record.id, record]))
  const { label } = createLabeler(catalogue)
  return {
    get(id: string) {
      const record = records.get(resolve(id) ?? '')
      if (record === undefined) return undefined
      const clone = structuredClone(record)
      return heldOut === 'withhold' ? filterWithheldRecord(clone, guard) : clone
    },
    window: createWindowQuery(catalogue, { heldOut }),
    label,
  }
}
