# H1 England 1270: sourcing sheet (N3, NATIVE-PLAN Part A rows A1-A8)

Written 2026-11-01. Sheet only: no record, no code. Rulings (a)-(c) of NATIVE-PLAN apply. A value is here only if
the work was opened and read in this session. WebFetch could not read the two PDF copies of the BCKOvL working
paper (compressed streams), and this task has no subagents, so every population, crop, plough, mill and manor
value is `open`. Nothing is filled from the ROADMAP's ~4.5-5 M or from memory. A figure seen only in a
search-result summary is not a value: it is a lead, named in the reason, and the work is `opened: no`.

`benchmark_role` is `development` on every observation (England, within H1 1270-1700); attestations have no role.
Place is `region.england` throughout.

## Table 1: attestations and observations to write

| id | kind | row type | value | unit | place | date as source gives it (calendar / year start) | label | confidence and reason | benchmark_role | work | locator | url | opened |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | region.england (A1) | observation `population.total` | open | persons | region.england | 1270 asked; none given | open | low: the abstract page gives no population figure; the paper's table was unreadable here, so the value is not confirmed absent | development | CAT-BCKOVL-2010 | record page abstract only; population table not read | https://wrap.warwick.ac.uk/57581/ | page yes, PDF no |
| S2 | region.england (A1 cross-check) | observation `population.total` | open | persons | region.england | 1270 asked | open | low: Campbell, *The Great Transition* not found online in readable form; second source for A1 still to find | development | none | none | none | no |
| S3 | technology.watermill (A4) | attestation presence | open | | region.england | open | open | low: lead only. A review snippet says Holt, *The Mills of Medieval England* (1988) reports 6,082 water mills in Domesday Book (1086); snippet is not a source, book not opened. Date, count and wording to be taken from the book | none | CAT-HOLT-1988 (lead, no record) | not found | none | no |
| S4 | technology.windmill (A4) | attestation presence | open | | region.england | open | open | low: lead only. The same snippet says Holt dates the windmill's arrival "shortly before 1189"; not opened. The windmill native row waits for N2 (rule d) | none | CAT-HOLT-1988 (lead, no record) | not found | none | no |
| S5 | technology.watermill / windmill (A4) | observation `mill.count` | open | mills | region.england | open | open | low: a snippet says about 10,000 mills c. 1300 (Langdon, *Mills in the Medieval Economy*, 2004); not read, so no value is written | development | CAT-LANGDON-2004 (lead, no record) | not found | https://muse.jhu.edu/article/186647/pdf (review listing, not opened) | no |
| S6 | institution.manor (A5) | attestation presence | open | | region.england | open | open | low: no work on manors was opened (BCKOvL, Campbell, Kosminsky not read) | none | none | none | none | no |
| S7 | calendar.julian (A6), end | attestation presence | Julian reckoning in use | | region.england | to 2 September 1752, the last old-style day (Julian per the Act's preamble, "commonly called The Julian Calendar") | researched | high: Act text opened and read; it names the last old-style day and says the next is 14 September | none | CAT-ACT-1750 | s. 1 and preamble | https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain | yes |
| S8 | calendar.julian (A6), start | attestation presence | open | | region.england | open (the earliest date a source states) | open | low: no handbook of dates (Cheney, *Handbook of Dates*) found online; no opened work states Julian use in 1270. S7 keeps its `to` and has `from` null until a source gives it | none | CAT-CHENEY-HANDBOOK (lead, no record) | not found | none | no |
| S9 | calendar.lady-day-year-start (A7) | attestation presence | Annunciation style (25 March) | | region.england | from 1155 "till the reform of the calendar in 1752" (calendar not stated; year start 25 March) | researched | medium: a 1908 encyclopedia article, secondary; says 24 March was the last day of one year and 25 March the first of the next; also says 1 January was "commonly spoken of as New Year's Day" in the same period | none | CAT-CATHEN-1908 | "Beginning of the year" in General Chronology (J. Gerard) | https://www.newadvent.org/cathen/03738a.htm | yes |
| S10 | calendar.lady-day-year-start (A7), second source | attestation presence | Annunciation style (25 March) | | region.england | "for 600 years between 1155 until 1752 in England and Wales" (year start 25 March; calendar not stated) | researched | low: a university press release that links a longer article not opened; same start year as S9, so it agrees but may not be independent (the Wikipedia Lady Day article, also read, cites the S9 encyclopedia). Kept as its own row | none | CAT-LBORO-2026 | press release of 25 March 2026 | https://www.lboro.ac.uk/media-centre/press-releases/2026/march/lady-day-march-25-was-start-of-year-until-1752/ | yes |
| S11 | calendar.lady-day-year-start (A7), end | attestation presence (`to`) | ends 31 December 1751 | | region.england | the old reckoning is not used "from and after the last day of December" 1751; 1 January 1752 is "the first of the year of our Lord" 1752 | researched | high: Act text opened | none | CAT-ACT-1750 | s. 1 | https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain | yes |
| S12 | calendar.january-year-start (A8) | attestation adoption | 1 January year start | | region.england | from 1 January 1752 (the Act's own date) | researched | high: Act text opened | none | CAT-ACT-1750 | s. 1 | https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain | yes |
| S13 | calendar.gregorian (A8) | attestation adoption | Gregorian reckoning | | region.england | from 14 September 1752; the day after 2 September 1752 "shall be called, reckoned, and accounted to be the fourteenth day of September" | researched | high: Act text opened | none | CAT-ACT-1750 | s. 1 | https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain | yes |
| S14 | crops (A2: wheat, barley, oats, rye, peas, beans) | attestation presence; observation `crop.yield-ratio` | open | ratio | region.england | open | open | low: no arable source opened (BCKOvL's arable chapter unreadable here; Campbell, *English Seigniorial Agriculture 1250-1450* not opened). No opened source names a crop, so no attestation is written | development (observation only) | none | none | none | no |
| S15 | ploughs (A3: mouldboard plough, oxen, horses) | attestation presence; observation `draught.horse-share` | open | fraction | region.england | open | open | low: Langdon, *Horses, Oxen and Technological Innovation* (1986) not found or opened | development (observation only) | none | none | none | no |

Notes on year start (rule e). The only sources opened that state it (S9, S10) put the English year at 25 March
from 1155, so 1270 sits in Lady Day style. S9 also says the year began on 1 January from 1087 to 1155 and, before
1066, on 25 March or 25 December. `src/dates.ts` has `jan-1` and `mar-25`, and the 1270 row needs `mar-25`, so
**no new style is needed for 1270**: N7 adds none on this evidence. A 25 December year would need one, but only
before 1066, outside H1. A handbook of dates (Cheney) should still be opened to confirm 1270 itself; until then
S9 is medium.

## Table 2: `CAT-` source list (one `data/source/cat-<slug>.json` per row; schema needs `title` and `rights`)

| key | title | author | year | gives | url | rights |
|---|---|---|---|---|---|---|
| CAT-ACT-1750 | Calendar (New Style) Act 1750 (24 Geo. 2 c. 23) | Parliament of Great Britain | 1750 | The last old-style day in England (2 September 1752), Gregorian from 14 September 1752, 1 January 1752 as the year's first day (S7, S11, S12, S13) | https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain | UK legislation, Crown copyright; the page fetched showed no licence line, so N4 confirms the legislation.gov.uk terms (Open Government Licence expected) |
| CAT-CATHEN-1908 | General Chronology, section "Beginning of the year", in The Catholic Encyclopedia | J. Gerard | 1908 | England's year start by period: 25 March or 25 December before 1066, 1 January 1087-1155, 25 March 1155-1752 (S9) | https://www.newadvent.org/cathen/03738a.htm | public domain (published 1908) |
| CAT-LBORO-2026 | Lady Day: March 25 was the start of the year in England and Wales until 1752 | Loughborough University Media Centre | 2026 | A second statement of the 1155-1752 span (S10) | https://www.lboro.ac.uk/media-centre/press-releases/2026/march/lady-day-march-25-was-start-of-year-until-1752/ | in copyright, cited only |
| CAT-BCKOVL-2010 | British economic growth: 1270-1870 (CAGE Working Paper 35) | S. N. Broadberry, B. M. S. Campbell, A. Klein, M. Overton, B. van Leeuwen | 2010 | Only the abstract page was read: it gives no 1270 population figure (S1 open). Population, land use and yield tables are in the full text, not yet read | https://wrap.warwick.ac.uk/57581/ (full text: https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf) | in copyright, cited only; openly hosted by the University of Warwick repository |

Works named as leads and not opened, so no source record yet: Holt, *The Mills of Medieval England* (1988); Langdon,
*Mills in the Medieval Economy* (2004); Langdon, *Horses, Oxen and Technological Innovation* (1986); Cheney,
*Handbook of Dates*; Campbell, *The Great Transition* and *English Seigniorial Agriculture 1250-1450*; Kosminsky,
*Studies in the Agrarian History of England in the Thirteenth Century*; the 2015 Cambridge book of BCKOvL. The keys
`CAT-HOLT-1988`, `CAT-LANGDON-2004` and `CAT-CHENEY-HANDBOOK` in Table 1 are placeholders; N4 writes no record
for them.

## Searches that found nothing

- BCKOvL 2010 working paper, population 1270, grain yields, mill counts: the record page (wrap.warwick.ac.uk/57581)
  has no figure; both PDF copies (wrap.warwick.ac.uk, gcoe.ier.hit-u.ac.jp) were unreadable through WebFetch. A
  session that can read a PDF should open the population table and arable section, then redo S1 and S14.
- BCKOvL 2015 book tables: web search for the 1270 population returned only the working paper and publisher pages,
  none with the figure.
- Campbell, *The Great Transition*: web search for the 1270 population; no readable text found.
- Handbook of dates (Cheney) for the English year start and Julian use in 1270: not found online; the year start
  came from the 1908 encyclopedia instead (S9). The earliest date of Julian use in England (S8): no source found.
- Mills (Holt 1988, Langdon 2004, Domesday 1086): web search returned review snippets and library listings only; no
  page of either book was opened, so S3-S5 stay `open`.
- Manor (Kosminsky; Hundred Rolls 1279-80): not searched beyond BCKOvL; no source opened (S6).
- Ploughs and draught animals (Langdon 1986): not found.
