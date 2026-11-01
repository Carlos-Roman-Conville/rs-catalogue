import { describe, expect, it } from 'vitest'
import { catalogueId, openCatalogue } from '../src/index.ts'
import { fixture } from './helpers.ts'

describe('ids (DESIGN §2.1)', () => {
  it('qualifies a local id with the catalogue prefix', () => {
    expect(catalogueId('substance.saltpetre')).toBe('catalogue/substance.saltpetre')
  })
  it('refuses a local id containing /', () => {
    expect(() => catalogueId('region.caribbean/jamaica')).toThrow()
  })
})

it('opens the default repository synchronously', () => {
  expect(typeof openCatalogue().window).toBe('function')
})

it('reads 1691-01-10 in England per DESIGN §2.2', () => {
  const cat = openCatalogue()
  expect(cat.date('1691-01-10', { place: 'catalogue/region.england' })).toEqual({
    date: { year: 1692, month: 1, day: 20 },
    shifted: true,
    approximate: false,
    calendar: 'julian',
    yearStart: 'mar-25',
    basis: ['catalogue/calendar.julian', 'catalogue/calendar.lady-day-year-start'],
    conflict: false,
  })
})
it('fails opening malformed catalogue data instead of silently omitting records', async () => {
  const f = await fixture()
  try {
    await f.write('data/bad.json', '{', true)
    expect(() => openCatalogue(f.root)).toThrow('data/bad.json: bad JSON')
  } finally { await f.close() }
})
