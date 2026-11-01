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
it.each([undefined, null])('open-ended dates are valid under check for evidence and relations (to=%s)', async to => {
  const d = { ...date(), from: { year: 1655 }, to }
  await f.write('data/material/parent.json', record('parent'))
  expect(await checkRecord({
    attestations: [{ ...attestation(), date: d }],
    observations: [{ ...observation(), date: d }],
    relations: [{ rel: 'part_of', to: record('parent').id, date: d }],
  })).toBe('')
})
it('open-ended cycle detection still rejects relations overlapping in the far future', async () => {
  await f.write('data/material/a.json', { ...record('a'), relations: [{ rel: 'part_of', to: record('b').id, date: { ...date(), to: null } }] })
  await f.write('data/material/b.json', { ...record('b'), relations: [{ rel: 'part_of', to: record('a').id, date: { ...date(), from: { year: 10000 }, to: undefined } }] })
  expect((await check()).filter(line => line.includes('part_of cycle'))).toHaveLength(2)
})
it('reports bad JSON', async () => { await f.write('data/example.json', '{', true); expect((await check()).join()).toContain('bad JSON') })
it.each(['material.example', 'catalogue/material.Bad', 'catalogue/material.a/b', 'catalogue/material.a.b', 'catalogue/region.example'])('rejects id syntax or kind mismatch: %s', async id => expect(await checkRecord({ id })).toContain('invalid id'))
it('rejects a file name unequal to the local slug', async () => expect(await checkRecord({ id: 'catalogue/material.other' })).toContain('file name must be other.json'))
it('accepts a numeric id disambiguator and matching filename', async () => {
  await f.write('data/material/example.2.json', record('example.2'))
  expect(await check()).toEqual([])
})
it('rejects duplicate ids across native and fixture records', async () => {
  await f.write('data/material/example.json', record())
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
  await f.write('data/material/z.json', record('z'))
  await f.write('data/material/a.json', record('a'))
  const errors = await check()
  expect(errors).toEqual([...errors].sort())
  expect(await check()).toEqual(errors)
})

it('rejects undated part_of cycles, including self loops and aliased edges', async () => {
  await f.write('data/material/a.json', { ...record('a'), relations: [{ rel: 'part_of', to: 'old-b' }] })
  await f.write('data/material/b.json', { ...record('b'), relations: [{ rel: 'part_of', to: record('a').id }] })
  await f.write('data/material/self.json', { ...record('self'), relations: [{ rel: 'part_of', to: record('self').id }] })
  await f.write('data/aliases.json', [{ old: 'old-b', new: record('b').id }])
  expect((await check()).filter(line => line.includes('part_of cycle'))).toHaveLength(3)
})

async function writeEnglandRegion() {
  await f.write('data/region/england.json', {
    ...record('england'),
    id: 'catalogue/region.england',
    kind: 'region',
    source: undefined,
    relations: [],
  })
}

async function writeGreenlandRegion() {
  await f.write('data/region/greenland.json', {
    ...record('greenland'),
    id: 'catalogue/region.greenland',
    kind: 'region',
    source: undefined,
    relations: [],
  })
}

const englandObs = (patch: object = {}) => ({
  ...observation(),
  place: 'catalogue/region.england',
  date: { ...date(), from: { year: 1300 }, to: { year: 1300 } },
  ...patch,
})

it('passes a missing benchmark_role in a development window', async () => {
  await writeEnglandRegion()
  expect(await checkRecord({ observations: [englandObs()] })).toBe('')
})

it('rejects a benchmark_role outside every active window', async () => {
  await writeEnglandRegion()
  expect(await checkRecord({
    observations: [englandObs({
      date: { ...date(), from: { year: 1086 }, to: { year: 1086 } },
      benchmark_role: 'development',
    })],
  })).toContain('outside every benchmark window')
})

it('rejects a benchmark_role mismatch inside a development window', async () => {
  await writeEnglandRegion()
  expect(await checkRecord({ observations: [englandObs({ benchmark_role: 'held_out' })] })).toContain('mismatch with H1')
})

it('rejects a missing benchmark_role inside a held_out window', async () => {
  await writeGreenlandRegion()
  expect(await checkRecord({
    observations: [{
      ...observation(),
      place: 'catalogue/region.greenland',
      date: { ...date(), from: { year: 1100 }, to: { year: 1100 } },
    }],
  })).toContain('required in held_out window H3')
})

it('passes a held_out benchmark_role inside the held_out window', async () => {
  await writeGreenlandRegion()
  expect(await checkRecord({
    observations: [{
      ...observation(),
      place: 'catalogue/region.greenland',
      date: { ...date(), from: { year: 1100 }, to: { year: 1100 } },
      benchmark_role: 'held_out',
    }],
  })).toBe('')
})
async function writeCheckSource() {
  await f.write('data/source/fix.json', {
    id: 'catalogue/source.fix',
    kind: 'source',
    source: { key: 'FIX', title: 'Fix', gives: 'g', rights: 'r' },
    names: [{ text: 'Fix', lang: 'en', use: 'preferred' }],
    classification: [],
    provenance: ['original_fiction'],
    scope: 'universal',
    attestations: [],
    observations: [],
    relations: [],
    sources: [],
    derived_from: [],
  })
}

it('accepts a record under data/<kind>/', async () => expect(await checkRecord({})).toBe(''))
it('rejects a record not under data/<kind>/', async () => {
  await f.write('data/example.json', record())
  expect((await check()).join()).toContain('directory must be data/material/')
})
it('accepts universal scope under data/', async () => expect(await checkRecord({ scope: 'universal' })).toBe(''))
it('rejects game scope under data/', async () => expect(await checkRecord({ scope: 'game:test' })).toContain('game scope stays under fixtures/'))
it('accepts universal references to universal records', async () => {
  await f.write('fixtures/demo/records/target.json', { ...record('target'), scope: 'universal' })
  expect(await checkRecord({ relations: [{ rel: 'same_as', to: record('target').id }] })).toBe('')
})
it('rejects universal references to game-scoped records', async () => {
  const gameId = 'catalogue/material.game-only'
  await f.write('fixtures/demo/records/game-only.json', { ...record('game-only'), scope: 'game:demo' })
  expect(await checkRecord({ relations: [{ rel: 'same_as', to: gameId }] })).toContain('universal record references game-scoped')
})
it('rejects a universal reference to a game-scoped record through sources', async () => {
  const gameId = 'catalogue/material.game-only'
  await f.write('fixtures/demo/records/game-only.json', { ...record('game-only'), scope: 'game:demo' })
  expect(await checkRecord({ sources: [gameId] })).toContain('universal record references game-scoped')
})
it('rejects a universal reference to a game-scoped record through attestation place', async () => {
  const gameId = 'catalogue/material.game-only'
  await f.write('fixtures/demo/records/game-only.json', { ...record('game-only'), scope: 'game:demo' })
  expect(await checkRecord({ attestations: [{ ...attestation(), place: gameId }] })).toContain('universal record references game-scoped')
})

it('passes when a dated invention lies outside the absence window', async () => {
  await writeCheckSource()
  const src = 'catalogue/source.fix'
  const window = { ...date(), from: { year: 1650 }, to: { year: 1730 } }
  const invention = { ...date(), from: { year: 1740 }, to: { year: 1740 } }
  expect(await checkRecord({
    attestations: [
      { ...attestation(), what: 'absence', label: 'estimate', date: window, sources: [src] },
      { ...attestation(), what: 'invention', label: 'researched', date: invention, sources: [src] },
    ],
  })).toBe('')
})

it('rejects an absence window that contains the record\'s own dated invention', async () => {
  await writeCheckSource()
  const src = 'catalogue/source.fix'
  const window = { ...date(), from: { year: 1650 }, to: { year: 1730 } }
  const invention = { ...date(), from: { year: 1727 }, to: { year: 1727 } }
  expect(await checkRecord({
    attestations: [
      { ...attestation(), what: 'absence', label: 'estimate', date: window, sources: [src] },
      { ...attestation(), what: 'invention', label: 'researched', date: invention, sources: [src] },
    ],
  })).toContain('attestations[0]: absence window contains attestations[1] (invention)')
})

it('rejects a dated cycle only when all edges share a date, including a shared endpoint', async () => {
  const interval = (from: number, to: number) => ({ ...date(), from: { year: from }, to: { year: to } })
  await f.write('data/material/a.json', { ...record('a'), relations: [{ rel: 'part_of', to: record('b').id, date: interval(1600, 1655) }] })
  await f.write('data/material/b.json', { ...record('b'), relations: [{ rel: 'part_of', to: record('c').id, date: interval(1655, 1700) }] })
  await f.write('data/material/c.json', { ...record('c'), relations: [{ rel: 'part_of', to: record('a').id, date: interval(1600, 1700) }] })
  expect((await check()).filter(line => line.includes('part_of cycle'))).toHaveLength(3)
  await f.write('data/material/c.json', { ...record('c'), relations: [{ rel: 'part_of', to: record('a').id, date: interval(1656, 1700) }] })
  expect(await check()).toEqual([])
})
