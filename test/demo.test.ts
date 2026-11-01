import { expect, it } from 'vitest'
import { demoText } from '../scripts/demo.ts'

it('demo lists Caribbean practice ids, includes coverage, and is deterministic', () => {
  const first = demoText()
  const second = demoText()
  expect(first).toBe(second)
  const caribbean = first.slice(0, first.indexOf('window(England, 1270)'))
  expect(caribbean).toMatch(/catalogue\/practice\.[a-z0-9-]+/)
  expect(first).toMatch(/coverage:\n  kind \| present/)
  expect(first.trimEnd().endsWith('no-gate: pass')).toBe(true)
})
