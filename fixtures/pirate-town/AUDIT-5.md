# Pirate-town fixture audit 5 (2026-11-01)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` (culture 1, entity 5, institution 9, period 3, phenomenon 1, practice 34, region 13) and 10 of the 52 source records. Rules: DESIGN §4 V4, the V4 anchoring rule (a)–(e) and the V4 nesting rule. This audit follows AUDIT-4 and reads the records after the fixes of 2970 (f001049, AUDIT-4 region and practice anchors) and 2971 (91913af, unknown-presence note).

Checks, as the task defines them:

1. The `derived_from` anchor resolves to a row (or the referents paragraph beside a row) in the cited file.
2. Every value, date and place in the record's structured fields is in that row or section, or is the referent window labelled `estimate` with the referents paragraph as a second anchor.
3. The record's label is the row's label or weaker.
4. Every source key the record cites (in `sources`, in its reason or in its note) appears in an anchored row.
5. Game fiction is scoped `game:pirate-ship`. A note that disclaims a fiction element in a universal record is not counted.
6. Every region except `region.world` has a `part_of` parent. The nesting relation itself is kept with its doubt in `notes` (rule d); it is not failed for lacking a row.
7. (check 7) No note or reason names a key or document that no anchored row names. Counted: source keys (`TWN-*`, `STL-*`, `ECON-*`, GOODS keys, `ATLANTIC-*`), and documents (any file, such as `DESIGN §1.1`, `TOWNS.md`). Not counted: row labels inside an anchored document (`Q11`, `Q10 hours`), the rule names (`V4 nesting rule`), and people (`Rex`), because they are not keys or documents.

Method: anchors were resolved against `STARTING_TOWN.md` (lines 85–148), `town/CULTURE.md` (whole file), `SOURCES.md` (lines 340–430) and `Toolchain/economy/RESEARCH.md` (section 4 and section 5 rows). Each of the 66 records was read whole. No subagent was used. Anchor hashes (V6) are not checked here; the gate runs `fixture-drift`.

P = holds, F = fails, n/a = no attestation, observation or relation to test.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | 6 nesting | 7 check 7 names | Note |
|---|---|---|---|---|---|---|---|---|
| culture.port-royal-jewish-community | P | P | P | P | P | n/a | P | Minorities row names TWN-JEW and the 1711 bar; Jamaica from the referents as estimate. |
| entity.duppy | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR named by the SOURCES anchor. |
| entity.gold-dust | P | P | P | P | P | n/a | P | ECON-ATK and ECON-RAC named in the econ 1 row. |
| entity.jumbee | P | P | P | P | P | n/a | P | As entity.duppy. |
| entity.piece-of-eight | P | P | P | P | P | n/a | P | Money row (CULTURE §4) and STL-E row. |
| entity.rolling-calf | P | P | P | P | P | n/a | P | As entity.duppy. |
| institution.anglican-parish-church | P | P | P | P | P | n/a | P | Established church row names TWN-PR and `istj-m`; fiction in notes is a disclaimer. |
| institution.chattel-slavery | P | P | P | P | P | n/a | P | Labour row, TWN-BAR and TWN-DUNN. Game inclusion left open in notes. |
| institution.freehold-by-patent | P | P | P | P | P | n/a | P | Q6 pattern names TWN-PR and TWN-NAS; Nassau 1703–1718 is `estimate` with the referents. |
| institution.governor-magistrate | P | P | P | P | P | n/a | P | TWN-NAS and TWN-ROG in the Political system row; TWN-LAW in the Justice row. Note cites STARTING_TOWN Q11, a row label in the referents section, not counted. |
| institution.indentured-servitude | P | P | P | P | P | n/a | P | Labour row. |
| institution.jewish-burial-ground | P | P | P | P | P | n/a | P | Burial place row, TWN-JEW. Hunt's Bay is in the reason text only (Minorities row); not a structured field. |
| institution.justices-of-the-peace | P | P | P | P | P | n/a | P | Justice row; TWN-LAW and TWN-CODE named there. |
| institution.parish-vestry | P | P | P | P | P | n/a | P | Established church row, TWN-PR. |
| institution.pirate-articles | P | P | P | P | P | n/a | P | Justice row, TWN-CODE. |
| period.nassau-pirate-haven | P | P | P | P | P | n/a | P | 1713–1718 in the TWN-NAS row; TWN-ROG anchored. |
| period.port-royal-before-1692 | P | P | P | P | P | n/a | P | No date field; `estimate` through the referents. 1670 is disclaimed in the note. |
| period.war-of-the-spanish-succession | P | P | P | P | P | n/a | P | Model row states c. 1690–1720, names TWN-NAS and TWN-ROG. "Standard chronology" is a note, not a document. |
| phenomenon.king-davenant-corn-price-table | P | P | P | P | P | n/a | P | 1699 and the +3/10 to +45/10 steps in the econ 5 curve row; ECON-DAV named there. |
| practice.anglican-burial-rite | P | P | P | P | P | n/a | P | Rite row, TWN-LAW. |
| practice.belief-in-duppies | P | P | P | P | P | n/a | P | Folk belief row; TWN-AFR via the SOURCES anchor. |
| practice.belief-in-jumbees | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| practice.belief-in-rolling-calf | P | P | P | P | P | n/a | P | As belief-in-duppies. |
| practice.blacksmithing | P | P | P | P | P | n/a | P | Q5 trades row names STL-CUN and STL-INA; 1682 is Hanson's date, 1692 the referent bound (settlement section cites the referents). |
| practice.burial-at-sea | P | P | P | P | P | n/a | P | Sailors row, TWN-CODE. |
| practice.butchering | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA and STL-PSJ. |
| practice.careening | P | P | P | P | P | n/a | P | Q5 careening row, 20 June 1692, STL-CUN and STL-E. |
| practice.carpentry | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. |
| practice.churchyard-burial | P | P | P | P | P | n/a | P | Burial place row, TWN-PR. |
| practice.clay-pipe-retailing | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| practice.cobbling | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| practice.commercial-brewing | P | P | P | P | P | n/a | **F** | Label is `open`, so no presence is asserted (fixed since AUDIT-4). Note cites `DESIGN §1.1`, a document no anchored row names. Fix: remove the cite, or name the rule in an anchored row. |
| practice.cooperage | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-RUN. |
| practice.daily-markets | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ. |
| practice.epidemic-mass-burial | P | P | P | P | P | n/a | P | Epidemic row, TWN-PR, 1692. |
| practice.faction-burial-alternatives | P | P | P | P | P | n/a | P | `game:pirate-ship`, label fiction, as the Alternatives row; Holy Order, Free Pirates, cults, Atlanteans, Ghost Fleet all named there. |
| practice.fencing-plunder | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau 1703–1718 `estimate` with the referents. |
| practice.goldsmithing | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN. |
| practice.low-sunday-observance | P | P | P | P | P | n/a | P | Observance row, TWN-PR; `estimate` matches the row. |
| practice.matelotage | P | P | P | P | P | n/a | P | Pirate row, TWN-MAT and TWN-CODE. |
| practice.merchant-storekeeping | P | P | P | P | P | n/a | P | Q5 trades row, STL-CUN and STL-PSJ. |
| practice.mourning-and-inheritance | P | P | P | P | P | n/a | P | Mourning row, TWN-LAW and TWN-BURN. |
| practice.night-burial-and-wake | P | P | P | P | P | n/a | P | African-Caribbean row, TWN-AFR. |
| practice.piece-rate-and-day-labor | P | P | P | P | P | n/a | P | Q15 row, STL-PHIL and STL-BAR. |
| practice.provisioning-ships | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; Nassau through the referents. |
| practice.salt-raking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS. |
| practice.shop-house-residence | P | P | P | P | P | n/a | P | §8.3 row, TWN-PR. |
| practice.sugar-grade-distinction | P | P | P | P | P | n/a | P | "Open 3" resolves by prefix to RESEARCH §4 "Open 3, grain of goods"; L, PHY-RATION, DV and CSP are named there. The tobacco keys are gone from the record. |
| practice.tavern-hospitality | P | P | P | P | P | n/a | P | Hospitality row, TWN-PR. |
| practice.turtling | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| practice.vintner-trade | P | P | P | P | P | n/a | P | Q5 trades row, STL-PSJ. |
| practice.wood-turning | P | P | P | P | P | n/a | P | Q5 trades row, STL-INA. |
| practice.wrecking | P | P | P | P | P | n/a | P | Livelihoods row, TWN-NAS; `estimate`. |
| region.atlantic | **F** | n/a | n/a | n/a | P | P | P | Anchored on the referents paragraph alone; no row names Atlantic Ocean, so rule (b) fails it (carried from AUDIT-4). `part_of` world kept, doubt in notes. |
| region.bahamas | P | n/a | n/a | n/a | P | P | P | Q6 pattern and referents. `part_of` caribbean kept, doubt in notes. |
| region.barbados | P | n/a | n/a | P | P | P | P | Q1 household names TWN-BAR. `part_of` lesser-antilles kept, doubt in notes. |
| region.caribbean | P | n/a | n/a | n/a | P | P | P | Q6 pattern and referents. `part_of` atlantic kept, doubt in notes. |
| region.england | P | n/a | n/a | n/a | P | P | P | Corrected from AUDIT-4. Anchors are the referents and STL-MOR, which names England (1700). The nesting edge to world is the referents plus the naming row (V4 nesting rule). |
| region.greater-antilles | P | n/a | n/a | n/a | P | P | P | Q6 pattern and referents. `part_of` caribbean kept, doubt in notes. |
| region.jamaica | P | **F** | n/a | n/a | P | P | P | `part_of` england dated from 1655. No anchored row states 1655 or England (rule a), so the date and place are unanchored (carried from AUDIT-4). |
| region.kingston | P | P | P | P | P | P | P | Corrected from AUDIT-4. `ATLANTIC-MAP` is gone from the record; the STL-KING attestation is `estimate`. `part_of` jamaica kept, doubt in notes. |
| region.lesser-antilles | P | n/a | n/a | n/a | P | P | P | Q1 household row and referents. `part_of` caribbean kept, doubt in notes. |
| region.nassau | P | P | P | P | P | P | P | Diet observation: Food row (CULTURE §6), TWN-DIET named there, 1703–1718 `estimate` through the referents. `part_of` new-providence anchored on the referents. |
| region.new-providence | P | **F** | P | P | P | P | P | `part_of` england dated from 1718. The 1718 bound is in the TWN-NAS row; England is in no anchored row (rule a) (carried from AUDIT-4). |
| region.port-royal | P | P | P | P | P | P | P | Attestation `estimate` through the referents; observations from the Q1 classes and Q1 household rows; `part_of` jamaica stated by the referents. |
| region.world | P | n/a | n/a | n/a | P | n/a | P | Root region; Q6 row and referents. |

## Source records (10 of 52, evenly chosen)

Chosen by sorting the 52 source files by name and taking every 5.2nd (indices 0, 5, 10, 15, 20, 26, 31, 36, 41, 46). Title and key checked against the `SOURCES.md` row of the same key.

| Record | SOURCES.md row | Title and key |
|---|---|---|
| source.econ-ans | ECON-ANS | P: title and key match. |
| source.econ-dav | ECON-DAV | P: title and key match. |
| source.econ-rn | ECON-RN | P: title and key match. |
| source.econ-tob | ECON-TOB | P: title and key match. |
| source.stl-csp | STL-CSP | P: title and key match. |
| source.stl-jpr | STL-JPR | P: title and key match. |
| source.stl-mor | STL-MOR | P: title and key match. |
| source.stl-phil | STL-PHIL | P: title and key match. |
| source.twn-bar | TWN-BAR | P: title and key match. |
| source.twn-jew | TWN-JEW | P: title and key match. |

## Changes since AUDIT-4

- Resolved: `region.kingston` (check 4 and check 7; `ATLANTIC-MAP` is no longer in any record); `region.england` (check 1; AUDIT-4 read its anchors as the referents alone, but its second anchor is STL-MOR, which names England); `practice.commercial-brewing` (check 2; the record now asserts `open`, not presence).
- Carried: `region.atlantic` (check 1), `region.jamaica` (check 2), `region.new-providence` (check 2).
- New: `practice.commercial-brewing` (check 7; the note cites `DESIGN §1.1`).

## Summary

- 66 records checked. Fails: `region.atlantic` (1), `region.jamaica` (2), `region.new-providence` (2), `practice.commercial-brewing` (7). No record failed check 3, 4, 5 or 6.
- 10 source records checked; all match.
- Not failures, noted for the next round: `institution.governor-magistrate` and `region.england` cite row labels (`Q11`, `Q10 hours`) from the anchored STARTING_TOWN document; `institution.jewish-burial-ground` gives Hunt's Bay in its reason only.
- V6 anchor hashes are not checked here; the gate runs `fixture-drift`.

Result: fail (region.atlantic, region.jamaica, region.new-providence, practice.commercial-brewing)
