# AUDIT-H1-4b: re-audit of the AUDIT-H1-4 fixes (commit faab90b, task 5274)

## Method

Text check, not a source check. AUDIT-H1-4 already matched every value against its source; this pass checks only the
records the 5274 commit changed.

1. `git show faab90b` listed every changed line: 21 insertions and 21 deletions across 13 files. Every changed data
   line is a `reason` or a `note` line (`git show faab90b -- data | grep` for changed lines not keyed `reason` or
   `note` returned nothing). Other files in the commit: `cursor/RULES.md` (one added rule line 12) and
   `test/index.test.ts` (one blank line removed; see step 3).
2. For each of the 20 checks, the record at HEAD was compared with the text AUDIT-H1-4 `## Result` fix 1 or fix 2
   quotes. A grep of the 20 touched files for `"reason": "as T[0-9]` returned nothing, so no reason starts `as T`
   followed by a digit. The Parliament adoption note reads `... (CAT-WIKI-PARLENG sections on 1265 and 1295).
   November 1295.`: the parenthetical is a locator and the trailing sentence is the source's date; no writer comment
   remains (NATIVE-PLAN ruling (a)).
3. `git diff 7ce5c28 HEAD -- test/index.test.ts` is empty, so the file at HEAD equals its 7ce5c28 version. The 5274
   commit itself removed one blank line from that file (line 31); the file has since been restored to match 7ce5c28.
4. `git diff faab90b^ faab90b` changed `reason` and `note` only, for the 20 records named below and no other field.

## Checks

| check | record | result | what the record says now |
|---|---|---|---|
| C7 | `data/region/england.json` observation `land.sown-area` (T2) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary; the five crop columns add to 6.78, the table prints 6.77 (rounding)` |
| C11 | `data/region/england.json` observation `land.fallow-area` (T3) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C23 | `data/region/england.json` observation `price.cost-of-living-index` (T22) | pass | reason: `Clark's own series for England; the table runs the UK/Britain/England series, and for this period the paper says it uses English wages; Table 17 mixes day-wage building and farm series by period (not read in full); base year not read` |
| C27 | `data/region/england.json` observation `wage.real-earnings` (T23) | pass | reason: `Clark's own series for England; the table runs the UK/Britain/England series, and for this period the paper says it uses English wages; Table 17 mixes day-wage building and farm series by period (not read in full)` |
| C39 | `data/organism/triticum-aestivum.json` observation `crop.sown-area` (T4) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C43 | `data/organism/triticum-aestivum.json` observation `crop.yield-per-acre` (T9) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C47 | `data/organism/secale-cereale.json` observation `crop.sown-area` (T5) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C51 | `data/organism/secale-cereale.json` observation `crop.yield-per-acre` (T10) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary (the rye figure is higher than wheat in the table; the paper's text was not read for why)` |
| C55 | `data/organism/hordeum-vulgare.json` observation `crop.sown-area` (T6) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C59 | `data/organism/hordeum-vulgare.json` observation `crop.yield-per-acre` (T11) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C63 | `data/organism/avena-sativa.json` observation `crop.sown-area` (T7) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C67 | `data/organism/avena-sativa.json` observation `crop.yield-per-acre` (T12) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C71 | `data/organism/pulses.json` observation `crop.sown-area` (T8) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary; the table's "Pulses" column does not split peas from beans` |
| C75 | `data/organism/pulses.json` observation `crop.yield-per-acre` (T13) | pass | reason: `modern reconstruction (Overton and Campbell tables, Medieval Accounts Database); secondary` |
| C83 | `data/organism/cattle-beef.json` observation `livestock.count` (T15) | pass | reason: `derived estimate (probate and accounts databases, slaughter ratios); secondary` |
| C87 | `data/organism/calves.json` observation `livestock.count` (T16) | pass | reason: `derived estimate (probate and accounts databases, slaughter ratios); secondary` |
| C91 | `data/organism/ovis-aries.json` observation `livestock.count` (T17) | pass | reason: `derived estimate (probate and accounts databases, slaughter ratios); secondary; the text says sheep numbers are assumed stationary in the long term` |
| C95 | `data/organism/sus-scrofa-domesticus.json` observation `livestock.count` (T18) | pass | reason: `derived estimate (probate and accounts databases, slaughter ratios); secondary` |
| C111 | `data/institution/parliament-of-england.json` attestation `adoption` (T34) | pass | reason: `Wikipedia, secondary; first 100,000 characters read` |
| C112 | `data/institution/parliament-of-england.json` attestation `adoption` (T34), note | pass | note: `Model Parliament of 1295 (two knights per shire, two burgesses per borough) (CAT-WIKI-PARLENG sections on 1265 and 1295). November 1295.` |

## Result

Fix 1 was applied to 19 reasons and fix 2 to the one note. Every fix quoted in AUDIT-H1-4 is present word for word, and
no changed field other than `reason` or `note` was touched.

AUDIT-H1-4b pass 20/20

## Remarks (not fails)

1. `data/institution/parliament-of-england.json`, the presence attestation (T33), has a note that adds the writer's
   parenthetical `(Simon de Montfort's parliament, burgesses were summoned along with knights of the shire for the first
   time)`. It predates 5274, was not one of the 20 checks, and AUDIT-H1-4 C108 passed it. Not changed here; flagged for
   a later audit.
2. The 5274 commit changed `test/index.test.ts` (one blank line removed) and `cursor/RULES.md` (rule 12 added). The
   test file now equals its 7ce5c28 content, so the check passes; the commit's change to it is recorded here.
