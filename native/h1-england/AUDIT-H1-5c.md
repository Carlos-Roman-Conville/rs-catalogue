# AUDIT-H1-5c: re-audit of the fixes in commits a0ecbfe and 0665570 (task 5318)

Written 2026-11-01 by task 5318 (Haiku). The auditor wrote neither the X5 records, the 5311 and 5312 work, nor either fix.
This is a text check of `data/region/england.json` only. No record was edited.

## Method

- **Commits.** No commit message starts with `5316`. The commit the keeper's list calls 5316 is taken to be `a0ecbfe`
  ("AUDIT-H1-5b F2, F6, F9, F11, F13, F15: reasons rewritten after reading the sources"). The 5317 commit is `0665570`.
  Both were read with `git show`, and each is a diff of `data/region/england.json` only.
- **Changed lines.** `a0ecbfe` changes 13 `reason` lines: the eight Table 19 decade rows (F2, including obs 25, row 43),
  obs 55 (F6), obs 94 (F9 text, see Remark 1), obs 104 (F11), obs 105 (F13) and obs 106 (F15).
  `0665570` changes 20 `reason` lines: obs 39 (arable 1700), obs 40, 41, 43, 44, 45, 46, 47 (sown 1300 to 1700),
  obs 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87 (Clark wages 1300 to 1700) and obs 103 (yield estimate 1380).
  The `obs` numbers are positions in `observations[]`.
- **Step 2 rule.** A fix row must carry its fix text from `AUDIT-H1-5b.md` word for word. Where the `a0ecbfe` commit says
  the fix was not confirmed (F6, F9, F11, F13, F15), the reason must name every cited work, say how much of each was read,
  and point nowhere (NATIVE-PLAN ruling (c)). `benchmark_role` fixes (F5, F10, F12, F14) must add the field.
- **Step 3 rule.** Each reason `0665570` changed that is not a step 2 row must state grounds copied from the row it
  pointed to, and add no value, date or claim that row does not carry.
- **Step 3(b) rule.** Scanned every `reason` in `england.json` for a start of `as above`, `as the`, or a sheet id.
- **Step 4 rule.** Every changed line of both commits was checked for a field other than `reason`.
- **Checks counted.** 14 (step 2) + 16 (step 3 rows) + 2 (step 3(b), step 4) = 32.

## Checks

| check | record (obs) | pass/fail | what the record says |
|---|---|---|---|
| R43-L | population 1300/09, 4.72 (obs 25) | fail | Reason is the F2 text plus an added clause: "...so that it is the Table 16 series is inferred from the shared decade labels and the text's 4.72 million average for 1300/09, not stated)". F2 text not word for word. See fix below. |
| R57-L | arable 1700 (obs 39) | pass | "modern reconstruction, secondary; printed in million acres; a different working paper from CAGE WP 35 (2010), whose Table 1 gives 11.52 for 1270 and 1300". Matches F3 word for word. |
| R64-L | sown 1650 (obs 46) | pass | "modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)". Matches F4 word for word. |
| R73-L | gdp per head, open (obs 55) | pass | Names CAT-BCKOVL-2010-WP21 ("searched for per-head terms (not read in full)") and CAT-MEDIEVALISTS-2010 ("the abstract only, was read"). Points to no record. Table 24 is a locator in a cited work, not opened, and the reason says so. |
| R73-C | gdp per head, open (obs 55) | fail | No `benchmark_role` field. F5 not applied. |
| R85-L | wage 1300 (obs 67) | pass | "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)". Matches F7 word for word. |
| R99-L | wage 1600 (obs 81) | pass | Same text as obs 67. Matches F8 word for word. |
| R113-L | plague 1471 (obs 95) | fail | Reason is unchanged: "Wikipedia reporting other authors (cited through, rule a); authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million". The F9 text was applied to obs 94 (1369) instead. See Remark 1. |
| R122-L | tax crown revenue, open (obs 104) | fail | Reason names both works and gives the extent ("read to its end"), but ends "poll-tax yields above are single taxes": a pointer to other records. Fails "points nowhere". Not word for word with F11. |
| R122-C | tax crown revenue, open (obs 104) | fail | No `benchmark_role` field. F10 not applied. |
| R123-L | urban share, open (obs 105) | fail | Names both works. WP 21 is "not read in full". CAT-CAMPOP-URBAN-2024 is "also read", with no extent stated. F13 asks "read in full". |
| R123-C | urban share, open (obs 105) | fail | No `benchmark_role` field. F12 not applied. |
| R124-L | enclosure share, open (obs 106) | fail | Names all three works. COMMON gives its extent ("only the tag page's excerpt"). The two Wikipedia pages are "read through the fetch tool", with no extent. F15 asks "read in full". |
| R124-C | enclosure share, open (obs 106) | fail | No `benchmark_role` field. F14 not applied. |
| S3-40 | sown 1300 (obs 40) | fail | Reason copied from arable 1700 (obs 39): "...whose Table 1 gives 11.52 for 1270 and 1300". 11.52 and the 1270/1300 dates are arable values, not this row's (7.40). |
| S3-41 | sown 1380 (obs 41) | fail | Reason copied from arable 1380: "the 1270 value (11.52) is T1 of SHEET-2 ... whose Table 1 gives the same 1270 row". Carries an arable value, a date, and a sheet pointer that describes the arable row. |
| S3-43 | sown 1450 (obs 43) | fail | Same copied text as obs 41. Adds the arable 1270 value and row pointer to a sown row. |
| S3-44 | sown 1500 (obs 44) | fail | Same copied text as obs 41. |
| S3-45 | sown 1600 (obs 45) | fail | Same copied text as obs 41. |
| S3-47 | sown 1700 (obs 47) | fail | Copied from arable 1700: "...whose Table 1 gives 11.52 for 1270 and 1300". Same defect as obs 40. |
| S3-69 | wage 1340 (obs 69) | pass | Copies "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)", the grounds of obs 7 (1270), which says "mixes day-wage building and farm series by period (not read in full)". Adds no value or date. |
| S3-71 | wage 1350 (obs 71) | pass | As obs 69. |
| S3-73 | wage 1400 (obs 73) | pass | As obs 69. |
| S3-75 | wage 1450 (obs 75) | pass | As obs 69. |
| S3-77 | wage 1500 (obs 77) | pass | As obs 69. |
| S3-79 | wage 1550 (obs 79) | pass | As obs 69. |
| S3-83 | wage 1650 (obs 83) | pass | As obs 69. |
| S3-85 | wage 1690 (obs 85) | pass | As obs 69. |
| S3-87 | wage 1700 (obs 87) | pass | As obs 69. |
| S3-103 | yield estimate 1380 (obs 103) | pass | Copies the grounds of obs 102 (1379): "the year is not stated in the poll tax section and is placed after the Crown's 1379 request to Parliament; hoped for £50,000". The tail (twelve pence; £160,000; November 1380) was already in the old reason. No new value or date. |
| 3b | all `reason` in `england.json` | pass | No reason starts with `as above`, `as the`, or a sheet id. |
| 4 | both commits | pass | Every changed line is a `reason`. No `benchmark_role` changed by either commit. |

## Fixes for the failed checks

Each quotes the text the record should carry. F-numbers are from `AUDIT-H1-5b.md`.

- **R43-L (obs 25).** F2, word for word: `modern reconstruction, secondary (the WP 21 population series, manorial tenants
  and Wrigley et al. 1997, as Table 16 is sourced); this is the table's decade column`. The inferred clause must be
  removed, or the writer must state it in the note, not the reason. The other seven Table 19 rows changed by `a0ecbfe`
  are outside this audit.
- **R73-C (obs 55).** F5: add the field `"benchmark_role": "development"`.
- **R113-L (obs 95).** F9, word for word: `Wikipedia, secondary; the page gives the 1471 figure in its own words and names
  no other author for it`. Apply to obs 95 only.
- **R122-L (obs 104).** F11, word for word: `the Wikipedia pages CAT-WIKI-TAXUK and CAT-WIKI-FISCAL were read in full and
  give no English crown revenue total for any year from 1270 to 1700; the fiscal page's 1558-59 figure of £160,000 is a
  combined grant of two fifteenths and tenths plus a subsidy, not a crown revenue total`. The "poll-tax yields above"
  clause must go. The writer must say how much of TAXUK was read; the auditor read 100,000 of 149,927 characters.
- **R122-C (obs 104).** F10: add the field `"benchmark_role": "development"`.
- **R123-L (obs 105).** F13, second replacement, word for word: `CAT-CAMPOP-URBAN-2024 (London share 1600 and 1700 only; the
  England chart is an image with no values in the text) was also read in full`. The first replacement (WP 21 "read in
  full") is needed only if the writer reads WP 21 in full.
- **R123-C (obs 105).** F12: add the field `"benchmark_role": "development"`.
- **R124-L (obs 106).** F15, word for word: `CAT-CAMPOP-COMMON-2025 (common land about 50 per cent in 1500, not an enclosure
  share), CAT-WIKI-ENCLOSURE and CAT-WIKI-INCLOSURE were read in full and give no enclosure share before 1604 or 1700`.
  The Enclosure page must be read in full first (the auditor read 100,000 of 151,770 characters).
- **R124-C (obs 106).** F14: add the field `"benchmark_role": "development"`.
- **S3-40, S3-41, S3-43, S3-44, S3-45, S3-47 (obs 40, 41, 43, 44, 45, 47).** Not a 5b fix. Proposed here: replace each
  reason with the grounds of sown 1420 (obs 42), word for word: `modern reconstruction, secondary; printed in million acres
  (Overton and Campbell tables, Medieval Accounts Database)`. That text names no arable value, date or row.

## Remarks (not counted in the result)

1. **F9 was applied to the wrong record.** `a0ecbfe` rewrote the reason of obs 94 (plague 1369, note "the death rate was
   around 10-15 per cent") with the F9 text about the 1471 sentence. Obs 95 (1471), the row F9 names, still has the old
   reason. Obs 94 is not in the 5b audit; its new reason describes another row's sentence. Not edited here.
2. **Commit-message naming.** `a0ecbfe` is the only commit about F2 to F15, and no message starts `5316`. The keeper should
   confirm that `a0ecbfe` is the intended 5316 commit.
3. **Extra F2 rows.** `a0ecbfe` applied F2 to all eight Table 19 decade rows. Only obs 25 (row 43) is audited here.
4. **Obs 55 Table 24 value.** The reason says "the 1270 level 638 is in CAT-BCKOVL-2010 Table 24" and that the table was not
   opened. The 638 is carried from SHEET-2. It is unverified and not counted.
5. **Gate and result line.** The task's Gate matches `AUDIT-H1-5c pass N/M`. This audit's result is `fail`, so the Gate
   will not match. The result line is written as the spec gives it, not as the Gate expects.

AUDIT-H1-5c fail 15/32
