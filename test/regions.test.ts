import { afterEach, beforeEach, expect, it } from 'vitest'
import { loadRecords, createIdResolver } from '../src/load.ts'
import { createRegionIndex, dateRange, intersectDates } from '../src/regions.ts'
import type { CatalogueRecord, Relation } from '../src/schema.ts'
import { date, fixture, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })
const id = (slug: string) => `catalogue/region.${slug}`
it.each([undefined, null])('open-ended membership includes from and later windows but not earlier ones (to=%s)', async to => {
  await region('caribbean')
  await region('jamaica', [{ rel: 'part_of', to: id('caribbean'), date: { ...date(), from: { year: 1655 }, to } }])
  expect(await descendants('caribbean', 1654)).toEqual([id('caribbean')])
  for (const year of [1655, 1700, 10000]) {
    expect(await descendants('caribbean', year)).toEqual(['caribbean', 'jamaica'].map(id))
  }
})
it('open-start membership includes every window up to to, and both ends open is always', async () => {
  await region('caribbean')
  await region('jamaica', [{ rel: 'part_of', to: id('caribbean'), date: { ...date(), from: null, to: { year: 1700 } } }])
  await region('cuba', [{ rel: 'part_of', to: id('caribbean'), date: { ...date(), from: null, to: null } }])
  for (const year of [-10000, 1700]) expect(await descendants('caribbean', year)).toEqual(['caribbean', 'cuba', 'jamaica'].map(id))
  expect(await descendants('caribbean', 1701)).toEqual(['caribbean', 'cuba'].map(id))
  expect(dateRange(null, null)).toEqual([-Infinity, Infinity])
  expect(intersectDates(dateRange(null, { year: 1752, month: 9, day: 2 }), dateRange({ year: 1752, month: 9, day: 14 }))).toBeUndefined()
})
const during = (from: number, to: number) => ({ ...date(), from: { year: from }, to: { year: to } })
const part = (slug: string, from?: number, to?: number): Relation => ({ rel: 'part_of', to: id(slug), ...(from === undefined ? {} : { date: during(from, to!) }) })
async function region(slug: string, relations: Relation[] = []) {
  const r: CatalogueRecord = { ...record(slug), id: id(slug), kind: 'region', source: undefined, relations }
  await f.write(`data/region/${slug}.json`, r)
}
async function descendants(slug: string, from: number, to = from) {
  const loaded = await loadRecords(f.root)
  return createRegionIndex(loaded.records, createIdResolver(loaded)).descendantsDuring(id(slug), { year: from }, { year: to })
}
async function ancestors(slug: string, from: number, to = from) {
  const loaded = await loadRecords(f.root)
  return createRegionIndex(loaded.records, createIdResolver(loaded)).ancestorsDuring(id(slug), { year: from }, { year: to })
}

it('includes the region and nested Port Royal in Jamaica in the Caribbean, sorted by id', async () => {
  await region('port-royal', [part('jamaica')])
  await region('jamaica', [part('caribbean')])
  await region('caribbean')
  expect(await descendants('caribbean', 1690, 1720)).toEqual(['caribbean', 'jamaica', 'port-royal'].map(id))
})
it('excludes dated membership before and after its interval and includes both overlap edges', async () => {
  await region('caribbean')
  await region('jamaica', [part('caribbean', 1655, 1700)])
  for (const year of [1654, 1701]) expect(await descendants('caribbean', year)).toEqual([id('caribbean')])
  for (const year of [1655, 1700]) expect(await descendants('caribbean', year)).toEqual(['caribbean', 'jamaica'].map(id))
})
it('requires a common date along a transitive path, not independent overlaps with the window', async () => {
  await region('caribbean')
  await region('jamaica', [part('caribbean', 1600, 1650)])
  await region('port-royal', [part('jamaica', 1651, 1700)])
  expect(await descendants('caribbean', 1600, 1700)).toEqual(['caribbean', 'jamaica'].map(id))
})
it('retains alternate paths and separate membership intervals to the same region', async () => {
  await region('caribbean')
  await region('jamaica', [part('caribbean', 1600, 1650), part('caribbean', 1690, 1700)])
  await region('port-royal', [part('jamaica', 1695, 1710)])
  expect(await descendants('caribbean', 1600, 1700)).toEqual(['caribbean', 'jamaica', 'port-royal'].map(id))
})
it('resolves aliases in the query root and containment edges and ignores non-region records', async () => {
  await region('caribbean')
  await region('jamaica', [part('old-caribbean')])
  await f.write('data/aliases.json', [{ old: id('old-caribbean'), new: id('caribbean') }])
  await f.write('data/material/example.json', { ...record(), relations: [part('caribbean')] })
  expect(await descendants('old-caribbean', 1700)).toEqual(['caribbean', 'jamaica'].map(id))
})
it('rejects unknown regions and reversed windows and terminates even on cyclic input', async () => {
  await region('caribbean', [part('jamaica')])
  await region('jamaica', [part('caribbean')])
  expect(await descendants('caribbean', 1700)).toEqual(['caribbean', 'jamaica'].map(id))
  await expect(descendants('missing', 1700)).rejects.toThrow('Unknown region')
  await expect(descendants('caribbean', 1700, 1600)).rejects.toThrow('from > to')
})
it('lists ancestors on both sides of a dated part_of membership', async () => {
  await region('caribbean')
  await region('jamaica', [part('caribbean', 1655, 1700)])
  expect(await ancestors('jamaica', 1654)).toEqual([id('jamaica')])
  expect(await ancestors('jamaica', 1655)).toEqual(['caribbean', 'jamaica'].map(id))
  expect(await ancestors('jamaica', 1700)).toEqual(['caribbean', 'jamaica'].map(id))
  expect(await ancestors('jamaica', 1701)).toEqual([id('jamaica')])
})
it('walks ancestors along a transitive dated path', async () => {
  await region('caribbean')
  await region('jamaica', [part('caribbean', 1600, 1700)])
  await region('port-royal', [part('jamaica', 1650, 1710)])
  expect(await ancestors('port-royal', 1660)).toEqual(['caribbean', 'jamaica', 'port-royal'].map(id))
  expect(await ancestors('port-royal', 1590)).toEqual([id('port-royal')])
})
