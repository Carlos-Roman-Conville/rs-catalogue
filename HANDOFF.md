# Catalogue: package handoff

The keeper's handoff is `E:/AI Programs/HQ/handoffs/catalogue/HANDOFF.md`. This file is for belt units: each unit
adds one dated line under Done, and parks a disagreement with DESIGN.md under Blocked. Toolchain packages use
Done/Blocked headings instead of the template's State/Next/Blocked/Gotchas.

## Done

- 2026-10-31: scaffold and 2789-2883 package build: schema/check, dates, window query, no-gate, manifest drift, regions, 52 source records, culture, institutions, trade research, audit 1 (failed/, honest), open-ended intervals, review fixes.
- 2026-11-01: 2905-3042 V4 anchoring and nesting rules, unknown-presence note (§1.1), region exceptions (a)-(c), record fixes after audits 3-6, audits 3-7 (AUDIT-7 pass, 66 of 66).
- 2026-11-01: 3048 three rulings in DESIGN.md §4 exceptions: political relation = `part_of` to a polity record (region.atlantic still qualifies); 1692 end of the 11 Q5 trade records is the referent window (`estimate` + referents anchor); no unsourced attestation. Plan: FIXES-audit7-plan.md, 12 records.
- 2026-11-01: 3049 (Composer) DESIGN §4 (d), (e) fixes (5cb5610): 11 Q5 trade records `estimate` with referents anchor; sugar-grade unsourced attestation removed.
- 2026-11-01: 3050 fixture audit 8: AUDIT-8 says fail, 1 of 66 (practice.faction-burial-alternatives, §4(e)); 11 Q5 records pass; no record edited.
- 2026-11-01: 3090 four rulings in DESIGN.md §4 (f)-(i): fiction attestation gets no exception (faction-burial-alternatives loses it); self-naming of the anchor's own file passes (new-providence); a Q5 record taking 1682 cites STL-CUN; estimate with high confidence is consistent. Plan: FIXES-audit8-plan.md, 7 records.
- 2026-11-01: 3091 (Composer) fixes from FIXES-audit8-plan (4562e8e): faction-burial-alternatives attestation removed (§4 (f)); STL-CUN and Hanson confidence note on six Q5 trade records (§4 (h)).
- 2026-11-01: 3092 fixture audit 9: AUDIT-9 says pass, 66 of 66 (checks 1-10 and rulings A-D); faction-burial-alternatives passes; no record edited.
- 2026-11-01: 5004 ingest plan (fixtures/pirate-town/INGEST-PLAN.md): equipment by one script (313 technology + 216 EQ-* source records; plain "none" = absence/estimate, "none (anomaly)" = unknown presence), economy 31 observations in 3 Composer units + audit; no src/ change; DESIGN §6: promotion after the whole fixture.
- 2026-11-01: 5005 scripts/demo.ts (`npm run demo`): prints the Caribbean 1690-1720 and England 1270 windows, coverage, no-gate.
- 2026-11-01: 5041-5042 equipment ingest script (scripts/ingest-equipment.ts) run: 313 technology and 216 EQ-* source records.
- 2026-11-01: 5043 economy ingest unit C1 (wages): 11 observations.
- 2026-11-01: 5044 economy ingest unit C2 (money and prices): 11 observations.
- 2026-11-01: 5045 economy ingest unit C3 (yields): 9 observations.
- 2026-11-01: 5046 fixture audit E3 (fixtures/pirate-town/AUDIT-E3.md): pass, 54 of 54 sampled (32 technology, 22 EQ-*); the 8 plain-none rows and 6 anomaly rows checked; no record edited.
- 2026-11-01: 5070 absence rulings (fixtures/pirate-town/ABSENCE-RULINGS.md): of 11 plain-none rows, 5 keep absence, 6 unknown presence; check.ts to flag an absence window containing the record's own dated invention; DESIGN §1.6 classifier rulings go in the script's per-row list, never record hand edits. Next task applies them.
- 2026-11-01: 5071-5072 absence rulings applied (6660871): six plain-none records now unknown presence; check.ts rejects an absence window containing a dated invention; 5 keep absence.
- 2026-11-01: 5073 fixture audit E4 (fixtures/pirate-town/AUDIT-E4.md): pass, 11 of 11 slugs; six changed records and five unchanged keep-absence rows checked; no record edited.

## Blocked

- none
