import { afterEach, beforeEach, expect, it } from 'vitest'
import { loadRecords, loadRecordsSync } from '../src/load.ts'
import { fixture, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
beforeEach(async () => { f = await fixture() })
afterEach(async () => { await f.close() })
it('loads recursive data and fixture records sorted by id, excluding aliases and fixture manifests', async () => {
  await f.write('data/material/z.json', record('z'))
  await f.write('fixtures/demo/records/nested/a.json', record('a'))
  await f.write('fixtures/demo/manifest.json', 'ignored', true)
  await f.write('data/aliases.json', [{ old: 'old', new: 'catalogue/material.a' }])
  const loaded = await loadRecords(f.root)
  expect(loaded.records.map(r => r.id)).toEqual(['catalogue/material.a', 'catalogue/material.z'])
  expect(loaded.aliases).toEqual([{ old: 'old', new: 'catalogue/material.a' }])
  expect(loaded.failures).toEqual([])
})
it('treats missing catalogue directories and aliases as empty', async () => {
  expect(await loadRecords(f.root)).toEqual({ records: [], entries: [], aliases: [], failures: [] })
})
it('synchronous and asynchronous entry points load identical snapshots', async () => {
  await f.write('data/example.json', record())
  expect(loadRecordsSync(f.root)).toEqual(await loadRecords(f.root))
})
it('reports bad JSON with the relative file path and keeps loading', async () => {
  await f.write('data/bad.json', '{', true)
  await f.write('data/example.json', record())
  expect((await loadRecords(f.root)).failures).toEqual(['data/bad.json: bad JSON'])
  expect((await loadRecords(f.root)).records).toHaveLength(1)
})
it.each(['{', '{}', '[null]', '[{"old":"x","new":2}]'])('reports malformed aliases: %s', async text => {
  await f.write('data/aliases.json', text, true)
  expect((await loadRecords(f.root)).failures.join()).toContain('data/aliases.json')
})
