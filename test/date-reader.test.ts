import { afterEach, beforeEach, expect, it } from 'vitest'
import { openCatalogue } from '../src/index.ts'
import type { CatalogueRecord } from '../src/schema.ts'
import { attestation, date, fixture, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })

const regionId = (slug: string) => `catalogue/region.${slug}`
const calendarId = (slug: string) => `catalogue/calendar.${slug}`

async function writeRegion(slug: string, relations: CatalogueRecord['relations'] = []) {
  await f.write(`data/region/${slug}.json`, { ...record(slug), id: regionId(slug), kind: 'region', relations })
}

async function writeEnglandCalendars() {
  const england = regionId('england')
  await writeRegion('england')
  await f.write('data/calendar/julian.json', {
    ...record('julian'),
    id: calendarId('julian'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'presence',
      place: england,
      date: {
        ...date(),
        from: null,
        to: { year: 1752, month: 9, day: 2 },
        precision: 'day',
        calendar_of_source: 'julian',
      },
    }],
  })
  await f.write('data/calendar/lady-day-year-start.json', {
    ...record('lady-day-year-start'),
    id: calendarId('lady-day-year-start'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'presence',
      place: england,
      date: {
        ...date(),
        from: { year: 1155 },
        to: { year: 1751, month: 12, day: 31 },
        precision: 'year',
        year_start_of_source: 'mar-25',
      },
    }],
  })
  await f.write('data/calendar/gregorian.json', {
    ...record('gregorian'),
    id: calendarId('gregorian'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'adoption',
      place: england,
      date: {
        from: { year: 1752, month: 9, day: 14 },
        to: null,
        precision: 'day',
        circa: false,
        calendar_of_source: 'gregorian',
      },
    }],
  })
  await f.write('data/calendar/january-year-start.json', {
    ...record('january-year-start'),
    id: calendarId('january-year-start'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'adoption',
      place: england,
      date: {
        from: { year: 1752, month: 1, day: 1 },
        to: null,
        precision: 'day',
        circa: false,
        calendar_of_source: 'gregorian',
      },
    }],
  })
}

it('shifts 1691-01-10 in England to 1692-01-20 Julian Lady Day (DESIGN §2.2, B2)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(cat.date('1691-01-10', { place: regionId('england') })).toEqual({
    date: { year: 1692, month: 1, day: 20 },
    shifted: true,
    approximate: false,
    calendar: 'julian',
    yearStart: 'mar-25',
    basis: [calendarId('julian'), calendarId('lady-day-year-start')],
    conflict: false,
  })
})

it('leaves 1752-09-14 unchanged under Gregorian adoption (B2, A8)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(cat.date('1752-09-14', { place: regionId('england') })).toEqual({
    date: { year: 1752, month: 9, day: 14 },
    shifted: false,
    approximate: false,
    calendar: 'gregorian',
    yearStart: 'jan-1',
    basis: [calendarId('gregorian'), calendarId('january-year-start')],
    conflict: false,
  })
})

it('marks 1752-09-05 unknown in England reform gap (B2)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(cat.date('1752-09-05', { place: regionId('england') })).toEqual({
    date: { year: 1752, month: 9, day: 5 },
    shifted: false,
    approximate: true,
    calendar: 'unknown',
    yearStart: 'unknown',
    basis: [],
    conflict: false,
  })
})

it('returns unknown unshifted when the place has no calendar records (B2)', async () => {
  await writeRegion('nowhere')
  const cat = openCatalogue(f.root)
  expect(cat.date('1691-01-10', { place: regionId('nowhere') })).toEqual({
    date: { year: 1691, month: 1, day: 10 },
    shifted: false,
    approximate: true,
    calendar: 'unknown',
    yearStart: 'unknown',
    basis: [],
    conflict: false,
  })
})

it('keeps year-only 1270 approximate (B2)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(cat.date('1270', { place: regionId('england') })).toEqual({
    date: { year: 1270 },
    shifted: false,
    approximate: true,
    calendar: 'julian',
    yearStart: 'mar-25',
    basis: [calendarId('julian'), calendarId('lady-day-year-start')],
    conflict: false,
  })
})

it('honours explicit calendar and year start without reading records (B2)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(cat.date('1691-01-10', {
    place: regionId('england'),
    calendar: 'gregorian',
    yearStart: 'jan-1',
  })).toEqual({
    date: { year: 1691, month: 1, day: 10 },
    shifted: false,
    approximate: false,
    calendar: 'gregorian',
    yearStart: 'jan-1',
    basis: [],
    conflict: false,
  })
})

it('reports conflict when calendar records disagree (B2)', async () => {
  const place = regionId('disputed')
  await writeRegion('disputed')
  await f.write('data/calendar/julian.json', {
    ...record('julian'),
    id: calendarId('julian'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'presence',
      place,
      date: { ...date(), from: { year: 1600 }, to: { year: 1800 } },
    }],
  })
  await f.write('data/calendar/gregorian.json', {
    ...record('gregorian'),
    id: calendarId('gregorian'),
    kind: 'calendar',
    attestations: [{
      ...attestation(),
      what: 'presence',
      place,
      date: { ...date(), from: { year: 1600 }, to: { year: 1800 } },
    }],
  })
  const cat = openCatalogue(f.root)
  expect(cat.date('1650-06-01', { place })).toEqual({
    date: { year: 1650, month: 6, day: 1 },
    shifted: false,
    approximate: true,
    calendar: 'unknown',
    yearStart: 'unknown',
    basis: [calendarId('gregorian'), calendarId('julian')],
    conflict: true,
  })
})

it('reads calendar through a descendant place during the date (B2)', async () => {
  await writeEnglandCalendars()
  await writeRegion('yorkshire', [{ rel: 'part_of', to: regionId('england') }])
  const cat = openCatalogue(f.root)
  expect(cat.date('1691-01-10', { place: regionId('yorkshire') })).toEqual({
    date: { year: 1692, month: 1, day: 20 },
    shifted: true,
    approximate: false,
    calendar: 'julian',
    yearStart: 'mar-25',
    basis: [calendarId('julian'), calendarId('lady-day-year-start')],
    conflict: false,
  })
})

it('resolves alias ids for place before reading calendar (B2)', async () => {
  await writeEnglandCalendars()
  await f.write('data/aliases.json', [{ old: regionId('legacy-england'), new: regionId('england') }])
  const cat = openCatalogue(f.root)
  expect(cat.date('1691-01-10', { place: regionId('legacy-england') })).toEqual({
    date: { year: 1692, month: 1, day: 20 },
    shifted: true,
    approximate: false,
    calendar: 'julian',
    yearStart: 'mar-25',
    basis: [calendarId('julian'), calendarId('lady-day-year-start')],
    conflict: false,
  })
})

it('rejects malformed date strings (B2)', async () => {
  await writeEnglandCalendars()
  const cat = openCatalogue(f.root)
  expect(() => cat.date('not-a-date', { place: regionId('england') })).toThrow(RangeError)
})
