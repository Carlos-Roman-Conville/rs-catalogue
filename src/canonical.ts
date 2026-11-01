import type { DatePoint } from './schema.ts'

const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0

/** Canonical object keys and evidence ordering make JSON independent of file/key order. */
export function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value !== null && typeof value === 'object') {
    // Date intervals use one representation for an open-ended upper bound.
    if ('from' in value && 'precision' in value && 'calendar_of_source' in value) {
      value = { ...value, to: (value as { to?: DatePoint | null }).to ?? null }
    }
    return Object.fromEntries(Object.entries(value as object).sort(([a], [b]) => compare(a, b)).map(([key, v]) => [key, canonical(v)]))
  }
  return value
}
