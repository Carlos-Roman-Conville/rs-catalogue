import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

interface Manifest { name: string; files: { path: string; sha256: string }[] }
export interface DriftReport { files: number; records: number; failures: string[] }

function children(dir: string) {
  try { return readdirSync(dir, { withFileTypes: true }) }
  catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error }
}
function jsonFiles(dir: string): string[] {
  return children(dir).flatMap(entry => entry.isDirectory() ? jsonFiles(join(dir, entry.name))
    : entry.isFile() && entry.name.endsWith('.json') ? [join(dir, entry.name)] : []).sort()
}
function digest(file: string): string {
  return createHash('sha256').update(readFileSync(file)).digest('hex')
}
function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
function manifest(value: unknown): value is Manifest {
  return object(value) && typeof value.name === 'string' && Array.isArray(value.files)
    && value.files.every(row => object(row) && typeof row.path === 'string' && row.path.length > 0
      && typeof row.sha256 === 'string' && /^[a-fA-F0-9]{64}$/.test(row.sha256))
}

/** V6: inspect source bytes and provenance, optionally refreshing only manifest hashes. */
export function inspectDrift(repoRoot: string, update = false): DriftReport {
  const report: DriftReport = { files: 0, records: 0, failures: [] }
  const display = (file: string) => relative(repoRoot, file).replaceAll('\\', '/')
  const fail = (file: string, message: string) => report.failures.push(`${display(file)}: ${message}`)
  const parse = (file: string): unknown => {
    try { return JSON.parse(readFileSync(file, 'utf8')) as unknown }
    catch (error) { fail(file, error instanceof SyntaxError ? 'bad JSON' : `cannot read (${(error as NodeJS.ErrnoException).code})`); return undefined }
  }
  const fixtures = join(repoRoot, 'fixtures')
  for (const name of children(fixtures).filter(entry => entry.isDirectory()).map(entry => entry.name).sort()) {
    const dir = join(fixtures, name), manifestPath = join(dir, 'manifest.json')
    const value = parse(manifestPath)
    const hashes = new Map<string, string>()
    if (value !== undefined && !manifest(value)) fail(manifestPath, 'expected {name, files: [{path, sha256}]}')
    if (manifest(value)) {
      const before = report.failures.length
      for (const row of value.files) {
        report.files++
        if (hashes.has(row.path)) fail(manifestPath, `duplicate source ${row.path}`)
        try {
          const actual = digest(resolve(repoRoot, row.path))
          if (update) row.sha256 = actual
          else if (actual !== row.sha256.toLowerCase()) fail(manifestPath, `${row.path}: sha256 differs; re-ingest dependent records`)
        } catch (error) { fail(manifestPath, `${row.path}: cannot read source (${(error as NodeJS.ErrnoException).code})`) }
        hashes.set(row.path, row.sha256.toLowerCase())
      }
      // Do not partially refresh a manifest when one of its sources cannot be read.
      if (update && report.failures.length === before) writeFileSync(manifestPath, JSON.stringify(value, null, 2) + '\n')
    }
    for (const file of jsonFiles(join(dir, 'records'))) {
      report.records++
      const record = parse(file)
      if (record === undefined) continue
      if (!object(record) || !Array.isArray(record.derived_from)) { fail(file, 'expected derived_from array'); continue }
      for (const [i, source] of record.derived_from.entries()) {
        if (!object(source) || typeof source.file !== 'string' || typeof source.sha256 !== 'string') {
          fail(file, `derived_from[${i}]: expected file and sha256`); continue
        }
        const expected = hashes.get(source.file)
        if (expected === undefined) fail(file, `${source.file}: not in fixture manifest; re-ingest record`)
        else if (source.sha256.toLowerCase() !== expected) fail(file, `${source.file}: sha256 differs from manifest; re-ingest record`)
      }
    }
  }
  report.failures.sort()
  return report
}

/** Return deterministic failure lines without modifying any files. */
export function checkDrift(repoRoot: string): string[] {
  return inspectDrift(repoRoot).failures
}
