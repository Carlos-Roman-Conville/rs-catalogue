# Catalogue: package handoff

The keeper's handoff is `E:/AI Programs/HQ/handoffs/catalogue/HANDOFF.md`. This file is for belt units: each unit
adds one dated line under Done, and parks a disagreement with DESIGN.md under Blocked. Toolchain packages use
Done/Blocked headings instead of the template's State/Next/Blocked/Gotchas.

## Done

- 2026-10-31: scaffold and 2789-2883 package build: schema/check, dates, window query, no-gate, manifest drift, regions, 52 source records, culture, institutions, trade research, audit 1 (failed/, honest), open-ended intervals, review fixes.
- 2026-11-01: 2905 V4 anchoring rule in DESIGN.md §4: referent-window dates are `estimate` with the referents paragraph as a second anchor; keys only from anchored rows; relation doubt in `notes`.
- 2026-11-01: 2906 practice, culture and entity V4 fixes (04cc746): 39 records, 8 labels set to open.
- 2026-11-01: 2907 institution, region and period V4 fixes (392876d): 25 records; region nest dropped, see review 1101-0126; task in failed/.
- 2026-11-01: 2908 fixture audit 3 (46b2d2d): AUDIT-3 says fail, 12 of 66 records.
- 2026-11-01: 2928 V4 nesting rule in DESIGN.md §4: undated geographic `part_of` anchored by the referents plus the naming row; unstated steps kept, doubt in `notes`, never deleted for want of a row.
- 2026-11-01: 2929 region nest restore (6e40ca4): region part_of nest and V4 anchors restored.
- 2026-11-01: 2930 audit-3 records reanchor (b542b8e): non-region fixture rows re-anchored to V4.
- 2026-11-01: 2931 fixture audit 4: AUDIT-4 says fail, 6 of 66 records (region.atlantic, region.england, region.jamaica, region.kingston, region.new-providence, practice.commercial-brewing); no record edited.
- 2026-11-01: 2970 AUDIT-4 region and practice anchor fixes (f001049): region nest and practice anchors fixed after fixture audit 4.
- 2026-11-01: 2971 unknown-presence note in DESIGN.md §1.1: `what: presence`, `label: open`, `confidence: low`, reason in `notes`; no `unknown` label.
- 2026-11-01: 2972 fixture audit 5: AUDIT-5 says fail, 4 of 66 records (region.atlantic, region.jamaica, region.new-providence, practice.commercial-brewing); no record edited.
- 2026-11-01: 2993 region anchoring exceptions in DESIGN.md §4: atlantic passes as a bare container; jamaica cites STL-LAW, date null; new-providence drops part_of England until a row exists; DESIGN cites exempt from check 7.
- 2026-11-01: 2994 fixture audit 6: AUDIT-6 says fail, 2 of 66 records (region.jamaica, region.new-providence); atlantic and commercial-brewing now pass; no record edited.
- 2026-11-01: 3040 DESIGN.md §4 exception (a) reworded: sea/ocean/island-group name, no dated `part_of`, undated unsourced `part_of` only; region.atlantic still meets it. 2026-10-31 lines folded.
- 2026-11-01: 3041 (Composer) AUDIT-6 region exception (b) fixes (c6dff84): region.jamaica adds STL-LAW as an anchor, england `part_of` undated; region.new-providence drops england `part_of`.
- 2026-11-01: 3042 fixture audit 7: AUDIT-7 says pass, 66 of 66 records; jamaica and new-providence now pass; AUDIT-6's TWN-ROG pardon note corrected to TWN-NAS; 1682–1692 referent-bound reading left open (AUDIT-7 open question); no record edited.
- 2026-11-01: 3048 three rulings in DESIGN.md §4 exceptions: political relation = `part_of` to a polity record (region.atlantic still qualifies); 1692 end of the 11 Q5 trade records is the referent window (`estimate` + referents anchor); no unsourced attestation. Plan: FIXES-audit7-plan.md, 12 records.

## Blocked

(none)
