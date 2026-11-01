import { fileURLToPath } from 'node:url'
import { loadRecords } from '../src/load.ts'
import { checkRecords } from '../src/check.ts'

const catalogue = await loadRecords(fileURLToPath(new URL('../', import.meta.url)))
const failures = checkRecords(catalogue)
if (failures.length) {
  for (const failure of failures) console.error(failure)
  process.exitCode = 1
} else console.log(`catalogue check: ${catalogue.records.length} records, 0 failures`)
