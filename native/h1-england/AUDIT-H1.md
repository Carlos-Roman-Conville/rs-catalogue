# AUDIT-H1: V4 audit of the H1 England native rows (N5)

Written 2026-11-01 by task 5200 (Opus). The auditor wrote none of these rows (N3 Sonnet wrote the sheet, N4/5198
Composer the records). No record is edited here; each failure names its fix for a later fix unit.

## Method

- **Scope: every native row.** A native row is an attestation or observation citing a `CAT-` source record
  (NATIVE-PLAN ruling (a)). A Grep of `data/` for `source.cat-` finds six, all written by 9259446 (N4) and
  4451259 (5198, N4 redo): one on `region.england`, one on `calendar.julian`, two on
  `calendar.lady-day-year-start`, one on `calendar.gregorian`, one on `calendar.january-year-start`.
  `institution.manor`, the mill records and `data/organism/` carry no `CAT-` row (none written: S3-S6, S14, S15 are
  attestations or observations with nothing found, so rule (c) leaves them in the sheet). The `CAT-Q1` text in the
  equipment records is a decision key, not a source.
- **Each source opened at its locator this session:**
  - CAT-ACT-1750: https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain, preamble and ss. 1-2, read through
    WebFetch with verbatim quotes.
  - CAT-CATHEN-1908: https://www.newadvent.org/cathen/03738a.htm, section "Beginning of the year".
  - CAT-LBORO-2026: the press release of 25 March 2026 at the record's URL.
  - CAT-BCKOVL-2010: the record page https://wrap.warwick.ac.uk/57581/ and the full text
    https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf. WebFetch could not read the PDF, but
    saved it; its text was extracted locally with pypdf (71 pages) and Tables 18 and 23 were read.
- **Fields checked per row:** value, label, confidence (level and reason), date (`from`, `to`, precision,
  `calendar_of_source`, `year_start_of_source`), place, sources, `note`, `benchmark_role`; against rulings
  (a)-(c) and (f) of NATIVE-PLAN and DESIGN-V4 (e), (k), (l). How dates are compared: NATIVE-PLAN B2 matches a
  calendar attestation's interval against a date "as written" (the 3-13 September 1752 gap matches no record),
  so calendar intervals are checked as the source writes them, and `calendar_of_source` must name the calendar
  that source date is in.

## Rows

| # | record id | row | check | result | what the source says |
|---|---|---|---|---|---|
| R1 | catalogue/calendar.julian | attestation `presence`, England, `from: null`, `to: 1752-09-02`, day, `calendar_of_source: julian`, researched / high, CAT-ACT-1750 | value, date, calendar, place, label, citation, ruling (f) | **pass** | Preamble: "the calendar now in use throughout all his Majesty's British dominions, commonly called The Julian Calendar". s. 1: "the natural day next immediately following the said second day of September shall be called, reckoned, and accounted to be the fourteenth day of September". So 2 September 1752 (old style) is the last Julian day; the Act applies "throughout all his Majesty's dominions ... belonging or subject to the crown of Great Britain", which holds England. Open start written `from: null` as ruling (f) requires. Remark (not a fail): the note's last sentence "Interval start open (native/h1-england/SHEET.md S8)" is a pointer, not source content; ruling (a) says the note carries the locator and the source's own qualifiers "nothing else", so a fix unit may move it to the record's `notes`. |
| R2 | catalogue/calendar.lady-day-year-start | attestation 1 `presence`, England, `from: 1155` to `1751-12-31`, `calendar_of_source: unknown`, `year_start_of_source: mar-25`, researched / medium, CAT-CATHEN-1908 + CAT-ACT-1750 | value, dates, year start, place, label, citation | **fail** | CAT-CATHEN-1908: "from 1155 till the reform of the calendar in 1752 on 25 March, so that 24 March was the last day of one year, and 25 March the first day of the next"; "1 January was commonly spoken of as New Year's Day". The Act, preamble: "the legal supputation of the year of our Lord in England, according to which the year beginneth on the twenty-fifth day of March"; s. 1 ends it "from and after the last day of December one thousand seven hundred and fifty-one". Value, `from`, `to`, place, label, confidence and note hold. **Fails on `year_start_of_source: mar-25`**: the field states how the source numbers its own years, and the 1908 encyclopedia does not say it writes "1155" in Lady Day reckoning (a modern work numbers years from 1 January; the 25 March it states is the subject of the row, not its own reckoning). The sheet's S9 cell "(calendar not stated; year start 25 March)" ran the two together. |
| R3 | catalogue/calendar.lady-day-year-start | attestation 2 `presence`, England, `from: 1155` to `1751-12-31`, `calendar_of_source: unknown`, `year_start_of_source: mar-25`, researched / low, CAT-LBORO-2026 + CAT-ACT-1750 | as R2 | **fail** | CAT-LBORO-2026 (25 March 2026): "for 600 years between 1155 until 1752 in England and Wales the new year began on 25 March"; names no calendar and no 1 January 1752 date (the `to` comes from the Act, as R2). Label researched with low confidence and the reason (may not be independent of S9) holds under DESIGN-V4 (k). **Fails on `year_start_of_source: mar-25`** for the reason in R2: a 2026 press release numbers its years from 1 January and states nothing about Lady Day numbering of its own dates. |
| R4 | catalogue/calendar.gregorian | attestation `adoption`, England, `from: 1752-09-14`, day, `calendar_of_source: gregorian`, researched / high, CAT-ACT-1750 s. 1 | value, date, calendar, place, label, citation | **pass** | s. 1: the day after 2 September 1752 "shall be called, reckoned, and accounted to be the fourteenth day of September, omitting for that time only the eleven intermediate nominal days of the common calendar"; 14 September is a new-style date, so `gregorian` is right. The note's quotation matches. Remark (not a fail): the Act never uses the word "Gregorian"; it names the reckoning "now generally practised by almost all other nations of Europe" (preamble) and sets the century leap-year rule in s. 2 ("shall not be esteemed or taken to be bissextile or leap years" except "every fourth hundredth year"). The identification rests on ss. 1 and 2 together, so a fix unit may add s. 2 to the note's locator. |
| R5 | catalogue/calendar.january-year-start | attestation `adoption`, England, `from: 1752-01-01`, day, `calendar_of_source: gregorian`, researched / high, CAT-ACT-1750 s. 1 | value, date, calendar, place, label, citation | **fail** | s. 1: "the first day of January next following the said last day of December shall be reckoned, taken, deemed, and accounted to be the first of the year of our Lord one thousand seven hundred and fifty-two". Value, date, place and label hold. **Fails on `calendar_of_source: gregorian`**: 1 January 1752 fell under the old style; the Act keeps Julian reckoning until 2 September 1752 (R1), so the Act's date is a Julian date. Recorded as Gregorian it reads as 11 days later than the day the Act names (B2's reader returns it as written either way, but the field states a calendar the source does not use). |
| R6 | catalogue/region.england | observation `population.total`, `value: null`, persons, England, 1270, `calendar_of_source: unknown`, open / low, `benchmark_role: development`, CAT-BCKOVL-2010 | open row: confirm the cited work gives no value for the date (ruling (c)) | **fail** | The cited work gives the value. Full text, Table 23 "Per capita daily kilocalorie consumption of major arable crops and animal products in England" (printed p. 59, PDF p. 61), first row: "1270/79 4.40" under "Population (mlns)". Table 18 "English population, 1250-1700" (printed p. 54, PDF p. 56), panel A "Levels of population (millions)": 1250 4.23, 1290 4.75, 1300 4.73 (no 1270 level), sources "Medieval period: based on parish data (see text)"; panel B gives growth 1270-1300 0.27 % a year. The row's own reason ("the paper's table was unreadable here, so the value is not confirmed absent") already fails ruling (c), which asks the reason to say the work gives no value for the date. Place, unit and role hold. |

## Result

AUDIT-H1 fail 4/6

## Fixes the failures need (for the fix unit; no record edited here)

1. **R2, R3** (`calendar.lady-day-year-start`, both attestations): remove `year_start_of_source` from each date
   (the schema has no `unknown` value for it; omitted means not stated). Fix the sheet's S9 and S10 date cells to
   drop "year start 25 March" from the source-reckoning note. No change to `from`, `to` or labels. `src/dates.ts`
   needs no new style (rule (e)): nothing in these sources asks for one.
2. **R5** (`calendar.january-year-start`): set `calendar_of_source` to `julian`. Fix the sheet's S12 likewise.
3. **R6** (`region.england`, `population.total`): replace the open row with the value the cited work gives:
   `value: 4400000`, unit persons, date `from: {year: 1270}` `to: {year: 1279}`, precision year (the table's
   "1270/79" is a ten-year average, which the note must say), `calendar_of_source: unknown`, `label: researched`,
   confidence medium with a reason naming the work as a modern reconstruction "based on parish data" (Table 18
   sources), note "CAT-BCKOVL-2010 full text, Table 23 (p. 59), Population (mlns), 1270/79: 4.40", `benchmark_role:
   development` (inside the H1 window). Do not interpolate a 1270 level from Table 18 (that would be an
   `estimate` the source does not state). Update the sheet's S1 and the `gives` field of
   `data/source/cat-bckovl-2010.json` (it still says only the abstract was read), and add the PDF URL as the
   locator's address.
4. Not a row, seen in passing: `region.england`'s `notes` lists `institution.manor` among the "Native H1 rows",
   but the manor record has no native row (S6 is open and, being an attestation, was rightly not written). A fix
   unit may drop it from that sentence.

Then a re-audit of the changed rows before N10, as AUDIT-8 and AUDIT-9 had.
