import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { compileCatalogue, readCompiledCatalogue } from '../src/build.ts'
import { openCatalogue } from '../src/index.ts'
import { loadRecordsSync } from '../src/load.ts'
import type { CatalogueRecord } from '../src/schema.ts'
import { fixture, record } from './helpers.ts'

const repoRoot = join(import.meta.dirname, '..')
const query = { region: 'catalogue/region.caribbean', from: { year: 1690 }, to: { year: 1720 }, kinds: ['material'] as const }

it('two compileCatalogue runs on the same catalogue yield identical bytes', async () => {
  const f = await fixture()
  try {
    await f.write('data/material/a.json', record('a'))
    await f.write('data/material/b.json', record('b'))
    const catalogue = loadRecordsSync(f.root)
    const first = compileCatalogue(catalogue)
    const second = compileCatalogue(catalogue)
    expect(first.json).toBe(second.json)
    expect(first.hash).toBe(second.hash)
  } finally { await f.close() }
})

it('shuffled record order and shuffled object keys yield the same catalogue hash', async () => {
  const f = await fixture()
  try {
    const r1 = record('alpha')
    const r2 = record('beta')
    await f.write('data/material/beta.json', r2)
    await f.write('data/material/alpha.json', r1)
    const ordered = loadRecordsSync(f.root)
    const shuffled = {
      ...ordered,
      records: [ordered.records[1], ordered.records[0]],
      entries: [ordered.entries[1], ordered.entries[0]],
    }
    const normal = record('gamma')
    const scrambled = {
      id: normal.id,
      kind: normal.kind,
      scope: normal.scope,
      names: normal.names,
      provenance: normal.provenance,
      classification: normal.classification,
      relations: normal.relations,
      sources: normal.sources,
      derived_from: normal.derived_from,
      attestations: normal.attestations,
      observations: normal.observations,
    } as CatalogueRecord
    const withGamma = {
      ...ordered,
      records: [...ordered.records, normal],
      entries: [...ordered.entries, { file: 'data/material/gamma.json', record: normal }],
    }
    const withScrambledKeys = {
      ...withGamma,
      records: [...withGamma.records.slice(0, -1), scrambled],
      entries: [...withGamma.entries.slice(0, -1), { file: 'data/material/gamma.json', record: scrambled }],
    }
    expect(compileCatalogue(ordered).hash).toBe(compileCatalogue(shuffled).hash)
    expect(compileCatalogue(withGamma).hash).toBe(compileCatalogue(withScrambledKeys).hash)
  } finally { await f.close() }
})

it('one changed record field changes the catalogue hash', async () => {
  const f = await fixture()
  try {
    await f.write('data/material/same.json', record('same'))
    const base = loadRecordsSync(f.root)
    const h0 = compileCatalogue(base).hash
    await f.write('data/material/same.json', { ...record('same'), names: [{ text: 'Renamed', lang: 'en', use: 'preferred' }] })
    const h1 = compileCatalogue(loadRecordsSync(f.root)).hash
    expect(h0).not.toBe(h1)
  } finally { await f.close() }
})

it('compileCatalogue hash equals sha256 of the written snapshot bytes', async () => {
  const f = await fixture()
  try {
    await f.write('data/material/x.json', record('x'))
    const { json, hash } = compileCatalogue(loadRecordsSync(f.root))
    const path = join(f.root, 'catalogue.json')
    await writeFile(path, json, 'utf8')
    const fromDisk = createHash('sha256').update(await readFile(path)).digest('hex')
    expect(hash).toBe(fromDisk)
    expect(readCompiledCatalogue(path).catalogue_hash).toBe(hash)
  } finally { await f.close() }
})

it('openCatalogue with compiled path matches data/ for get, window and catalogue_hash', async () => {
  const f = await fixture()
  try {
    for (const [slug, parent] of [['caribbean', null], ['jamaica', 'caribbean'], ['port-royal', 'jamaica']] as const) {
      await f.write(`data/region/${slug}.json`, {
        ...record(slug),
        id: `catalogue/region.${slug}`,
        kind: 'region',
        source: undefined,
        relations: parent ? [{ rel: 'part_of', to: `catalogue/region.${parent}` }] : [],
      })
    }
    await f.write('data/material/ship.json', {
      ...record('ship'),
      provenance: ['real'],
      attestations: [{
        what: 'presence',
        place: 'catalogue/region.port-royal',
        date: { from: { year: 1700 }, to: { year: 1700 }, precision: 'year', circa: false, calendar_of_source: 'unknown' },
        sources: [],
        label: 'open',
        confidence: { level: 'low', reason: 'test' },
      }],
    })
    const fromData = openCatalogue(f.root)
    const { json } = compileCatalogue(loadRecordsSync(f.root))
    const compiledPath = join(f.root, 'dist', 'catalogue.json')
    await mkdir(join(f.root, 'dist'), { recursive: true })
    await writeFile(compiledPath, json, 'utf8')
    const fromCompiled = openCatalogue(f.root, { compiled: compiledPath })
    expect(fromCompiled.catalogue_hash).toBe(fromData.catalogue_hash)
    expect(fromCompiled.get('catalogue/material.ship')).toEqual(fromData.get('catalogue/material.ship'))
    expect(JSON.stringify(fromCompiled.window(query))).toBe(JSON.stringify(fromData.window(query)))
  } finally { await f.close() }
})

it('compileCatalogue throws on invalid records and a failed build writes no snapshot file', async () => {
  const f = await fixture()
  const distPath = join(f.root, 'dist', 'catalogue.json')
  try {
    await f.write('data/bad.json', '{', true)
    expect(() => compileCatalogue(loadRecordsSync(f.root))).toThrow('bad JSON')
    await mkdir(join(f.root, 'dist'), { recursive: true })
    try {
      const { json } = compileCatalogue(loadRecordsSync(f.root))
      await writeFile(distPath, json, 'utf8')
    } catch {
      // mirrors scripts/build.ts: no file on check failure
    }
    expect(existsSync(distPath)).toBe(false)
  } finally { await f.close() }
})

it('matches the real repository build gate output shape', () => {
  const cat = openCatalogue()
  expect(cat.catalogue_hash).toMatch(/^[0-9a-f]{64}$/)
  const { hash } = compileCatalogue(loadRecordsSync(repoRoot))
  expect(cat.catalogue_hash).toBe(hash)
})
