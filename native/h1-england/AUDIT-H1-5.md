# AUDIT-H1-5: audit of the X5 records (commit 511114b) against SHEET-3 (task 5291)

Written 2026-11-01 by task 5291 (Haiku). The auditor wrote neither SHEET-3.md nor the X5 records, and edits no record
here.

## Method

- **Scope.** `git show --stat 511114b` ("X5 records: SHEET-3 trajectory rows for H1 England 1270-1700") touches 19
  files under `data/`: 10 new `data/source/cat-*.json` records, 8 institution records, and `data/region/england.json`.
  Counting the rows the commit adds to those files (new attestations and observations, compared with the parent
  commit) gives **124 rows**: 27 attestations in the institution files and 97 observations in `region/england.json`.
  Rows are numbered 1 to 124 in the order `git show --name-only` lists the files (path order), then array order.
- **Sample.** 124 is over 60, so the sample is (1) every tenth row by that number, rows 10, 20, ..., 120 (12 rows),
  plus (2) every row with `confidence.level: high`. No X5 row is `high`, so the sample is 12 rows. Each row's sheet id
  (SHEET-3 Table 1) is in the table below.
- **Checks per row.** V = value and unit against the source and SHEET-3; D = date (from, to, precision, circa,
  calendar, year start) against the source, SHEET-3 and rulings (f), (g); L = label, confidence level and reason
  against ruling (a) and DESIGN-V4 (k), where a reason must state its grounds in the record (a reason of "as above",
  "as the arable rows" or a sheet row pointer names nothing a reader of the catalogue can check, the same standard as
  AUDIT-H1-4); C = place, `sources` (and the source record's `url`), `note` (locator and the source's own qualifiers
  only, ruling (a)) and `benchmark_role` (observations `development`, attestations none).
- **Sources opened this session.** Each URL below was fetched with WebFetch. WebFetch's reader could not read the two
  PDFs (compressed streams), but it saved each fetched file. Their text was extracted from those saved copies with
  pypdf (`python -I`, scratch copies only). The Wikipedia pages were read through WebFetch, first 100,000 characters
  each; the three pages used in the sample each state their claim inside that span. No other download.
- **Not in the sample.** The other 112 rows are not audited here. Problems seen in passing are listed under Remarks
  and are not counted in the result.

opened: https://warwick.ac.uk/fac/soc/economics/research/centres/cage/manage/publications/21.2010_broadberry_complete.pdf
opened: https://www.measuringworth.com/datasets/ukearncpi/earnstudynew2017.pdf
opened: https://en.wikipedia.org/wiki/English_Civil_War
opened: https://en.wikipedia.org/wiki/Hundred_Years%27_War
opened: https://en.wikipedia.org/wiki/Black_Death_in_England
opened: https://en.wikipedia.org/wiki/Peasants%27_Revolt

## What the sources say (read this session)

- **CAT-BCKOVL-2010-WP21 (CAGE WP 21), Table 16 A, printed p. 50 (PDF p. 51)**, "Levels of population (millions)":
  1300 4.73; 1650 5.31.
- **WP 21, Table 1, p. 33 (PDF p. 33 as extracted)**, "English arable land use (millions of acres)": 1300 Total sown
  7.40, Total arable 11.52; 1420 Total sown 4.51, Total arable 7.76; 1650 Total sown 7.87, Total arable 9.79.
- **WP 21, Table 17, p. 51 (PDF p. 52)**, "Growth of English GDP per capita, 1270-1700", % per annum: 1553/59 - 1600/09
  0.12.
- **WP 21, Table 18, p. 53 (PDF p. 54)**, "English GDP in current prices (£ million)", row 1600: "20.0 23.0", under
  the headings "This paper / Snooks / Mayhew / Annual data / 10-year average". The extracted text does not say which of
  the two numbers sits in the annual-data column.
- **CAT-CLARK-EARN-2011, Table 17, PDF p. 31** (1300 1.74 / 1,154; 1340 1.87 / 1,323; 1350 3.20 / 1,803; 1400 3.98 /
  2,365; 1450 4.43 / 2,786; 1500 4.02 / 2,433) and **PDF p. 32** (1550 5.99 / 1,743; 1600 8.87 / 1,511; 1650 12.41 /
  1,537; 1690 12.48 / 1,457; 1700 12.75 / 1,596). Annual Earnings (£) and Real earnings (£, 2010) columns.
- **English Civil War (Wikipedia)**: infobox "August 1642 – September 1651"; the page's lead calls it "a series of civil
  wars and political machinations" in England from 1642 to 1651.
- **Hundred Years' War (Wikipedia)**: infobox "24 May 1337 – 19 October 1453 (intermittent)"; "the Treaty of Brétigny
  (signed in 1360)"; England kept "the Pale of Calais" until "the Siege of Calais in 1558".
- **Black Death in England (Wikipedia)**: "a figure of 40–60% of the population is widely accepted"; Russell "23.6% of
  the entire population"; Ziegler "around one third"; Goldberg "closer to 45 per cent"; Benedictow "the exceptionally
  high mortality level of 62.5 per cent"; "Assuming a population of 6 million, this estimate would correspond to
  3,750,000 deaths"; pre-plague "estimates range from 3 to 7 million".
- **Peasants' Revolt (Wikipedia)**, poll tax section: the second poll tax "only raised £18,600, far short of the £50,000
  hoped for". The sentences do not state the year; the text places the tax after "the Crown's 1379 request to
  Parliament".

## Checks

Sample row n = X5 row number n (Method). Sheet id = SHEET-3 Table 1 row. "Record" = the file under `data/`.

| id | row (sheet id) | record | check | pass/fail | what the source says / finding |
|---|---|---|---|---|---|
| R10-V | 10 (U99) | institution/english-civil-war, presence | V: war attested, no value | pass | Infobox and lead: the civil wars of 1642 to 1651 in England. Matches SHEET-3. |
| R10-D | 10 (U99) | | D: from 1642-08, to 1651-09, month | pass | Infobox "August 1642 – September 1651". Both bounds are months, so `month` (ruling (g)). |
| R10-L | 10 (U99) | | L: researched, low; "Wikipedia, secondary; first 100,000 characters read" | pass | Secondary source, read within the first 100,000 characters. |
| R10-C | 10 (U99) | | C: place region.england; source CAT-WIKI-ECW (url opened); note; no role | pass | Record `url` is the page opened. Note "August 1642 - September 1651 (infobox)" is the page's locator and dates. |
| R20-V | 20 (U91) | institution/hundred-years-war, presence | V: Treaty of Brétigny attested | pass | "the Treaty of Brétigny (signed in 1360)". |
| R20-D | 20 (U91) | | D: 1360 to 1360, year | pass | The page gives 1360 as a year; no month or day. |
| R20-L | 20 (U91) | | L: researched, low; "Wikipedia, secondary; first 100,000 characters read" | pass | As R10-L. |
| R20-C | 20 (U91) | | C: place, source CAT-WIKI-HYW (url opened), note "Treaty signed (CAT-WIKI-HYW text). 1360 (calendar not stated)."; no role | pass | Locator is the text; the year matches. |
| R30-V | 30 (U3) | region/england, observation population.total | V: 4730000 persons | pass | Table 16 A, p. 50: 1300 4.73 million. Converted correctly. |
| R30-D | 30 (U3) | | D: 1300 to 1300, year | pass | Table 16 A row 1300. |
| R30-L | 30 (U3) | | L: researched, medium; reason "modern reconstruction, secondary (...)" | pass | Modern reconstruction from manorial tenants and Wrigley et al. (1997), as the table's source line says; medium holds. |
| R30-C | 30 (U3) | | C: place, source CAT-BCKOVL-2010-WP21 (url opened), note "Table 16 A, p. 50 (PDF p. 51), 1300 (CAT-BCKOVL-2010-WP21)", role development | pass | Locator matches the printed table. |
| R40-V | 40 (U13) | region/england, observation population.total | V: 5310000 persons | pass | Table 16 A, p. 50: 1650 5.31 million. |
| R40-D | 40 (U13) | | D: 1650 to 1650, year | pass | Table 16 A row 1650. |
| R40-L | 40 (U13) | | L: researched, medium; same reason as R30 | pass | As R30-L. |
| R40-C | 40 (U13) | | C: place, source, note, role development | pass | Locator matches. |
| R50-V | 50 (U23) | region/england, observation land.arable-area | V: 11520000 acres | pass | Table 1, 'Total arable', 1300: 11.52 million acres. |
| R50-D | 50 (U23) | | D: 1300 to 1300, year | pass | Table 1 row 1300. |
| R50-L | 50 (U23) | | L: researched, medium; reason "modern reconstruction, secondary; printed in million acres; the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35, this is a different working paper (WP 21) whose Table 1 gives the same 1270 row" | **fail** | The reason points to a row of SHEET-3's sibling sheet (SHEET-2 T1), which a reader of the catalogue cannot check (fix 1). The figures are right: Table 1 gives 11.52 for 1270 and 1300. |
| R50-C | 50 (U23) | | C: place, source, note "Table 1, last column 'Total arable', 1300 (CAT-BCKOVL-2010-WP21)", role development | pass | Locator matches. |
| R60-V | 60 (U33) | region/england, observation land.sown-area | V: 4510000 acres | pass | Table 1, 'Total sown', 1420: 4.51 million acres. |
| R60-D | 60 (U33) | | D: 1420 to 1420, year | pass | Table 1 row 1420. |
| R60-L | 60 (U33) | | L: researched, medium; reason "as the arable rows" | **fail** | The reason names no grounds; it refers to other records in words a reader cannot check (fix 2). The source's sources line names Overton and Campbell (1996) and the Medieval Accounts Database. |
| R60-C | 60 (U33) | | C: place, source, note "Table 1, 'Total sown', 1420 (CAT-BCKOVL-2010-WP21)", role development | pass | Locator matches. |
| R70-V | 70 (U43) | region/england, observation gdp.nominal | V: 20000000 pounds (current prices) | pass | Table 18, row 1600: "20.0", £ million, is present in the first position. The extract does not say whether it is the annual-data column; the record's low confidence and reason say so, and ruling (a) keeps it low. |
| R70-D | 70 (U43) | | D: 1600 to 1600, year | pass | Table 18 row 1600. |
| R70-L | 70 (U43) | | L: researched, low; reason states the column doubt | pass | Low level matches the doubt the source leaves open (see Remarks 3). |
| R70-C | 70 (U43) | | C: place, source, note "Table 18, p. 53 (PDF p. 54), 1600 (CAT-BCKOVL-2010-WP21)", role development | pass | Locator matches. |
| R80-V | 80 (U53) | region/england, observation gdp.per-head-growth | V: 0.12 per cent per year | pass | Table 17, p. 51: 1553/59 - 1600/09 0.12. |
| R80-D | 80 (U53) | | D: 1553 to 1609, year | pass | Interval 1553/59 - 1600/09 as two year bounds (ruling (g), `year`). |
| R80-L | 80 (U53) | | L: researched, medium; reason "modern reconstruction, secondary; real GDP per capita, output side" | pass | Matches the table's 'GDP per capita' caption and the paper's text. |
| R80-C | 80 (U53) | | C: place, source, note "Table 17, p. 51 (PDF p. 52), 1553/59 - 1600/09 (CAT-BCKOVL-2010-WP21)", role development | pass | Locator matches. |
| R90-V | 90 (U63) | region/england, observation wage.annual-earnings | V: 3.98 pounds per year | pass | Clark Table 17, PDF p. 31, 1400: Annual Earnings 3.98. |
| R90-D | 90 (U63) | | D: 1400 to 1409, decade | pass | The table's 'Decade' column; the row is the 1400s (SHEET-3 note). `decade` is in the schema. |
| R90-L | 90 (U63) | | L: researched, medium; reason "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)" | pass | Matches the sheet's reason; the source's own mix is stated. |
| R90-C | 90 (U63) | | C: place, source CAT-CLARK-EARN-2011 (url opened), note "CAT-CLARK-EARN-2011 Table 17, PDF p. 31, 1400: Annual Earnings 3.98", role development | pass | Locator matches; the record's `url` is the file opened. |
| R100-V | 100 (U73) | region/england, observation wage.annual-earnings | V: 12.41 pounds per year | pass | Clark Table 17, PDF p. 32, 1650: Annual Earnings 12.41. |
| R100-D | 100 (U73) | | D: 1650 to 1659, decade | pass | The 1650s row. |
| R100-L | 100 (U73) | | L: researched, medium; same reason as R90 | pass | As R90-L. |
| R100-C | 100 (U73) | | C: place, source, note "CAT-CLARK-EARN-2011 Table 17, PDF p. 32, 1650: Annual Earnings 12.41", role development | pass | Locator matches. |
| R110-V | 110 (U84) | region/england, observation plague.mortality-share | V: 0.625 fraction of population | pass | "the exceptionally high mortality level of 62.5 per cent" (Benedictow, 2004). |
| R110-D | 110 (U84) | | D: 1348 to 1349, year | pass | SHEET-3 U84 "1348-49 (calendar not stated)". |
| R110-L | 110 (U84) | | L: researched, low; reason "cited through, rule a ... 3 to 7 million" | pass | Cited through another author on the page; the pre-plague range is the page's own ("estimates range from 3 to 7 million"). |
| R110-C | 110 (U84) | | C: place, source CAT-WIKI-BLACKDEATHENG (url opened), note "CAT-WIKI-BLACKDEATHENG '62.5 per cent'; same source implies 3,750,000 deaths on a population of 6 million", role development | pass | The page says "Assuming a population of 6 million, this estimate would correspond to 3,750,000 deaths." The 6 million is the source's own assumption, so the note holds only its qualifier (Remark 4). |
| R120-V | 120 (U118) | region/england, observation tax.yield | V: 18600 pounds | pass | "only raised £18,600" (poll tax section). |
| R120-D | 120 (U118) | | D: 1379 to 1379, year | pass | The year is not stated in the sentences; the page places the tax after the Crown's 1379 request to Parliament, so 1379 is the page's own context (the reason must say so; see R120-L). |
| R120-L | 120 (U118) | | L: researched, low; reason "as above; hoped for £50,000" | **fail** | "as above" points to the sheet's previous row and names no grounds for a reader of the catalogue (fix 3). The "£50,000 hoped for" is right. |
| R120-C | 120 (U118) | | C: place, source CAT-WIKI-PEASANTS (url opened), note "CAT-WIKI-PEASANTS poll tax section: 'only raised £18,600'", role development | pass | Quote matches; the role is `development` as SHEET-3 gives. |

## Result

AUDIT-H1-5 fail 3/48

The sample is 12 rows and 48 checks (V, D, L, C per row). Three checks fail, all L (reasons that name no grounds).

Fixes (copy word for word into the fix task). Change no other field.

1. "In `data/region/england.json`, observation `land.arable-area` with date 1300 (value 11520000), confidence
   `reason`: replace `the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35, this is a different working
   paper (WP 21) whose Table 1 gives the same 1270 row` with `a different working paper from CAGE WP 35 (2010), whose
   Table 1 gives 11.52 for 1270 and 1300`." (R50-L)
2. "In `data/region/england.json`, observation `land.sown-area` with date 1420 (value 4510000), confidence `reason`:
   replace `as the arable rows` with `modern reconstruction, secondary; printed in million acres (Overton and Campbell
   tables, Medieval Accounts Database)`." (R60-L)
3. "In `data/region/england.json`, observation `tax.yield` with date 1379 (value 18600), confidence `reason`: replace
   `as above; hoped for £50,000` with `Wikipedia, secondary; the year is not stated in the poll tax section and is
   placed after the Crown's 1379 request to Parliament; hoped for £50,000`." (R120-L)

Then a re-audit of the three failed checks (AUDIT-H1-6 or the next audit unit).

## Remarks (not counted in the result)

1. **Rows outside the sample, not audited.** Seen while reading the commit's data: observation 28 (population 1250,
   U1) has no `benchmark_role`, though SHEET-3 says `development` on every observation; so do the open rows 73 (U46),
   122 (U122), 123 (U123) and 124 (U124). The open rows 73, 122, 123 and 124 also have an empty `sources` list, where
   ruling (c) requires the source searched to be cited (SHEET-3 gives "none" for them). These need an audit of their
   own (every row of the unit, since the sample rule does not reach them).
2. **Value stored as a string.** Observation 106 (plague mortality, U80) has `value: "0.40 to 0.60"`. The schema allows
   a string, so it passes `src/schema.ts`, but a consumer cannot compute with it. Not a sheet mismatch; the sheet gives
   the same text.
3. **Table 18 column doubt.** The 1600 GDP value (R70) is in the source's first position, but the extract does not
   show which column that is. The record says so and its low confidence holds. The reason is written in the first
   person ("I read the first number"); a catalogue reason should state the grounds without the writer's voice.
4. **Note on R110.** The clause "same source implies 3,750,000 deaths on a population of 6 million" repeats a figure
   the page gives in its own words. It passes here, but a strict reading of ruling (a) would keep only the quote; a
   later unit may decide.
5. **Demography clause in R30 and R40.** Their reasons say that Wikipedia's Demography of England table "(read) prints
   the same value where it has the year (it has no 1300 row)". That table was not opened in this session, and the
   clause does not change the value's grounds. Not checked here.
