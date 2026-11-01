# Pirate-town fixture audit 7 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13). This audit follows AUDIT-6 (c. 2994, commit 10d528d) and task 3041 (commit c6dff84, which applied DESIGN §4 region exception (b) to `region.jamaica` and `region.new-providence`). The rules are DESIGN §4 V4, the V4 anchoring rule (a)–(e), the V4 nesting rule, the region anchoring exceptions as reworded by task 3040 (commit bc2c1f7), and the unknown-presence paragraph in §1.1.

Checks, as AUDIT-5 and AUDIT-6 defined them (repeated exactly):

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources`, in its reason or in its note) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that disclaims a fiction element in a universal record is not counted.
6. Every region except `region.world` has a `part_of` parent. The nesting relation itself is kept with its doubt in `notes` (rule d); it is not failed for lacking a row.
7. No note or reason names a key or document that no anchored row names. Counted: source keys (`TWN-*`, `STL-*`, `ECON-*`, GOODS keys, `ATLANTIC-*`), and documents (any file, such as `TOWNS.md`). Not counted: row labels inside an anchored document (`Q11`, `Q10 hours`), the rule names (`V4 nesting rule`), people (`Rex`), and DESIGN.md citations that point at a convention and support no value, date or place (DESIGN §4 region exception (c)).

Method: all 66 records were read through a scripted summary (every `derived_from`, `sources`, attestation, observation, relation and note field, printed per record); the 13 region records were read whole. Every `derived_from` anchor (103 across the 66 records) was resolved by script against its cited file: the heading and row, or the referents paragraph, was found in each. Every key and document name in each record's body was then looked up in the text of its anchored rows (script), and the rows that carry the dates, labels and keys were read by hand: `STARTING_TOWN.md` lines 85–148, `town/CULTURE.md` (sections 1–6 and the rows the records cite), and `SOURCES.md` lines 348–366 (town sources). Settlement, economy and phenomenon source rows were checked by key lookup only. No subagent was used. Anchor hashes (V6) are not checked here; the gate runs `fixture-drift`.

P = holds, F = fails, n/a = no attestation, observation or relation to test.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | 7 check 7 names | Note |
|---|---|---|---|---|---|---|---|---|
| catalogue/culture.port-royal-jewish-community | P | P | P | P | P | n/a | P | Minorities row names TWN-JEW and the 1711 bar; Jamaica (1711) from the Minorities row, labelled `estimate` (weaker than the row's `researched`); referents second anchor present. |
| catalogue/entity.duppy | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR named by its SOURCES anchor. Bestiary file named in the Folk belief row, not in the record. |
| catalogue/entity.gold-dust | P | P | P | P | P | n/a | P | ECON-ATK and ECON-RAC named in the econ 1 row. |
| catalogue/entity.jumbee | P | P | P | P | P | n/a | P | As entity.duppy. |
| catalogue/entity.piece-of-eight | P | P | P | P | P | n/a | P | Money row (CULTURE §4) and STL-E row. |
| catalogue/entity.rolling-calf | P | P | P | P | P | n/a | P | As entity.duppy. |
| catalogue/institution.anglican-parish-church | P | P | P | P | P | n/a | P | Established church row names TWN-PR; fiction in notes is a disclaimer (check 5). |
| catalogue/institution.chattel-slavery | P | P | P | P | P | n/a | P | Labour row names TWN-BAR and TWN-DUNN. Game inclusion left open in notes (GOODS Open 1 named in the row). |
| catalogue/institution.freehold-by-patent | P | P | P | P | P | n/a | P | Property row and Q6 pattern name TWN-PR and TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| catalogue/institution.governor-magistrate | P | P | P | P | P | n/a | P | Political system row names TWN-NAS and TWN-ROG; Justice row names TWN-LAW. The note's `STARTING_TOWN Q11` is a row label, and the Political system row names `STARTING_TOWN.md` Q11. |
| catalogue/institution.indentured-servitude | P | P | P | P | P | n/a | P | Labour row. |
| catalogue/institution.jewish-burial-ground | P | P | P | P | P | n/a | P | Burial place row names TWN-JEW. Hunt's Bay is in the reason text only (TWN-JEW row names it), not a structured field. |
| catalogue/institution.justices-of-the-peace | P | P | P | P | P | n/a | P | Justice row names TWN-LAW and TWN-CODE. |
| catalogue/institution.parish-vestry | P | P | P | P | P | n/a | P | Established church row names TWN-PR. |
| catalogue/institution.pirate-articles | P | P | P | P | P | n/a | P | Justice row names TWN-CODE. |
| catalogue/period.nassau-pirate-haven | P | P | P | P | P | n/a | P | 1713–1718: TWN-NAS row gives "Nassau a pirate base from 1713" and "Rogers's pardon 1718"; TWN-ROG anchored and named for the Crown return. See Corrections. |
| catalogue/period.port-royal-before-1692 | P | P | P | P | P | n/a | P | No date field; `estimate` through the referents. The 1670 start is disclaimed in the attestation note. |
| catalogue/period.war-of-the-spanish-succession | P | P | P | P | P | n/a | P | Model row states c. 1690–1720 (`researched`) and names TWN-NAS and TWN-ROG. "Standard chronology" is a note, not a document. |
| catalogue/phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | P | 1699 and the +3/10 to +45/10 steps in the econ 5 curve row; ECON-DAV named there. |
| catalogue/practice.anglican-burial-rite | P | P | P | P | P | n/a | P | Rite row, TWN-LAW. |
| catalogue/practice.belief-in-duppies | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR via the SOURCES anchor. |
| catalogue/practice.belief-in-jumbees | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| catalogue/practice.belief-in-rolling-calf | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| catalogue/practice.blacksmithing | P | P | P | P | P | n/a | P | Q5 trades row names STL-CUN and STL-INA; 1682 is Hanson's date. The 1692 end is the referent bound (open question below). |
| catalogue/practice.burial-at-sea | P | P | P | P | P | n/a | P | Sailors row, TWN-CODE. |
| catalogue/practice.butchering | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA and STL-PSJ. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.careening | P | P | P | P | P | n/a | P | Q5 careening row, 20 June 1692, STL-CUN and STL-E. |
| catalogue/practice.carpentry | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.churchyard-burial | P | P | P | P | P | n/a | P | Burial place row, TWN-PR. |
| catalogue/practice.clay-pipe-retailing | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.cobbling | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.commercial-brewing | P | P | P | P | P | n/a | P | `what: presence`, `label: open` (the unknown-presence convention, DESIGN §1.1); the Q5 tavern brewhouse row names STL-PSJ. The note's "(DESIGN §1.1)" points at that convention and supports no value, so it is exempt from check 7 (DESIGN §4 region exception (c)). |
| catalogue/practice.cooperage | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.daily-markets | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.epidemic-mass-burial | P | P | P | P | P | n/a | P | Epidemic row, TWN-PR, 1692. |
| catalogue/practice.faction-burial-alternatives | P | P | P | P | P | n/a | P | `game:pirate-ship`, label fiction, as the Alternatives row; Holy Order, Free Pirates, cults, Atlanteans, Ghost Fleet all named there. |
| catalogue/practice.fencing-plunder | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| catalogue/practice.goldsmithing | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN (Hanson 1682). 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.low-sunday-observance | P | P | P | P | P | n/a | P | Observance row, TWN-PR; `estimate` matches the row. |
| catalogue/practice.matelotage | P | P | P | P | P | n/a | P | Pirate row, TWN-MAT and TWN-CODE. |
| catalogue/practice.merchant-storekeeping | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-PSJ. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.mourning-and-inheritance | P | P | P | P | P | n/a | P | Mourning row, TWN-LAW and TWN-BURN. |
| catalogue/practice.night-burial-and-wake | P | P | P | P | P | n/a | P | African-Caribbean row, TWN-AFR. |
| catalogue/practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | P | Q15 row, STL-PHIL and STL-BAR. |
| catalogue/practice.provisioning-ships | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau through the referents, `estimate`. |
| catalogue/practice.salt-raking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.shop-house-residence | P | P | P | P | P | n/a | P | §8.3 row, TWN-PR. |
| catalogue/practice.sugar-grade-distinction | P | P | P | P | P | n/a | P | "Open 3" resolves by prefix to RESEARCH §4 "Open 3, grain of goods" and to the STARTING_TOWN Open 3 row; L, PHY-RATION, DV and CSP are named in both. Record label `open` is weaker than the row's `researched`. Outside checks 1–7: the attestation cites no source (`sources` empty), which the V1 check (every attestation cites a source) would flag; noted for the next round. |
| catalogue/practice.tavern-hospitality | P | P | P | P | P | n/a | P | Hospitality row, TWN-PR. |
| catalogue/practice.turtling | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.vintner-trade | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ (Blome 1672 named there). 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.wood-turning | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. 1682–1692 as blacksmithing (open question below). |
| catalogue/practice.wrecking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/region.atlantic | P | n/a | n/a | n/a | P | P | P | Referents only, passing region exception (a): a physical container with names, kind and undated geographic `part_of` only; notes carry "no row names Atlantic Ocean". `part_of` world kept, doubt in notes. |
| catalogue/region.bahamas | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents (rule b). `part_of` caribbean kept, doubt in notes. |
| catalogue/region.barbados | P | n/a | n/a | P | P | P | P | Q1 household names TWN-BAR (source key, anchored by that row). `part_of` lesser-antilles kept, doubt in notes. |
| catalogue/region.caribbean | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents. `part_of` atlantic kept, doubt in notes. |
| catalogue/region.england | P | n/a | n/a | n/a | P | P | P | Anchors are the referents and STL-MOR, which names England (1700 wages). `part_of` world kept, doubt in notes. |
| catalogue/region.greater-antilles | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents. `part_of` caribbean kept, doubt in notes. |
| catalogue/region.jamaica | P | P | n/a | n/a | P | P | P | Changed by task 3041 (AUDIT-6 failed check 2). `part_of` england has no date (date null, rule (b)); STL-LAW added as a further anchor (its SOURCES row names English law in Jamaica); notes name the relation, that the 1655 bound is in no anchored row, and that STL-LAW was not opened. Passes. |
| catalogue/region.kingston | P | P | P | P | P | P | P | Attestation `estimate` through STL-KING; date null; 1692 appears only in the note. `part_of` jamaica is geographic, doubt in notes. |
| catalogue/region.lesser-antilles | P | n/a | n/a | n/a | P | P | P | Q1 household row and referents. `part_of` caribbean kept, doubt in notes. |
| catalogue/region.nassau | P | P | P | P | P | P | P | Food row (CULTURE §6) names TWN-DIET; 1703–1718 `estimate` through the referents. `part_of` new-providence anchored on the referents. |
| catalogue/region.new-providence | P | P | P | P | P | P | P | Changed by task 3041 (AUDIT-6 failed check 2). Political `part_of` england removed; notes say English rule from 1718 waits for a source row. Geographic `part_of` bahamas kept, doubt in notes. Check 7: `SOURCES.md` in the notes is the file the record's own anchor cites (taken to name itself, as AUDIT-6 did). |
| catalogue/region.port-royal | P | P | P | P | P | P | P | Attestation and observations `estimate` through the referents and Q1 rows; `part_of` jamaica stated by the referents; STL-EHS and STL-PBB in notes are named by the Not found row. |
| catalogue/region.world | P | n/a | n/a | n/a | P | n/a | P | Root region; Q6 row and referents. |

## Open question (not a failure)

Eleven records give a presence of 1682–1692 at Port Royal (`practice.blacksmithing`, `butchering`, `carpentry`, `clay-pipe-retailing`, `cobbling`, `cooperage`, `daily-markets`, `goldsmithing`, `merchant-storekeeping`, `vintner-trade`, `wood-turning`). The 1682 start is Hanson's, named in the Q5 row. The 1692 end is not in that row; it comes from the referents ("Port Royal before 1692"), which the Settlement section's intro says apply. Under DESIGN §4 rule (a), an attestation that uses the referent window is labelled `estimate` with the referents as a second anchor. These records are labelled `researched` and cite only the Q5 row. AUDIT-6 passed them on the reading that the Settlement section states the bound; this audit applies the same reading, so they pass. The next round should decide the reading: either `estimate` plus the referents as a second anchor, or the Settlement section's intro counts as the anchor.

## Corrections to AUDIT-6

- **region.new-providence (AUDIT-6 "Records", check 2 note).** AUDIT-6 said "TWN-ROG states the 1718 pardon, not England". That is wrong. TWN-NAS gives the 1718 pardon (the TWN-NAS row: "Rogers's pardon 1718"). TWN-ROG gives the pardon with no year ("~300 men took the pardon"). The conclusion is unchanged (no anchored row states English rule of New Providence), and DESIGN §4 rule (b) already says TWN-NAS.
- **region.jamaica and region.new-providence.** AUDIT-6 listed both as failing check 2. Both pass now (see the table); the failure came from the records lacking the fixes in DESIGN §4 region exception (b), which task 3041 applied.

## Changes since AUDIT-6

- Now passing: `region.jamaica` (check 2; task 3041 added STL-LAW as an anchor and left the England `part_of` undated), `region.new-providence` (check 2; task 3041 removed the England `part_of`).
- No new failures. Every check that held in AUDIT-6 holds here.
- The open question above is not a change in result: it was present in AUDIT-6 and was passed there.

## Notes for the next round

- Settle the 1682–1692 reading (Open question above).
- `practice.sugar-grade-distinction`: the attestation has no source. Outside this audit's checks; V1 would flag it.
- `region.jamaica`: the political `part_of` england rests on STL-LAW ("English law in Jamaica"), which is named but not opened. A research request for the 1655 bound can go to pirate-ship SOURCES.md (another repo; not written from here).
- `region.bahamas`, `region.caribbean`, `region.greater-antilles`, `region.lesser-antilles`: their geographic `part_of` edges are kept with doubt in notes (rule d); none has a "no row names X" line, which only exception (a) requires.
- V6 anchor hashes are not checked here; the gate runs `fixture-drift`.

## Summary

- 66 records checked; 103 anchors resolved. Fails: none. No record failed checks 1–7.
- 2 records passed that failed AUDIT-6: `region.jamaica`, `region.new-providence`.

Result: pass
