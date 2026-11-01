import { afterEach, beforeEach, expect, it } from 'vitest'
import { checkRecords } from '../src/check.ts'
import { loadRecords } from '../src/load.ts'
import { attestation, date, fixture, observation, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })
const check = async () => checkRecords(await loadRecords(f.root))
async function checkRecord(patch: object) { await f.write('data/material/example.json', { ...record(), ...patch }); return (await check()).join('\n') }

it('passes an empty catalogue', async () => expect(await check()).toEqual([]))
it('reports bad JSON', async () => { await f.write('data/example.json', '{', true); expect((await check()).join()).toContain('bad JSON') })
it.each(['material.example', 'catalogue/material.Bad', 'catalogue/material.a/b', 'catalogue/material.a.b', 'catalogue/region.example'])('rejects id syntax or kind mismatch: %s', async id => expect(await checkRecord({ id })).toContain('invalid id'))
it('rejects a file name unequal to the local slug', async () => expect(await checkRecord({ id: 'catalogue/material.other' })).toContain('file name must be other.json'))
it('accepts a numeric id disambiguator and matching filename', async () => {
  await f.write('data/material/example.2.json', record('example.2'))
  expect(await check()).toEqual([])
})
it('rejects duplicate ids across native and fixture records', async () => {
  await f.write('data/example.json', record())
  await f.write('fixtures/demo/records/example.json', record())
  expect((await check()).join()).toContain('duplicate id')
})
it.each(['researched', 'estimate'])('requires sources for %s attestations and observations', async label => {
  const errors = await checkRecord({ attestations: [{ ...attestation(), label }], observations: [{ ...observation(), label }] })
  expect(errors).toContain(`attestations[0]: ${label} requires a source`)
  expect(errors).toContain(`observations[0]: ${label} requires a source`)
})
it('rejects absence without a source even with an open label', async () => expect(await checkRecord({ attestations: [{ ...attestation(), what: 'absence' }] })).toContain('absence requires a source'))
it('rejects game scope with real provenance', async () => expect(await checkRecord({ scope: 'game:test', provenance: ['real'] })).toContain('game scope cannot have real'))
it.each([
  ['source', { sources: ['missing'] }],
  ['attestation source', { attestations: [{ ...attestation(), sources: ['missing'] }] }],
  ['observation source', { observations: [{ ...observation(), sources: ['missing'] }] }],
  ['place', { attestations: [{ ...attestation(), place: 'missing' }] }],
  ['observation place', { observations: [{ ...observation(), place: 'missing' }] }],
  ['culture', { attestations: [{ ...attestation(), culture: 'missing' }] }],
  ['region', { names: [{ ...record().names[0], region: 'missing' }] }],
  ['period', { names: [{ ...record().names[0], period: 'missing' }] }],
  ['relation target', { relations: [{ rel: 'is_a', to: 'missing' }] }],
  ['relation source', { relations: [{ rel: 'is_a', to: record().id, sources: ['missing'] }] }],
])('rejects unresolved %s references', async (_name, patch) => expect(await checkRecord(patch)).toContain('unresolved reference missing'))
it('follows multi-hop aliases for references', async () => {
  await f.write('data/aliases.json', [{ old: 'old', new: 'older' }, { old: 'older', new: record().id }])
  expect(await checkRecord({ relations: [{ rel: 'same_as', to: 'old' }] })).toBe('')
})
it('rejects alias cycles including self loops', async () => {
  await f.write('data/aliases.json', [{ old: 'a', new: 'b' }, { old: 'b', new: 'a' }, { old: 'self', new: 'self' }])
  expect((await check()).filter(line => line.includes('alias cycle'))).toHaveLength(3)
})
it('rejects aliases to missing ids', async () => {
  await f.write('data/aliases.json', [{ old: 'a', new: 'missing' }])
  expect((await check()).join()).toContain('alias to missing id')
})
it('rejects duplicate alias definitions', async () => {
  await f.write('data/aliases.json', [{ old: 'a', new: 'b' }, { old: 'a', new: 'c' }])
  expect((await check()).join()).toContain('duplicate alias')
})
it('reports bad enum values from runtime validation', async () => expect(await checkRecord({ kind: 'bad' })).toContain('record.kind'))
it('reports from > to', async () => expect(await checkRecord({ attestations: [{ ...attestation(), date: { ...date(), from: { year: 10 } } }] })).toContain('from > to'))
it('returns deterministic sorted failure lines', async () => {
  await f.write('data/z.json', record())
  await f.write('data/a.json', record())
  const errors = await check()
  expect(errors).toEqual([...errors].sort())
  expect(await check()).toEqual(errors)
})
