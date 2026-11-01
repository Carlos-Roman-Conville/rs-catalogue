import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { scanToolchain, toolchainEngines } from '../src/nogate.ts'

let root: string
beforeEach(() => { root = mkdtempSync(join(tmpdir(), 'catalogue-nogate-')) })
afterEach(() => { rmSync(root, { recursive: true, force: true }) })
function write(file: string, text: string) {
  mkdirSync(dirname(join(root, file)), { recursive: true })
  writeFileSync(join(root, file), text)
}
function kernel(value: unknown) { write('engine/kernel.json', JSON.stringify(value)) }
const cli = () => spawnSync(process.execPath, ['--experimental-strip-types', resolve('scripts/no-gate.ts'), root], { encoding: 'utf8' })

it.each([
  `import { label } from '@rex/catalogue'`,
  `import { label as name, } from "@rex/catalogue"`,
  `const { label: name } = require('@rex/catalogue')`,
  `const { label } = await import('@rex/catalogue')`,
  `const name = (await import('@rex/catalogue')).label`,
  `const name = require('@rex/catalogue').label`,
  `// import { window } from '@rex/catalogue'\nconst text = "require('@rex/catalogue')"`,
  `/* import { get } from '@rex/catalogue' */`,
])('allows only labels and ignores comments/string examples: %s', source => {
  write('engine/src/nested/main.ts', source)
  expect(scanToolchain(root)).toEqual([])
})

it.each([
  `import { window } from '@rex/catalogue'`,
  `import { label, get } from '@rex/catalogue'`,
  `import { get as label } from '@rex/catalogue'`,
  `import catalogue from '@rex/catalogue'`,
  `import * as catalogue from '@rex/catalogue'`,
  `import '@rex/catalogue'`,
  `import {\n /* comment */ window\n} from '@rex/catalogue'`,
  `const cat = require('@rex/catalogue')`,
  `const cat = await import('@rex/catalogue')`,
  `const { window } = await import('@rex/catalogue')`,
  `const { label, ...rest } = require('@rex/catalogue')`,
  `const get = require('@rex/catalogue').get`,
  `export { get } from '@rex/catalogue'`,
])('rejects non-label static/dynamic/require access: %s', source => {
  write('engine/src/main.ts', source)
  expect(scanToolchain(root)).toEqual(['engine/src/main.ts:1: forbidden @rex/catalogue import (labels only)'])
})

it.each(['get', 'presence', 'date', 'year', 'attestation', 'window', 'available'])(
  'rejects catalogue.%s reads and input ports', quantity => {
    const id = `catalogue.${quantity}`
    kernel({ processes: [{ reads: [id, { quantity: id }, { id }] }], ports: [
      { direction: 'in', quantity: id }, { direction: 'input', quantity: id },
    ] })
    expect(scanToolchain(root)).toHaveLength(5)
    expect(scanToolchain(root).every(line => line.includes(id))).toBe(true)
  },
)

it('allows label quantities including date labels, unrelated reads, and catalogue outputs', () => {
  kernel({ processes: [{ reads: ['catalogue.label', 'catalogue.date.label', 'other.date'], writes: ['catalogue.window'] }],
    ports: [{ direction: 'in', quantity: 'catalogue.year.label' }, { direction: 'out', quantity: 'catalogue.date' }] })
  expect(scanToolchain(root)).toEqual([])
})

it('exempts adapters outside src, catalogue, non-engines, and node_modules everywhere', () => {
  const bad = `import { window } from '@rex/catalogue'`
  write('engine/src/main.ts', 'throw new Error("must never run")')
  write('engine/adapters/setup.ts', bad)
  write('engine/harnesses/history.ts', bad)
  write('engine/scenarios/build.ts', bad)
  write('engine/src/node_modules/dependency/src/main.ts', bad)
  write('catalogue/src/main.ts', bad)
  write('node_modules/dependency/src/main.ts', bad)
  write('notes/adapter.ts', bad)
  expect(toolchainEngines(root)).toEqual(['engine'])
  expect(scanToolchain(root)).toEqual([])
  const result = cli()
  expect(result.status).toBe(0)
  expect(result.stdout.trim()).toBe('no-gate: 1 engines scanned, 0 failures')
})

it('reports malformed kernel JSON and deterministic sorted failures with CLI exit 1', () => {
  write('z/kernel.json', '{')
  write('a/src/main.ts', '\nimport { get } from "@rex/catalogue"')
  const failures = scanToolchain(root)
  expect(failures).toEqual([
    'a/src/main.ts:2: forbidden @rex/catalogue import (labels only)',
    'z/kernel.json: cannot read valid JSON',
  ])
  expect(scanToolchain(root)).toEqual(failures)
  const result = cli()
  expect(result.status).toBe(1)
  expect(result.stderr).toContain(failures.join('\n'))
})
