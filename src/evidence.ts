import type { LoadedCatalogue } from './load.ts'
import type { Observation } from './schema.ts'

/** Default observation keys can also be named explicitly by derived rows. */
export function observationLineage(recordId: string, index: number, row: Observation): string {
  return row.lineage ?? `${recordId}.observations[${index}]`
}

/** Count validation lineages; shared groups report dependence without merging lineages. */
export function independentEvidence(catalogue: Pick<LoadedCatalogue, 'records'>, mechanism: string): {
  lineageCount: number; sharedGroups: string[]
} {
  const lineages = new Set<string>()
  const groups = new Map<string, Set<string>>()
  for (const record of catalogue.records) {
    record.observations.forEach((row, index) => {
      if (!row.uses?.some(use => use.mechanism === mechanism && use.role === 'validation')) return
      const lineage = observationLineage(record.id, index, row)
      lineages.add(lineage)
      for (const group of row.shared ?? []) {
        if (!groups.has(group)) groups.set(group, new Set())
        groups.get(group)!.add(lineage)
      }
    })
  }
  return { lineageCount: lineages.size,
    sharedGroups: [...groups].filter(([, members]) => members.size >= 2).map(([group]) => group).sort() }
}
