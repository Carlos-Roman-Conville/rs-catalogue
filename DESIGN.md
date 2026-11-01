# Catalogue: design (P4, Catalogue keeper, 2026-10-31)

**Status: approved (Rex, 2026-10-31), with CAT-Q1–Q6 as proposed.** Building starts behind the approval marker
unit in lane `catalogue`. Marks: **(Rex, date)** his decision; *proposed* the keeper's; *open* a question
(numbered `CAT-Q`). Every number is labelled researched / estimate / fiction with its source.

Sources read for this design: `PLATFORM.md` §4, §6, §7, §11a–b; `ENGINE_MAP.md` §7 and "How they connect";
`ROADMAP.md` refinement A, P4, P11a; `ENGINES.md` (catalogue rows, the History correction, the transmission rule);
`kernel/src/ids.ts` and `kernel/DESIGN.md` K-O1; `registry/mechanisms.json` (547 rows, searched 2026-10-31); the
pirate files named in §6.

## 0. What the Catalogue is, and its fence

**Is (Rex, PLATFORM §6):** the universal reference catalogue. Every entity, substance, material, organism,
technology, institution, practice and phenomenon, and the places, periods and cultures they are attested in, with a
stable id, names, classification, geographic origin and spread, culture, earliest evidence, discovery / invention /
identification / adoption dates, sources, confidence and provenance class. Thorough enough to answer "this region,
this country, this locale, this period".

**Two uses (Rex):** (1) game configuration: a game adapter asks "Caribbean, 1690–1720" and gets a historically
grounded starting-conditions bundle; (2) unconstrained simulation, where the Catalogue grants nothing. Third use
(ENGINE_MAP): the reference truth that History's validation and the benchmark compare against.

**Tags, never unlocks (Rex).** A date in the Catalogue is a statement about the historical record. No mechanism in
any engine reads a Catalogue date, presence or availability to decide whether something can exist, be made, be
known or be used. That is Knowledge & Technology's job (P9: possibility, knowledge, invention, adoption, deployment,
from resources and capabilities). The Catalogue is read **only by configuration code (game adapters, scenario
builders, the History harness) and for labels**, never by a mechanism during a run. §4 test V2 enforces it.

**Never owns:**

| Not the Catalogue's | Owner | The seam |
|---|---|---|
| physical and chemical properties used by a mechanism (density, melting point, heat capacity) | Reality | Reality's data tables key rows by Catalogue id (`ref`); the Catalogue may cite a property as a reference observation (§1.1 `observations`), never as the value a mechanism reads (CAT-Q1) |
| organism biology (growth, metabolism, lifespan parameters) | Life | same: keyed by Catalogue id |
| goods, recipes, prices, inventories as economic records | Economy (`economy.recipe.definition`) | a good carries an optional `ref: catalogue/...`; the Catalogue never prices or makes anything |
| whether a society can make or knows a technology | Knowledge & Technology (P9) | agreed with the K&T keeper 2026-10-31 (KNT-K1): the Catalogue's `technology.*` and `practice.*` records own names, classification, origin and spread, reference dates, sources, confidence and provenance; K&T's technique record owns propositions, minimum skill, tacit share and the Economy recipe ids it enables, with `catalogueRef` holding the qualified Catalogue id. Propositions are never catalogued. `documented_prerequisite` is a citation K&T may use when writing its records, never read at run time |
| what a person believes about a thing | Cognition | beliefs are compared against the Catalogue as truth; Cognition never reads it as knowledge |
| what happened in a run | History | History compares its record against Catalogue observations |
| terrain, coastline and geometry | Reality | the Catalogue names regions and their historical membership; shapes come from Reality's terrain or a sourced dataset (CAT-Q5) |
| ids, time, calendars as arithmetic | Kernel | the Kernel qualifies ids and offers period constants; the choice of calendar per place and date is the Catalogue's (K-O1, deferred by Rex 2026-10-30) |
| a game's world profile (what its story makes available, time anomalies) | the game plugin | the pirate `TECHNOLOGY.md` profile becomes a plugin overlay over a Catalogue query (§6) |

**The Catalogue holds no simulation state and writes nothing during a run.** It is versioned reference data plus a
read-only query library.

## 1. The mechanisms

The Catalogue is mostly data. Six mechanisms are proposed; each is a registry row the registry keeper registers (§5).
Contract fields per PLATFORM §7.

### 1.1 The record (`catalogue.record.schema`)

One record per thing. Fields (proposed):

| Field | Type | Meaning |
|---|---|---|
| `id` | `catalogue/<kind>.<slug>` | §2.1; stable forever, never reused |
| `kind` | enum | `entity` (a specific named thing: a ship, a building, a person of record), `substance`, `material`, `organism`, `technology`, `institution`, `practice`, `phenomenon`, `region`, `period`, `culture`, `calendar`, `source` |
| `names` | list of `{text, lang, script?, use, region?, period?}` | `use` ∈ preferred, scientific, vernacular, period, alternate; a period name ("saltpetre", "chymist") is kept with its place and time |
| `classification` | list of `{scheme, path}` | schemes declared once each: Linnaean taxonomy (organisms), CAS/IUPAC (substances), the catalogue's own kind tree, OCM/HRAF (practices, institutions; to confirm in research) |
| `provenance` | set of classes | §1.2; several may apply (Rex) |
| `attestations` | list (below) | every dated, placed statement: origin, earliest evidence, discovery, invention, identification, adoption, presence, absence, spread |
| `relations` | list of `{rel, to}` | `is_a`, `part_of`, `made_of`, `variant_of`, `same_as`, `documented_prerequisite` (reference only, never a gate) |
| `observations` | list (below) | documented measurements tied to a place and date: "Port Royal 1688, ~1,200 houses" |
| `sources` | source ids | every attestation and observation cites at least one |
| `derived_from` | list of `{file, anchor, sha256}` | where an ingested record came from (§6); empty for native records |
| `scope` | `universal` or `game:<plugin>` | original fiction of a game lives under its plugin's scope (CAT-Q2) |
| `notes` | text | short |

**Attestation** `{what, place, culture?, date, source, label, confidence, note?}`: `what` ∈ origin, earliest_evidence,
discovery, invention, identification, adoption, presence, absence, spread_to; `place` a region id; `date` a §1.3
interval; `label` researched / estimate / fiction; `confidence` high / medium / low with a reason. **Absence of
evidence is never recorded as absence**: `absence` needs a source that says the thing was not there (e.g. "no brewer
in any source read" is written as unknown presence, the next paragraph, with a note, not `absence`).

Unknown presence is written within the label enum (`src/schema.ts`: researched / estimate / fiction / open): an
attestation with `what: presence`, `label: open` and `confidence: low`, the reason (what was searched, what was not
found) in the confidence reason and the record's `notes`. There is no `unknown` label or `what` value; a WORK file
must not ask for one.

**Observation** `{quantity, value, unit, place, date, source, label, confidence, benchmark_role?}`: `quantity` a
registry quantity id where one exists (`registry/quantities.json`), else a proposed one; units by the Kernel's
dimensions. `benchmark_role` ∈ development (H1 England, H2 Tokugawa), held_out (H3 Greenland, H4 Copán), reserve (H5
Iceland): a unit that tunes a mechanism may not read `held_out` rows; the P11 evaluation harness (unit kind
`harness`) reads them to score H3 and H4 (ROADMAP P11a's rule, enforced by §4 V5; names agreed with the History
keeper 2026-10-31).

**Native rows** (H1 England, task 5254; rulings in [NATIVE-PLAN.md](NATIVE-PLAN.md), "Rulings for native rows"): a
native row cites `CAT-` source records only (`data/source/cat-*.json`, empty `derived_from`), each opened by its
writer. (a) native means sourced directly, else `researched` / `low` per DESIGN-V4 (k); (b) a record may mix fixture
and native rows, each held to its own basis; (c) a value no source gives is an observation `value: null`, `label:
open`, citing the work searched, and its reason says the full text was read and names the parts read; a search that
read less stays in the sheet as "not yet searched" and is not written (amended by 5233 after AUDIT-H1-2); (d) no
native row in a script-ingested record unless the script keeps it; (e) a year-start style the code lacks is added
by a code unit first; (f) an unknown start is `from: null`; (g) an interval's one `precision` is its coarsest bound's
(DESIGN-V4 (m)). Audited by AUDIT-H1, -2, -3: **AUDIT-H1-3 pass 24/24** (Log).

- **Inputs:** source documents, fixture files. **Outputs:** records. **State:** the data files (§2.3), versioned in git.
- **Formulation:** data only; a JSON Schema plus cross-field checks (every attestation cites a source; every place
  resolves; every `ref` in another engine's data resolves to a live or aliased id).
- **Dependencies:** Kernel ids and units. **Timescale:** static (changes by commit, never during a run).
- **Invariants:** ids never reused; a merge leaves an alias; no record without a source unless labelled fiction.
- **Sources / evidence:** the schema itself is level 4 (a simulation approximation of a reference catalogue); each
  value carries its own level.
- **Approximations:** dates as intervals with precision, never false points; names per language without full
  orthographic history.
- **Validation:** §4 V1, V3, V4. **Consumers:** every engine's data tables (by `ref`), game adapters, History.
- **Rate limiter:** research throughput (belt research and Composer row units, 10–20 records per unit, the
  cards-are-data measure). **Failure mode:** a value without a source, a fiction value labelled researched, or a
  date read as a gate; the checks fail the commit, not the run.

### 1.2 Provenance classes (`catalogue.provenance.classify`)

**(Rex, PLATFORM §6)** real, prehistoric, mythological, fantasy, science fiction, original fiction; several may
apply. Proposed meanings, so two units never classify the same thing differently:

| Class | A record is this when | Example |
|---|---|---|
| `real` | the thing exists or existed in the historical or scientific record | saltpetre; the Newcomen engine; matelotage |
| `prehistoric` | real, attested only archaeologically or palaeontologically, before writing in its region | the Copán valley's earliest maize; a mammoth |
| `mythological` | held true in a real culture's belief, not in the scientific record; the belief itself is real and attested | the duppy, the jumbee, the Rolling Calf |
| `fantasy` | an invented thing in the tradition of a genre, not believed by a culture | a generic dragon of game fiction |
| `science_fiction` | an invented thing framed as future or alien science | a fusion drive |
| `original_fiction` | invented by Rex for one of his games | the Imperial faction; the Atlanteans; the Ghost Fleet |

The pairing that matters most: a mythological creature is `mythological` and its **belief** is a `real` practice
record (`practice.belief-in-duppies`, attested Jamaica, with sources). The pirate bestiary's rule "the creatures are
the bestiary's" becomes: the belief is Catalogue `real`, the creature as a game monster is `original_fiction` or
`mythological` under `scope: game:pirate-ship`.

The pirate journal's provenance labels and time-anomaly note (`pirate.sci.journal_anomaly_label`, registry: "labels
only; compatible with §6") are a game-side view of this field and stay the plugin's; proposed as an aggregation
pair, not a duplicate (§5).

- Inputs: a record; outputs: its class set. Formulation: the table above as rules for the row units; Haiku checks
  sample them. Evidence: level 4. Failure mode: a game invention filed as `real`; caught by the scope rule (a
  `game:` record cannot be `real` without a universal twin).

### 1.3 Dates and calendars (`catalogue.date.normalise`)

Every date is an interval `{from, to, precision, circa, calendar_of_source, year_start_of_source}` stored on one
proleptic axis (astronomical years, so 1 BCE = 0, plus optional month and day; Gregorian proleptic for storage).
The source's own calendar is kept so a quote is never silently shifted.

- **Formulation (level 1, established):** Julian ↔ Gregorian by the standard day-count algorithm (Julian Day
  Number); the offset is 10 days from the 1582 reform through Julian 28 February 1700 and 11 days from Julian 29
  February 1700 through Julian 28 February 1800.
  England's legal year began 25 March until 1752 (Calendar (New Style) Act 1750): a document dated "10 January
  1691" is 1692 by the January year. Sources to cite in the unit: the Act's text; Dershowitz & Reingold,
  *Calendrical Calculations* (researched; to open in the unit).
- **Calendar adoption per place** is itself Catalogue data: `calendar.gregorian` attested `adoption` in each region
  (Spain 1582, Britain and its colonies 1752, Japan 1873). This is K-O1's catalogue side: a run whose epoch is
  "England 1690" gets the Julian calendar with a 25 March year start for labels and for reading sources; simulation
  time stays the Kernel's. **The epoch** is recorded in the snapshot as a position on the stored axis (a decimal
  astronomical year, e.g. `1270.0`), so History maps sim time to a date as `epoch + t / TROPICAL_YEAR` with no
  calendar logic (agreed with the History keeper 2026-10-31, its DESIGN §5.4 K-5); the Catalogue converts that
  position to a calendar date for labels. History owns nothing calendrical.
- Inputs: a date as a source gives it, the place; outputs: the stored interval. Invariants: round trip
  source → stored → source is the identity. Validation: V3 against published conversion tables. Failure mode: a
  year-start error of one year on January–March dates before 1752.

### 1.4 Regions and periods (`catalogue.region.membership`)

A gazetteer of `region` records with **time-dependent containment**: `part_of` relations carry a date interval
(Jamaica part of New Spain to 1655, of the English Crown from 1655; New Providence under the Lords Proprietors to
1718, a Crown colony after, TWN-NAS, TWN-ROG). Regions nest: world → Atlantic → Caribbean → Greater Antilles →
Jamaica → Port Royal. A region may be physical (a sea, an island), political (a colony) or cultural (Polynesia);
the kind is a field. Periods (`period.war-of-the-spanish-succession`, 1701–1714) are records with a date interval
and optional regions, used as names only.

- Formulation: graph containment at a date; a query on a region includes descendants that were part of it during
  the asked interval. Geometry is not held (CAT-Q5). Invariant: no cycle at any date. Failure mode: a place counted
  in two parents at once where the record does not say so.

### 1.5 The window query (`catalogue.query.window`)

The interface a game uses (§2.2). Given a region, a date interval and filters, it returns a **starting-conditions
bundle**: every record with an attestation of presence, adoption or use that overlaps the window in the region or
its descendants, each with the matching attestations, observations, labels, confidences and source keys.

Semantics (proposed): a record is in the bundle as `present` (an attestation of presence or adoption overlaps),
`known_elsewhere` (attested elsewhere in the window, not here; reported because contact may bring it, never
granted), or omitted. **Nothing in the bundle grants anything**: the adapter uses it to seed initial stocks,
populations, practices and institutions in the engines, each seed going in through the owning engine's normal
commands, where it is labelled. Default filter `provenance ⊆ {real, prehistoric, mythological}` with
`scope: universal` (CAT-Q3); a game adds its own scope explicitly.

- Inputs: `{region, from, to, kinds?, provenance?, scope?, include_known_elsewhere?}`. Output: a bundle, sorted by
  id, deterministic. Timescale: called once at configuration. Failure mode: an empty bundle where sources exist (a
  coverage gap, reported per kind with counts, never filled by invention).

### 1.6 Fixture ingest (`catalogue.ingest.fixture`)

Reads documents that stay where they are and produces Catalogue records with `derived_from` pointers (§6). A
manifest names each source file, the section or table anchor, and the mapping; the ingest records the file's
sha256. A later change to the source file makes the drift check (V6) report the records to re-ingest; the Catalogue
never edits the source.

**Classifier rulings** (unit 5070): when a ruling overrides how an ingest script classifies a row (e.g. a plain
`none` row ruled unknown presence instead of absence, `fixtures/pirate-town/ABSENCE-RULINGS.md`), it is made in the
script's stated per-row list, keyed by row id with the ruling and its reason, and the records are regenerated by
running the script. Never by hand edits to records: a hand edit is lost at the next re-ingest and hides the ruling
from the drift check (V6).

## 2. Interfaces

### 2.1 Ids (agreed with the Kernel keeper 2026-10-31)

- Qualified by the Kernel's `qualify('catalogue', local)`: `catalogue/<local>`. No `/` in the local part
  (`kernel/src/ids.ts`).
- Local id `<kind>.<slug>`: lowercase ASCII `[a-z0-9-]`, the dot only after the kind, an optional `.<n>`
  disambiguator. Examples: `catalogue/substance.saltpetre`, `catalogue/organism.zea-mays`,
  `catalogue/technology.newcomen-engine`, `catalogue/region.new-providence`, `catalogue/practice.matelotage`,
  `catalogue/institution.parish-vestry`, `catalogue/source.twn-nas`.
- **Slugs, not `mint()` counters:** ids must be the same across independent builds and ingest orders; a counter
  would make an id depend on load order. Ids are never renamed; a merge or rename leaves an alias row
  (`data/aliases.json`, the registry's pattern).
- Other engines refer to a Catalogue record with a `ref` field holding the qualified id; the Catalogue's check
  resolves every `ref` it can see.

### 2.2 The query interface a game uses

```ts
import { openCatalogue } from '@rex/catalogue'
const cat = openCatalogue()                       // the compiled data; read-only
const bundle = cat.window({
  region: 'catalogue/region.caribbean',
  from: { year: 1690 }, to: { year: 1720 },
  kinds: ['substance', 'organism', 'technology', 'institution', 'practice'],
})
bundle.present      // records with the matching attestations, labels, sources
bundle.knownElsewhere
bundle.coverage     // per kind: records found, records with only estimate or fiction values, gaps noted
cat.get('catalogue/substance.saltpetre')         // one record (aliases resolved)
cat.label('catalogue/organism.zea-mays', { lang: 'en', at: 'catalogue/region.england', year: 1690 })
cat.date('1691-01-10', { place: 'catalogue/region.england' })   // → 1692-01-20 Gregorian, flagged
```

As a Kernel port (kernel DESIGN §8.1, a2993b9: provider calls are ports; agreed with the Kernel keeper
2026-10-31): one static provider `CatalogueReader` (`window`, `get`, `label`, `date`). **The consumer declares the
edge**: each engine that calls it adds `direction: "in"` ports on the catalogue quantities it reads. Those
quantities get ids in `registry/quantities.json` (the registry keeper assigns them) with one writer, a built
load-time mechanism `catalogue.reference.ingest` (compiles `data/` into the index once, before the run), so the
check sees a built writer and every read as a connected pair. The catalogue's own `kernel.json` declares that
mechanism and nothing at run time. A mechanism may declare a read of `CatalogueReader.label` only; `window` and
`get` are for configuration code (adapters, scenario builders, the History harness), which V2 checks.

**Replay (Kernel keeper's note b):** a run reproduces only against the same catalogue content, so each run records
`catalogue_hash`, the sha256 of the compiled `dist/catalogue.json`, in the Kernel snapshot's `kernel` block. Kernel unit 2805
(snapshot version 1 to 2) adds `catalogue_hash: string | null` (64 lowercase hex, supplied by the host; the kernel
never reads the catalogue), makes `epoch: number | null` a decimal astronomical year on this catalogue's axis (1 BCE =
0; History maps sim time as `epoch + t / TROPICAL_YEAR`), and keeps the old free text as `epochLabel?`.

**Registry (registry keeper, 2026-10-31):** the seven rows are registered (domain `infra`, planned). Quantities, all
written by `catalogue.reference.ingest`: `catalogue.record` (get), `catalogue.label` (the only one a mechanism may
read), `catalogue.window_bundle` (configuration code only), `catalogue.date`. Overlaps in batch 2c: DUP-63 date-gated
availability (feasibility to `knowledge.capability.state`), DUP-64 aggregation with the pirate journal label, DUP-65
shared part with `economy.recipe.definition`.

**Status (2026-11-01, task 5254): built.** `label` (N6, `src/label.ts`), `date` (N7, `src/date-reader.ts`; the
§2.2 example runs on `data/` in `test/index.test.ts`), `catalogue_hash` with `npm run build` and `{ compiled }` (N8,
`src/build.ts`; NATIVE-PLAN B3 ruling, 5252), `{ heldOut }` default `withhold` (N1, `src/benchmark.ts`), coverage
(N9). README lists the calls.

### 2.3 Storage

`Toolchain/catalogue/data/<kind>/<slug>.json` one record per file (small diffs, Composer-friendly units),
source records at `data/source/<slug>.json` (kind `source`, with key, title, gives, rights, url; no separate
`data/sources.json`, PROMOTE-PLAN (d)), `data/aliases.json`. A build step
compiles an index (`dist/catalogue.json`) that the library loads. Fixtures under `fixtures/<name>/` with their
manifest; their records are kept apart from `data/` until a keeper promotes them (§6).

### 2.4 What the Catalogue reads

Kernel only (ids, units). No engine. **Read by:** every engine for labels and `ref`s; game adapters; History.

## 3. The first executable demonstration

**D1 "Two windows, no gates".** A command `npm run demo` in `Toolchain/catalogue`:

1. `window(Caribbean, 1690–1720)` from the pirate fixture prints the bundle: institutions (parish vestry, governor,
   the Lords Proprietors, pirate articles), practices (matelotage, careening, burial at sea, the Nine Night's
   antecedent wake), substances and materials (saltpetre, brass, glass, charcoal, bagasse), organisms (sugar cane,
   maize, the green turtle), technologies and equipment (the 314 equipment rows with their attestations), money
   (the piece of eight), observations (Port Royal 1688 house count; Nassau burned 1703 and 1706), with every value's
   label and source key, and a coverage table.
2. `window(England, 1270)` from a small native seed (the H1 starting rows: population ~4.5–5 M, crops, ploughs,
   mills, the manor, the Julian calendar with Lady Day), every value labelled and sourced (ROADMAP P4 test 1).
3. The no-gate check (V2) runs and passes: no mechanism declares a read of a Catalogue date.

It proves the Catalogue alone; no pirate slice runs.

**Next stage** (2026-11-01, task 5173): [NATIVE-PLAN.md](NATIVE-PLAN.md) plans step 2's native seed (H1 England 1270, rows sourced or `open`, never filled), V5 and `benchmark_role`, and the §2.2 gaps (`label`, `date`, the `dist/catalogue.json` build with `catalogue_hash`, the V7 coverage report), units N1-N10.

**Step 2 done** (2026-11-01, task 5254, N10): AUDIT-H1 fail 4/6, fixes 5232; AUDIT-H1-2 fail 2/6, fix 5245;
**AUDIT-H1-3 pass 24/24** (`native/h1-england/AUDIT-H1-3.md`). D1 steps 1-3 hold.

**Next stage** (2026-11-01, task 5254; NATIVE-PLAN "After D1"). One session each, in order; composer for anything a
test or `scripts/check.ts` gates, opus for audits and rulings, sonnet for sourcing sheets. Records only from a sheet;
every audit by a model that wrote neither the rows nor the fix; a failed audit gets a fix unit and a re-audit before
the next row. `CHECK` below is `node --experimental-strip-types scripts/check.ts`.

| # | Model | Work | Gate |
|---|---|---|---|
| X1 | sonnet | H1 sheet 2, England 1270: land use, livestock, wages and prices (Clark), towns, ships, climate, royal institutions; and S8 (a `CAT-` source for Julian reckoning in England before 1752) | `grep -q 'CAT-' native/h1-england/SHEET-2.md && grep -q 'S8' native/h1-england/SHEET-2.md` |
| X2 | composer | records from SHEET-2 (S8 found: `calendar_of_source: julian` on both lady-day attestations) | `CHECK && node --experimental-strip-types scripts/ingest-equipment.ts --check && npx vitest run test/demo.test.ts` |
| X3 | opus | AUDIT-H1-4 of every X2 row | `grep -qE 'AUDIT-H1-4 [a-z]+ [0-9]+/[0-9]+' native/h1-england/AUDIT-H1-4.md` |
| X4 | sonnet | H1 sheet 3, trajectory 1270-1700: population, real wages, GDP per head, urban share, enclosure, tax revenue, plague mortality, wars, regime changes | `grep -q 'CAT-' native/h1-england/SHEET-3.md` |
| X5 | composer | records from SHEET-3, all `development` | `CHECK && npx vitest run test/demo.test.ts` |
| X6 | opus | AUDIT-H1-5 of X5 (10 % sample if over 60 rows) | `grep -qE 'AUDIT-H1-5 [a-z]+ [0-9]+/[0-9]+' native/h1-england/AUDIT-H1-5.md` |
| X7 | sonnet | H2 sheet, Japan 1600 (Tokugawa), rows as A1-A8, `region.japan` if none exists | `grep -q 'CAT-' native/h2-japan/SHEET.md` |
| X8 | composer | H2 records, `development` | `CHECK && npx vitest run test/benchmark.test.ts` |
| X9 | opus | AUDIT-H2 of X8 | `grep -qE 'AUDIT-H2 [a-z]+ [0-9]+/[0-9]+' native/h2-japan/AUDIT-H2.md` |
| X10-X12 | sonnet, composer, opus | H5 Iceland 874: sheet, records (`reserve`), AUDIT-H5, as X7-X9 under `native/h5-iceland/` | as X7-X9 |
| X13 | opus | H3/H4 ruling: who may write and audit `held_out` rows (no tuning unit reads them; V5 guard) | `grep -q '(h) Held-out rows' NATIVE-PLAN.md` |
| X14-X19 | sonnet, composer, opus | H3 Greenland 985, then H4 Copán 400: sheet, records (`held_out`), audit each, as X7-X9 | `CHECK && npx vitest run test/benchmark.test.ts` |
| X20 | opus | keeper sign-off of the stage: DESIGN Log, HANDOFF | `grep -q 'AUDIT-H4' DESIGN.md` |

## 4. Validation plan (§11a: implemented ≠ integrated ≠ validated)

The full validation plan (V4 rules, tests V1–V7, and lettered exceptions (a)–(m)) lives in [DESIGN-V4.md](DESIGN-V4.md).

## 5. Registry: rows found and proposed

**Search (2026-10-31, 547 rows):** no `catalogue.*` row exists. Rows that touch the Catalogue's ground:

| Row | Owner | Relation | Proposal (to the registry keeper) |
|---|---|---|---|
| `pirate.sci.tech_availability` | pirate-ship, documented-only | flagged by the audit as **date-gated** (§6 violation in spirit: availability keyed to invention dates; 13 rows "none (anomaly)") | new DUP group: its dated availability becomes Catalogue attestations (presence, with sources); the feasibility part goes to K&T (P9); the game's anomaly plug stays the plugin's overlay. Owner of the reference facts: Catalogue |
| `pirate.sci.journal_anomaly_label` | pirate-ship | game-side provenance and anomaly labels; "compatible with §6" | aggregation pair: the label reads `provenance`; the plugin keeps the anomaly note |
| `economy.recipe.definition` ("Recipe and good catalogue") | economy, built | a good is an economic record; the Catalogue holds the identity | shared part: a good gains an optional `ref`; no move |
| `pirate.stats.attribute_catalogue` | pirate-ship | unrelated (body attributes) | none |
| `realism.ocean.tides_currents` | planned | ENGINES.md "Catalogue or Reality by region" | Reality owns the mechanism; the Catalogue may hold tide-table observations as reference only |

Proposed new rows: `catalogue.record.schema`, `catalogue.provenance.classify`, `catalogue.date.normalise`,
`catalogue.region.membership`, `catalogue.query.window`, `catalogue.ingest.fixture` (§1), and the load-time
writer `catalogue.reference.ingest` (§2.2; the writer of the catalogue quantities consumers read), all `planned`, domain:
cross-cutting reference (the registry keeper picks the domain letter), scope universal.

## 6. The first fixture: the pirate town files (ingested where they are, never moved)

Sources (all stay in place, PLATFORM §10):

| File | What it gives the Catalogue | Records (estimate of the count) |
|---|---|---|
| `Games/RPG's/pirate-ship/files/pirate-ship/STARTING_TOWN.md` (town, settlement and economy keeper research tables) | observations (Port Royal 1688 houses and acreage, household size, trades present, wages, hours), institutions (vestry, governor-magistrate, escheat, freehold), regions (Port Royal, Nassau, Jamaica, New Providence, Barbados) | ~40 |
| `.../town/CULTURE.md` | practices and institutions with attestations (Anglican parish, the Jewish community and burial ground, the 1711 office bar, burial at sea, night burials and wakes, matelotage, pirate articles, the tavern as parlour), mythological records (duppy, jumbee, Rolling Calf) and their real belief practices | ~35 |
| `.../science/TECHNOLOGY.md` | nothing as records; its world profile becomes the pirate plugin's overlay definition (fields stay the plugin's) | 0 (mapping only) |
| `.../science/SCIENTIFIC_EQUIPMENT.md` and `.../body/data/equipment.json` (314 rows: id, skill, 1650–1730 availability, mark) | technology records with presence attestations; "none (anomaly)" rows are **not** absence: they become an unknown presence for the window (§1.1, "Unknown presence" paragraph: `what: presence`, `label: open`) plus their invention attestation | 314 |
| `.../SOURCES.md` (keys `TWN-*`, `STL-*`, `EQ-*`) | source records | ~100 |
| `Toolchain/economy/RESEARCH.md` | observations (prices, wages per trade, money: the piece of eight), source keys `ECON-*` | ~30 |

How (proposed): a manifest `fixtures/pirate-town/manifest.json` lists each file, the table anchor (the
`<!-- table:... -->` markers where present, else heading plus column header), the column mapping and the sha256. A
Sonnet scaffolding unit writes the ingest tool; Composer units map table batches (10–20 rows each); Haiku units run
V4 on each batch. **Fiction rows are not universal facts:** the priest `istj-m`, the factions, the dying town's cash
and the time anomalies go under `scope: game:pirate-ship` with `original_fiction`, or are skipped (CAT-Q2). Rows the
pirate files mark **(open, Rex)** are ingested as open and never filled. The fixture stays under `fixtures/` until
its V4 audit passes; then its universal records are promoted to `data/` with `derived_from` kept.
**Promotion is after the whole fixture** (2026-11-01, task 5004, `fixtures/pirate-town/INGEST-PLAN.md` (e)): AUDIT-9's
66 records stay under `fixtures/` until the equipment and economy ingest has passed its own V4 audits, then every
universal record moves to `data/` at once, because the economy units add observations to six AUDIT-9 records and
`src/drift.ts` checks `derived_from` only under `fixtures/*/records`, so a record promoted early would leave V6.
**Promotion plan** (2026-11-01, task 5102): `fixtures/pirate-town/PROMOTE-PLAN.md` moves the 663 universal records to `data/<kind>/` (the 1 `game:pirate-ship` record stays), V6 checks `data/` records against every fixture manifest, no `data/sources.json` (source records are `data/source/`), units P1-P4.

## 7. Questions answered (CAT-Q)

| # | Question | Decision |
|---|---|---|
| CAT-Q1 | Physical properties: values in the Catalogue, or with the owning engine? | **(Rex, 2026-10-31)** Properties stay with Reality and Life keyed by Catalogue id; the Catalogue holds identity, labels and documented observations |
| CAT-Q2 | Rex's original fiction (factions, Atlanteans, the Ghost Fleet) | **(Rex, 2026-10-31)** In the Catalogue under `scope: game:<plugin>`, excluded from default queries |
| CAT-Q3 | Default provenance filter for a window query | **(Rex, 2026-10-31)** `real`, `prehistoric`, and `mythological` as belief; universal scope; the rest only when asked |
| CAT-Q4 | First native content after the pirate fixture | **(Rex, 2026-10-31)** The benchmark starting rows (H1–H5), England 1270 first; H3 and H4 held out |
| CAT-Q5 | Region geometry | **(Rex, 2026-10-31)** Names and nested membership now; geometry later |
| CAT-Q6 | K-O1 calendar split | **(Rex, 2026-10-31)** As stated: calendars, adoption per place and year starts in the Catalogue; the integer clock and period constants in the Kernel; the epoch a decimal year on the stored axis; History owns nothing calendrical |

## Log

| Date | What |
|---|---|
| 2026-10-31 | Design drafted by the Catalogue keeper; id scheme proposed to the Kernel keeper; registry searched; to the controller for Rex |
| 2026-10-31 | History keeper agreed the calendar split (epoch as a decimal year on the stored axis; benchmark roles development / held_out / reserve; harness units may read held-out rows). Requests logged: staple-good mass per period unit (HIST-10), technology ids for I5 |
| 2026-10-31 | Kernel keeper agreed the id scheme and K-O1 split; §2.2 gains consumer-declared ports, the load-time writer `catalogue.reference.ingest` and `catalogue_hash` in the snapshot |
| 2026-10-31 | **Approved by Rex** through the controller, CAT-Q1–Q6 as proposed; repo and lane opened |
| 2026-11-01 | Task 5204 (N10): **AUDIT-H1 fail 4/6** (`native/h1-england/AUDIT-H1.md`, task 5200), so D1 step 2 is not signed off. Pass: R1 `calendar.julian` to 1752-09-02, R4 `calendar.gregorian` from 1752-09-14. Fail: R2, R3 `calendar.lady-day-year-start` state `year_start_of_source: mar-25` for a 1908 encyclopedia and a 2026 press release that number years from 1 January; R5 `calendar.january-year-start` gives 1752-01-01 as `gregorian`, but the Act's date is old style (julian); R6 `region.england` 1270 population is `open`, but CAT-BCKOVL-2010 Table 23 gives 4.40 M for 1270/79. API built: `label` (N6), `date` (N7), `catalogue_hash` and `{ compiled }` (N8), `{ heldOut }` (N1), coverage (N9). Next: fix unit, re-audit by a model that wrote neither, then N10 again (§3) |
| 2026-11-01 | Task 5254 (N10 again): **D1 step 2 signed off.** AUDIT-H1 fail 4/6 (5200) → fix 5232 (9625068); AUDIT-H1-2 fail 2/6 (5233; R2, R3 `precision: day`; rule (c) tightened, 6eb8e88) → fix 5245 (5b6ce99); **AUDIT-H1-3 pass 24/24** (5246, 37ac8ee). Precision ruling: NATIVE-PLAN (g), DESIGN-V4 (m). Open: SHEET S8 (a source for Julian before 1752). Next stage X1-X20 (§3) |
