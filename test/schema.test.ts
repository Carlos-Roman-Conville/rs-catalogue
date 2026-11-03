import { describe, expect, it } from 'vitest'
import { isCatalogueRecord, kinds, validateRecord } from '../src/schema.ts'
import { attestation, date, observation, record } from './helpers.ts'

describe('record schema', () => {
  it.each(kinds)('accepts kind %s and requires source metadata for source', kind => {
    const r = { ...record(), kind, ...(kind === 'product' ? { condition: 'freshly baked' } : {}), ...(kind === 'source' ? { source: { key: 'TEST', title: 'Test', gives: 'Fixture', rights: 'Test only' } } : {}) }
    expect(isCatalogueRecord(r)).toBe(true)
  })
  it('requires source object for source kind', () => expect(validateRecord({ ...record(), kind: 'source' }).join()).toContain('record.source'))
  it('reserves source metadata for source records', () => expect(validateRecord({ ...record(), source: {} }).join()).toContain('only allowed for kind source'))
  it('rejects missing required fields and malformed nested values', () => {
    expect(validateRecord({}).length).toBeGreaterThan(0)
    expect(validateRecord({ ...record(), names: [null], observations: [{ ...observation(), value: Infinity }] }).join()).toContain('finite number')
  })
  it('requires a non-empty provenance set', () => {
    for (const provenance of [[], ['real', 'real']]) expect(validateRecord({ ...record(), provenance }).join()).toContain('non-empty set')
  })
  it.each([
    { kind: 'bad' }, { provenance: ['bad'] }, { scope: 'game:Bad' },
    { names: [{ text: 'Test', lang: 'en', use: 'bad' }] },
    { relations: [{ rel: 'bad', to: 'test' }] },
    { attestations: [{ ...attestation(), what: 'bad' }] },
    { attestations: [{ ...attestation(), label: 'bad' }] },
    { attestations: [{ ...attestation(), confidence: { level: 'bad', reason: 'Test' } }] },
    { observations: [{ ...observation(), benchmark_role: 'bad' }] },
    ...['precision', 'calendar_of_source', 'year_start_of_source'].map(field => ({ attestations: [{ ...attestation(), date: { ...date(), [field]: 'bad' } }] })),
  ])('rejects bad enum values: %j', patch => expect(validateRecord({ ...record(), ...patch }).length).toBeGreaterThan(0))
  it('accepts astronomical year zero and negative years', () => {
    const d = { ...date(), from: { year: -100 }, to: { year: 0, month: 2, day: 29 } }
    expect(validateRecord({ ...record(), attestations: [{ ...attestation(), date: d }] })).toEqual([])
  })
  it('rejects from > to in attestations, observations and relations', () => {
    const d = { ...date(), from: { year: 2 }, to: { year: 1 } }
    const r = { ...record(), attestations: [{ ...attestation(), date: d }], observations: [{ ...observation(), date: d }], relations: [{ rel: 'part_of', to: 'test', date: d }] }
    expect(validateRecord(r).filter(line => line.includes('from > to'))).toHaveLength(3)
  })
  it('accepts an open start, alone or with an open end, and still requires the from key', () => {
    for (const to of [{ year: 1752, month: 9, day: 2 }, null, undefined]) {
      const d = { ...date(), from: null, to }
      expect(validateRecord({ ...record(), attestations: [{ ...attestation(), date: d }], relations: [{ rel: 'part_of', to: 'test', date: d }] })).toEqual([])
    }
    const { from: _, ...missing } = date()
    expect(validateRecord({ ...record(), attestations: [{ ...attestation(), date: missing }] }).length).toBeGreaterThan(0)
  })
  it('rejects reversed days within the same month', () => {
    const d = { ...date(), from: { year: 0, month: 2, day: 2 }, to: { year: 0, month: 2, day: 1 } }
    expect(validateRecord({ ...record(), attestations: [{ ...attestation(), date: d }] }).join()).toContain('from > to')
  })
  it('rejects impossible Gregorian dates and fractional years', () => {
    for (const from of [{ year: 1900, month: 2, day: 29 }, { year: 1, month: 13 }, { year: 1, day: 2 }, { year: 1.5 }]) {
      expect(validateRecord({ ...record(), attestations: [{ ...attestation(), date: { ...date(), from } }] }).length).toBeGreaterThan(0)
    }
  })
})

it.each([undefined, '', '  ', null, 42])('requires a non-empty product condition: %s', condition => {
  expect(validateRecord({ ...record(), kind: 'product', condition })).toContain('record.condition: expected non-empty string')
})
it.each(kinds.filter(kind => kind !== 'product'))('rejects condition on %s', kind => {
  expect(validateRecord({ ...record(), kind, condition: 'fresh' })).toContain('record.condition: only allowed for kind product')
})
it.each([undefined, 'exact', 'empirical'])('accepts conversion %s', conversion => {
  expect(validateRecord({ ...record(), observations: [{ ...observation(), conversion }] })).toEqual([])
})
it('rejects invalid conversion', () => {
  expect(validateRecord({ ...record(), observations: [{ ...observation(), conversion: 'guessed' }] })).toContain('record.observations[0].conversion: expected exact|empirical')
})
it('accepts made_by', () => {
  expect(validateRecord({ ...record(), relations: [{ rel: 'made_by', to: 'catalogue/practice.baking' }] })).toEqual([])
})
