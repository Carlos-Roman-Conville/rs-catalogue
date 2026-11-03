import { afterEach, beforeEach, expect, it } from 'vitest'
import { checkRecords } from '../src/check.ts'
import { loadRecords } from '../src/load.ts'
import { attestation, date, fixture, observation, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })
const check = async () => checkRecords(await loadRecords(f.root))
const use = (role: string, mechanism = 'life.energy.balance', model_version = 'v1') => ({ role, mechanism, model_version, unit: '5488' })

it.each(['calibration', 'selection'])('rejects validation of a lineage used for %s at any version', async role => {
  await f.write('data/material/fit.json', { ...record('fit'), observations: [
    { ...observation(), lineage: 'primary', uses: [use(role), use(role, 'life.energy.balance', 'v2')] },
  ] })
  const errors = await checkRecord({ observations: [{ ...observation(), lineage: 'primary', uses: [use('validation', 'life.energy.balance', 'v3')] }] })
  for (const text of ['catalogue/material.example.observations[0]', 'catalogue/material.fit.observations[0]', 'life.energy.balance', 'lineage primary']) expect(errors).toContain(text)
})
it('allows validation by another mechanism and context on the fitted row', async () => {
  expect(await checkRecord({ observations: [
    { ...observation(), lineage: 'primary', uses: [use('calibration'), use('context')] },
    { ...observation(), lineage: 'primary', uses: [use('validation', 'other.mechanism')] },
    { ...observation(), uses: [] },
  ] })).toBe('')
})
it('guards an unlabelled row itself and copies naming its default key', async () => {
  const fitted = { ...observation(), uses: [use('calibration'), use('validation')] }
  expect(await checkRecord({ observations: [fitted] })).toContain('lineage catalogue/material.example.observations[0]')
  expect(await checkRecord({ observations: [
    { ...fitted, uses: [use('calibration')] },
    { ...observation(), lineage: 'catalogue/material.example.observations[0]', uses: [use('validation')] },
  ] })).toContain('validation conflicts')
  expect(await checkRecord({ observations: [
    { ...fitted, uses: [use('calibration')] }, { ...observation(), uses: [use('validation')] },
  ] })).toBe('')
})
it.each([
  { uses: [use('unknown')] }, { uses: 'invalid' }, { uses: [{ ...use('context'), mechanism: '' }] },
  { uses: [{ ...use('context'), model_version: 1 }] }, { uses: [{ ...use('context'), unit: 5488 }] },
  { lineage: '' }, { shared: [1] }, { shared: 'group' },
])('rejects malformed use-record fields: %j', async patch => {
  expect(await checkRecord({ observations: [{ ...observation(), ...patch }] })).toContain('record.observations[0]')
})
async function checkRecord(patch: object) { await f.write('data/material/example.json', { ...record(), ...patch }); return (await check()).join('\n') }

it('passes an empty catalogue', async () => expect(await check()).toEqual([]))
it.each([undefined, null])('unknown-ended dates are valid under check for evidence and relations (to=%s)', async to => {
  const d = { ...date(), from: { year: 1655 }, to, end_basis: 'unknown' }
  await f.write('data/material/parent.json', record('parent'))
  expect(await checkRecord({
    attestations: [{ ...attestation(), date: d }],
    observations: [{ ...observation(), date: d }],
    relations: [{ rel: 'part_of', to: record('parent').id, date: d }],
  })).toBe('')
})
it('open-ended cycle detection still rejects relations overlapping in the far future', async () => {
  await f.write('data/material/a.json', { ...record('a'), relations: [{ rel: 'part_of', to: record('b').id, date: { ...date(), to: null, end_basis: 'open' }, note: 'Synthetic membership continues indefinitely' }] })
  await f.write('data/material/b.json', { ...record('b'), relations: [{ rel: 'part_of', to: record('a').id, date: { ...date(), from: { year: 10000 }, to: undefined, end_basis: 'open' }, note: 'Synthetic membership continues indefinitely' }] })
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

it('passes benchmark_role on an undated observation in a development region', async () => {
  await writeEnglandRegion()
  expect(await checkRecord({
    observations: [{
      ...observation(),
      place: 'catalogue/region.england',
      date: null,
      value: null,
      label: 'open',
      benchmark_role: 'development',
    }],
  })).toBe('')
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
it('passes when a native CAT- source record has empty derived_from', async () => {
  await f.write('data/source/cat-example.json', {
    id: 'catalogue/source.cat-example',
    kind: 'source',
    source: { key: 'CAT-EXAMPLE', title: 'Example', gives: 'g', rights: 'r' },
    names: [{ text: 'Example', lang: 'en', use: 'preferred' }],
    classification: [],
    provenance: ['real'],
    scope: 'universal',
    attestations: [],
    observations: [],
    relations: [],
    sources: [],
    derived_from: [],
  })
  expect(await check()).toEqual([])
})

it('rejects a native CAT- source record with non-empty derived_from', async () => {
  await f.write('data/source/cat-bad.json', {
    id: 'catalogue/source.cat-bad',
    kind: 'source',
    source: { key: 'CAT-BAD', title: 'Bad', gives: 'g', rights: 'r' },
    names: [{ text: 'Bad', lang: 'en', use: 'preferred' }],
    classification: [],
    provenance: ['real'],
    scope: 'universal',
    attestations: [],
    observations: [],
    relations: [],
    sources: [],
    derived_from: [{ file: 'x.md', anchor: 'a', sha256: '0'.repeat(64) }],
  })
  expect((await check()).join('\n')).toContain('catalogue/source.cat-bad: native source record must have empty derived_from')
})
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

it('an open-start absence window contains an earlier invention; an open-start invention is never contained', async () => {
  await writeCheckSource()
  const src = 'catalogue/source.fix'
  const rows = (window: object, invention: object) => ({ attestations: [
    { ...attestation(), what: 'absence', label: 'estimate', date: window, sources: [src], note: 'Synthetic absence extends indefinitely before its end' },
    { ...attestation(), what: 'invention', label: 'researched', date: invention, sources: [src], note: 'Synthetic invention interval extends indefinitely before its end' },
  ] })
  const open = { ...date(), from: null, start_basis: 'open', to: { year: 1730 } }
  expect(await checkRecord(rows(open, { ...date(), from: { year: 1000 }, to: { year: 1000 } }))).toContain('absence window contains attestations[1]')
  expect(await checkRecord(rows(open, { ...date(), from: null, start_basis: 'open', to: { year: 1000 } }))).toBe('')
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

async function checkProduct(relations: object[]) {
  await f.write('data/product/bread.json', { ...record('bread'), id: 'catalogue/product.bread', kind: 'product', condition: 'day of baking', relations })
  return (await check()).join('\n')
}
const ingredient = { rel: 'made_of', to: 'catalogue/material.example' }
it.each(['organism', 'product', 'substance', 'material'])('accepts a product made_of %s through aliases, with zero or one made_by', async kind => {
  await f.write('data/material/example.json', record())
  const id = `catalogue/${kind}.ingredient`
  await f.write(`data/${kind}/ingredient.json`, { ...record('ingredient'), id, kind,
    ...(kind === 'product' ? { condition: 'dried', relations: [ingredient] } : {}) })
  await f.write('data/practice/baking.json', { ...record('baking'), id: 'catalogue/practice.baking', kind: 'practice' })
  await f.write('data/product/stale.json', { ...record('stale'), id: 'catalogue/product.stale', kind: 'product', condition: 'stale', relations: [ingredient] })
  await f.write('data/aliases.json', [{ old: 'old-ingredient', new: 'older-ingredient' }, { old: 'older-ingredient', new: id },
    { old: 'baking', new: 'catalogue/practice.baking' }, { old: 'stale', new: 'catalogue/product.stale' }])
  const relations = [{ rel: 'made_of', to: 'old-ingredient' }, { rel: 'variant_of', to: 'stale' }]
  expect(await checkProduct(relations)).toBe('')
  expect(await checkProduct([...relations, { rel: 'made_by', to: 'baking' }])).toBe('')
})
it('requires at least one made_of on a product', async () => {
  expect(await checkProduct([])).toContain('catalogue/product.bread: made_of: product requires at least one relation')
})
it.each(['made_of', 'made_by', 'variant_of'])('rejects a product %s to a region through aliases', async rel => {
  await f.write('data/material/example.json', record())
  await f.write('data/region/place.json', { ...record('place'), id: 'catalogue/region.place', kind: 'region' })
  await f.write('data/aliases.json', [{ old: 'place', new: 'catalogue/region.place' }])
  const rule = rel === 'made_of' ? 'organism|product|substance|material' : rel === 'made_by' ? 'practice' : 'another product'
  expect(await checkProduct([ingredient, { rel, to: 'place' }])).toContain(`catalogue/product.bread: relations[1] ${rel}: product must resolve to ${rule} record`)
})
it('rejects two made_by relations even when both target practices', async () => {
  await f.write('data/material/example.json', record())
  for (const slug of ['baking', 'boiling']) await f.write(`data/practice/${slug}.json`, { ...record(slug), id: `catalogue/practice.${slug}`, kind: 'practice' })
  expect(await checkProduct([ingredient, { rel: 'made_by', to: 'catalogue/practice.baking' }, { rel: 'made_by', to: 'catalogue/practice.boiling' }])).toContain('catalogue/product.bread: made_by: product allows at most one relation')
})
it('rejects variant_of pointing to the same product', async () => {
  await f.write('data/material/example.json', record())
  expect(await checkProduct([ingredient, { rel: 'variant_of', to: 'catalogue/product.bread' }])).toContain('variant_of: product must resolve to another product record')
})
it.each(['made_of', 'made_by', 'variant_of'])('names the product and rule for an unresolved %s', async rel => {
  await f.write('data/material/example.json', record())
  expect(await checkProduct([ingredient, { rel, to: 'missing' }])).toContain(`catalogue/product.bread: relations[1] ${rel}: product must resolve to`)
})
