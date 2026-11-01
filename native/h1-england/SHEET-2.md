# H1 England 1270: sourcing sheet 2 (X1, NATIVE-PLAN "After D1" rows)

Written 2026-11-01. Sheet only: no record, no code. Rulings (a)-(g) of NATIVE-PLAN apply. A value is here only if
the work was opened and read in this session. The BCKOvL working paper PDF (CAT-BCKOVL-2010) was fetched and its text
extracted locally with a PDF reader this time, so its tables were read directly; SHEET.md left them `open` because
WebFetch alone could not read the compressed streams. Page numbers are the paper's own page headers. The Clark
earnings table is read from the Measuring Worth PDF (Clark's paper), PDF page 31 (printed page number not shown in
the extract). The "unit" column names what the source prints; `million acres` and `millions` are converted in the
value column to plain numbers. Row-type names (`land.arable-area` and the like) are proposals for N4/N5 to match to
`src/schema.ts` kinds, not settled names. A figure a work cites from another work (Malanima via BCKOvL) is
`researched`/low (rule a). Two sources that differ are two rows (T2/T3 vs S1; T25/T26).

`benchmark_role` is `development` on every observation; attestations have no role. Place is `region.england`.
Where the source prints a decade ("1270-1279") the date is that decade, calendar and year start not stated by it.

## Table 1: attestations and observations to write

| id | kind | row type | value | unit | place | date as source gives it (calendar / year start) | label | confidence and reason | benchmark_role | work | locator | url | opened |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | land use (arable total) | observation `land.arable-area` | 11520000 | acres | region.england | 1270 (year; calendar not stated) | researched | medium: modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary | development | CAT-BCKOVL-2010 | Table 1 p. 35, "Total arable", 1270: 11.52 million acres | https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf | yes |
| T2 | land use (sown total) | observation `land.sown-area` | 6770000 | acres | region.england | 1270 | researched | medium: as T1; the five crop columns add to 6.78, the table prints 6.77 (rounding) | development | CAT-BCKOVL-2010 | Table 1 p. 35, "Total sown", 1270: 6.77 | same | yes |
| T3 | land use (fallow) | observation `land.fallow-area` | 4750000 | acres | region.england | 1270 | researched | medium: as T1 | development | CAT-BCKOVL-2010 | Table 1 p. 35, "Fallow arable", 1270: 4.75 | same | yes |
| T4 | crop wheat | observation `crop.sown-area` | 2010000 | acres | region.england | 1270 | researched | medium: as T1 | development | CAT-BCKOVL-2010 | Table 1 p. 35, Wheat, 1270: 2.01 | same | yes |
| T5 | crop rye/maslin | observation `crop.sown-area` | 670000 | acres | region.england | 1270 | researched | medium: as T1 | development | CAT-BCKOVL-2010 | Table 1 p. 35, Rye/Maslin, 1270: 0.67 | same | yes |
| T6 | crop barley/dredge | observation `crop.sown-area` | 1130000 | acres | region.england | 1270 | researched | medium: as T1 | development | CAT-BCKOVL-2010 | Table 1 p. 35, Barley/Dredge, 1270: 1.13 | same | yes |
| T7 | crop oats | observation `crop.sown-area` | 2710000 | acres | region.england | 1270 | researched | medium: as T1 | development | CAT-BCKOVL-2010 | Table 1 p. 35, Oats, 1270: 2.71 | same | yes |
| T8 | crop pulses (peas, beans) | observation `crop.sown-area` | 260000 | acres | region.england | 1270 | researched | medium: as T1; the table's "Pulses" column does not split peas from beans | development | CAT-BCKOVL-2010 | Table 1 p. 35, Pulses, 1270: 0.26 | same | yes |
| T9 | crop wheat (SHEET S14) | observation `crop.yield-per-acre` | 8.54 | bushels per acre, gross of tithes, net of seed | region.england | 1270-1279 (ten-year mean) | researched | medium: as T1; this is a yield per acre, not SHEET S14's seed ratio, so S14 stays `open` | development | CAT-BCKOVL-2010 | Table 2 p. 36, Wheat, 1270-1279: 8.54 | same | yes |
| T10 | crop rye | observation `crop.yield-per-acre` | 13.32 | bushels per acre, gross of tithes, net of seed | region.england | 1270-1279 | researched | medium: as T9 (the rye figure is higher than wheat in the table; the paper's text was not read for why) | development | CAT-BCKOVL-2010 | Table 2 p. 36, Rye, 1270-1279: 13.32 | same | yes |
| T11 | crop barley | observation `crop.yield-per-acre` | 10.47 | bushels per acre, gross of tithes, net of seed | region.england | 1270-1279 | researched | medium: as T9 | development | CAT-BCKOVL-2010 | Table 2 p. 36, Barley, 1270-1279: 10.47 | same | yes |
| T12 | crop oats | observation `crop.yield-per-acre` | 6.61 | bushels per acre, gross of tithes, net of seed | region.england | 1270-1279 | researched | medium: as T9 | development | CAT-BCKOVL-2010 | Table 2 p. 36, Oats, 1270-1279: 6.61 | same | yes |
| T13 | crop pulses | observation `crop.yield-per-acre` | 3.81 | bushels per acre, gross of tithes, net of seed | region.england | 1270-1279 | researched | medium: as T9 | development | CAT-BCKOVL-2010 | Table 2 p. 36, Pulses, 1270-1279: 3.81 | same | yes |
| T14 | livestock milk cattle | observation `livestock.count` | 600000 | head | region.england | 1270-1279 (ten-year average) | researched | medium: derived estimate (probate and accounts databases, slaughter ratios); secondary | development | CAT-BCKOVL-2010 | Table 4 p. 40, Milk cattle: 0.60 million | same | yes |
| T15 | livestock beef cattle | observation `livestock.count` | 540000 | head | region.england | 1270-1279 | researched | medium: as T14 | development | CAT-BCKOVL-2010 | Table 4 p. 40, Beef cattle: 0.54 million | same | yes |
| T16 | livestock calves | observation `livestock.count` | 600000 | head | region.england | 1270-1279 | researched | medium: as T14 | development | CAT-BCKOVL-2010 | Table 4 p. 40, Calves: 0.60 million | same | yes |
| T17 | livestock sheep | observation `livestock.count` | 10990000 | head | region.england | 1270-1279 | researched | medium: as T14; the text says sheep numbers are assumed stationary in the long term | development | CAT-BCKOVL-2010 | Table 4 p. 40, Sheep: 10.99 million | same | yes |
| T18 | livestock swine | observation `livestock.count` | 700000 | head | region.england | 1270-1279 | researched | medium: as T14 | development | CAT-BCKOVL-2010 | Table 4 p. 40, Swine: 0.70 million | same | yes |
| T19 | livestock density | observation `livestock.units-per-100-acres` | 44.07 | livestock units per 100 acres | region.england | 1270-1279 | researched | low: the column header says only "per 100 acres" (which acreage was not read); units weight cattle 1.2, calves 0.8, sheep and swine 0.1 (Campbell 2000, cited) | development | CAT-BCKOVL-2010 | Table 4 p. 40, last column and note | same | yes |
| T20 | pasture (land use by type) | observation `land.pasture-area` | open | acres | region.england | open | open | low: no table in the paper read gives pasture acres for 1270 (Table 1 is arable only) | development | none | none | none | no |
| T21 | wages: annual earnings | observation `wage.annual-earnings` | 1.64 | pounds per year (the extract prints the pound sign as a broken character; header "Annual Earnings") | region.england | decade 1270 (Table 17 rows are "1270", decades) | researched | medium: Clark's own series for England; the table runs the UK/Britain/England series, and for this period the paper says it uses English wages; Table 17 mixes day-wage building and farm series by period (not read in full) | development | CAT-CLARK-EARN-2011 | Table 17, PDF p. 31, 1270: Annual Earnings 1.64 | https://www.measuringworth.com/datasets/ukearncpi/earnstudynew2017.pdf | yes |
| T22 | prices: cost of living | observation `price.cost-of-living-index` | 0.152 | index (base year not read; the header says "Cost of Living") | region.england | decade 1270 | researched | medium: as T21; base year not read | development | CAT-CLARK-EARN-2011 | Table 17, PDF p. 31, 1270: Cost of Living 0.152 | same | yes |
| T23 | wages: real earnings | observation `wage.real-earnings` | 1084 | pounds of 2010 per year (header "Real earnings (pound, 2010)") | region.england | decade 1270 | researched | medium: as T21 | development | CAT-CLARK-EARN-2011 | Table 17, PDF p. 31, 1270: Real earnings 1,084 | same | yes |
| T24 | prices of farm goods (Clark, *Price History of English Agriculture*) | observation `price.*` | open | | region.england | open | open | low: Clark's UC Davis data page lists wage and 22-product price files (prices 1500-1914 only); the 1209-1500 price file and the Economic History Review article were not opened (paywalled; the farm-day-wage series has no download link on the page). No price is written | development | none | none | https://faculty.econ.ucdavis.edu/faculty/gclark/data.html (listing only) | no |
| T25 | towns: urban share | observation `urban.share` | open | fraction | region.england | open | open | low: the only urban figure read is for 1300, not 1270 (T26); no 1270 urban share opened | development | none | none | none | no |
| T26 | towns: urban share, 1300 | observation `urban.share` | 0.04 | fraction of population (4.0 per cent), settlements of at least 10,000 | region.england | 1300 | researched | low: BCKOvL text reports Malanima (2009a) rather than its own estimate (cited through another work, rule a); 1300 is not 1270; the paper does not say how Malanima's cut-off matches medieval towns | development | CAT-BCKOVL-2010 | text pp. 30-31, "urbanisation ratio for England rising from 4.0 per cent in 1300 to 13.2 per cent by 1700" | same as T1 | yes |
| T27 | towns: sizes of London and others | observation `settlement.population` | open | persons | region.england | open | open | low: no source opened gives a town population for 1270 (Wikipedia demography page has national totals only) | development | none | none | none | no |
| T28 | population cross-check for S1 | observation `population.total` | 4430000 | persons | region.england | 1279 (table year) | researched | low: Wikipedia table "Population 1086-1700", source line names Broadberry et al. 2010 ("English Medieval Population: Reconciling Time Series and Cross Sectional Evidence", a different paper from CAT-BCKOVL-2010) and Wrigley and Schofield; the cited paper itself was not opened, so cited-through. It differs from S1 (4.40 M, 1270/79 average), hence its own row | development | CAT-WIKI-DEMOENG | "Population 1086-1700" table, 1279: 4,430,000 | https://en.wikipedia.org/wiki/Demography_of_England | yes |
| T29 | ships: ship service of the Cinque Ports | attestation presence (institution and duty) | the ports owed "57 ships for 15 days' service to the king annually" | | region.england | royal charter of 1155; "in the 13th and 14th centuries the ports did play a significant role in the defence of the realm" (calendar not stated) | researched | low: Wikipedia, secondary; the article gives no 13th-century charter about ships (earliest general charter of liberties 1260) | none | CAT-WIKI-CINQUE | article body, charter and ship-service passages | https://en.wikipedia.org/wiki/Cinque_Ports | yes |
| T30 | ships: number of ships in England | observation `ship.count` | open | ships | region.england | open | open | low: no source opened counts English ships in 1270; T29 is a service owed, not a fleet count | development | none | none | none | no |
| T31 | climate | observation `climate.temperature-anomaly` | open | | region.england | open | open | low: Wikipedia's Medieval Warm Period page gives no England figure for the 13th century; it says only "an almost continuous run of warm summers from 1170 to 1310" for Central Europe and that late 10th to early 13th centuries "appear to have been exceptionally warm in western Europe" (not England-specific, so not written) | development | CAT-WIKI-MWP (no record) | not found | https://en.wikipedia.org/wiki/Medieval_Warm_Period | yes |
| T32 | royal institution: Exchequer | attestation presence | Exchequer existed | | region.england | "first recorded in 1110" (royal writ of Henry I); plea rolls of the Exchequer from 1236 (calendar not stated) | researched | low: Wikipedia, secondary; the first 100,000 characters of the page were read, the rest not | none | CAT-WIKI-EXCHEQUER | lead and history sections ("The existence of an Exchequer in England was first recorded in 1110"; "the earliest plea rolls of the Exchequer date from 1236") | https://en.wikipedia.org/wiki/Exchequer | yes |
| T33 | royal institution: Parliament with burgesses | attestation presence | Parliament met with burgesses summoned | | region.england | January 1265 (Simon de Montfort's parliament, "burgesses ... were summoned along with knights of the shire" for the first time); Model Parliament November 1295 (T34 is for 1295) | researched | low: Wikipedia, secondary; first 100,000 characters read | none | CAT-WIKI-PARLENG | sections on 1265 and 1295 | https://en.wikipedia.org/wiki/Parliament_of_England | yes |
| T34 | royal institution: Model Parliament | attestation adoption | Model Parliament of 1295 (two knights per shire, two burgesses per borough) | | region.england | November 1295; after the 1270 benchmark, so only for the later series | researched | low: as T33 | none | CAT-WIKI-PARLENG | same | https://en.wikipedia.org/wiki/Parliament_of_England | yes |
| T35 | royal institution: Hundred Rolls (feeds SHEET S6, manors) | attestation presence | royal surveys of liberties (1274-5) and land ownership (1279-80) | | region.england | 1274-5 and 1279-80 as the page gives them | researched | low: Wikipedia, secondary; page says nothing on manors, so S6 stays `open` | none | CAT-WIKI-HUNDREDROLLS | lead | https://en.wikipedia.org/wiki/Hundred_Rolls | yes |

Notes. T14-T18 are 1270-1279 ten-year averages, so against a "1270" benchmark they carry the decade as their date.
T21-T23 are decade values for the 1270s as the table labels them ("1270"). T1-T8 are the single year 1270.
Table 24 of the paper (p. 61) prints GDP per head 638 (1990 international dollars) for 1270, but the extract does not
show which of its four columns the 1270 value sits in, and GDP per head is a trajectory series; no row is written.
`benchmark_role` for T20 is kept `development` even though it is `open`.

## Table 2: `CAT-` source list (one `data/source/cat-<slug>.json` per row; schema needs `title` and `rights`)

| key | title | author | year | gives | url | rights |
|---|---|---|---|---|---|---|
| CAT-BCKOVL-2010 | British economic growth: 1270-1870 (CAGE Working Paper 35) | S. N. Broadberry, B. M. S. Campbell, A. Klein, M. Overton, B. van Leeuwen | 2010 | Now read in full text: Tables 1, 2, 4 and 23 and the urbanisation sentence (T1-T19, T26; S1 population) | https://wrap.warwick.ac.uk/57581/ (full text: https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf) | in copyright, cited only; openly hosted by the University of Warwick repository (same as SHEET.md) |
| CAT-CLARK-EARN-2011 | Average Earnings and Retail Prices, UK, 1209-2010 (Measuring Worth documentation), Table 17 | Gregory Clark | 2011 (dated 10-30-2011; file name 2017) | Decadal annual earnings, cost of living and real earnings for the 1270s (T21-T23) | https://www.measuringworth.com/datasets/ukearncpi/earnstudynew2017.pdf | in copyright, cited only; no copyright or licence statement found in the text read (searched the extract for copyright, licence, reproduction, permission) |
| CAT-WIKI-DEMOENG | Demography of England (Wikipedia) | Wikipedia contributors | page as read 2026-11-01 | National population at 1279 (T28) | https://en.wikipedia.org/wiki/Demography_of_England | Wikipedia text is CC BY-SA; licence line not re-read this session, so confirm before N4 |
| CAT-WIKI-CINQUE | Cinque Ports (Wikipedia) | Wikipedia contributors | page as read 2026-11-01 | 1155 charter, 57 ships for 15 days (T29) | https://en.wikipedia.org/wiki/Cinque_Ports | as CAT-WIKI-DEMOENG |
| CAT-WIKI-EXCHEQUER | Exchequer (Wikipedia) | Wikipedia contributors | page as read 2026-11-01 | First record 1110, plea rolls 1236 (T32) | https://en.wikipedia.org/wiki/Exchequer | as CAT-WIKI-DEMOENG |
| CAT-WIKI-PARLENG | Parliament of England (Wikipedia) | Wikipedia contributors | page as read 2026-11-01 | 1265 burgesses, 1295 Model Parliament (T33, T34) | https://en.wikipedia.org/wiki/Parliament_of_England | as CAT-WIKI-DEMOENG |
| CAT-WIKI-HUNDREDROLLS | Hundred Rolls (Wikipedia) | Wikipedia contributors | page as read 2026-11-01 | Survey dates 1274-5 and 1279-80 (T35) | https://en.wikipedia.org/wiki/Hundred_Rolls | as CAT-WIKI-DEMOENG |

Keys already in SHEET.md keep their key (CAT-BCKOVL-2010 above is the same work). Not given a record: Wikipedia's
Medieval Warm Period page (T31, no value written). Secondary encyclopedia pages are weak for H1 sourcing; the first
real work to open for each is named in the searches below.

S8 not found: searched in SHEET.md S8 (5176, ISSUES I-1028); no new search was run in this sheet, and no work opened for the T rows states Julian reckoning in England before 1752.

## Searches that found nothing

- Pasture acres 1270: the BCKOvL tables read (1, 2, 4) give arable and animals only; the pastoral chapter text was
  not read beyond keyword hits. A session to read pp. 30-40 in full should look for a pasture or meadow area (T20).
- Clark 1209-1500 prices and the farm day wage series: UC Davis page lists no download for either; the Economic
  History Review article is paywalled; the Measuring Worth documentation gave earnings only (T24).
- Working animals (horses, oxen) in numbers: the paper shows them only in Figure 2 (a chart), so no number was read.
- Town sizes in 1270 (London, Norwich, etc.): Wikipedia's demography page gives no town figures; no other work
  opened (T27). Not searched further: Russell, *British Medieval Population* (1948), Campbell's town work.
- English fleet size: no opened source (T30); only the Cinque Ports duty (T29). Not searched: the Pipe and Close
  Rolls, naval histories.
- Climate for England in the 13th century: Wikipedia MWP page has Europe-wide statements only (T31); Lamb's
  central England temperature series and Hubert Lamb's work were not opened.
- Manors (S6): Hundred Rolls page gives dates only (T35).
