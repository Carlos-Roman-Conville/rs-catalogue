# AUDIT-C4-2: V4 source audit of the economy ingest (units C1–C3), second run

Auditor: Sonnet unit 5087 (did not write the records). Redo of AUDIT-C4 (5047), which marked six records F on anchors
it could not open. Scope: the 23 records touched by commits 7dd892b (C1), 3de7fcb (C2) and 4ac27cd (C3). Rules
applied: DESIGN §4 V4 rules (a)–(e), nesting rule, exceptions (a)–(k) as amended by `C4-RULINGS.md`; INGEST-PLAN (b)
"Anchors" (money bullets anchor on SOURCES.md "Economy sources" rows).

Every anchor was opened: RESEARCH.md §1, §2, §3, §5 rows; SOURCES.md rows ECON-ANS, BOJ, ATK, RAC, WAR, DAV, STL-E,
STL-LAW, STL-CUN, STL-RUN, TWN-PR, TWN-BAR, TWN-DUNN; STARTING_TOWN.md rows The referents, Q1 household / classes /
farm, Q5 trades present, Q6 pattern, Not found, econ 1, econ 5 curve; CULTURE.md §4 Money. No U was needed.

Checks (V4): (1) anchored row exists; (2) every value, date, place is in the row (or its section, rule (a)); (3)
label is the row's or weaker; (4) cited source keys appear in an anchored row (rule (c)); (5) fiction scoped
`game:pirate-ship` (none of the 23 carries fiction, so P throughout); (6) anchoring and nesting per §4.

| id | 1 | 2 | 3 | 4 | 5 | 6 | note |
|---|---|---|---|---|---|---|---|
| practice.bricklaying | P | P | P | P | P | P | §2 row 1: 5s–6s a day, Pennsylvania 1698, researched, ECON-THO |
| practice.carpentry | P | P | P | P | P | P | §2 row 1 wage; note "constantly" is in the row. Attestation 1682–1692: 1682 is the Q5 row's (Hanson 1682, STL-CUN, exception (h)); 1692 is the referent window, so `estimate` with the referents anchor present (exception (d)). STL-CUN and STL-RUN both named by the Q5 row |
| practice.harvest-labour | P | P | P | P | P | P | §2 "Harvest labourer": 3s–4s a day with diet, Pennsylvania 1698 |
| practice.masonry | P | P | P | P | P | P | §2 row 1, same row as bricklaying |
| practice.seafaring | P | P | P | P | P | P | §2 RN row: 24s and 19s a lunar month, England 1653 to 1797, researched, ECON-RN. Merchant row: about 25s a month, Britain, 18th c. (century, circa), `estimate`, low, ECON-RED |
| practice.shoemaking | P | P | P | P | P | P | §2 "Journeyman shoemaker": 2s a pair, men's or women's |
| practice.tailoring | P | P | P | P | P | P | §2 "Journeyman tailor": about 12s a week with board |
| region.britain | P | P | P | P | P | P | Named by the merchant seaman row; no relation; notes say no row states its container (nesting rule) |
| region.jamaica | P | P | P | P | P | P | Wage £20–30 a year with keep: row says "later 18th c.", record is 1700–1799, century, circa, qualifier verbatim in note: exception (j). `researched`, low, "EKU thesis not opened": exception (k). Relations: `part_of` greater-antilles undated and noted (nesting rule); `part_of` england `date: null`, notes name the relation, say the 1655 bound is in no anchored row and STL-LAW was not opened, and the STL-LAW row exists and states English law in Jamaica: exception (b). The Q6 pattern anchor is unused by any value but exists and matches greater-antilles' own anchors |
| region.pennsylvania | P | P | P | P | P | P | Named by §2 house-carpenter row; no relation, notes say so |
| region.port-royal | P | P | P | P | P | P | Wage "comparable to those in England", 1680s (decade), `researched`, low, "page not opened": exception (k). The Q1 observations and the 1692 attestation were not changed by C1; rows Q1 household / classes / farm / Not found / referents all exist and carry 1688 (600 + 600 houses, 53 acres), 6,500–10,000 in 1692, TWN-PR, TWN-BAR, TWN-DUNN, STL-EHS, STL-PBB. `part_of` jamaica: referents name "Port Royal, Jamaica" |
| entity.gold-dust | P | P | P | P | P | P | Anchor ECON-ATK (SOURCES, Economy sources): "a shilling or two over or under 4l. a Troy Ounce", voyage 1721–23, Gold Coast; row's class is `history`, summary, so researched / medium holds. ECON-RAC is named by the second anchor, the econ 1 row (names ECON-BOJ, ANS, ATK, WAR, RAC), which also supports "goods, not coin" |
| entity.piece-of-eight | P | P | P | P | P | P | ECON-BOJ row: 1681 Act, Spanish and Mexican 5s, Peruvian 4s, repealed 1759, Jamaica. ECON-ANS row: 1704 proclamation, 6s full weight against 4s 6d sterling, Act of 1707. The ANS observation's note "the plantations" is not in the SOURCES row (it is RESEARCH §3 prose); it is in `note` only, `place` is null, so no place is claimed; flag for the keeper, not a failure. Attestation: CULTURE §4 Money row (coin scarce, barter common) and STL-E row (wages in pieces of eight a voyage) |
| material.pearl | P | P | P | P | P | P | ECON-WAR row: "the crown's fifth", Pearl Coast, `not opened (review only)`; record 0.2, place pearl-coast, `date: null`, researched, low |
| phenomenon.king-davenant-corn-price-table | P | P | P | P | P | P | RESEARCH §1 table rows 1/10…5/10 exist: +3/10, +8/10, +16/10, +28/10, +45/10 = 0.3, 0.8, 1.6, 2.8, 4.5. 1699 stated in §1 and the ECON-DAV row. ECON-DAV is named by the second anchor, STARTING_TOWN econ 5 curve ("Davenant 1699 (ECON-DAV)"), so rule (c) holds |
| region.gold-coast | P | P | P | P | P | P | "Gold Coast" is in the ECON-ATK row (the anchor); name and kind only; no relation; notes say no row states its container |
| region.pearl-coast | P | P | P | P | P | P | "Pearl Coast" is in the ECON-WAR row (the anchor); same shape |
| practice.charcoal-making | P | P | P | P | P | P | §5 "Wood → charcoal": 35–40 bushels a cord, 18th–19th c. (1700–1899, century), researched, ECON-HOF |
| practice.flour-milling | P | P | P | P | P | P | §5 "Wheat → flour": 5–5½ bushels to a 196-lb barrel, researched, late, ECON-TJ (FL named by the row, not cited) |
| practice.rum-distilling | P | P | P | P | P | P | §5 "Molasses → rum": 1.5 gal per gal (ECON-WES, estimate, no period citation); 0.77, New England 1770 (ECON-CMT, estimate) |
| practice.salt-curing | P | P | P | P | P | P | §5 "Pork, beef → salt meat": 2 bushels per 1,000 lb pork (ECON-SALT); 2 bushels a barrel of herring (ECON-SMI); both `estimate` |
| practice.tobacco-cultivation | P | P | P | P | P | P | §5 "Tobacco": 1,710 lb a worker 1680–99 (ECON-TOB); 3 acres a worker (ECON-CM); 570 lb an acre `estimate`, the row's derivation |
| region.new-england | P | P | P | P | P | P | Named by the §5 "Molasses → rum" row ("New England 1770"); no relation; notes say so |

AUDIT-C4's six anchoring and source-key failures clear on the corrected reading: the money records anchor on the
SOURCES.md Economy sources rows (INGEST-PLAN (b)), which AUDIT-C4 did not open; gold-coast and pearl-coast are named
in those rows; king-davenant's ECON-DAV is named by its STARTING_TOWN econ 5 curve anchor. Its jamaica and port-royal
failures were withdrawn by 5086 (exceptions (j), (k)).

**Not edited:** no record was changed. AUDIT-C4.md is left as 5047's record.

Result: pass
