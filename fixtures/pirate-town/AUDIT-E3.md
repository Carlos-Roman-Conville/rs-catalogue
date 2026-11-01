# AUDIT-E3: equipment ingest (unit E3, task 5046)

V4 audit of the equipment ingest (unit E2: 313 `technology` and 216 `EQ-*` source records). No record was edited.

**Sample.** 10 % by file name, evenly spaced over the sorted names: 32 technology records (every 9.78th of 313, starting at `aas.json`) and 22 `eq-*` source records (every 9.82nd of 216, starting at `eq-alch.json`).

**Sources.** Each technology record was checked against its `SCIENTIFIC_EQUIPMENT.md` §2 row (the first `derived_from` anchor). `equipment.json` was checked only for the `voltaic-pile` anchor. Each `eq-*` record was checked against the INGEST-PLAN.md appendix. The appendix titles are cut at about 100 characters, so the title check compares the prefix.

**Checks.**
- **T**: name, availability, date, credited, skill and `conf_history` copied from the row; every cited key appears in the row's Mark cell.
- **A**: plain `none` row (an `absence` record, label `estimate`): the row's own text gives a later date or a missing requirement for 1650-1730 Atlantic.
- **U**: `none (anomaly)` row: presence is unknown (`open`, low confidence, §1.1).
- **K**: `eq-*` record key and title match the appendix.

| id | checks | note |
|---|---|---|
| technology.aas | T, U | Cells match row. Availability `none (anomaly)`: presence `open`. |
| technology.athanor | T | Cells match. `rare`, researched. |
| technology.barometer-portable | T | Cells match. Row id is `barometer_portable`. |
| technology.blood-gas-analyser | T, U | Cells match. Anomaly: `open`. |
| technology.burette | T, U | Cells match. Anomaly: `open`. |
| technology.centrifuge | T, A | Row: settling and decanting only; the whirling arm is a later 18th c. device; date column 1864. Later date supports absence. |
| technology.compass-mariner | T | Cells match. `common`. |
| technology.ct | T, U | Cells match. Anomaly: `open`. |
| technology.dewar | T, A | Row: the idea is 1892. Later date supports absence. |
| technology.engine-newcomen | T | Cells match. `rare`, 1712 date. |
| technology.flask-erlenmeyer | T, A | Row: the conical form does not exist before its date, 1860. Later date supports absence. |
| technology.fuel-charcoal | T | Cells match. `common`; date open; `conf_history` low. |
| technology.funnel-glass | T | Cells match. `rare`. |
| technology.furnace-portable | T | Cells match. `common`. |
| technology.glass-sublimation | T | Cells match. `rare`. |
| technology.hearth | T | Cells match. `common`; `conf_history` low. |
| technology.jar-collecting | T | Cells match. `common`; keys EQ-SF-PET and EQ-SF-SLOANE both in row. |
| technology.lamp-spirit | T, U | Cells match. Anomaly: `open`. Row text says the dated item is after 1730. |
| technology.litmus | T | Cells match. `rare`; `conf_history` high. |
| technology.match-friction | T, A | Row: invented 1826. Later date supports absence. |
| technology.mill-boring | T, A | Row: the Verbruggen mill is 1770, after 1730. Later date supports absence. |
| technology.octant | T, A | Row: none before 1731. The row's own text gives 1731, so the absence claim is supported. The date column reads 1730 to 1731, so 1730 is the window's last year; noted, not a fail. |
| technology.pill-tile | T | Cells match. Presence rests on the tile (`common`, about 1665). |
| technology.press-screw | T | Cells match. `common`. |
| technology.receiver | T | Cells match. `common`; date c. 300. |
| technology.schlenk-line | T, U | Cells match. Anomaly: `open`. |
| technology.spectacles | T | Cells match. `common`; date about 1286 to 1300. |
| technology.still-laboratory-glass | T | Cells match. `common`. |
| technology.test-tube | T | Cells match. `rare`; `conf_history` low. |
| technology.tools-gunsmith | T | Cells match. `rare`; keys EQ-MET-9 and EQ-MET-19 both in row. |
| technology.tube-xray | T, A | Row: needs a high vacuum and an induction coil (a missing requirement); date 1895. |
| technology.voltaic-pile | T, A | Row: none (1799). Later date supports absence. The record's second anchor is `equipment.catalogue.voltaic_pile`, which is the row id in `equipment.json`. The record copies it verbatim; the id is odd in the source file, not in the record. |
| eq-alch | K | Key EQ-ALCH; title prefix matches appendix. |
| eq-an20-gm | K | Key and title match appendix. |
| eq-an20-rota | K | Key and title match appendix. |
| eq-bm20-ct | K | Key and title match appendix. |
| eq-bm20-lam | K | Key and title match appendix. |
| eq-chem18-11 | K | Key and title match appendix. |
| eq-chem18-2 | K | Key and title match appendix. |
| eq-chem19-11 | K | Key and title match appendix. |
| eq-chem19-20 | K | Key and title match appendix. |
| eq-ind19med-anti | K | Key and title match appendix. |
| eq-ind19med-cent | K | Key and title match appendix. |
| eq-ind19med-mict | K | Key and title match appendix. |
| eq-lem-bain | K | Key and title match appendix. |
| eq-meas-boyle | K | Key and title prefix match appendix. |
| eq-met-14 | K | Key and title prefix match appendix. |
| eq-met-6 | K | Key and title match appendix. |
| eq-opt-micro | K | Key and title match appendix. |
| eq-pf-mill | K | Key and title prefix match appendix. |
| eq-pres-papin | K | Key and title match appendix. |
| eq-sf-assay | K | Key and title prefix match appendix. |
| eq-sf-oct | K | Key and title match appendix. |
| eq-surg-3 | K | Key and title prefix match appendix. |

Sampled: 54 (32 technology, 22 `eq-*`). Plain-`none` absence rows checked: 8, all supported. `none (anomaly)` rows checked: 6, all unknown presence. Failing ids: none.

Result: pass
