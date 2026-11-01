# AUDIT-P: V4 audit of the promoted set (unit 5133, P4 of PROMOTE-PLAN)

Audited 2026-11-01 by a session that did not write the 663 rows or the P3 move. No record was edited.

## Check 1: P3 commit (85470b6)

| Test | Expected | Found | Result |
|---|---|---|---|
| `R100` renames under `data/` | 663 | 663 | pass |
| Other changes under `data/` | only `data/sources/.gitkeep` deleted | one `D`: `data/sources/.gitkeep` | pass |
| Other files in the commit | ingest script, its test, DESIGN.md | `M` on those three; nothing else | pass |

## Check 2: stratified sample (70 of 663)

Sample: the middle record of each equal slice of the sorted kind directory. culture 1, entity 1, institution 1,
material 1, period 1, phenomenon 1, practice 4, region 2, source 27, technology 31. For each, every `derived_from`
file was opened (all openable, so no U), each anchor row was located, and each cited source key was matched against
the anchored rows. Values, labels and dates were then compared with the row text.

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

## Check 3: game-scoped record and count

| Test | Expected | Found | Result |
|---|---|---|---|
| `fixtures/pirate-town/records/**/*.json` | 1: `practice/faction-burial-alternatives.json` | that one file | pass |
| `data/**/*.json` | 663 | 663 | pass |
| `scripts/check.ts` records | 664 | `catalogue check: 664 records, 0 failures` | pass |

## Check 4: V1 and V6

| Test | Found | Result |
|---|---|---|
| V1, `scripts/check.ts` | 664 records, 0 failures | pass |
| V6, `scripts/fixture-drift.ts` | 7 files, 664 records, 0 failures | pass |

## Result

Failing ids: none. Keeper fixes plan: not needed.

AUDIT-P: pass 70/70
