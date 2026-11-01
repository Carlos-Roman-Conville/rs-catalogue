# Note rulings: context in an observation's `note`

Keeper ruling, 2026-11-01 (task 5101; review 1101-0757 fix 1). AUDIT-C4-2 (5087) passed `entity.piece-of-eight`
but flagged that its 1704 observation note "full weight; the plantations; re-enacted by the Act of 1707" takes
"the plantations" from RESEARCH §3 prose, not from the anchored ECON-ANS row.

## Ruling (DESIGN-V4.md §4 exception (l))

A `note` is part of the record and is held to the record's anchors: it carries only what an anchored row (or its
section, or the referent window on rule (a)'s terms) states. Context from prose outside the anchors is not written
there, even when `place` or `date` is null. Rule (a) ("A record takes only the dates and places its anchored row or
that row's section states") covers a place or date in a note, and §1.3's "never false points" rules out a null
field whose note claims what the field left out. Rule (b) means the prose cannot be added as an anchor instead. A
note may still carry the row's own words (exception (j)), the doubt or a missing bound (rule (a)), and where the
rows sit (exception (g)). V4 check 2 ("every value, date, place is in the row") reads `note` too; check 7 counts a
file a note names that no anchor cites.

The ECON-ANS row (pirate-ship SOURCES.md, "Economy sources") states: "Queen Anne's 1704 proclamation: 6s for a
full-weight piece of eight against 4s 6d sterling; Act of 1707". "In the plantations" and "re-enacted by
Parliament in 1707" appear only in RESEARCH §3's prose, which is not an anchor of this record.

## Record changes

| record id | change | ruling |
|---|---|---|
| `catalogue/entity.piece-of-eight` | 1704 observation (value 6, `s`): `note` "full weight; the plantations; re-enacted by the Act of 1707" becomes "full weight; Act of 1707" | (l): "the plantations" (a place) and "re-enacted" are RESEARCH §3 prose, not in the ECON-ANS row |

The other piece-of-eight notes ("Peruvian", "Spanish and Mexican", "4s 6d sterling") are in their anchored rows
and stay. INGEST-PLAN row 19-20 still shows the old note; it is a plan, not a record, and is left as written.
