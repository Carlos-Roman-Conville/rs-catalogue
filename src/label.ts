import { createIdResolver, type LoadedCatalogue } from './load.ts'
import { createRegionIndex, dateRange, intersectDates } from './regions.ts'
import type { Name } from './schema.ts'

export interface LabelOptions {
  lang: string
  at?: string
  year?: number
}

const useRank: Record<Name['use'], number> = {
  period: 0,
  vernacular: 1,
  preferred: 2,
  alternate: 3,
  scientific: 4,
}

export function createLabeler(catalogue: LoadedCatalogue) {
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const byId = new Map(catalogue.records.map(record => [record.id, record]))

  function yearInPresence(periodId: string, year: number): boolean {
    const id = resolve(periodId)
    if (id === undefined) return false
    const period = byId.get(id)
    if (period === undefined) return false
    const window = dateRange({ year }, { year })
    for (const attestation of period.attestations) {
      if (attestation.what !== 'presence' || attestation.date == null) continue
      const range = dateRange(attestation.date.from, attestation.date.to)
      if (intersectDates(range, window)) return true
    }
    return false
  }

  function regionConstraintMet(name: Name, opts: LabelOptions): boolean {
    if (name.region === undefined) return true
    if (opts.at === undefined || opts.year === undefined) return false
    const atId = resolve(opts.at)
    const regionId = resolve(name.region)
    if (atId === undefined || regionId === undefined) return false
    if (atId === regionId) return true
    const window = { year: opts.year }
    return regions.descendantsDuring(regionId, window, window).includes(atId)
  }

  function periodConstraintMet(name: Name, opts: LabelOptions): boolean {
    if (name.period === undefined) return true
    if (opts.year === undefined) return false
    return yearInPresence(name.period, opts.year)
  }

  function label(id: string, opts: LabelOptions): string | undefined {
    const resolved = resolve(id)
    if (resolved === undefined) return undefined
    const record = byId.get(resolved)
    if (record === undefined) return undefined

    const inLang = record.names.map((name, index) => ({ name, index })).filter(({ name }) => name.lang === opts.lang)
    const constrained = inLang
      .filter(({ name }) => name.region !== undefined || name.period !== undefined)
      .filter(({ name }) => regionConstraintMet(name, opts) && periodConstraintMet(name, opts))
      .sort((a, b) => {
        const byUse = useRank[a.name.use] - useRank[b.name.use]
        return byUse !== 0 ? byUse : a.index - b.index
      })
    if (constrained.length) return constrained[0]!.name.text

    const preferred = inLang.find(({ name }) => name.use === 'preferred')
    if (preferred) return preferred.name.text

    const unconstrained = inLang.find(({ name }) => name.region === undefined && name.period === undefined)
    if (unconstrained) return unconstrained.name.text

    return undefined
  }

  return { label }
}
