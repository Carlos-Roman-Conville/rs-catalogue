# Rules for Cursor Composer (and any belt worker) in `Toolchain/catalogue`

1. Read `DESIGN.md` (the sections your task names) first. It is the spec. Disagree by parking in `HANDOFF.md`
   Blocked, never by changing DESIGN.md.
2. **Tags, never unlocks (Rex, PLATFORM §6).** The catalogue is reference data plus a read-only query library. Never
   write code that decides whether something can exist, be made, be known or be used because a date, presence or
   availability says so. That is Knowledge & Technology's job.
3. The catalogue holds identity, names, classification, attestations, observations, sources and provenance. Never
   physical, biological or economic property values that a mechanism reads (Rex, CAT-Q1): those stay with Reality,
   Life and Economy, keyed by catalogue id.
4. `src/` imports only `@rex/kernel` and its own files. Never an engine, never a game, never pirate-ship.
5. Ids are `catalogue/<kind>.<slug>` (DESIGN §2.1): lowercase `[a-z0-9-]`, a dot only after the kind, an optional
   `.<n>`, never `/`, never renamed (aliases in `data/aliases.json`).
6. Deterministic: no `Math.random`, no `Date.now`; every output sorted by id, never by object-key order.
7. Never invent a value, date or source. A missing value is `null` with a note; absence of evidence is never
   recorded as absence (DESIGN §1.1).
8. Style: TypeScript, ES modules with `.ts` import suffixes, small files, one test file per source file in `test/`,
   test titles naming the rule they check.
9. Run only your own tests while working (`npx vitest run test/<file>.test.ts`); the runner runs the Gate.
10. Never edit the pirate repo or any other repo; fixtures read files where they are.
11. One commit, not pushed, ending with `Co-Authored-By: Cursor Composer <composer@cursor.com>`. Nothing left uncommitted.
    Close with a short report: done or parked, tests, commit hash.
