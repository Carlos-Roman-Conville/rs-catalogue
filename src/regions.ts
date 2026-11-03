import { gregorianToJdn } from './dates.ts'
import type { CatalogueRecord, DateInterval, DatePoint } from './schema.ts'

export type DateRange = readonly [number, number]
type Edge = { id: string; range: DateRange }
type Graph = Map<string, Edge[]>
const always: DateRange = [-Infinity, Infinity]

/** Inclusive Gregorian bounds for a known interval; partial endpoints cover the stated year/month. */
export function dateRange(from: DatePoint, to: DatePoint): DateRange {
  function endpoint(point: DatePoint, end: boolean): number {
    if (point.day !== undefined && point.month === undefined) throw new RangeError('Day requires month')
    const month = point.month ?? (end ? 12 : 1)
    const leap = point.year % 4 === 0 && (point.year % 100 !== 0 || point.year % 400 === 0)
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return gregorianToJdn(point.year, month, point.day ?? (end ? days[month - 1]! : 1))
  }
  const range: DateRange = [endpoint(from, false), endpoint(to, true)]
  if (range[0] > range[1]) throw new RangeError('from > to')
  return range
}

export function intersectDates(a: DateRange, b: DateRange): DateRange | undefined {
  const from = Math.max(a[0], b[0]), to = Math.min(a[1], b[1])
  return from <= to ? [from, to] : undefined
}

export type DateOverlap = 'confirmed' | 'possible' | 'none'

/** The documented core, without converting an unknown endpoint into an open interval. */
export function confirmedDateRange(date: DateInterval): DateRange {
  const start = date.from == null ? undefined : dateRange(date.from, date.from)
  const end = date.to == null ? undefined : dateRange(date.to, date.to)
  if (!start && !end && (date.start_basis !== 'open' || date.end_basis !== 'open')) return [Infinity, -Infinity]
  return [start?.[0] ?? (date.start_basis === 'open' ? -Infinity : end![0]),
    end?.[1] ?? (date.end_basis === 'open' ? Infinity : start![1])]
}

/** Closed, inclusive overlap in JDN days; uncertainty extends possibility only. */
export function overlapDates(date: DateInterval, window: DateRange): DateOverlap {
  if (intersectDates(confirmedDateRange(date), window)) return 'confirmed'
  const reach: DateRange = [
    date.from != null ? dateRange(date.from, date.from)[0]
      : date.start_basis !== 'open' && date.from_earliest ? dateRange(date.from_earliest, date.from_earliest)[0] : -Infinity,
    date.to != null ? dateRange(date.to, date.to)[1]
      : date.end_basis !== 'open' && date.to_latest ? dateRange(date.to_latest, date.to_latest)[1] : Infinity,
  ]
  return intersectDates(reach, window) ? 'possible' : 'none'
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
        // Possible overlap does not establish region membership.
        range: relation.date ? confirmedDateRange(relation.date) : always,
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
  const regionRecords = records.filter(record => record.kind === 'region')
  const descendantsGraph = graphOf(regionRecords, resolve, true)
  const ancestorsGraph = graphOf(regionRecords, resolve, false)
  return {
    descendantsDuring(regionId: string, from: DatePoint, to: DatePoint): string[] {
      const range = dateRange(from, to)
      const id = resolve(regionId)
      if (id === undefined || !descendantsGraph.has(id)) throw new RangeError(`Unknown region: ${regionId}`)
      return [...reachable(descendantsGraph, id, range, true)].sort()
    },
    ancestorsDuring(regionId: string, from: DatePoint, to: DatePoint): string[] {
      const range = dateRange(from, to)
      const id = resolve(regionId)
      if (id === undefined || !ancestorsGraph.has(id)) throw new RangeError(`Unknown region: ${regionId}`)
      return [...reachable(ancestorsGraph, id, range, true)].sort()
    },
  }
}

/** Every record participating in a part_of cycle whose edges share at least one date. */
export function partOfCycleIds(records: readonly CatalogueRecord[], resolve: (id: string) => string | undefined = id => id): string[] {
  const graph = graphOf(records, resolve, false)
  return [...graph.keys()].filter(id => reachable(graph, id, always, false).has(id)).sort()
}
