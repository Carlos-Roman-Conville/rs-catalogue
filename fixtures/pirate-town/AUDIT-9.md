# Pirate-town fixture audit 9 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/`, as AUDIT-8 counted them. This audit follows AUDIT-8 (commit 53a70e1) and the fixes that task 3091 made from it (commit 4562e8e, FIXES-audit8.md): the faction-burial-alternatives attestation removed under rule (f), and the 1682 STL-CUN and confidence-reason changes on the Q5 trade records under rule (h). The rules are DESIGN §4 V4, the V4 anchoring rule (a)–(c), the V4 nesting rule, the region anchoring exceptions (a)–(i), and the unknown-presence paragraph in §1.1.

Checks 1–10 are the checks AUDIT-8 applied, repeated exactly as that file states them (1: `derived_from` anchor resolves; 2: values, dates and places supported or `estimate` through the referents; 3: label; 4: source keys; 5: game fiction scoped; 6: nesting; 7: no note names an unanchored key or document; 8: political relation (exception (b)); 9: referent-window label (rule (a), exception (d)); 10: unsourced attestation (exception (e))).

Extra checks, the rulings task 3090 added to DESIGN §4:

- A. Fiction attestation (exception (f)): a `fiction` attestation with `sources: []` is removed and its claim kept in notes. Checked on `practice.faction-burial-alternatives`.
- B. Self-naming note (exception (g)): a note may name the file its own `derived_from` anchors cite, if it supports no value, date or place. Checked on `region.new-providence`.
- C. 1682 bound (exception (h)): a Q5 trade record that takes the 1682 start cites `catalogue/source.stl-cun` in its attestation and record `sources`. Checked on the eleven Q5 trade records; each attestation with a 1682 start has STL-CUN.
- D. Estimate with high confidence (exception (i)): `label: estimate` with `confidence.level: high` is consistent where the bound is from the referent window. Checked on the six Q5 records at `high`.

P = holds, F = fails, n/a = not applicable. Method: the mechanical part was done by script over all 66 records and all 114 `derived_from` anchors (every file exists, sha256 matches the record, and the anchor's heading text is in the cited file). Every attestation and observation was checked by script for non-empty `sources` and for source records that exist. Checks 2–10 were carried from AUDIT-8 for records task 3091 did not change; the eight records it changed (faction-burial-alternatives, and the seven Q5 trades) were re-read. No subagent was used. The gate runs `check` and `fixture-drift`; they are not repeated here.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | 7 check 7 names | 8 political | 9 referent label | 10 unsourced | Extra A–D | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| catalogue/culture.port-royal-jewish-community | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Minorities row names TWN-JEW and the 1711 bar; Jamaica (1711) from the Minorities row, labelled `estimate`; referents second anchor present. |
| catalogue/entity.duppy | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Folk belief row; TWN-AFR named by its SOURCES anchor. |
| catalogue/entity.gold-dust | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | ECON-ATK and ECON-RAC named in the econ 1 row. |
| catalogue/entity.jumbee | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | As entity.duppy. |
| catalogue/entity.piece-of-eight | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Money row (CULTURE §4) and STL-E row. |
| catalogue/entity.rolling-calf | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | As entity.duppy. |
| catalogue/institution.anglican-parish-church | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Established church row names TWN-PR; fiction in notes and the attestation note is a disclaimer (check 5). |
| catalogue/institution.chattel-slavery | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Labour row names TWN-BAR and TWN-DUNN. Game inclusion left open in notes (the row's GOODS Open 1). |
| catalogue/institution.freehold-by-patent | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Property row and Q6 pattern name TWN-PR and TWN-NAS; Nassau 1703–1718 `estimate` with the referents as second anchor. |
| catalogue/institution.governor-magistrate | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Political system row names TWN-NAS, TWN-ROG and `STARTING_TOWN.md` Q11; Nassau 1703–1718 `estimate` with referents. Note's Q11 is a row label of that file. |
| catalogue/institution.indentured-servitude | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Labour row. |
| catalogue/institution.jewish-burial-ground | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Burial place row names TWN-JEW. |
| catalogue/institution.justices-of-the-peace | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Justice row names TWN-LAW and TWN-CODE. |
| catalogue/institution.parish-vestry | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Established church row names TWN-PR. |
| catalogue/institution.pirate-articles | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Justice row names TWN-CODE. |
| catalogue/period.nassau-pirate-haven | P | P | P | P | P | n/a | P | P | P | P | n/a | 1713–1718 stated by the TWN-NAS row ("from 1713", "Rogers's pardon 1718"), `researched`, not the referent window. `part_of` nassau is geographic. |
| catalogue/period.port-royal-before-1692 | P | P | P | P | P | n/a | P | P | P | P | n/a | No date field; `estimate` through the referents; 1670 start disclaimed in the note. `part_of` port-royal is geographic. |
| catalogue/period.war-of-the-spanish-succession | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Model row states c. 1690–1720 (`researched`) and names TWN-NAS and TWN-ROG. The bounds are the row's own, not the referent window. |
| catalogue/phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | P | n/a | P | P | n/a | 1699 and the +3/10 to +45/10 steps in the econ 5 curve row; ECON-DAV named there. |
| catalogue/practice.anglican-burial-rite | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Rite row, TWN-LAW. |
| catalogue/practice.belief-in-duppies | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Folk belief row; TWN-AFR via the SOURCES anchor. |
| catalogue/practice.belief-in-jumbees | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | As belief-in-duppies. |
| catalogue/practice.belief-in-rolling-calf | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | As belief-in-duppies. |
| catalogue/practice.blacksmithing | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610: 1682–1692 Port Royal presence `estimate`; referents added as second anchor (rule (d)). 1682 from the Q5 trades row (STL-CUN, STL-INA). |
| catalogue/practice.burial-at-sea | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Sailors row, TWN-CODE. |
| catalogue/practice.butchering | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610, as blacksmithing (STL-INA, STL-PSJ). |
| catalogue/practice.careening | P | P | P | P | P | n/a | P | n/a | P | P | n/a | 20 June 1692 from the Q5 careening row and STL-CUN; `researched` because the row states the date. |
| catalogue/practice.carpentry | P | P | P | P | P | n/a | P | n/a | P | P | C P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-RUN). |
| catalogue/practice.churchyard-burial | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Burial place row, TWN-PR. |
| catalogue/practice.clay-pipe-retailing | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.cobbling | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.commercial-brewing | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | `what: presence`, `label: open` (unknown-presence convention, §1.1); the Q5 tavern brewhouse row names STL-PSJ. The note's "(DESIGN §1.1)" is a convention citation, exempt from check 7 (region exception (c)). |
| catalogue/practice.cooperage | P | P | P | P | P | n/a | P | n/a | P | P | C P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-RUN). |
| catalogue/practice.daily-markets | P | P | P | P | P | n/a | P | n/a | P | P | C P | Changed by 5cb5610, as blacksmithing (STL-PSJ). |
| catalogue/practice.epidemic-mass-burial | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Epidemic row, TWN-PR; 1692 is the row's date ("after the 1692 earthquake"), `researched`. |
| catalogue/practice.faction-burial-alternatives | P | P | P | P | P | n/a | P | n/a | n/a | P | A P | Attestation removed under DESIGN §4 (f) (task 3091); the claim, the `fiction` label and the Alternatives row pointers (Rex 2026-10-30, COMBAT.md §4e) are in notes. Check 10 no longer applies: no attestation is left. Holds. |
| catalogue/practice.fencing-plunder | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with referents. |
| catalogue/practice.goldsmithing | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610, as blacksmithing (STL-CUN, Hanson 1682). |
| catalogue/practice.low-sunday-observance | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Observance row, TWN-PR; `estimate` matches the row. |
| catalogue/practice.matelotage | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Pirate row, TWN-MAT and TWN-CODE. |
| catalogue/practice.merchant-storekeeping | P | P | P | P | P | n/a | P | n/a | P | P | C P | Changed by 5cb5610, as blacksmithing (STL-CUN, STL-PSJ). |
| catalogue/practice.mourning-and-inheritance | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Mourning row, TWN-LAW and TWN-BURN. |
| catalogue/practice.night-burial-and-wake | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | African-Caribbean row, TWN-AFR. |
| catalogue/practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Q15 row, STL-PHIL and STL-BAR. |
| catalogue/practice.provisioning-ships | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Livelihoods row, TWN-NAS; Nassau through the referents, `estimate`. |
| catalogue/practice.salt-raking | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.shop-house-residence | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | §8.3 row, TWN-PR. |
| catalogue/practice.sugar-grade-distinction | P | n/a | n/a | P | P | n/a | P | n/a | n/a | P | n/a | Changed by 5cb5610: unsourced attestation removed (`sources: []`); claim, the row's `researched` label and keys L, PHY-RATION, DV, CSP kept in `notes`. The Open 3 row (RESEARCH §4 and STARTING_TOWN) names all four keys, so the note passes check 7. |
| catalogue/practice.tavern-hospitality | P | P | P | P | P | n/a | P | n/a | n/a | P | n/a | Hospitality row, TWN-PR. |
| catalogue/practice.turtling | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.vintner-trade | P | P | P | P | P | n/a | P | n/a | P | P | C P | Changed by 5cb5610, as blacksmithing (STL-PSJ). |
| catalogue/practice.wood-turning | P | P | P | P | P | n/a | P | n/a | P | P | C P; D P | Changed by 5cb5610, as blacksmithing (STL-INA). |
| catalogue/practice.wrecking | P | P | P | P | P | n/a | P | n/a | P | P | n/a | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/region.atlantic | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Referents only, passing region exception (a): a sea with names, kind and an undated, non-political `part_of` world only; no sources; notes carry "no row names Atlantic Ocean". Unchanged. |
| catalogue/region.bahamas | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Q6 pattern row beside the referents (rule (b)). `part_of` caribbean is geographic, doubt in notes. |
| catalogue/region.barbados | P | n/a | n/a | P | P | P | P | P | n/a | n/a | n/a | Q1 household names TWN-BAR (anchored by that row). `part_of` lesser-antilles geographic, doubt in notes. |
| catalogue/region.caribbean | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Q6 pattern row beside the referents. `part_of` atlantic geographic, doubt in notes. |
| catalogue/region.england | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Anchors are the referents and STL-MOR, which names England (1700 wages). Its only relation is `part_of` world, geographic. |
| catalogue/region.greater-antilles | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Q6 pattern row beside the referents. `part_of` caribbean geographic, doubt in notes. |
| catalogue/region.jamaica | P | P | n/a | P | P | P | P | P | n/a | n/a | n/a | Political `part_of` england (exception (b)): undated (`date` null), STL-LAW anchor states English law in Jamaica, the 1655 bound is in no anchored row, notes name the relation and that STL-LAW was not opened. Holds under rule (b). Geographic `part_of` greater-antilles, doubt in notes. Unchanged since 3041. |
| catalogue/region.kingston | P | P | P | P | P | P | P | P | P | P | n/a | `estimate` through STL-KING; date null; 1692 appears only in the note (not written as a bound). `part_of` jamaica is geographic, doubt in notes. |
| catalogue/region.lesser-antilles | P | n/a | n/a | n/a | P | P | P | P | n/a | n/a | n/a | Q1 household row and referents. `part_of` caribbean geographic, doubt in notes. |
| catalogue/region.nassau | P | P | P | P | P | P | P | P | P | P | n/a | Food row (CULTURE §6) names TWN-DIET; diet observation 1703–1718 `estimate` through the referents. `part_of` new-providence anchored on the referents. |
| catalogue/region.new-providence | P | n/a | n/a | P | P | P | P | P | n/a | P | B P | Note names SOURCES.md, the file its own anchors cite; self-naming reading holds (rule (g)). No change. |
| catalogue/region.port-royal | P | P | P | P | P | P | P | P | P | P | n/a | 1692 attestation and 1692 population `estimate` through the referents; 1688 house count `estimate` from the Q1 classes row. `part_of` jamaica stated by the referents. STL-EHS and STL-PBB in notes are named by the Not found row. |
| catalogue/region.world | P | n/a | n/a | n/a | P | n/a | P | n/a | n/a | n/a | n/a | Root region; Q6 row and referents. |

## Result by check

- Check 1: 66 of 66 hold; 114 anchors resolve, all sha256 hashes match.
- Checks 2–7: 66 of 66 hold.
- Check 8 (political relation): holds for `region.jamaica` (exception (b)); no other record has a political relation.
- Check 9 (referent-window label): holds for every referent-window date.
- Check 10 (unsourced attestation): holds for all 66. `practice.faction-burial-alternatives` has no attestation now, so there is nothing unsourced to fail.
- Extra A (fiction attestation): holds for `practice.faction-burial-alternatives`.
- Extra B (self-naming note): holds for `region.new-providence`.
- Extra C (1682 bound): holds for all eleven Q5 trade records; each takes 1682 with `catalogue/source.stl-cun`.
- Extra D (estimate with high confidence): holds for the six Q5 records at `high`.

## Changes since AUDIT-8

- `practice.faction-burial-alternatives`: attestation removed (4562e8e). AUDIT-8's one failure is cleared.
- The six Q5 trade records changed by 4562e8e (butchering, clay-pipe-retailing, cobbling, daily-markets, vintner-trade, wood-turning) now carry STL-CUN and the Hanson confidence reason. None of them changed its label or level.

## Notes

- `region.jamaica`: the political `part_of` england rests on STL-LAW ("English law in Jamaica"), named but not opened. This is unchanged from AUDIT-8. The 1655 bound is not in any anchored row, and it is not written here.
- `region.new-providence`: the note's `SOURCES.md` is the file its anchors cite (rule (g)). The question AUDIT-8 left for the DESIGN is answered by rule (g), which says the self-naming reading holds.
- The Q5 trade records' confidence reasons now say the 1682 bound is Hanson's list year, not a statement about that trade (rule (h)). Blacksmithing, carpentry, cooperage, goldsmithing and merchant-storekeeping already cited STL-CUN and did not change.

## Summary

- 66 records checked; 114 anchors resolved; all sha256 hashes match.
- Records failing: 0.
- Records newly passing: `practice.faction-burial-alternatives` (AUDIT-8 check 10).

Result: pass
Failing ids: none
