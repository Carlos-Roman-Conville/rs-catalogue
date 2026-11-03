# AUDIT-H1-5e: re-audit of the fixes in commit a724844 (task 5480)

Written 2026-11-03 by task 5480 (Haiku). The auditor wrote none of the six fixes in 5479 and edited no record.

## Method

- **Commit.** `a724844` (5479, six `confidence.reason` fixes in `data/region/england.json`). Read with `git show --unified=0`.
- **Changed lines.** The diff has six hunks, each one `confidence.reason` line, at file lines 290, 721, 829, 1072, 2520 and 2835. Parsed with Node: these are `observations[]` positions 9, 25, 29, 38, 92 and 104. No other line changed.
- **Fix words.** Compared word for word with the fixes that `AUDIT-H1-5d.md` quotes for each row.
- **Source.** The source record `data/source/cat-bckovl-2010-wp21.json` gives the URL of CAGE Working Paper 21 (2010). Opened as described in each source row.
- **Sample.** 10 observations that none of the commits 5331, 5332, 5333 and 5479 touched, at positions 3, 14, 33, 50, 61, 76, 85, 97, 100 and 102. Each was read for its own grounds, pointers to other records (`as above`, `as the ... rows`, sheet ids, `its own row`, `S1`, `SHEET`, `a different page from the row above`), and fit to the row's value, date and source. These are text checks of the record; no source was opened for them.
- **Checks counted.** 7 (commit) + 2 (source) + 10 (sample) = 19.

## Checks

| check | record (obs) | pass/fail | what the record says |
|---|---|---|---|
| C-1 | only `confidence.reason` changed in 5479 | pass | Six hunks (lines 290, 721, 829, 1072, 2520, 2835), all `reason` lines. No other field changed. |
| C-2 | population 1279 (obs 9) | pass | Ends "...the cited paper itself was not opened, so cited-through". The sentence "It differs from S1 (4.40 M, 1270/79 average), hence its own row" is gone. |
| C-3 | population 1300/09 (obs 25) | pass | Reason equals the F2 text of AUDIT-H1-5d word for word: "modern reconstruction, secondary (the WP 21 population series, manorial tenants and Wrigley et al. 1997, as Table 16 is sourced); this is the table's decade column". The Table 19 clause is gone. |
| C-4 | population 1450-1459 (obs 29) | pass | Same F2 text word for word. The "inferred" clause and the "1300 annual 4.73" pointer are gone. The series identity itself is checked in SRC-25. |
| C-5 | arable 1650 (obs 38) | pass | Reason equals the 5333 sown-row grounds word for word: "modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)". The SHEET-2 and 1270 clause is gone. Whether the source supports it is checked in SRC-38. |
| C-6 | plague 1348-49 (obs 92) | pass | Reads "Wikipedia reporting other authors (cited through, rule a)". The "each is its own row" clause and the population-range clause are gone. |
| C-7 | tax crown revenue, open (obs 104) | pass | Keeps the "no value is taken" text and adds the extent AUDIT-H1-5d Remark 2 asked for: "CAT-WIKI-TAXUK was read to its first 100,000 of 149,927 characters and CAT-WIKI-FISCAL to its first 100,000 of 156,003 characters". The words are present. I did not verify the character counts. |
| SRC-38 | arable 1650 (obs 38) | fail | Cannot be checked. `opened:` WebFetch of the WP 21 PDF URL (2.3 MB, application/pdf). The fetch returned only compressed PDF streams (FlateDecode/JPEG), no readable text. No page of Table 1 or of its source note was read, so I cannot confirm that its arable figures come from the same Overton and Campbell tables and Medieval Accounts Database as its sown figures. Failed with this reason; not guessed. |
| SRC-25 | population 1300/09 (obs 25) and 1450-59 (obs 29) | fail | Cannot be checked. `opened:` the same WebFetch of the WP 21 PDF; no readable text. Table 19's source note could not be read, so I cannot confirm it names the WP 21 population series that Table 16 is sourced from. Failed with this reason; not guessed. |
| S-3 | land fallow 1270 (obs 3) | pass | "modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary" with its table and page. Own grounds; fits 4.75 million acres. |
| S-14 | population 1348 (obs 14) | pass | Own grounds (manorial tenants, Wrigley et al. 1997 with Wrigley and Schofield 1989). Names sources, not records. Fits 4.81 million. |
| S-33 | arable 1380 (obs 33) | fail | "...the 1270 value (11.52) is T1 of SHEET-2 from the 2010 CAGE WP 35, this is a different working paper (WP 21) whose Table 1 gives the same 1270 row". Carries another row's value and date and a sheet pointer. This is the same defect the 5333 fix removed from the sown rows, and it is not in any commit so far. Fix below. |
| S-50 | gdp nominal 1381 (obs 50) | pass | Explains the column reading and its doubt about the extract. Own grounds; no record pointer. |
| S-61 | gdp per head growth 1480-1553/59 (obs 61) | pass | "modern reconstruction, secondary; real GDP per capita, output side". Own grounds; fits. |
| S-76 | annual earnings 1500 (obs 76) | pass | "Clark's series, secondary; mixes day-wage building and farm series by period (not read in full)". Own grounds; fits. |
| S-85 | real earnings 1690 (obs 85) | pass | Same grounds as obs 76. Own grounds; fits 1,457. |
| S-97 | plague 1665 (obs 97) | fail | "...authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million". The same defect as obs 92, which 5479 fixed but this row still carries. Fix below. |
| S-100 | enclosure acts 1604 (obs 100) | fail | "...a different page from the row above, so a separate row". Points to another row. Fix below. |
| S-102 | poll tax yield 1379 (obs 102) | pass | "Wikipedia, secondary; the year is not stated in the poll tax section and is placed after the Crown's 1379 request to Parliament; hoped for £50,000". States its grounds and its doubt; no record pointer. |

Totals: 14 pass, 5 fail (SRC-38, SRC-25, S-33, S-97, S-100).

## Fixes for the failed checks

Each quotes the text the record should carry.

- **SRC-38 and SRC-25 (obs 38, 25, 29).** No fix to the record is proposed. The keeper needs a text-readable copy of CAGE WP 21 (Table 1, and Table 19 with its source note) before the source wording in obs 38, 25 and 29 can be confirmed.
- **S-33 (obs 33).** Replace the reason with the grounds word for word from the 5333 sown-row fix: `modern reconstruction, secondary; printed in million acres (Overton and Campbell tables, Medieval Accounts Database)`. This text is only as good as SRC-38, which failed; the keeper should confirm it against the paper before writing.
- **S-97 (obs 97).** Delete the text `; authors differ so each is its own row; the page's own pre-plague population range is 3 to 7 million`. The reason then reads `Wikipedia reporting other authors (cited through, rule a)`, the same text 5479 gave obs 92.
- **S-100 (obs 100).** Delete the text `; a different page from the row above, so a separate row`. The reason then reads `Wikipedia, secondary; says about one fifth of England`.

## Remarks (not counted in the result)

1. **AUDIT-H1-5d sample.** 5d's sample of untouched rows (positions 0, 9, 18, 29, 38, 54, 64, 73, 83, 92) did not include obs 33, 97 or 100, and it passed rows whose text it did not compare with the S-33 and S-97 defects. The sample here found them.
2. **obs 104 FISCAL extent.** AUDIT-H1-5d Remark 2 asked only for the TAXUK extent. The 5479 text also gives the FISCAL extent (100,000 of 156,003 characters). That claim was not checked here.
3. **Keeper.** The PDF needs a text-readable copy (or a text extraction of pages 35, 53 to 56) before SRC-38 and SRC-25 can pass.

AUDIT-H1-5e fail 5/19
