# Pirate-town fixture audit 4 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13) and 10 of the 52 source records. Rules: DESIGN §4 V4, the V4 anchoring rule (a)–(e) and the V4 nesting rule. This audit follows AUDIT-3 and reads the records after the fixes of 2929 (region nest) and 2930 (non-region re-anchor).

Checks, as the task defines them:

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources`, in its reason or in its note) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that disclaims a fiction element in a universal record is not counted.
6. Every region except `region.world` has a `part_of` parent. The nesting relation itself is kept with its doubt in `notes` (rule d); it is not failed for lacking a row.

Method: anchors were resolved against `STARTING_TOWN.md` (town and settlement and economy research tables, lines 85–148), `town/CULTURE.md` (whole file), `SOURCES.md` (every `TWN-*`, `ECON-*` and `STL-*` row) and `Toolchain/economy/RESEARCH.md` (section 4 and section 5 headings and rows). The Games files were read through Grep with absolute paths. No subagent was used. Source-key checks were made against the rows named in each record's `derived_from`. Anchor hashes (V6) are not checked here; the gate runs `fixture-drift`.

P = holds, F = fails, n/a = no attestation, observation or relation to test.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | Note |
|---|---|---|---|---|---|---|---|
| culture.port-royal-jewish-community | P | P | P | P | P | n/a | Jamaica attestation is now `estimate` with the referents as a second anchor; the AUDIT-3 fail is resolved. |
| entity.duppy | P | P | P | P | P | n/a | Place and date null. |
| entity.gold-dust | P | P | P | P | P | n/a | ECON-ATK and ECON-RAC are named in the econ 1 row. |
| entity.jumbee | P | P | P | P | P | n/a | As entity.duppy. |
| entity.piece-of-eight | P | P | P | P | P | n/a | STL-E is now named by the anchored SOURCES row; the AUDIT-3 fail is resolved. |
| entity.rolling-calf | P | P | P | P | P | n/a | As entity.duppy. |
| institution.anglican-parish-church | P | P | P | P | P | n/a | Port Royal is in the section (Minorities and Observance rows). Fiction in notes is a disclaimer. |
| institution.chattel-slavery | P | P | P | P | P | n/a | Labour row, researched, TWN-BAR and TWN-DUNN. |
| institution.freehold-by-patent | P | P | P | P | P | n/a | Port Royal in the Q6 row; Nassau 1703–1718 is `estimate` with the referents. |
| institution.governor-magistrate | P | P | P | P | P | n/a | Nassau 1703–1718 is `estimate` with the referents; TWN-LAW is in the Justice row. |
| institution.indentured-servitude | P | P | P | P | P | n/a | Labour row. |
| institution.jewish-burial-ground | P | P | P | P | P | n/a | Burial place row, TWN-JEW. Hunt's Bay appears only in the reason text. |
| institution.justices-of-the-peace | P | P | P | P | P | n/a | Justice row; TWN-LAW and TWN-CODE both named there. |
| institution.parish-vestry | P | P | P | P | P | n/a | Established church row, TWN-PR. |
| institution.pirate-articles | P | P | P | P | P | n/a | Justice row, TWN-CODE. |
| period.nassau-pirate-haven | P | P | P | P | P | n/a | 1713–1718 is in the TWN-NAS row; the TWN-ROG row names the Crown's return. SOURCES rows carry no label. |
| period.port-royal-before-1692 | P | P | P | P | P | n/a | No date field; `estimate` through the referents. The 1670 start is disclaimed in the note, not written. |
| period.war-of-the-spanish-succession | P | P | P | P | P | n/a | The Model row states c. 1690–1720 and names TWN-NAS and TWN-ROG. |
| phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | 1699 and the +3/10 to +45/10 steps are in the econ 5 curve row. |
| practice.anglican-burial-rite | P | P | P | P | P | n/a | Rite row, TWN-LAW. |
| practice.belief-in-duppies | P | P | P | P | P | n/a | Folk belief row, TWN-AFR. |
| practice.belief-in-jumbees | P | P | P | P | P | n/a | As duppies. |
| practice.belief-in-rolling-calf | P | P | P | P | P | n/a | As duppies. |
| practice.blacksmithing | P | P | P | P | P | n/a | Q5 trades row (smith's shop); 1682 is Hanson's date, 1692 the referent bound. |
| practice.burial-at-sea | P | P | P | P | P | n/a | Sailors row, TWN-CODE. |
| practice.butchering | P | P | P | P | P | n/a | Q5 trades row, STL-INA and STL-PSJ. |
| practice.careening | P | P | P | P | P | n/a | Q5 careening row, 20 June 1692, STL-CUN and STL-E. |
| practice.carpentry | P | P | P | P | P | n/a | Q5 trades row, STL-CUN and STL-RUN. |
| practice.churchyard-burial | P | P | P | P | P | n/a | Burial place row, TWN-PR. |
| practice.clay-pipe-retailing | P | P | P | P | P | n/a | Q5 trades row (pipe shop), STL-INA. |
| practice.cobbling | P | P | P | P | P | n/a | Q5 trades row, STL-INA. |
| practice.commercial-brewing | P | **F** | P | P | P | n/a | Asserts `presence` of a commercial brewer. The Q5 tavern brewhouse row states "none" (researched, negative). The note itself says presence unknown. Fix the attestation, not the row. |
| practice.cooperage | P | P | P | P | P | n/a | Q5 trades row, STL-CUN and STL-RUN. |
| practice.daily-markets | P | P | P | P | P | n/a | Q5 trades row, STL-PSJ. |
| practice.epidemic-mass-burial | P | P | P | P | P | n/a | Epidemic row, TWN-PR, 1692. |
| practice.faction-burial-alternatives | P | P | P | P | P | n/a | `game:pirate-ship`, label fiction, as the Alternatives row. |
| practice.fencing-plunder | P | P | P | P | P | n/a | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| practice.goldsmithing | P | P | P | P | P | n/a | Q5 trades row, STL-CUN. |
| practice.low-sunday-observance | P | P | P | P | P | n/a | Observance row, TWN-PR; `estimate` matches the row. |
| practice.matelotage | P | P | P | P | P | n/a | Pirate row, TWN-MAT and TWN-CODE. |
| practice.merchant-storekeeping | P | P | P | P | P | n/a | Q5 trades row, STL-CUN and STL-PSJ. |
| practice.mourning-and-inheritance | P | P | P | P | P | n/a | Mourning row, TWN-LAW and TWN-BURN. |
| practice.night-burial-and-wake | P | P | P | P | P | n/a | African-Caribbean row, TWN-AFR. |
| practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | Q15 row, STL-PHIL and STL-BAR. |
| practice.provisioning-ships | P | P | P | P | P | n/a | Livelihoods row, TWN-NAS; Nassau through the referents. |
| practice.salt-raking | P | P | P | P | P | n/a | Livelihoods row, TWN-NAS. |
| practice.shop-house-residence | P | P | P | P | P | n/a | §8.3 row, TWN-PR. Port Royal is stated by the section's referents paragraph, not by the row. |
| practice.sugar-grade-distinction | P | P | P | P | P | n/a | Anchor "Open 3" resolves to RESEARCH §4 "Open 3, grain of goods" (prefix match). The keys econ-tob and econ-cm are named only by the tobacco row (RESEARCH §5); the sugar claim rests on L, PHY-RATION, DV and CSP, which have no source record. Passes by the letter; the sources should be corrected. |
| practice.tavern-hospitality | P | P | P | P | P | n/a | Hospitality row, TWN-PR. |
| practice.turtling | P | P | P | P | P | n/a | Livelihoods row, TWN-NAS; `estimate`. |
| practice.vintner-trade | P | P | P | P | P | n/a | Q5 trades row, STL-PSJ. |
| practice.wood-turning | P | P | P | P | P | n/a | Q5 trades row, STL-INA. |
| practice.wrecking | P | P | P | P | P | n/a | Livelihoods row, TWN-NAS; `estimate`. |
| region.atlantic | **F** | n/a | n/a | n/a | P | P | Anchored on the referents paragraph alone; rule (b) forbids that. The nesting `part_of` world is kept, doubt in notes. |
| region.bahamas | P | n/a | n/a | n/a | P | P | Q6 row and referents. `part_of` caribbean is kept, doubt in notes. |
| region.barbados | P | n/a | n/a | P | P | P | Q1 household row names TWN-BAR. `part_of` lesser-antilles is kept, doubt in notes. |
| region.caribbean | P | n/a | n/a | n/a | P | P | Q6 row and referents. `part_of` atlantic is kept, doubt in notes. |
| region.england | **F** | n/a | n/a | n/a | P | P | Anchored on the referents paragraph alone (rule b); the referents do not name England. `part_of` world is kept, doubt in notes. |
| region.greater-antilles | P | n/a | n/a | n/a | P | P | Q6 row and referents. `part_of` caribbean is kept, doubt in notes. |
| region.jamaica | P | **F** | n/a | n/a | P | P | `part_of` england is dated from 1655. No anchored row states 1655 or England (rule a); the date and place are unanchored. |
| region.kingston | P | P | P | **F** | P | P | Attestation is `estimate` by the STL-KING row. The note cites "ATLANTIC-MAP", which no anchored row names. `part_of` jamaica is kept, doubt in notes. |
| region.lesser-antilles | P | n/a | n/a | n/a | P | P | Q1 household row and referents. `part_of` caribbean is kept, doubt in notes. |
| region.nassau | P | P | P | P | P | P | Diet observation: Food row (CULTURE §6), TWN-DIET named there, 1703–1718 `estimate` through the referents. `part_of` new-providence is anchored on the referents. |
| region.new-providence | P | **F** | P | P | P | P | `part_of` england is dated from 1718. The 1718 bound is in the TWN-NAS row, but England is in no anchored row (rule a). The relation is political, not nesting. |
| region.port-royal | P | P | P | P | P | P | Attestation `estimate` through the referents; observations from the Q1 classes and Q1 household rows; `part_of` jamaica stated by the referents. |
| region.world | P | n/a | n/a | n/a | P | n/a | Root region; Q6 row and referents. |

## Source records (10 of 52, evenly chosen)

Title and key checked against the `SOURCES.md` row of the same key.

| Record | SOURCES.md row | Title and key |
|---|---|---|
| source.econ-ans | ECON-ANS | P: title and key match. |
| source.econ-dav | ECON-DAV | P: title and key match. |
| source.econ-rn | ECON-RN | P: title and key match. |
| source.econ-tob | ECON-TOB | P: title and key match. |
| source.stl-dhp | STL-DHP | P: title and key match. |
| source.stl-jpr | STL-JPR | P: title and key match. |
| source.stl-mor | STL-MOR | P: title and key match. |
| source.stl-phil | STL-PHIL | P: title and key match. |
| source.twn-bar | TWN-BAR | P: title and key match. |
| source.twn-law | TWN-LAW | P: title and key match. |

## Summary

- 66 records checked. Fails: `region.atlantic` (1), `region.england` (1), `region.jamaica` (2), `region.kingston` (4), `region.new-providence` (2), `practice.commercial-brewing` (2). No record failed check 3, 5 or 6.
- 10 source records checked; all match.
- Notes for the next round, not failures: `practice.sugar-grade-distinction` cites the tobacco keys for a sugar claim; `practice.shop-house-residence` takes its place from the section's referents rather than its row.

Result: fail (region.atlantic, region.england, region.jamaica, region.kingston, region.new-providence, practice.commercial-brewing)
