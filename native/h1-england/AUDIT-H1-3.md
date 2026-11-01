# AUDIT-H1-3: re-audit of R2 and R3 (Lady Day year start) after fix 5245 (task 5246)

Written 2026-11-01 by task 5246 (Opus). The auditor wrote neither 5232's (9625068) nor 5245's (5b6ce99) edits and
edits no record here.

## Method

- **Scope.** R2 and R3 only: the two attestations of `catalogue/calendar.lady-day-year-start`
  (`data/calendar/lady-day-year-start.json`). AUDIT-H1-2 failed both on `precision: day` and asked (fix 1) for
  `precision` back to `year`, nothing else changed. Plus the Broadberry `url` remark (AUDIT-H1 fix 3).
- **Diff.** `git diff 6eb8e88 -- data/calendar data/source` shows exactly three changed lines: `precision` `day` →
  `year` in each of the two attestations, and `url` of `data/source/cat-bckovl-2010.json`. No other field of R2 or R3
  changed.
- **Each source opened this session (WebFetch):**
  - CAT-CATHEN-1908: https://www.newadvent.org/cathen/03738a.htm, General Chronology (J. Gerard, 1908), "Beginning
    of the year".
  - CAT-LBORO-2026: https://www.lboro.ac.uk/media-centre/press-releases/2026/march/lady-day-march-25-was-start-of-year-until-1752/,
    release of 25 March 2026.
  - CAT-ACT-1750: https://www.legislation.gov.uk/apgb/Geo2/24/23?view=plain, preamble and s. 1.
- **Checked against** NATIVE-PLAN rulings (a)-(f), DESIGN §1.3 and the interval validator in `src/schema.ts`
  (a point's missing month or day denotes the start of the stated year or month).

## Precision ruling (review 1101-1252 fix 2)

The row carries `precision: year`, with `from: {year: 1155}` and `to: {year: 1751, month: 12, day: 31}`. **This is a
valid interval.** DESIGN §1.3 gives every date one interval with one `precision`; it does not give each bound its
own. The single field must therefore state the coarsest bound, or the interval claims more than its sources say:
the encyclopedia and the release give 1155 as a year only, so at `day` the `from` would read as the day 1 January
1155, a point no source states (and under the very style the row attests, 1155 began on 25 March). At `year`,
`from` says "in 1155", which is what both sources say. The `to` keeps the day the Act names (the old reckoning
"shall not be made use of from and after the last day of December one thousand seven hundred and fifty-one"); a
bound finer than the stated precision loses nothing and asserts nothing false, since 31 December 1751 lies in 1751.
`src/schema.ts` accepts it: `from` normalises to 1155-01-01, before 1751-12-31, so no `from > to`; ruling (f) does
not apply (the start is known, not open). Row precision: **year**, because the least precise bound (1155) is a year.

## Checks

| id | row | check | result | what the source says |
|---|---|---|---|---|
| C1 | R2 | value (`presence`, Annunciation style) | **pass** | CATHEN: "from 1155 till the reform of the calendar in 1752 on 25 March, so that 24 March was the last day of one year, and 25 March the first day of the next". |
| C2 | R2 | label `researched`, rule (a) | **pass** | Cites CAT- keys only (CAT-CATHEN-1908, CAT-ACT-1750), both opened this session. |
| C3 | R2 | confidence medium and reason | **pass** | Reason quotes the article's own qualifier: "it is clear that 1 January was commonly spoken of as New Year's Day"; a 1908 secondary work, so medium holds. |
| C4 | R2 | `from: {year: 1155}` | **pass** | CATHEN gives "from 1155" with no month or day; written as the year only. |
| C5 | R2 | `to: 1751-12-31` | **pass** | Act s. 1: "shall not be made use of from and after the last day of December one thousand seven hundred and fifty-one"; "the first day of January next following the said last day of December" begins 1752. |
| C6 | R2 | `calendar_of_source: unknown` | **pass** | CATHEN names no calendar for its 1155. Unchanged since AUDIT-H1 and AUDIT-H1-2, both passed it. See remark 1. |
| C7 | R2 | `year_start_of_source` absent | **pass** | Absent (AUDIT-H1 fix 1 holds); the article does not say it numbers its own years from 25 March. |
| C8 | R2 | `precision: year` | **pass** | See the precision ruling: the coarsest bound, 1155, is a year in the source. AUDIT-H1-2 fix 1 applied as written. |
| C9 | R2 | place `region.england` | **pass** | CATHEN: "In England before the Norman Conquest ..." then the 1155 span, same sentence; Act preamble: "the legal supputation of the year of our Lord in England ... beginneth on the twenty-fifth day of March". |
| C10 | R2 | note and citation locators, rule (a) | **pass** | Note quotes "from 1155 till the reform of the calendar in 1752" with locator "Beginning of the year" in General Chronology, and "CAT-ACT-1750 s. 1"; both match the opened pages. Source record url resolves. |
| C11 | R2 | `benchmark_role` | **pass** | An attestation has no `benchmark_role` (`src/schema.ts`: observations only); none written. Rulings (c), (d), (e) do not apply (not open, not script-ingested, `mar-25` exists). |
| C12 | R3 | value | **pass** | LBORO, 25 March 2026: "for 600 years between 1155 until 1752 in England and Wales the new year began on 25 March." |
| C13 | R3 | label `researched`, rule (a) | **pass** | CAT-LBORO-2026 and CAT-ACT-1750, both opened this session. |
| C14 | R3 | confidence low and reason | **pass** | A press release; reason states it may not be independent of the encyclopedia (DESIGN-V4 (k)). |
| C15 | R3 | `from: {year: 1155}` | **pass** | "between 1155 until 1752": year only. |
| C16 | R3 | `to: 1751-12-31` | **pass** | From the Act, as C5; the release itself gives only "until 1752". |
| C17 | R3 | `calendar_of_source: unknown` | **pass** | The release names no calendar. See remark 1. |
| C18 | R3 | `year_start_of_source` absent | **pass** | As C7; a 2026 release numbers its years from 1 January and states nothing of its own reckoning. |
| C19 | R3 | `precision: year` | **pass** | As C8. |
| C20 | R3 | place `region.england` | **pass** | Release: "in England and Wales"; England is inside what it states. |
| C21 | R3 | note and citation locators | **pass** | Note quotes "for 600 years between 1155 until 1752 in England and Wales" with "press release of 25 March 2026"; title and date match the page. |
| C22 | R3 | `benchmark_role` | **pass** | As C11. |
| C23 | both | no other field changed since 6eb8e88 | **pass** | `git diff 6eb8e88 -- data/calendar` changes only the two `precision` lines. |
| C24 | — | `data/source/cat-bckovl-2010.json` `url` is the PDF (AUDIT-H1 fix 3) | **pass** | `url` is now `https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf`, the address `gives` names; was the record page at 6eb8e88. |

## Result

AUDIT-H1-3 pass 24/24

No fixes needed.

## Remarks (not fails)

1. **Calendar of the `to` bound.** The `to` point 31 December 1751 is the Act's date, which is Julian (the Act's
   s. 1 Gregorian reckoning starts only on 14 September 1752), while the interval's single `calendar_of_source` is
   `unknown` because the 1155 sources name no calendar. Writing `julian` would assert a calendar for 1155 that no
   opened CAT- source states (SHEET S8: no source found for Julian use before 1752). At year precision the
   distinction matters only if a reader converts the `to` bound to Gregorian (Julian 31 December 1751 is
   Gregorian 11 January 1752). A later unit that finds a source for S8 can set `julian` on both attestations.
