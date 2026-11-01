import { fileURLToPath } from 'node:url'
import { inspectDrift } from '../src/drift.ts'

const args = process.argv.slice(2)
if (args.some(arg => arg !== '--update')) {
  console.error('usage: fixture-drift.ts [--update]')
  process.exitCode = 1
} else {
  const report = inspectDrift(fileURLToPath(new URL('../', import.meta.url)), args.includes('--update'))
  if (report.failures.length) {
    for (const failure of report.failures) console.error(failure)
    process.exitCode = 1
  } else console.log(`fixture drift: ${report.files} files, ${report.records} records, 0 failures`)
}
