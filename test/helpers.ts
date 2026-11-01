import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import type { Attestation, CatalogueRecord, DateInterval, Observation } from '../src/schema.ts'

export const date = (): DateInterval => ({ from: { year: 0 }, to: { year: 1 }, precision: 'year', circa: false, calendar_of_source: 'unknown' })
export const attestation = (): Attestation => ({ what: 'presence', place: null, date: null, sources: [], label: 'open', confidence: { level: 'low', reason: 'Unknown in test fixture' } })
export const observation = (): Observation => ({ ...attestation(), quantity: 'test-count', value: null, unit: null })
export const record = (slug = 'example'): CatalogueRecord => ({ id: `catalogue/material.${slug}`, kind: 'material', names: [{ text: 'Test fixture', lang: 'en', use: 'preferred' }], classification: [], provenance: ['original_fiction'], scope: 'universal', attestations: [], observations: [], relations: [], sources: [], derived_from: [] })

export async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'catalogue-test-'))
  return {
    root,
    async write(file: string, value: unknown, raw = false) {
      const path = join(root, file)
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, raw ? String(value) : JSON.stringify(value))
    },
    async close() { await rm(root, { recursive: true, force: true }) },
  }
}
