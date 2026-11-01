# Pirate town: absence rulings (unit 5070, 2026-11-01)

Review round 1101-0609, fix 1. The ingest (INGEST-PLAN.md, table "By the availability cell's start") wrote all 69
plain-`none` equipment rows as `absence` / `estimate` over 1650-1730, Atlantic, on the plan's reading that a plain
`none` row "is evidence of a later date or a missing requirement". These 11 rows were flagged as not giving one.
Each ruling below reads the record in `records/technology/` and its `Availability` and `Date (usual)` cells in
SCIENTIFIC_EQUIPMENT.md §2 (the file the records' `derived_from` names; the cells and the record notes match).

- **keep absence**: the row itself gives a date after 1730 or a missing requirement; quoted. The record stays
  `absence` / `estimate`.
- **unknown presence**: the row gives neither (the thing existed before or inside the window, and the cell only
  says no sign of it was found). Rewritten per DESIGN §1.1: `what: presence`, `label: open`, `confidence: low`, the
  reason in the confidence reason and the record's `notes`.

| slug | ruling | reason from the row |
|---|---|---|
| octant | keep absence | "none before 1731 (outside the period's 1650 to 1730 window by one year)"; date "Hadley's description 1731". The invention interval 1730-1731 touches the window only at its lower bound; the row places the instrument after it |
| thermometer-reaumur | unknown presence | date "1730 (Wikipedia)", the window's last year; "1730 is the end of the window; a French academy instrument" gives no later date and no missing requirement for the Atlantic in 1730 |
| pneumatic-trough | unknown presence | date "1727 (Hales, Vegetable Staticks)", inside the window; the cell says "1727 is the period's last year" and "a tub and inverted bottle were makeable in 1700", so no requirement was missing |
| globe-guericke | unknown presence | date "1663", inside the window (the record's own invention date); "none (no sign of it on the Atlantic)" is absence of evidence (§1.1) |
| hemispheres-magdeburg | unknown presence | date "8 May 1654 Regensburg; repeated 1656 Magdeburg; Berlin 1663", inside the window; "none (a demonstration piece)" names no later date or missing requirement |
| clock-candle | unknown presence | date "520 AD: You Jiangu's poem ... al-Jazari 1206", long before the window; "none in the sources for 1650 to 1730; sandglasses and watches did the job (open)" is absence of evidence, and the row itself marks it open |
| fume-hood | keep absence | date "1904 (Gdansk installation still working ...)"; "period: work outdoors or at a chimney". The "earlier wood-and-glass chimney hoods" are undated and are the chimney the cell names, not this record's thing |
| still-solar | keep absence | date "1872 Charles Wilson, Las Salinas, Chile (one source: 1882)"; "no earlier recorded still in the results; EQ-PF-SOLAR" |
| thermometer-celsius | keep absence | date "1742 (inverted: 0 boiling, 100 freezing)"; "none as a named scale; spirit thermometers existed from the 1650s but with no agreed scale". The record is the scale; the scaleless spirit thermometer is a different thing |
| areometer-baume | keep absence | "none (1768)"; date "1768 (Baume; EQ-CHEM18-17)". "Simple hydrometers existed" is a different thing from Baume's scale |
| thermometer-fahrenheit | unknown presence | date "1714 mercury thermometer; scale proposed 1724", inside the window; "Dutch and German instrument makers only" says where it was made, not that it could not reach the Atlantic colonies by 1730 |

Totals: 5 keep absence, 6 unknown presence. The other 58 plain-`none` rows are not ruled here.

Four of the records (hemispheres-magdeburg, clock-candle, still-solar, thermometer-fahrenheit) carry `date: null`
on the invention attestation: the plan's date grammar (INGEST-PLAN.md, "Attestation 2") yields null for a first
clause it cannot parse. That is the plan's stated behaviour, not a defect; the rulings above read the cell text.

## Rule for check.ts: absence window containing the record's own invention

**Yes, check.ts should flag it.** An `absence` attestation says the thing was not there in its window; when the same
record's own `invention` (or `earliest_evidence`) interval lies wholly inside that window, the thing existed during
it, and an absence then needs a row-given reason the check cannot see. Three of the 11 rows above are caught by it
as dated (thermometer-reaumur 1730, pneumatic-trough 1727, globe-guericke 1663); two more are the same case with a
null-parsed date (hemispheres-magdeburg, thermometer-fahrenheit) and one predates the window (clock-candle). The
ingest's classifier passed all six; a check stops the next ingest repeating the dated case.

What it compares, per record: for each attestation `A` with `what: absence` and each attestation `I` in the same
record with `what` ∈ {`invention`, `earliest_evidence`} and a non-null `date`, flag when
`A.date.from.year <= I.date.from.year` and `I.date.to.year <= A.date.to.year` (with open ends: a missing `A.from`
is minus infinity, a missing `A.to` plus infinity; a missing `I` end does not satisfy containment). Place is not
compared: `I.place` is null for every ingested row, and a thing in existence somewhere inside the window is what
makes an absence claim need a reason. An `I` with `date: null` is skipped. The flag is an error, not a warning.

Under that comparison, after the rulings are applied: octant (invention 1730-1731, to 1731 > 1730) and the four
later-dated kept rows pass; the six unknown-presence rows no longer have an `absence` attestation. A future row that
truly needs an absence with a contained invention gets a DESIGN ruling first; the check has no exception list.

The next task applies these rulings in scripts/ingest-equipment.ts's stated per-row list (DESIGN §1.6) and adds
the check; this unit edits no record and no script.
