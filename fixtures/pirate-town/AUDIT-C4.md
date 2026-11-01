# AUDIT-C4: V4 source audit of the economy ingest (units C1–C3)

Auditor: Haiku unit 5047 (did not write the records). Scope: the 23 records touched by commits 7dd892b (C1),
3de7fcb (C2) and 4ac27cd (C3). Anchors checked against `../economy/RESEARCH.md` only (the file in this unit's
Read list). Anchors into `pirate-ship` files (`STARTING_TOWN.md`, `SOURCES.md`, `CULTURE.md`) were not opened;
where a check depends on one, it is marked **U** (unverified here) and does not by itself fail a record.

Checks (DESIGN §4 V4): (1) the anchored row exists; (2) every value, date and place is in the row (or the row's
section, rule (a)); (3) the label is the row's or weaker; (4) cited source keys are named by an anchored row
(rule (c)); (5) fiction scoped `game:pirate-ship` (none of these 23 carries fiction); (6) anchoring and nesting per §4.

Reading applied: a bound comes from the anchored section (rule (a)); a source key must be named in an anchored
table row, not in prose elsewhere in the section (rule (c)). Prose bullets with bold lead-ins are not anchors
(rule (b)).

| id | 1 | 2 | 3 | 4 | 5 | 6 | note |
|---|---|---|---|---|---|---|---|
| practice.bricklaying | P | P | P | P | P | P | §2 "House and ship carpenter, bricklayer, mason": 5–6 s/day, Pennsylvania 1698, researched, ECON-THO |
| practice.carpentry | P | U | P | U | P | P | 1698 wage row P. Attestation 1682–1692 Port Royal: 1692 end is referent window (estimate, referents anchor present); 1682 start rests on STARTING_TOWN Q5 row (U); STL-CUN and STL-RUN named by Q5 row (U) |
| practice.harvest-labour | P | P | P | P | P | P | §2 "Harvest labourer": 3–4 s/day with diet, Pennsylvania 1698 |
| practice.masonry | P | P | P | P | P | P | §2 mason row: 5–6 s/day, Pennsylvania 1698 |
| practice.seafaring | P | P | P | P | P | P | §2 Royal Navy row (24 s and 19 s a lunar month, England 1653–1797); merchant seaman row (25 s a month, Britain, 18th c., estimate) |
| practice.shoemaking | P | P | P | P | P | P | §2 "Journeyman shoemaker": 2 s a pair, Pennsylvania 1698 |
| practice.tailoring | P | P | P | P | P | P | §2 "Journeyman tailor": about 12 s a week with board, Pennsylvania 1698 |
| region.britain | P | P | P | P | P | P | Named by §2 merchant seaman row ("Britain, 18th c."); no relation; no observation |
| region.jamaica | P | **F** | P | P | P | P | Wage 20–30 £/year: §2 row says "later 18th c.", record writes 1700–1799 century (1700 start stated by no anchor; "later" lost). Relations: undated part_of greater-antilles noted per nesting rule; part_of england political, date null, STL-LAW anchor (U). Label researched ≤ row's "researched, late" |
| region.pennsylvania | P | P | P | P | P | P | Named by §2 house-carpenter row |
| region.port-royal | P | U | **F** | U | P | P | Wage "comparable to those in England", 1680–89: row is "researched, **unverified**", record label is "researched" (stronger than the row). Other observations and attestation rest on STARTING_TOWN Q1 and referents anchors (U). part_of jamaica: referents name "Port Royal, Jamaica" |
| entity.gold-dust | **F** | – | P | **F** | P | P | No RESEARCH.md anchor: §3 "Gold dust was a trade good…" is a bold-lead prose bullet, not a row (rule (b)). Observation 1721–1723 vs §3 "in the 1720s" (1721–23 from SOURCES row, U). ECON-ATK/ECON-RAC named only in §3 prose (rule (c)) |
| entity.piece-of-eight | **F** | **F** | P | **F** | P | P | No RESEARCH.md anchor: §3 "Pieces of eight were the currency" is prose (rule (b)). Values 4 s, 5 s, 6 s, 4 s 6 d and 1704 are in §3 prose; the 1759 repeal end-bound is in no RESEARCH text. ECON-BOJ/ECON-ANS named only in §3 prose (rule (c)). STL-E and CULTURE §4 (U) |
| material.pearl | **F** | – | – | – | P | P | No RESEARCH.md anchor: §3 "Pearls were a fished commodity…" is prose (rule (b)). Other checks not reached |
| phenomenon.king-davenant-corn-price-table | P | P | P | **F** | P | P | Five values (+3/10 … +45/10 as 0.3 … 4.5) match the §1 table rows 1/10–5/10; 1699 is stated in §1. ECON-DAV appears in the §1 paragraph but in no anchored table row (rule (c)). STARTING_TOWN anchor (U) |
| region.gold-coast | **F** | – | – | – | P | P | No RESEARCH.md anchor: "Gold Coast" appears only in §3 prose (rule (b)). Region exception (a) does not apply: it is not a sea, ocean or island group |
| region.pearl-coast | **F** | – | – | – | P | P | No RESEARCH.md anchor: "Pearl Coast" appears only in §3 prose (rule (b)). Region exception (a) does not apply |
| practice.charcoal-making | P | P | P | P | P | P | §5 "Wood → charcoal": 35–40 bushels a cord, 18th–19th c. (1700–1899 century), researched, ECON-HOF |
| practice.flour-milling | P | P | P | P | P | P | §5 "Wheat → flour": 5–5½ bushels to a 196-lb barrel, researched (late), ECON-TJ (row also names FL, not cited) |
| practice.rum-distilling | P | P | P | P | P | P | §5 "Molasses → rum": 1.5 gal molasses per gal rum (estimate, ECON-WES); 0.77 gal per gal, New England 1770 (estimate, ECON-CMT) |
| practice.salt-curing | P | P | P | P | P | P | §5 "Pork, beef → salt meat": 2 bushels per 1,000 lb (estimate, ECON-SALT); 2 bushels per barrel herring (estimate, ECON-SMI) |
| practice.tobacco-cultivation | P | P | P | P | P | P | §5 "Tobacco": 1,710 lb a worker 1680–99 (researched, ECON-TOB); 3 acres a worker (researched, ECON-CM); 570 lb an acre (estimate, row's derivation) |
| region.new-england | P | P | P | P | P | P | Named by §5 "Molasses → rum" row ("New England 1770"); no part_of; notes say no row states its container |

**Failing records (8):** region.jamaica (check 2); region.port-royal (check 3); entity.gold-dust (checks 1, 4 and
2 for the 1721–1723 bound, which the RESEARCH text does not give); entity.piece-of-eight (checks 1, 2, 4);
material.pearl (check 1); phenomenon.king-davenant-corn-price-table (check 4); region.gold-coast (check 1);
region.pearl-coast (check 1).

**Not verified here (U), for the next auditor who may open the pirate-ship files:** the STARTING_TOWN Q1, Q5 and
referents anchors (carpentry, port-royal, jamaica), the SOURCES.md key rows (STL-LAW, STL-CUN, STL-RUN, TWN-*,
ECON-ATK 1721–23, ECON-BOJ 1759), and CULTURE §4.

**Not edited:** no record was changed (task rule). Fixes for the failing records belong to a follow-up unit.

Result: fail
Failing ids: region.jamaica, region.port-royal, entity.gold-dust, entity.piece-of-eight, material.pearl, phenomenon.king-davenant-corn-price-table, region.gold-coast, region.pearl-coast
