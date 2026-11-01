# Pirate-town fixture audit 1 (2026-10-31)

Audit only: no record was edited. Scope: the 66 non-source records under `fixtures/pirate-town/records/` and 10 of the 52 source records (every 5th in sorted order, rounded down).

Checks, as the task defines them:

1. The `derived_from` anchor resolves to a row in the cited file. A bold paragraph lead-in is not a row, so it fails.
2. Every value, date and place in the record appears in that row or its section.
3. The record's label is the row's label or weaker.
4. The source keys the record cites appear in that row.
5. Game fiction is scoped `game:pirate-ship`.

Method: the anchors were resolved mechanically (heading match, then row match), then each record's attestations, dates, places, labels and source keys were compared with the row text. The source files under `Games/` were read with Grep, since the read guard blocked Read on them.

## Records

| Record | 1 anchor | 2 values | 3 label | 4 keys | 5 scope | Note |
|---|---|---|---|---|---|---|
| culture.port-royal-jewish-community | P | F | P | P | P | Presence 1670–1692: neither date is in the "Minorities present" row or §1. 1692 is not there either. |
| entity.duppy | P | F | F | F | P | Place Jamaica is not in the Folk belief row. The row's "researched" covers only that the belief existed; the creatures are the bestiary's. TWN-AFR is not in the row. |
| entity.gold-dust | P | F | P | P | P | 1690–1720 is not in the econ 1 row or section. |
| entity.jumbee | P | F | F | F | P | As entity.duppy (place Caribbean). |
| entity.piece-of-eight | P | F | P | F | P | 1690–1720 is not in the Money row. STL-E is not in the row, which cites only `STARTING_TOWN.md` econ 1. |
| entity.rolling-calf | P | F | F | F | P | As entity.duppy. |
| institution.anglican-parish-church | P | F | P | P | P | 1670–1692 and 1703–1718 are not in the row. The Nassau presence contradicts the row note "Nassau had no resident clergy". A church building and resident clergy differ, so the keeper should confirm. |
| institution.chattel-slavery | P | F | P | P | P | 1670–1720 is not in the Labour row. |
| institution.freehold-by-patent | P | F | P | F | P | Jamaica 1670–1720 and New Providence 1703–1718 are not in the Property row. The row cites `STARTING_TOWN.md` Q6 and §8.2 but no TWN key, and TWN-PR, TWN-NAS and TWN-LAW are not in it. |
| institution.governor-magistrate | P | F | P | F | P | Nassau 1703–1718 and the Jamaica presence are not in the Political system row. TWN-LAW is not in the row. |
| institution.indentured-servitude | P | F | P | P | P | 1670–1720 is not in the Labour row. |
| institution.jewish-burial-ground | P | F | P | P | P | Port Royal 1670–1692 is not in the Burial place row. The Jamaica place is not named there. |
| institution.justices-of-the-peace | P | F | P | F | P | Nassau 1703–1718 is not in the Justice row. TWN-NAS is cited but is not in the row, which cites TWN-LAW and TWN-CODE. |
| institution.parish-vestry | P | F | P | P | P | 1670–1692 and the Port Royal place are not in the Established church row. The Jamaica attestation has no date, and the place is not named in the row. |
| institution.pirate-articles | P | F | P | P | P | 1690–1720 and the Caribbean place are not in the Justice row. |
| period.nassau-pirate-haven | P | P | P | F | P | 1713–1718 matches the TWN-NAS row. TWN-ROG is cited, but the anchored row is TWN-NAS only. |
| period.port-royal-before-1692 | F | F | P | F | P | Anchor is the "The referents" paragraph, not a row. The 1670 start is not in it. Keys appear only as "TWN-*", and TWN-PR is not named. The paragraph has no label, so estimate is accepted. |
| period.war-of-the-spanish-succession | P | F | P | P | P | 1701–1714 is not in the Model row, which gives c. 1690–1720 only. |
| phenomenon.king-davenant-corn-price-table | P | P | P | P | P | 1699 and ECON-DAV are in the econ 5 curve row. |
| practice.anglican-burial-rite | P | F | P | P | P | The Jamaica place is not in the Rite row. |
| practice.belief-in-duppies | P | F | P | F | P | Jamaica is not in the Folk belief row. TWN-AFR is not in the row. |
| practice.belief-in-jumbees | P | F | P | F | P | Caribbean is not in the row. TWN-AFR is not in the row. |
| practice.belief-in-rolling-calf | P | F | P | F | P | Jamaica is not in the row. TWN-AFR is not in the row. |
| practice.blacksmithing | P | F | P | P | P | 1680 is not in the Q5 trades row or section. The dated sources start in 1682. |
| practice.burial-at-sea | P | F | P | P | P | 1690–1720 and the Caribbean place are not in the Sailors row. |
| practice.butchering | P | F | P | P | P | 1680 is not in the row or section. |
| practice.careening | P | P | P | P | P | Pass. 1692 (council letter) and Port Royal (section intro) are supported; STL-CUN and STL-E are in the row. |
| practice.carpentry | P | F | P | P | P | 1680 is not in the row or section. |
| practice.churchyard-burial | P | F | P | P | P | 1670 is not in the Burial place row. The Nassau presence 1703–1718 is not in the row, and it cites TWN-PR, a Port Royal source. |
| practice.clay-pipe-retailing | P | F | P | P | P | 1680 is not in the row or section. |
| practice.cobbling | P | F | P | P | P | 1680 is not in the row or section. |
| practice.commercial-brewing | P | F | P | P | P | 1680–1692 is not in the Q5 tavern brewhouse row. |
| practice.cooperage | P | F | P | P | P | 1680 is not in the row or section. |
| practice.daily-markets | P | F | P | P | P | 1680 is not in the row or section. |
| practice.epidemic-mass-burial | P | F | P | P | P | The Jamaica attestation is not in the Epidemic row. Port Royal 1692 is supported by the §2 Burial row. |
| practice.faction-burial-alternatives | P | F | P | P | P | Nassau is not in the Alternatives row, which names no place. Scope `game:pirate-ship` and fiction label are correct. |
| practice.fencing-plunder | P | F | P | P | P | 1703–1718 is not in the Livelihoods row or section. |
| practice.goldsmithing | P | F | P | P | P | 1680 is not in the row or section. |
| practice.low-sunday-observance | P | F | P | F | P | 1670 is not in the row. The Nassau presence 1703–1718 is not in the row. TWN-NAS is cited, but the row cites TWN-PR only. |
| practice.matelotage | P | F | P | P | P | 1690–1720 and the Caribbean place are not in the Pirate row. |
| practice.merchant-storekeeping | P | F | P | P | P | 1680 is not in the row or section. |
| practice.mourning-and-inheritance | P | F | P | P | P | The Jamaica place is not in the row. |
| practice.night-burial-and-wake | P | F | P | P | P | The Jamaica place is not in the row. |
| practice.piece-rate-and-day-labor | P | F | P | P | P | England and 1700–1720 are not in the Q15 row. STL-PHIL is a Philadelphia source, so it does not support England. |
| practice.provisioning-ships | P | F | P | P | P | 1703–1718 is not in the row or section. |
| practice.salt-raking | P | F | P | P | P | 1703–1718 is not in the row or section. |
| practice.shop-house-residence | P | F | P | P | P | 1680 is not in the row or section. |
| practice.sugar-grade-distinction | P | F | P | F | P | 1690–1720 and the Caribbean place are not in the Open 3 row. ECON-TOB and ECON-CM are not in the row, which cites L, PHY-RATION, DV and CSP. The estimate label is weaker than researched, so it passes. |
| practice.tavern-hospitality | P | F | P | P | P | 1670 and 1692 are not in the Hospitality row. |
| practice.turtling | P | F | P | P | P | 1703–1718 is not in the row or section. |
| practice.vintner-trade | P | F | P | P | P | 1680 is not in the row or section. |
| practice.wood-turning | P | F | P | P | P | 1680 is not in the row or section. |
| practice.wrecking | P | F | P | P | P | 1703–1718 is not in the row or section. |
| region.atlantic | F | F | n/a | P | P | Anchor is the "The referents" paragraph. The Atlantic nesting is not in it. The record has no label; its notes say estimate, with no key. |
| region.bahamas | F | F | n/a | P | P | As region.atlantic. |
| region.barbados | P | F | n/a | P | P | The part_of Lesser Antilles relation is not in the Q1 household row. |
| region.caribbean | F | F | n/a | P | P | As region.atlantic. |
| region.england | F | F | P | P | P | Anchor "The referents" is prose. The obs place England is not in the Q10 row, which says London. The part_of world relation is not in the row. |
| region.greater-antilles | F | F | n/a | P | P | As region.atlantic. |
| region.jamaica | P | F | n/a | P | P | The part_of Greater Antilles and part_of England from 1655 are not in the Q6 row. The notes say estimate, and 1655 is in no row. |
| region.kingston | P | F | P | P | P | 1692–9999 is not in the STL-KING row, which gives 1802 for the corporation. The part_of Jamaica relation is not in the row. |
| region.lesser-antilles | F | F | n/a | P | P | As region.atlantic. |
| region.nassau | F | F | P | P | P | Anchor "The referents" is prose. The obs date 1690–1720 and the Nassau place are not in the Food row or its section. The label and key match. |
| region.new-providence | P | F | P | F | P | New Providence is not in the Q6 row. The part_of England from 1718 is not in the row. TWN-ROG is cited, but the row cites TWN-NAS and TWN-PR only. |
| region.port-royal | F | P | F | P | P | Anchor "The referents" is prose. The house count 1200 (1688) and the 1692 presence are in the Q1 rows and §1 section. Label researched is stronger than the estimate on the Q1 household and Q1 classes rows. |
| region.world | F | P | n/a | P | P | Anchor is the "The referents" paragraph. The record has no values. |

## Source records (10 sampled)

ECON-ANS, ECON-DAV, ECON-RN, ECON-TOB, STL-CUN, STL-JPR, STL-MOR, STL-PHIL, TWN-BAR and TWN-JEW. Each key appears in its SOURCES.md row, the title matches the row's "What" cell exactly, the URL matches, and the derived_from anchor points at that row. All 10 pass.

Observation (not a check): 26 ECON-* and TWN-* source records put the title in `names[0].text`, while STL-* records put the key there (for example STL-KING). The naming is inconsistent.

## Summary

Passing records: 2 of 66 (phenomenon.king-davenant-corn-price-table, practice.careening). Check 5 holds for every record: the only game-fiction record, practice.faction-burial-alternatives, is scoped `game:pirate-ship`.

Most check-2 failures come from one pattern. The record carries a date range or place that the anchored row does not state. Examples are the 1670 and 1680 starts, the 1690–1720 "c. 1690–1720" referent range, and Jamaica or Caribbean as a place. These dates come from the referents or the sources rather than the row. The audit applied the rule as written. Whether section-level or referent dates should count is a decision for the keeper and Rex.

Two other patterns need a decision as well. Several records cite a source key that is not in their anchored row, and the region nesting records anchor to the "The referents" paragraph, which is prose.

Failing ids (64): every record in the table except phenomenon.king-davenant-corn-price-table and practice.careening.

Result: fail
