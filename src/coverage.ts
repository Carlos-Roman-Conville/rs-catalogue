import { BENCHMARK_WINDOWS, type BenchmarkWindow } from './benchmark.ts'
import { kinds, type Kind } from './schema.ts'
import type { DatePoint } from './schema.ts'
import type { WindowResult } from './window.ts'

export interface CaribbeanCoverageWindow {
  id: 'Caribbean'
  region: 'catalogue/region.caribbean'
  from: DatePoint
  to: DatePoint
}

export type CoverageWindow = BenchmarkWindow | CaribbeanCoverageWindow

export const CARIBBEAN_COVERAGE_WINDOW: CaribbeanCoverageWindow = {
  id: 'Caribbean',
  region: 'catalogue/region.caribbean',
  from: { year: 1690 },
  to: { year: 1720 },
}

export const COVERAGE_WINDOWS: readonly CoverageWindow[] = [...BENCHMARK_WINDOWS, CARIBBEAN_COVERAGE_WINDOW]

export interface LabelCounts {
  researched: number
  estimate: number
  fiction: number
  open: number
}

export interface BenchmarkRoleCounts {
  development: number
  held_out: number
  reserve: number
}

export interface CoverageRowBase {
  window: string
  region: string
  regionFound: boolean
}

export interface CoverageRowMissing extends CoverageRowBase {
  regionFound: false
}

export interface CoverageRowFound extends CoverageRowBase {
  regionFound: true
  kind: Kind
  records: number
  possible: number
  labels: LabelCounts
  undated: number
  withheld: number
  benchmarkRole: BenchmarkRoleCounts
}

export type CoverageRow = CoverageRowMissing | CoverageRowFound

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const emptyLabels = (): LabelCounts => ({ researched: 0, estimate: 0, fiction: 0, open: 0 })
const emptyRoles = (): BenchmarkRoleCounts => ({ development: 0, held_out: 0, reserve: 0 })

function countLabels(result: WindowResult): LabelCounts {
  const labels = emptyLabels()
  for (const record of result.present) {
    for (const row of [...record.attestations, ...record.observations]) {
      labels[row.label]++
    }
  }
  return labels
}

function countBenchmarkRoles(result: WindowResult): BenchmarkRoleCounts {
  const roles = emptyRoles()
  for (const record of result.present) {
    for (const row of record.observations) {
      const role = row.benchmark_role
      if (role !== undefined) roles[role]++
    }
  }
  return roles
}

export interface CoverageReader {
  get(id: string): { id: string } | undefined
  window(query: {
    region: string
    from: DatePoint
    to: DatePoint
    kinds?: readonly Kind[]
  }): WindowResult
}

/** Aggregate per-window, per-kind coverage using the reader's default withhold guard. */
export function coverageReport(
  reader: CoverageReader,
  windows: readonly CoverageWindow[] = COVERAGE_WINDOWS,
): CoverageRow[] {
  const rows: CoverageRow[] = []
  const sortedKinds = [...kinds].sort(compare)
  for (const window of windows) {
    if (reader.get(window.region) === undefined) {
      rows.push({ window: window.id, region: window.region, regionFound: false })
      continue
    }
    for (const kind of sortedKinds) {
      const result = reader.window({ region: window.region, from: window.from, to: window.to, kinds: [kind] })
      const coverage = result.coverage[0]
      rows.push({
        window: window.id,
        region: window.region,
        regionFound: true,
        kind,
        records: coverage.present,
        possible: coverage.possible,
        labels: countLabels(result),
        undated: coverage.undated,
        withheld: coverage.withheld,
        benchmarkRole: countBenchmarkRoles(result),
      })
    }
  }
  return rows.sort((a, b) => {
    const byWindow = compare(a.window, b.window)
    if (byWindow !== 0) return byWindow
    if (!a.regionFound || !b.regionFound) return 0
    return compare(a.kind, b.kind)
  })
}

export function formatCoverageMarkdown(rows: readonly CoverageRow[]): string {
  const header = [
    '| window | region | regionFound | kind | records | possible | researched | estimate | fiction | open | undated | withheld | dev | held_out | reserve |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ]
  const lines = rows.map(row => {
    if (!row.regionFound) {
      return `| ${row.window} | ${row.region} | false | | | | | | | | | | | | |`
    }
    const { labels, benchmarkRole } = row
    return `| ${[
      row.window,
      row.region,
      'true',
      row.kind,
      row.records,
      row.possible,
      labels.researched,
      labels.estimate,
      labels.fiction,
      labels.open,
      row.undated,
      row.withheld,
      benchmarkRole.development,
      benchmarkRole.held_out,
      benchmarkRole.reserve,
    ].join(' | ')} |`
  })
  return [...header, ...lines].join('\n')
}
