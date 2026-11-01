# Fixture audit E4: absence rulings applied (unit 5073, 2026-11-01)

Audits commit 6660871 (the 5072 re-ingest of the ABSENCE-RULINGS.md rulings). `git show --stat` lists six records
changed there: clock-candle, globe-guericke, hemispheres-magdeburg, pneumatic-trough, thermometer-fahrenheit,
thermometer-reaumur. The other five slugs were not changed by it and were read in their current state. No record
was edited by this audit.

Checks:

1. The record matches the ruling: `keep absence` keeps `absence` / `estimate` with its 1650-1730 window; `unknown
   presence` has `what: presence`, `label: open`, `confidence.level: low`, and no absence attestation.
2. No absence window contains the record's own dated invention attestation (the containment rule in ABSENCE-RULINGS.md,
   "Rule for check.ts"), unless the ruling keeps it with a stated reason.
3. The label is the source row's or weaker. `open` is weaker than the plan's `estimate`; `estimate` is the plan's
   mapping of a plain `none` row.
4. Nothing else in the record changed. For the six changed records the diff touches only `what`, `label`,
   `confidence` on the window attestation, and `notes` (the ruling's reason text, appended as the ruling directs).

| slug | 1 ruling match | 2 no contained invention | 3 label | 4 nothing else | note |
|---|---|---|---|---|---|
| octant | pass (keep absence) | pass | pass | pass (unchanged) | invention 1730-1731; its end 1731 is past the window end 1730, so not contained |
| thermometer-reaumur | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; notes carries the reason |
| pneumatic-trough | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; notes carries the reason |
| globe-guericke | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; invention 1663 no longer an absence conflict |
| hemispheres-magdeburg | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; invention date null in the record |
| clock-candle | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; invention dated 520 AD, before the window |
| fume-hood | pass (keep absence) | pass | pass | pass (unchanged) | invention 1904, after the window |
| still-solar | pass (keep absence) | pass (invention date null, skipped) | pass | pass (unchanged) | window 1650-1730 kept; invention date null per the plan's grammar |
| thermometer-celsius | pass (keep absence) | pass | pass | pass (unchanged) | invention 1742, after the window |
| areometer-baume | pass (keep absence) | pass | pass | pass (unchanged) | invention 1768, after the window |
| thermometer-fahrenheit | pass (unknown presence) | pass (no absence) | pass | pass | rewritten as presence/open/low; notes carries the reason |

Result: pass
