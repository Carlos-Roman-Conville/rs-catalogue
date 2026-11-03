import { createIdResolver } from './load.ts'
import type { LoadedCatalogue } from './load.ts'
import { createWithholdGuard } from './benchmark.ts'
import { createRegionIndex, dateRange, overlapDates } from './regions.ts'
import { kinds } from './schema.ts'
import { canonical } from './canonical.ts'
import type { Attestation, CatalogueRecord, DatePoint, Evidence, Kind, Provenance } from './schema.ts'

export interface WindowQuery {
  region: string
  from: DatePoint
  to: DatePoint
  kinds?: readonly Kind[]
  provenance?: readonly Provenance[]
  /** Explicit scopes are added to universal. Provenance is filtered independently. */
  scope?: CatalogueRecord['scope'] | readonly CatalogueRecord['scope'][]
  includeKnownElsewhere?: boolean
}
export interface KindCoverage {
  kind: Kind
  present: number
  possible: number
  onlyEstimateFictionOpen: number
  /** Number of eligible, locally placed presence attestations with no date, not records. */
  undated: number
  /** Attestation and observation rows dropped by the held-out guard. */
  withheld: number
}
type WindowEvidence<T> = T extends CatalogueRecord ? Omit<T, 'attestations' | 'observations'> & {
  attestations: (Attestation & { overlap: 'confirmed' | 'possible' })[]
  observations: (CatalogueRecord['observations'][number] & { overlap: 'confirmed' | 'possible' })[]
} : never
export type WindowEntry = WindowEvidence<CatalogueRecord>
export interface WindowResult {
  present: WindowEntry[]
  possible: WindowEntry[]
  knownElsewhere: WindowEntry[]
  coverage: KindCoverage[]
}

const presence = new Set<Attestation['what']>(['presence', 'adoption', 'spread_to', 'origin', 'invention', 'earliest_evidence'])
const defaultProvenance: readonly Provenance[] = ['real', 'prehistoric', 'mythological']
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0

function sortedEvidence<T extends Evidence>(rows: T[]): T[] {
  return rows.map(row => canonical(row) as T).sort((a, b) => compare(JSON.stringify(a), JSON.stringify(b)))
}
function entry(record: CatalogueRecord, attestations: WindowEntry['attestations'], observations: WindowEntry['observations']): WindowEntry {
  return canonical({ ...record, attestations: sortedEvidence(attestations), observations: sortedEvidence(observations) }) as WindowEntry
}

export interface WindowQueryOptions {
  heldOut?: 'withhold' | 'include'
}

/** Read-only reference query; membership and evidence each overlap the requested window. */
export function createWindowQuery(
  catalogue: Pick<LoadedCatalogue, 'records' | 'aliases'>,
  options: WindowQueryOptions = {},
): (query: WindowQuery) => WindowResult {
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const guard = createWithholdGuard(catalogue, options.heldOut ?? 'withhold')
  const records = [...catalogue.records].sort((a, b) => compare(a.id, b.id))
  return query => {
    const range = dateRange(query.from, query.to)
    const places = new Set(regions.descendantsDuring(query.region, query.from, query.to))
    const selectedKinds = [...new Set(query.kinds ?? kinds)].sort()
    const provenance = new Set(query.provenance ?? defaultProvenance)
    const scopes = new Set(['universal', ...(typeof query.scope === 'string' ? [query.scope] : query.scope ?? [])])
    const coverage = selectedKinds.map(kind => ({ kind, present: 0, possible: 0, onlyEstimateFictionOpen: 0, undated: 0, withheld: 0 }))
    const byKind = new Map(coverage.map(row => [row.kind, row]))
    const result: WindowResult = { present: [], possible: [], knownElsewhere: [], coverage }
    const local = (row: Evidence) => row.place !== null && places.has(resolve(row.place) ?? '')
    const overlap = (row: Evidence) => row.date === null ? 'none' : overlapDates(row.date, range)
    const elsewhere = (row: Evidence) => row.place !== null && resolve(row.place) !== undefined && !local(row)
    const annotate = <T extends Evidence>(rows: T[]): (T & { overlap: 'confirmed' | 'possible' })[] =>
      rows.map(row => ({ ...row, overlap: overlap(row) as 'confirmed' | 'possible' }))
    for (const record of records) {
      const counts = byKind.get(record.kind)
      if (!counts || !scopes.has(record.scope) || !record.provenance.some(p => provenance.has(p))) continue
      const attestations = record.attestations.filter(row => presence.has(row.what))
      for (const row of attestations) {
        if (row.date === null && local(row)) {
          if (guard.isWithheld(row)) counts.withheld++
          else counts.undated++
        }
      }
      const matching = annotate(attestations.filter(row => local(row) && overlap(row) !== 'none' && !guard.isWithheld(row)))
      const observations = annotate(record.observations.filter(row => local(row) && overlap(row) !== 'none' && !guard.isWithheld(row)))
      for (const row of [...attestations, ...record.observations]) {
        if (local(row) && overlap(row) !== 'none' && guard.isWithheld(row)) counts.withheld++
      }
      if (matching.length || observations.length) {
        const confirmed = [...matching, ...observations].some(row => row.overlap === 'confirmed')
        result[confirmed ? 'present' : 'possible'].push(entry(record, matching, observations))
        counts[confirmed ? 'present' : 'possible']++
        if (confirmed && [...matching, ...observations].filter(row => row.overlap === 'confirmed').every(row => row.label !== 'researched')) counts.onlyEstimateFictionOpen++
      } else if (query.includeKnownElsewhere) {
        // Possible overlap does not establish known-elsewhere membership.
        const rows = attestations.filter(row => elsewhere(row) && overlap(row) === 'confirmed')
        for (const row of rows) if (guard.isWithheld(row)) counts.withheld++
        const visible = annotate(rows.filter(row => !guard.isWithheld(row)))
        if (visible.length) result.knownElsewhere.push(entry(record, visible, []))
      }
    }
    return result
  }
}
