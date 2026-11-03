import { expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { DEFAULT_PERMIT, findRefs, permits, resolveRef } from '../src/index.ts'
import { checkRefs } from '../scripts/check-refs.ts'
import { record } from './helpers.ts'

const real = { ...record('real'), provenance: ['real'] as const }
const canonical = { ...real, provenance: [...real.provenance] }
const fiction = record('fiction')
const game = { ...record('game'), scope: 'game:pirate' as const }
const catalogue = {
  records: [canonical, fiction, game],
  aliases: [
    { old: 'catalogue/material.old', new: 'catalogue/material.middle' },
    { old: 'catalogue/material.middle', new: canonical.id },
    { old: 'catalogue/material.loop', new: 'catalogue/material.loop-two' },
    { old: 'catalogue/material.loop-two', new: 'catalogue/material.loop' },
  ],
}

it('resolves canonical records and multi-hop aliases, with typed failures', () => {
  expect(resolveRef(catalogue, canonical.id)).toEqual({ ok: true, record: canonical })
  expect(resolveRef(catalogue, 'catalogue/material.old')).toEqual({ ok: true, record: canonical })
  expect(resolveRef(catalogue, 'catalogue/material.loop')).toEqual({ ok: false, reason: 'alias-cycle' })
  expect(resolveRef(catalogue, 'catalogue/material.missing')).toEqual({ ok: false, reason: 'unknown' })
  for (const id of ['wrong', 'catalogue/invalid.foo', 'catalogue/material.bad_slug']) {
    expect(resolveRef(catalogue, id)).toEqual({ ok: false, reason: 'malformed' })
  }
})

it('finds every JSON and TypeScript reference with one-based line numbers', () => {
  expect(findRefs('{\r\n "ref": "catalogue/material.real"\r\n}')).toEqual([{ ref: canonical.id, line: 2 }])
  expect(findRefs('// refs\nconst refs = ["catalogue/material.real", `catalogue/material.old`]')).toEqual([
    { ref: canonical.id, line: 2 }, { ref: 'catalogue/material.old', line: 2 },
  ])
})

it('requires every provenance class and a compatible scope', () => {
  expect(permits(catalogue, canonical.id, DEFAULT_PERMIT).ok).toBe(true)
  expect(permits(catalogue, fiction.id, DEFAULT_PERMIT).ok).toBe(false)
  expect(permits(catalogue, game.id, DEFAULT_PERMIT).ok).toBe(false)
  expect(permits(catalogue, game.id, { provenance: ['original_fiction'], scope: 'game:pirate' }).ok).toBe(true)
  expect(permits(catalogue, game.id, { provenance: ['original_fiction'], scope: 'universal' }).reason).toContain('scope')
  expect(permits(catalogue, game.id, { provenance: ['original_fiction'], scope: 'game:other' }).ok).toBe(false)
  expect(permits(catalogue, 'catalogue/material.missing', DEFAULT_PERMIT)).toEqual({ ok: false, reason: 'unknown' })
  expect(permits({ records: [{ ...canonical, provenance: ['real', 'original_fiction'] }], aliases: [] }, canonical.id, DEFAULT_PERMIT).ok).toBe(false)
})

it('scans nested engine trees, skips excluded folders, and handles an empty tree', () => {
  const root = mkdtempSync(join(process.cwd(), '.refs-test-'))
  const write = (folder: string, name: string, text: string) => {
    mkdirSync(join(root, folder), { recursive: true })
    writeFileSync(join(root, folder, name), text)
  }
  try {
    expect(checkRefs(root, catalogue)).toEqual({ counts: [], failures: [] })
    const empty = spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/check-refs.ts', '--root', root], { encoding: 'utf8' })
    expect(empty.status).toBe(0)
    expect(empty.stdout).toContain('0 refs')
    write('engine/data/nested', 'refs.json', JSON.stringify([canonical.id, 'catalogue/material.missing', game.id]))
    write('engine/src', 'refs.ts', `const ref = '${game.id}'`)
    for (const folder of ['catalogue/data', 'engine/data/node_modules', 'engine/src/dist']) {
      write(folder, 'ignored.json', 'catalogue/material.missing')
      write(folder, 'ignored.ts', 'catalogue/material.missing')
    }
    const result = checkRefs(root, catalogue)
    expect(result.counts).toEqual([{ engine: 'engine', count: 4 }])
    expect(result.failures).toEqual([
      `${join(root, 'engine/data/nested/refs.json')}:1: catalogue/material.missing: unknown`,
      `${join(root, 'engine/data/nested/refs.json')}:1: ${game.id}: universal data references game:pirate`,
    ])
    write('engine/data/nested', 'refs.json', JSON.stringify([
      'catalogue/material.pearl', 'catalogue/material.missing', 'catalogue/practice.faction-burial-alternatives',
    ]))
    write('engine/src', 'refs.ts', '')
    const cli = spawnSync(process.execPath, ['--experimental-strip-types', resolve('scripts/check-refs.ts'), '--root', root], { encoding: 'utf8', env: { ...process.env, NODE_NO_WARNINGS: '1' } })
    expect(cli.status).toBe(1)
    expect(cli.stderr.trim().split('\n')).toHaveLength(2)
    expect(cli.stderr).toContain('unknown')
    expect(cli.stderr).toContain('universal data references game:')
    expect(cli.stdout).toContain('engine: 3 refs')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
