# Catalogue: design §4, validation plan (V4)

Split out of DESIGN.md on 2026-11-01 (task 5100). `DESIGN §4` in other files means this file.


| # | Test | Level (§11b) | Independent of the author |
|---|---|---|---|
| V1 | schema and cross-field checks: every record parses, every attestation and observation cites a source, every place and `ref` resolves, no id reused, aliases acyclic | mechanism; every unit | the check script |
| V2 | **tags, never unlocks** (ROADMAP P4 test 2): (a) static: a check over every engine's `kernel.json` and imports fails if a mechanism reads `CatalogueReader.window`/`get` or any Catalogue date field; (b) dynamic: the Kernel thirty-day harness run twice, once with every Catalogue date shifted by +500 years, gives byte-identical engine state | (a) every unit; (b) on interface change | (a) registry check; (b) Haiku unit |
| V3 | calendar conversions against published tables (the 1752 change: Wednesday 2 September followed by Thursday 14 September; Julian Day Numbers from *Calendrical Calculations*'s worked examples) | mechanism | data not written by the author |
| V4 | source audit: a Haiku unit that did not write the rows re-opens a 10 % sample of each batch's sources and confirms value, label and citation; a batch with a failure is re-checked in full | per batch | yes |
| V5 | held-out guard: no tuning unit reads an observation with `benchmark_role: held_out`; units of kind `harness` (the P11 evaluator) are allowed | mechanism | registry check |
| V6 | fixture drift: every `derived_from` sha256 still matches its source; mismatches listed for re-ingest | every unit touching a fixture | the check script |
| V7 | coverage report per benchmark window (H1–H5, Caribbean 1690–1720): records per kind, share researched / estimate / fiction | on demand | — |

**V4 anchoring rule** (2026-11-01, after AUDIT-1 failed 64 of 66 records on check 2). What a V4 audit holds an
ingested record to:

- **(a) Dates and places.** A record takes only the dates and places its anchored row or that row's section
  states. Beyond them it may take the referent window, and only the bounds that window states: Port Royal before
  1692 (to 1692) and Nassau 1703–1718 ("The referents" paragraph of `STARTING_TOWN.md`, repeated in the Q5
  section intro), and the game's period c. 1690–1720 that step 1 of the same section states. An attestation or observation that uses the referent window is labelled
  `estimate`, whatever the row's label is, and the referents paragraph is added as a second `derived_from` anchor.
  A bound that no anchor states, such as Port Royal's 1670 start or a trade's 1680 start, is never written: cite a
  row that states it as a further anchor, or set `date: null` and put the missing bound in `note`.
- **(b) Prose anchors.** The referents paragraph is the only prose anchor allowed, and only as that second anchor
  beside a row; never alone. Any other bold lead-in or paragraph is not an anchor (AUDIT-1 check 1).
- **(c) Source keys.** A record cites a source key only if one of its anchored rows names that key. A row that
  says only "`TWN-*`" names no key. To cite another key, add a second `derived_from` to a row that names it.
- **(d) Relations.** A relation has no `label` or `confidence` in the schema (`src/schema.ts`, `relations`), so
  uncertainty about a relation is written in the record's `notes`, naming the relation.
- **(e) The audit.** V4 check 2 (values, dates, places) and check 4 (source keys) follow (a) to (c): a value is
  supported if any of the record's anchors states it under these terms, and the label check accepts `estimate`
  for anything taken from the referent window.

**V4 nesting rule** (2026-11-01, review 1101-0126). An undated geographic `part_of` relation (Nassau in New
Providence in the Bahamas in the Caribbean in the Atlantic in the world; Port Royal and Kingston in Jamaica in the
Greater Antilles; Barbados in the Lesser Antilles) is anchored by the referents paragraph plus the row that names
the place, not by a gazetteer: this package holds no gazetteer or atlas source and SOURCES.md is another repo's,
so none is invented. Where an anchor states the nesting (the referents name "Port Royal, Jamaica" and "Nassau, New
Providence"), the relation holds as written. Where none does (New Providence in the Bahamas and every step above,
Kingston in Jamaica, Jamaica in the Greater Antilles, Barbados in the Lesser Antilles), the relation is kept and
the record's `notes` names it and says no anchor states it (the schema has no relation label, `src/schema.ts`,
`relations`; rule (d)). Such a relation carries no `date` and no source key it is not anchored to. A nesting
relation is never deleted only because no row states it: keep the evidence and say the doubt in `notes`. A
political relation (a `part_of` to a polity record, dated or not, such as New Providence `part_of` England from
1718) is not geographic nesting and follows rule (a) and region exception (b).

**Region anchoring exceptions** (2026-11-01, review 1101-0223 fixes 1, 2 and 4; AUDIT-5 fails on
`region.atlantic`, `region.jamaica`, `region.new-providence`, `practice.commercial-brewing`; (a) reworded and (d),
(e) added 2026-11-01, review 1101-0317 fixes 1, 2 and 6, after AUDIT-7; (f) to (i) added 2026-11-01, review
1101-0406 fixes 1 and 3, after AUDIT-8; (j) and (k) added 2026-11-01, review 1101-0630 fix 2, after AUDIT-C4; (l) added 2026-11-01, review 1101-0757
fix 1, after AUDIT-C4-2).

- **(a) A geographic container no row names** (`region.atlantic`). A region record that is only a step in the
  geographic nesting (a sea, an ocean, an island group) may pass on the referents paragraph alone, as an exception
  to rule (b), when all of these hold: its preferred name is a sea, an ocean or an island group, and it has no
  political relation; it carries only names, kind and `part_of` relations to other region records with no `date`
  and no `sources` (no attestation, observation, date or source key); and its `notes` say "no row names X" (X the
  place). A political relation is defined by what it points to, not by whether it has a `date`: it is a `part_of`
  to a polity record, a region record whose preferred name is a state or crown rather than land or water
  (`region.england`, whose notes call it a political region, is the only one in this fixture), so the undated
  `region.jamaica` `part_of` England of exception (b) is still political. The test reads only the record itself:
  the ids its `part_of` relations point to, its names, its notes and its empty fields. The reason is the nesting
  rule's: this package holds no gazetteer and invents none, and a container the referents' places sit in is
  evidence enough for a name with no claim attached. Any attestation, observation, date, source key or political
  relation on such a record needs an anchored row as usual, and without one it is removed (the doubt goes in
  `notes`). `region.atlantic` meets the terms and passes with no change: its only relation is an undated `part_of`
  to `region.world` (not a polity record), it has no attestation, observation or source, and its notes carry "no
  row names Atlantic Ocean".
- **(b) A political `part_of`** (`region.jamaica` to England 1655, `region.new-providence` to England 1718). A
  political relation (a `part_of` to a polity record, exception (a)) is a claim whether or not it carries a date,
  and gets no exception: it holds only where an anchored row states the polity over the place, and each date bound
  it carries follows rule (a). `circa: true` is a date precision, not a source, and a note
  "no anchored row states England" does not anchor it. A search of the whole pirate-ship SOURCES.md (2026-11-01)
  for English rule of Jamaica or the Bahamas found:
  - **STL-LAW** ("English law in Jamaica: primogeniture, dower, Statute of Distributions 1670"; standard reference,
    not opened) states English law in Jamaica. No row states the 1655 bound (MED-BURN's "1655-1780" is the span of a
    mortality study, not a conquest). Fix for the next task: `region.jamaica` adds STL-LAW as a further
    `derived_from` anchor and keeps `part_of` England with `date: null`, its `notes` naming the relation, that the
    1655 bound is in no anchored row, and that STL-LAW was not opened.
  - **No row** states English rule of New Providence or the Bahamas (TWN-NAS states the 1718 pardon, not England;
    TWN-LAW states English law in "the colonies", naming no place). Fix for the next task:
    `region.new-providence` removes its political `part_of` England and says in `notes` that English rule from
    1718 waits for a source row; the geographic nesting stays. A row on the Bahamas' Crown status is a research
    request for pirate-ship SOURCES.md (another repo; not written from here).
- **(c) Check 7 and this package's DESIGN.md.** Check 7 counts keys and documents offered as evidence. DESIGN.md
  is this package's rulebook, not evidence, and the rule names check 7 already exempts are its sections, so a
  citation of DESIGN.md (`DESIGN §1.1`) is exempt like a rule name, on one condition: it points at a convention
  (how a value is written), never supports a value, date or place. `practice.commercial-brewing`'s "(DESIGN §1.1)"
  points at the unknown-presence convention, so it passes; no record changes. Any other document (`TOWNS.md`,
  another repo's design file) is still counted.
- **(d) A section intro that repeats the referents** (AUDIT-7 open question; the eleven Port Royal trade records
  `practice.blacksmithing`, `butchering`, `carpentry`, `clay-pipe-retailing`, `cobbling`, `cooperage`,
  `daily-markets`, `goldsmithing`, `merchant-storekeeping`, `vintner-trade`, `wood-turning`). The Settlement
  section's intro ("The town keeper's referents (Port Royal before 1692, Nassau 1703–1718) apply") repeats the
  referent window and is not the Q5 row's own statement of a date, as the V4 anchoring rule (2905) already says
  ("repeated in the Q5 section intro"), so the 1692 end those records take is the referent window: each 1682–1692
  attestation is labelled `estimate` and adds the referents paragraph as a second `derived_from` anchor, the 1682
  start staying on the Q5 row. AUDIT-6 and AUDIT-7 passed them on the other reading; the next audit applies this one.
- **(e) An unsourced attestation** (`practice.sugar-grade-distinction`: `label: open`, `sources: []`). V4 does not
  allow an unsourced attestation, whatever its label: V1 and §1.1 require every attestation to cite a source, and
  under rule (c) that source is a catalogue source record for a key its anchored row names. Where the row's keys
  have no source record yet (L, PHY-RATION, DV, CSP), the attestation is removed and the claim, the row's label and
  the keys stay in the record's `notes` until those keys are ingested as source records; no source is invented.
- **(f) A fiction attestation** (`practice.faction-burial-alternatives`: `label: fiction`, `scope: game:pirate-ship`,
  `sources: []`; added 2026-11-01, review 1101-0406 fix 1, after AUDIT-8). Rule (e) covers it: a fiction attestation
  gets no exception, because its row (CULTURE.md §2 "Alternatives the factions add") names `../combat/COMBAT.md` §4e
  and Rex, a game design file and a person, and neither is a catalogue source record, and making one would invent a
  source kind; the record's fiction is already carried by `provenance: original_fiction`, `scope: game:pirate-ship`
  and its `derived_from` anchor, so the attestation is removed and its claim, the `fiction` label and the row's
  pointers (Rex 2026-10-30, `COMBAT.md` §4e, which the anchored row names, so check 7 holds) stay in `notes`.
- **(g) A note naming its own anchor's file** (AUDIT-8 check 7 question; `region.new-providence`'s notes name
  `SOURCES.md`). The self-naming reading holds: a note may name the file that its own `derived_from` anchors cite,
  since the anchor's `file` field already names it, provided the note only says where the anchored rows sit or what
  was searched there and supports no value, date or place; a file no anchor of the record cites is still counted.
  `region.new-providence` passes with no change.
- **(h) A bound tied to one key of a multi-key row** (`practice.vintner-trade`; review 1101-0406 fix 3). The Q5
  trades row ties 1682 to "Hanson 1682 (STL-CUN)" only (Blome 1672 and Taylor 1687–88 are STL-PSJ's dates), so a Q5
  record that takes the 1682 start cites `catalogue/source.stl-cun` in the attestation and record `sources`; no
  new `derived_from` is needed, since the Q5 trades row it is anchored to names STL-CUN (rule (c)), and the label
  stays `estimate` (relabelling would change nothing, and redating to 1672 or 1687 would be a different claim).
  The row does not say which trades Hanson lists, so the confidence reason says the 1682 bound is Hanson's list
  year, not a statement about that trade. The same holds for every Q5 record that takes 1682 without STL-CUN.
- **(i) Label and confidence** (the eleven Q5 trade records; six carry `high`, five `medium`). An `estimate`
  label is consistent with `confidence.level: high`, an estimate with high confidence being allowed because §1.1
  keeps `label` (how a value was got) and `confidence` (how sure, with a reason) as separate fields and rule (a)
  relabels a referent-window bound `estimate` without lowering confidence, so `high` stays where the anchored row
  states the thing itself `researched` and only a bound comes from the referent window; no level changes.
- **(j) A qualified period** (`region.jamaica`, "later 18th c."; added 2026-11-01, review 1101-0630 fix 2, after
  AUDIT-C4). A qualified period ("later Nth c.", "early Nth c.", "mid-Nth c.") is stored as the whole named
  century, `precision: century`, `circa: true`, with the qualifier kept verbatim in the observation's or
  attestation's `note`; never as a half-century or any narrower interval. §1.3 stores "dates as intervals with
  precision, never false points", and rule (a) says "a bound that no anchor states ... is never written": the row
  states the century, so 1700–1799 at century precision is its own statement, while 1750 (or any split of
  "later") is a bound no anchor states. `precision: century` says the bounds are the century's, not the claim's,
  so the 1700 start is not read as a date the row gives. `date: null` with the qualifier in `note` stays allowed
  (the equipment grammar's choice, INGEST-PLAN, for a script that cannot judge). `region.jamaica` passes with no
  change; see `fixtures/pirate-town/C4-RULINGS.md`.
- **(k) An unverified row** ("researched, unverified", "page not opened"; `region.port-royal`; added 2026-11-01,
  review 1101-0630 fix 2). `label` says how a value was got and `confidence` how sure (§1.1, exception (i)): a
  value a source states, read through a summary or cited without the page being opened, was got by research, so
  it keeps `label: researched` and is not relabelled `estimate` (estimate means the value was derived or judged,
  not that the citation is unchecked). The doubt goes in `confidence`: `level: low`, and the reason says what was
  not opened or verified. V4 check 3 reads the row's label word (`researched`), and its qualifier ("unverified",
  "late", "not opened") as a confidence ceiling of `low`. `region.port-royal` (low, "page not opened") and
  `region.jamaica` (low, "EKU thesis not opened") pass with no change.
- **(l) Context in a `note`** (`entity.piece-of-eight`, 1704 note "the plantations"; added 2026-11-01, review
  1101-0757 fix 1, after AUDIT-C4-2). An observation's or attestation's `note` is part of the record, so it is
  held to the record's anchors like any other field: it may carry only what an anchored row (or that row's
  section, or the referent window, on rule (a)'s terms) states, and context from prose outside those anchors is
  not written there, even with `place` or `date` left null. Rule (a): "A record takes only the dates and places
  its anchored row or that row's section states"; a place or date in `note` is still taken by the record, because
  a reader takes it from the note as readily as from `place`. §1.3 stores values "never false points": a field
  left null so as to claim nothing is false precision if the note then claims it. Rule (b) means such prose cannot
  be anchored instead (only the referents paragraph is a prose anchor). What a `note` may still carry: the
  anchored row's own words (qualifiers kept verbatim, exception (j)), the doubt or the missing bound (rule (a)
  "put the missing bound in `note`"), and where the rows sit (exception (g)). V4 check 2 enforces it: "every
  value, date, place is in the row" includes the words of `note`, so an unanchored place or date in a note fails
  check 2, and a file a note names but no anchor cites is counted by check 7. `entity.piece-of-eight`'s 1704 note
  drops "the plantations" and "re-enacted", which come from RESEARCH §3 prose; see
  `fixtures/pirate-town/NOTE-RULINGS.md`.

"Validated" for a reference catalogue means: a value's source was re-checked by someone other than its writer (V4)
and, where a second independent source exists, the two agree within the interval stated. Disagreement is kept as two
attestations, never averaged (PLATFORM §4: competing explanations are kept).

