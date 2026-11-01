# C4-RULINGS: keeper rulings on AUDIT-C4's two judgment calls

Unit 5086 (keeper, 2026-11-01; review 1101-0630 fix 2, with 1101-0736 fix 3 folded). Scope: the 23 economy
records of units C1–C3 that `AUDIT-C4.md` audited. The rulings are DESIGN.md §4 region exceptions (j) and (k).

## (a) Qualified period: `region.jamaica`

RESEARCH.md §2 row "White plantation artisans": £20–30 a year with keep, "Jamaica, later 18th c.", "researched,
late", ECON-EKU. INGEST-PLAN row 16 maps it to 18th c., century, circa; the record stores 1700–1799,
`precision: century`, `circa: true`, note "… later 18th c.".

DESIGN's date rules: §1.3, "dates as intervals with precision, never false points"; §4 V4 rule (a), "A record
takes only the dates and places its anchored row or that row's section states … A bound that no anchor states …
is never written".

**Ruling:** a qualified period ("later/early/mid- Nth c.") maps to the whole century, `precision: century`,
`circa: true`, the qualifier verbatim in `note`. Not to a half-century: the row states the century and no split of
"later", so 1750 would be a bound no anchor states. Century precision says the bounds are the century's, so the
1700 start is not a claim the record makes beyond the row. `date: null` with the qualifier in `note` also passes.
`region.jamaica` already conforms; AUDIT-C4's check 2 failure on it is withdrawn.

## (b) Unverified row: `region.port-royal`

RESEARCH.md §2 row "Craftsmen, Port Royal": "wages comparable to those in England" (John Taylor, 1680s),
"researched, unverified (a thesis's summary of Taylor; the page could not be opened)", ECON-EKU. The record has
`label: researched`, `confidence: low`, reason "John Taylor via EKU thesis summary; page not opened".

**Ruling:** that is right; it does not map to `estimate`. `label` is how a value was got and `confidence` how sure
(§1.1; exception (i)). A value a source states, read second-hand or cited unopened, was got by research; `estimate`
means derived or judged. The row's qualifier ("unverified", "not opened", "late") caps confidence at `low`, and
the reason must say what was not opened. V4 check 3 compares the label word only. AUDIT-C4's check 3 failure on
`region.port-royal` is withdrawn; `region.jamaica` ("EKU thesis not opened", low) also conforms.

## Record changes

Of the 23 C1–C3 records, only two carry a qualified-period or unverified row (RESEARCH.md §2 rows 7 and 8; the
merchant seaman row is already `estimate`), and both conform.

No record changes.

The other six AUDIT-C4 failures (gold-dust, piece-of-eight, pearl, king-davenant-corn-price-table, gold-coast,
pearl-coast) are anchoring and source-key failures under rules (b) and (c), outside these two rulings.
