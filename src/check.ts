import type { LoadedCatalogue } from './load.ts'

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
  const seen = new Set<string>()
  for (const { file, record: r } of catalogue.entries) {
    const report = (message: string) => failures.push(`${file}: ${message}`)
    const match = /^catalogue\/([a-z_]+)\.([a-z0-9]+(?:-[a-z0-9]+)*(?:\.[0-9]+)?)$/.exec(r.id)
    if (!match || match[1] !== r.kind) report(`invalid id ${r.id} for kind ${r.kind}`)
    else if (file.split('/').at(-1) !== `${match[2]}.json`) report(`file name must be ${match[2]}.json`)
    if (seen.has(r.id)) report(`duplicate id ${r.id}`)
    seen.add(r.id)
    if (r.scope.startsWith('game:') && r.provenance.includes('real')) report('game scope cannot have real provenance')
    const ref = (id: string | null | undefined, field: string) => {
      if (id != null && resolve(id) !== 'ok') report(`${field}: unresolved reference ${id}`)
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
  }
  return failures.sort()
}
