import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { coverageReport, formatCoverageMarkdown } from '../src/coverage.ts'
import { openCatalogue } from '../src/index.ts'

const json = process.argv.includes('--json')
const cat = openCatalogue(fileURLToPath(new URL('../', import.meta.url)))
const rows = coverageReport(cat)
if (json) console.log(JSON.stringify(rows))
else console.log(formatCoverageMarkdown(rows))

const isMain = resolve(process.argv[1] ?? '') === resolve(fileURLToPath(import.meta.url))
if (isMain && !json && !rows.some(row => row.window === 'H1')) process.exitCode = 1
