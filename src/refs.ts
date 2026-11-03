import type { LoadedCatalogue } from './load.ts'
import { kinds } from './schema.ts'
import type { CatalogueRecord, Provenance } from './schema.ts'

/** Opened catalogues have already validated alias uniqueness and cycles. */
export type ReferenceCatalogue = Pick<LoadedCatalogue, 'records' | 'aliases'> | {
  get(id: string): CatalogueRecord | undefined
}
export type RefResult = { ok: true; record: CatalogueRecord } |
  { ok: false; reason: 'unknown' | 'alias-cycle' | 'malformed' }
const idPattern = new RegExp(`^catalogue/(${kinds.join('|')})\\.[a-z0-9]+(?:-[a-z0-9]+)*(?:\\.[0-9]+)?$`)

/** Resolve once at configuration/load time, never during a simulation run. */
export function resolveRef(catalogue: ReferenceCatalogue, id: string): RefResult {
  const seen = new Set<string>()
  while (true) {
    if (!idPattern.test(id)) return { ok: false, reason: 'malformed' }
    if (seen.has(id)) return { ok: false, reason: 'alias-cycle' }
    seen.add(id)
    if ('get' in catalogue) {
      const record = catalogue.get(id)
      return record ? { ok: true, record } : { ok: false, reason: 'unknown' }
    }
    const aliases = catalogue.aliases.filter(alias => alias.old === id)
    // Ambiguous input cannot select exactly one canonical record.
    if (aliases.length > 1) return { ok: false, reason: 'malformed' }
    if (aliases.length) { id = aliases[0]!.new; continue }
    const records = catalogue.records.filter(record => record.id === id)
    if (records.length > 1) return { ok: false, reason: 'malformed' }
    return records.length ? { ok: true, record: records[0]! } : { ok: false, reason: 'unknown' }
  }
}

/** Text scan (including comments); retain invalid kinds/slugs for resolver diagnostics. */
export function findRefs(text: string): { ref: string; line: number }[] {
  const refs: { ref: string; line: number }[] = []
  text.split(/\r\n|\n|\r/).forEach((line, index) => {
    for (const match of line.matchAll(/\bcatalogue\/[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z0-9_.-]+/g)) {
      refs.push({ ref: match[0], line: index + 1 })
    }
  })
  return refs
}

export interface PermitDeclaration {
  provenance: Provenance[]
  scope: 'universal' | `game:${string}`
}
export const DEFAULT_PERMIT: PermitDeclaration = {
  provenance: ['real', 'prehistoric', 'mythological'], scope: 'universal',
}

/** Every provenance class must be declared; universal records fit any scope. */
export function permits(catalogue: ReferenceCatalogue, ref: string, declared: PermitDeclaration): { ok: boolean; reason: string } {
  const result = resolveRef(catalogue, ref)
  if (!result.ok) return result
  const record = result.record
  const excluded = record.provenance.filter(value => !declared.provenance.includes(value))
  if (excluded.length) return { ok: false, reason: `provenance not declared: ${excluded.join(', ')}` }
  if (record.scope !== 'universal' && record.scope !== declared.scope) {
    return { ok: false, reason: `scope not declared: ${record.scope}` }
  }
  return { ok: true, reason: 'permitted' }
}
