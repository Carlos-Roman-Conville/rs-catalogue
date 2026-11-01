import { expect, it } from 'vitest'
import { activeBenchmarkWindows, BENCHMARK_WINDOWS, HARNESS_PATHS } from '../src/benchmark.ts'
import { record } from './helpers.ts'

it('lists H1-H5 benchmark windows with region ids and roles', () => {
  expect(BENCHMARK_WINDOWS.map(window => window.id)).toEqual(['H1', 'H2', 'H3', 'H4', 'H5'])
  expect(BENCHMARK_WINDOWS[0]).toMatchObject({ region: 'catalogue/region.england', role: 'development' })
  expect(BENCHMARK_WINDOWS[2]).toMatchObject({ region: 'catalogue/region.greenland', role: 'held_out' })
  expect(HARNESS_PATHS).toEqual([])
})

it('skips benchmark windows whose region record is absent', () => {
  const england = { ...record('england'), id: 'catalogue/region.england', kind: 'region' as const, source: undefined }
  expect(activeBenchmarkWindows([england], id => id).map(window => window.id)).toEqual(['H1'])
})
