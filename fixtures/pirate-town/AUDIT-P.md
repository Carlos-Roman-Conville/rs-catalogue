# AUDIT-P: V4 audit of the promoted set (unit 5133, P4 of PROMOTE-PLAN)

Audited 2026-11-01 by a session that did not write the 663 rows or the P3 move. No record was edited.

## Check 1: P3 commit (85470b6)

| Test | Expected | Found | Result |
|---|---|---|---|
| `R100` renames under `data/` | 663 | 663 | pass |
| Other changes under `data/` | only `data/sources/.gitkeep` deleted | one `D`: `data/sources/.gitkeep` | pass |
| Other files in the commit | ingest script, its test, DESIGN.md | `M` on those three; nothing else | pass |

## Check 2: stratified sample (70 of 663)

Sample: 5133 did not log the sampled ids, so this re-audit (5161) re-derived them: the middle record of each equal
slice of the sorted kind directory (slice i of k covers indexes floor(i*n/k) to floor((i+1)*n/k)-1), with 5133's
per-kind counts: culture 1, entity 1, institution 1, material 1, period 1, phenomenon 1, practice 4, region 2,
source 27, technology 31. These ids may differ from the ones 5133 drew; the counts do not. By hand (the 70 records
listed under Check 2 detail): every `derived_from` anchor row was opened and read against the record's values, labels,
dates, places and notes under DESIGN-V4 rules (a) to (c) and exceptions (a) to (l). By script: only the first pass
(file opens, anchor row located, source key and source title/URL found in the row text, years found in the row).
The summary table below is that first pass; the detail table is the hand pass.

| Kind | Sampled | Anchors opened | Anchor row found | Source keys named by anchors | Result |
|---|---|---|---|---|---|
| culture | 1 | 2/2 | 2/2 | yes | pass 1/1 |
| entity | 1 | 2/2 | 2/2 | yes | pass 1/1 |
| institution | 1 | 1/1 | 1/1 | yes | pass 1/1 |
| material | 1 | 1/1 | 1/1 | yes | pass 1/1 |
| period | 1 | 2/2 | 2/2 | yes | pass 1/1 |
| phenomenon | 1 | 6/6 | 6/6 | yes | pass 1/1 |
| practice | 4 | all | all | yes | pass 4/4 |
| region | 2 | all | all | yes | pass 2/2 |
| source | 27 | 27/27 | 27/27 | key in its own row 27/27 | pass 27/27 |
| technology | 31 | 62/62 | 62/62 | yes | pass 31/31 |

Findings that are not failures:

- 19 technology records carry the 1650–1730 presence window. The mechanical year check did not find 1650 or 1730 in
  the anchored row text, because the window is the column header of the SCIENTIFIC_EQUIPMENT.md §2 catalogue table
  ("1650 to 1730 availability"), which is the row's own section (rule (a)); INGEST-PLAN attestation 1 labels it
  `estimate`. Held.
- Spot checks of values: `practice.bricklaying` 5–6 (ECON-THO row: "5s–6s a day ... Pennsylvania, 1698",
  `researched`); `culture.port-royal-jewish-community` 1711 office bar (CULTURE.md "Minorities present", TWN-JEW),
  `estimate` on the 1711 date as a second attestation; `practice.daily-markets` 1682–1692 `estimate` with the
  referents paragraph as second anchor (exception (d)); `region.new-providence` carries no political `part_of`
  (exception (b)); `period.port-royal-before-1692` writes no 1670 start (rule (a)); the corn-price table carries
  five observations, each with its own `1/10`–`5/10` row anchor.
- Exceptions (e), (f) and (l) concern records in AUDIT-9, AUDIT-E3 and AUDIT-C4-2; none of the 70 sampled is one of
  them, and no sampled note carries context outside its anchors.

## Check 2 detail

One row per sampled record. Anchors opened and found are all `n/n`: no anchor was unopenable, so no U.
A record passes when every value, label, date, place and note word is supported by an anchor row on the terms of
rules (a) to (c) and exceptions (a) to (l). Result: 70 pass, 0 fail, 0 U.

| Record | Anchors opened/found | Compared | Result |
|---|---|---|---|
| `culture.port-royal-jewish-community` | 2/2 | Port Royal presence (undated) and 1711 office bar: both in CULTURE "Minorities present" row naming TWN-JEW; 1711 labelled `estimate` with the referents as second anchor; high/medium confidence stated. (a), (c) | pass |
| `entity.jumbee` | 2/2 | Presence of jumbees: CULTURE "Folk belief" row, "researched (that it existed)"; key TWN-AFR named by the second anchor (SOURCES row). Medium, no date or place written. (c) | pass |
| `institution.indentured-servitude` | 1/1 | Indentured servants in the CULTURE "Labour" row, researched; keys TWN-BAR, TWN-DUNN named in that row; no date or place written. (c) | pass |
| `material.pearl` | 1/1 | Crown's fifth = 0.2, Pearl Coast: ECON-WAR row "the Pearl Coast's output, the crown's fifth"; label `researched`, confidence `low` for "not opened (review only)". (k) | pass |
| `period.port-royal-before-1692` | 2/2 | Presence label `estimate` (referent window); Q1 household row names TWN-PR; referents as second anchor; no 1670 start written, note says so. (a), (c) | pass |
| `phenomenon.king-davenant-corn-price-table` | 6/6 | Five values 0.3, 0.8, 1.6, 2.8, 4.5 against +3/10, +8/10, +16/10, +28/10, +45/10 in RESEARCH §1 rows 1/10 to 5/10, each its own anchor; Davenant 1699 in the econ 5 curve row; ECON-DAV named. | pass |
| `practice.bricklaying` | 1/1 | 5–6 s/day, Pennsylvania 1698 in RESEARCH §2 wage row (carpenter, bricklayer, mason); `researched`, medium ("colonial, not Caribbean"); ECON-THO named. | pass |
| `practice.daily-markets` | 2/2 | Q5 row "three daily markets", Hanson 1682 (STL-CUN) and Taylor 1687–8 (STL-PSJ) named; 1682–1692 labelled `estimate`, referents second anchor. (a), (d), (h) | pass |
| `practice.night-burial-and-wake` | 1/1 | CULTURE §2 "African-Caribbean" row: night burials, grave goods, singing, the wake; TWN-AFR named; "later Nine Night" note is the row's own words. Medium kept: "period form uncertain" is not a rule (k) qualifier (a judgment, not a failure). | pass |
| `practice.tavern-hospitality` | 1/1 | Port Royal tavern in CULTURE §2 "Hospitality and drink" row, `researched`, TWN-PR named; confidence high. | pass |
| `region.caribbean` | 2/2 | No claim beyond an undated `part_of` Atlantic; notes say no anchor states it. Q6 pattern row plus referents as anchors; no attestation, observation or source key. Nesting rule, (a) | pass |
| `region.new-providence` | 3/3 | "Nassau's land under the Lords Proprietors (TWN-NAS)" in the Q6 pattern row; TWN-ROG named by its SOURCES row; no political `part_of`; bahamas nesting noted as unanchored. (b), (g), nesting rule | pass |
| `source.econ-cmt` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.econ-tho` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-an20-em` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-an20-muff` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-an20-xrd` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-bm20-flask` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-bm20-us` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-chem18-17` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-chem18-9` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-chem19-18` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-chem19-9` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-ind19med-anti` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-ind19med-incu` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-ind19med-stet` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-lem-text` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-met-11` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-met-3` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-opt-burn` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-pf-gas` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-pres-boyle` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-sep-wiki` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-sf-lant` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-surg-1` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.eq-vess-rum` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.stl-jpr` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.stl-phil` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `source.twn-jew` | 1/1 | Title and URL found in the SOURCES.md row for its own key; key named by its own row. (c) | pass |
| `technology.aludel` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.balance-black` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.bath-water` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.bomb-calorimeter` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.candle` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.clock-pendulum` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.crucible-platinum` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.decant` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.ecg` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.filter` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.freezer-cryogenic` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.funnel-buchner` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.furnace-muffle-modern` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.geiger` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.head-moors` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.iron-pan` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.lamp-oil` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.leyden` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.mass-spec` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.mill-boring` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.oscilloscope` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.plate-reader` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.press-wine` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.retort-tubulated` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.settling-tank` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.spectrophotometer-uv` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.still-solar` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.thermometer-beckmann` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.tourniquet-stick` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.urinal-glass` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |
| `technology.wheel-water` | 2/2 | Window 1650–1730 is the §2 table header (rule (a), `estimate`/`open`/`absence` as INGEST-PLAN); invention year, credit and key in the row; labels and confidence as the row's availability and `conf_history`. | pass |

## Check 3: game-scoped record and count

| Test | Expected | Found | Result |
|---|---|---|---|
| `fixtures/pirate-town/records/**/*.json` | 1: `practice/faction-burial-alternatives.json` | that one file | pass |
| `data/**/*.json` | 663 | 663 | pass |
| `scripts/check.ts` records | 664 | `catalogue check: 664 records, 0 failures` | pass |

## Check 4: V1 and V6

| Test | Found | Result |
|---|---|---|
| V1, `scripts/check.ts` (rerun 5161, after P2 gave V1 its `data/` rules, 5160 / f8e1779) | `catalogue check: 664 records, 0 failures` | pass |
| V6, `scripts/fixture-drift.ts` (rerun 5161) | `fixture drift: 7 files, 664 records, 0 failures` | pass |

## Result

Failing ids: none. Keeper fixes plan: not needed. Re-audited by 5161 (a session that did not write the records);
no record was edited.

AUDIT-P: pass 70/70
