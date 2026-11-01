# Catalogue: package handoff

The keeper's handoff is `E:/AI Programs/HQ/handoffs/catalogue/HANDOFF.md`. This file is for belt units: each unit
adds one dated line under Done, and parks a disagreement with DESIGN.md under Blocked.

## Done

- 2026-10-31: package scaffolded by the Catalogue keeper (ids helper only).
- 2026-10-31: 2789 schema and check (944f949): all 13 kinds, enums, scripts/check.ts rules.
- 2026-10-31: 2790 dates (ecf9842): BigInt JDN arithmetic, Lady Day shift, partial dates flagged approximate.
- 2026-10-31: 2791 window query (3acf7af): dated part_of containment, default provenance, canonical serialisation.
- 2026-10-31: 2792 no-gate check (c3604c8): src/nogate.ts and scripts/no-gate.ts.
- 2026-10-31: 2793 fixture manifest drift (7cb27b1): manifest of 7 source files; --update refuses partial refresh.
- 2026-10-31: 2794 regions (e461dd5): 13 region and 3 period records; nest from world to port-royal and nassau; 1692 earthquake as attestation.
- 2026-10-31: 2795 TWN and ECON source records (5a77f2b).
- 2026-10-31: 2796 STL source records (9497d4d): 52 source records, matching SOURCES.md.
- 2026-10-31: 2797 culture beliefs and customs (c02b0d1): creature/belief pairs per DESIGN 1.2.
- 2026-10-31: 2798 culture institutions (ad95c90): 12 records.
- 2026-10-31: 2799 starting-town trade and economy research (d6c264c): 18 records; not-found gaps kept in notes.
- 2026-10-31: 2800 fixture audit 1 (3b0ca96): AUDIT-1 says fail, 64 of 66 records; task sits in failed/, audit is honest.
- 2026-10-31: 2830 no-gate subpath and relative imports (e38f78a).
- 2026-10-31: 2881 open-ended intervals (322ca2c): `to` omitted or null.
- 2026-10-31: 2882 region fixtures open-ended (8a84675): three year-9999 ends are now `to: null`.
- 2026-10-31: 2883 fixture review fixes (d8474de): no same_as on the three creatures, no game observation on chattel-slavery, port-royal counts are estimates.
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

## Blocked

(none)
