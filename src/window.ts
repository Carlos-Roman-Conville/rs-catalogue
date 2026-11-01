import { createIdResolver } from './load.ts'
import type { LoadedCatalogue } from './load.ts'
import { createRegionIndex, dateRange, intersectDates } from './regions.ts'
import { kinds } from './schema.ts'
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
  onlyEstimateFictionOpen: number
  /** Number of eligible, locally placed presence attestations with no date, not records. */
  undated: number
}
export interface WindowResult {
  present: CatalogueRecord[]
  knownElsewhere: CatalogueRecord[]
  coverage: KindCoverage[]
}

const presence = new Set<Attestation['what']>(['presence', 'adoption', 'spread_to', 'origin', 'invention', 'earliest_evidence'])
const defaultProvenance: readonly Provenance[] = ['real', 'prehistoric', 'mythological']
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0

// Canonical object keys and evidence ordering make JSON independent of file/key order.
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => compare(a, b)).map(([key, v]) => [key, canonical(v)]))
  }
  return value
}
function sortedEvidence<T extends Evidence>(rows: T[]): T[] {
  return rows.map(row => canonical(row) as T).sort((a, b) => compare(JSON.stringify(a), JSON.stringify(b)))
}
function entry(record: CatalogueRecord, attestations: Attestation[], observations: CatalogueRecord['observations']): CatalogueRecord {
  return canonical({ ...record, attestations: sortedEvidence(attestations), observations: sortedEvidence(observations) }) as CatalogueRecord
}

/** Read-only reference query; membership and evidence each overlap the requested window. */
export function createWindowQuery(catalogue: Pick<LoadedCatalogue, 'records' | 'aliases'>): (query: WindowQuery) => WindowResult {
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const records = [...catalogue.records].sort((a, b) => compare(a.id, b.id))
  return query => {
    const range = dateRange(query.from, query.to)
    const places = new Set(regions.descendantsDuring(query.region, query.from, query.to))
    const selectedKinds = [...new Set(query.kinds ?? kinds)].sort()
    const provenance = new Set(query.provenance ?? defaultProvenance)
    const scopes = new Set(['universal', ...(typeof query.scope === 'string' ? [query.scope] : query.scope ?? [])])
    const coverage = selectedKinds.map(kind => ({ kind, present: 0, onlyEstimateFictionOpen: 0, undated: 0 }))
    const byKind = new Map(coverage.map(row => [row.kind, row]))
    const result: WindowResult = { present: [], knownElsewhere: [], coverage }
    const local = (row: Evidence) => row.place !== null && places.has(resolve(row.place) ?? '')
    const inWindow = (row: Evidence) => row.date !== null && !!intersectDates(range, dateRange(row.date.from, row.date.to))
    for (const record of records) {
      const counts = byKind.get(record.kind)
      if (!counts || !scopes.has(record.scope) || !record.provenance.some(p => provenance.has(p))) continue
      const attestations = record.attestations.filter(row => presence.has(row.what))
      counts.undated += attestations.filter(row => row.date === null && local(row)).length
      const matching = attestations.filter(row => local(row) && inWindow(row))
      const observations = record.observations.filter(row => local(row) && inWindow(row))
      if (matching.length || observations.length) {
        result.present.push(entry(record, matching, observations))
        counts.present++
        if ([...matching, ...observations].every(row => row.label !== 'researched')) counts.onlyEstimateFictionOpen++
      } else if (query.includeKnownElsewhere) {
        const elsewhere = attestations.filter(row => row.place !== null && resolve(row.place) !== undefined && !local(row) && inWindow(row))
        if (elsewhere.length) result.knownElsewhere.push(entry(record, elsewhere, []))
      }
    }
    return result
  }
}
