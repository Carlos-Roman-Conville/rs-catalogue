import { expect, it } from 'vitest'
import { independentEvidence } from '../src/evidence.ts'
import type { Observation } from '../src/schema.ts'
import { observation, record } from './helpers.ts'

const validation = { mechanism: 'life.energy.balance', model_version: 'v1', role: 'validation' as const, unit: '5488' }
const row = (patch: Partial<Observation> = {}): Observation => ({ ...observation(), uses: [validation], ...patch })
const report = (observations: Observation[]) => independentEvidence({ records: [{ ...record(), observations }] }, validation.mechanism)

it('counts one lineage once across records and versions', () => {
  const records = ['a', 'b'].map((slug, i) => ({ ...record(slug), observations: [row({ lineage: 'primary', uses: [{ ...validation, model_version: `v${i}` }] })] }))
  expect(independentEvidence({ records }, validation.mechanism)).toEqual({ lineageCount: 1, sharedGroups: [] })
})
it('reports sorted groups joining distinct validation lineages without merging them', () => {
  expect(report([
    row({ lineage: 'a', shared: ['z', 'a', 'single', 'single'] }),
    row({ lineage: 'a', shared: ['single'] }),
    row({ lineage: 'b', shared: ['z', 'a'] }),
    row({ lineage: 'c', shared: ['single'], uses: [{ ...validation, role: 'context' }] }),
  ])).toEqual({ lineageCount: 2, sharedGroups: ['a', 'z'] })
})
it('uses record id and observation index for missing lineages', () => {
  const records = ['a', 'b'].map(slug => ({ ...record(slug), observations: [row(), row()] }))
  expect(independentEvidence({ records }, validation.mechanism).lineageCount).toBe(4)
  expect(report([row(), row({ lineage: 'catalogue/material.example.observations[0]' })]).lineageCount).toBe(1)
})
it('ignores absent, empty, context and other-mechanism uses', () => {
  expect(report([row({ uses: undefined }), row({ uses: [] }), row({ uses: [{ ...validation, role: 'context' }] }),
    row({ uses: [{ ...validation, mechanism: 'other' }] })])).toEqual({ lineageCount: 0, sharedGroups: [] })
  expect(report([])).toEqual({ lineageCount: 0, sharedGroups: [] })
})
