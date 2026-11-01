import { mkdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileCatalogue } from '../src/build.ts'
import { loadRecords } from '../src/load.ts'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const outPath = join(repoRoot, 'dist', 'catalogue.json')

try {
  const catalogue = await loadRecords(repoRoot)
  const { json, hash } = compileCatalogue(catalogue)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, json, 'utf8')
  console.log(`catalogue_hash ${hash}`)
} catch (error) {
  try { unlinkSync(outPath) } catch { /* missing file is fine */ }
  if (error instanceof Error) console.error(error.message)
  process.exitCode = 1
}
