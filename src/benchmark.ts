import { dateRange, intersectDates, createRegionIndex } from './regions.ts'
import type { LoadedCatalogue } from './load.ts'
import { createIdResolver } from './load.ts'
import type { CatalogueRecord, DatePoint, Evidence, Observation } from './schema.ts'

export type BenchmarkRole = 'development' | 'held_out' | 'reserve'

export interface BenchmarkWindow {
  id: 'H1' | 'H2' | 'H3' | 'H4' | 'H5'
  region: string
  from: DatePoint
  to: DatePoint
  role: BenchmarkRole
}

export const BENCHMARK_WINDOWS: readonly BenchmarkWindow[] = [
  { id: 'H1', region: 'catalogue/region.england', from: { year: 1270 }, to: { year: 1700 }, role: 'development' },
  { id: 'H2', region: 'catalogue/region.japan', from: { year: 1600 }, to: { year: 1868 }, role: 'development' },
  { id: 'H3', region: 'catalogue/region.greenland', from: { year: 985 }, to: { year: 1450 }, role: 'held_out' },
  { id: 'H4', region: 'catalogue/region.copan-valley', from: { year: 400 }, to: { year: 1200 }, role: 'held_out' },
  { id: 'H5', region: 'catalogue/region.iceland', from: { year: 874 }, to: { year: 1300 }, role: 'reserve' },
]

/** Paths allowed to pass `heldOut: 'include'` through static scan (P11 harness). */
export const HARNESS_PATHS: readonly string[] = []

type RegionIndex = ReturnType<typeof createRegionIndex>

function regionExists(records: readonly CatalogueRecord[], resolve: (id: string) => string | undefined, region: string): boolean {
  const id = resolve(region) ?? region
  return records.some(record => record.id === id)
}

/** Windows whose benchmark region is present in the catalogue. */
export function activeBenchmarkWindows(
  records: readonly CatalogueRecord[],
  resolve: (id: string) => string | undefined,
): BenchmarkWindow[] {
  return BENCHMARK_WINDOWS.filter(window => regionExists(records, resolve, window.region))
}

function placeInWindowRegion(
  place: string,
  window: BenchmarkWindow,
  regions: RegionIndex,
  resolve: (id: string) => string | undefined,
): boolean {
  const resolved = resolve(place)
  if (resolved === undefined) return false
  const places = new Set(regions.descendantsDuring(window.region, window.from, window.to))
  return places.has(resolved)
}

/** Dated evidence overlapping a benchmark window in place and time (role check). */
export function observationInBenchmarkWindow(
  observation: Observation,
  window: BenchmarkWindow,
  regions: RegionIndex,
  resolve: (id: string) => string | undefined,
): boolean {
  if (observation.place === null) return false
  if (!placeInWindowRegion(observation.place, window, regions, resolve)) return false
  if (observation.date === null) return true
  return !!intersectDates(dateRange(window.from, window.to), dateRange(observation.date.from, observation.date.to))
}

/** Evidence withheld from tuning units when `heldOut` is `withhold`. */
export function evidenceInHeldOutWindow(
  row: Evidence,
  window: BenchmarkWindow,
  regions: RegionIndex,
  resolve: (id: string) => string | undefined,
): boolean {
  if (window.role !== 'held_out' || row.place === null) return false
  if (!placeInWindowRegion(row.place, window, regions, resolve)) return false
  if (row.date === null) return true
  return !!intersectDates(dateRange(window.from, window.to), dateRange(row.date.from, row.date.to))
}

export function checkObservationBenchmarkRole(
  observation: Observation,
  windows: readonly BenchmarkWindow[],
  regions: RegionIndex,
  resolve: (id: string) => string | undefined,
): string | undefined {
  const inside = windows.filter(window => observationInBenchmarkWindow(observation, window, regions, resolve))
  const role = observation.benchmark_role
  if (!inside.length) {
    return role === undefined ? undefined : 'benchmark_role outside every benchmark window'
  }
  for (const window of inside) {
    if (window.role === 'held_out' && role === undefined) {
      return `benchmark_role required in held_out window ${window.id}`
    }
    if (role !== undefined && role !== window.role) {
      return `benchmark_role ${role} mismatch with ${window.id} (${window.role})`
    }
  }
  return undefined
}

export interface WithholdGuard {
  isWithheld(row: Evidence): boolean
}

export function createWithholdGuard(
  catalogue: Pick<LoadedCatalogue, 'records' | 'aliases'>,
  heldOut: 'withhold' | 'include',
): WithholdGuard {
  if (heldOut === 'include') return { isWithheld: () => false }
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const heldOutWindows = activeBenchmarkWindows(catalogue.records, resolve).filter(window => window.role === 'held_out')
  return {
    isWithheld(row: Evidence) {
      return heldOutWindows.some(window => evidenceInHeldOutWindow(row, window, regions, resolve))
    },
  }
}

export function filterWithheldRecord(record: CatalogueRecord, guard: WithholdGuard): CatalogueRecord {
  return {
    ...record,
    attestations: record.attestations.filter(row => !guard.isWithheld(row)),
    observations: record.observations.filter(row => !guard.isWithheld(row)),
  }
}
