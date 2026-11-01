# Catalogue: package handoff

The keeper's handoff is `E:/AI Programs/HQ/handoffs/catalogue/HANDOFF.md`. This file is for belt units: each unit
adds one dated line under Done, and parks a disagreement with DESIGN.md under Blocked. Toolchain packages use
Done/Blocked headings instead of the template's State/Next/Blocked/Gotchas.

## Done

- 2026-10-31: scaffold and 2789-2883 package build: schema/check, dates, window query, no-gate, manifest drift, regions, 52 source records, culture, institutions, trade research, audit 1 (failed/, honest), open-ended intervals, review fixes.
- 2026-11-01 rulings and plans: 2905-3042 V4 anchoring/nesting rules, §1.1 unknown presence, region exceptions (a)-(c); 3048 §4 (d), (e) (FIXES-audit7-plan); 3090 §4 (f)-(i) (FIXES-audit8-plan); 5004 INGEST-PLAN (equipment script, economy 31 observations); 5070 ABSENCE-RULINGS (11 plain-none: 5 absence, 6 unknown presence); 5086 C4-RULINGS, §4 (j) qualified period = whole century, circa, qualifier in note; (k) unverified row stays researched, low; no record changes; 5100 DESIGN §4 split into DESIGN-V4.md; 5101 NOTE-RULINGS, §4 (l) a note carries only what its anchors state (piece-of-eight 1704 note loses "the plantations"); 5102 PROMOTE-PLAN: 663 universal to data/<kind>/, 1 game:pirate-ship stays, V6 over data/, no data/sources.json, units P1-P4.
- 2026-11-01 ingest and fixes: 3049 (Composer) §4 (d), (e) fixes (5cb5610); 3091 (Composer) §4 (f), (h) fixes (4562e8e); 5005 scripts/demo.ts; 5041-5042 equipment ingest, 313 technology + 216 EQ-*; 5043, 5044, 5045 economy C1, C2, C3: 11, 11, 9 observations; 5071-5072 absence rulings applied (6660871), check.ts rejects absence over a dated invention.
- 2026-11-01 audits: 3042 AUDIT-7 pass 66/66; 3050 AUDIT-8 fail 1/66 (faction-burial-alternatives); 3092 AUDIT-9 pass 66/66; 5046 AUDIT-E3 pass 54/54; 5047 AUDIT-C4 fail 8/23 (jamaica, port-royal withdrawn by 5086); 5073 AUDIT-E4 pass 11/11; 5087 AUDIT-C4-2 pass 23/23 (every anchor opened; redo of 5047). No audit edited a record.
- 2026-11-01 promotion P1-P4 (5130-5133, 5160, 5161): P1 V6 drift reads `data/` against shared manifests (e5a6fa6); P2 V1 rules for `data/` kind paths, universal scope and game refs were built by 5160 (f8e1779), not 5131, which built nothing (skipped by a stale Already-done-if); P3 moved 663 universal records to `data/<kind>/` as 663 R100 renames, repointed the equipment ingest, dropped `data/sources/.gitkeep` (85470b6); P4 AUDIT-P (5133), completed by 5161: Check 2 detail table of the 70 sampled ids (re-derived, 5133 logged none), method sentence corrected, V1 and V6 rerun after P2 (664 records, 0 failures): AUDIT-P pass 70/70. The game-scoped `practice.faction-burial-alternatives` stays under fixtures/. No audit edited a record.
- 2026-11-01 plan: 5173 NATIVE-PLAN (plan only, no record or code): H1 England 1270 rows A1-A8 (population on `region.england`, six crops, plough and draught animals, mills, manor, Julian, Lady Day, the 1752 reform), each sourced or `open`; native rulings (a)-(e) (`CAT-` sources, mixed records, open rows cite the work searched); V5 (role check, `heldOut` guard, static scan); API `label`, `date`, `dist/catalogue.json` build with `catalogue_hash`, V7 report; units N1-N10.

## Blocked

- none
