import { afterEach, beforeEach, expect, it } from 'vitest'
import { openCatalogue } from '../src/index.ts'
import type { CatalogueRecord, Name } from '../src/schema.ts'
import { attestation, date, fixture, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })

const regionId = (slug: string) => `catalogue/region.${slug}`
const periodId = (slug: string) => `catalogue/period.${slug}`
const materialId = (slug: string) => `catalogue/material.${slug}`

async function writeRegion(slug: string, relations: CatalogueRecord['relations'] = []) {
  await f.write(`data/region/${slug}.json`, { ...record(slug), id: regionId(slug), kind: 'region', relations })
}

async function writePeriod(slug: string, presenceFrom: number, presenceTo?: number) {
  const r: CatalogueRecord = {
    ...record(slug),
    id: periodId(slug),
    kind: 'period',
    source: undefined,
    attestations: [{
      ...attestation(),
      what: 'presence',
      date: { ...date(), from: { year: presenceFrom }, to: presenceTo === undefined ? null : { year: presenceTo } },
    }],
  }
  await f.write(`data/period/${slug}.json`, r)
}

async function writeMaterial(slug: string, names: Name[]) {
  await f.write(`data/material/${slug}.json`, { ...record(slug), id: materialId(slug), kind: 'material', names })
}

it('returns the preferred name in the requested language', async () => {
  await writeMaterial('coin', [
    { text: 'Preferred coin', lang: 'en', use: 'preferred' },
    { text: 'Moneda', lang: 'es', use: 'preferred' },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('coin'), { lang: 'en' })).toBe('Preferred coin')
})

it('chooses a constrained period name inside its region and period', async () => {
  await writeRegion('island')
  await writeRegion('town', [{ rel: 'part_of', to: regionId('island') }])
  await writePeriod('golden-age', 1680, 1700)
  await writeMaterial('doubloon', [
    { text: 'Plain doubloon', lang: 'en', use: 'preferred' },
    {
      text: 'Island golden doubloon',
      lang: 'en',
      use: 'period',
      region: regionId('island'),
      period: periodId('golden-age'),
    },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('doubloon'), {
    lang: 'en',
    at: regionId('island'),
    year: 1690,
  })).toBe('Island golden doubloon')
})

it('does not choose a constrained period name outside its period or without year', async () => {
  await writeRegion('island')
  await writePeriod('golden-age', 1680, 1700)
  await writeMaterial('doubloon', [
    { text: 'Plain doubloon', lang: 'en', use: 'preferred' },
    {
      text: 'Island golden doubloon',
      lang: 'en',
      use: 'period',
      region: regionId('island'),
      period: periodId('golden-age'),
    },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('doubloon'), { lang: 'en', at: regionId('island'), year: 1710 })).toBe('Plain doubloon')
  expect(cat.label(materialId('doubloon'), { lang: 'en', at: regionId('island') })).toBe('Plain doubloon')
})

it('accepts a descendant place for a regional constraint during year', async () => {
  await writeRegion('island')
  await writeRegion('town', [{ rel: 'part_of', to: regionId('island') }])
  await writePeriod('golden-age', 1680, 1700)
  await writeMaterial('doubloon', [
    { text: 'Plain doubloon', lang: 'en', use: 'preferred' },
    {
      text: 'Island golden doubloon',
      lang: 'en',
      use: 'period',
      region: regionId('island'),
      period: periodId('golden-age'),
    },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('doubloon'), {
    lang: 'en',
    at: regionId('town'),
    year: 1690,
  })).toBe('Island golden doubloon')
})

it('resolves alias ids before labelling', async () => {
  await writeMaterial('coin', [{ text: 'Old coin name', lang: 'en', use: 'preferred' }])
  await f.write('data/aliases.json', [{ old: materialId('legacy-coin'), new: materialId('coin') }])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('legacy-coin'), { lang: 'en' })).toBe('Old coin name')
})

it('returns an unconstrained period name when no preferred name exists in the language', async () => {
  await writeMaterial('piece', [
    { text: 'Real de a ocho', lang: 'es', use: 'period' },
    { text: 'Piece of eight', lang: 'en', use: 'alternate' },
  ])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('piece'), { lang: 'es' })).toBe('Real de a ocho')
})

it('returns undefined for an unknown language or unknown id', async () => {
  await writeMaterial('coin', [{ text: 'Coin', lang: 'en', use: 'preferred' }])
  const cat = openCatalogue(f.root)
  expect(cat.label(materialId('coin'), { lang: 'fr' })).toBeUndefined()
  expect(cat.label(materialId('missing'), { lang: 'en' })).toBeUndefined()
})
