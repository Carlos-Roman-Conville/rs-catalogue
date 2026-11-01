import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { openCatalogue } from '../src/index.ts'
import { scanToolchain } from '../src/nogate.ts'
import type { CatalogueRecord, DatePoint } from '../src/schema.ts'
import type { WindowQuery, WindowResult } from '../src/window.ts'

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

function formatDate(date: CatalogueRecord['attestations'][0]['date']): string {
  return date === null ? 'null' : JSON.stringify(date)
}

function formatWindow(title: string, result: WindowResult): string[] {
  const lines: string[] = [title, '']
  for (const record of result.present) {
    lines.push(`record ${record.id}`)
    lines.push(`  kind: ${record.kind}`)
    lines.push(`  provenance: ${[...record.provenance].sort(compare).join(', ')}`)
    for (const row of record.attestations) {
      lines.push('  attestation:')
      lines.push(`    what: ${row.what}`)
      lines.push(`    place: ${row.place ?? 'null'}`)
      lines.push(`    date: ${formatDate(row.date)}`)
      lines.push(`    label: ${row.label}`)
      lines.push(`    confidence: ${row.confidence.level} (${row.confidence.reason})`)
      lines.push(`    sources: ${[...row.sources].sort(compare).join(', ')}`)
    }
    for (const row of record.observations) {
      lines.push('  observation:')
      lines.push(`    quantity: ${row.quantity}`)
      lines.push(`    place: ${row.place ?? 'null'}`)
      lines.push(`    date: ${formatDate(row.date)}`)
      lines.push(`    label: ${row.label}`)
      lines.push(`    confidence: ${row.confidence.level} (${row.confidence.reason})`)
      lines.push(`    sources: ${[...row.sources].sort(compare).join(', ')}`)
    }
    lines.push('')
  }
  lines.push('knownElsewhere:')
  for (const id of result.knownElsewhere.map(r => r.id).sort(compare)) lines.push(`  ${id}`)
  lines.push('')
  lines.push('coverage:')
  lines.push('  kind | present | onlyEstimateFictionOpen | undated')
  for (const row of result.coverage) {
    lines.push(`  ${row.kind} | ${row.present} | ${row.onlyEstimateFictionOpen} | ${row.undated}`)
  }
  lines.push('')
  return lines
}

function windowQuery(region: string, from: DatePoint, to: DatePoint): WindowQuery {
  return { region, from, to, includeKnownElsewhere: true }
}

/** Deterministic demo text for both benchmark windows and the no-gate scan (DESIGN §3 D1). */
export function demoText(catalogueRoot = fileURLToPath(new URL('../', import.meta.url)), toolchainRoot = join(dirname(catalogueRoot), '..')): string {
  const cat = openCatalogue(catalogueRoot)
  const caribbean = cat.window(windowQuery('catalogue/region.caribbean', { year: 1690 }, { year: 1720 }))
  const england = cat.window(windowQuery('catalogue/region.england', { year: 1270 }, { year: 1270 }))
  const lines = [
    ...formatWindow('window(Caribbean, 1690-1720)', caribbean),
    ...formatWindow('window(England, 1270)', england),
  ]
  const failures = scanToolchain(toolchainRoot)
  if (failures.length) {
    lines.push('no-gate: fail')
    for (const line of [...failures].sort(compare)) lines.push(line)
  } else lines.push('no-gate: pass')
  return lines.join('\n')
}

const isMain = resolve(process.argv[1] ?? '') === resolve(fileURLToPath(import.meta.url))
if (isMain) {
  const text = demoText()
  console.log(text)
  if (!text.endsWith('no-gate: pass')) process.exitCode = 1
}
