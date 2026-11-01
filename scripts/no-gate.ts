import { scanToolchain, toolchainEngines } from '../src/nogate.ts'

const root = process.argv[2]
if (!root) {
  console.error('Usage: no-gate.ts <root>')
  process.exitCode = 1
} else {
  try {
    const failures = scanToolchain(root)
    if (failures.length) {
      failures.forEach(line => console.error(line))
      process.exitCode = 1
    } else console.log(`no-gate: ${toolchainEngines(root).length} engines scanned, 0 failures`)
  } catch (error) {
    console.error(`no-gate: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
