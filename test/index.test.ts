import { describe, expect, it } from 'vitest'
import { catalogueId } from '../src/index.ts'

describe('ids (DESIGN §2.1)', () => {
  it('qualifies a local id with the catalogue prefix', () => {
    expect(catalogueId('substance.saltpetre')).toBe('catalogue/substance.saltpetre')
  })
  it('refuses a local id containing /', () => {
    expect(() => catalogueId('region.caribbean/jamaica')).toThrow()
  })
})
