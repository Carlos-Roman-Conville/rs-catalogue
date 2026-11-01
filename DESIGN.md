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
in any source read" stays `presence: unknown` with a note, not `absence`).

**Observation** `{quantity, value, unit, place, date, source, label, confidence, benchmark_role?}`: `quantity` a
registry quantity id where one exists (`registry/quantities.json`), else a proposed one; units by the Kernel's
dimensions. `benchmark_role` ∈ development (H1 England, H2 Tokugawa), held_out (H3 Greenland, H4 Copán), reserve (H5
Iceland): a unit that tunes a mechanism may not read `held_out` rows; the P11 evaluation harness (unit kind
`harness`) reads them to score H3 and H4 (ROADMAP P11a's rule, enforced by §4 V5; names agreed with the History
keeper 2026-10-31).

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
`catalogue_hash`, the sha256 of the compiled `dist/catalogue.json`, in the Kernel snapshot's `kernel` block; the
Kernel keeper drafts that field.

### 2.3 Storage

`Toolchain/catalogue/data/<kind>/<slug>.json` one record per file (small diffs, Composer-friendly units),
`data/sources.json` (source keys: author, title, year, what it gives, rights), `data/aliases.json`. A build step
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

## 4. Validation plan (§11a: implemented ≠ integrated ≠ validated)

| # | Test | Level (§11b) | Independent of the author |
|---|---|---|---|
| V1 | schema and cross-field checks: every record parses, every attestation and observation cites a source, every place and `ref` resolves, no id reused, aliases acyclic | mechanism; every unit | the check script |
| V2 | **tags, never unlocks** (ROADMAP P4 test 2): (a) static: a check over every engine's `kernel.json` and imports fails if a mechanism reads `CatalogueReader.window`/`get` or any Catalogue date field; (b) dynamic: the Kernel thirty-day harness run twice, once with every Catalogue date shifted by +500 years, gives byte-identical engine state | (a) every unit; (b) on interface change | (a) registry check; (b) Haiku unit |
| V3 | calendar conversions against published tables (the 1752 change: Wednesday 2 September followed by Thursday 14 September; Julian Day Numbers from *Calendrical Calculations*'s worked examples) | mechanism | data not written by the author |
| V4 | source audit: a Haiku unit that did not write the rows re-opens a 10 % sample of each batch's sources and confirms value, label and citation; a batch with a failure is re-checked in full | per batch | yes |
| V5 | held-out guard: no tuning unit reads an observation with `benchmark_role: held_out`; units of kind `harness` (the P11 evaluator) are allowed | mechanism | registry check |
| V6 | fixture drift: every `derived_from` sha256 still matches its source; mismatches listed for re-ingest | every unit touching a fixture | the check script |
| V7 | coverage report per benchmark window (H1–H5, Caribbean 1690–1720): records per kind, share researched / estimate / fiction | on demand | — |

**V4 anchoring rule** (2026-11-01, after AUDIT-1 failed 64 of 66 records on check 2). What a V4 audit holds an
ingested record to:

- **(a) Dates and places.** A record takes only the dates and places its anchored row or that row's section
  states. Beyond them it may take the referent window, and only the bounds that window states: Port Royal before
  1692 (to 1692) and Nassau 1703–1718 ("The referents" paragraph of `STARTING_TOWN.md`, repeated in the Q5
  section intro), and the game's period c. 1690–1720 that step 1 of the same section states. An attestation or observation that uses the referent window is labelled
  `estimate`, whatever the row's label is, and the referents paragraph is added as a second `derived_from` anchor.
  A bound that no anchor states, such as Port Royal's 1670 start or a trade's 1680 start, is never written: cite a
  row that states it as a further anchor, or set `date: null` and put the missing bound in `note`.
- **(b) Prose anchors.** The referents paragraph is the only prose anchor allowed, and only as that second anchor
  beside a row; never alone. Any other bold lead-in or paragraph is not an anchor (AUDIT-1 check 1).
- **(c) Source keys.** A record cites a source key only if one of its anchored rows names that key. A row that
  says only "`TWN-*`" names no key. To cite another key, add a second `derived_from` to a row that names it.
- **(d) Relations.** A relation has no `label` or `confidence` in the schema (`src/schema.ts`, `relations`), so
  uncertainty about a relation is written in the record's `notes`, naming the relation.
- **(e) The audit.** V4 check 2 (values, dates, places) and check 4 (source keys) follow (a) to (c): a value is
  supported if any of the record's anchors states it under these terms, and the label check accepts `estimate`
  for anything taken from the referent window.

**V4 nesting rule** (2026-11-01, review 1101-0126). An undated geographic `part_of` relation (Nassau in New
Providence in the Bahamas in the Caribbean in the Atlantic in the world; Port Royal and Kingston in Jamaica in the
Greater Antilles; Barbados in the Lesser Antilles) is anchored by the referents paragraph plus the row that names
the place, not by a gazetteer: this package holds no gazetteer or atlas source and SOURCES.md is another repo's,
so none is invented. Where an anchor states the nesting (the referents name "Port Royal, Jamaica" and "Nassau, New
Providence"), the relation holds as written. Where none does (New Providence in the Bahamas and every step above,
Kingston in Jamaica, Jamaica in the Greater Antilles, Barbados in the Lesser Antilles), the relation is kept and
the record's `notes` names it and says no anchor states it (the schema has no relation label, `src/schema.ts`,
`relations`; rule (d)). Such a relation carries no `date` and no source key it is not anchored to. A nesting
relation is never deleted only because no row states it: keep the evidence and say the doubt in `notes`. A dated
or political relation (New Providence `part_of` England from 1718) is not geographic nesting and follows rule (a).

"Validated" for a reference catalogue means: a value's source was re-checked by someone other than its writer (V4)
and, where a second independent source exists, the two agree within the interval stated. Disagreement is kept as two
attestations, never averaged (PLATFORM §4: competing explanations are kept).

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
| `.../science/SCIENTIFIC_EQUIPMENT.md` and `.../body/data/equipment.json` (314 rows: id, skill, 1650–1730 availability, mark) | technology records with presence attestations; "none (anomaly)" rows are **not** absence: they become `presence: unknown` for the window plus their invention attestation | 314 |
| `.../SOURCES.md` (keys `TWN-*`, `STL-*`, `EQ-*`) | source records | ~100 |
| `Toolchain/economy/RESEARCH.md` | observations (prices, wages per trade, money: the piece of eight), source keys `ECON-*` | ~30 |

How (proposed): a manifest `fixtures/pirate-town/manifest.json` lists each file, the table anchor (the
`<!-- table:... -->` markers where present, else heading plus column header), the column mapping and the sha256. A
Sonnet scaffolding unit writes the ingest tool; Composer units map table batches (10–20 rows each); Haiku units run
V4 on each batch. **Fiction rows are not universal facts:** the priest `istj-m`, the factions, the dying town's cash
and the time anomalies go under `scope: game:pirate-ship` with `original_fiction`, or are skipped (CAT-Q2). Rows the
pirate files mark **(open, Rex)** are ingested as open and never filled. The fixture stays under `fixtures/` until
its V4 audit passes; then its universal records are promoted to `data/` with `derived_from` kept.

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
