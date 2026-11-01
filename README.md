# @rex/catalogue

The universal reference catalogue (P4): every entity, substance, material, organism, technology, institution,
practice and phenomenon, with stable ids, names, classification, dated and placed attestations, observations,
sources, confidence and provenance class. **Tags, never unlocks (Rex):** game adapters, scenario builders and the
History harness read it; no mechanism reads a catalogue date as a gate. Design: `DESIGN.md` (approved by Rex
2026-10-31). Rules for belt workers: `codex/RULES.md`, `cursor/RULES.md`.

## Layout

- `data/<kind>/<slug>.json`: one record per file; `data/sources/`, `data/aliases.json`
- `fixtures/<name>/`: ingested fixtures with their manifest (the first: `pirate-town`, read in place)
- `src/`, `test/`: the read-only library (schema, dates, regions, window query, checks)

## Test

```
npm install
npm test            # vitest run
npm run typecheck   # tsc --noEmit
```
