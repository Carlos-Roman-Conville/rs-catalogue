# AUDIT-H1-4: audit of the X2 records (commit fc9b2eb) against SHEET-2 (task 5261)

Written 2026-11-01 by task 5261 (Opus). The auditor wrote neither SHEET-2.md nor the X2 records, and edits no record
here.

## Method

- **Scope.** `git show --stat fc9b2eb` ("X2 records: write SHEET-2 attestations and observations for H1 England")
  touches 21 files under `data/`: 9 new observations appended to `data/region/england.json` (T1, T2, T3, T19, T21,
  T22, T23, T26, T28) plus its `sources` list; 10 new organism records with 15 observations (T4-T18); 4 new
  institution records with 5 attestations (T29, T32, T33, T34, T35); 6 new `data/source/cat-*.json` records. That is
  29 rows, under 60, so every row is audited (no sample). The commit also adds one blank line to
  `test/index.test.ts` (outside `data/`, see remark 5).
- **S1, S14, lady day.** The commit changes no file under `data/calendar/`, and the england diff only appends after
  the S1 row (the S1 row and its note "Ten-year average 1270/79, 4.40 million persons" are context lines, unchanged).
  S14 is not written (SHEET-2 T9: S14 stays `open`). PDF-PASS.md rows are therefore not re-audited.
- **Sources opened this session.** Each URL below was fetched with WebFetch. WebFetch's reader could not read the two
  PDFs (compressed streams), but it saved each fetched file. Their text was extracted from those saved copies with
  pypdf (`python -I`). No other download.
- **Checks per row.** V = value and unit; D = date (from, to, precision, circa, calendar, year start) against the
  source and rulings (f), (g); L = label, confidence level and reason against ruling (a) and DESIGN-V4 (k);
  C = place, `sources`, note locator (ruling (a): note carries the locator and the source's own qualifiers, nothing
  else) and `benchmark_role` (observations `development`; attestations none). Plus one check per new source record
  (title, author, url, rights against SHEET-2 Table 2) and one for S1/S14/lady day unchanged.
- **Reason ruling for this audit.** A confidence `reason` must state its grounds in the record. SHEET-2 abbreviates
  repeated reasons as "as T1", "as T9", and so on, pointing to its own rows. A record has no link to the sheet, so a
  reason reduced to "as Tn" states nothing a reader of the catalogue can check, and fails L. On the wheat yield row it
  even points to itself (that row *is* T9). A cross-reference to a `CAT-` key (source `rights`: "as
  CAT-WIKI-DEMOENG") resolves inside the catalogue and passes (remark 3).

opened: https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf
opened: https://www.measuringworth.com/datasets/ukearncpi/earnstudynew2017.pdf
opened: https://en.wikipedia.org/wiki/Demography_of_England
opened: https://en.wikipedia.org/wiki/Cinque_Ports
opened: https://en.wikipedia.org/wiki/Exchequer
opened: https://en.wikipedia.org/wiki/Parliament_of_England
opened: https://en.wikipedia.org/wiki/Hundred_Rolls

## What the sources say (read this session)

- **BCKOvL**, printed p. 35, "TABLE 1: English arable land use (millions of acres)", row 1270: Wheat 2.01, Rye/Maslin
  0.67, Barley/Dredge 1.13, Oats 2.71, Pulses 0.26, Total sown 6.77, Fallow arable 4.75, Total arable 11.52. Sources:
  Overton and Campbell (1996), Campbell et al. (1996), Medieval Accounts Database, and others.
- **BCKOvL**, p. 36, "TABLE 2: English mean yields per acre gross of tithes, net of seeds in bushels (10-year
  averages)", row 1270-1279: Wheat 8.54, Rye 13.32, Barley 10.47, Oats 6.61, Pulses 3.81.
- **BCKOvL**, p. 40, "TABLE 4: Numbers of non-working animals in England in millions (10-year averages)", row
  1270-1279: Milk cattle 0.60, Beef cattle 0.54, Calves 0.60, Sheep 10.99, Swine 0.70, "Livestock units per 100
  acres" 44.07. Note: "Ratios from Campbell (2000: 104-107): (adult cattle for beef and milk x 1.2) + (immature cattle
  x 0.8) + (sheep and swine x 0.1)".
- **BCKOvL**, pp. 30-31: "Malanima (2009a) suggests an urbanisation ratio for England rising from 4.0 per cent in
  1300 to 13.2 per cent by 1700 and 43.0 per cent by 1870, using settlements of at least 10,000 as the cut-off."
- **Clark**, "Average Earnings and Retail Prices, UK, 1209-2010", Gregory Clark, 10-30-2011. PDF p. 31, "Table 17:
  Nominal Earnings, Consumer Prices, and Real Earnings, 1200s-2000s", column "Decade", row 1270: Annual Earnings (£)
  1.64, Cost of Living 0.152, Real earnings (£, 2010) 1,084. P. 2: "Average earnings 1209-1869 are calculated for
  England".
- **Demography of England**: table "Population 1086–1700", 1279: 4,430,000; source refs: Broadberry et al. (2010)
  "English Medieval Population: Reconciling Time Series and Cross Sectional Evidence"; Wrigley and Schofield.
- **Cinque Ports**: "in 1155 a royal charter established the ports to maintain ships ready for the Crown in case of
  need"; "provide 57 ships for 15 days' service to the king annually"; "in the 13th and 14th centuries the ports did
  play a significant role in the defence of the realm"; "The earliest general charter granting liberties to the
  ports in common dates from 1260."
- **Exchequer**: "The existence of an Exchequer in England was first recorded in 1110" (a royal writ of Henry I);
  "the earliest plea rolls of the Exchequer date from 1236". First 100,000 characters read.
- **Parliament of England**: Simon de Montfort's parliament "was held in January 1265"; burgesses "were summoned
  along with knights of the shire"; "the Model Parliament of November 1295", "two elected knights from each shire and
  two elected burgesses from each borough". First 100,000 characters read.
- **Hundred Rolls**: "the better known surveys of liberties and land ownership, taken in 1274–5 and 1279–80,
  respectively"; no mention of manors.

## Checks

Rows: E = `data/region/england.json`, O = `data/organism/<file>.json`, I = `data/institution/<file>.json`.

| id | row (sheet) | check | result | what the source says / finding |
|---|---|---|---|---|
| C1 | E land.arable-area (T1) | V 11520000 acres | **pass** | Table 1, 1270, Total arable 11.52 (millions of acres). |
| C2 | T1 | D 1270..1270, year, calendar unknown, no year start | **pass** | Row "1270", a single year; no calendar stated. |
| C3 | T1 | L researched / medium, reason | **pass** | Reason names the table's sources (Overton and Campbell, Medieval Accounts Database); a modern secondary reconstruction, so medium holds. |
| C4 | T1 | C place, source, note, role | **pass** | England table; note "Table 1 p. 35, "Total arable", 1270: 11.52 million acres" matches; `development`. |
| C5 | E land.sown-area (T2) | V 6770000 acres | **pass** | Total sown 6.77. |
| C6 | T2 | D | **pass** | As C2. |
| C7 | T2 | L reason | **fail** | Reason "as T1; the five crop columns add to 6.78 ..." cites a sheet row; grounds not stated in the record (fix 1). The arithmetic is right: 2.01+0.67+1.13+2.71+0.26 = 6.78. |
| C8 | T2 | C | **pass** | Note locator matches; `development`. |
| C9 | E land.fallow-area (T3) | V 4750000 acres | **pass** | Fallow arable 4.75. |
| C10 | T3 | D | **pass** | As C2. |
| C11 | T3 | L reason | **fail** | Reason is only "as T1" (fix 1). |
| C12 | T3 | C | **pass** | Note locator matches. |
| C13 | E livestock.units-per-100-acres (T19) | V 44.07, "livestock units per 100 acres" | **pass** | Table 4, 1270-1279, last column 44.07, header "Livestock units per 100 acres". |
| C14 | T19 | D 1270..1279, year | **pass** | "10-year averages", row 1270-1279; both bounds are years, so `year` under ruling (g). |
| C15 | T19 | L researched / low, reason | **pass** | Reason quotes the weights from the note (1.2, 0.8, 0.1, Campbell 2000) and says which acreage is unstated; the table does not say which acres. |
| C16 | T19 | C | **pass** | "Table 4 p. 40, last column and note"; `development`. |
| C17 | E wage.annual-earnings (T21) | V 1.64, pounds per year | **pass** | Table 17, Decade 1270, Annual Earnings (£) 1.64. |
| C18 | T21 | D 1270..1279, decade | **pass** | Column header "Decade"; row 1270 is the 1270s. |
| C19 | T21 | L researched / medium, reason | **pass** | P. 2: "Average earnings 1209-1869 are calculated for England"; the reason states this. |
| C20 | T21 | C | **pass** | "Table 17, PDF p. 31"; England per p. 2; `development`. |
| C21 | E price.cost-of-living-index (T22) | V 0.152, index | **pass** | Cost of Living 0.152. Unit says "base year not read" (remark 2). |
| C22 | T22 | D | **pass** | As C18. |
| C23 | T22 | L reason | **fail** | "as T21; base year not read" (fix 1). |
| C24 | T22 | C | **pass** | Locator matches. |
| C25 | E wage.real-earnings (T23) | V 1084, pounds of 2010 | **pass** | Real earnings (£, 2010) 1,084. |
| C26 | T23 | D | **pass** | As C18. |
| C27 | T23 | L reason | **fail** | Reason is only "as T21" (fix 1). |
| C28 | T23 | C | **pass** | Locator matches. |
| C29 | E urban.share (T26) | V 0.04, fraction, settlements ≥ 10,000 | **pass** | "4.0 per cent in 1300 ... using settlements of at least 10,000 as the cut-off". |
| C30 | T26 | D 1300..1300, year | **pass** | "in 1300". |
| C31 | T26 | L researched / low, reason | **pass** | The text attributes the figure to Malanima (2009a): cited through another work, low, said in the reason (ruling (a)). |
| C32 | T26 | C | **pass** | "text pp. 30-31" with the quoted sentence; `development`. |
| C33 | E population.total (T28) | V 4430000 persons | **pass** | Demography of England, "Population 1086–1700", 1279: 4,430,000. |
| C34 | T28 | D 1279..1279, year | **pass** | Table row 1279. |
| C35 | T28 | L researched / low, reason | **pass** | The table cites Broadberry et al. 2010 (population paper) and Wrigley and Schofield, both unopened: cited through, low, reason says so. |
| C36 | T28 | C | **pass** | Source CAT-WIKI-DEMOENG; locator matches; `development`. |
| C37 | O triticum-aestivum crop.sown-area (T4) | V 2010000 acres | **pass** | Wheat 2.01. |
| C38 | T4 | D | **pass** | As C2. |
| C39 | T4 | L reason | **fail** | Reason is only "as T1" (fix 1). |
| C40 | T4 | C | **pass** | "Table 1 p. 35, Wheat, 1270: 2.01"; `development`. |
| C41 | O triticum-aestivum crop.yield-per-acre (T9) | V 8.54, "bushels per acre, gross of tithes, net of seed" | **pass** | Table 2, Wheat 1270-1279: 8.54; caption "gross of tithes, net of seeds in bushels". |
| C42 | T9 | D 1270..1279, year | **pass** | "(10-year averages)", row 1270-1279; ruling (g). |
| C43 | T9 | L reason | **fail** | Reason is only "as T9": the row points to itself (fix 1). |
| C44 | T9 | C | **pass** | "Table 2 p. 36, Wheat, 1270-1279: 8.54". |
| C45 | O secale-cereale crop.sown-area (T5) | V 670000 acres | **pass** | Rye/Maslin 0.67 (remark 4 on the organism). |
| C46 | T5 | D | **pass** | As C2. |
| C47 | T5 | L reason | **fail** | Reason is only "as T1" (fix 1). |
| C48 | T5 | C | **pass** | Note keeps the column name "Rye/Maslin". |
| C49 | O secale-cereale crop.yield-per-acre (T10) | V 13.32 | **pass** | Rye 1270-1279: 13.32. |
| C50 | T10 | D | **pass** | As C42. |
| C51 | T10 | L reason | **fail** | "as T9 (the rye figure is higher ...)" (fix 1). |
| C52 | T10 | C | **pass** | Locator matches. |
| C53 | O hordeum-vulgare crop.sown-area (T6) | V 1130000 acres | **pass** | Barley/Dredge 1.13. |
| C54 | T6 | D | **pass** | As C2. |
| C55 | T6 | L reason | **fail** | Reason is only "as T1" (fix 1). |
| C56 | T6 | C | **pass** | Note keeps "Barley/Dredge". |
| C57 | O hordeum-vulgare crop.yield-per-acre (T11) | V 10.47 | **pass** | Barley 1270-1279: 10.47. |
| C58 | T11 | D | **pass** | As C42. |
| C59 | T11 | L reason | **fail** | Reason is only "as T9" (fix 1). |
| C60 | T11 | C | **pass** | Locator matches. |
| C61 | O avena-sativa crop.sown-area (T7) | V 2710000 acres | **pass** | Oats 2.71. |
| C62 | T7 | D | **pass** | As C2. |
| C63 | T7 | L reason | **fail** | Reason is only "as T1" (fix 1). |
| C64 | T7 | C | **pass** | Locator matches. |
| C65 | O avena-sativa crop.yield-per-acre (T12) | V 6.61 | **pass** | Oats 1270-1279: 6.61. |
| C66 | T12 | D | **pass** | As C42. |
| C67 | T12 | L reason | **fail** | Reason is only "as T9" (fix 1). |
| C68 | T12 | C | **pass** | Locator matches. |
| C69 | O pulses crop.sown-area (T8) | V 260000 acres | **pass** | Pulses 0.26. |
| C70 | T8 | D | **pass** | As C2. |
| C71 | T8 | L reason | **fail** | "as T1; the table's "Pulses" column does not split peas from beans" (fix 1). |
| C72 | T8 | C | **pass** | Locator matches. |
| C73 | O pulses crop.yield-per-acre (T13) | V 3.81 | **pass** | Pulses 1270-1279: 3.81. |
| C74 | T13 | D | **pass** | As C42. |
| C75 | T13 | L reason | **fail** | Reason is only "as T9" (fix 1). |
| C76 | T13 | C | **pass** | Locator matches. |
| C77 | O cattle-milk livestock.count (T14) | V 600000 head | **pass** | Table 4, Milk cattle 0.60 (millions). |
| C78 | T14 | D 1270..1279, year | **pass** | "(10-year averages)", row 1270-1279; ruling (g). |
| C79 | T14 | L researched / medium, reason | **pass** | "derived estimate (probate and accounts databases, slaughter ratios); secondary": the note says "Derived from Medieval Accounts Database; Early Modern Probate Inventory Database ...". |
| C80 | T14 | C | **pass** | "Table 4 p. 40, Milk cattle: 0.60 million"; `development`. |
| C81 | O cattle-beef livestock.count (T15) | V 540000 head | **pass** | Beef cattle 0.54. |
| C82 | T15 | D | **pass** | As C78. |
| C83 | T15 | L reason | **fail** | Reason is only "as T14" (fix 1). |
| C84 | T15 | C | **pass** | Locator matches. |
| C85 | O calves livestock.count (T16) | V 600000 head | **pass** | Calves 0.60. |
| C86 | T16 | D | **pass** | As C78. |
| C87 | T16 | L reason | **fail** | Reason is only "as T14" (fix 1). |
| C88 | T16 | C | **pass** | Locator matches. |
| C89 | O ovis-aries livestock.count (T17) | V 10990000 head | **pass** | Sheep 10.99. |
| C90 | T17 | D | **pass** | As C78. |
| C91 | T17 | L reason | **fail** | "as T14; the text says sheep numbers are assumed stationary ..." (fix 1). |
| C92 | T17 | C | **pass** | Locator matches. |
| C93 | O sus-scrofa-domesticus livestock.count (T18) | V 700000 head | **pass** | Swine 0.70. |
| C94 | T18 | D | **pass** | As C78. |
| C95 | T18 | L reason | **fail** | Reason is only "as T14" (fix 1). |
| C96 | T18 | C | **pass** | Locator matches. |
| C97 | I cinque-ports presence (T29) | V `presence` | **pass** | "in 1155 a royal charter established the ports"; the 57-ship duty is quoted in the note. |
| C98 | T29 | D from 1155, to null, year | **pass** | 1155 as a year only; no end stated, and the article describes the ports through the 13th and 14th centuries; a null `to` holds after (ruling (f)). |
| C99 | T29 | L researched / low, reason | **pass** | Wikipedia, secondary; reason's "earliest general charter ... 1260" matches the article. |
| C100 | T29 | C | **pass** | Note quotes "57 ships for 15 days' service to the king annually" and the defence sentence; no role on an attestation. |
| C101 | I exchequer presence (T32) | V `presence` | **pass** | "first recorded in 1110". |
| C102 | T32 | D from 1110, to null, year | **pass** | 1110 as a year; the article describes it through the 13th century. |
| C103 | T32 | L researched / low, reason | **pass** | Wikipedia, secondary; first 100,000 characters read (the same span this audit read). |
| C104 | T32 | C | **pass** | Both quoted sentences match the page; no role. |
| C105 | I parliament-of-england presence (T33) | V `presence` | **pass** | Burgesses "summoned along with knights of the shire" at the January 1265 parliament. |
| C106 | T33 | D 1265-01..1265-01, month | **pass** | "held in January 1265"; month precision, both bounds months. See remark 1. |
| C107 | T33 | L researched / low, reason | **pass** | Wikipedia, secondary; first 100,000 characters read. |
| C108 | T33 | C | **pass** | Note carries the locator and the page's own words; no role. |
| C109 | I parliament-of-england adoption (T34) | V `adoption`, Model Parliament | **pass** | "the Model Parliament of November 1295", "two elected knights from each shire and two elected burgesses from each borough". |
| C110 | T34 | D from 1295-11, to null, month | **pass** | "November 1295". |
| C111 | T34 | L reason | **fail** | Reason is only "as T33" (fix 1). |
| C112 | T34 | C note | **fail** | The note adds the writer's comment "after the 1270 benchmark, so only for the later series", which is neither a locator nor the source's own qualifier (ruling (a), "nothing else") (fix 2). |
| C113 | I hundred-rolls presence (T35) | V `presence` | **pass** | "surveys of liberties and land ownership, taken in 1274–5 and 1279–80". |
| C114 | T35 | D 1274..1280, year | **pass** | First survey 1274-5, last 1279-80; the year bounds are the outer years. See remark 1. |
| C115 | T35 | L researched / low, reason | **pass** | Wikipedia, secondary; "page says nothing on manors" holds. |
| C116 | T35 | C | **pass** | "CAT-WIKI-HUNDREDROLLS lead" matches; no role. |
| C117 | source cat-clark-earn-2011 | title, author, year, url, rights | **pass** | Matches SHEET-2 Table 2; the PDF's title page reads "Average Earnings and Retail Prices, UK, 1209-2010, Gregory Clark ... 10-30-2011". |
| C118 | source cat-wiki-demoeng | title, author, url, rights | **pass** | Matches SHEET-2 Table 2; url opened. |
| C119 | source cat-wiki-cinque | same | **pass** | Matches; rights "as CAT-WIKI-DEMOENG" resolves to a record (remark 3). |
| C120 | source cat-wiki-exchequer | same | **pass** | As C119. |
| C121 | source cat-wiki-parleng | same | **pass** | As C119. |
| C122 | source cat-wiki-hundredrolls | same | **pass** | As C119. |
| C123 | — | S1, S14, lady-day rows unchanged by fc9b2eb | **pass** | No `data/calendar/` file in the commit; the S1 row is unchanged context in the england diff; S14 not written. |

## Result

AUDIT-H1-4 fail 20/123

Fixes (copy word for word into the fix task):

1. "In each confidence `reason` listed here, replace the leading `as T1` or `as T9` with `modern reconstruction
   (Overton and Campbell tables, Medieval Accounts Database); secondary`, the leading `as T14` with `derived estimate
   (probate and accounts databases, slaughter ratios); secondary`, the leading `as T21` with `Clark's own series for
   England; the table runs the UK/Britain/England series, and for this period the paper says it uses English wages;
   Table 17 mixes day-wage building and farm series by period (not read in full)`, and the leading `as T33` with
   `Wikipedia, secondary; first 100,000 characters read`; keep the rest of each reason as it stands. Rows:
   `data/region/england.json` observations `land.sown-area`, `land.fallow-area`, `price.cost-of-living-index`,
   `wage.real-earnings`; both observations (`crop.sown-area`, `crop.yield-per-acre`) in
   `data/organism/triticum-aestivum.json`, `secale-cereale.json`, `hordeum-vulgare.json`, `avena-sativa.json` and
   `pulses.json`; the `livestock.count` observation in `data/organism/cattle-beef.json`, `calves.json`,
   `ovis-aries.json` and `sus-scrofa-domesticus.json`; the `adoption` attestation in
   `data/institution/parliament-of-england.json`. Change no other field." (C7, C11, C23, C27, C39, C43, C47, C51,
   C55, C59, C63, C67, C71, C75, C83, C87, C91, C95, C111: 19 fails)
2. "In `data/institution/parliament-of-england.json`, `adoption` attestation, `note`: replace `November 1295; after
   the 1270 benchmark, so only for the later series.` with `November 1295.` Change no other field." (C112)

Then a re-audit of those 20 checks (AUDIT-H1-5).

## Remarks (not fails)

1. **Interval reading for window queries.** T33 (`presence` January 1265 only) does not overlap a 1270 window, so
   Parliament reaches the 1270 bundle only through later rows. T35 joins two surveys (1274-5, 1279-80) into one
   `presence` span 1274-1280, which also covers 1276-1278, when no survey was being taken. The span holds if
   `presence` means the rolls exist as records. Both follow the sheet and the sources' dates. A planner may want a
   ruling on what `presence` of a one-off event or survey means.
2. **Clark cost-of-living base.** Table 17's 2010 row prints Cost of Living 100, so the index is 2010 = 100. The unit
   "base year not read" is out of date, not false; a later unit may state the base.
3. **Sheet ids in records.** The source records' `gives` fields name sheet rows ("(T29)" and the like), and their
   `rights` say "as CAT-WIKI-DEMOENG". Neither carries a value, so neither fails here. The CC BY-SA licence line on
   the Wikipedia pages was not re-read this session either (the CAT-WIKI-DEMOENG record says so itself).
4. **Mixed crop columns on species records.** "Rye/Maslin" (rye and a wheat-rye mix) is filed on
   `organism.secale-cereale`, and "Barley/Dredge" (barley and a barley-oats mix) on `organism.hordeum-vulgare`. The
   records' preferred names ("Rye/maslin", "Barley/dredge") and notes keep the source's column names, so nothing
   false is stated, but a consumer reading by scientific name gets the mixes too.
5. **Out-of-scope change.** fc9b2eb also adds one blank line to `test/index.test.ts`; harmless, outside `data/`.
