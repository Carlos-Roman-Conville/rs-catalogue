import { afterEach, beforeEach, expect, it } from 'vitest'
import { openCatalogue } from '../src/index.ts'
import type { Attestation, CatalogueRecord, Evidence, Observation } from '../src/schema.ts'
import { attestation, date, fixture, observation, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
const regionId = (slug: string) => `catalogue/region.${slug}`
const materialId = (slug: string) => `catalogue/material.${slug}`
const interval = (from = 1700, to = from) => ({ ...date(), from: { year: from }, to: { year: to } })
const evidence = (patch: Partial<Attestation> = {}): Attestation => ({ ...attestation(), place: regionId('port-royal'), date: interval(), ...patch })
const query = { region: regionId('caribbean'), from: { year: 1690 }, to: { year: 1720 }, kinds: ['material'] as const }
async function write(r: CatalogueRecord) { await f.write(`data/${r.kind}/${r.id.split('.')[1]}.json`, r) }
async function material(slug: string, patch: Partial<CatalogueRecord> = {}) {
  await write({ ...record(slug), provenance: ['real'], attestations: [evidence()], ...patch } as CatalogueRecord)
}
beforeEach(async () => {
  f = await fixture()
  for (const [slug, parent] of [['caribbean', null], ['jamaica', 'caribbean'], ['port-royal', 'jamaica'], ['england', null]] as const) {
    await write({ ...record(slug), id: regionId(slug), kind: 'region', source: undefined, relations: parent ? [{ rel: 'part_of', to: regionId(parent) }] : [] })
  }
  await write({ ...record('test'), id: 'catalogue/source.test', kind: 'source', source: { key: 'TEST', title: 'Synthetic test source', gives: 'Test evidence', rights: 'Test only' } })
})
afterEach(async () => { await f.close() })
const ids = (records: CatalogueRecord[]) => records.map(r => r.id)
it.each([undefined, null])('open-ended evidence matches windows at and after from, never before (to=%s)', async to => {
  const d = { ...interval(1700), to }
  await material('ongoing', { attestations: [evidence({ date: d })], observations: [{ ...observation(), place: regionId('port-royal'), date: d }] })
  const cat = openCatalogue(f.root)
  expect(cat.window({ ...query, from: { year: 1699 }, to: { year: 1699 } }).present).toEqual([])
  for (const year of [1700, 10000]) {
    const result = cat.window({ ...query, from: { year }, to: { year } })
    expect(ids(result.present)).toEqual([materialId('ongoing')])
    expect(result.present[0].observations).toHaveLength(1)
  }
})
it('open-ended omitted and null ends have identical canonical JSON for all interval fields', async () => {
  async function snapshot(to: undefined | null) {
    const d = { ...interval(1700), to }
    await material('ongoing', {
      attestations: [evidence({ date: d })],
      observations: [{ ...observation(), place: regionId('port-royal'), date: d }],
      relations: [{ rel: 'part_of', to: regionId('caribbean'), date: d }],
    })
    return JSON.stringify(openCatalogue(f.root).window(query))
  }
  expect(await snapshot(undefined)).toBe(await snapshot(null))
})
it('open-ended support leaves closed intervals bounded and their dates unchanged', async () => {
  const d = interval(1700, 1720)
  await material('closed', { attestations: [evidence({ date: d })] })
  const cat = openCatalogue(f.root)
  expect(cat.window(query).present[0].attestations[0].date).toEqual(d)
  expect(cat.window({ ...query, from: { year: 1721 }, to: { year: 1721 } }).present).toEqual([])
})

it('matches all six presence statements and only matching observations and attestations', async () => {
  for (const what of ['presence', 'adoption', 'spread_to', 'origin', 'invention', 'earliest_evidence'] as const) await material(what.replaceAll('_', '-'), { attestations: [evidence({ what })] })
  const matching = evidence()
  const observed: Observation = { ...observation(), ...matching, quantity: 'test-count' }
  await material('mixed', { attestations: [matching, evidence({ date: interval(1800) }), evidence({ place: regionId('england') }), evidence({ what: 'identification' })], observations: [observed, { ...observed, date: null }] })
  for (const what of ['discovery', 'identification', 'absence'] as const) await material(what, { attestations: [evidence({ what, sources: ['catalogue/source.test'] })] })
  const result = openCatalogue(f.root).window(query)
  expect(result.present).toHaveLength(7)
  expect(result.present.find(r => r.id === materialId('mixed'))).toMatchObject({ attestations: [matching], observations: [observed] })
  expect(result.present.every(r => !['discovery', 'identification', 'absence'].some(slug => r.id === materialId(slug)))).toBe(true)
  expect(JSON.stringify(result)).not.toContain('available')
})
it('an observation alone can establish presence but an unplaced or undated observation cannot', async () => {
  const row = { ...observation(), place: regionId('jamaica'), date: interval() }
  await material('observed', { attestations: [], observations: [row] })
  await material('unplaced', { attestations: [], observations: [{ ...row, place: null }] })
  await material('undated', { attestations: [], observations: [{ ...row, date: null }] })
  expect(ids(openCatalogue(f.root).window(query).present)).toEqual([materialId('observed')])
})
it('includes both closed overlap edges and the whole final year and month, including leap days', async () => {
  await material('left', { attestations: [evidence({ date: interval(1680, 1690) })] })
  await material('right', { attestations: [evidence({ date: interval(1720, 1730) })] })
  const day = { year: 1720, month: 12, day: 31 }
  await material('year-end', { attestations: [evidence({ date: { ...interval(), from: day, to: day } })] })
  await material('outside', { attestations: [evidence({ date: interval(1721) })] })
  expect(ids(openCatalogue(f.root).window(query).present)).toEqual(['left', 'right', 'year-end'].map(materialId))
  const leap = { year: 1720, month: 2, day: 29 }
  await material('leap', { attestations: [evidence({ date: { ...interval(), from: leap, to: leap } })] })
  expect(ids(openCatalogue(f.root).window({ ...query, from: { year: 1720, month: 2 }, to: { year: 1720, month: 2 } }).present)).toContain(materialId('leap'))
})
it('dated membership excludes a place before membership begins', async () => {
  await write({ ...record('jamaica'), id: regionId('jamaica'), kind: 'region', source: undefined, relations: [{ rel: 'part_of', to: regionId('caribbean'), date: interval(1710, 1800) }] })
  await material('local')
  const cat = openCatalogue(f.root)
  expect(cat.window({ ...query, to: { year: 1709 } }).present).toEqual([])
  // The specified query tests membership and evidence independently against the window.
  expect(ids(cat.window(query).present)).toEqual([materialId('local')])
})
it('defaults to provenance intersection and universal scope, with explicit additional game scopes', async () => {
  await material('real')
  await material('prehistoric', { provenance: ['prehistoric'] })
  await material('myth', { provenance: ['mythological', 'fantasy'] })
  await material('fantasy', { provenance: ['fantasy'] })
  await material('game', { provenance: ['mythological'], scope: 'game:test' })
  await material('other-game', { provenance: ['mythological'], scope: 'game:other' })
  const cat = openCatalogue(f.root)
  expect(ids(cat.window(query).present)).toEqual(['myth', 'prehistoric', 'real'].map(materialId))
  expect(ids(cat.window({ ...query, scope: 'game:test' }).present)).toEqual(['game', 'myth', 'prehistoric', 'real'].map(materialId))
  expect(ids(cat.window({ ...query, provenance: ['fantasy'] }).present)).toEqual(['fantasy', 'myth'].map(materialId))
  expect(cat.window({ ...query, provenance: [] }).present).toEqual([])
  expect(cat.window({ ...query, kinds: [] }).coverage).toEqual([])
})
it('knownElsewhere is opt-in, excludes present records and contains only qualifying attestations', async () => {
  const elsewhere = evidence({ place: regionId('england') })
  await material('elsewhere', { attestations: [elsewhere, evidence({ what: 'discovery' }), evidence({ date: null })], observations: [{ ...observation(), ...elsewhere, quantity: 'test' }] })
  await material('both', { attestations: [evidence(), elsewhere] })
  await material('unplaced', { attestations: [evidence({ place: null })] })
  await material('observation-only', { attestations: [], observations: [{ ...observation(), ...elsewhere, quantity: 'test' }] })
  const cat = openCatalogue(f.root)
  expect(cat.window(query).knownElsewhere).toEqual([])
  const result = cat.window({ ...query, includeKnownElsewhere: true })
  expect(ids(result.present)).toEqual([materialId('both')])
  expect(ids(result.knownElsewhere)).toEqual([materialId('elsewhere')])
  expect(result.knownElsewhere[0]).toMatchObject({ attestations: [elsewhere], observations: [] })
})
it('coverage counts present records, weak-only matching evidence and local undated attestations', async () => {
  const sourced = (label: Evidence['label']) => evidence({ label, sources: ['catalogue/source.test'] })
  await material('researched', { attestations: [sourced('researched'), sourced('estimate')] })
  await material('estimate', { attestations: [sourced('estimate'), evidence({ label: 'researched', sources: ['catalogue/source.test'], date: interval(1800) })] })
  await material('fiction', { attestations: [sourced('fiction')] })
  await material('open')
  await material('undated', { attestations: [evidence({ date: null }), evidence({ date: null }), evidence({ date: null, place: regionId('england') })] })
  await material('filtered', { provenance: ['fantasy'], attestations: [evidence({ date: null })] })
  const result = openCatalogue(f.root).window({ ...query, kinds: ['material', 'technology'] })
  expect(result.coverage).toEqual([
    { kind: 'material', present: 4, onlyEstimateFictionOpen: 3, undated: 2 },
    { kind: 'technology', present: 0, onlyEstimateFictionOpen: 0, undated: 0 },
  ])
  expect(ids(result.present)).not.toContain(materialId('undated'))
})
it('produces byte-identical JSON across repeated calls and reordered file keys and evidence', async () => {
  const rows = [evidence({ what: 'adoption' }), evidence({ what: 'presence' })]
  await material('z', { attestations: rows })
  await material('a')
  const cat = openCatalogue(f.root)
  const expected = JSON.stringify(cat.window(query))
  expect(JSON.stringify(cat.window(query))).toBe(expected)
  const r = cat.get(materialId('z'))!
  await f.write('data/material/z.json', Object.fromEntries(Object.entries({ ...r, attestations: [...rows].reverse() }).reverse()))
  expect(JSON.stringify(openCatalogue(f.root).window(query))).toBe(expected)
  expect(ids(cat.window(query).present)).toEqual(['a', 'z'].map(materialId))
})
it('get and window resolve alias chains and returned records cannot mutate the snapshot', async () => {
  await material('local', { attestations: [evidence({ place: regionId('old-port') })] })
  await f.write('data/aliases.json', [
    { old: 'old-material', new: 'older-material' }, { old: 'older-material', new: materialId('local') },
    { old: regionId('old-port'), new: regionId('port-royal') },
    { old: regionId('old-caribbean'), new: regionId('caribbean') },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.get('old-material')?.id).toBe(materialId('local'))
  expect(cat.get('missing')).toBeUndefined()
  cat.get('old-material')!.attestations.length = 0
  const result = cat.window({ ...query, region: regionId('old-caribbean') })
  expect(ids(result.present)).toEqual([materialId('local')])
  result.present[0].attestations.length = 0
  expect(cat.window(query).present[0].attestations).toHaveLength(1)
})
