import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Attestation, CatalogueRecord, DateInterval } from '../src/schema.ts'

const MD_FILE = "../../Games/RPG's/pirate-ship/files/pirate-ship/science/SCIENTIFIC_EQUIPMENT.md"
const JSON_FILE = "../../Games/RPG's/pirate-ship/files/pirate-ship/body/data/equipment.json"
const SOURCES_FILE = "../../Games/RPG's/pirate-ship/files/pirate-ship/SOURCES.md"
const MANIFEST = 'fixtures/pirate-town/manifest.json'
const FIXTURE_ROOT = 'fixtures/pirate-town'
const FIXTURE_RECORDS = 'fixtures/pirate-town/records'
const SKIP_IDS = new Set(['tagged'])

const COL = {
  id: 0, equipment: 1, dateUsual: 4, credited: 5, skill: 14, availability: 16, confHistory: 17, mark: 19,
} as const

const WINDOW: DateInterval = {
  from: { year: 1650 }, to: { year: 1730 }, precision: 'year', circa: false, calendar_of_source: 'unknown',
}

export type AvailabilityClass = 'common_rare' | 'none_anomaly' | 'none_plain' | 'open'

export interface IngestOptions {
  catalogueRoot: string
  outDir?: string
  check?: boolean
}

export interface IngestResult {
  technology: CatalogueRecord[]
  sources: CatalogueRecord[]
  diffs: string[]
}

export function catalogueRootFromImportMeta(metaUrl: string): string {
  return fileURLToPath(new URL('../', metaUrl))
}

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

function parseMarkdownRow(line: string): string[] {
  const parts = line.split('|').map(s => s.trim())
  if (parts[0] === '') parts.shift()
  if (parts.at(-1) === '') parts.pop()
  if (parts.length === 20) return parts
  if (parts.length > 20) {
    const head = parts.slice(0, 7)
    const tail = parts.slice(-(20 - 7))
    const mid = parts.slice(7, parts.length - (20 - 7)).join(' | ')
    return [...head, mid, ...tail]
  }
  return parts
}

function normJsonId(id: string): string {
  return id.replace(/^equipment\.catalogue\./, '')
}

function slugFromId(id: string): string {
  return id.replace(/_/g, '-')
}

function sourceId(key: string): string {
  return `catalogue/source.${key.toLowerCase()}`
}

export function extractEqKeys(...texts: string[]): string[] {
  const keys = new Set<string>()
  for (const text of texts) {
    for (const m of text.matchAll(/\b(EQ-[A-Z0-9-]+)\b/g)) {
      if (m[1] !== 'EQ-HEAT') keys.add(m[1]!)
    }
  }
  return [...keys].sort((a, b) => a.localeCompare(b))
}

export function classifyAvailability(cell: string): AvailabilityClass {
  const s = cell.trim()
  if (s.startsWith('none (anomaly')) return 'none_anomaly'
  if (s.startsWith('common') || s.startsWith('rare')) return 'common_rare'
  if (s.startsWith('open')) return 'open'
  if (s.startsWith('none')) return 'none_plain'
  throw new Error(`unclassified availability cell: ${s.slice(0, 80)}`)
}

function confLevel(cell: string): 'high' | 'medium' | 'low' {
  const c = cell.trim().toLowerCase()
  if (c === 'high') return 'high'
  if (c === 'medium') return 'medium'
  return 'low'
}

function firstClause(cell: string): string {
  const cut = cell.search(/[(,;]/)
  return (cut === -1 ? cell : cell.slice(0, cut)).trim()
}

export function parseUsualDate(cell: string): DateInterval | null {
  const clause = firstClause(cell)
  if (!clause || /^open/i.test(clause)) return null
  if (/\bBC\b|\bBCE\b|millennium|antiquity|medieval|perhaps|early|late|mid-/i.test(clause)) return null
  if (/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(clause)) {
    return null
  }
  const century = clause.match(/^(\d{1,2})(?:st|nd|rd|th)\s+c\.?$/i)
  if (century) {
    const n = Number(century[1])
    const from = (n - 1) * 100
    return { from: { year: from }, to: { year: from + 99 }, precision: 'century', circa: false, calendar_of_source: 'unknown' }
  }
  const decade = clause.match(/^(\d{3,4})s$/)
  if (decade) {
    const from = Number(decade[1])
    return { from: { year: from }, to: { year: from + 9 }, precision: 'decade', circa: false, calendar_of_source: 'unknown' }
  }
  const range = clause.match(/^(?:c\.\s*|about\s+)?(-?\d{3,4})\s+AD\s+to\s+(-?\d{3,4})\s+AD/i)
    ?? clause.match(/^(?:c\.\s*|about\s+)?(-?\d{3,4})\s+to\s+(-?\d{3,4})/i)
  if (range) {
    const circa = /^c\.\s|^about\s/i.test(clause)
    return {
      from: { year: Number(range[1]) }, to: { year: Number(range[2]) },
      precision: 'year', circa, calendar_of_source: 'unknown',
    }
  }
  const single = clause.match(/^(?:c\.\s*|about\s+)?(-?\d{3,4})\s+AD$/i) ?? clause.match(/^(?:c\.\s*|about\s+)?(-?\d{3,4})$/)
  if (single) {
    const circa = /^c\.\s|^about\s/i.test(clause)
    const year = Number(single[1])
    return { from: { year }, to: { year }, precision: 'year', circa, calendar_of_source: 'unknown' }
  }
  return null
}

interface SourceRow { key: string; title: string; gives: string; url: string; rights: string }

function loadManifestHashes(root: string): Map<string, string> {
  const manifest = JSON.parse(readFileSync(join(root, MANIFEST), 'utf8')) as { files: { path: string; sha256: string }[] }
  return new Map(manifest.files.map(f => [f.path, f.sha256.toLowerCase()]))
}

function readVerified(root: string, rel: string, hashes: Map<string, string>): string {
  const path = join(root, rel)
  const text = readFileSync(path, 'utf8')
  const expected = hashes.get(rel)
  if (!expected) throw new Error(`${rel}: not in fixture manifest`)
  const digest = sha256(text)
  if (digest !== expected) throw new Error(`${rel}: sha256 differs from manifest (${digest} != ${expected})`)
  return text
}

function parseEquipmentMarkdown(text: string): Map<string, string[]> {
  const start = text.indexOf('<!-- table:equipment.catalogue -->')
  const end = text.indexOf('<!-- /table -->', start)
  if (start === -1 || end === -1) throw new Error('equipment catalogue table not found in SCIENTIFIC_EQUIPMENT.md')
  const lines = text.slice(start, end).split(/\r?\n/).filter(l => l.startsWith('|') && !/^\|[-\s|]+\|$/.test(l))
  const rows = new Map<string, string[]>()
  for (const line of lines.slice(1)) {
    const cols = parseMarkdownRow(line)
    if (cols.length !== 20) throw new Error(`bad markdown row for ${cols[0] ?? '?'}: ${cols.length} columns`)
    rows.set(cols[0]!, cols)
  }
  return rows
}

function parseBodySources(text: string): { order: string[]; rows: Map<string, SourceRow> } {
  const heading = '## Body and world simulation sources (body-and-world keeper, 2026-10-29)'
  const start = text.indexOf(heading)
  const next = text.indexOf('\n## ', start + heading.length)
  const section = next === -1 ? text.slice(start) : text.slice(start, next)
  const order: string[] = []
  const rows = new Map<string, SourceRow>()
  for (const line of section.split(/\r?\n/)) {
    if (!line.startsWith('| EQ-')) continue
    const cols = line.split('|').map(s => s.trim()).filter((_, i, a) => i > 0 && i < a.length - 1)
    if (cols.length < 5) continue
    const key = cols[0]!
    order.push(key)
    rows.set(key, { key, title: cols[1]!, gives: cols[2]!, url: cols[3]!, rights: cols[4]! })
  }
  return { order, rows }
}

function existingTechnologySlugs(root: string): Set<string> {
  const dir = join(root, FIXTURE_RECORDS, 'technology')
  if (!existsSync(dir)) return new Set()
  return new Set(readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')))
}

function windowAttestation(rowId: string, availability: string, cls: AvailabilityClass, confHistory: string, sourceIds: string[]): Attestation {
  const level = confLevel(confHistory)
  const base = {
    place: 'catalogue/region.atlantic' as const,
    date: WINDOW,
    sources: sourceIds,
    note: availability,
  }
  switch (cls) {
    case 'common_rare':
      return {
        ...base, what: 'presence', label: 'researched',
        confidence: { level, reason: `conf_history ${level}, SCIENTIFIC_EQUIPMENT.md §2 row ${rowId}` },
      }
    case 'none_anomaly':
      return {
        ...base, what: 'presence', label: 'open',
        confidence: {
          level: 'low',
          reason: "availability 'none (anomaly)' is the game's time-anomaly mark, not a source of absence (DESIGN §6); window presence unknown",
        },
      }
    case 'none_plain':
      return {
        ...base, what: 'absence', label: 'estimate',
        confidence: { level, reason: "the row states none for 1650-1730 and its keys date or explain it; the window statement is the keeper's reading of the source, hence estimate" },
      }
    case 'open':
      return {
        ...base, what: 'presence', label: 'open',
        confidence: { level: 'low', reason: 'no net in any source read: absence of evidence, written as unknown presence (§1.1)' },
      }
  }
}

function datedAttestation(rowId: string, cols: string[], sourceIds: string[]): Attestation | null {
  const dateCell = cols[COL.dateUsual]!
  if (dateCell.trim().toLowerCase().startsWith('open')) return null
  const credited = cols[COL.credited]!.trim()
  const what: Attestation['what'] = credited !== '-' && !credited.toLowerCase().startsWith('open') ? 'invention' : 'earliest_evidence'
  const level = confLevel(cols[COL.confHistory]!)
  let note = dateCell
  if (credited !== '-' && !credited.toLowerCase().startsWith('open')) note += `; credited to ${credited}`
  return {
    what, place: null, date: parseUsualDate(dateCell), sources: sourceIds,
    label: 'researched', confidence: { level, reason: `conf_history ${level}, SCIENTIFIC_EQUIPMENT.md §2 row ${rowId}` },
    note,
  }
}

function buildTechnologyRecord(
  rowId: string, cols: string[], jsonRow: string[], mdSha: string, jsonSha: string,
): CatalogueRecord {
  const slug = slugFromId(rowId)
  const mark = cols[COL.mark]!
  const markKeys = extractEqKeys(mark, jsonRow[3] ?? '').map(sourceId)
  const recordSources = extractEqKeys(cols.join(' '), jsonRow.join(' ')).map(sourceId)
  const availability = cols[COL.availability]!
  const cls = classifyAvailability(availability)
  const attestations = [windowAttestation(rowId, availability, cls, cols[COL.confHistory]!, markKeys)]
  const dated = datedAttestation(rowId, cols, markKeys)
  if (dated) attestations.push(dated)

  let notes = `Ingested by scripts/ingest-equipment.ts from SCIENTIFIC_EQUIPMENT.md §2 and equipment.json row ${rowId}. Credited to: ${cols[COL.credited]!.trim()}. Skill: ${cols[COL.skill]!.trim()}. Capability columns stay with the game (CAT-Q1).`
  if (cls === 'open' || cls === 'none_anomaly') {
    notes += ` ${attestations[0]!.confidence.reason}`
  }

  return {
    id: `catalogue/technology.${slug}`,
    kind: 'technology',
    names: [{ text: cols[COL.equipment]!, lang: 'en', use: 'preferred' }],
    classification: [{ scheme: 'catalogue', path: ['technology'] }],
    provenance: ['real'],
    scope: 'universal',
    attestations,
    relations: [],
    observations: [],
    sources: recordSources,
    derived_from: [
      { file: MD_FILE, anchor: `## 2. The catalogue | ${rowId}`, sha256: mdSha },
      { file: JSON_FILE, anchor: `catalogue | ${jsonRow[0]!}`, sha256: jsonSha },
    ],
    notes,
  }
}

function buildSourceRecord(row: SourceRow, sourcesSha: string): CatalogueRecord {
  return {
    id: sourceId(row.key),
    kind: 'source',
    source: { key: row.key, title: row.title, gives: row.gives, url: row.url, rights: row.rights },
    names: [{ text: row.title, lang: 'en', use: 'preferred' }],
    classification: [],
    provenance: ['real'],
    scope: 'universal',
    attestations: [],
    relations: [],
    observations: [],
    sources: [],
    derived_from: [{
      file: SOURCES_FILE,
      anchor: `## Body and world simulation sources (body-and-world keeper, 2026-10-29) | ${row.key}`,
      sha256: sourcesSha,
    }],
  }
}

function serialize(record: CatalogueRecord): string {
  return `${JSON.stringify(record, null, 2)}\n`
}

function recordPath(outDir: string, record: CatalogueRecord): string {
  const local = record.id.replace('catalogue/', '').replace('.', '/')
  const slash = local.indexOf('/')
  const kind = local.slice(0, slash)
  const file = local.slice(slash + 1)
  return join(outDir, 'records', kind, `${file}.json`)
}

export function ingestEquipment(options: IngestOptions): IngestResult {
  const { catalogueRoot, outDir, check } = options
  const hashes = loadManifestHashes(catalogueRoot)
  const mdText = readVerified(catalogueRoot, MD_FILE, hashes)
  const jsonText = readVerified(catalogueRoot, JSON_FILE, hashes)
  const sourcesText = readVerified(catalogueRoot, SOURCES_FILE, hashes)
  const mdSha = hashes.get(MD_FILE)!
  const jsonSha = hashes.get(JSON_FILE)!
  const sourcesSha = hashes.get(SOURCES_FILE)!

  const mdRows = parseEquipmentMarkdown(mdText)
  const equipment = JSON.parse(jsonText) as { catalogue: { rows: string[][] } }
  const { order: sourceOrder, rows: sourceRows } = parseBodySources(sourcesText)
  const existingSlugs = existingTechnologySlugs(catalogueRoot)

  const technology: CatalogueRecord[] = []
  const keysNeeded = new Set<string>()
  const ingestSlugs = new Set<string>()

  for (const jsonRow of equipment.catalogue.rows) {
    const rowId = normJsonId(jsonRow[0]!)
    if (SKIP_IDS.has(rowId)) continue
    ingestSlugs.add(slugFromId(rowId))
  }
  for (const slug of existingSlugs) {
    if (!ingestSlugs.has(slug)) {
      throw new Error(`a technology record exists that the ingest does not produce: ${slug}`)
    }
  }

  for (const jsonRow of equipment.catalogue.rows) {
    const rowId = normJsonId(jsonRow[0]!)
    if (SKIP_IDS.has(rowId)) continue
    const cols = mdRows.get(rowId)
    if (!cols) throw new Error(`markdown row missing for ${rowId}`)
    technology.push(buildTechnologyRecord(rowId, cols, jsonRow, mdSha, jsonSha))
    for (const k of extractEqKeys(cols.join(' '), jsonRow.join(' '))) keysNeeded.add(k)
  }

  technology.sort((a, b) => a.id.localeCompare(b.id))

  const sources: CatalogueRecord[] = []
  for (const key of sourceOrder) {
    if (!keysNeeded.has(key)) continue
    const row = sourceRows.get(key)
    if (!row) throw new Error(`SOURCES.md missing row for key ${key} required by equipment rows`)
    sources.push(buildSourceRecord(row, sourcesSha))
  }
  if (sources.length !== keysNeeded.size) {
    const missing = [...keysNeeded].filter(k => !sourceRows.has(k)).sort()
    if (missing.length) throw new Error(`SOURCES.md missing keys: ${missing.join(', ')}`)
    throw new Error(`source count ${sources.length} != keys ${keysNeeded.size}`)
  }

  const diffs: string[] = []
  const all = [...technology, ...sources]
  if (check && outDir) {
    for (const record of all) {
      const path = recordPath(outDir, record)
      const expected = serialize(record)
      if (!existsSync(path)) diffs.push(`${path}: missing`)
      else if (readFileSync(path, 'utf8') !== expected) diffs.push(`${path}: content differs`)
    }
  }

  if (!check && outDir) {
    for (const record of all) {
      const path = recordPath(outDir, record)
      mkdirSync(dirname(path), { recursive: true })
      writeFileSync(path, serialize(record))
    }
  }

  return { technology, sources, diffs }
}

function usage(): never {
  console.error('usage: ingest-equipment.ts [--check] [--out <dir>]')
  process.exit(1)
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const args = process.argv.slice(2)
  const check = args.includes('--check')
  const outIdx = args.indexOf('--out')
  const outRaw = outIdx === -1 ? undefined : args[outIdx + 1]
  if (outIdx !== -1 && !outRaw) usage()
  const root = catalogueRootFromImportMeta(import.meta.url)
  const outRel = outRaw ?? FIXTURE_ROOT
  const outDir = outRel.startsWith('/') || /^[A-Za-z]:[\\/]/.test(outRel) ? outRel : join(root, outRel)
  const result = ingestEquipment({ catalogueRoot: root, outDir, check: check || undefined })
  if (result.diffs.length) {
    for (const d of result.diffs) console.error(d)
    process.exitCode = 1
  } else if (check) {
    console.log(`ingest-equipment --check: ${result.technology.length} technology, ${result.sources.length} sources, 0 diffs`)
  } else {
    console.log(`ingest-equipment: wrote ${result.technology.length} technology and ${result.sources.length} source records`)
  }
}
