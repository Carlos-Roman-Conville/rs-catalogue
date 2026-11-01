# Catalogue: package handoff

The keeper's handoff is `E:/AI Programs/HQ/handoffs/catalogue/HANDOFF.md`. This file is for belt units: each unit
adds one dated line under Done, and parks a disagreement with DESIGN.md under Blocked. Toolchain packages use
Done/Blocked headings instead of the template's State/Next/Blocked/Gotchas.

## Done

- 2026-10-31: scaffold, 2789-2883: schema/check, dates, window, no-gate, manifest drift, regions, 52 sources, culture, institutions, trade research, audit 1 (failed/), open intervals, review fixes.
- 2026-11-01 rulings/plans: 2905-3042 V4 anchoring, §1.1 unknown presence, region exceptions (a)-(c); 3048 §4 (d), (e); 3090 §4 (f)-(i); 5004 INGEST-PLAN; 5070 ABSENCE-RULINGS (5 absence, 6 unknown presence); 5086 C4-RULINGS, (j) qualified period, (k) unverified stays researched/low; 5100 DESIGN-V4.md split; 5101 NOTE-RULINGS (l); 5102 PROMOTE-PLAN P1-P4.
- 2026-11-01 ingest/fixes: 3049 (5cb5610); 3091 (4562e8e); 5005 demo.ts; 5041-5042 equipment, 313 technology + 216 EQ-*; 5043, 5044, 5045 economy 11+11+9 obs; 5071-5072 absence rulings (6660871).
- 2026-11-01 audits: 3042 AUDIT-7 pass 66/66; 3050 AUDIT-8 fail 1/66; 3092 AUDIT-9 pass 66/66; 5046 AUDIT-E3 pass 54/54; 5047 AUDIT-C4 fail 8/23; 5073 AUDIT-E4 pass 11/11; 5087 AUDIT-C4-2 pass 23/23. No audit edited a record.
- 2026-11-01 promotion 5130-5133, 5160, 5161: P1 drift on `data/` (e5a6fa6); P2 `data/` rules by 5160 (f8e1779), not 5131 (stale Already-done-if); P3 663 records to `data/<kind>/` (85470b6); P4 AUDIT-P pass 70/70 (5133, 5161). `practice.faction-burial-alternatives` stays in fixtures/.
- 2026-11-01: 5173 NATIVE-PLAN: H1 rows A1-A8, rulings (a)-(e), V5, API, N1-N10; 5195 ruling (f) `from: null`; 5174-5204 N1-N10 built (V5, native ingest, H1 sheet/records, AUDIT-H1, label, date, build, coverage, README, Log).
- 2026-11-01: 5205 kernel pin v0.1.1 (b6f95bf); 5243 1752 gap hard-code removed (5e30d62); 5252 rulings B3 paths, (g) precision.
- 2026-11-01: 5232 AUDIT-H1 fixes (9625068); 5233 AUDIT-H1-2 fail 2/6, rule (c) tightened (6eb8e88); 5245 lady-day precision back to year, BCKOvL url, gap fixture (5b6ce99); 5246 AUDIT-H1-3 pass 24/24 (37ac8ee); 5254 (5252) tags fixed, step 2 signed off.

## Blocked

- SHEET S8: find a CAT- source for Julian reckoning in England before 1752; when found, set `calendar_of_source: julian` on both lady-day-year-start attestations.
