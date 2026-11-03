# Catalogue: PLAN (P4, Catalogue keeper, 2026-11-02)

**Approved by Rex as the working design (2026-11-02)**, with CAT-16 resolved through explicit date semantics. The
approval does not lift the STOP and does not settle Life's composition-resolution contract. Order: fix the failed-audit
gate first (stage A), then CP-1 and the M1a reference slice (stage B) once the stop is lifted. Draft in HQ per
[PLAN-SPEC.md](../PLAN-SPEC.md); not committed; lands in `Toolchain/catalogue/PLAN.md` by a composer copy unit once the
stop is lifted. Consolidates `Toolchain/catalogue/DESIGN.md` (cited `D§`), `DESIGN-V4.md` (`V4`), `NATIVE-PLAN.md`
(`NP`), `fixtures/pirate-town/{INGEST,PROMOTE}-PLAN.md`. Open items carry `CAT-` ids ([ISSUES.md](ISSUES.md)).

## Pass 1 (one page)

**What it is.** Versioned, sourced reference data plus a read-only query library. No run-time state, no mechanism reads
a date or presence to decide anything (tags, never unlocks, Rex). It contributes to the causal loop only as **t0 input**:
identities (`ref` ids), starting-conditions bundles, reference observations History scores against.

**Mechanisms present (built, file evidence):** record schema + checks `src/schema.ts`, `src/check.ts:24`; dates/calendars
`src/dates.ts`, `src/date-reader.ts:53`; region containment `src/regions.ts:65`; window query `src/window.ts:50`; labels
`src/label.ts:19`; held-out guard `src/benchmark.ts:16,106`; no-gate scan `src/nogate.ts:118`; compile + `catalogue_hash`
`src/build.ts:19`; drift `src/drift.ts:40`; coverage `src/coverage.ts:96`; pirate fixture ingest `scripts/ingest-equipment.ts`.
Data: 714 records (313 technology, 292 source, 44 practice, 22 institution, 18 region, 10 organism, 5 entity, 4 calendar,
1 material, 3 period); H1 England has 107 observations (`data/region/england.json`), 0 attestations.

**Mechanisms missing:** no `substance` records at all (no `data/substance/`); no `product` kind and no food records (bread, pottage, oatmeal,
ale); crops are 6 organisms with sown-area rows but **no presence attestations**; no tool records for field work (sickle,
scythe, flail, spade, plough: technology has mills and ovens from the pirate fixture only); no village-scale region or
bundle (N13); no period-unit masses (bushel, quarter; CAT-5); no record carries a `ref` from another engine (grep of
economy, realism, life, settlement, cognition: zero `catalogue/` refs). Reason-pointer and in-window-role check rule
(ruling (i)) designed, not built (5335 queued).

**Quantities owned:** `catalogue.record`, `catalogue.label`, `catalogue.window_bundle`, `catalogue.date` (registry rows,
written once by load-time `catalogue.reference.ingest`). All are reference data: invariants (ids never reused; every
value sourced or `open`), no conservation.

**External inputs:** source documents only; Kernel ids, units, and the snapshot slot for `catalogue_hash`.

**Outputs:** `ref` ids for Life (organisms, foods), Reality (materials, substances), Economy (goods), K&T (`catalogueRef`);
bundles for adapters and History's initialiser (N13); observations with `benchmark_role` for History's scorer (I1-I5).

**Contribution to M1a:** none at run time (correct by design). The M1a world is **England 1270, cereals as the food
(Rex, 2026-11-02, CAT-13)**. Before M1a the loop needs **identity**, so that Life's composition row, Economy's
`Good.food` and the M1a fixture name the same thing: **one preparation, a bread loaf**, as a `product` record (ruling
(j)) `made_of` cereal held as organisms (wheat, rye, barley, oats), with presence in England around 1270, sourced; and
measure-to-mass conversions as contextual rows. M1a runs on a labelled test-fixture household; the documented village
(N13) is History's, sourced in parallel. Composition values stay Life's (CAT-Q1, Rex): today they sit in
`realism/data/library/nutrition.json:43-65` marked `proposed`, source `open`. The Catalogue supplies the source records
those rows cite, never the value the mechanism reads.

**Flagged assumptions / risks:** (R1) **M1a/X1 place: resolved** (Rex, 2026-11-02, CAT-13): England 1270, cereals; History's village bundle moves
from cassava/plantain to England 1270; Life's LIFE-Q11 (cassava or plantain) is deferred to the Caribbean world.
(R2) **Confirmed defect:** 5334 AUDIT-H1-5d wrote `fail 5/25` but its gate only greps the result line's shape, so the
runner filed it in `done/` and 5335/5341 (which `Needs:` it) would run against unfixed rows (CAT-14).
(R3) Prepared foods fit neither `substance` nor `material`; ruling (j) adds a `product` kind and a `made_by` relation
(code unit before the records).

**Lane state (belt stopped, nothing queued by this plan):** failed 5334 sits in `done/`; queued 5335 (codex, check rule,
Needs 5334), 5336 (sonnet, Done lines, Needs 5335), 5341 (sonnet, pop-1250 ruling, Needs 5334). Planned, **not queued**:
X6-FIX-5e (composer, the five quoted fixes plus obs 104 extent) → X6 AUDIT-H1-5e (haiku, gate fails on `fail`), then
5335 and 5341 re-pointed to 5e (§8 stage A).

**Next dependency-ready task (approved 2026-11-02; waits for STOP to lift):** stage A (close the H1 audit chain); stage B, the M1a
cereal slice (§8), can be sourced in parallel since it writes other records.

---

# Pass 2: the full plan

## 1. Purpose and boundaries

**Determines:** what the historical and scientific record says about a thing: its stable id, names, classification,
provenance class, dated and placed attestations (origin, presence, adoption, absence, spread), and documented
observations with source, label and confidence, including which observations are benchmark rows (D§0, D§1.1; PLATFORM
§6, Rex).

**Receives:** source documents (sonnet sourcing units read them into sheets; composer units write the records) and
fixture files left where they are (D§6). From the Kernel: `qualify()` ids, unit dimensions, and the snapshot slot for
`catalogue_hash`. Nothing from any other engine, ever (D§2.4).

**Never calculates** (D§0 fence; CAT-Q1, Q5, Q6, Rex): physical or chemical property values that a mechanism reads
(Reality); organism biology and the food composition values a body reads (Life); goods, recipes, prices and stocks
(Economy); whether a society can make or knows a technology (K&T, KNT-K1); beliefs (Cognition); what happened in a run
(History); geometry and terrain (Reality); the clock (Kernel). It holds no run-time state and writes nothing during a run.

**The rule that keeps it off the causal loop:** a mechanism may read `CatalogueReader.label` and nothing else. `window`
and `get` are configuration-time calls (adapters, scenario builders, History's initialiser and scorer), and V2 checks
this. A bundle grants nothing: each seed enters the world once, through the owning engine's own load command, labelled.

**What a record is not (Rex's review, 2026-11-02).** Catalogue references classify and document objects; they are not
the set of objects allowed to exist. A known route in the Catalogue never means it is the only route, and no record never
means impossible. Three states stay distinct: physically impossible under the model (Reality); physically possible but
unavailable or unknown to these people (Economy, Cognition, Knowledge); unsupported because the simulator lacks the
mechanism (reported as `unsupported`, never as failure or fictional success). A historical date can help build a starting
scenario; it never becomes "cannot invent before year X".

**Future invention contract (adopted from the review; not M1a work).** Runtime objects and assemblies may exist without
Catalogue entries or shared names. Their physical state is owned by the relevant physical engine (Reality; Life for
biological state), their holdings by Economy, and their names and interpretations by Cognition. The identity is one
stable shared id from the existing id mechanism, issued by the engine whose event creates the object, with one
authoritative writer per state field. Properties must come from supported data or derivations; missing properties stay
unknown and are never invented to make an experiment succeed. Communication may establish a shared referent through
observation or demonstration, so an unnamed object or method can still spread. Unsupported mechanisms remain explicit
limitations. A Catalogue classification of such an object may come later, and names may be absent, several or disputed.
Invention is bounded by Cognition's generation, Knowledge's new-method representation and Reality's mechanism coverage;
none of those is the Catalogue's. A good needs a Catalogue `ref` only where an engine's contract requires a shared
identity (M1a's bread, EN-1); no object needs one to exist.

## 2. State

All state is versioned files in `Toolchain/catalogue/data/` (one record per file, D§2.3), compiled to
`dist/catalogue.json`. Every quantity is reference data, so it has **invariants and update rules, not conservation
equations** (PLAN-SPEC §3).

| Quantity | Unit / type | Valid range | Meaning | Invariant / update rule |
|---|---|---|---|---|
| record `id` | `catalogue/<kind>.<slug>` | `[a-z0-9-]`, one dot after the kind | identity of a thing | never reused or renamed; a merge leaves an alias (`data/aliases.json`); aliases acyclic |
| `kind` | enum, 13 values (`src/schema.ts`) | closed set | which tree the thing sits in | a new kind only by keeper ruling plus a code unit |
| `provenance` | set ⊆ {real, prehistoric, mythological, fantasy, science_fiction, original_fiction} | non-empty | the thing's status in the record | a `game:` record is never `real` without a universal twin (D§1.2) |
| attestation | `{what, place, date, source, label, confidence}` | `what` one of 9 values; `label` researched / estimate / fiction / open | a dated, placed statement | cites at least one source; `absence` needs a source that says the thing was not there |
| observation | `{quantity, value, unit, place, date, source, label, confidence, benchmark_role?}` | `value` is a number, or `null` with `label: open` | a documented measurement | sourced or open, never filled (NP (c)); inside a benchmark window it carries that window's role (NP (i)) |
| date interval | `{from, to, precision, circa, calendar_of_source, year_start_of_source}` on the proleptic astronomical axis | `from ≤ to`; `from: null` is an open start (NP (f)) | when | one precision, the coarsest bound's (NP (g)); source → stored → source is the identity |
| region containment | dated `part_of` edges | acyclic at every date | where | a place sits in two parents at once only when a record says so |
| `catalogue_hash` | sha256, 64 hex | — | content identity for replay | recomputed by `npm run build`; the host writes it into the Kernel snapshot |

## 3. Mechanisms (each as a calculation chain)

Registry rows (domain `infra`; planned, then built as §6 shows): `catalogue.record.schema`,
`catalogue.provenance.classify`, `catalogue.date.normalise`, `catalogue.region.membership`, `catalogue.query.window`,
`catalogue.ingest.fixture`, `catalogue.reference.ingest` (D§1, D§2.2, D§5). The registry was searched on 2026-10-31 and no
other engine owns any of them. Every chain ends **outside the run**: its output changes a file, a bundle or a label,
never a simulated quantity.

| Mechanism | Input from | Computes | Output changes | Where it applies, where it stops |
|---|---|---|---|---|
| record.schema (`src/schema.ts`, `src/check.ts:24`) | a sourced sheet row (sonnet), written by a composer unit | validity: it parses; sources, places and aliases resolve; held-out and role rules hold; the reason-pointer rule once 5335 lands | whether the commit passes its gate | every record. It does not judge truth; V4 does |
| provenance.classify (the D§1.2 table) | the record's evidence | its class set | the default window filter (CAT-Q3) | applied by writers and sampled by haiku audits; no code beyond the scope checks |
| date.normalise (`src/dates.ts`, `src/date-reader.ts:53`) | a date as printed, plus its place | Julian Day Number round trip; the 10- and 11-day offsets; the 25 March year start before 1752 | the stored interval; a Gregorian label with a flag | level 1 (exact). It stops where a place's calendar is unknown: stored as `calendar_of_source: unknown`, not converted |
| region.membership (`src/regions.ts:65`) | dated `part_of` edges | the descendants of a region during an interval | which places a window query includes | no geometry (CAT-Q5); a cycle fails the check |
| query.window (`src/window.ts:50`) | `{region, from, to, kinds, provenance, scope}` | records whose presence or adoption attestations, or observations, overlap in place and time; `known_elsewhere`; coverage per kind | the starting-conditions bundle handed to the initialiser | configuration time only. Held-out rows are withheld unless the harness path asks for them (`src/benchmark.ts:106`) |
| ingest.fixture (`scripts/ingest-equipment.ts`, `src/drift.ts:40`) | a manifest row: file, anchor, mapping, sha256 | records with `derived_from` | `fixtures/*/records`, then `data/` on promotion | classifier rulings go in the script's per-row list, never in hand edits (D§1.6); drift (V6) lists what to re-ingest |
| reference.ingest (`src/build.ts:19`) | `data/` | the compiled index and `catalogue_hash` | `dist/catalogue.json`; the hash a run records | once, before a run; the only writer of the four catalogue quantities |

**Keeper ruling (j), revised after Rex's review (2026-11-02): prepared foods are `product` records, not `substance`.**
The schema's `substance` is a chemical species classified by CAS/IUPAC (D§1.1), and `material` is matter used to make
things; neither describes a mixture made by a practice. Grain as stored, meal, bread, pottage and ale are mixtures or
prepared products. So:
- A new kind `product` (a code unit adds it to `src/schema.ts:1` and the check, per §2 "a new kind only by keeper ruling
  plus a code unit"). A product is a made thing **in one stated condition**: `{scheme: catalogue, path: [product, food,
  <class>]}`, and a `condition` note naming its state (e.g. "threshed grain, dried for storage"; "loaf, day of baking").
  The same food in two conditions is two records, linked `variant_of`.
- **Composition and preparation explicit:** `made_of` to each ingredient record (organism part, product or substance),
  with sourced proportions as observations where a recipe or account gives them (else `open`); a new relation `made_by`
  to the `practice` record of its preparation (baking, boiling pottage, malting and brewing), also a code unit.
- **Water consistency:** the Catalogue may cite a sourced water or dry-matter share for the stated condition as a
  reference observation (CAT-Q1 allows it; no mechanism reads it). Life's composition row that carries the product's
  `ref` must describe the same condition, and Life's validation compares its water value with the cited observation
  within the source's stated uncertainty; a mismatch is Life's to resolve, never silently averaged.
- Chemical species inside foods (water, starch, ethanol) stay `substance`; the living plant stays `organism`.

**Ruling (k), the use record (approved, Rex, 2026-11-02, CAT-15).** Every reference row records how each mechanism has
used it, so a fit is never also counted as its own independent check (PLAN-SPEC §7).
- **Field** `uses: [{mechanism, model_version, role, unit}]` on observations: `mechanism` a registry id, `model_version`
  the mechanism's tagged release or commit, `unit` the belt unit that used it, `role` one of `calibration` (parameter
  estimation), `selection` (model selection or tuning), `validation` (independent check), `context` (read for context
  only). A composer unit writes the entry when the using unit is queued; the using unit's gate checks it is there.
- **Lineage:** `lineage: <underlying observation key>` on every row drawn from the same underlying observation (a copy, a
  secondary source reporting a primary, a converted or derived value). Rows sharing a lineage are **one** piece of
  evidence: a validation that counts independent rows counts lineages, not rows. Different lineages are not
  automatically independent: rows that share an experiment, population or reconstruction carry a `shared: [<group>]`
  key, and a validation report lists those groups rather than counting them as separate evidence.
- **Check rule:** a `validation` use fails if any row of the same lineage carries `calibration` or `selection` for the
  same mechanism (any model version). A row fitted by a mechanism may still be used to check that the implementation
  reproduces its own fit (`role: context`, named as an implementation-consistency check); it never counts as independent
  validation of that model.
- Needs a schema field and the check rule (codex) and the registry's cross-engine convention (INTEGRATION-PLAN).

**Keeper ruling (l), proposed after Rex's review (2026-11-02): relations say what they mean.** The schema has one
generic edge, `documented_prerequisite` (`src/schema.ts:34`), and no data row uses it (searched 2026-11-02). It is
replaced (code unit, codex) by edges whose meaning is fixed, each with its sources: `documented_use` (a documented
example uses this material or part), `alternative_of` (another implementation of the same method), `assumes_knowledge`
(a teaching account assumes this prior knowledge), `associated_with` (a source reports a historical association), and
`process_ref` (points at the executing engine's own process description, by its id). None is a prerequisite and no
mechanism reads any of them (V2). Operational requirements live with the engine that executes the process; the
Catalogue never keeps a second, editable recipe graph.

**Dates: what an overlap proves.** Intervals are closed and inclusive (`src/regions.ts:9,23`: overlap iff
max(a,c) <= min(b,d)); a partial endpoint covers its whole year or month; a null bound is open (-inf or +inf,
`src/regions.ts:18`). An attestation in a window is evidence at its date, not presence throughout the window, and the
earliest surviving evidence is not the invention date. The open null bound needs a decision before stage B's code: an
unknown end currently overlaps every later window, so a 1200 presence with no end reads as present in 1900.
**CAT-16, resolved by explicit date semantics (Rex, 2026-11-02).** A missing end is not collapsed into a single-date
observation. Four cases stay distinct in the record: (1) presence observed on a date; (2) presence documented across an
interval; (3) an uncertain endpoint, stored as uncertain (its bounds or `unknown`), never as open; (4) an explicitly
open-ended interval, only where the record declares it and states its semantics. A window query returns the evidence and
its uncertainty, and separates confirmed overlap from possible overlap; it never turns possible overlap into confirmed
presence. The schema field and query change are a codex unit in stage B, before any bundle reads dates.

**Missing mechanism (designed, not built): a cross-engine `ref` resolver.** V1 says every `ref` in another engine's data
resolves, but `src/check.ts:72-91` resolves only references inside the Catalogue. Stage B adds `scripts/check-refs.ts`
(codex): scan each `Toolchain/<engine>/data` for `catalogue/` strings, resolve them through aliases, and fail on unknown
ids or on universal data that points at a game-scoped record.

## 4. Inputs and outputs

| Quantity | Producer → consumer | Unit / form | Timing | Failure and rollback |
|---|---|---|---|---|
| source documents | the web, or purchases by Rex → sourcing sheets | text, tables | per sheet unit | a work not opened stays "not yet searched" (NP (c)); Rex buys what cannot be fetched (asked through the controller) |
| ids, units | Kernel → Catalogue | `qualify()`, dimensions | build time | pinned to a Kernel tag (v0.1.1, 5205); upgraded only in paired units |
| `catalogue.record` (`get`) | Catalogue → adapters, initialiser, scorer | record JSON | configuration | an unknown id throws; aliases are resolved |
| `catalogue.label` | Catalogue → any mechanism | string | any time, read-only | a missing name falls back to the preferred name; never changes state |
| `catalogue.window_bundle` | Catalogue → History's initialiser (N13), game adapters | bundle `{present, knownElsewhere, coverage}` | once, at t0 | an empty kind is reported in coverage and never filled; the initialiser refuses a seed whose owner has no load command |
| `catalogue.date` | Catalogue → History's labels, adapters | stored interval or label | configuration, reports | an unknown calendar gives `unknown`, with no shift |
| `ref` ids | Catalogue → Life (organisms, foods), Reality (materials, substances), Economy (goods), K&T (`catalogueRef`) | a qualified id string held in **their** data | build time | stage B's `check-refs` fails a dangling ref; the owning engine's unit fixes its own data |
| observations with `benchmark_role` | Catalogue → History's scorer (I1-I5), calibration units | value, unit, label | evaluation | held-out rows are read only through `HARNESS_PATHS` (V5); calibration rule (k) |
| `catalogue_hash` | Catalogue build → host → Kernel snapshot | 64 hex | per run | a mismatched hash means the replay used different content, and the replay check reports it. The hash proves identity, not correctness; and it cannot see an owning engine's data (an edited Life composition table), so replay also needs each owner's model and data versions in the run header |
| period-unit masses (CAT-5) | Catalogue → History I4 (kg per bushel); Economy (its own field, sourced from these) | observation `unit.mass-of`, kg | configuration | a unit with no sourced mass stays `open`, and I4 reports it unscored |
| England 1270 weather series (NP-3) | Catalogue → Reality's weather-input adapter | `climate.*` observations in Reality's port units | configuration (from M3) | gaps stay `open`; interpolation is Reality's step, labelled |

**Transfers:** the Catalogue moves no physical quantity, money or count. A seed from a bundle creates a stock once,
through the owner's load command (Economy credits the inventory, Life creates the body, Settlement the household). The
Catalogue debits nothing and is never a second ledger (PLATFORM §7a).

## 5. Evidence

| Item | Source | Label |
|---|---|---|
| Julian ↔ Gregorian, JDN | Dershowitz & Reingold, *Calendrical Calculations*; Calendar (New Style) Act 1750 | measured (level 1) |
| England's 25 March year start before 1752 | the 1750 Act; SHEET S8 (a `CAT-` source for Julian reckoning in England) | measured; **S8 still open** |
| schema, provenance classes, window semantics | D§1 (keeper design, approved by Rex 2026-10-31) | assumption (level 4: a model of a reference catalogue) |
| benchmark windows H1-H5 (`src/benchmark.ts:16`) | ROADMAP P11a; the History keeper (agreed 2026-10-31) | assumption (the choice of societies, Rex, CAT-Q4) |
| H1 rows (107 observations) | CAT-BCKOVL-2010 (Broadberry, Campbell, Klein, Overton, van Leeuwen); Clark's wage series; Wikipedia's demography and plague pages, cited through (NP (a)) | researched; high, medium or low per row, with reasons |
| pirate fixture (663 records) | the pirate town files, `SOURCES.md` keys TWN / STL / EQ, Economy's RESEARCH.md | researched or estimate per row; fiction rows game-scoped (CAT-Q2) |
| food composition sources (stage B) | to be read: McCance & Widdowson and USDA FoodData Central for modern equivalents; period recipe or ration sources for what was eaten | none yet. Each enters as a source record that Life cites; the values stay Life's |

## 6. Status (per mechanism: designed · implemented · connected · numerically checked · empirically validated)

| Mechanism | Des. | Impl. | Conn. | Num. | Emp. | Evidence / gap |
|---|---|---|---|---|---|---|
| record.schema + V1 | yes | yes | n/a | yes | n/a | `test/check.test.ts`, `test/schema.test.ts`; rule (i) for reason pointers not built (5335) |
| cross-engine ref check | yes | no | no | no | n/a | §3, missing mechanism |
| provenance.classify | yes | partly (the scope check) | n/a | sampled in V4 audits | n/a | — |
| date.normalise | yes | yes | yes (label, date reader) | yes (the 1752 gap test, `test/date-reader.test.ts:104`) | no | V3 not yet run against an external published table; S8 open |
| region.membership | yes | yes | yes (window) | yes (`test/regions.test.ts`) | n/a | no village-scale regions |
| query.window | yes | yes | **no** (no initialiser calls it yet) | yes (`test/window.test.ts`, the demo) | no | N13 needs a village bundle |
| ingest.fixture + V6 | yes | yes | n/a | yes (`test/drift.test.ts`) | V4 audits passed (the AUDIT-9 chain) | — |
| reference.ingest + hash | yes | yes | partly (Kernel snapshot field from 2805; no host writes it yet) | yes (`test/build.test.ts`) | n/a | — |
| V2 no-gate, static | yes | yes (`src/nogate.ts:118`) | yes | yes | n/a | — |
| V2 dynamic (dates shifted +500 years, state byte-identical) | yes | no | no | no | n/a | needs a running Kernel harness with a catalogue-seeded t0 |
| V5 held-out guard | yes | yes (`src/benchmark.ts:106`) | yes | yes | n/a | `HARNESS_PATHS` stays empty until History's harness exists |
| V7 coverage | yes | yes (`src/coverage.ts:96`) | n/a | yes | n/a | — |
| use record (k) | yes (Rex, 2026-11-02) | no | no | no | n/a | CAT-15 |

## 7. Validation

| Test | Must reproduce | Tolerance |
|---|---|---|
| V1 | every record parses; every source, place, alias and ref resolves | zero failures |
| V2a | no `kernel.json` port or import lets a mechanism read `window`, `get` or a date field | zero hits |
| V2b | load and freeze the initial state first; then shift every Catalogue date +500 years and run thirty days from the frozen state (shifting before selecting the bundle would legitimately change the seeds and confound the test) | byte-identical engine state |
| V3 | 1752: Wednesday 2 September (Julian) followed by Thursday 14 September (Gregorian); the JDNs of *Calendrical Calculations*' worked examples; "10 January 1691" in England is 1692 by the January year | zero days, zero years |
| V4 | a haiku unit that wrote neither the rows nor the fix re-opens a 10 % sample (every row if there are 60 or fewer) and confirms value, label, citation and a reason that points nowhere | every sampled row passes; any fail gets a fix unit, then a re-audit of the fixed rows plus a fresh sample |
| V5 | no tuning unit's Read list or code opens held-out rows | zero hits; the harness only |
| V6 | every `derived_from` sha256 matches its file | zero drift, or the drift list is re-ingested |
| V7 | coverage printed per window and kind | a report, never a pass mark |
| milestone coverage | for a milestone's declared required set S: C = #{items in S with resolved, applicable data} / abs(S), printed with the missing items and unresolved parameters, and split three ways: identity, evidence, operational model available (a sourced description is not implemented physics) | a report; S is declared before the count |
| sources disagree (CA-2) | two sources giving different values stay two rows, each with its citation; nothing is averaged or overwritten | zero merged rows |
| ids (CA-1) | `resolve(id)` gives one canonical record or an explicit error; aliases terminate, are acyclic (`src/check.ts:32`) and never reuse an old id for a different thing | zero failures |
| dates (CA-3) | an attestation inside a window is not reported as presence throughout it; an uncertain bound is returned with its uncertainty and as possible, not confirmed, overlap; an open-ended interval only where declared (CAT-16) | zero |
| bundle (N13) | the village bundle round-trips through the initialiser: every seed the owner loaded carries its Catalogue label and source; seeds loaded = bundle rows used, and every unused row is reported with its reason | exact |
| use record (k) | a `validation` use of a row whose lineage carries `calibration` or `selection` for the same mechanism fails the check; lineages, not rows, count as independent evidence | zero |

The Catalogue validates **its account of the record**, not the world. Whether the simulation matches history is
History's test, scored against these rows.

## 8. Build order (keyed to the PLAN-SPEC §4 milestones)

Nothing below is queued. Once Rex approves and the controller lifts STOP, the keeper drafts each stage from this plan,
routes it per PRODUCTION §2 and numbers it with `next_number.py`; every gate asserts on the rows the unit changes
(CAT-12).

**Lanes and checkpoints (Rex's review, 2026-11-02), mapped onto the stages.** CA-1 identity and references (check-refs,
`cat.permits`, alias rules: stage B steps 4-5); CA-2 sources and claims (NP (a)-(i), §7 "sources disagree"); CA-3 time
and place (§3 dates, CAT-16); CA-4 products and variants (ruling (j), stage B); CA-5 contextual conversions (stage B
(d)); CA-6 technology and practice descriptions (ruling (l); stages D and F); CA-7 bundles and coverage (bundle N13,
milestone coverage); CA-8 evidence independence (ruling (k)); CA-9 versioning, replay and audit gates (stage A,
`catalogue_hash`). Checkpoints: **CP-1 trustworthy references** = stage A plus check-refs, `cat.permits` and the snapshot;
**CP-2 the M1a bread slice** = stage B; CP-3 work and material references = stage D; CP-4 historical bundles and
validation = stages E-G and H; CP-5 broader technology coverage, added only as physical mechanisms arrive, with
unsupported cases kept explicit. Start with CA-9 (no dependency may rest on a source until a failed audit can no longer
satisfy one), then CA-1, CA-2, CA-4 and the CA-5 rows M1a needs. Nothing stone-to-computers is populated before the
bread slice is tested.

**Stage A: close the H1 audit chain (first; CAT-14).**
1. Keeper, by hand, when STOP lifts: move 5334 from `done/` to `failed/` (its verdict is `fail 5/25`).
2. X6-FIX-5e (composer): AUDIT-H1-5d's five quoted fixes, word for word. Obs 25 and obs 29 get the F2 text. Obs 9 drops
   "It differs from S1 (4.40 M, 1270/79 average), hence its own row". Obs 38 gets the sown-row grounds (the writer checks
   WP 21 Table 1 first). Obs 92 drops everything from "; authors differ" to the end. Also remark 2: obs 104 states how
   much of CAT-WIKI-TAXUK was read. Gate: each of obs 9, 25, 29, 38, 92 and 104 is asserted by position on its new
   text; `CHECK` passes; `git diff` touches only `data/region/england.json`.
3. X6 AUDIT-H1-5e (haiku): the six rows plus a fresh 10-row sample of rows that neither 5331-5333 nor the fix touched.
   Gate: `grep -qE 'AUDIT-H1-5e pass [0-9]+/[0-9]+'`, so a `fail` verdict fails the unit and it lands in `failed/`.
4. Re-point the `Needs:` of 5335 and 5341 to the 5e audit; 5336 stays behind 5335. 5335's step 4 should then find no
   pointer rows.
Unlocks: clean H1 rows for History's development scoring. No milestone yet.

**Stage B: M1a cereal slice, England 1270 (Rex, 2026-11-02, CAT-13).** Built from the H1 England data; the M1a world
and History's X1 village are the same place and window, and that world carries forward through the later milestones
unless Rex says otherwise (REG-38; INTEGRATION-PLAN §2b, M1a-02). Every row is sourced or `open` (NP (a)-(i)); nothing
is filled.
1. **Sourcing sheet B1** (sonnet, `native/h1-england/SHEET-M1A.md`):
   - (a) presence of the four cereals in England by 1270 (wheat, rye, barley, oats; maslin and dredge as the mixed sowings
     BCKOvL Table 1 prints) as attestations on the existing organism records, which today carry sown-area and yield
     rows but no attestation;
   - (b) **the M1a food: one edible preparation, a bread loaf** (proposed; Rex's review asked for one preparation). Bread
     is ready to eat, so M1a needs no milling, preparation or cooking mechanism, and Life already has a fresh-bread
     composition row (`realism/data/library/nutrition.json:51`) to reconcile with. The sheet names which bread (wheaten,
     maslin or barley) sources attest as household bread in England around 1270, its condition, its ingredients and its
     preparation; if no source settles the grain, the sheet says so and the choice comes back to the keeper. Pottage is
     the second preparation; grain, meal, malt and ale follow when a milling or brewing milestone needs them;
   - (c) composition sources Life can cite per form (McCance & Widdowson; USDA FoodData Central for the modern
     equivalents; any source on medieval grain or bread composition), written as `source` records with what each gives.
     No composition value goes into a Catalogue record as the value a mechanism reads (CAT-Q1);
   - (d) **measure-to-mass conversions as contextual data** (CAT-5; this also answers Government's GOV-26): each
     conversion is one observation carrying the source's place, period, the measure's definition (which bushel, struck
     or heaped), the grain, and its condition (dressed or not, moisture where stated). No universal weight per cereal is
     written; two sources give two rows. Engines compute in kilograms and keep the original measure and the conversion
     row's id with any converted value. A combination no source gives stays `open` with what was searched.
     Each row is marked `conversion: exact` (definitional, e.g. a statute fixing gallons to the bushel) or `empirical`
     (a measured weight). Uncertainty stays as the source gives it: a range stays a range, and no distribution is
     invented. A converted value keeps its original value and unit, the conversion row's id and version, the material,
     preparation, place and period it applies to, and any assumption used to bridge missing context. The owning
     engine's loader performs the conversion; the Catalogue keeps the evidence;
   - (e) **the village (N13), not on M1a's path.** A documented village is needed for History's settlement
     demonstration (X1), not for M1a's first eating test. Sourcing runs in parallel: a village or manor of the 1270s
     chosen by three tests, each with its source (households or tenants counted in a survey of the window, such as the
     1279-80 Hundred Rolls, an extent or a custumal; holdings and tenures given; arable or crops named). If no village
     meets all three, the sheet says which tests failed for each candidate and the choice comes back to the keeper.
     **M1a uses a labelled test fixture instead:** one household, under `fixtures/m1a-household/`, every value
     `label: fiction` with the note "test fixture: establishes the mechanism, not reconstructed historical evidence",
     never promoted to `data/` and never read by History's scorer.
2. **Records B2** (composer, 10-20 rows per unit, split as needed), after the code unit for `product` and `made_by`:
   attestations on `organism.triticum-aestivum`, `secale-cereale`, `hordeum-vulgare`, `avena-sativa`; the bread
   `product` record (ruling (j)) with its ingredients, practice, condition and any sourced water share; the `practice`
   record for baking; `source` records; the conversion observations of (d). The village records follow when (e) passes,
   as their own unit.
3. **Audit B3** (haiku, AUDIT-M1A, gate requires `pass`), fix and re-audit as in stage A.
4. **`scripts/check-refs.ts`** (codex) and its tests. It is static and runs at build time, with no scenario loaded.
   It fails on (a) a dangling `catalogue/` id in another engine's data, and (b0) universal-scope data that refers to a
   `game:` record (D§1.2). **Plus `cat.permits(ref, {provenance, scope})`** (codex), called by an engine's loader at
   scenario or test load: true only if the record's provenance classes and scope are within what the scenario
   declares. The default is the window filter: real, prehistoric and mythological, with universal scope (CAT-Q3, Rex).
   Definitions, sent to Economy for EN-1 on 2026-11-02:
   - Record provenance is a required, non-empty PLATFORM §6 set, so a resolved ref never has missing provenance.
   - Scope is `universal` or `game:<plugin>`.
   - A value labelled `open` is missing, never fiction and never game-only.
5. **Integration, other lanes (their units; listed for the registry keeper's `INTEGRATION-PLAN.md`):**
   - Life: its composition rows for the cereal foods carry `ref: catalogue/product.<form>` and cite the B2 source
     records; Life owns and writes the values.
   - Economy (EN-1, Economy PLAN §10 item 8; **agreed as amended, 2026-11-02**): a good stores exactly one food
     reference, `ref: catalogue/product.<slug>`. `foodOf(good)` is Life's composition row found by that same ref,
     resolved at load and re-checked on replay, so `Good.food` becomes read-only and derived. A declared food whose
     ref resolves to no Life row, or to more than one, fails configuration before the run (Economy EN-1 item 5):
     missing composition is a configuration or unsupported-model condition, never evidence that the object is inedible,
     and never an in-world `impossible`. The Catalogue record does **not** hold a Life id: one key,
     pointing one way. Exactly one Life row per product ref, under Life's own resolution rule: the ref
     already names one condition, and the row's Life data version goes in the run header (**pending Life**; Economy
     raises it in EN-5); `check-refs` fails dangling refs. Two preparations are two product records and two goods; batches are
     Economy's run-time stocks. Until the product record, check-refs and Life's ref exist, `Good.food` stays Economy's
     only editable field. Economy owns the good, its unit and its mass field (it may cite the B2 conversion rows).
   - History: the initialiser takes `window({region: <village>, 1270-1279})` **and** `window({region: england, ...})`;
     the window query returns a region's descendants, not its ancestors, so England-level rows (yields per acre, sown
     shares, prices) reach the village only if the initialiser asks for both and labels which level each seed came from.
     **Scaling a national rate to a village is a modelling assumption:** the engine that owns the quantity (Life for
     yields, Economy for prices, Settlement for households) specifies or approves the rule; History applies it as a
     declared initialisation rule and records its provenance in the run header. The Catalogue never scales.
   - M1a itself: Economy loads the fixture household's bread through its own load command, citing the product `ref`.
Unlocks the M1a target: one food preparation, one household, one correctly accounted eating event and its bodily
consequences, every id naming the same loaf in the inventory and in the body. The documented village unlocks X1 later.

**Stage C: M1b locomotion.** The Catalogue supplies nothing a walking model reads. Optionally, identities for carried
containers (sack, basket) if Economy's goods need them. No unit unless asked.

**Stage D: M2 work.** Sheet, records and audit for the field tools of the place and window (sickle, scythe, flail,
spade, hoe, the plough and its team, the quern), with presence attestations and `made_of` material records (iron, oak,
ash), so Reality's mechanics tables can key force and mass by `ref` (CAT-Q1: the numbers stay Reality's). The wage and
hours observations already in H1 (Clark) serve History, not the fatigue model.

**Stage E: M3 growth.** Presence attestations for the cereals come in stage B; pulses and any other crops come here.
Yields stay benchmark rows (bushels per acre, gross of tithes and net of seed; SHEET-2 T9-T13), converted with the
bushel mass from stage B; ruling (k) records which yields Life calibrates on and which it is checked against.
**Weather series (NP-3, controller, 2026-11-02; INTEGRATION-PLAN M3-01):** Reality owns the weather-input port schema;
the Catalogue supplies the sourced England 1270 weather series that fills it. Steps:
1. A sourcing sheet E1 (sonnet) for England around 1270: temperature, precipitation and growing-season indicators.
   Candidate works are documentary and proxy reconstructions (manorial-account harvest and weather notes, tree-ring
   and other proxy series); each is listed with its resolution (annual, seasonal), its region and its uncertainty.
2. Records (composer) as dated `climate.*` observations on `region.england` (or a finer region where the source is
   finer), each with `benchmark_role: development`, in Reality's port units once its schema is agreed.
3. An audit (haiku).
Gaps stay `open` with what was searched (T31 is open today); nothing is interpolated by the Catalogue. Reality's adapter
reads the series at configuration time through `window`/`get`, never during a run (V2), and any interpolation or
downscaling is Reality's step, declared and labelled. Needs: Reality's port schema (units, time step) before step 2.

**Stage F: M4 recycling.** Practice records with attestations: fallowing, sheep folding, manuring and marling in
England, or the chosen place's equivalents. Decomposition and the return to soil belong to Life and Reality; the
Catalogue only names the practices.

**Stage G: M5 social organisation.** The existing institution records (manor, parish, exchequer, hundred rolls,
parliament) gain village-scale attestations; money and market records (penny, shilling, fair, borough market) are added
with sources. The N13 village itself moves to stage B (M1a); here it gains its institutions (manor, parish, court) where sources
attest them.

**Stage H: benchmark seeds (X7-X20, order superseded).** DESIGN §3's X7-X19 (H2 Japan, H5 Iceland, H3 Greenland, H4
Copán) wait until after stage G: they serve civilisation-scale validation (PLATFORM §5), which needs M5 first. Their
rules (NP (h), V5) are unchanged. The X20 sign-off stays the keeper's.

**Superseded or carried.** Superseded: the order of DESIGN §3's X-table (moved behind the milestones, above) and
`mkunits.py` (retired; units are written by hand). Everything else in DESIGN.md, DESIGN-V4.md, NATIVE-PLAN.md and the
fixture plans is carried by reference above and still holds.

**Open, to Rex through the controller:** S8 (a Julian source; sourcing work only). Proposed: ruling (l). Answered by Rex 2026-11-02: plan
approved as the working design; CAT-16 (explicit date semantics). Answered by Rex 2026-11-02: CAT-13
(England 1270, cereals), CAT-15 (the use record, ruling (k)), and the review's four refinements (one preparation, the
`product` kind, contextual conversions, the test-fixture household). This plan invents no rules or constants.
