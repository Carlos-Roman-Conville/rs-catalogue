# Pirate-town fixture audit 8 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13). This audit follows AUDIT-7 (commit d9e0ee8) and the fixes it led to: task 3041 (commit c6dff84, region exception (b)) and task 3049 (commit 5cb5610, DESIGN §4 (d) and (e)). The rules are DESIGN §4 V4, the V4 anchoring rule (a)–(c), the V4 nesting rule, the region anchoring exceptions (a)–(e) as ruled by tasks 3040, 3048 and 3049, and the unknown-presence paragraph in §1.1.

Checks 1–7 are the ones AUDIT-7 applied, repeated exactly:

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources`, in its reason or in its note) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that disclaims a fiction element in a universal record is not counted.
6. Every region except `region.world` has a `part_of` parent. The nesting relation itself is kept with its doubt in `notes` (rule d); it is not failed for lacking a row.
7. No note or reason names a key or document that no anchored row names. Counted: source keys, and documents (any file). Not counted: row labels, the rule names, people, and DESIGN.md citations that point at a convention and support no value, date or place (DESIGN §4 region exception (c)).

Checks 8–10 are the three rulings of task 3048, as DESIGN §4 now states them:

8. Political relation (region exception (b)): a `part_of` to a polity record holds only where an anchored row states the polity over the place, with each date bound under rule (a). Records with no political relation pass.
9. Referent-window label (rule (a), region exception (d)): an attestation or observation whose date comes from the referent window is labelled `estimate`, with the referents paragraph as a second anchor.
10. Unsourced attestation (region exception (e)): every attestation and observation cites at least one source key that an anchored row names, whatever its label.

P = holds, F = fails, n/a = no attestation, observation, relation or referent-window date to test.

Method: all 66 records were read through a scripted summary (every `derived_from`, `sources`, attestation, observation, relation, note and reason field, printed per record). Every `derived_from` anchor (114 across the 66 records, up from 103 in AUDIT-7 by the 11 referents anchors that task 3049 added) was resolved by script against its cited file: the heading was found, the row label was found in its section (or the referents paragraph was printed), and the file's sha256 matched the record. The rows that carry the dates, labels and keys were read by hand: `STARTING_TOWN.md` (Settlement, Town keeper and Economy sections), `town/CULTURE.md` (sections 1–6), and `SOURCES.md` town sources. Settlement, economy and phenomenon source rows were checked by key lookup only, as in AUDIT-7. Checks 8 and 9 were applied to every relation and every attestation or observation with a referent-window date. Check 10 was applied by script to every attestation and observation (empty `sources`). No subagent was used. The gate runs `check` and `fixture-drift`; they are not repeated here.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | 7 check 7 names | 8 political | 9 referent label | 10 unsourced | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| catalogue/culture.port-royal-jewish-community | P | P | P | P | P | n/a | P | n/a | P | P | Minorities row names TWN-JEW and the 1711 bar; Jamaica (1711) from the Minorities row, labelled `estimate`; referents second anchor present. |
| catalogue/entity.duppy | P | P | P | P | P | n/a | P | n/a | n/a | P | Folk belief row; TWN-AFR named by its SOURCES anchor. |
| catalogue/entity.gold-dust | P | P | P | P | P | n/a | P | n/a | n/a | P | ECON-ATK and ECON-RAC named in the econ 1 row. |
| catalogue/entity.jumbee | P | P | P | P | P | n/a | P | n/a | n/a | P | As entity.duppy. |
| catalogue/entity.piece-of-eight | P | P | P | P | P | n/a | P | n/a | n/a | P | Money row (CULTURE §4) and STL-E row. |
| catalogue/entity.rolling-calf | P | P | P | P | P | n/a | P | n/a | n/a | P | As entity.duppy. |
| catalogue/institution.anglican-parish-church | P | P | P | P | P | n/a | P | n/a | n/a | P | Established church row names TWN-PR; fiction in notes and the attestation note is a disclaimer (check 5). |
| catalogue/institution.chattel-slavery | P | P | P | P | P | n/a | P | n/a | n/a | P | Labour row names TWN-BAR and TWN-DUNN. Game inclusion left open in notes (the row's GOODS Open 1). |
| catalogue/institution.freehold-by-patent | P | P | P | P | P | n/a | P | n/a | P | P | Property row and Q6 pattern name TWN-PR and TWN-NAS; Nassau 1703–1718 `estimate` with the referents as second anchor. |
| catalogue/institution.governor-magistrate | P | P | P | P | P | n/a | P | n/a | P | P | Political system row names TWN-NAS, TWN-ROG and `STARTING_TOWN.md` Q11; Nassau 1703–1718 `estimate` with referents. Note's Q11 is a row label of that file. |
| catalogue/institution.indentured-servitude | P | P | P | P | P | n/a | P | n/a | n/a | P | Labour row. |
| catalogue/institution.jewish-burial-ground | P | P | P | P | P | n/a | P | n/a | n/a | P | Burial place row names TWN-JEW. |
| catalogue/institution.justices-of-the-peace | P | P | P | P | P | n/a | P | n/a | n/a | P | Justice row names TWN-LAW and TWN-CODE. |
| catalogue/institution.parish-vestry | P | P | P | P | P | n/a | P | n/a | n/a | P | Established church row names TWN-PR. |
| catalogue/institution.pirate-articles | P | P | P | P | P | n/a | P | n/a | n/a | P | Justice row names TWN-CODE. |
| catalogue/period.nassau-pirate-haven | P | P | P | P | P | n/a | P | P | P | P | 1713–1718 stated by the TWN-NAS row ("from 1713", "Rogers's pardon 1718"), `researched`, not the referent window. `part_of` nassau is geographic. |
| catalogue/period.port-royal-before-1692 | P | P | P | P | P | n/a | P | P | P | P | No date field; `estimate` through the referents; 1670 start disclaimed in the note. `part_of` port-royal is geographic. |
| catalogue/period.war-of-the-spanish-succession | P | P | P | P | P | n/a | P | n/a | P | P | Model row states c. 1690–1720 (`researched`) and names TWN-NAS and TWN-ROG. The bounds are the row's own, not the referent window. |
| catalogue/phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | P | n/a | P | P | 1699 and the +3/10 to +45/10 steps in the econ 5 curve row; ECON-DAV named there. |
| catalogue/practice.anglican-burial-rite | P | P | P | P | P | n/a | P | n/a | n/a | P | Rite row, TWN-LAW. |
| catalogue/practice.belief-in-duppies | P | P | P | P | P | n/a | P | n/a | n/a | P | Folk belief row; TWN-AFR via the SOURCES anchor. |
| catalogue/practice.belief-in-jumbees | P | P | P | P | P | n/a | P | n/a | n/a | P | As belief-in-duppies. |
| catalogue/practice.belief-in-rolling-calf | P | P | P | P | P | n/a | P | n/a | n/a | P | As belief-in-duppies. |
| catalogue/practice.blacksmithing | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610: 1682–1692 Port Royal presence `estimate`; referents added as second anchor (rule (d)). 1682 from the Q5 trades row (STL-CUN, STL-INA). |
| catalogue/practice.burial-at-sea | P | P | P | P | P | n/a | P | n/a | n/a | P | Sailors row, TWN-CODE. |
| catalogue/practice.butchering | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-INA, STL-PSJ). |
| catalogue/practice.careening | P | P | P | P | P | n/a | P | n/a | P | P | 20 June 1692 from the Q5 careening row and STL-CUN; `researched` because the row states the date. |
| catalogue/practice.carpentry | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-RUN). |
| catalogue/practice.churchyard-burial | P | P | P | P | P | n/a | P | n/a | n/a | P | Burial place row, TWN-PR. |
| catalogue/practice.clay-pipe-retailing | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.cobbling | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.commercial-brewing | P | P | P | P | P | n/a | P | n/a | n/a | P | `what: presence`, `label: open` (unknown-presence convention, §1.1); the Q5 tavern brewhouse row names STL-PSJ. The note's "(DESIGN §1.1)" is a convention citation, exempt from check 7 (region exception (c)). |
| catalogue/practice.cooperage | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-RUN). |
| catalogue/practice.daily-markets | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-PSJ). |
| catalogue/practice.epidemic-mass-burial | P | P | P | P | P | n/a | P | n/a | P | P | Epidemic row, TWN-PR; 1692 is the row's date ("after the 1692 earthquake"), `researched`. |
| catalogue/practice.faction-burial-alternatives | P | P | P | P | P | n/a | P | n/a | n/a | **F** | Scoped `game:pirate-ship` and labelled `fiction`, as the Alternatives row. Its one attestation has `sources: []`. The row names no source key (it names `COMBAT.md` §4e and Rex; neither is a catalogue source). Under rule (e) the attestation is removed and its claim kept in `notes`. Fails check 10. |
| catalogue/practice.fencing-plunder | P | P | P | P | P | n/a | P | n/a | P | P | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with referents. |
| catalogue/practice.goldsmithing | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-CUN, Hanson 1682). |
| catalogue/practice.low-sunday-observance | P | P | P | P | P | n/a | P | n/a | n/a | P | Observance row, TWN-PR; `estimate` matches the row. |
| catalogue/practice.matelotage | P | P | P | P | P | n/a | P | n/a | n/a | P | Pirate row, TWN-MAT and TWN-CODE. |
| catalogue/practice.merchant-storekeeping | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-PSJ). |
| catalogue/practice.mourning-and-inheritance | P | P | P | P | P | n/a | P | n/a | n/a | P | Mourning row, TWN-LAW and TWN-BURN. |
| catalogue/practice.night-burial-and-wake | P | P | P | P | P | n/a | P | n/a | n/a | P | African-Caribbean row, TWN-AFR. |
| catalogue/practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | P | n/a | n/a | P | Q15 row, STL-PHIL and STL-BAR. |
| catalogue/practice.provisioning-ships | P | P | P | P | P | n/a | P | n/a | P | P | Livelihoods row, TWN-NAS; Nassau through the referents, `estimate`. |
| catalogue/practice.salt-raking | P | P | P | P | P | n/a | P | n/a | P | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.shop-house-residence | P | P | P | P | P | n/a | P | n/a | n/a | P | §8.3 row, TWN-PR. |
| catalogue/practice.sugar-grade-distinction | P | n/a | n/a | P | P | n/a | P | n/a | n/a | P | Changed by 5cb5610: unsourced attestation removed (`sources: []`); claim, the row's `researched` label and keys L, PHY-RATION, DV, CSP kept in `notes`. The Open 3 row (RESEARCH §4 and STARTING_TOWN) names all four keys, so the note passes check 7. |
| catalogue/practice.tavern-hospitality | P | P | P | P | P | n/a | P | n/a | n/a | P | Hospitality row, TWN-PR. |
| catalogue/practice.turtling | P | P | P | P | P | n/a | P | n/a | P | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.vintner-trade | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-PSJ). |
| catalogue/practice.wood-turning | P | P | P | P | P | n/a | P | n/a | P | P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.wrecking | P | P | P | P | P | n/a | P | n/a | P | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/region.atlantic | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Referents only, passing region exception (a): a sea with names, kind and an undated, non-political `part_of` world only; no sources; notes carry "no row names Atlantic Ocean". Unchanged. |
| catalogue/region.bahamas | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Q6 pattern row beside the referents (rule (b)). `part_of` caribbean is geographic, doubt in notes. |
| catalogue/region.barbados | P | n/a | n/a | P | P | P | P | P | n/a | n/a | Q1 household names TWN-BAR (anchored by that row). `part_of` lesser-antilles geographic, doubt in notes. |
| catalogue/region.caribbean | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Q6 pattern row beside the referents. `part_of` atlantic geographic, doubt in notes. |
| catalogue/region.england | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Anchors are the referents and STL-MOR, which names England (1700 wages). Its only relation is `part_of` world, geographic. |
| catalogue/region.greater-antilles | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Q6 pattern row beside the referents. `part_of` caribbean geographic, doubt in notes. |
| catalogue/region.jamaica | P | P | n/a | P | P | P | P | P | n/a | n/a | Political `part_of` england (exception (b)): undated (`date` null), STL-LAW anchor states English law in Jamaica, the 1655 bound is in no anchored row, notes name the relation and that STL-LAW was not opened. Holds under rule (b). Geographic `part_of` greater-antilles, doubt in notes. Unchanged since 3041. |
| catalogue/region.kingston | P | P | P | P | P | P | P | P | P | P | `estimate` through STL-KING; date null; 1692 appears only in the note (not written as a bound). `part_of` jamaica is geographic, doubt in notes. |
| catalogue/region.lesser-antilles | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | Q1 household row and referents. `part_of` caribbean geographic, doubt in notes. |
| catalogue/region.nassau | P | P | P | P | P | P | P | P | P | P | Food row (CULTURE §6) names TWN-DIET; diet observation 1703–1718 `estimate` through the referents. `part_of` new-providence anchored on the referents. |
| catalogue/region.new-providence | P | n/a | n/a | P | P | P | P | P | n/a | P | No political `part_of` (removed by 3041); English rule from 1718 waits for a source row (notes). Geographic `part_of` bahamas, doubt in notes. Check 7: `SOURCES.md` in the notes is the file the record's own anchor cites, taken to name itself as in AUDIT-6 and AUDIT-7 (see Notes). |
| catalogue/region.port-royal | P | P | P | P | P | P | P | P | P | P | 1692 attestation and 1692 population `estimate` through the referents; 1688 house count `estimate` from the Q1 classes row. `part_of` jamaica stated by the referents. STL-EHS and STL-PBB in notes are named by the Not found row. |
| catalogue/region.world | P | n/a | n/a | n/a | P | n/a | P | n/a | n/a | n/a | Root region; Q6 row and referents. |

## Result by check

- Check 1: 66 of 66 hold; 114 anchors resolve.
- Checks 2–7: 66 of 66 hold, as AUDIT-7 found, except the rows changed by 5cb5610 (checks 2 and 3 now hold on the 11 Q5 records under rule (d)).
- Check 8 (political relation): holds for `region.jamaica` (exception (b)); no other record has a political relation.
- Check 9 (referent-window label): holds for every referent-window date (all labelled `estimate`, or stated by the row).
- Check 10 (unsourced attestation): fails for `practice.faction-burial-alternatives`. It passes for `practice.sugar-grade-distinction`, whose attestation 5cb5610 removed.

## Changes since AUDIT-7

- The 11 Q5 trade records (`practice.blacksmithing`, `butchering`, `carpentry`, `clay-pipe-retailing`, `cobbling`, `cooperage`, `daily-markets`, `goldsmithing`, `merchant-storekeeping`, `vintner-trade`, `wood-turning`) now carry `estimate` and the referents as a second anchor (5cb5610). AUDIT-7's open question is settled by DESIGN §4 (d); they pass.
- `practice.sugar-grade-distinction` no longer has an unsourced attestation (5cb5610). It passes check 10.
- `practice.faction-burial-alternatives` was not tested under rule (e) before. It has an unsourced attestation, labelled `fiction`. Rule (e) says V4 allows no unsourced attestation whatever its label. So this audit fails it.

## Notes

- Fix for the next round: `practice.faction-burial-alternatives`. Remove its attestation (as rule (e) did for sugar-grade) and keep the claim, the fiction label and the Alternatives row's pointers in `notes`. No record was edited here.
- Check 7 reading, as AUDIT-6 and AUDIT-7 had it: `region.new-providence` names `SOURCES.md` in its notes. The anchored rows are rows of that file; none names the file. This audit repeats the self-naming reading. If the next round reads check 7 strictly, the note must cite the file as the anchor's file instead, and the record would fail. This is a question for the DESIGN, not a change this audit makes.
- `region.jamaica`: the political `part_of` england rests on STL-LAW ("English law in Jamaica"), which is named but not opened. A research request for the 1655 bound can go to pirate-ship SOURCES.md (another repo; not written from here).
- The V6 anchor hashes were checked by script against each source file; the gate runs `fixture-drift`.

## Summary

- 66 records checked; 114 anchors resolved; all sha256 hashes match.
- Records failing: 1 — `catalogue/practice.faction-burial-alternatives` (check 10, DESIGN §4 region exception (e)).
- Records that failed AUDIT-7: none. Records newly failing under the rulings of task 3048: `practice.faction-burial-alternatives`.

Result: fail
Failing ids: catalogue/practice.faction-burial-alternatives
