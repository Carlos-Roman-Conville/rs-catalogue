import type { DatePoint } from './schema.ts'

export type Calendar = 'gregorian' | 'julian'
export interface SourceCalendar { calendar: Calendar; yearStart: 'jan-1' | 'mar-25' }
export type CompleteDate = Required<DatePoint>
export interface NormalisedDate { date: DatePoint; shifted: boolean; approximate: boolean }

// Dershowitz & Reingold, Calendrical Calculations: The Ultimate Edition (2018),
// Gregorian/Julian day-count arithmetic: https://reingold.co/calendars.shtml
// March-based JDN formulas use astronomical years (1 BCE = 0), with no reform gap.
// BigInt keeps intermediates exact; floor division also handles dates before JDN 0.
function floor(a: bigint, b: bigint): bigint {
  return a / b - (a % b < 0n ? 1n : 0n)
}
function integer(value: number): bigint {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected a safe integer')
  return BigInt(value)
}
function number(value: bigint): number {
  const result = Number(value)
  if (!Number.isSafeInteger(result)) throw new RangeError('Result exceeds safe integer range')
  return result
}
function validate(date: DatePoint, calendar: Calendar): void {
  integer(date.year)
  if (date.month === undefined) {
    if (date.day !== undefined) throw new RangeError('Day requires month')
    return
  }
  integer(date.month)
  if (date.month < 1 || date.month > 12) throw new RangeError('Month must be 1..12')
  if (date.day === undefined) return
  integer(date.day)
  const leap = date.year % 4 === 0 && (calendar === 'julian' || date.year % 100 !== 0 || date.year % 400 === 0)
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (date.day < 1 || date.day > days[date.month - 1]!) throw new RangeError('Invalid day for calendar')
}
function toJdn(year: number, month: number, day: number, calendar: Calendar): number {
  integer(month); integer(day)
  validate({ year, month, day }, calendar)
  const a = floor(14n - BigInt(month), 12n)
  const y = BigInt(year) + 4800n - a
  const m = BigInt(month) + 12n * a - 3n
  const base = BigInt(day) + floor(153n * m + 2n, 5n) + 365n * y + floor(y, 4n)
  return number(calendar === 'gregorian'
    ? base - floor(y, 100n) + floor(y, 400n) - 32045n : base - 32083n)
}
/** Integer JDN at noon on a proleptic Gregorian date. */
export function gregorianToJdn(year: number, month: number, day: number): number {
  return toJdn(year, month, day, 'gregorian')
}
/** Integer JDN at noon on a proleptic Julian date. */
export function julianToJdn(year: number, month: number, day: number): number {
  return toJdn(year, month, day, 'julian')
}
function fromJdn(jdn: number, calendar: Calendar): CompleteDate {
  const a = integer(jdn) + (calendar === 'gregorian' ? 32044n : 32082n)
  const b = calendar === 'gregorian' ? floor(4n * a + 3n, 146097n) : 0n
  const c = a - floor(146097n * b, 4n)
  const d = floor(4n * c + 3n, 1461n)
  const e = c - floor(1461n * d, 4n)
  const m = floor(5n * e + 2n, 153n)
  return {
    year: number(100n * b + d - 4800n + floor(m, 10n)),
    month: number(m + 3n - 12n * floor(m, 10n)),
    day: number(e - floor(153n * m + 2n, 5n) + 1n),
  }
}
export function jdnToGregorian(jdn: number): CompleteDate { return fromJdn(jdn, 'gregorian') }
export function jdnToJulian(jdn: number): CompleteDate { return fromJdn(jdn, 'julian') }

/**
 * Normalise a source date for proleptic-Gregorian storage. `shifted` means a
 * supplied component changed. Partial dates retain their precision and receive
 * only a determinable year-start adjustment, never an invented calendar day.
 * A year alone or March without a day cannot resolve the Lady Day boundary;
 * retain its year and mark approximate, as for all partial dates.
 * Lady Day rule: Calendar (New Style) Act 1750, section I:
 * https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain
 */
export function fromSource(source: DatePoint, options: SourceCalendar): NormalisedDate {
  if (options.calendar !== 'gregorian' && options.calendar !== 'julian') throw new RangeError('Unknown calendar')
  if (options.yearStart !== 'jan-1' && options.yearStart !== 'mar-25') throw new RangeError('Unknown year start')
  integer(source.year)
  const beforeLadyDay = source.month !== undefined && (source.month < 3 ||
    (source.month === 3 && source.day !== undefined && source.day < 25))
  const year = number(BigInt(source.year) + (options.yearStart === 'mar-25' && beforeLadyDay ? 1n : 0n))
  let date: DatePoint = { ...source, year }
  // Leap-day validity belongs to the January year, after the year-start shift.
  validate(date, options.calendar)
  const approximate = date.month === undefined || date.day === undefined
  if (!approximate) date = jdnToGregorian(toJdn(year, date.month!, date.day!, options.calendar))
  return { date, shifted: date.year !== source.year || date.month !== source.month || date.day !== source.day, approximate }
}
