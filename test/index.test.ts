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
it('fails opening malformed catalogue data instead of silently omitting records', async () => {
  const f = await fixture()
  try {
    await f.write('data/bad.json', '{', true)
    expect(() => openCatalogue(f.root)).toThrow('data/bad.json: bad JSON')
  } finally { await f.close() }
})
