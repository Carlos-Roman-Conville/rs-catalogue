# Pirate-town fixture audit 6 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13). The 10-record source sample of AUDIT-5 is not repeated here. Rules: DESIGN §4 V4, the V4 anchoring rule (a)–(e), the V4 nesting rule, and the region anchoring exceptions (review 1101-0223, commit 790b004). This audit follows AUDIT-5 (d778731). The only commit since AUDIT-5 is 790b004 (DESIGN.md and HANDOFF.md), so the records are the ones AUDIT-5 read.

Checks, as AUDIT-5 defined them (repeated exactly):

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources`, in its reason or in its note) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that disclaims a fiction element in a universal record is not counted.
6. Every region except `region.world` has a `part_of` parent. The nesting relation itself is kept with its doubt in `notes` (rule d); it is not failed for lacking a row.
7. No note or reason names a key or document that no anchored row names. Counted: source keys (`TWN-*`, `STL-*`, `ECON-*`, GOODS keys, `ATLANTIC-*`), and documents (any file, such as `TOWNS.md`). Not counted: row labels inside an anchored document (`Q11`, `Q10 hours`), the rule names (`V4 nesting rule`), people (`Rex`), and DESIGN.md citations that point at a convention and support no value, date or place (DESIGN §4 region exception (c)).

Method: each of the 66 records was read whole. Anchors were resolved against `STARTING_TOWN.md` (lines 85–148), `town/CULTURE.md` (section headings and table rows, by search), `SOURCES.md` (lines 348–424, by search) and `Toolchain/economy/RESEARCH.md` (§4 Open 3 row, §5 heading). A file that a record's own `derived_from` names is taken to name itself (for example `STARTING_TOWN Q5` in a note, where STARTING_TOWN.md is the anchor file). No subagent was used. Anchor hashes (V6) are not checked here; the gate runs `fixture-drift`.

P = holds, F = fails, n/a = no attestation, observation or relation to test.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | 7 check 7 names | Note |
|---|---|---|---|---|---|---|---|---|
| catalogue/culture.port-royal-jewish-community | P | P | P | P | P | n/a | P | Minorities row names TWN-JEW and the 1711 bar; Jamaica (1711) from the referents as `estimate`, referents second anchor present. |
| catalogue/entity.duppy | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR named by its SOURCES anchor. Bestiary file named in the Folk belief row. |
| catalogue/entity.gold-dust | P | P | P | P | P | n/a | P | ECON-ATK and ECON-RAC named in the econ 1 row. |
| catalogue/entity.jumbee | P | P | P | P | P | n/a | P | As entity.duppy. |
| catalogue/entity.piece-of-eight | P | P | P | P | P | n/a | P | Money row (CULTURE §4) and STL-E row. |
| catalogue/entity.rolling-calf | P | P | P | P | P | n/a | P | As entity.duppy. |
| catalogue/institution.anglican-parish-church | P | P | P | P | P | n/a | P | Established church row names TWN-PR; fiction in notes is a disclaimer (check 5). |
| catalogue/institution.chattel-slavery | P | P | P | P | P | n/a | P | Labour row names TWN-BAR and TWN-DUNN. Game inclusion left open in notes. |
| catalogue/institution.freehold-by-patent | P | P | P | P | P | n/a | P | Q6 pattern names TWN-PR and TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| catalogue/institution.governor-magistrate | P | P | P | P | P | n/a | P | Political system row names TWN-NAS and TWN-ROG; Justice row names TWN-LAW. The note's `STARTING_TOWN Q11` is a row label, and the Political system row names `STARTING_TOWN.md` Q11. |
| catalogue/institution.indentured-servitude | P | P | P | P | P | n/a | P | Labour row. |
| catalogue/institution.jewish-burial-ground | P | P | P | P | P | n/a | P | Burial place row names TWN-JEW. Hunt's Bay is in the reason text only, not a structured field. |
| catalogue/institution.justices-of-the-peace | P | P | P | P | P | n/a | P | Justice row names TWN-LAW and TWN-CODE. |
| catalogue/institution.parish-vestry | P | P | P | P | P | n/a | P | Established church row names TWN-PR. |
| catalogue/institution.pirate-articles | P | P | P | P | P | n/a | P | Justice row names TWN-CODE. |
| catalogue/period.nassau-pirate-haven | P | P | P | P | P | n/a | P | 1713–1718 in the TWN-NAS row; TWN-ROG anchored and named there for the Crown return. |
| catalogue/period.port-royal-before-1692 | P | P | P | P | P | n/a | P | No date field; `estimate` through the referents. The 1670 start is disclaimed in the note. |
| catalogue/period.war-of-the-spanish-succession | P | P | P | P | P | n/a | P | Model row states c. 1690–1720 and names TWN-NAS and TWN-ROG. "Standard chronology" is a note, not a document. |
| catalogue/phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | P | 1699 and the +3/10 to +45/10 steps in the econ 5 curve row; ECON-DAV named there. |
| catalogue/practice.anglican-burial-rite | P | P | P | P | P | n/a | P | Rite row, TWN-LAW. |
| catalogue/practice.belief-in-duppies | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR via the SOURCES anchor. |
| catalogue/practice.belief-in-jumbees | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| catalogue/practice.belief-in-rolling-calf | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| catalogue/practice.blacksmithing | P | P | P | P | P | n/a | P | Q5 trades row names STL-CUN and STL-INA; 1682 is Hanson's date; the 1692 end is the referent bound stated by the settlement section. |
| catalogue/practice.burial-at-sea | P | P | P | P | P | n/a | P | Sailors row, TWN-CODE. |
| catalogue/practice.butchering | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA and STL-PSJ. |
| catalogue/practice.careening | P | P | P | P | P | n/a | P | Q5 careening row, 20 June 1692, STL-CUN and STL-E. |
| catalogue/practice.carpentry | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. |
| catalogue/practice.churchyard-burial | P | P | P | P | P | n/a | P | Burial place row, TWN-PR. |
| catalogue/practice.clay-pipe-retailing | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| catalogue/practice.cobbling | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| catalogue/practice.commercial-brewing | P | P | P | P | P | n/a | P | Corrected from AUDIT-5. Label `open` with `what: presence` (the unknown-presence convention, DESIGN §1.1); the presence assertion stays. The note's "(DESIGN §1.1)" points at that convention and supports no value, so it is exempt from check 7 (DESIGN §4 region exception (c)). Q5 tavern brewhouse row names STL-PSJ. |
| catalogue/practice.cooperage | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. |
| catalogue/practice.daily-markets | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ. |
| catalogue/practice.epidemic-mass-burial | P | P | P | P | P | n/a | P | Epidemic row, TWN-PR, 1692. |
| catalogue/practice.faction-burial-alternatives | P | P | P | P | P | n/a | P | `game:pirate-ship`, label fiction, as the Alternatives row; Holy Order, Free Pirates, cults, Atlanteans, Ghost Fleet all named there. |
| catalogue/practice.fencing-plunder | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| catalogue/practice.goldsmithing | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN (Hanson 1682). |
| catalogue/practice.low-sunday-observance | P | P | P | P | P | n/a | P | Observance row, TWN-PR; `estimate` matches the row. |
| catalogue/practice.matelotage | P | P | P | P | P | n/a | P | Pirate row, TWN-MAT and TWN-CODE. |
| catalogue/practice.merchant-storekeeping | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-PSJ. |
| catalogue/practice.mourning-and-inheritance | P | P | P | P | P | n/a | P | Mourning row, TWN-LAW and TWN-BURN. |
| catalogue/practice.night-burial-and-wake | P | P | P | P | P | n/a | P | African-Caribbean row, TWN-AFR. |
| catalogue/practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | P | Q15 row, STL-PHIL and STL-BAR. |
| catalogue/practice.provisioning-ships | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau through the referents, `estimate`. |
| catalogue/practice.salt-raking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.shop-house-residence | P | P | P | P | P | n/a | P | §8.3 row, TWN-PR. |
| catalogue/practice.sugar-grade-distinction | P | P | P | P | P | n/a | P | "Open 3" resolves by prefix to RESEARCH §4 "Open 3, grain of goods" and to the STARTING_TOWN Open 3 row; L, PHY-RATION, DV and CSP are named in both. Record label `open` is weaker than the row's `researched`. |
| catalogue/practice.tavern-hospitality | P | P | P | P | P | n/a | P | Hospitality row, TWN-PR. |
| catalogue/practice.turtling | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/practice.vintner-trade | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ. |
| catalogue/practice.wood-turning | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| catalogue/practice.wrecking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| catalogue/region.atlantic | P | n/a | n/a | n/a | P | P | P | Corrected from AUDIT-5 (F). Referents only, passing region exception (a): a physical container with names, kind and undated geographic `part_of` only; notes carry "no row names Atlantic Ocean". `part_of` world kept, doubt in notes. |
| catalogue/region.bahamas | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents (rule b). `part_of` caribbean kept, doubt in notes. |
| catalogue/region.barbados | P | n/a | n/a | P | P | P | P | Q1 household names TWN-BAR. `part_of` lesser-antilles kept, doubt in notes. |
| catalogue/region.caribbean | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents. `part_of` atlantic kept, doubt in notes. |
| catalogue/region.england | P | n/a | n/a | n/a | P | P | P | Anchors are the referents and STL-MOR, which names England (1700 wages). STL-MOR was added by task 2970 (f001049); see Corrections. `part_of` world kept, doubt in notes. |
| catalogue/region.greater-antilles | P | n/a | n/a | n/a | P | P | P | Q6 pattern row beside the referents. `part_of` caribbean kept, doubt in notes. |
| catalogue/region.jamaica | P | **F** | n/a | n/a | P | P | P | Political `part_of` england dated from 1655 (circa). Rule (b): no anchored row states England or 1655; STL-LAW is not yet an anchor and the date is not yet null. Fix in DESIGN §4 region exception (b) not applied, so check 2 fails. |
| catalogue/region.kingston | P | P | P | P | P | P | P | Attestation `estimate` through STL-KING; date null; 1692 appears only in the note. `part_of` jamaica is geographic, doubt in notes. |
| catalogue/region.lesser-antilles | P | n/a | n/a | n/a | P | P | P | Q1 household row and referents. `part_of` caribbean kept, doubt in notes. |
| catalogue/region.nassau | P | P | P | P | P | P | P | Food row (CULTURE §6) names TWN-DIET; 1703–1718 `estimate` through the referents. `part_of` new-providence anchored on the referents. |
| catalogue/region.new-providence | P | **F** | P | P | P | P | P | Political `part_of` england from 1718 (circa): no anchored row states English rule of New Providence (TWN-ROG states the 1718 pardon, not England). Rule (b) fix (remove the `part_of` england, say so in notes) not applied, so check 2 fails. |
| catalogue/region.port-royal | P | P | P | P | P | P | P | Attestation and observations `estimate` through the referents and Q1 rows; `part_of` jamaica stated by the referents; STL-EHS and STL-PBB in notes are named by the Not found row. |
| catalogue/region.world | P | n/a | n/a | n/a | P | n/a | P | Root region; Q6 row and referents. |

## Corrections to AUDIT-5

- **region.england (AUDIT-5 "Changes since AUDIT-4").** AUDIT-5 said AUDIT-4 "read its anchors as the referents alone, but its second anchor is STL-MOR". STL-MOR was added by task 2970 (f001049, which changed `region/england.json`), after AUDIT-4 ran in task 2931. AUDIT-4 was right when it ran: the record then had the referents alone, and region.england failed on that. It passes now because of the later anchor.
- **practice.commercial-brewing (AUDIT-5 check 2 and "Changes since AUDIT-4").** AUDIT-5 said the record "now asserts `open`, not presence". The record asserts `what: presence` with `label: open` (DESIGN §1.1, unknown presence). It does not drop the presence assertion; f001049 changed only the label and the anchor.

## Changes since AUDIT-5

- Now passing: `region.atlantic` (check 1; region exception (a) in 790b004), `practice.commercial-brewing` (check 7; the DESIGN §1.1 cite is a convention, exempt under region exception (c)).
- Still failing: `region.jamaica` (check 2) and `region.new-providence` (check 2). The fixes named in DESIGN §4 region exception (b) are not in the records yet. No record was edited here.
- No new failures.

## Notes for the next round

- `region.jamaica`: add STL-LAW as a further `derived_from` anchor, set the England `part_of` date to null, and say in `notes` that the 1655 bound is in no anchored row and that STL-LAW was not opened.
- `region.new-providence`: remove the England `part_of`, and say in `notes` that English rule from 1718 waits for a source row. The geographic `part_of` bahamas stays.
- `region.atlantic`: "its kind is physical" is read as the region exception states it (the record names an ocean). The record has no kind field beyond `region`, so this reading should be confirmed at the next audit.
- Not failures, carried from AUDIT-5: `institution.governor-magistrate` and `region.england` cite row labels (`Q11`, `Q10 hours`) from the anchored STARTING_TOWN document; `institution.jewish-burial-ground` gives Hunt's Bay in its reason only.
- V6 anchor hashes are not checked here; the gate runs `fixture-drift`.

## Summary

- 66 records checked. Fails: `region.jamaica` (2), `region.new-providence` (2). No record failed check 1, 3, 4, 5, 6 or 7.
- 2 records passed that failed AUDIT-5: `region.atlantic`, `practice.commercial-brewing`.

Result: fail (region.jamaica, region.new-providence)
