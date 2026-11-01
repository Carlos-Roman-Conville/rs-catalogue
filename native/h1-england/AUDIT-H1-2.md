# AUDIT-H1-2: re-audit of the H1 England native rows after the AUDIT-H1 fixes (task 5233)

Written 2026-11-01 by task 5233 (Opus). The auditor wrote none of 9625068's edits (Composer, task 5232) and edits
no record here; each failure names its fix for a later fix unit.

## Method

- **Scope.** The six rows of `native/h1-england/AUDIT-H1.md`. R2, R3, R5 and R6 changed in 9625068 and are
  re-audited field by field; R1 and R4 are confirmed unchanged by `git diff 749e5ef HEAD -- data`: the diff touches
  `calendar/january-year-start.json`, `calendar/lady-day-year-start.json`, `region/england.json` and
  `source/cat-bckovl-2010.json` only, so `calendar/julian.json` (R1) and `calendar/gregorian.json` (R4) are as
  AUDIT-H1 passed them.
- **Each source opened this session:**
  - CAT-ACT-1750: https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain, preamble and s. 1, through WebFetch.
  - CAT-BCKOVL-2010: https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf. WebFetch saved the
    PDF but could not read it; its text was extracted locally with pypdf (71 pages) and Table 18 (printed p. 54,
    PDF p. 56) and Table 23 (printed p. 59, PDF p. 61) were read in full, with the text on printed p. 28.
  - CAT-CATHEN-1908 (https://www.newadvent.org/cathen/03738a.htm, "Beginning of the year") and CAT-LBORO-2026 (press
    release of 25 March 2026), both still cited by R2 and R3, reopened to check what date they give for the start.
- **Fields checked per row:** value, label, confidence (level and reason), date (`from`, `to`, precision,
  `circa`, `calendar_of_source`, `year_start_of_source`), place, sources and `note`, `benchmark_role`; against
  NATIVE-PLAN rulings (a)-(f), with rule (c) as amended this task (an `open` row names the parts read and says the
  full text was read), DESIGN-V4 (j)-(l) and DESIGN §1.3 ("dates as intervals with precision, never false points").
  A date point's missing month or day denotes the start of the stated year (`src/schema.ts`, interval check).

## Rows

| # | record id | check | result | what the source says |
|---|---|---|---|---|
| R1 | catalogue/calendar.julian | unchanged since AUDIT-H1 | **pass** | Not in the 749e5ef..HEAD diff. Act preamble reopened: "commonly called The Julian Calendar"; s. 1: "the natural day next immediately following the said second day of September shall be called, reckoned, and accounted to be the fourteenth day of September". AUDIT-H1's pass holds. |
| R2 | catalogue/calendar.lady-day-year-start, attestation 1 (CAT-CATHEN-1908 + CAT-ACT-1750) | year start, precision, dates, calendar, place, label, confidence, note, citation | **fail** | `year_start_of_source` removed: the AUDIT-H1 failure is fixed. Value, `from: {year: 1155}`, `to: 1751-12-31`, `calendar_of_source: unknown`, place, label researched / medium and note hold: "from 1155 till the reform of the calendar in 1752 on 25 March, so that 24 March was the last day of one year, and 25 March the first day of the next"; Act s. 1: "from and after the last day of December one thousand seven hundred and fifty-one". **Fails on `precision`**, changed by 9625068 from `year` (as AUDIT-H1 passed it) to `day`, which the AUDIT-H1 fix list did not ask for ("No change to `from`, `to` or labels"). The encyclopedia gives the start as the year 1155 only, no month or day. At day precision `from: {year: 1155}` reads as the day 1 January 1155, a point no source states (DESIGN §1.3; DESIGN-V4 (j): precision says what the bounds are), and under the very style the row attests 1155 began on 25 March. |
| R3 | catalogue/calendar.lady-day-year-start, attestation 2 (CAT-LBORO-2026 + CAT-ACT-1750) | as R2 | **fail** | `year_start_of_source` removed: fixed. Release of 25 March 2026: "for 600 years between 1155 until 1752 in England and Wales the new year began on 25 March"; year only for 1155, no month or day. Label researched / low with its independence reason holds (DESIGN-V4 (k)). **Fails on `precision: day`** for the reason in R2. |
| R4 | catalogue/calendar.gregorian | unchanged since AUDIT-H1 | **pass** | Not in the 749e5ef..HEAD diff. s. 1's "fourteenth day of September" reread; AUDIT-H1's pass holds. |
| R5 | catalogue/calendar.january-year-start | calendar, date, precision, place, label, confidence, note, citation | **pass** | `calendar_of_source` now `julian`: the AUDIT-H1 failure is fixed. s. 1: "the first day of January next following the said last day of December shall be reckoned ... to be the first of the year of our Lord one thousand seven hundred and fifty-two"; that day falls before the Julian reckoning ends on 2 September 1752 (R1), so it is a Julian date. `from: 1752-01-01`, day precision (the Act names the day), no `year_start_of_source` (the Act's date needs none: it is the day the new start begins), place England, researched / high "Act text opened", note quotes s. 1. Sheet S12 matches. |
| R6 | catalogue/region.england, observation `population.total` | value, unit, date, precision, calendar, place, label, confidence, note, citation, role; rule (c) | **pass** | Table 23 "Per capita daily kilocalorie consumption of major arable crops and animal products in England", printed p. 59, column "Population (mlns)", first row "1270/79 4.40": `value: 4400000` persons holds. Date `from: 1270`, `to: 1279`, precision year, `circa: false`, `calendar_of_source: unknown`: the source's own period, not re-dated to 1270 (NATIVE-PLAN "Dates are the source's own"); Table 18 panel B and p. 28 call such periods "10-year averages", so the note's "Ten-year average 1270/79" is the source's qualifier (rule (a), DESIGN-V4 (l)). Place: "in England" (Table 23), "English population" (Table 18). Label researched, confidence medium with reason "Table 18 sources the medieval period as based on parish data": Table 18 sources read "Medieval period: based on parish data (see text)"; Table 18 has no 1270 level (1250 4.23, 1290 4.75), so no interpolation was written. `benchmark_role: development`: England, overlapping the H1 window 1270-1700. The row is no longer `open`, so amended rule (c) does not apply to it; its source record's `gives` now names the full text and Table 23 p. 59, which is what rule (c) asks of a search. |

## Result

AUDIT-H1-2 fail 2/6

## Fixes the failures need (for the fix unit; no record edited here)

1. **R2, R3** (`calendar.lady-day-year-start`, both attestations): set `precision` back to `year`, as AUDIT-H1
   passed it; no other field changes. The `to` point keeps its day (31 December 1751, from the Act), as R2 and R3
   did at AUDIT-H1. Then AUDIT-H1-3 re-audits R2 and R3 only.

Remark (not a fail): `data/source/cat-bckovl-2010.json` names the PDF address in `gives` but its `url` is still
the record page; AUDIT-H1 fix 3 asked for the PDF as the locator's address. Both pages are public and the PDF is
reachable from the record page, so the citation resolves; a fix unit may set `url` to the PDF.
