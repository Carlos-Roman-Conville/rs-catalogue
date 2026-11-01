# Catalogue: native seed and API plan (task 5173, keeper, 2026-11-01)

The plan for the Catalogue's next stage, after the pirate-town fixture (663 universal records promoted to `data/`,
5132; AUDIT-P pass 70/70, 5161). Plan only: this file writes no record and no code. Part A is the first native
content (CAT-Q4, Rex 2026-10-31: the benchmark starting rows H1-H5, England 1270 first; H3 and H4 held out). Part B
is the API that DESIGN §2.2 and §3 promise and `src/index.ts` does not yet give. The units at the end (N1-N10, one
session each) are copied by the next planner as written.

State at HEAD 0fe13e5: `openCatalogue()` returns `get` and `window` only; nothing builds `dist/catalogue.json`
(`dist/` is gitignored) and nothing computes `catalogue_hash`; no record in `data/` carries a 1270 row; there is no
`data/calendar/` or `data/organism/`; `benchmark_role` is in the schema (`src/schema.ts`, observations only) and
nothing reads it, so V5 does not exist; V7 is the per-kind `coverage` that `window()` returns, with no report.

## Part A: the native seed, H1 England 1270

### What D1 step 2 needs

DESIGN §3 step 2: `window(England, 1270)` from a small native seed, "population ~4.5-5 M, crops, ploughs, mills,
the manor, the Julian calendar with Lady Day", every value labelled and sourced (ROADMAP P4 test 1). The ROADMAP
P11a data table names, for H1's starting conditions: 1270 population (~4.5-5 M), land use, crop yields, livestock,
wages and prices, manorial and royal institutions, towns, technology inventory (mills, ploughs, ships), climate;
and as main sources: Broadberry, Campbell, Klein, Overton & van Leeuwen, *British Economic Growth 1270-1870*
(here BCKOvL); Clark's wage and price series; Wrigley & Schofield, *Population History of England*; Campbell,
*The Great Transition*; tree-ring and documentary climate series.

**No value in this plan is a value.** Every row below says where its value comes from. A row whose source has not
been opened, or does not give the value, is written `open` (rule (c)), never filled from the ROADMAP's provisional
figures or from memory. The ROADMAP's "~4.5-5 M" is a sanity range for the auditor, not a value to write.
Dates are the source's own: a row a source dates "c. 1300" or "1279-80" keeps that date, even though it then does
not fall in the one-year window 1270; the window's coverage table shows the gap. Nothing is re-dated to fit D1.

| # | Row | Kind | Id | Recorded | Source (ROADMAP-named, or the kind still to find) |
|---|---|---|---|---|---|
| A1 | population | region | `region.england` (exists) | observation: quantity population (the registry's id in `registry/quantities.json` if one exists, else proposed `population.total`), unit `persons`, place `region.england`, date 1270 at year precision, `benchmark_role: development`; the territory the source counts (England with or without Wales) in `note` in the source's words | BCKOvL's population table (ROADMAP); cross-check Campbell, *The Great Transition* (ROADMAP). Two sources that differ are two observations, never averaged (DESIGN-V4, "Validated") |
| A2 | crops | organism | `organism.triticum-aestivum` (wheat), `organism.hordeum-vulgare` (barley), `organism.avena-sativa` (oats), `organism.secale-cereale` (rye), `organism.pisum-sativum` (peas), `organism.vicia-faba` (beans) | per crop: attestation `presence`, place `region.england`, the source's date interval; optional observation of yield per seed sown (proposed quantity `crop.yield-ratio`, unit `ratio`), dated as the source dates it, `benchmark_role: development` | BCKOvL's arable chapter (ROADMAP: crop yields); to find: the manorial-accounts work it draws on (candidate, not opened: Campbell, *English Seigniorial Agriculture 1250-1450*). The ids are the expected taxa; a crop the source does not name is not written, and a taxon the source names differently takes the source's |
| A3 | ploughs | technology, organism | `technology.mouldboard-plough`; draught animals `organism.bos-taurus` (oxen), `organism.equus-caballus` (horses) | attestation `presence` in England for each; optional observation: horses' share of demesne draught animals (proposed `draught.horse-share`, unit `fraction`), source-dated, `development` | ROADMAP names "ploughs" and "livestock" but no source for them; to find: a study of English draught animals and ploughing (candidate, not opened: Langdon, *Horses, Oxen and Technological Innovation*, 1986) |
| A4 | mills | technology | `technology.watermill` (new); `technology.windmill` (exists, written by `scripts/ingest-equipment.ts`) | attestation `presence` in England for each, source-dated; optional observation: number of mills in England (proposed `mill.count`, unit `mills`), source-dated, `development`. The windmill row goes into the ingested record only after N2 (rule (d)) | ROADMAP names "mills", no source; to find: a survey of English medieval mills (candidates, not opened: Holt, *The Mills of Medieval England*, 1988; Langdon, *Mills in the Medieval Economy: England 1300-1540*, 2004) |
| A5 | the manor | institution | `institution.manor` | attestation `presence` in England, source-dated; an observation (for example the demesne's share of land) only if the source gives one, else none | ROADMAP names "manorial and royal institutions"; BCKOvL and Campbell (ROADMAP) to check first; to find: a thirteenth-century manorial study (candidate, not opened: Kosminsky, *Studies in the Agrarian History of England in the Thirteenth Century*, on the Hundred Rolls of 1279-80) |
| A6 | the Julian calendar | calendar | `calendar.julian` (new) | attestation `presence`, place `region.england`, from the earliest date a source states to Julian 2 September 1752 | the end: the Calendar (New Style) Act 1750 (already cited in `src/dates.ts`, legislation.gov.uk); the 1270 use: to find: a handbook of English dating (candidate, not opened: Cheney, *Handbook of Dates*, Royal Historical Society) |
| A7 | Lady Day year start | calendar | `calendar.lady-day-year-start` (new; alternate name "Annunciation style" if the source uses it) | attestation `presence` in England over the interval the source states, ending with the year 1751 (the Act: 1752 begins 1 January) | the end: the Act; the 1270 use: the dating handbook of A6. **If the source says England's year began otherwise in 1270** (for example at Christmas), that style is written instead under its own id and D1 shows it; `src/dates.ts` has only `jan-1` and `mar-25`, so N7 adds the style (rule (e)) |
| A8 | the reform | calendar | `calendar.gregorian`, `calendar.january-year-start` (new) | attestation `adoption`, place `region.england`: Gregorian from 14 September 1752, January year start from 1 January 1752 | the Act. Not a 1270 row, but `date()` (B2) needs it for DESIGN §2.2's 1691 example |

Sources become native source records `data/source/cat-<slug>.json` (kind `source`, key `CAT-<SLUG>`, `derived_from:
[]`), one per work, with `gives` saying what the work gives the catalogue and `url` only where the text is public.
`CAT-` is the native prefix; no fixture key uses it (TWN-, STL-, EQ-, ECON-, MED- and the others).

**After D1, not in these units:** land use by type, livestock numbers, wages and prices (Clark), towns and their
sizes, ships, climate, royal institutions, and every trajectory series 1270-1700 (population, real wages, GDP per
head, urban share, enclosure, tax revenue, plague mortality, wars, regime changes). Then H2 Tokugawa (development),
H5 Iceland (reserve), and last H3 Greenland and H4 Copán (held out), each after N1's guard exists.

### What `data/region/england.json` lacks

It is reused, not replaced: id `catalogue/region.england`, kind region, one English name, provenance real, scope
universal, an undated unanchored `part_of` world. It lacks:

- any attestation, observation or source of its own (all three lists are empty);
- a native basis: its two `derived_from` anchors are the pirate fixture (the referents paragraph and STL-MOR, 1700
  wages), so a V4 audit reading rule (a) would fail any 1270 row on it; rule (b) settles that;
- a statement of territory: its notes call it "Political region for colonial membership edges"; what "England"
  covers in 1270 is written only in each observation's `note`, in the source's words, never as a new relation;
- a link to `region.britain` (exists) and any child region (no London, no county): not needed for D1, and not
  added without a source that states it;
- names other than "England" (for example a Latin or Middle English period name): only when a source gives one.

N4 appends one sentence to its `notes` naming the native rows and NATIVE-PLAN (b); the colonial sentence stays.

### Rulings for native rows (keeper, 2026-11-01)

- **(a) Native means sourced directly.** A native row cites `CAT-` source records only, and a source the writer
  has opened. A source cited through another work, or not opened, keeps `label: researched` with `confidence: low`
  and says so in the reason (DESIGN-V4 (k)). `note` carries the source's locator (table, page) and its own
  qualifiers, nothing else (as DESIGN-V4 (l)).
- **(b) Mixed records.** A record may hold fixture rows and native rows (`region.england`, `technology.windmill`).
  V4 holds each row to its own basis: rows citing fixture keys follow the anchoring rule (DESIGN-V4 (a)-(l)); rows
  citing only `CAT-` keys are checked against the cited source itself. A re-ingest of the fixture (V6) keeps the
  native rows; a hand re-ingest does so by the same rule as N2's script.
- **(c) Open rows.** A value no source gives yet is an observation with `value: null`, `label: open`,
  `confidence.level: low`, the reason naming what was searched (work and locator) and that it gives no value for
  the date. It cites the source searched, so V4 can re-open it and confirm the value is not there (this keeps
  DESIGN-V4 (e): no unsourced row). An attestation with nothing found is not written at all; the search goes in the
  sourcing sheet. Open rows are gap markers: they count in coverage, never seed anything. An `open` row's reason
  names the parts of the cited work that were read (tables, pages, sections) and says the full text was read; a
  search that read less (an abstract, a record page, a table it could not read; N3 marked S1 `open` from the
  abstract alone) stays in the sheet as "not yet searched" and is not written to `data/` (review 1101-1140 fix 5).
- **(d) Script-ingested records.** A native row never goes into a record `scripts/ingest-equipment.ts` writes until
  N2 makes the script keep native rows; otherwise the next ingest deletes it and `--check` fails.
- **(e) A year-start style the code lacks** is added to `src/dates.ts` and to `year_start_of_source` in
  `src/schema.ts` by a code unit (N7) with tests from the cited source, before any row uses it.
- **(f) An open start** (task 5195) is written `from: null`: the interval holds before any date a source states,
  as an omitted or null `to` holds after. The key stays required, so a forgotten `from` still fails V1. Both ends
  null means always. Never stand in a one-day `from` for an unknown start (5177 wrote `calendar.julian` as present
  only on 2 September 1752). S7 is written `from: null, to: 1752-09-02`; when S8 finds a start, `from` takes it.
  An open-start absence window reaches back without limit; an open-start invention is never inside one.

### `benchmark_role` and V5

**How the role is set.** The unit writing a row sets `benchmark_role` on every observation whose place is in a
benchmark region and whose date overlaps its window (ROADMAP P11a, provisional): H1 England 1270-1700 and H2 Japan
1600-1868 `development`; H3 Greenland 985-1450 and H4 Copán valley 400-1200 `held_out`; H5 Iceland 874-1300
`reserve`. Every A-row observation above is `development`. Observations outside every window (England 1086, say)
carry no role. Attestations have no role field; the guard below treats them by place and date instead.

**How V5 keeps held_out rows from tuning units** (N1 builds all three; no H3 or H4 row is written before N1):

1. **Data check** (`src/check.ts`, run by `scripts/check.ts`): `src/benchmark.ts` exports `BENCHMARK_WINDOWS`
   (`{ id: 'H1'..'H5', region, from, to, role }`, region ids `region.england`, `region.japan`, `region.greenland`,
   `region.copan-valley`, `region.iceland`; a window whose region has no record yet is skipped). An observation
   inside a window (place a descendant of the window's region during the window, by `createRegionIndex`, and dates
   overlapping, by `dateRange`/`intersectDates`) with a different role fails; inside a `held_out` window a missing
   role also fails; a role on an observation inside no window fails. A missing role in a development or reserve
   window passes (old fixture rows need no edit).
2. **Library guard:** `openCatalogue(root?, { heldOut?: 'withhold' | 'include' })`, default `withhold`. With
   `withhold`, `window()` and `get()` drop every attestation and observation placed and dated inside a `held_out`
   window (undated rows placed in a held-out region too), and `window()`'s per-kind coverage gains `withheld`, the
   count of rows dropped, so coverage stays honest without exposing values.
3. **Static check** (`src/nogate.ts`, beside V2(a)): any `.ts` file `scanToolchain` reads that passes
   `heldOut: 'include'` fails unless its path is in `HARNESS_PATHS` (in `src/benchmark.ts`, empty until the History
   keeper names the P11 harness, unit kind `harness`); the catalogue's own `test/` is exempt. On the belt, a tuning
   unit's WORK file never lists a held-out region's record files under Read.

## Part B: the API gaps (DESIGN §2.2, §3)

Units that touch `src/index.ts` (N1, N6, N7, N8) run one at a time. `openCatalogue` keeps its first argument
(`repoRoot`) and gains a second, `OpenOptions` (`heldOut` from N1, `compiled` from N8).

### B1. `label`

`label(id: string, opts: { lang: string; at?: string; year?: number }): string | undefined`, on the object
`openCatalogue` returns; the only reader call a mechanism may declare (DESIGN §2.2), and it picks a word, never a
gate. Behaviour, alias resolved first, unknown id `undefined`; among the record's names with `lang === opts.lang`:

1. the first name that states a `region` or `period` constraint and meets all it states: `at` is the name's
   `region` or a descendant of it during `year`; `year` falls in a presence attestation of the name's `period`
   record. A constraint is unmet when `at` or `year` is not given. Order by `use`: period, vernacular, preferred,
   alternate, scientific; then by position in `names`;
2. else the first `preferred` name;
3. else the first name with no constraint (the piece of eight's Spanish period name "Real de a ocho");
4. else `undefined`: no fallback to another language.

Reuses `src/load.ts` (`createIdResolver`), `src/regions.ts` (`createRegionIndex`, gaining `ancestorsDuring(id,
from, to)` on the forward graph that `reachable` already walks; `dateRange`, `intersectDates`). New file
`src/label.ts` (`createLabeler(catalogue)`). Tests `test/label.test.ts` on small records in the test: preferred
name; a period name chosen inside its region and period; the same name not chosen outside its period or with no
`year`; a descendant place (a town inside the name's island); an alias id; an unconstrained period name when no
preferred name exists in the language; unknown language and unknown id give `undefined`; `regions.test.ts` gains
`ancestorsDuring` cases (dated `part_of`, both sides of the date).

### B2. `date`

`date(source: string | DatePoint, opts: { place: string; calendar?: Calendar; yearStart?: 'jan-1' | 'mar-25' }):
DateReading`, where `DateReading = NormalisedDate & { calendar: Calendar | 'unknown'; yearStart: 'jan-1' |
'mar-25' | 'unknown'; basis: string[]; conflict: boolean }` (`NormalisedDate`, `Calendar` from `src/dates.ts`).

- A string is `YYYY`, `YYYY-MM` or `YYYY-MM-DD`, astronomical years, an optional leading `-`; anything else throws
  `RangeError`. With `opts.calendar` and `opts.yearStart` both given, the caller states the source's calendar:
  `basis` is empty and no record is read.
- Otherwise the calendar is read from the data, never assumed: a fixed map from record ids to code values
  (`calendar.julian` julian, `calendar.gregorian` gregorian, `calendar.lady-day-year-start` mar-25,
  `calendar.january-year-start` jan-1). An attestation of `presence` or `adoption` on those records applies when
  `opts.place` is its place or a descendant during the date, and its interval covers the date as written; an
  adoption with no `to` holds onward. `basis` lists the record ids used.
- Then `fromSource` converts. No applicable calendar or year start gives `'unknown'`, the date returned as
  written, `shifted: false`, `approximate: true`; two that disagree give `'unknown'` with `conflict: true` and both
  ids in `basis`. A written date in England's gap (3-13 September 1752) matches no record and gives `'unknown'`.

Reuses `src/dates.ts` (`fromSource`), `src/regions.ts`, `src/load.ts`. New file `src/date-reader.ts`. Tests
`test/date-reader.test.ts` on test records shaped like A6-A8: `'1691-01-10'` in England gives 1692-01-20,
`shifted`, julian, mar-25, both ids in `basis` (DESIGN §2.2); `'1752-09-14'` unchanged, gregorian; `'1752-09-05'`
unknown; a place with no calendar unknown and unshifted; `'1270'` approximate; explicit `opts` override; a
conflict; a descendant place and an aliased place. After N4, `test/index.test.ts` runs the §2.2 example on `data/`.
If N3's sheet records a year-start style the code lacks (rule (e)), N7 adds it with its own tests first.

### B3. The build: `dist/catalogue.json` and `catalogue_hash`

- `src/build.ts`: `compileCatalogue(catalogue: LoadedCatalogue): { json: string; hash: string }`. Throws if
  `checkRecords` fails. `json` is the canonical form of `{ format: 1, records, aliases }`, records sorted by id,
  aliases by `old`, object keys sorted, arrays inside a record in file order, no whitespace, one final `\n`, LF
  only, UTF-8 without BOM. `hash` is the lowercase hex sha256 of exactly those bytes (`node:crypto`). The canonical
  function moves from `src/window.ts` to `src/canonical.ts`; `window.ts` imports it unchanged.
- `scripts/build.ts` (npm script `build`): loads with `loadRecords`, writes `dist/catalogue.json` (gitignored),
  prints `catalogue_hash <hex>`, exit 1 and no file on a check failure.
- `openCatalogue()` exposes `catalogue_hash` (computed by `compileCatalogue` at open, so a consumer has it without
  a build), and with `{ compiled: path }` reads that file instead of `data/`: hash of the file's bytes, each record
  through `validateRecord`, then the same reader. The Kernel keeper's snapshot field records this value; the
  Catalogue only exposes it (DESIGN §2.2, "Replay").
- Tests `test/build.test.ts`: two builds give the same bytes; shuffled load order and shuffled keys in a record give
  the same hash; one changed field changes it; `hash` equals sha256 of the written file; `{ compiled }` gives the
  same `get`, `window` and `catalogue_hash` as `data/`; an invalid record throws and writes nothing.

### B4. V7, the coverage report

- `src/coverage.ts`: `coverageReport(reader, windows = COVERAGE_WINDOWS): CoverageRow[]`; `COVERAGE_WINDOWS` is
  `BENCHMARK_WINDOWS` (N1) plus Caribbean 1690-1720. One row per window and kind: `window`, `region`,
  `regionFound`, `kind`, `records` (present), evidence rows by label (`researched`, `estimate`, `fiction`,
  `open`), `undated`, `withheld`, observations by `benchmark_role`. It calls `window()` with the default
  `withhold`, so a held-out window reports counts, never values, and needs no harness path. A window whose region
  has no record is one row, `regionFound: false`.
- `scripts/coverage.ts` (npm script `coverage`): a Markdown table on stdout, `--json` for JSON; deterministic.
- Tests `test/coverage.test.ts`: counts by label on test records; a missing region; a held-out window shows
  `withheld` and no values; two runs give identical output; the Caribbean row is present.

## Units

One session each. Composer units follow `cursor/RULES.md`; the sourcing unit reads web pages and downloads nothing.
The Gates hold no `|` character, so each copies out of the table as written (bash process substitution instead).

| # | Model | Work | Files | Needs | Gate |
|---|---|---|---|---|---|
| N1 | composer | V5: `BENCHMARK_WINDOWS`, `HARNESS_PATHS`, role check, `heldOut` guard in `get`/`window` with `withheld` coverage, static scan (Part A, V5) | `src/benchmark.ts`, `src/check.ts`, `src/window.ts`, `src/index.ts`, `src/nogate.ts`, `test/benchmark.test.ts`, `test/check.test.ts`, `test/window.test.ts`, `test/nogate.test.ts` | — | `npx vitest run test/benchmark.test.ts test/check.test.ts test/window.test.ts test/nogate.test.ts && npx tsc --noEmit && node --experimental-strip-types scripts/check.ts` |
| N2 | composer | `ingest-equipment.ts` keeps native rows (every source `catalogue/source.cat-*`) on write and `--check`, unions record `sources`; check: a `source.cat-*` record has empty `derived_from` (rules (b), (d)) | `scripts/ingest-equipment.ts`, `src/check.ts`, `test/ingest-equipment.test.ts`, `test/check.test.ts` | — | `npx vitest run test/ingest-equipment.test.ts test/check.test.ts && npx tsc --noEmit && node --experimental-strip-types scripts/ingest-equipment.ts --check` |
| N3 | sonnet (web) | H1 sourcing sheet for A1-A8: per row the id, kind, row type, value or `open`, unit, place, date as the source gives it (calendar too), label, confidence and reason, `benchmark_role`, the work, locator, url, opened yes/no; the `CAT-` source list; searches that found nothing | `native/h1-england/SHEET.md` | — | `test -f native/h1-england/SHEET.md && grep -qE '^. *S1 ' native/h1-england/SHEET.md && grep -q 'CAT-' native/h1-england/SHEET.md && grep -q 'calendar.julian' native/h1-england/SHEET.md && grep -q 'institution.manor' native/h1-england/SHEET.md` |
| N4 | composer | records from the sheet only: `CAT-` sources, calendar, organism, technology, institution records, the `region.england` observation and notes sentence, the windmill native row | `data/source/cat-*.json`, `data/calendar/`, `data/organism/`, `data/technology/`, `data/institution/manor.json`, `data/region/england.json` | N1, N2, N3 | `node --experimental-strip-types scripts/check.ts && node --experimental-strip-types scripts/fixture-drift.ts && node --experimental-strip-types scripts/ingest-equipment.ts --check && npx vitest run test/demo.test.ts && grep -q 'record catalogue/region.england' <(node --experimental-strip-types scripts/demo.ts)` |
| N5 | haiku (web; did not write the rows) | V4 audit AUDIT-H1 of every N4 row (the batch is small, so all of it, not 10 %): value, label, date, place, citation and role against the opened source; each open row confirmed absent in the cited work; rulings (a)-(c); no record edited | `native/h1-england/AUDIT-H1.md` | N4 | `test -f native/h1-england/AUDIT-H1.md && grep -qE 'AUDIT-H1 [a-z]+ [0-9]+/[0-9]+' native/h1-england/AUDIT-H1.md` |
| N6 | composer | B1 `label`, `ancestorsDuring` | `src/label.ts`, `src/regions.ts`, `src/index.ts`, `test/label.test.ts`, `test/regions.test.ts` | N1 | `npx vitest run test/label.test.ts test/regions.test.ts test/index.test.ts && npx tsc --noEmit` |
| N7 | composer | B2 `date`, and rule (e) if the sheet needs a new year-start style | `src/date-reader.ts`, `src/index.ts`, `src/dates.ts` and `src/schema.ts` (rule (e) only), `test/date-reader.test.ts`, `test/index.test.ts`, `test/dates.test.ts` | N4, N6 | `npx vitest run test/date-reader.test.ts test/dates.test.ts test/index.test.ts && npx tsc --noEmit` |
| N8 | composer | B3 build to `dist/catalogue.json`, `catalogue_hash`, `{ compiled }` | `src/build.ts`, `src/canonical.ts`, `src/window.ts`, `src/index.ts`, `scripts/build.ts`, `package.json`, `test/build.test.ts` | N7 | `npx vitest run test/build.test.ts test/window.test.ts test/index.test.ts && npx tsc --noEmit && grep -qE '^catalogue_hash [0-9a-f]{64}$' <(node --experimental-strip-types scripts/build.ts) && test -f dist/catalogue.json` |
| N9 | composer | B4 V7 coverage report | `src/coverage.ts`, `scripts/coverage.ts`, `package.json`, `test/coverage.test.ts` | N1, N4 | `npx vitest run test/coverage.test.ts && npx tsc --noEmit && grep -q 'H1' <(node --experimental-strip-types scripts/coverage.ts)` |
| N10 | opus (keeper) | D1 step 2 sign-off: AUDIT-H1's result and any rulings into DESIGN (§1.1 native rows, §2.2 status, §3, Log), README API lines, HANDOFF Done line; next stage (H1 beyond D1, then H2, H5, H3/H4) planned | `DESIGN.md`, `DESIGN-V4.md`, `README.md`, `HANDOFF.md` | N5, N8, N9 | `grep -q 'AUDIT-H1' DESIGN.md && grep -q 'catalogue_hash' README.md && python -c "import os;assert os.path.getsize('HANDOFF.md')<4096 and os.path.getsize('DESIGN.md')<40000" && node --experimental-strip-types scripts/check.ts` |

If AUDIT-H1 fails, a fix unit (composer, from the audit's table) and a re-audit (a model that wrote neither) go
between N5 and N10, as AUDIT-8 and AUDIT-9 did.
