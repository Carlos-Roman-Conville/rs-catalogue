import { activeBenchmarkWindows, checkObservationBenchmarkRole } from './benchmark.ts'
import { observationLineage } from './evidence.ts'
import type { LoadedCatalogue } from './load.ts'
import { createIdResolver } from './load.ts'
import { createRegionIndex, partOfCycleIds } from './regions.ts'
import type { Attestation, DateInterval } from './schema.ts'

const INVENTION_ATTESTATION_WHATS = new Set<Attestation['what']>(['invention', 'earliest_evidence'])

function absenceWindowYear(d: DateInterval, end: 'from' | 'to'): number {
  if (end === 'from') return d.from?.year ?? Number.NEGATIVE_INFINITY
  if (d.to == null) return Number.POSITIVE_INFINITY
  return d.to.year
}

function absenceWindowContainsInvention(absence: Attestation, invention: Attestation): boolean {
  if (absence.date == null || invention.date == null || invention.date.from == null || invention.date.to == null) return false
  return (
    absenceWindowYear(absence.date, 'from') <= invention.date.from.year
    && invention.date.to.year <= absenceWindowYear(absence.date, 'to')
  )
}

/** V1 integrity checks. All references follow aliases, including multi-hop historical ids. */
export function checkRecords(catalogue: LoadedCatalogue): string[] {
  const failures = [...catalogue.failures]
  const rows = catalogue.records.flatMap(record => record.observations.map((row, index) => ({
    row, key: `${record.id}.observations[${index}]`, lineage: observationLineage(record.id, index, row),
  })))
  const fitted = new Map<string, Map<string, Set<string>>>()
  for (const { row, key, lineage } of rows) {
    for (const use of row.uses ?? []) {
      if (use.role !== 'calibration' && use.role !== 'selection') continue
      if (!fitted.has(lineage)) fitted.set(lineage, new Map())
      const mechanisms = fitted.get(lineage)!
      if (!mechanisms.has(use.mechanism)) mechanisms.set(use.mechanism, new Set())
      mechanisms.get(use.mechanism)!.add(key)
    }
  }
  for (const { row, key, lineage } of rows) {
    const mechanisms = new Set(row.uses?.filter(use => use.role === 'validation').map(use => use.mechanism))
    for (const mechanism of mechanisms) {
      for (const fittedKey of fitted.get(lineage)?.get(mechanism) ?? []) {
        failures.push(`${key}: validation conflicts with calibration/selection on ${fittedKey} for mechanism ${mechanism}, lineage ${lineage}`)
      }
    }
  }
  const ids = new Set(catalogue.records.map(record => record.id))
  const aliases = new Map<string, string>()
  for (const alias of catalogue.aliases) {
    if (aliases.has(alias.old)) failures.push(`alias ${alias.old}: duplicate alias`)
    aliases.set(alias.old, alias.new)
  }
  function resolveAlias(id: string): 'ok' | 'cycle' | 'missing' {
    const seen = new Set<string>()
    while (aliases.has(id)) {
      if (seen.has(id)) return 'cycle'
      seen.add(id)
      id = aliases.get(id)!
    }
    return ids.has(id) ? 'ok' : 'missing'
  }
  for (const alias of catalogue.aliases) {
    const result = resolveAlias(alias.old)
    if (result !== 'ok') failures.push(`alias ${alias.old}: ${result === 'cycle' ? 'alias cycle' : 'alias to missing id'}`)
  }
  const recordById = new Map(catalogue.records.map(row => [row.id, row]))
  function resolveId(id: string): string | undefined {
    const seen = new Set<string>()
    while (aliases.has(id)) {
      if (seen.has(id)) return undefined
      seen.add(id)
      id = aliases.get(id)!
    }
    return ids.has(id) ? id : undefined
  }
  const seen = new Set<string>()
  for (const { file, record: r } of catalogue.entries) {
    const report = (message: string) => failures.push(`${file}: ${message}`)
    if (file.startsWith('data/') && file !== 'data/aliases.json') {
      const dirMatch = /^data\/([^/]+)\/[^/]+\.json$/.exec(file)
      if (!dirMatch || dirMatch[1] !== r.kind) report(`directory must be data/${r.kind}/`)
      if (r.scope !== 'universal') report('game scope stays under fixtures/')
    }
    const match = /^catalogue\/([a-z_]+)\.([a-z0-9]+(?:-[a-z0-9]+)*(?:\.[0-9]+)?)$/.exec(r.id)
    if (!match || match[1] !== r.kind) report(`invalid id ${r.id} for kind ${r.kind}`)
    else if (file.split('/').at(-1) !== `${match[2]}.json`) report(`file name must be ${match[2]}.json`)
    if (seen.has(r.id)) report(`duplicate id ${r.id}`)
    seen.add(r.id)
    if (r.id.startsWith('catalogue/source.cat-') && r.derived_from.length > 0) {
      report(`${r.id}: native source record must have empty derived_from`)
    }
    if (r.scope.startsWith('game:') && r.provenance.includes('real')) report('game scope cannot have real provenance')
    const ref = (id: string | null | undefined, field: string) => {
      if (id == null) return
      if (resolveAlias(id) !== 'ok') report(`${field}: unresolved reference ${id}`)
      else if (r.scope === 'universal') {
        const targetId = resolveId(id)
        const target = targetId == null ? undefined : recordById.get(targetId)
        if (target?.scope.startsWith('game:')) report(`universal record references game-scoped ${targetId}`)
      }
    }
    const sources = (values: string[], field: string) => values.forEach(id => ref(id, field))
    sources(r.sources, 'sources')
    r.names.forEach((name, i) => { ref(name.region, `names[${i}].region`); ref(name.period, `names[${i}].period`) })
    r.relations.forEach((rel, i) => { ref(rel.to, `relations[${i}].to`); sources(rel.sources ?? [], `relations[${i}].sources`) })
    if (r.kind === 'product') {
      if (!r.relations.some(rel => rel.rel === 'made_of')) report(`${r.id}: made_of: product requires at least one relation`)
      if (r.relations.filter(rel => rel.rel === 'made_by').length > 1) report(`${r.id}: made_by: product allows at most one relation`)
      r.relations.forEach((rel, i) => {
        const allowed = rel.rel === 'made_of' ? ['organism', 'product', 'substance', 'material']
          : rel.rel === 'made_by' ? ['practice'] : rel.rel === 'variant_of' ? ['product'] : undefined
        if (!allowed) return
        const targetId = resolveId(rel.to)
        const target = targetId === undefined ? undefined : recordById.get(targetId)
        if (!target || !allowed.includes(target.kind) || (rel.rel === 'variant_of' && target.id === r.id)) {
          report(`${r.id}: relations[${i}] ${rel.rel}: product must resolve to ${rel.rel === 'variant_of' ? 'another product' : allowed.join('|')} record`)
        }
      })
    }
    for (const field of ['attestations', 'observations'] as const) {
      r[field].forEach((row, i) => {
        const path = `${field}[${i}]`
        if ((row.label === 'researched' || row.label === 'estimate') && !row.sources.length) report(`${path}: ${row.label} requires a source`)
        if ('what' in row && row.what === 'absence' && !row.sources.length) report(`${path}: absence requires a source`)
        ref(row.place, `${path}.place`)
        if ('culture' in row) ref(row.culture, `${path}.culture`)
        sources(row.sources, `${path}.sources`)
      })
    }
    r.attestations.forEach((absence, ai) => {
      if (absence.what !== 'absence' || absence.date == null) return
      r.attestations.forEach((invention, ii) => {
        if (ai === ii || !INVENTION_ATTESTATION_WHATS.has(invention.what)) return
        if (absenceWindowContainsInvention(absence, invention)) {
          report(`attestations[${ai}]: absence window contains attestations[${ii}] (${invention.what})`)
        }
      })
    })
  }
  const resolve = createIdResolver(catalogue)
  const regions = createRegionIndex(catalogue.records, resolve)
  const benchmarkWindows = activeBenchmarkWindows(catalogue.records, resolve)
  for (const { file, record: r } of catalogue.entries) {
    const report = (message: string) => failures.push(`${file}: ${message}`)
    r.observations.forEach((observation, index) => {
      const message = checkObservationBenchmarkRole(observation, benchmarkWindows, regions, resolve)
      if (message) report(`observations[${index}]: ${message}`)
    })
  }
  for (const id of partOfCycleIds(catalogue.records, resolve)) {
    failures.push(`${id}: part_of cycle at an overlapping date`)
  }
  return failures.sort()
}
