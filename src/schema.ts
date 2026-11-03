export const kinds = ['entity', 'substance', 'material', 'product', 'organism', 'technology', 'institution', 'practice', 'phenomenon', 'region', 'period', 'culture', 'calendar', 'source'] as const
export type Kind = typeof kinds[number]
export const provenanceClasses = ['real', 'prehistoric', 'mythological', 'fantasy', 'science_fiction', 'original_fiction'] as const
export type Provenance = typeof provenanceClasses[number]
export type DatePoint = { year: number; month?: number; day?: number }
export interface DateInterval {
  /** Null means an open start: in force before any date a source states. */
  from: DatePoint | null
  /** Omitted or null means the interval still holds, with no end date. */
  to?: DatePoint | null
  precision: 'day' | 'month' | 'year' | 'decade' | 'century' | 'millennium'
  circa: boolean
  calendar_of_source: 'gregorian' | 'julian' | 'unknown' | 'other'
  year_start_of_source?: 'jan-1' | 'mar-25'
}
export interface Name {
  text: string; lang: string; use: 'preferred' | 'scientific' | 'vernacular' | 'period' | 'alternate'
  script?: string; region?: string; period?: string
}
export interface Evidence {
  place: string | null; date: DateInterval | null; sources: string[]
  label: 'researched' | 'estimate' | 'fiction' | 'open'
  confidence: { level: 'high' | 'medium' | 'low'; reason: string }; note?: string
}
export interface Attestation extends Evidence {
  what: 'origin' | 'earliest_evidence' | 'discovery' | 'invention' | 'identification' | 'adoption' | 'presence' | 'absence' | 'spread_to'
  culture?: string
}
export interface Observation extends Evidence {
  conversion?: 'exact' | 'empirical'
  quantity: string; value: number | string | null; unit: string | null
  benchmark_role?: 'development' | 'held_out' | 'reserve'
}
export interface Relation {
  rel: 'is_a' | 'part_of' | 'made_of' | 'made_by' | 'variant_of' | 'same_as' | 'documented_prerequisite'
  to: string; date?: DateInterval; sources?: string[]
}
export interface Source {
  key: string; title: string; author?: string; year?: number; gives: string; url?: string; rights: string
}
interface RecordFields {
  /** A product is a made thing in one stated condition; other kinds omit this field. */
  condition?: string
  id: string; names: Name[]; classification: { scheme: string; path: string[] }[]
  provenance: Provenance[]; scope: 'universal' | `game:${string}`
  attestations: Attestation[]; relations: Relation[]; observations: Observation[]; sources: string[]
  derived_from: { file: string; anchor: string; sha256: string }[]; notes?: string
}
export type CatalogueRecord = RecordFields & ({ kind: 'source'; source: Source } | { kind: Exclude<Kind, 'source'>; source?: never })

type Validator = (value: unknown, path: string, errors: string[]) => void
const fail = (path: string, expected: string, errors: string[]) => { errors.push(`${path}: expected ${expected}`) }
const string: Validator = (v, p, e) => { if (typeof v !== 'string' || !v.trim()) fail(p, 'non-empty string', e) }
const integer: Validator = (v, p, e) => { if (!Number.isSafeInteger(v)) fail(p, 'safe integer', e) }
const enumeration = (values: readonly string[]): Validator => (v, p, e) => { if (!values.includes(v as string)) fail(p, values.join('|'), e) }
const optional = (check: Validator): Validator => (v, p, e) => { if (v !== undefined) check(v, p, e) }
const nullable = (check: Validator): Validator => (v, p, e) => { if (v !== null) check(v, p, e) }
const array = (check: Validator): Validator => (v, p, e) => {
  if (!Array.isArray(v)) return fail(p, 'array', e)
  v.forEach((item, i) => check(item, `${p}[${i}]`, e))
}
const object = (fields: Record<string, Validator>): Validator => (v, p, e) => {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return fail(p, 'object', e)
  for (const [key, check] of Object.entries(fields)) check((v as Record<string, unknown>)[key], `${p}.${key}`, e)
}
const strings = array(string)
const point: Validator = (v, p, e) => {
  const before = e.length
  object({ year: integer, month: optional(integer), day: optional(integer) })(v, p, e)
  if (e.length !== before) return
  const d = v as DatePoint
  if (d.month !== undefined && (d.month < 1 || d.month > 12)) fail(`${p}.month`, '1..12', e)
  if (d.day !== undefined) {
    const leap = d.year % 4 === 0 && (d.year % 100 !== 0 || d.year % 400 === 0)
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (d.month === undefined || d.day < 1 || d.day > (days[d.month - 1] ?? 0)) fail(`${p}.day`, 'valid Gregorian day with month', e)
  }
}
const interval: Validator = (v, p, e) => {
  const before = e.length
  object({ from: nullable(point), to: optional(nullable(point)), precision: enumeration(['day', 'month', 'year', 'decade', 'century', 'millennium']),
    circa: (v, p, e) => { if (typeof v !== 'boolean') fail(p, 'boolean', e) },
    calendar_of_source: enumeration(['gregorian', 'julian', 'unknown', 'other']),
    year_start_of_source: optional(enumeration(['jan-1', 'mar-25'])) })(v, p, e)
  if (e.length !== before) return
  const { from, to } = v as DateInterval
  if (from == null || to == null) return
  // Missing components denote the beginning of the stated year/month; no JS Date epoch limits.
  const a = [from.year, from.month ?? 1, from.day ?? 1]
  const b = [to.year, to.month ?? 1, to.day ?? 1]
  const i = a.findIndex((n, i) => n !== b[i])
  if (i !== -1 && a[i]! > b[i]!) e.push(`${p}: from > to`)
}
const evidence = {
  place: nullable(string), date: nullable(interval), sources: strings,
  label: enumeration(['researched', 'estimate', 'fiction', 'open']),
  confidence: object({ level: enumeration(['high', 'medium', 'low']), reason: string }), note: optional(string),
}
const record = object({
  id: string, kind: enumeration(kinds),
  names: array(object({ text: string, lang: string, use: enumeration(['preferred', 'scientific', 'vernacular', 'period', 'alternate']), script: optional(string), region: optional(string), period: optional(string) })),
  classification: array(object({ scheme: string, path: strings })),
  provenance: (v, p, e) => {
    array(enumeration(provenanceClasses))(v, p, e)
    if (Array.isArray(v) && (v.length === 0 || new Set(v).size !== v.length)) fail(p, 'non-empty set of provenance classes', e)
  },
  scope: (v, p, e) => { if (v !== 'universal' && !(typeof v === 'string' && /^game:[a-z0-9]+(-[a-z0-9]+)*$/.test(v))) fail(p, 'universal or game:<slug>', e) },
  attestations: array(object({ ...evidence, what: enumeration(['origin', 'earliest_evidence', 'discovery', 'invention', 'identification', 'adoption', 'presence', 'absence', 'spread_to']), culture: optional(string) })),
  observations: array(object({ ...evidence, quantity: string, unit: nullable(string),
    conversion: optional(enumeration(['exact', 'empirical'])),
    value: (v, p, e) => { if (v !== null && typeof v !== 'string' && !(typeof v === 'number' && Number.isFinite(v))) fail(p, 'finite number|string|null', e) },
    benchmark_role: optional(enumeration(['development', 'held_out', 'reserve'])) })),
  relations: array(object({ rel: enumeration(['is_a', 'part_of', 'made_of', 'made_by', 'variant_of', 'same_as', 'documented_prerequisite']), to: string, date: optional(interval), sources: optional(strings) })),
  sources: strings, derived_from: array(object({ file: string, anchor: string,
    sha256: (v, p, e) => { if (typeof v !== 'string' || !/^[a-fA-F0-9]{64}$/.test(v)) fail(p, 'SHA-256 hex digest', e) } })), notes: optional(string),
})

/** Sorted structural failures; unknown extension fields are preserved. */
export function validateRecord(value: unknown): string[] {
  const errors: string[] = []
  record(value, 'record', errors)
  if (value !== null && typeof value === 'object' && 'kind' in value && value.kind === 'product') {
    object({ condition: string })(value, 'record', errors)
  } else if (value !== null && typeof value === 'object' && 'condition' in value && value.condition !== undefined) {
    errors.push('record.condition: only allowed for kind product')
  }
  if (value !== null && typeof value === 'object' && 'kind' in value && value.kind === 'source') {
    object({ source: object({ key: string, title: string, author: optional(string), year: optional(integer), gives: string, url: optional(string), rights: string }) })(value, 'record', errors)
  } else if (value !== null && typeof value === 'object' && 'source' in value && value.source !== undefined) {
    errors.push('record.source: only allowed for kind source')
  }
  return errors.sort()
}
export function isCatalogueRecord(value: unknown): value is CatalogueRecord { return validateRecord(value).length === 0 }
