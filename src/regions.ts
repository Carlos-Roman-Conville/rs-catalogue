import { gregorianToJdn } from './dates.ts'
import type { CatalogueRecord, DatePoint } from './schema.ts'

export type DateRange = readonly [number, number]
type Edge = { id: string; range: DateRange }
type Graph = Map<string, Edge[]>
const always: DateRange = [-Infinity, Infinity]

/** Inclusive Gregorian bounds. Partial endpoints cover the whole stated year/month; a null end is open. */
export function dateRange(from: DatePoint | null, to?: DatePoint | null): DateRange {
  function endpoint(point: DatePoint, end: boolean): number {
    if (point.day !== undefined && point.month === undefined) throw new RangeError('Day requires month')
    const month = point.month ?? (end ? 12 : 1)
    const leap = point.year % 4 === 0 && (point.year % 100 !== 0 || point.year % 400 === 0)
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return gregorianToJdn(point.year, month, point.day ?? (end ? days[month - 1]! : 1))
  }
  const range: DateRange = [from == null ? -Infinity : endpoint(from, false), to == null ? Infinity : endpoint(to, true)]
  if (range[0] > range[1]) throw new RangeError('from > to')
  return range
}

export function intersectDates(a: DateRange, b: DateRange): DateRange | undefined {
  const from = Math.max(a[0], b[0]), to = Math.min(a[1], b[1])
  return from <= to ? [from, to] : undefined
}

function graphOf(records: readonly CatalogueRecord[], resolve: (id: string) => string | undefined, reverse: boolean): Graph {
  const graph: Graph = new Map(records.map(record => [record.id, []]))
  for (const record of records) {
    for (const relation of record.relations) {
      if (relation.rel !== 'part_of') continue
      const parent = resolve(relation.to)
      if (parent === undefined || !graph.has(parent)) continue
      graph.get(reverse ? parent : record.id)!.push({
        id: reverse ? record.id : parent,
        range: relation.date ? dateRange(relation.date.from, relation.date.to) : always,
      })
    }
  }
  return graph
}

// Carry the common interval down each path, retaining alternate paths at other dates.
// A previously covered interval cannot add reachability, so cycles terminate too.
function reachable(graph: Graph, start: string, range: DateRange, includeStart: boolean): Set<string> {
  const pending: Edge[] = includeStart ? [{ id: start, range }] : [...(graph.get(start) ?? [])]
  const visited = new Map<string, DateRange[]>()
  while (pending.length) {
    const edge = pending.pop()!
    const overlap = intersectDates(range, edge.range)
    if (!overlap) continue
    const previous = visited.get(edge.id) ?? []
    if (previous.some(r => r[0] <= overlap[0] && r[1] >= overlap[1])) continue
    visited.set(edge.id, [...previous, overlap])
    for (const next of graph.get(edge.id) ?? []) {
      const common = intersectDates(overlap, next.range)
      if (common) pending.push({ id: next.id, range: common })
    }
  }
  return new Set(visited.keys())
}

/** Region ids, including the root, with simultaneous containment somewhere in the window. */
export function createRegionIndex(records: readonly CatalogueRecord[], resolve: (id: string) => string | undefined = id => id) {
  const graph = graphOf(records.filter(record => record.kind === 'region'), resolve, true)
  return {
    descendantsDuring(regionId: string, from: DatePoint, to: DatePoint): string[] {
      const range = dateRange(from, to)
      const id = resolve(regionId)
      if (id === undefined || !graph.has(id)) throw new RangeError(`Unknown region: ${regionId}`)
      return [...reachable(graph, id, range, true)].sort()
    },
  }
}

/** Every record participating in a part_of cycle whose edges share at least one date. */
export function partOfCycleIds(records: readonly CatalogueRecord[], resolve: (id: string) => string | undefined = id => id): string[] {
  const graph = graphOf(records, resolve, false)
  return [...graph.keys()].filter(id => reachable(graph, id, always, false).has(id)).sort()
}
