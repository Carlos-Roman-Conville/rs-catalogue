import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { checkDrift, inspectDrift } from '../src/drift.ts'

let root: string
const hash = (text: string) => createHash('sha256').update(text).digest('hex')
const manifestPath = 'fixtures/demo/manifest.json'
async function write(path: string, value: unknown, raw = false) {
  await mkdir(dirname(join(root, path)), { recursive: true })
  await writeFile(join(root, path), raw ? String(value) : JSON.stringify(value))
}
beforeEach(async () => {
  root = await mkdtemp(join(process.cwd(), '.drift-test-'))
  await write('source.md', 'original\r\n', true)
  await write(manifestPath, { name: 'demo', files: [{ path: 'source.md', sha256: hash('original\r\n') }] })
  await write('fixtures/demo/records/nested/example.json', { id: 'catalogue/material.example', derived_from: [{ file: 'source.md', anchor: 'heading', sha256: hash('original\r\n') }] })
})
afterEach(async () => { await rm(root, { recursive: true, force: true }) })

it('V6 accepts matching byte hashes and counts nested records', () => {
  expect(inspectDrift(root)).toEqual({ files: 1, records: 1, failures: [] })
})
it('V6 reports changed and missing source files without refreshing hashes', async () => {
  const original = await readFile(join(root, manifestPath), 'utf8')
  await write('source.md', 'original\n', true)
  expect(checkDrift(root).join()).toContain('source.md: sha256 differs')
  expect(await readFile(join(root, manifestPath), 'utf8')).toBe(original)
  await rm(join(root, 'source.md'))
  expect(checkDrift(root).join()).toContain('cannot read source (ENOENT)')
})
it('V6 reports stale records and provenance absent from their own manifest', async () => {
  await write('fixtures/demo/records/stale.json', { derived_from: [
    { file: 'source.md', sha256: hash('stale') }, { file: 'unknown.md', sha256: hash('unknown') },
  ] })
  const failures = checkDrift(root)
  expect(failures).toHaveLength(2)
  expect(failures[0]).toContain('sha256 differs from manifest; re-ingest record')
  expect(failures[1]).toContain('not in fixture manifest; re-ingest record')
})
it('V6 update refreshes manifests but leaves sources and stale records untouched', async () => {
  await write('source.md', 'changed', true)
  const recordPath = join(root, 'fixtures/demo/records/nested/example.json')
  const original = await readFile(recordPath, 'utf8')
  expect(inspectDrift(root, true).failures.join()).toContain('re-ingest record')
  expect(JSON.parse(await readFile(join(root, manifestPath), 'utf8')).files[0].sha256).toBe(hash('changed'))
  expect(await readFile(recordPath, 'utf8')).toBe(original)
  expect(await readFile(join(root, 'source.md'), 'utf8')).toBe('changed')
})
it('V6 reports a missing manifest and malformed JSON instead of passing silently', async () => {
  await rm(join(root, manifestPath))
  expect(checkDrift(root).join()).toContain('manifest.json: cannot read (ENOENT)')
  await write(manifestPath, '{', true)
  expect(checkDrift(root).join()).toContain('manifest.json: bad JSON')
})
it('V6 update does not partially rewrite a manifest with a missing source', async () => {
  await write(manifestPath, { name: 'demo', files: [
    { path: 'source.md', sha256: hash('old') }, { path: 'missing.md', sha256: hash('missing') },
  ] })
  const original = await readFile(join(root, manifestPath), 'utf8')
  expect(inspectDrift(root, true).failures.join()).toContain('cannot read source')
  expect(await readFile(join(root, manifestPath), 'utf8')).toBe(original)
})
