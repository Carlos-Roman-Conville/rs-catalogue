import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { afterEach, beforeEach, expect, it } from 'vitest'
import {
  catalogueRootFromImportMeta,
  classifyAvailability,
  ingestEquipment,
} from '../scripts/ingest-equipment.ts'

const root = catalogueRootFromImportMeta(import.meta.url)
let outDir: string

beforeEach(async () => {
  outDir = await mkdtemp(join(tmpdir(), 'ingest-equipment-'))
})
afterEach(async () => { await rm(outDir, { recursive: true, force: true }) })

function availabilityCounts(records: Awaited<ReturnType<typeof ingestEquipment>>['technology']) {
  const counts = { common_rare: 0, none_anomaly: 0, none_plain: 0, open: 0 }
  for (const record of records) {
    const window = record.attestations[0]!
    const cell = window.note ?? ''
    counts[classifyAvailability(cell)]++
  }
  return counts
}

it('writes 313 technology and 216 EQ source records', () => {
  const result = ingestEquipment({ catalogueRoot: root, outDir })
  expect(result.technology).toHaveLength(313)
  expect(result.sources).toHaveLength(216)
})

it('availability classes sum to 313 (184 + 59 + 69 + 1)', () => {
  const { technology } = ingestEquipment({ catalogueRoot: root, outDir })
  expect(availabilityCounts(technology)).toEqual({
    common_rare: 184, none_anomaly: 59, none_plain: 69, open: 1,
  })
})

async function recordJsonPaths(base: string): Promise<string[]> {
  const paths: string[] = []
  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) await walk(path)
      else if (entry.isFile() && entry.name.endsWith('.json')) paths.push(path)
    }
  }
  await walk(base)
  return paths.sort()
}

it('two runs to the same directory are byte-identical', async () => {
  ingestEquipment({ catalogueRoot: root, outDir })
  const paths = await recordJsonPaths(outDir)
  const firstByPath = new Map(
    await Promise.all(paths.map(async path => [path, await readFile(path)] as const)),
  )
  ingestEquipment({ catalogueRoot: root, outDir })
  for (const path of paths) {
    const second = await readFile(path)
    expect(second.equals(firstByPath.get(path)!)).toBe(true)
  }
})

it('ABSENCE-RULINGS unknown-presence slug thermometer-reaumur gets open presence on the window', () => {
  const { technology } = ingestEquipment({ catalogueRoot: root, outDir })
  const row = technology.find(r => r.id === 'catalogue/technology.thermometer-reaumur')!
  const window = row.attestations[0]!
  expect(window.what).toBe('presence')
  expect(window.label).toBe('open')
  expect(window.confidence.level).toBe('low')
})

it('plain-none row bunsen gets absence attestation with estimate label', () => {
  const { technology } = ingestEquipment({ catalogueRoot: root, outDir })
  const bunsen = technology.find(r => r.id === 'catalogue/technology.bunsen')!
  const window = bunsen.attestations[0]!
  expect(window.what).toBe('absence')
  expect(window.label).toBe('estimate')
})

it('none (anomaly) row balance-analytical gets open presence', () => {
  const { technology } = ingestEquipment({ catalogueRoot: root, outDir })
  const row = technology.find(r => r.id === 'catalogue/technology.balance-analytical')!
  const window = row.attestations[0]!
  expect(window.what).toBe('presence')
  expect(window.label).toBe('open')
})

it('--check reports no diffs after a write', () => {
  ingestEquipment({ catalogueRoot: root, outDir })
  const check = ingestEquipment({ catalogueRoot: root, outDir, check: true })
  expect(check.diffs).toEqual([])
})
