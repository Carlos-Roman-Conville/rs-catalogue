# AUDIT-H1-5b: re-audit of the X5 records (commit 511114b) as they stand at HEAD, after the 5310 and 5311 fixes (task 5312)

Written 2026-11-01 by task 5312 (Haiku). The auditor wrote neither SHEET-3.md, the X5 records, the 5310 and 5311 fixes, nor
AUDIT-H1-5. This pass edits no record.

## Method

- **Rows.** `git show 511114b --name-only` lists 19 files; the commit adds 124 rows (27 attestations, 97 observations),
  numbered 1 to 124 in that file order, then array order. Row n here is the same row as in AUDIT-H1-5. The content audited
  is the HEAD content (after 5310 and 5311), not the X5 content. HEAD differs from X5 only in the reasons of rows 50, 60
  and 120, and in the `sources` of rows 73, 122, 123 and 124 (`git diff 511114b HEAD -- data`).
- **Sample rule (this unit).** The rows are the union of four sets:
  1. the three fixed rows of AUDIT-H1-5 (50 arable 1300, 60 sown 1420, 120 tax 1379);
  2. observation 28 (population 1250, U1), which AUDIT-H1-5 left unaudited;
  3. the open rows 73, 122, 123 and 124;
  4. every seventh row counted from row 1 (rows 1, 8, 15, ..., 113, that is n = 7k + 1), skipping rows AUDIT-H1-5 already
     checked. The AUDIT-H1-5 rows are 10, 20, ..., 120; of the every-seventh rows only 50 and 120 are among them, and both
     are already in set 1. So set 4 is rows 1, 8, 15, 22, 29, 36, 43, 57, 64, 71, 78, 85, 92, 99, 106 and 113 (16 rows).

  That is 24 rows: 3 + 1 + 4 + 16. Across this unit and AUDIT-H1-5, 34 of the 124 rows have now been audited.
- **Checks per row.** V = value and unit against the source (open rows: value null, unit as the sheet gives it).
  D = date (bounds, precision, year-start, per rulings (f) and (g)). L = label, confidence level and reason against
  ruling (a), ruling (c) for open rows and DESIGN-V4 (k): the reason must name its grounds in words a reader can check,
  not "as above", "as the arable rows" or a SHEET-2 or SHEET-3 row pointer. C = place, `sources` (and the source
  record's `url`), `note` (locator and the source's own qualifiers only, ruling (a)) and `benchmark_role`
  (observations `development` as SHEET-3 gives; attestations none). 24 rows x 4 checks = 96 checks.
- **Reading the sources.** WebFetch returned the two PDFs as binary (it saved each file). The text was extracted from those
  saved copies with pypdf (`python -I`, read-only, no copy of the PDF was made outside the tool-results folder). The
  Wikipedia pages and the two blogs were read through WebFetch. A WebFetch page longer than 100,000 characters was read
  only to 100,000 characters; the rows that depend on such a page say so below.
- **Ruling (c) and open rows.** The rule asks that an open row's reason name each cited work, the parts read, and that the
  full text was read. A reason that names fewer works than its `sources`, or that says "pages read" or "pages searched",
  fails L for an open row.

## What the sources say (read this session)

- **CAT-BCKOVL-2010-WP21 (CAGE WP 21), PDF p. 51 = printed p. 50, Table 16** "English population, 1250-1700": 1250 4.23;
  1290 4.75; 1300 4.73; 1450 1.90; 1650 5.31 (millions). Source line: "Medieval period: based on manorial tenants (see text);
  Wrigley et al. (1997), interpolated using Wrigley and Schofield (1989)". After 1541 the text says the same (PDF p. 24).
- **WP 21, PDF p. 33 = printed p. 33, Table 1** "English arable land use (millions of acres)": 1270 total arable 11.52;
  1300 total sown 7.40, total arable 11.52; 1420 total sown 4.51, total arable 7.76; 1650 total sown 7.87, total arable
  9.79; 1700 total sown 7.76, total arable 9.70. Source line: "Overton and Campbell (1996: Tables III, V); Campbell et al.
  (1996); Medieval Accounts Database; Early Modern Probate Inventory Database; Holderness (1989); Overton (1996)."
- **WP 21, PDF p. 52 = printed p. 51, Table 17** "Growth of English GDP per capita, 1270-1700": 1450/59 - 1480/89 -0.44;
  1553/59 - 1600/09 0.12 (per cent per year).
- **WP 21, PDF p. 54 = printed p. 53, Table 18** "English GDP in current prices (£ million)": row 1600 "20.0 23.0"; row
  1688 "50.8 43.3 50.1"; column headings extracted as "This paper / Snooks / Mayhew / Annual data" (the extraction does not
  show which heading sits over which number). Source line: "See text; Snooks (1995: 50), Mayhew (1995: 58)."
- **WP 21, PDF p. 56 = printed p. 55, Table 19** "Population (mlns)" column, row "1300/09 4.72".
- **WP 21, PDF p. 20** (text, not a table): the urban share of the population 1490-1700 is taken from "Malanima (2009)".
  Over the whole extracted text (63 PDF pages) no urban-share value is printed.
- **WP 21, PDF pp. 24 and 28** (text): GDP per capita is shown in Figure 10 (index 1700 = 100); no GDP per head level is printed
  in the text or the tables searched.
- **CAT-CLARK-EARN-2011 (Measuring Worth), PDF p. 31 = Table 17, decades 1200s to 1600s**: 1300 nominal 1.74, real 1,154;
  1400 nominal 3.98; 1450 nominal 4.43. Columns: Nominal Earnings, Consumer Prices, Real Earnings (£, 2010 for real).
  **PDF p. 32**: 1600 nominal 8.87, real 1,511; 1650 nominal 12.41, real 1,537.
- **Black Death in England (Wikipedia)**: lead, "by summer 1349 it covered the entire country, before dying down by
  December"; body, "reached England in June 1348"; the Weymouth seaman "from Gascony in June 1348"; Grey Friars "shortly before
  the Feast of St. John the Baptist on 24 June 1348"; "around 8 May" if the chronicle records the first outbreak; London
  "autumn 1348"; "By March 1349 ... southern England"; York "May 1349"; "By December 1349, conditions were returning to
  near normal"; "a figure of 40–60% of the population is widely accepted" (with Russell, Ziegler, Goldberg, Benedictow
  named elsewhere on the page); "The 1471 outbreak 'took as much as 10–15 per cent of the population'" (no other author
  named for this sentence in the text read).
- **Hundred Years' War (Wikipedia)**: infobox "24 May 1337 – 19 October 1453 (intermittent)"; the Lancastrian section:
  England kept "the Pale of Calais ... until the Siege of Calais in 1558". First 100,000 of 307,469 characters read.
- **Enclosure (Wikipedia)**: "the first enclosure by act of Parliament 'was in 1604' ... 'was for Radipole, Dorset'". No
  share of land enclosed before 1604 or before 1700. The only England-wide figure is 1604 to 1914, "approximately one fifth".
  **First 100,000 of 151,770 characters read; the last 51,770 were not read.**
- **Inclosure Acts (Wikipedia)**: "Between 1604 and 1914 over 5,200 individual acts ... affecting 28,000 km2"; "Enclosure acts
  for small areas had been passed sporadically since the 12th century"; no share before 1604 or 1700. Read in full (no
  truncation note).
- **History of taxation in the United Kingdom (Wikipedia)**: 1692 "the Parliament of England introduced its national land tax";
  window tax "Taxation (No. 3) Act 1695", "a flat-rate house tax of 2 shillings per house"; no crown or total revenue figure
  for 1270-1700 in the text read. **First 100,000 of 149,927 characters read.**
- **History of the English fiscal system (Wikipedia)**: the only total-revenue-like figure for 1270-1700 read is "Elizabeth's
  first Parliament voted her two fifteenths and tenths plus a subsidy, or, taking the usual values, £160,000" (1558-59, a
  combined grant, not a crown revenue series). **First 100,000 of 156,003 characters read.**
- **Peasants' Revolt (Wikipedia)**, poll tax section: "the tax only raised £18,600 – far short of the £50,000 that had been
  hoped for"; "the Crown returned to Parliament in 1379 to request further funds"; "A second poll tax was approved" (the page
  does not state the year of the second poll tax).
- **Who had access to common land? (CAMPOP blog, CAT-CAMPOP-COMMON-2025)**: "In 1500, perhaps 50 percent of England and Wales
  was common land." No enclosure share before 1700.
- **The first urban society (CAMPOP blog, CAT-CAMPOP-URBAN-2024)**: London share in 1600 and 1700 in text; the England urban
  chart "divided into its rural and urban components" is an image; no England urban-share value in the text.
- **British Economic Growth, 1270-1870 (medievalists.net, CAT-MEDIEVALISTS-2010)**: "We find English per capita income growth of
  0.20 per cent per annum between 1270 and 1700"; no GDP per head level for 1270-1700 in the article.
- **Demography of England (Wikipedia, cited by the reasons of rows 28, 29 and 36 but not a record source)**: population table
  1250 4,230,000; 1290 4,750,000; 1450 1,900,000; 1650 5,310,000; no 1300 row. First 100,000 of 115,335 characters read.

## Checks

Row n = X5 row n (Method). Sheet id = SHEET-3 Table 1. "Record" = the observation or attestation in `data/`.

| id | row (sheet id) | record | check | pass/fail | what the source says / finding |
|---|---|---|---|---|---|
| R1-V | 1 (U79) | institution/black-death-in-england, presence | V: Black Death arrival, Weymouth seaman | pass | "a seaman who arrived at Weymouth, Dorset, from Gascony in June 1348". Matches SHEET-3. |
| R1-D | 1 (U79) | | D: 1348-06 to 1349-12, month | pass | "reached England in June 1348"; "By December 1349, conditions were returning to near normal". Month precision (ruling (g)). |
| R1-L | 1 (U79) | | L: researched, low; Wikipedia, secondary, first 100,000 characters or WebFetch summary | pass | Secondary source, low holds. The reason's "or" hedges the reading (Remark 4). |
| R1-C | 1 (U79) | | C: place, source CAT-WIKI-BLACKDEATHENG (url opened), note "whole country by summer 1349" | pass | Lead: "by summer 1349 it covered the entire country". Note locator and dates match. No role (attestation). |
| R8-V | 8 (U115) | institution/enclosure-england, presence | V: first enclosure by act, Radipole | pass | "was for Radipole, Dorset". |
| R8-D | 8 (U115) | | D: 1604 to 1604, year | pass | "was in 1604". |
| R8-L | 8 (U115) | | L: researched, low; "Wikipedia, secondary; first 100,000 characters read" | pass | Enclosure page is 151,770 characters; the first 100,000 were read, which the reason states. |
| R8-C | 8 (U115) | | C: place, CAT-WIKI-ENCLOSURE, note "Radipole, Dorset (CAT-WIKI-ENCLOSURE text). 1604. First enclosure by act of Parliament." | pass | Locator and quoted words match. |
| R15-V | 15 (U121) | institution/english-taxation, presence | V: window tax, flat house tax of 2 shillings plus window charges | pass | "a flat-rate house tax of 2 shillings per house" and window charges. |
| R15-D | 15 (U121) | | D: 1695 to 1695, year | pass | "Taxation (No. 3) Act 1695". |
| R15-L | 15 (U121) | | L: researched, low; first 100,000 characters read | pass | Page is 149,927 characters; the first 100,000 were read, as stated. |
| R15-C | 15 (U121) | | C: place, CAT-WIKI-TAXUK, note "Flat house tax of 2 shillings per house plus window charges (CAT-WIKI-TAXUK text). 1695." | pass | Matches. |
| R22-V | 22 (U93) | institution/hundred-years-war, presence | V: England held Calais (Pale of Calais) | pass | "only the Pale of Calais remaining under its control on the continent until the Siege of Calais in 1558". |
| R22-D | 22 (U93) | | D: from null (open start, ruling (f)) to 1558, year | pass | The page ends England's hold on Calais at the 1558 siege; no start is given, so the open start is right. |
| R22-L | 22 (U93) | | L: researched, low; first 100,000 characters read | pass | The Lancastrian-phase sentence is within the first 100,000 characters (307,469 in all). |
| R22-C | 22 (U93) | | C: place, CAT-WIKI-HYW, note "England held Calais until the Siege of Calais (CAT-WIKI-HYW text). to 1558 (the page does not call it a loss)." | pass | Matches the page. |
| R28-V | 28 (U1) | region/england, observation population.total | V: 4230000 persons | pass | Table 16, PDF p. 51: 1250 4.23 million. Converted correctly. Demography table also prints 4,230,000 (Remark 6). |
| R28-D | 28 (U1) | | D: 1250 to 1250, year | pass | Table 16 row 1250. |
| R28-L | 28 (U1) | | L: researched, medium; reason "modern reconstruction, secondary (medieval: manorial tenants; Wrigley et al. 1997 interpolated with Wrigley and Schofield 1989 from 1541) ..." | pass | Table 16's source line gives manorial tenants and Wrigley et al. (1997) interpolated with Wrigley and Schofield (1989); the 1541 break is in the text. Grounds named. |
| R28-C | 28 (U1) | | C: place, CAT-BCKOVL-2010-WP21 (url opened), note "Table 16 A, p. 50 (PDF p. 51), 1250", **benchmark_role** | **fail** | The note and source match. The record has no `benchmark_role`; SHEET-3 U1 gives `development` (fix F1). AUDIT-H1-5 Remark 1 found the same gap. |
| R29-V | 29 (U2) | region/england, observation population.total | V: 4750000 persons | pass | Table 16, PDF p. 51: 1290 4.75 million. |
| R29-D | 29 (U2) | | D: 1290 to 1290, year | pass | Table 16 row 1290. |
| R29-L | 29 (U2) | | L: researched, medium; same reason as R28 | pass | As R28-L. Demography table prints 4,750,000 for 1290 (uncited, Remark 6). |
| R29-C | 29 (U2) | | C: place, source, note "Table 16 A, p. 50 (PDF p. 51), 1290", role development | pass | Locator matches; role present. |
| R36-V | 36 (U9) | region/england, observation population.total | V: 1900000 persons | pass | Table 16, PDF p. 51: 1450 1.90 million. |
| R36-D | 36 (U9) | | D: 1450 to 1450, year | pass | Table 16 row 1450. |
| R36-L | 36 (U9) | | L: researched, medium; same reason as R28 | pass | As R28-L. Demography table prints 1,900,000 for 1450 (uncited, Remark 6). |
| R36-C | 36 (U9) | | C: place, source, note "Table 16 A, p. 50 (PDF p. 51), 1450", role development | pass | Matches. |
| R43-V | 43 (U16) | region/england, observation population.total | V: 4720000 persons, decade 1300/09 | pass | Table 19, PDF p. 56: "1300/09 4.72" under "Population (mlns)". |
| R43-D | 43 (U16) | | D: 1300 to 1309, year | pass | The source gives the interval 1300/09; both bounds are years, so precision `year` (ruling (g)). |
| R43-L | 43 (U16) | | L: researched, medium; reason "as above; this is the table's decade column (Table 19 'Population (mlns)'), a separate series from Table 16 ..." | **fail** | The column is correctly named, but the grounds for `medium` are "as above", which names no grounds a reader can check (the same standard as AUDIT-H1-5 fix 3). The reason must state the grounds itself (fix F2). |
| R43-C | 43 (U16) | | C: place, source, note "Table 19, p. 55 (PDF p. 56), 1300/09: 4.72 million", role development | pass | Locator matches. |
| R50-V | 50 (U23) | region/england, observation land.arable-area | V: 11520000 acres | pass | Table 1, PDF p. 33: total arable 1300 11.52 million acres. |
| R50-D | 50 (U23) | | D: 1300 to 1300, year | pass | Table 1 row 1300. |
| R50-L | 50 (U23) | | L: researched, medium; reason "modern reconstruction, secondary; printed in million acres; a different working paper from CAGE WP 35 (2010), whose Table 1 gives 11.52 for 1270 and 1300" | pass | Grounds named (Table 1 sources, Overton and Campbell). CAT-BCKOVL-2010 is CAGE WP 35 (title, record). Table 1 gives 11.52 for 1270 and 1300. The AUDIT-H1-5 fix 1 wording holds. |
| R50-C | 50 (U23) | | C: place, source, note "Table 1, last column 'Total arable', 1300 (CAT-BCKOVL-2010-WP21)", role development | pass | Last column is total arable (7.40 4.13 11.52). |
| R57-V | 57 (U30) | region/england, observation land.arable-area | V: 9700000 acres | pass | Table 1, PDF p. 33: total arable 1700 9.70. |
| R57-D | 57 (U30) | | D: 1700 to 1700, year | pass | Table 1 row 1700. |
| R57-L | 57 (U30) | | L: researched, medium; reason "modern reconstruction, secondary; printed in million acres; the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35 ..." | **fail** | The reason cites SHEET-2 T1, a sheet row a reader of the catalogue cannot check. This is AUDIT-H1-5 fix 1, which was applied to row 50 (1300) but not to this row (1700), which has the same sentence (fix F3). |
| R57-C | 57 (U30) | | C: place, source, note "Table 1, last column 'Total arable', 1700", role development | pass | Locator matches. |
| R60-V | 60 (U33) | region/england, observation land.sown-area | V: 4510000 acres | pass | Table 1, PDF p. 33: total sown 1420 4.51 million acres. |
| R60-D | 60 (U33) | | D: 1420 to 1420, year | pass | Table 1 row 1420. |
| R60-L | 60 (U33) | | L: researched, medium; reason "modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)" | pass | The Table 1 source line names Overton and Campbell (1996) and the Medieval Accounts Database. AUDIT-H1-5 fix 2 applied. |
| R60-C | 60 (U33) | | C: place, source, note "Table 1, 'Total sown', 1420", role development | pass | Locator matches. |
| R64-V | 64 (U37) | region/england, observation land.sown-area | V: 7870000 acres | pass | Table 1, PDF p. 33: total sown 1650 7.87 million acres. |
| R64-D | 64 (U37) | | D: 1650 to 1650, year | pass | Table 1 row 1650. |
| R64-L | 64 (U37) | | L: researched, medium; reason "as the arable rows" | **fail** | Names no grounds; it points to other records in words a reader cannot check. AUDIT-H1-5 fix 2 was applied to row 60 only; this row has the same reason (fix F4). |
| R64-C | 64 (U37) | | C: place, source, note "Table 1, 'Total sown', 1650", role development | pass | Locator matches. |
| R71-V | 71 (U44) | region/england, observation gdp.nominal | V: 50800000 pounds (current prices), 1688 | pass | Table 18, PDF p. 54: row 1688 "50.8 43.3 50.1", £ million. The first number is the one taken; which column it sits in is not shown (ruling (a), low, Remark 3). |
| R71-D | 71 (U44) | | D: 1688 to 1688, year | pass | Table 18 row 1688. |
| R71-L | 71 (U44) | | L: researched, low; reason states the column doubt | pass | Low matches the doubt the extraction leaves open. The reason is written in the first person (Remark 3). |
| R71-C | 71 (U44) | | C: place, source, note "Table 18, p. 53 (PDF p. 54), 1688", role development | pass | Locator matches. |
| R73-V | 73 (U46) | region/england, observation gdp.per-head | V: value null, unit "1990 international dollars or pounds (unread)" | pass | Value null (ruling (c)). Searched WP 21 (Figure 10 is an index, not a level) and the medievalists.net summary: no level for 1270-1700. |
| R73-D | 73 (U46) | | D: date null | pass | Open row; the sheet has `open`. |
| R73-L | 73 (U46) | | L: open, low; reason names WP 21 Table 17 and Fig. 10 and says "the level is not in the pages read" | **fail** | Ruling (c) asks the reason to name each cited work (here `sources` lists CAT-BCKOVL-2010-WP21 and CAT-MEDIEVALISTS-2010; the reason names only the first), the parts read, and that the full text was read. "The pages read" does neither. The reason also points to "(SHEET-2 note)", a sheet row a reader cannot check (fix F6). |
| R73-C | 73 (U46) | | C: place, sources (CAT-BCKOVL-2010-WP21, CAT-MEDIEVALISTS-2010), note (none), **benchmark_role** absent | **fail** | Sources match what 5311 cites and both were opened. The role is missing; SHEET-3 U46 gives `development` (fix F5). |
| R78-V | 78 (U51) | region/england, observation gdp.per-head-growth | V: -0.44 per cent per year | pass | Table 17, PDF p. 52: 1450/59 - 1480/89 -0.44. |
| R78-D | 78 (U51) | | D: 1450 to 1489, year | pass | Interval 1450/59 - 1480/89 as two year bounds (ruling (g), `year`), as R80 in AUDIT-H1-5. |
| R78-L | 78 (U51) | | L: researched, medium; "modern reconstruction, secondary; real GDP per capita, output side" | pass | Table 17 caption "Growth of English GDP per capita"; the text says the series is built from the output side (PDF p. 2). |
| R78-C | 78 (U51) | | C: place, source, note "Table 17, p. 51 (PDF p. 52), 1450/59 - 1480/89", role development | pass | Locator matches. |
| R85-V | 85 (U58) | region/england, observation wage.real-earnings | V: 1154 pounds of 2010 per year, decade 1300 | pass | Clark Table 17, PDF p. 31: 1300 real 1,154; the real column is headed "(£, 2010)". |
| R85-D | 85 (U58) | | D: 1300 to 1309, decade | pass | Decade column, as R90 in AUDIT-H1-5. |
| R85-L | 85 (U58) | | L: researched, medium; reason "as above" | **fail** | "as above" names no grounds a reader can check (the AUDIT-H1-5 standard). The same grounds as row 92 are available: the reason must state them (fix F7). |
| R85-C | 85 (U58) | | C: place, source, note "CAT-CLARK-EARN-2011 Table 17, PDF p. 31, 1300: Real earnings 1,154", role development | pass | Locator matches. |
| R92-V | 92 (U65) | region/england, observation wage.annual-earnings | V: 4.43 pounds per year, decade 1450 | pass | Clark Table 17, PDF p. 31: 1450 nominal 4.43. The `unit` carries a writer aside (Remark 5). |
| R92-D | 92 (U65) | | D: 1450 to 1459, decade | pass | Decade column. |
| R92-L | 92 (U65) | | L: researched, medium; "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)" | pass | The reason names the series and says it was not read in full. The mix is described in the paper (PDF pp. 7-9). |
| R92-C | 92 (U65) | | C: place, source, note "CAT-CLARK-EARN-2011 Table 17, PDF p. 31, 1450: Annual Earnings 4.43", role development | pass | Locator matches. |
| R99-V | 99 (U72) | region/england, observation wage.real-earnings | V: 1511 pounds of 2010 per year, decade 1600 | pass | Clark Table 17, PDF p. 32: 1600 real 1,511. |
| R99-D | 99 (U72) | | D: 1600 to 1609, decade | pass | Decade column. |
| R99-L | 99 (U72) | | L: researched, medium; reason "as above" | **fail** | As R85-L (fix F8). |
| R99-C | 99 (U72) | | C: place, source, note "CAT-CLARK-EARN-2011 Table 17, PDF p. 32, 1600: Real earnings 1,511", role development | pass | Locator matches. |
| R106-V | 106 (U80) | region/england, observation plague.mortality-share | V: "0.40 to 0.60" fraction of population | pass | "a figure of 40–60% of the population is widely accepted". The value is stored as a string (Remark 7). |
| R106-D | 106 (U80) | | D: 1348 to 1349, year | pass | SHEET-3 U80 "1348-49 (calendar not stated)". |
| R106-L | 106 (U80) | | L: researched, low; "Wikipedia reporting other authors (cited through, rule a) ... the page's own pre-plague population range is 3 to 7 million" | pass | The page attributes the range to other authors (Russell, Ziegler, Goldberg, Benedictow). The pre-plague clause does not bear on this row (Remark 8), but it does not make the reason wrong. |
| R106-C | 106 (U80) | | C: place, source, note "'a figure of 40-60% of the population is widely accepted'", role development | pass | Quote matches. |
| R113-V | 113 (U87) | region/england, observation plague.mortality-share | V: "0.10 to 0.15" fraction, 1471 | pass | "The 1471 outbreak 'took as much as 10–15 per cent of the population'". |
| R113-D | 113 (U87) | | D: 1471 to 1471, year | pass | "The 1471 outbreak" (calendar not stated, as SHEET-3 U87). |
| R113-L | 113 (U87) | | L: researched, low; reason "Wikipedia reporting other authors (cited through, rule a) ..." (copied from row 106) | **fail** | The reason says the figure is cited through other authors; the text read gives the 1471 sentence without naming any author, so the stated grounds are not shown. The pre-plague clause is about another figure. The reason was copied from row 106 and does not state this row's grounds (fix F9). |
| R113-C | 113 (U87) | | C: place, source, note "CAT-WIKI-BLACKDEATHENG 'as much as 10-15 per cent of the population'", role development | pass | Quote matches the page. |
| R120-V | 120 (U118) | region/england, observation tax.yield | V: 18600 pounds | pass | "only raised £18,600 – far short of the £50,000 that had been hoped for". |
| R120-D | 120 (U118) | | D: 1379 to 1379, year | pass | The page does not state the year; it places the tax after the Crown's 1379 request. The reason says so (AUDIT-H1-5 fix 3, applied). |
| R120-L | 120 (U118) | | L: researched, low; reason "Wikipedia, secondary; the year is not stated in the poll tax section and is placed after the Crown's 1379 request to Parliament; hoped for £50,000" | pass | The grounds are named and match the page. AUDIT-H1-5 fix 3 is present word for word. |
| R120-C | 120 (U118) | | C: place, source, note "CAT-WIKI-PEASANTS poll tax section: 'only raised £18,600'", role development | pass | Quote matches. |
| R122-V | 122 (U122) | region/england, observation tax.crown-revenue | V: value null, unit "pounds" | pass | Value null (ruling (c)). No crown revenue total for 1270-1700 in the text read (Remark 9). |
| R122-D | 122 (U122) | | D: date null | pass | Open row. |
| R122-L | 122 (U122) | | L: open, low; reason "no opened work gives English crown revenue for any year in 1270-1700 (TAXUK page read has none before 1799) ..." | **fail** | The reason names one of the two cited works (CAT-WIKI-FISCAL is not named), says no parts read in full, and is contradicted in part: the fiscal page gives £160,000 for 1558-59 (a combined grant, not a single tax), which the reason does not address (fix F11). The TAXUK page was read to 100,000 of 149,927 characters. |
| R122-C | 122 (U122) | | C: place, sources (CAT-WIKI-FISCAL, CAT-WIKI-TAXUK), note (none), **benchmark_role** absent | **fail** | The two sources match what 5311 cites and both were opened. The role is missing; SHEET-3 U122 gives `development` (fix F10). |
| R123-V | 123 (U123) | region/england, observation urban.share | V: value null, unit "fraction" | pass | Value null (ruling (c)). Whole extracted WP 21 text searched: no urban-share value. |
| R123-D | 123 (U123) | | D: date null | pass | Open row. |
| R123-L | 123 (U123) | | L: open, low; reason "WP 21 text says the urban share series for 1490-1700 is from Malanima (2009) but prints no value in the pages searched; the 1300 4.0 and 1700 13.2 per cent in SHEET-2 T26 ..." | **fail** | The WP 21 statement is right (PDF p. 20), but the reason says "pages searched" (not full text read), does not name CAT-CAMPOP-URBAN-2024 (in `sources`), and points to a SHEET-2 row a reader cannot check (fix F13). |
| R123-C | 123 (U123) | | C: place, sources (CAT-CAMPOP-URBAN-2024, CAT-BCKOVL-2010-WP21), note (none), **benchmark_role** absent | **fail** | Sources match what 5311 cites and both were opened. The role is missing; SHEET-3 U123 gives `development` (fix F12). |
| R124-V | 124 (U124) | region/england, observation enclosure.share | V: value null, unit "fraction" | pass | Value null (ruling (c)). No share before 1604 or 1700 found in the text read. |
| R124-D | 124 (U124) | | D: date null | pass | Open row. |
| R124-L | 124 (U124) | | L: open, low; reason "neither Wikipedia page gives a share before 1604" | **fail** | Ruling (c): the reason does not name CAT-CAMPOP-COMMON-2025, which is in `sources` (its 1500 common-land figure is not an enclosure share), and does not say the full text was read. The Enclosure page was read to 100,000 of 151,770 characters (fix F15). |
| R124-C | 124 (U124) | | C: place, sources (CAT-CAMPOP-COMMON-2025, CAT-WIKI-ENCLOSURE, CAT-WIKI-INCLOSURE), note (none), **benchmark_role** absent | **fail** | Sources match what 5311 cites and all three were opened. The role is missing; SHEET-3 U124 gives `development` (fix F14). |

## Result

Of 96 checks, 15 fail, in 11 rows. Five are a missing `benchmark_role` (C, rows 28, 73, 122, 123, 124). Ten are L
checks: six reasons that name no grounds, use "as above" or a sheet pointer, or copy another row's reason (rows 43, 57, 64,
85, 99, 113); and four open-row reasons that do not name every cited work or say the full text was read (rows 73, 122,
123, 124). Rows 1, 8, 15, 22, 29, 36, 50, 60, 71, 78, 92, 106 and 120 pass every check.

AUDIT-H1-5b fail 15/96

Fixes (copy word for word into the fix task). Change no other field. Each fix is applied to the record named; the
wording is the one the audit proposes, and the writer must confirm any grounds it states against the source before writing.

F1. In `data/region/england.json`, observation `population.total` with date 1250 (value 4230000), add the field
`"benchmark_role": "development"` (R28-C; SHEET-3 U1).

F2. In `data/region/england.json`, observation `population.total` with date 1300 to 1309 (value 4720000), confidence
`reason`: replace `as above; this is the table's decade column` with `modern reconstruction, secondary (the WP 21 population
series, manorial tenants and Wrigley et al. 1997, as Table 16 is sourced); this is the table's decade column`. The writer
must first confirm the Table 19 series is the same series as Table 16 (WP 21 PDF pp. 23-24); the source line on PDF p. 56
does not name one. (R43-L)

F3. In `data/region/england.json`, observation `land.arable-area` with date 1700 (value 9700000), confidence `reason`:
replace `the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35, this is a different working paper (WP 21) whose
Table 1 gives the same 1270 row` with `a different working paper from CAGE WP 35 (2010), whose Table 1 gives 11.52 for 1270
and 1300`. (R57-L; the AUDIT-H1-5 fix 1 text, applied to this row.)

F4. In `data/region/england.json`, observation `land.sown-area` with date 1650 (value 7870000), confidence `reason`: replace
`as the arable rows` with `modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval
Accounts Database)`. (R64-L; the AUDIT-H1-5 fix 2 text, applied to this row.)

F5. In `data/region/england.json`, observation `gdp.per-head` with value null, add the field
`"benchmark_role": "development"` (R73-C; SHEET-3 U46).

F6. In `data/region/england.json`, observation `gdp.per-head` (open), confidence `reason`: replace `the level is not in the
pages read` with `the full text of CAGE WP 21 (CAT-BCKOVL-2010-WP21) and the medievalists.net summary (CAT-MEDIEVALISTS-2010)
were read, and neither gives a level for 1270-1700`; replace `(SHEET-2 note), not opened this session` with `(CAT-BCKOVL-2010
Table 24, not opened this session)`. The first replacement is true only if the writer reads WP 21 in full; the auditor's
search covered the whole extracted text, which is not the writer's reading. (R73-L)

F7. In `data/region/england.json`, observation `wage.real-earnings` with date 1300 to 1309 (value 1154), confidence
`reason`: replace `as above` with `Clark's series, secondary; mixes day-wage building and farm series by period (not read in
full)`. (R85-L)

F8. In `data/region/england.json`, observation `wage.real-earnings` with date 1600 to 1609 (value 1511), confidence `reason`:
replace `as above` with `Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)`.
(R99-L)

F9. In `data/region/england.json`, observation `plague.mortality-share` with date 1471 (value "0.10 to 0.15"), confidence
`reason`: replace `Wikipedia reporting other authors (cited through, rule a); authors differ so each is its own row; the
page's own pre-plague population range is 3 to 7 million` with `Wikipedia, secondary; the page gives the 1471 figure in its
own words and names no other author for it`. The writer must confirm the page names no other author for this sentence. (R113-L)

F10. In `data/region/england.json`, observation `tax.crown-revenue` (open), add the field `"benchmark_role": "development"`
(R122-C; SHEET-3 U122).

F11. In `data/region/england.json`, observation `tax.crown-revenue` (open), confidence `reason`: replace `TAXUK page read has
none before 1799` with `the Wikipedia pages CAT-WIKI-TAXUK and CAT-WIKI-FISCAL were read in full and give no English crown
revenue total for any year from 1270 to 1700; the fiscal page's 1558-59 figure of £160,000 is a combined grant of two
fifteenths and tenths plus a subsidy, not a crown revenue total`. The writer must read both pages in full or say how much
was read. (R122-L)

F12. In `data/region/england.json`, observation `urban.share` (open), add the field `"benchmark_role": "development"`
(R123-C; SHEET-3 U123).

F13. In `data/region/england.json`, observation `urban.share` (open), confidence `reason`: replace `prints no value in the
pages searched` with `prints no urban-share value in the full text, which was read`; replace `the 1300 4.0 and 1700 13.2 per
cent in SHEET-2 T26 came from CAT-BCKOVL-2010, not re-opened here` with `CAT-CAMPOP-URBAN-2024 (London share 1600 and 1700
only; the England chart is an image with no values in the text) was also read in full`. The first replacement needs the
writer's full reading of WP 21; the auditor's search covered the whole extracted text. (R123-L)

F14. In `data/region/england.json`, observation `enclosure.share` (open), add the field `"benchmark_role": "development"`
(R124-C; SHEET-3 U124).

F15. In `data/region/england.json`, observation `enclosure.share` (open), confidence `reason`: replace `neither Wikipedia
page gives a share before 1604` with `CAT-CAMPOP-COMMON-2025 (common land about 50 per cent in 1500, not an enclosure
share), CAT-WIKI-ENCLOSURE and CAT-WIKI-INCLOSURE were read in full and give no enclosure share before 1604 or 1700`. The
Enclosure page must be read in full first: the auditor read 100,000 of its 151,770 characters. (R124-L)

## Remarks (not counted in the result)

1. **SHEET-3 is out of date for the open rows.** SHEET-3 gives `none` for the sources of U46, U122, U123 and U124, while
   5311 now cites the works searched (ruling (c)). The records follow the ruling; the sheet is not edited here. The sheet
   also has the "as above" reasons of U58 and U72 (rows 85 and 99) and the SHEET-2 T1 pointer of U30 (row 57).
2. **SHEET-3.md is not valid UTF-8** (the Read and Grep tools report legacy-encoded bytes). Not edited here.
3. **First-person reason, row 71 (and the sheet's U44).** "I read the first number as the annual-data column" is the
   writer's voice, which AUDIT-H1-5 Remark 3 already flagged for row 70. Not counted; a later unit can ask for it.
4. **Row 1 reason.** "first 100,000 characters of the page were read or the page was read by WebFetch summary" hedges
   between two readings. The page answered in full here (no truncation note). Not counted.
5. **Row 92 unit.** The unit reads "pounds per year (the extract prints the pound sign broken)". The parenthesis is a
   writer aside about the extraction, not a unit; the same aside is in SHEET-3 U65. Not counted.
6. **Demography clause, rows 28, 29 and 36.** The reasons say Wikipedia's Demography of England table "prints the same value
   where it has the year (it has no 1300 row)". Read this session: it prints 4,230,000 (1250), 4,750,000 (1290), 1,900,000
   (1450) and 5,310,000 (1650), and has no 1300 row. The clause is accurate. AUDIT-H1-5 Remark 5 is closed for these rows.
   The page is not a `sources` entry, so under ruling (a) a later unit may decide whether a reason may name it.
7. **Value as string, row 106** (`"0.40 to 0.60"`). AUDIT-H1-5 Remark 2 still stands.
8. **Pre-plague clause, rows 106 and 113.** "the page's own pre-plague population range is 3 to 7 million" bears on
   neither row's figure. AUDIT-H1-5 Remark 4 raised the same for row 110. Row 113 fails for its reason as a whole (R113-L).
9. **Fiscal page, 1558-59.** The sentence "£160,000" is a combined parliamentary grant (two fifteenths and tenths plus a
   subsidy), not a single tax and not a crown revenue total. It is the one figure the fiscal page gives for 1270-1700.
   Addressed in F11.
10. **Coverage.** This unit audited 24 rows (22 new), 96 checks. With AUDIT-H1-5, 34 of 124 rows are audited. The other 90
    rows are not audited here.
11. **Clark PDF and WP 21 PDF.** WebFetch returned both PDFs as binary; their text came from the saved copies by pypdf (`python
    -I`). The extraction is complete for the pages named; the tables quoted were found by pattern search over all pages.

opened: https://warwick.ac.uk/fac/soc/economics/research/centres/cage/manage/publications/21.2010_broadberry_complete.pdf

opened: https://www.measuringworth.com/datasets/ukearncpi/earnstudynew2017.pdf

opened: https://en.wikipedia.org/wiki/Black_Death_in_England

opened: https://en.wikipedia.org/wiki/Hundred_Years%27_War

opened: https://en.wikipedia.org/wiki/Enclosure

opened: https://en.wikipedia.org/wiki/Inclosure_Acts

opened: https://en.wikipedia.org/wiki/History_of_taxation_in_the_United_Kingdom

opened: https://en.wikipedia.org/wiki/History_of_the_English_fiscal_system

opened: https://en.wikipedia.org/wiki/Peasants%27_Revolt

opened: https://en.wikipedia.org/wiki/Demography_of_England

opened: https://www.campop.geog.cam.ac.uk/blog/2024/10/31/urban-society/

opened: https://www.campop.geog.cam.ac.uk/blog/tag/enclosure/

opened: https://www.medievalists.net/2010/12/british-economic-growth-1270-%e2%80%93-1870/
