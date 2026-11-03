import {
  fromSource,
  type Calendar,
  type NormalisedDate,
  type SourceCalendar,
} from './dates.ts'
import { createIdResolver, type LoadedCatalogue } from './load.ts'
import { createRegionIndex, dateRange, overlapDates } from './regions.ts'
import type { Attestation, CatalogueRecord, DatePoint } from './schema.ts'

export type YearStart = SourceCalendar['yearStart']
export type DateReading = NormalisedDate & {
  calendar: Calendar | 'unknown'
  yearStart: YearStart | 'unknown'
  basis: string[]
  conflict: boolean
}

export interface DateOptions {
  place: string
  calendar?: Calendar
  yearStart?: YearStart
}

const CALENDAR_RECORDS: Record<string, { calendar?: Calendar; yearStart?: YearStart }> = {
  'catalogue/calendar.julian': { calendar: 'julian' },
  'catalogue/calendar.gregorian': { calendar: 'gregorian' },
  'catalogue/calendar.lady-day-year-start': { yearStart: 'mar-25' },
  'catalogue/calendar.january-year-start': { yearStart: 'jan-1' },
}

function parseSource(source: string | DatePoint): DatePoint {
  if (typeof source !== 'string') return { ...source }
  const match = /^(-?\d+)(?:-(\d{1,2})(?:-(\d{1,2}))?)?$/.exec(source)
  if (!match) throw new RangeError(`Invalid date: ${source}`)
  const year = Number(match[1])
  const month = match[2] === undefined ? undefined : Number(match[2])
  const day = match[3] === undefined ? undefined : Number(match[3])
  if (month !== undefined && (month < 1 || month > 12)) throw new RangeError(`Invalid date: ${source}`)
  if (day !== undefined && (day < 1 || day > 31)) throw new RangeError(`Invalid date: ${source}`)
  return { year, month, day }
}

function writtenRange(point: DatePoint) {
  return dateRange(point, point)
}

function attestationCovers(attestation: Attestation, point: DatePoint): boolean {
  if (attestation.date == null) return false
  // Possible overlap cannot select a calendar or year-start convention.
  return overlapDates(attestation.date, writtenRange(point)) === 'confirmed'
}

export function createDateReader(catalogue: LoadedCatalogue) {
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const calendarRecords = catalogue.records.filter(
    (record): record is CatalogueRecord => record.kind === 'calendar' && record.id in CALENDAR_RECORDS,
  )

  function placeMatches(attestation: Attestation, place: string, point: DatePoint): boolean {
    if (attestation.place == null) return false
    const attestationPlace = resolve(attestation.place)
    const at = resolve(place)
    if (attestationPlace === undefined || at === undefined) return false
    if (at === attestationPlace) return true
    return regions.ancestorsDuring(at, point, point).includes(attestationPlace)
  }

  function applicableRecordIds(place: string, point: DatePoint): string[] {
    const ids: string[] = []
    for (const record of calendarRecords) {
      for (const attestation of record.attestations) {
        if (attestation.what !== 'presence' && attestation.what !== 'adoption') continue
        if (!placeMatches(attestation, place, point) || !attestationCovers(attestation, point)) continue
        ids.push(record.id)
        break
      }
    }
    return [...new Set(ids)].sort()
  }

  function resolveFromRecords(place: string, point: DatePoint): Pick<DateReading, 'calendar' | 'yearStart' | 'basis' | 'conflict'> {
    const ids = applicableRecordIds(place, point)
    const calendars = new Set<Calendar>()
    const yearStarts = new Set<YearStart>()
    for (const id of ids) {
      const mapped = CALENDAR_RECORDS[id]!
      if (mapped.calendar) calendars.add(mapped.calendar)
      if (mapped.yearStart) yearStarts.add(mapped.yearStart)
    }
    const calendarValues = [...calendars].sort()
    const yearStartValues = [...yearStarts].sort()
    const conflict = calendarValues.length > 1 || yearStartValues.length > 1
    return {
      calendar: calendarValues.length === 1 ? calendarValues[0]! : 'unknown',
      yearStart: yearStartValues.length === 1 ? yearStartValues[0]! : 'unknown',
      basis: ids,
      conflict,
    }
  }

  function unknownReading(point: DatePoint, basis: string[], conflict: boolean): DateReading {
    return {
      date: point,
      shifted: false,
      approximate: true,
      calendar: 'unknown',
      yearStart: 'unknown',
      basis,
      conflict,
    }
  }

  function date(source: string | DatePoint, opts: DateOptions): DateReading {
    const point = parseSource(source)
    if (opts.calendar !== undefined && opts.yearStart !== undefined) {
      const normalised = fromSource(point, { calendar: opts.calendar, yearStart: opts.yearStart })
      return {
        ...normalised,
        calendar: opts.calendar,
        yearStart: opts.yearStart,
        basis: [],
        conflict: false,
      }
    }

    const resolved = resolveFromRecords(opts.place, point)
    if (resolved.conflict || resolved.calendar === 'unknown' || resolved.yearStart === 'unknown') {
      return unknownReading(point, resolved.basis, resolved.conflict)
    }

    const normalised = fromSource(point, {
      calendar: resolved.calendar,
      yearStart: resolved.yearStart,
    })
    return { ...normalised, ...resolved, conflict: false }
  }

  return { date }
}
