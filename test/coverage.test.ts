import { afterEach, beforeEach, expect, it } from 'vitest'
import { COVERAGE_WINDOWS, CARIBBEAN_COVERAGE_WINDOW, coverageReport, formatCoverageMarkdown } from '../src/coverage.ts'
import { BENCHMARK_WINDOWS } from '../src/benchmark.ts'
import { openCatalogue } from '../src/index.ts'
import type { CatalogueRecord } from '../src/schema.ts'
import { attestation, date, fixture, observation, record } from './helpers.ts'

let f: Awaited<ReturnType<typeof fixture>>
const regionId = (slug: string) => `catalogue/region.${slug}`
const interval = (from = 1700, to = from) => ({ ...date(), from: { year: from }, to: { year: to } })
const evidence = (patch: Partial<ReturnType<typeof attestation>> = {}) => ({
  ...attestation(),
  place: regionId('port-royal'),
  date: interval(),
  ...patch,
})

async function write(r: CatalogueRecord) {
  await f.write(`data/${r.kind}/${r.id.split('.')[1]}.json`, r)
}
async function material(slug: string, patch: Partial<CatalogueRecord> = {}) {
  await write({ ...record(slug), provenance: ['real'], attestations: [evidence()], ...patch } as CatalogueRecord)
}

beforeEach(async () => {
  f = await fixture()
  for (const [slug, parent] of [['caribbean', null], ['jamaica', 'caribbean'], ['port-royal', 'jamaica'], ['england', null]] as const) {
    await write({ ...record(slug), id: regionId(slug), kind: 'region', source: undefined, relations: parent ? [{ rel: 'part_of', to: regionId(parent) }] : [] })
  }
  await write({ ...record('test'), id: 'catalogue/source.test', kind: 'source', source: { key: 'TEST', title: 'Synthetic test source', gives: 'Test evidence', rights: 'Test only' } })
})
afterEach(async () => { await f.close() })

it('COVERAGE_WINDOWS is benchmark windows plus Caribbean 1690-1720', () => {
  expect(COVERAGE_WINDOWS.slice(0, BENCHMARK_WINDOWS.length)).toEqual(BENCHMARK_WINDOWS)
  expect(COVERAGE_WINDOWS.at(-1)).toEqual(CARIBBEAN_COVERAGE_WINDOW)
})

it('counts evidence rows by label on test records', async () => {
  const sourced = (label: 'researched' | 'estimate' | 'fiction' | 'open') => evidence({ label, sources: ['catalogue/source.test'] })
  await material('researched', { attestations: [sourced('researched'), sourced('estimate')] })
  await material('fiction', { attestations: [sourced('fiction')] })
  await material('open-only', { attestations: [evidence({ label: 'open' })] })
  await material('observed', {
    attestations: [],
    observations: [{ ...observation(), ...sourced('researched'), quantity: 'test' }],
  })
  const rows = coverageReport(openCatalogue(f.root), [CARIBBEAN_COVERAGE_WINDOW])
  const materialRow = rows.find(row => row.regionFound && row.kind === 'material')
  expect(materialRow).toMatchObject({
    window: 'Caribbean',
    regionFound: true,
    records: 4,
    labels: { researched: 2, estimate: 1, fiction: 1, open: 1 },
    undated: 0,
    withheld: 0,
  })
})

it('a missing region is one row with regionFound false', async () => {
  const rows = coverageReport(openCatalogue(f.root), [{ id: 'H5', region: regionId('iceland'), from: { year: 874 }, to: { year: 1300 }, role: 'reserve' }])
  expect(rows).toEqual([{ window: 'H5', region: regionId('iceland'), regionFound: false }])
})

it('a held-out window shows withheld counts and no exposed label values', async () => {
  await write({ ...record('greenland'), id: regionId('greenland'), kind: 'region', source: undefined, relations: [] })
  await material('held-dated', {
    attestations: [evidence({ place: regionId('greenland'), date: interval(1100) })],
    observations: [{ ...observation(), place: regionId('greenland'), date: interval(1100), benchmark_role: 'held_out' }],
  })
  await material('held-undated', { attestations: [evidence({ place: regionId('greenland'), date: null })] })
  const rows = coverageReport(openCatalogue(f.root), [{ id: 'H3', region: regionId('greenland'), from: { year: 985 }, to: { year: 1450 }, role: 'held_out' }])
  const materialRow = rows.find(row => row.regionFound && row.kind === 'material')
  expect(materialRow).toMatchObject({
    window: 'H3',
    records: 0,
    labels: { researched: 0, estimate: 0, fiction: 0, open: 0 },
    withheld: 3,
    benchmarkRole: { development: 0, held_out: 0, reserve: 0 },
  })
})

it('two coverageReport runs give identical JSON', async () => {
  await material('a')
  await material('z')
  const cat = openCatalogue(f.root)
  expect(JSON.stringify(coverageReport(cat))).toBe(JSON.stringify(coverageReport(cat)))
})

it('the Caribbean window row is present in the default report', async () => {
  await material('local')
  const rows = coverageReport(openCatalogue(f.root))
  expect(rows.some(row => row.window === 'Caribbean' && row.region === regionId('caribbean'))).toBe(true)
})

it('formatCoverageMarkdown is deterministic and includes H1', async () => {
  await write({ ...record('england'), id: regionId('england'), kind: 'region', source: undefined, relations: [] })
  const cat = openCatalogue(f.root)
  const text = formatCoverageMarkdown(coverageReport(cat))
  expect(text).toContain('H1')
  expect(text).toBe(formatCoverageMarkdown(coverageReport(cat)))
})
