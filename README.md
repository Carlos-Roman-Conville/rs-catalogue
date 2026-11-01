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

## API

```ts
import { openCatalogue } from '@rex/catalogue'
const cat = openCatalogue()                          // reads data/, checks it, throws on an invalid record
openCatalogue(root, { heldOut: 'include' })          // default 'withhold': held-out benchmark rows are filtered
openCatalogue(root, { compiled: 'dist/catalogue.json' }) // read the built snapshot instead of data/
cat.catalogue_hash   // sha256 (lowercase hex) of the canonical compiled catalogue; the Kernel snapshot records it
cat.get(id)          // one record, aliases resolved
cat.window({ region, from, to, kinds })              // present, knownElsewhere, coverage
cat.label(id, { lang: 'en', at?, year? })            // a name for display, never a gate; undefined if none in lang
cat.date('1691-01-10', { place: 'catalogue/region.england' }) // calendar and year start read from the data
```

```
npm run build       # writes dist/catalogue.json (gitignored), prints "catalogue_hash <hex>"
npm run coverage    # V7 coverage table per benchmark window and kind (Markdown; --json for JSON)
```

## Test

```
npm install
npm test            # vitest run
npm run typecheck   # tsc --noEmit
```
