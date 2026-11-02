# AUDIT-H1-5d: re-audit of the fixes in commits 20de68b, 0549cf6 and 94944a4 (task 5334)

Written 2026-11-02 by task 5334 (Haiku). The auditor wrote none of the three fixes, nor the X5 records or the 5311 to 5318 work.
This is a text check of `data/region/england.json` only. No record was edited. No source was opened.

## Method

- **Commits.** `20de68b` (5331, benchmark_role), `0549cf6` (5332, re-reads), `94944a4` (5333, sown rows). Each read with `git show`.
- **Changed lines.** A structural diff of the JSON before and after each commit (every leaf value compared, not only the diff lines) found:
  - `20de68b`: 4 changes, each an added `benchmark_role: "development"` on obs 55, 104, 105, 106.
  - `0549cf6`: 6 changes, all `confidence.reason`: obs 25, 94, 95, 104, 105, 106.
  - `94944a4`: 6 changes, all `confidence.reason`: obs 40, 41, 43, 44, 45, 47.
  - Total: 16 changed leaves, 12 reasons and 4 roles. No other field changed.
- **Numbering.** The task names the 5331 roles as "obs 73, 122, 123, 124". Those are the row ids R73, R122, R123, R124 of
  `AUDIT-H1-5b.md`. The `observations[]` positions are 55, 104, 105, 106 (the same rows as in `AUDIT-H1-5c.md`). `observations`
  has 107 entries, so there is no position 122 to 124. The checks below use the positions and name the row id.
- **Sources.** No source was opened in this session. Every check is a text check of the record against the fix words in
  `AUDIT-H1-5b.md` and `AUDIT-H1-5c.md`, and against the record's own `sources`.
- **Sample.** 10 rows that none of the three commits changed (94 untouched rows in all), taken at even steps through the
  file: positions 0, 9, 18, 29, 38, 54, 64, 73, 83, 92. Each reason was read for: its own grounds, no pointer to another
  record, and a fit to the row's value and date.
- **Pointer rule.** A reason points nowhere if it names no other record (no "S1", "SHEET", "row", "as above", "same as", and
  no "each is its own row" or "differs from ... hence its own row"). Citing a work or a table inside a cited source is not a pointer.
- **Checks counted.** 2 (roles) + 3 (obs 94, 95, 25) + 3 (obs 104, 105, 106) + 6 (sown rows) +
  1 (no other field changed) + 10 (sample) = 25.

## Checks

| check | record (obs) | pass/fail | what the record says |
|---|---|---|---|
| ROLE-1 | roles of 5331 (R73, R122, R123, R124 = obs 55, 104, 105, 106) | pass | `benchmark_role: "development"` is on obs 55, 104, 105 and 106, the four rows 5331 named. Task numbering: see Numbering above. |
| ROLE-2 | every other `benchmark_role` | pass | The structural diff shows no other role change in the three commits. |
| R94 | plague 1369 (obs 94) | pass | "Wikipedia reporting other authors (cited through, rule a); authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million". The `3 to 7 million` reason is restored. |
| R95 | plague 1471 (obs 95) | pass | "Wikipedia, secondary; the page gives the 1471 sentence without naming an author but cites Gottfried 1983 p. 131 for it, so the figure is Gottfried's reported through the page (rule a)". Gottfried 1983 p. 131 reason present. |
| R25 | population 1300/09, 4.72 (obs 25) | fail | The F2 text is there, but the reason goes on: "...; this is the table's decade column (Table 19 'Population (mlns)'), a separate series from Table 16, so e.g. 1300/09 4.72 and the 1300 annual 4.73 are two rows". That is more than the audit's words, and it points to the 1300 annual row. Fix below. |
| R122 | tax crown revenue, open (obs 104) | pass | Ends "...with no year stated, so no value is taken". No pointer at the end. (The reason does not say how much of TAXUK was read; see Remarks.) |
| R123 | urban share, open (obs 105) | pass | "CAT-CAMPOP-URBAN-2024 (the blog post at ...) was fetched and read in full"; WP 21 stated "not read in full". Says how much was read. |
| R124 | enclosure share, open (obs 106) | pass | "CAT-CAMPOP-COMMON-2025 ... was seen only as the tag page's excerpt"; "CAT-WIKI-ENCLOSURE was fetched and read in full (characters 0-100000, then 100000 to the end)". Says how much was read for each work. |
| S3-40 | sown 1300 (obs 40) | pass | "modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)". Same grounds as sown 1420 (obs 42). No arable value, no SHEET pointer. Source the same as obs 42. |
| S3-41 | sown 1380 (obs 41) | pass | Same text as obs 42. No arable value, no sheet pointer. |
| S3-43 | sown 1450 (obs 43) | pass | Same text as obs 42. No arable value, no sheet pointer. |
| S3-44 | sown 1500 (obs 44) | pass | Same text as obs 42. No arable value, no sheet pointer. |
| S3-45 | sown 1600 (obs 45) | pass | Same text as obs 42. No arable value, no sheet pointer. |
| S3-47 | sown 1700 (obs 47) | pass | Same text as obs 42. No arable value, no sheet pointer. |
| F-ONLY | fields changed by 5331 to 5333 | pass | The 16 leaf changes are 12 `confidence.reason` and 4 `benchmark_role` (see Method). No other field changed. |
| S-9 | population 1279 (obs 9) | fail | "...It differs from S1 (4.40 M, 1270/79 average), hence its own row". Points to record S1. Fix below. |
| S-18 | population 1450 (obs 18) | pass | "modern reconstruction, secondary (medieval: manorial tenants; Wrigley et al. 1997 interpolated with Wrigley and Schofield 1989 from 1541); printed in millions, converted. Wikipedia's Demography of England table (read) prints the same value..." States its own grounds; fits 1.90 million for 1450. Names a source, not a record. |
| S-29 | population 1450-1459 (obs 29) | fail | The Table 19 decade-column reason with the inferred clause and the pointer "the 1300 annual 4.73 are two rows". Points to another record and carries the "inferred" clause the 5c audit said to remove. Fix below. |
| S-38 | arable 1650 (obs 38) | fail | "...the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35, this is a different working paper (WP 21) whose Table 1 gives the same 1270 row". Carries an arable value and date for 1270 and a sheet pointer, neither of which is this row's (9.79 million, 1650). Same defect as the sown rows fixed by 5333; not in the 5b or 5c scope. Fix below. |
| S-54 | gdp nominal 1700 (obs 54) | pass | "I read the first number as the annual-data column, which the extract does not prove (1300 and 1688 print extra numbers). Modern reconstruction, secondary". States its grounds and its doubt; no record pointer. |
| S-64 | gdp per head growth 1650-1700 (obs 64) | pass | "modern reconstruction, secondary; real GDP per capita, output side". Own grounds; fits. |
| S-73 | real wage 1400 (obs 73) | pass | "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)". Own grounds; fits. |
| S-83 | real wage 1650 (obs 83) | pass | Same text as obs 73. Own grounds; fits. |
| S-92 | plague 1348-49, 0.625 (obs 92) | fail | Copy of the obs 94 reason: "...authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million". "Each is its own row" points to other rows, and the population range does not give this row's grounds. Fix below. |

Sample totals: 6 pass, 4 fail (S-9, S-29, S-38, S-92).

## Fixes for the failed checks

Each quotes the text the record should carry. Word for word where a fix in 5b or 5c gives the words; otherwise the text is the grounds of a row already passing.

- **R25 (obs 25).** Replace the whole reason with the F2 text from `AUDIT-H1-5b.md`, word for word: `modern reconstruction, secondary (the WP 21 population series, manorial tenants and Wrigley et al. 1997, as Table 16 is sourced); this is the table's decade column`. Drop the clause from "(Table 19 'Population (mlns)')" to the end.
- **S-9 (obs 9).** Delete the sentence `It differs from S1 (4.40 M, 1270/79 average), hence its own row`. The rest of the reason stays.
- **S-29 (obs 29).** Replace the whole reason with the F2 text, word for word: `modern reconstruction, secondary (the WP 21 population series, manorial tenants and Wrigley et al. 1997, as Table 16 is sourced); this is the table's decade column`. The writer must confirm the series identity (5b F2) before writing.
- **S-38 (obs 38).** Replace the reason with the grounds of the sown rows fixed by 5333, word for word: `modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)`. The writer must confirm against the source (WP 21) that the arable rows come from the same tables.
- **S-92 (obs 92).** Delete the text `; authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million`. The reason then reads `Wikipedia reporting other authors (cited through, rule a)`, which names its own grounds and points nowhere.

## Remarks (not counted in the result)

1. **Row numbers in the task.** The task's "obs 73, 122, 123, 124" are the 5b row ids. The record positions are 55, 104, 105, 106. Checked as the same rows.
2. **obs 104 extent (5b F11).** The 5b fix F11 asks the reason to say how much of CAT-WIKI-TAXUK was read (auditor read 100,000 of 149,927 characters). Obs 104 still says "CAT-WIKI-TAXUK and CAT-WIKI-FISCAL give no English crown revenue total" with no extent. Not one of this task's checks; left for the keeper.
3. **obs 25 and the Table 19 rows.** Obs 25 is the only Table 19 row this audit counts (5c remark 3). Obs 29 is another Table 19 row carrying the same long text (S-29).
4. **obs 94 and 95 gave the Gottfried reason back.** 0549cf6 moved the Gottfried reason to obs 95 and the `3 to 7 million` reason back to obs 94, as 5c remark 1 asked. Both checks pass.

AUDIT-H1-5d fail 5/25
