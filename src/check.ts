import type { LoadedCatalogue } from './load.ts'
import { createIdResolver } from './load.ts'
import { partOfCycleIds } from './regions.ts'
import type { Attestation, DateInterval } from './schema.ts'

const INVENTION_ATTESTATION_WHATS = new Set<Attestation['what']>(['invention', 'earliest_evidence'])

function absenceWindowYear(d: DateInterval, end: 'from' | 'to'): number {
  if (end === 'from') return d.from?.year ?? Number.NEGATIVE_INFINITY
  if (d.to == null) return Number.POSITIVE_INFINITY
  return d.to.year
}

function absenceWindowContainsInvention(absence: Attestation, invention: Attestation): boolean {
  if (absence.date == null || invention.date == null || invention.date.to == null) return false
  return (
    absenceWindowYear(absence.date, 'from') <= invention.date.from.year
    && invention.date.to.year <= absenceWindowYear(absence.date, 'to')
  )
}

/** V1 integrity checks. All references follow aliases, including multi-hop historical ids. */
export function checkRecords(catalogue: LoadedCatalogue): string[] {
  const failures = [...catalogue.failures]
  const ids = new Set(catalogue.records.map(record => record.id))
  const aliases = new Map<string, string>()
  for (const alias of catalogue.aliases) {
    if (aliases.has(alias.old)) failures.push(`alias ${alias.old}: duplicate alias`)
    aliases.set(alias.old, alias.new)
  }
  function resolve(id: string): 'ok' | 'cycle' | 'missing' {
    const seen = new Set<string>()
    while (aliases.has(id)) {
      if (seen.has(id)) return 'cycle'
      seen.add(id)
      id = aliases.get(id)!
    }
    return ids.has(id) ? 'ok' : 'missing'
  }
  for (const alias of catalogue.aliases) {
    const result = resolve(alias.old)
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
    if (r.scope.startsWith('game:') && r.provenance.includes('real')) report('game scope cannot have real provenance')
    const ref = (id: string | null | undefined, field: string) => {
      if (id == null) return
      if (resolve(id) !== 'ok') report(`${field}: unresolved reference ${id}`)
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
  for (const id of partOfCycleIds(catalogue.records, createIdResolver(catalogue))) {
    failures.push(`${id}: part_of cycle at an overlapping date`)
  }
  return failures.sort()
}
