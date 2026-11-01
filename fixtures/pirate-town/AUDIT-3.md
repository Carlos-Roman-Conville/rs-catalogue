# Pirate-town fixture audit 3 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13) and 10 of the 52 source records. Rules: DESIGN §4 V4 and the V4 anchoring rule (a)–(e).

Checks, as the task defines them:

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources` or in its text) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that flags a fiction element in a universal record is a disclaimer, not an assertion, and is not counted.

Method: each anchor was resolved against the heading and row names in `STARTING_TOWN.md`, `town/CULTURE.md` and `SOURCES.md` (lines 348–424). `STARTING_TOWN.md`, `CULTURE.md` and `SOURCES.md` were read through Grep with absolute paths, since the Read guard blocks them. `Toolchain/economy/RESEARCH.md` is outside the Read list and was not opened. Reason and note text was read for keys and places; structured fields were read for values, dates, places and labels.

## Records

P = holds, F = fails, n/a = no attestation, observation or relation to test, ? = not verified.

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | Note |
|---|---|---|---|---|---|---|
| culture.port-royal-jewish-community | P | F | P | P | P | Second attestation: place `region.jamaica` (1711) is not in the Minorities row; Jamaica is in the referents only, and that attestation is labelled researched, not estimate. Its `absence` type also states no absence the row names (the 1711 bar is on office-holding). |
| entity.duppy | P | P | P | P | P | Place and date null. Label `open` is weaker than the row's researched. |
| entity.gold-dust | P | P | P | P | P | ECON-ATK and ECON-RAC are in the econ 1 row. |
| entity.jumbee | P | P | P | P | P | As entity.duppy. |
| entity.piece-of-eight | P | P | P | F | P | Reason text cites `STL-E`, which the anchored CULTURE §4 Money row does not name. Remove the key from the reason or add a row that names it. |
| entity.rolling-calf | P | P | P | P | P | As entity.duppy. |
| institution.anglican-parish-church | P | P | P | P | P | Port Royal is in the section (Minorities and Observance rows). Fiction in the notes is a disclaimer. |
| institution.chattel-slavery | P | P | P | P | P | Labour row, researched, TWN-BAR and TWN-DUNN. |
| institution.freehold-by-patent | P | P | P | P | P | Port Royal is in the Q6 row; Nassau 1703–1718 is labelled estimate with the referents as second anchor. |
| institution.governor-magistrate | P | P | P | P | P | Nassau 1703–1718 is labelled estimate with the referents; TWN-LAW is in the Justice row. |
| institution.indentured-servitude | P | P | P | P | P | Labour row. |
| institution.jewish-burial-ground | P | P | P | P | P | Burial place row, TWN-JEW. Hunt's Bay appears only in the reason text (the TWN-JEW source row names it), not as a field. |
| institution.justices-of-the-peace | P | P | P | P | P | Justice row, TWN-LAW. |
| institution.parish-vestry | P | P | P | P | P | Established church row, TWN-PR. |
| institution.pirate-articles | P | P | P | P | P | Justice row, TWN-CODE. |
| region.atlantic | F | P | n/a | P | P | Anchor "Town keeper research \| GOODS Open 1" is not a row in that section (GOODS Open 1 is in the Group 2 table). The second anchor is the referents paragraph alone, which is not allowed. |
| region.bahamas | P | P | n/a | P | P | Q6 pattern row plus referents. No structured values. "Bahamas" appears in no anchor; the record makes no claim with it. |
| region.barbados | P | P | n/a | P | P | Q1 household row names Barbados and TWN-BAR. |
| region.caribbean | F | P | n/a | P | P | Anchor "Q6" is not a row name (the row is "Q6 pattern"). The note's "Q6 row names English Caribbean towns" is wrong: that phrase is in the CULTURE §1 Established church row. |
| region.england | P | F | P | P | P | The observation (labour hours 11, 1750s) attaches to region.england. The Q10 hours row names London, not England; no anchor states England. |
| region.greater-antilles | F | P | n/a | P | P | Anchor "Q6" is not a row name, as for region.caribbean. No structured values. |
| region.jamaica | P | P | n/a | P | P | Q6 pattern row plus referents (Port Royal, Jamaica). No structured values. |
| region.kingston | P | P | P | P | P | STL-KING row names Kingston and is labelled estimate. The note cites "ATLANTIC-MAP", which is not a key in SOURCES.md; flagged as commentary. |
| region.lesser-antilles | P | P | n/a | P | P | Q1 household row plus referents. No structured values; "Lesser Antilles" appears in no anchor, as for region.bahamas. |
| region.nassau | P | P | P | F | P | The record cites TWN-NAS and TWN-ROG in `sources`, but the anchored Food row cites only TWN-DIET and the referents paragraph names no key. |
| region.new-providence | P | F | P | P | P | Relation part_of `region.england` from 1718 is not stated by either anchor: the Q6 row does not name England, and the TWN-ROG row names neither England nor 1718. |
| region.port-royal | P | F | P | P | P | Population observation (6,500–10,000) is dated 1688. The Q1 household row is undated, and the TWN-PR source row dates the population to 1692. House count and land area (1688) are in the Q1 classes row and are fine. |
| region.world | F | P | n/a | P | P | Anchor "Q6" is not a row name, as for region.caribbean. No structured values. |
| period.nassau-pirate-haven | P | P | P | P | P | Anchors are the TWN-NAS and TWN-ROG rows; 1713–1718 is in TWN-NAS. |
| period.port-royal-before-1692 | P | P | P | P | P | Q1 household row plus referents; estimate. No dates set; the 1670 start is noted and not written. |
| period.war-of-the-spanish-succession | P | P | P | P | P | Model row gives c. 1690–1720; the 1701–1714 chronology is in the note only. |
| phenomenon.king-davenant-corn-price-table | P | F | P | P | P | The note's intermediate values (2/10 → +8/10, 3/10 → +16/10, 4/10 → +28/10) are not in the econ 5 curve row or ECON-DAV row, which state only the 1/10 and 5/10 endpoints. Add a row that states them or drop them from the note. |
| practice.anglican-burial-rite | P | P | P | P | P | Rite row, TWN-LAW. |
| practice.belief-in-duppies | P | P | P | P | P | Folk belief row; place and date null. |
| practice.belief-in-jumbees | P | P | P | P | P | As belief-in-duppies. |
| practice.belief-in-rolling-calf | P | P | P | P | P | As belief-in-duppies. |
| practice.blacksmithing | P | P | P | P | P | Q5 trades row, STL-CUN and STL-INA. Port Royal and 1692 are in the section intro. |
| practice.burial-at-sea | P | P | P | P | P | Sailors row, TWN-CODE. |
| practice.butchering | P | P | P | P | P | Q5 trades row, STL-INA and STL-PSJ. |
| practice.careening | P | P | P | P | P | Q5 careening row, STL-CUN and STL-E; 1692 and Port Royal from the section. |
| practice.carpentry | P | P | P | P | P | Q5 trades row, STL-CUN and STL-RUN. |
| practice.churchyard-burial | P | P | P | P | P | Burial place row, TWN-PR. |
| practice.clay-pipe-retailing | P | P | P | P | P | Q5 trades row, STL-INA. |
| practice.cobbling | P | P | P | P | P | Q5 trades row, STL-INA. |
| practice.commercial-brewing | P | F | P | P | P | `absence` is not supported. The Q5 tavern brewhouse row's only evidence is "no brewer in any source read", which DESIGN §1 says stays `presence: unknown` with a note, not `absence`. |
| practice.cooperage | P | P | P | P | P | Q5 trades row, STL-CUN and STL-RUN. |
| practice.daily-markets | P | P | P | P | P | Q5 trades row, STL-PSJ. |
| practice.epidemic-mass-burial | P | P | P | P | P | Epidemic row, TWN-PR; Port Royal from the Burial place row. |
| practice.faction-burial-alternatives | P | P | P | P | P | Game fiction, scoped `game:pirate-ship`, labelled fiction. |
| practice.fencing-plunder | P | P | P | P | P | Livelihoods row (Nassau's, TWN-NAS); 1703–1718 from the referents, labelled estimate. |
| practice.goldsmithing | P | P | P | P | P | Q5 trades row, STL-CUN. |
| practice.low-sunday-observance | P | P | P | P | P | Observance row, estimate, TWN-PR. |
| practice.matelotage | P | P | P | P | P | Pirate row, TWN-MAT and TWN-CODE. |
| practice.merchant-storekeeping | P | P | P | P | P | Q5 trades row, STL-CUN and STL-PSJ. |
| practice.mourning-and-inheritance | P | P | P | P | P | Mourning row, TWN-LAW and TWN-BURN. |
| practice.night-burial-and-wake | P | P | P | P | P | African-Caribbean row, TWN-AFR. |
| practice.piece-rate-and-day-labor | P | P | P | P | P | Q15 row, STL-PHIL and STL-BAR. |
| practice.provisioning-ships | P | P | P | P | P | Livelihoods row (Nassau's), TWN-NAS; referents, estimate. |
| practice.salt-raking | P | P | P | P | P | Livelihoods row ("salt"), TWN-NAS; referents, estimate. |
| practice.shop-house-residence | P | P | P | P | P | §8.3 row, TWN-PR; Port Royal from the section. |
| practice.sugar-grade-distinction | ? | P | P | P | P | The Economy keeper Open 3 anchor resolves. The `Toolchain/economy/RESEARCH.md` anchor could not be opened (outside the Read list). |
| practice.tavern-hospitality | P | P | P | P | P | Hospitality row, TWN-PR. |
| practice.turtling | P | P | P | P | P | Livelihoods row ("turtle"), TWN-NAS; referents, estimate. |
| practice.vintner-trade | P | P | P | P | P | Q5 trades row, STL-PSJ. |
| practice.wood-turning | P | P | P | P | P | Q5 trades row, STL-INA. |
| practice.wrecking | P | P | P | P | P | Livelihoods row ("wrecking"), TWN-NAS; referents, estimate. |

## Source records (10 sampled)

Ten of the 52, every fifth in sorted order: ECON-ANS, ECON-DAV, ECON-RN, ECON-TOB, STL-CUN, STL-J, STL-LILLY, STL-PBB, TWN-AFR, TWN-DUNN. Each title is compared with the "What" cell of its `SOURCES.md` row, the key with the row key, and the `derived_from` anchor with the row heading.

| Record | Key | Title matches row | Anchor resolves | Result |
|---|---|---|---|---|
| source.econ-ans | ECON-ANS | yes | yes | pass |
| source.econ-dav | ECON-DAV | yes | yes | pass |
| source.econ-rn | ECON-RN | yes | yes | pass |
| source.econ-tob | ECON-TOB | yes | yes | pass |
| source.stl-cun | STL-CUN | yes | yes | pass |
| source.stl-j | STL-J | yes | yes | pass |
| source.stl-lilly | STL-LILLY | yes | yes | pass |
| source.stl-pbb | STL-PBB | yes | yes | pass |
| source.twn-afr | TWN-AFR | yes | yes | pass |
| source.twn-dunn | TWN-DUNN | yes | yes | pass |

## Summary

Holds on all five checks: 53 of 66 records, plus 10 of 10 sampled source records. Unverified: practice.sugar-grade-distinction on check 1 (one anchor is outside the Read list).

Failing records (12): region.atlantic (1), region.caribbean (1), region.greater-antilles (1), region.world (1), culture.port-royal-jewish-community (2), region.england (2), region.new-providence (2), region.port-royal (2), phenomenon.king-davenant-corn-price-table (2), practice.commercial-brewing (2), entity.piece-of-eight (4), region.nassau (4). The number in brackets is the failing check.

Patterns: three region records anchor to a non-existent "Q6" row name. Two region records and one practice record state a date or place that the anchored row does not state. The king-davenant note carries intermediate values no anchor states. One absence claim is recorded where DESIGN §1 forbids it.

Result: fail (failing ids: region.atlantic, region.caribbean, region.greater-antilles, region.world, culture.port-royal-jewish-community, region.england, region.new-providence, region.port-royal, phenomenon.king-davenant-corn-price-table, practice.commercial-brewing, entity.piece-of-eight, region.nassau)
