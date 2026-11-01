import { describe, expect, it } from 'vitest'
import { fromSource, gregorianToJdn, julianToJdn, jdnToGregorian, jdnToJulian } from '../src/index.ts'

describe('date normalisation (DESIGN 1.3, V3)', () => {
  // Published anchors: USNO Julian Date Converter and JDN formula page,
  // https://aa.usno.navy.mil/data/JulianDate
  // https://aa.usno.navy.mil/faq/JD_formula
  // J2000: https://ssd.jpl.nasa.gov/horizons/manual.html
  it('JDN published anchors identify the reform, J2000 and the Julian epoch', () => {
    expect(julianToJdn(1582, 10, 4)).toBe(2299160)
    expect(gregorianToJdn(1582, 10, 15)).toBe(2299161)
    expect(gregorianToJdn(2000, 1, 1)).toBe(2451545)
    expect(julianToJdn(-4712, 1, 1)).toBe(0)
    expect(jdnToJulian(0)).toEqual({ year: -4712, month: 1, day: 1 })
    expect(jdnToGregorian(2451545)).toEqual({ year: 2000, month: 1, day: 1 })
  })
  // Calendar (New Style) Act 1750, I: September 2 was followed by September 14.
  // https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain
  it('Britain reform preserves consecutive days across 2 and 14 September 1752', () => {
    const last = julianToJdn(1752, 9, 2)
    expect(jdnToGregorian(last)).toEqual({ year: 1752, month: 9, day: 13 })
    expect(gregorianToJdn(1752, 9, 14)).toBe(last + 1)
    expect(last % 7).toBe(2) // Monday = 0; Wednesday = 2.
  })
  it('Julian century leap day increases the calendar offset in 1700', () => {
    expect(jdnToGregorian(julianToJdn(1700, 2, 29))).toEqual({ year: 1700, month: 3, day: 11 })
    expect(jdnToGregorian(julianToJdn(1700, 2, 28))).toEqual({ year: 1700, month: 3, day: 10 })
  })
  it('Lady Day shifts English 10 January 1691 before converting the calendar', () => {
    expect(fromSource({ year: 1691, month: 1, day: 10 }, { calendar: 'julian', yearStart: 'mar-25' }))
      .toEqual({ date: { year: 1692, month: 1, day: 20 }, shifted: true, approximate: false })
  })
  it('Lady Day includes March 24 and excludes March 25', () => {
    for (const day of [24, 25]) {
      expect(fromSource({ year: 1691, month: 3, day }, { calendar: 'gregorian', yearStart: 'mar-25' }))
        .toEqual({ date: { year: day === 24 ? 1692 : 1691, month: 3, day }, shifted: day === 24, approximate: false })
    }
  })
  it('Lady Day validates leap days against the shifted January year', () => {
    expect(fromSource({ year: 1691, month: 2, day: 29 }, { calendar: 'julian', yearStart: 'mar-25' }).date)
      .toEqual({ year: 1692, month: 3, day: 10 })
    expect(() => fromSource({ year: 1692, month: 2, day: 29 }, { calendar: 'julian', yearStart: 'mar-25' })).toThrow(RangeError)
  })
  it('partial dates only shift a determinable year and never invent month or day', () => {
    for (const calendar of ['gregorian', 'julian'] as const) {
      for (const month of [undefined, 1, 2, 3, 4, 12]) {
        const source = month === undefined ? { year: 1691 } : { year: 1691, month }
        const shifted = month === 1 || month === 2
        expect(fromSource(source, { calendar, yearStart: 'mar-25' }))
          .toEqual({ date: { ...source, year: shifted ? 1692 : 1691 }, shifted, approximate: true })
        expect(fromSource(source, { calendar, yearStart: 'jan-1' }))
          .toEqual({ date: source, shifted: false, approximate: true })
      }
    }
  })
  it('January Gregorian dates preserve components and do not mutate the source', () => {
    const source = Object.freeze({ year: 2000, month: 1, day: 1 })
    expect(fromSource(source, { calendar: 'gregorian', yearStart: 'jan-1' }))
      .toEqual({ date: source, shifted: false, approximate: false })
  })
  it('Julian round trip is the identity over every day of 1600 through 1800', () => {
    let count = 0
    for (let year = 1600; year <= 1800; year++) {
      const lengths = [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= lengths[month - 1]!; day++) {
          const jdn = julianToJdn(year, month, day)
          expect(jdnToJulian(jdn)).toEqual({ year, month, day })
          const g = jdnToGregorian(jdn)
          expect(gregorianToJdn(g.year, g.month, g.day)).toBe(jdn)
          count++
        }
      }
    }
    expect(count).toBe(73416)
  })
  it('astronomical year zero and negative JDNs use floor division without a BCE gap', () => {
    for (const year of [-20000, -4801, -4800, -4713, -4712, -400, -100, -1, 0, 1, 400]) {
      for (const [to, from] of [[gregorianToJdn, jdnToGregorian], [julianToJdn, jdnToJulian]] as const) {
        for (const month of [1, 2, 3, 12]) expect(from(to(year, month, 1))).toEqual({ year, month, day: 1 })
        expect(to(year + 1, 1, 1) - to(year, 12, 31)).toBe(1)
      }
    }
    expect(jdnToGregorian(gregorianToJdn(0, 2, 29))).toEqual({ year: 0, month: 2, day: 29 })
  })
  it('integer arithmetic rejects invalid dates and unsafe numeric inputs or outputs', () => {
    for (const convert of [gregorianToJdn, julianToJdn]) {
      for (const args of [[2000, 0, 1], [2000, 13, 1], [2000, 4, 31], [2001, 2, 29], [0.5, 1, 1], [2000, 1, NaN], [Number.MAX_SAFE_INTEGER, 1, 1]]) {
        expect(() => convert(args[0]!, args[1]!, args[2]!)).toThrow(RangeError)
      }
    }
    expect(() => gregorianToJdn(1700, 2, 29)).toThrow(RangeError)
    for (const convert of [jdnToGregorian, jdnToJulian]) {
      for (const value of [Infinity, NaN, 1.5, Number.MAX_SAFE_INTEGER + 1]) expect(() => convert(value)).toThrow(RangeError)
      for (const value of [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]) {
        const d = convert(value)
        const to = convert === jdnToGregorian ? gregorianToJdn : julianToJdn
        expect(to(d.year, d.month, d.day)).toBe(value)
      }
    }
    expect(() => fromSource({ year: 2000, day: 1 }, { calendar: 'julian', yearStart: 'jan-1' })).toThrow(RangeError)
  })
})
