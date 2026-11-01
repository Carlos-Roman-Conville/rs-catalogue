# Pirate-town fixture: equipment and economy ingest plan (task 5004, 2026-11-01)

The two DESIGN §6 sources not yet ingested: `science/SCIENTIFIC_EQUIPMENT.md` §2 with `body/data/equipment.json`
(table `catalogue`, 314 rows), and `Toolchain/economy/RESEARCH.md`. Both files are already in `manifest.json`. No
record is edited by this plan. Every rule below takes only what a row states (DESIGN §4, V4 anchoring rule (a)-(c));
what no row gives is left out or written as unknown presence (§1.1).

Equipment units: 3
Economy units: 4
Source records to add: 216
Promotion: after-fixture
Code needed: scripts/ingest-equipment.ts and test/ingest-equipment.test.ts (new); no change to src/drift.ts or src/check.ts

## (a) Equipment: row to `technology` record

**Rows.** The markdown table under `<!-- table:equipment.catalogue -->` has 20 columns; `equipment.json` has 4 of them
(`id`, `Skill`, `1650 to 1730 availability`, `Mark`). Both have 314 rows; the availability and Mark cells agree on all
314 (checked 2026-11-01). Two JSON ids differ from the markdown: `equipment.catalogue.voltaic_pile` (markdown
`voltaic_pile`) and `equipment.catalogue.tagged` (markdown `tagged`). The row `tagged` ("A tagged piece of equipment
(template)", availability "by the story", Mark "rex (the plug), open (the rows)") is the game's time-anomaly plug, not
a thing: it is skipped and stays the plugin's overlay (§0). The `wear` table (8 rows) is game state and is not
ingested. **313 records.**

| Field | Rule |
|---|---|
| `id` | `catalogue/technology.<slug>`; slug = the markdown `Id` cell with `_` replaced by `-` (`furnace_charcoal` → `furnace-charcoal`, `voltaic_pile` → `voltaic-pile`). All 313 ids are `[a-z0-9_]+` and give distinct slugs. A slug that collides with an existing record fails the script; no `.n` disambiguator is invented. File `records/technology/<slug>.json` |
| `kind` | `technology` |
| `names` | one: `{text: <Equipment cell, verbatim>, lang: "en", use: "preferred"}`. Parenthesised alternates stay in the text; splitting them is a later judgment unit, not the script's |
| `classification` | `[{scheme: "catalogue", path: ["technology"]}]` (the fixture's pattern). The `Category` and `Roles` cells are the game's typing and are not a declared scheme |
| `provenance` | `["real"]` |
| `scope` | `universal` |
| `sources` | `catalogue/source.<key lowercased>` for every `EQ-*` key named anywhere in the markdown row or the JSON row (rule (c): both are anchors), except `EQ-HEAT`, which appears only as "EQ-HEAT items" and names no key |
| `relations` | none. `Predecessor` is not a prerequisite or a variant, so no relation is claimed |
| `observations` | none. The capability columns (temperature, pressure, precision, capacity, energy) are the keeper's estimates and belong to Reality and the game (CAT-Q1) |
| `derived_from` | two anchors: `{file: "../../Games/RPG's/pirate-ship/files/pirate-ship/science/SCIENTIFIC_EQUIPMENT.md", anchor: "## 2. The catalogue \| <md Id>"}` and `{file: "../../Games/RPG's/pirate-ship/files/pirate-ship/body/data/equipment.json", anchor: "catalogue \| <json id>"}`. A JSON anchor is `<top-level table key> \| <row's id cell>`, the same "table \| row key" form the markdown anchors use; never a row index, so inserting a row does not move an anchor. `sha256` is copied from `manifest.json` after the script checks that the file's digest equals it |
| `notes` | "Ingested by scripts/ingest-equipment.ts from SCIENTIFIC_EQUIPMENT.md §2 and equipment.json row <id>. Credited to: <cell>. Skill: <cell>. Capability columns stay with the game (CAT-Q1)." |

**Attestation 1, the window (every record).** `place: catalogue/region.atlantic`; `date: {from: {year: 1650}, to:
{year: 1730}, precision: "year", circa: false, calendar_of_source: "unknown"}` (the table caption states "Period
availability: 1650 to 1730, Atlantic", the row's own section, rule (a)); `sources`: the `EQ-*` keys in the Mark cell;
`note`: the availability cell verbatim. By the availability cell's start:

| Availability starts | Rows | `what` | `label` | `confidence` |
|---|---|---|---|---|
| `common` or `rare` | 184 | `presence` | `researched` (every Mark cell says "researched") | `conf_history` cell (high / medium / low); reason "conf_history <level>, SCIENTIFIC_EQUIPMENT.md §2 row <id>" |
| `none (anomaly` | 59 | `presence` | `open` | `low`; reason "availability 'none (anomaly)' is the game's time-anomaly mark, not a source of absence (DESIGN §6); window presence unknown" |
| `none`, any other | 69 | `absence` | `estimate` | `conf_history` cell; reason "the row states none for 1650-1730 and its keys date or explain it; the window statement is the keeper's reading of the source, hence estimate" |
| `open` (`net_insect`: "no net is in the sources") | 1 | `presence` | `open` | `low`; reason "no net in any source read: absence of evidence, written as unknown presence (§1.1)" |

A plain `none` row is evidence of a later date or a missing requirement (a gas supply, an electric current), not
absence of evidence, so `absence` holds; it carries the row's keys, so V1's "absence requires a source" holds too.
Every `open` record also gets the reason in its `notes` (§1.1).

**Attestation 2, the dated thing (every row whose `Date (usual)` cell does not start with `open`; 12 do).** `what:
invention` when `Credited to` is neither `-` nor starts with `open`, else `earliest_evidence`; `place: null` (no
column gives a place); `sources`: the Mark cell's keys; `label: researched`; `confidence`: the `conf_history` cell;
`note`: the `Date (usual)` cell verbatim, plus "credited to <cell>" where there is one. `date` is parsed from the
cell's first clause (up to the first `(`, `;` or `,`) by this grammar only, and is `null` otherwise:

- `N`, `c. N`, `about N`, `N to M` (N, M three or four digits, optional `AD`): `precision: year`, `circa` true for
  `c.`/`about`, `to` M or N.
- `Nth c.`: `precision: century`, from (N−1)×100 to (N−1)×100+99.
- `NNNNs`: `precision: decade`, from NNNN to NNNN+9.
- A first clause containing `BC`, `BCE` or `millennium`, a season or month, or a qualifier (`early`, `late`, `mid-`,
  `perhaps`), or any other form (`antiquity`, `medieval`, prose): `date: null`; the cell stays in `note`. No bound is
  guessed (rule (a)). On the 2026-11-01 counts about 150 rows parse and about 150 stay `null`.
- `calendar_of_source: "unknown"` (usual attributions name no calendar).

**Script, not batches.** One deterministic script: the 313 rows have one shape, so the mapping is code, not
judgment; Composer batches of ~20 would be 16 units that each retype cells (a transcription error V4 must then
catch), while a script copies cells exactly; and a source edit (V6 drift) is fixed by re-running it, which §1.6 asks
for ("the drift check reports the records to re-ingest"). The script: reads the two files and `SOURCES.md` in place,
refuses to write if any file's sha256 differs from `manifest.json`, checks every anchor resolves (the row id exists
in both files), writes the 313 technology records and the 216 `EQ-*` source records, is idempotent (a second run
changes no byte), and has `--check` that regenerates in memory and lists records that differ. Its test runs it on
a few fixture rows (one of each availability class, one of each date form, `voltaic_pile`, `tagged`).

**`EQ-*` source records** (written by the same script): `records/source/eq-<key lowercased>.json`, the shape of
`econ-ans.json`: `source: {key, title, gives, url, rights}` from the SOURCES.md columns 1-5, `names` the title,
`provenance: ["real"]`, `scope: universal`, `derived_from` `"## Body and world simulation sources (body-and-world
keeper, 2026-10-29) | <key>"`.

Unit E1: scripts/ingest-equipment.ts and test/ingest-equipment.test.ts (Composer; gate: the new test, tsc)
Unit E2: run scripts/ingest-equipment.ts; commit records/technology/*.json (313) and records/source/eq-*.json (216) (gate: check.ts, fixture-drift.ts)
Unit E3: V4 audit of E2 (Haiku; 10 % sample: 32 technology and 22 source records, re-checking cells and keys; a failure re-checks in full)

## (b) Economy: observations from RESEARCH.md

**Anchors.** A RESEARCH.md table row is anchored as `"<section heading> | <first cell>"` (the form
`practice.sugar-grade-distinction` already uses). §3's bullets are prose and not anchors (rule (b)), so the money
observations anchor on the SOURCES.md Economy sources row that states the value, `"## Economy sources (economy
keeper, 2026-10-30) | <key>"`. Every key cited already has a source record (the 18 `econ-*` files).

**Left out** (no catalogue source record for the row's keys; rule (e)): §1's Caribbean price series (PO, DV, CSP,
TR, L), the skimmings-spirit wage (L), all of §4 (L, PHY-RATION, DV, CSP, PY, D, J, ML, WC, VA30), §5's Ligon rows
(sugar per acre, spirit a week, hogs, cattle and horses: L). These keys are GOODS.md Part 4's and are not in
SOURCES.md (searched 2026-11-01; only PHY-RATION is, and its row gives no economy observation). Also left out: §1's
proposed rule and floor, §2's Caribbean estimate and §3's default (engine proposals, the Economy's); ECON-RAC (no
figure, "about equal in value"); the pearl price ("no 17th-century price found" is prose only).

**Quantity ids (proposed).** `registry/quantities.json` has `economy.price`, `economy.wages` and
`settlement.post_wage`, but they are run state in the engine's `money` unit, not period figures in a period money of
account, so none fits; proposed, for the registry keeper: `wage.rate`, `price.rise_above_common`,
`money.rated_value`, `price.unit_price`, `tax.rate`, `yield.input_per_output`, `yield.output_per_input`,
`yield.output_per_worker`, `yield.output_per_area`, `land.area_per_worker`. `unit` is the source's own (`s/day`,
`s/lunar month`, `£/troy oz`); the Kernel has no currency dimension, and no row says sterling or colonial currency
unless it does (ECON-ANS's "4s 6d sterling").

**Which record carries it.** The thing measured: a wage of one named trade goes on that trade's `practice` record (a
row naming three trades gives each the same observation); a wage of a group ("craftsmen", "artisans") on its place's
`region` record; a coin's rating on the coin; a yield on the practice that makes the output. Observation fields
follow §1.1; dates are only those the row states; `place` null where the row names none (the place a source title
suggests goes in `note`).

| # | Record | Quantity | Value, unit | Place | Date | Label, level | Key, anchor |
|---|---|---|---|---|---|---|---|
| 1-5 | `phenomenon.king-davenant-corn-price-table` (exists) | `price.rise_above_common` | 0.3, 0.8, 1.6, 2.8, 4.5; unit `1` (of the common price); note "harvest short by 1/10" … "5/10" | null | 1699 (printed), year | researched, medium | ECON-DAV; §1 table rows `1/10`…`5/10` |
| 6 | `practice.carpentry` (exists) | `wage.rate` | "5–6", `s/day`; note "house and ship carpenter; 'constantly'" | `region.pennsylvania` (new) | 1698, year | researched, medium | ECON-THO; §2 row 1 |
| 7 | `practice.bricklaying` (new) | `wage.rate` | "5–6", `s/day` | `region.pennsylvania` | 1698 | researched, medium | ECON-THO; §2 row 1 |
| 8 | `practice.masonry` (new) | `wage.rate` | "5–6", `s/day` | `region.pennsylvania` | 1698 | researched, medium | ECON-THO; §2 row 1 |
| 9 | `practice.tailoring` (new) | `wage.rate` | 12, `s/week`; note "about; journeyman; with board" | `region.pennsylvania` | 1698 | researched, medium | ECON-THO; §2 row 2 |
| 10 | `practice.shoemaking` (new) | `wage.rate` | 2, `s/pair`; note "journeyman; men's or women's" | `region.pennsylvania` | 1698 | researched, medium | ECON-THO; §2 row 3 |
| 11 | `practice.harvest-labour` (new) | `wage.rate` | "3–4", `s/day`; note "with diet" | `region.pennsylvania` | 1698 | researched, medium | ECON-THO; §2 row 4 |
| 12-13 | `practice.seafaring` (new) | `wage.rate` | 24 and 19, `s/lunar month`; notes "able seaman, Royal Navy", "ordinary seaman" | `region.england` | 1653 to 1797, year | researched, high | ECON-RN; §2 row 5 |
| 14 | `practice.seafaring` | `wage.rate` | 25, `s/month`; note "about; merchant seaman; by mid-century; higher in war" | `region.britain` (new) | 18th c., century, circa | estimate, low | ECON-RED; §2 row 6 |
| 15 | `region.port-royal` (exists) | `wage.rate` | "comparable to those in England", unit null; note "craftsmen; John Taylor via a thesis" | `region.port-royal` | 1680s, decade | researched, low (unverified, not opened) | ECON-EKU; §2 row 7 |
| 16 | `region.jamaica` (exists) | `wage.rate` | "20–30", `£/year`; note "white plantation artisans, with keep; later 18th c." | `region.jamaica` | 18th c., century, circa | researched, low (not opened) | ECON-EKU; §2 row 8 |
| 17-18 | `entity.piece-of-eight` (exists) | `money.rated_value` | 5 (Spanish and Mexican) and 4 (Peruvian), `s` | `region.jamaica` | 1681 to 1759 (rated 1681, repealed 1759), year | researched, high | ECON-BOJ; SOURCES row |
| 19-20 | `entity.piece-of-eight` | `money.rated_value` | 6, `s` (note "full weight; the plantations; re-enacted by the Act of 1707"), and 4.5, `s sterling` | null | 1704, year | researched, medium (summary) | ECON-ANS; SOURCES row |
| 21 | `entity.gold-dust` (exists) | `price.unit_price` | 4, `£/troy oz`; note "a shilling or two over or under" | `region.gold-coast` (new) | 1721 to 1723 (the voyage), year | researched, medium | ECON-ATK; SOURCES row |
| 22 | `material.pearl` (new) | `tax.rate` | 0.2, unit `1`; note "the crown's fifth of production" | `region.pearl-coast` (new) | null | researched, low (review only) | ECON-WAR; SOURCES row |
| 23 | `practice.rum-distilling` (new) | `yield.input_per_output` | 1.5, `gal molasses/gal rum` | null | null | estimate, low (no period citation) | ECON-WES; §5 row "Molasses → rum" |
| 24 | `practice.rum-distilling` | `yield.output_per_input` | 0.77, `gal rum/gal molasses`; note "6.5 million gallons imported, about 5 million made" | `region.new-england` (new) | 1770, year, circa | estimate, medium | ECON-CMT; §5 row "Molasses → rum" |
| 25 | `practice.tobacco-cultivation` (new) | `yield.output_per_worker` | 1710, `lb/worker/year` | null | 1680 to 1699, year | researched, medium | ECON-TOB; §5 row "Tobacco" |
| 26 | `practice.tobacco-cultivation` | `land.area_per_worker` | 3, `acre/worker` | null | null | researched, medium | ECON-CM; §5 row "Tobacco" |
| 27 | `practice.tobacco-cultivation` | `yield.output_per_area` | 570, `lb/acre`; note "the row's derivation from 1,710 lb and three acres" | null | null | estimate, low | ECON-TOB, ECON-CM; §5 row "Tobacco" |
| 28 | `practice.flour-milling` (new) | `yield.input_per_output` | "5–5½", `bushel wheat/196-lb barrel fine flour`; note "late (Jefferson's Farm Book); FL has no source record" | null | null | researched, medium | ECON-TJ; §5 row "Wheat → flour" |
| 29 | `practice.salt-curing` (new) | `yield.input_per_output` | 2, `bushel salt/1,000 lb pork`; note "beef needing more" | null | null | estimate, low (secondary) | ECON-SALT; §5 row "Pork, beef → salt meat" |
| 30 | `practice.salt-curing` | `yield.input_per_output` | 2, `bushel salt/barrel herring`; note "the British excise assumption (Adam Smith)" | null | null | estimate, medium | ECON-SMI; §5 row "Pork, beef → salt meat" |
| 31 | `practice.charcoal-making` (new) | `yield.output_per_input` | "35–40", `bushel charcoal/cord wood`; note "a good collier; 18th–19th c. iron furnaces" | null | 1700 to 1899, century | researched, medium | ECON-HOF; §5 row "Wood → charcoal" |

A range is kept as the row's string ("5–6"), never averaged (§4, competing values are kept). **New records** (17):
regions `pennsylvania`, `britain`, `gold-coast`, `pearl-coast`, `new-england` (names only, anchored on the row that
names the place, no `part_of`, `notes` "no row states its container"; nesting rule); practices `bricklaying`,
`masonry`, `tailoring`, `shoemaking` (not `cobbling`: no row equates them), `harvest-labour`, `seafaring`,
`rum-distilling`, `tobacco-cultivation`, `flour-milling`, `salt-curing`, `charcoal-making`; `material.pearl`. Each
cites its keys in `sources` and takes `provenance: ["real"]`, `scope: universal`. **Existing records gaining an
observation** (6, re-audited in C4): `king-davenant-corn-price-table`, `piece-of-eight`, `gold-dust`, `carpentry`,
`port-royal`, `jamaica`. Recipes stay the Economy's (§0): these are documented observations it may cite by `ref`.

Unit C1: wages, observations 6-16 (11): 6 new practices, regions pennsylvania and britain, edits to carpentry, port-royal, jamaica (Composer; gate: check.ts, fixture-drift.ts)
Unit C2: money and prices, observations 1-5 and 17-22 (11): material.pearl, regions gold-coast and pearl-coast, edits to king-davenant-corn-price-table, piece-of-eight, gold-dust (Composer; same gate)
Unit C3: yields, observations 23-31 (9): 5 new practices, region new-england (Composer; same gate)
Unit C4: V4 audit of C1-C3 (Haiku; all 23 touched records, since the batch is small and six were already audited)

## (c) Source records still missing

All 18 `ECON-*` keys have records (`records/source/econ-*.json`). Missing: the 216 `EQ-*` keys the equipment rows
name, all in SOURCES.md "## Body and world simulation sources (body-and-world keeper, 2026-10-29)" (219 `EQ-*` rows;
`EQ-TL`, `EQ-CAP`, `EQ-LEMERY` are named by no row and are not added). The script writes them (E2), taking the key
list from the rows, so none is typed by hand. One line each, in SOURCES.md order, is the appendix at the end of this
file (generated 2026-11-01 from the two equipment files and SOURCES.md; E2's script must produce the same 216).

## (d) Code needed

Neither file resolves an anchor of any kind. `src/drift.ts` hashes each manifest file whole and compares each
record's `derived_from[].sha256` with the manifest; it never reads `anchor`, so a `.json` source is covered exactly
like a `.md` one (`equipment.json` is already in the manifest). `src/check.ts` never reads `derived_from`. So no
change to `src/`; anchor resolution is done where it matters, by the ingest script before it writes (an anchor whose
row is missing fails the run) and by the V4 audit. The only new code is the script and its test (E1).

## (e) Promotion

After the fixture: AUDIT-9's universal records stay under `fixtures/pirate-town/` until E3 and C4 pass, then the
whole fixture's universal records move to `data/` at once. Two reasons: C1 and C2 add observations to six AUDIT-9
records, so promoting now would split their ingest across `fixtures/` and `data/`; and `src/drift.ts` checks
`derived_from` only under `fixtures/*/records`, so a record promoted early would leave V6 until drift learns
`data/`. That change belongs to the promotion unit, not to this ingest. Ruled in DESIGN.md §6.

## Appendix: the 216 EQ-* source records to add

- EQ-ALCH: Histories of alchemical apparatus: Kircher's 1665 table of distillation (via the alchemy w
- EQ-HEAT-WIKI: Wikipedia: Bellows; Reverberatory furnace; Cupellation; Blowpipe (tool); Kiln; Burning gla
- EQ-HEAT-ATH: Athanor ('Slow Harry', Piger Henricus): Wikipedia and dictionary entries; Ercker 1574, Eng
- EQ-HEAT-ASSAY: Cupellation and assay furnaces: Agricola 1556 and Ercker 1574 via Royal College of Art 'Ch
- EQ-HEAT-BATH: Wikipedia: Bain-marie; Sand bath
- EQ-HEAT-DUNG: Source Library encyclopedia: Horse dung (as a heat source), venter equinus, fimus equinus
- EQ-HEAT-LIME: Historic England, Pre-industrial lime kilns; Wikipedia, Lime kiln
- EQ-HEAT-LENS: Francois Villette (Wikipedia); Tschirnhaus (MacTutor and the arXiv 'Discovery of European 
- EQ-VESS-WIKI: Wikipedia: Alembic; Retort; Crucible; Pot still; Mortar and pestle; Florence flask; Lute (
- EQ-VESS-GLASS: Wikipedia: Glass onion; Country Life, 'Why are wine bottles all the same shape and colour'
- EQ-VESS-RUM: Wikipedia: Rum; Barbados Today on West Indies Rum Distillery
- EQ-SEP-WIKI: Wikipedia: Filtration; Screw press; Sublimation (phase transition); Sugar plantations in t
- EQ-SEP-ALEMB: Wellcome Collection; Science Museum Group; alchemywebsite virtual museum (via web search o
- EQ-SEP-SUGAR: Richard Ligon, A True and Exact History of the Island of Barbados (1657, 2nd ed. 1673); Di
- EQ-SEP-FILT: Royal Society picture library (Papin, 1685); filter paper histories (paper-world.com; Ency
- EQ-SEP-COHOB: Wikipedia: Cohobation; World Wide Words; OneLook dictionary entries
- EQ-SEP-SALT: History of the Turks and Caicos Islands (Wikipedia); Turks and Caicos Museum; Warwick thes
- EQ-SEP-BREW: OED/wehd.com underback entry; Encyclopaedia Britannica 1778 and 1797 (jimclifford.ca); Bre
- EQ-MEAS-WIKI: Wikipedia: Thermometer; Barometer; Hourglass; Pendulum clock; Backstaff; Mariner's astrola
- EQ-MEAS-METTLER: Mettler-Toledo company histories (University of Toronto archive copy; company-histories.co
- EQ-MEAS-ASSAY: Agricola, De re metallica Book VII (Hoover translation, via e-rara and Utrecht); Wikipedia
- EQ-MEAS-GAUGE: Science Museum Group: Everard gauger's slide rule; Antiques Trade Gazette; Slide Rule Muse
- EQ-MEAS-BOYLE: Boyle, Experiments and Considerations Touching Colours (1664, Project Gutenberg 14504); Hu
- EQ-MEAS-PROOF: Wikipedia: Alcohol proof; Difford's Guide on navy strength; Chowhound; sub13.net
- EQ-OPT-MICRO: Wikipedia: Microscope
- EQ-OPT-TELE: Wikipedia: Telescope
- EQ-OPT-BURN: Wikipedia: Burning glass
- EQ-OPT-PRISM: Wikipedia: Prism (optics)
- EQ-OPT-CAMOBS: Wikipedia: Camera obscura
- EQ-OPT-LANT: Wikipedia: Magic lantern
- EQ-PRES-PUMP: Wikipedia: Air pump
- EQ-PRES-PAPIN: Wikipedia: Denis Papin
- EQ-PRES-HEMI: Wikipedia: Magdeburg hemispheres
- EQ-PRES-BARO: Wikipedia: Barometer
- EQ-PRES-BOYLE: Wikipedia: Boyle's law
- EQ-PRES-BELL: Wikipedia: Diving bell
- EQ-ELEC-GEN: Wikipedia: Electrostatic generator
- EQ-METEO-HYGRO: Wikipedia: Hygrometer
- EQ-METEO-RAIN: Wikipedia: Rain gauge
- EQ-METEO-ANEMO: Wikipedia: Anemometer
- EQ-SURG-1: Tourniquets for the control of traumatic hemorrhage: a review of the literature (PMC); Acc
- EQ-SURG-2: RCP London on Hugh Chamberlen; JSTOR Daily on the concealed forceps; Nelson Museum, Secret
- EQ-SURG-3: The surgeon's chest page (rootsweb); Hektoen International on Woodall; piratesurgeon.com W
- EQ-SURG-4: allaboutvision on the invention of spectacles; Roderick Conway Morris on Venetian spectacl
- EQ-SURG-5: Museum of Healthcare on the pill machine; mohma.org pill tile; DEA Museum; Hong Kong Medic
- EQ-SURG-6: Royal College of Physicians of Edinburgh on uroscopy; Shakespeare Birthplace Trust, Method
- EQ-SURG-7: PMC, On the Mode Employed for the Cure of the Venereal Disease; Wellcome Collection, fumig
- EQ-SURG-8: Wikipedia: Trepanning, Bloodletting, Enema
- EQ-SURG-9: Science History Institute, Medicinal leeches and where to find them; Medievalists.net on l
- EQ-MET-1: Wikipedia: Blast furnace
- EQ-MET-2: Wikipedia: Bloomery
- EQ-MET-3: HMS (Historical Metallurgy Society) and Don Wagner: smelting and fining pages (web search 
- EQ-MET-4: Wikipedia: Trip hammer
- EQ-MET-5: Wikipedia: Slitting mill; John Spilman; Godfrey Box
- EQ-MET-6: Wikipedia: Wire drawing
- EQ-MET-7: Wikipedia: Milled coinage; Screw press
- EQ-MET-8: Science Museum Group, Jan Verbruggen (Wikipedia, Grace's Guide, ERIH)
- EQ-MET-9: Wikipedia: Cannon
- EQ-MET-10: Wikipedia: Anvil
- EQ-MET-11: Wikipedia: Glass cone
- EQ-MET-12: Historic England (Oare Gunpowder Works), Mills Archive, St Martha Parish history
- EQ-MET-13: Wikipedia: Gunpowder mill
- EQ-MET-14: Wikipedia: Ropewalk; History Hit on the Chatham Ropery; Good Old Boat
- EQ-MET-15: Encyclopaedia Britannica 3rd ed. 1797 (tanning), Bampton and other tannery pages
- EQ-MET-16: South African History Online (Pinetown vats), SC Parks Otranto vats, Reza Vis on the two-v
- EQ-MET-17: Wikipedia: Loom
- EQ-MET-18: Wikipedia: Cooper (profession)
- EQ-CHEM18-1: Wikipedia: Pneumatic trough
- EQ-CHEM18-2: Wikipedia: Eudiometer
- EQ-CHEM18-3: Wikipedia: Gasometer
- EQ-CHEM18-4: Wikipedia: Calorimeter
- EQ-CHEM18-5: Web search: Woulfe bottle (Chemistry World, Oxford HSM, Faraday 1827 via wehd.com)
- EQ-CHEM18-6: Wikipedia: Celsius
- EQ-CHEM18-7: Wikipedia: Leyden jar
- EQ-CHEM18-8: Wikipedia: Electrostatic generator; web search on Ramsden's machine (Banks journal, PATSTE
- EQ-CHEM18-9: Wikipedia: Voltaic pile
- EQ-CHEM18-10: Wikipedia: Blowpipe (tool)
- EQ-CHEM18-11: Wikipedia: Joseph Black
- EQ-CHEM18-12: Wikipedia: Stephen Hales
- EQ-CHEM18-13: Wikipedia: Newcomen atmospheric engine
- EQ-CHEM18-14: Wikipedia: Watt steam engine
- EQ-CHEM18-15: Wikipedia: Argand lamp
- EQ-CHEM18-16: Wikipedia: Burette; web search on Descroizilles (Chemistry World, Museo Galileo)
- EQ-CHEM18-17: Wikipedia: Baume scale
- EQ-CHEM18-18: Wikipedia: Analytical balance; web search (Whipple Museum, Science Museum Group, Encyclope
- EQ-CHEM18-19: Web search: glass retorts, alembics and pelican (Britannica 1778-1810 via jimclifford.ca; 
- EQ-CHEM19-1: Wikipedia, Liebig condenser
- EQ-CHEM19-2: Wikipedia, Kipp's apparatus
- EQ-CHEM19-3: Wikipedia, Bunsen burner
- EQ-CHEM19-4: Wikipedia, Kjeldahl method
- EQ-CHEM19-5: Wikipedia, Soxhlet extractor
- EQ-CHEM19-6: Wikipedia, Erlenmeyer flask
- EQ-CHEM19-7: Wikipedia, Buchner funnel
- EQ-CHEM19-8: Wikipedia, Davy lamp
- EQ-CHEM19-9: Wikipedia, Daniell cell
- EQ-CHEM19-10: Wikipedia, Grove cell
- EQ-CHEM19-11: Wikipedia, Dynamo
- EQ-CHEM19-12: Wikipedia, Desiccator
- EQ-CHEM19-13: Wikipedia, Polarimeter
- EQ-CHEM19-14: Wikipedia, Calorimeter
- EQ-CHEM19-15: Wikipedia, Hofmann voltameter
- EQ-CHEM19-16: Wikipedia, Beckmann thermometer
- EQ-CHEM19-17: Wikipedia, Platinum
- EQ-CHEM19-18: Wikipedia, Filter paper
- EQ-CHEM19-19: Wikipedia, Analytical balance
- EQ-CHEM19-20: Wikipedia, Test tube
- EQ-IND19MED-BESS: Wikipedia, Bessemer process
- EQ-IND19MED-OH: Wikipedia, Open-hearth furnace
- EQ-IND19MED-CRUC: Wikipedia, Crucible steel
- EQ-IND19MED-EAF: Wikipedia, Electric arc furnace
- EQ-IND19MED-HH: Wikipedia, Hall-Heroult process
- EQ-IND19MED-SOLV: Wikipedia, Solvay process
- EQ-IND19MED-LEB: Wikipedia, Leblanc process
- EQ-IND19MED-COFF: Wikipedia, Coffey still
- EQ-IND19MED-REFR: Wikipedia, Refrigeration
- EQ-IND19MED-VAC: Wikipedia, Vacuum flask
- EQ-IND19MED-AUTO: Wikipedia, Autoclave
- EQ-IND19MED-PAST: Wikipedia, Pasteurization
- EQ-IND19MED-MICT: Wikipedia, Microtome
- EQ-IND19MED-ACHR: Wikipedia, Achromatic lens
- EQ-IND19MED-PETR: Wikipedia, Petri dish
- EQ-IND19MED-INCU: Wikipedia, Incubator (culture)
- EQ-IND19MED-CENT: Wikipedia, Centrifuge
- EQ-IND19MED-SPHY: Wikipedia, Sphygmomanometer
- EQ-IND19MED-THER: Wikipedia, Medical thermometer
- EQ-IND19MED-STET: Wikipedia, Stethoscope
- EQ-IND19MED-HYPO: Wikipedia, Hypodermic needle
- EQ-IND19MED-INHA: Wikipedia, Inhaler
- EQ-IND19MED-ANTI: Wikipedia, Antiseptic
- EQ-IND19MED-CROO: Wikipedia, Crookes tube
- EQ-AN20-PHM: Wikipedia, pH meter
- EQ-AN20-MS: Wikipedia, Mass spectrometry
- EQ-AN20-GC: Wikipedia, Gas chromatography
- EQ-AN20-NMR: Wikipedia, NMR spectroscopy
- EQ-AN20-UVV: Wikipedia, UV-vis spectroscopy; DU spectrophotometer; The Scientist
- EQ-AN20-IR: Wikipedia, Infrared spectroscopy
- EQ-AN20-XRD: Wikipedia, X-ray crystallography
- EQ-AN20-EM: Wikipedia, Electron microscope
- EQ-AN20-GM: Wikipedia, Geiger-Muller tube
- EQ-AN20-CLOUD: Wikipedia, Cloud chamber
- EQ-AN20-OSC: Wikipedia, Oscilloscope
- EQ-AN20-HPLC: Wikipedia, HPLC
- EQ-AN20-AAS: Wikipedia, Atomic absorption spectroscopy
- EQ-AN20-ELEC: Wikipedia, Electrophoresis
- EQ-AN20-UCEN: Wikipedia, Ultracentrifuge
- EQ-AN20-LASER: Wikipedia, Laser
- EQ-AN20-HOOD: Wikipedia, Fume hood
- EQ-AN20-GLOVE: Wikipedia, Glovebox
- EQ-AN20-SCHL: Wikipedia, Schlenk line
- EQ-AN20-ROTA: Wikipedia, Rotary evaporator
- EQ-AN20-STIR: Wikipedia, Magnetic stirrer
- EQ-AN20-MUFF: Wikipedia, Muffle furnace
- EQ-AN20-VAC: Wikipedia, Vacuum pump
- EQ-AN20-DIFF: Wikipedia, Diffusion pump
- EQ-AN20-GAEDE: Web search (epicsysinc.com, industrial-production.de, leybold.com founders page)
- EQ-BM20-PCR: Wikipedia, Polymerase chain reaction; web search (the-scientist.com Mr. Cycle, newlifescie
- EQ-BM20-SEQ: Wikipedia, DNA sequencer; web search (the-scientist.com, historyofinformation.com, philant
- EQ-BM20-LAM: Wikipedia, Laminar flow cabinet; web search (Sandia newsreleases, chiphistory.org)
- EQ-BM20-INC: Web search (Thermo Fisher Forma Series II pages)
- EQ-BM20-FCM: Wikipedia, Flow cytometry
- EQ-BM20-PLT: Wikipedia, Plate reader; web search (ddw-online.com, labmanager.com, newlifescientific.com
- EQ-BM20-MRI: Web search (Smithsonian Magazine The Indomitable MRI, SUNY RF, humanprogress.org)
- EQ-BM20-CT: Web search (ETHW IEEE Milestone, Smithsonian Magazine, IEEE Spectrum)
- EQ-BM20-US: Web search (Canadian Encyclopedia, SDMS transducer article, Dastur and Tank on Ian Donald)
- EQ-BM20-ECG: Web search (nationalmaglab.org, Besterman WIMJ, IEEE Spectrum, Hektoen)
- EQ-BM20-DEF: Web search (Besterman WIMJ story of cardiac defibrillation, encyclopedia.com, engineering.
- EQ-BM20-VENT: Wikipedia, Iron lung and Ventilator; web search (litfl.com Drinker, brewminate.com)
- EQ-BM20-DIAL: Web search (Fresenius, Lasker Foundation, OUP blog, ICAOT, ISHD, DaVita)
- EQ-BM20-BGA: Web search (acutecaretesting.org, AACC/ADLM Severinghaus bio, Wood Library Museum)
- EQ-BM20-OXI: Web search (PMC Ninety years of pulse oximetry, nippon.com, APSF)
- EQ-BM20-GLU: Wikipedia, Glucose meter and Ames Reflectance Meter
- EQ-BM20-FERM: Web search (The Chemical Engineer on Pfizer, Pfizer history)
- EQ-BM20-FLASK: Web search (Smithsonian Carrel flask, embryo.asu.edu Carrel, Corning)
- EQ-BM20-CRYO: Web search (embryo.asu.edu Polge, PMC2781087, UW Mechanical Engineering)
- EQ-BM20-BSC: Web search (Lab Manager Evolution of biological safety cabinets, PMC358192, NuAire, Utah I
- EQ-BM20-FLM: Web search (Leica Microsystems milestones in incident light fluorescence microscopy, RMS P
- EQ-PF-COKE: Web search (Grace's Guide Coalbrookdale Co / Abraham Darby; English Heritage Ironbridge; E
- EQ-PF-MATCH: Web search (Stockton heritage, phillumeny.com, Sigmalive on John Walker; Wikipedia Match)
- EQ-PF-MILL: Web search (Britannica waterwheel engineering; arXiv 2104.08981 History of Prime Movers; M
- EQ-PF-PLANTE: Web search (National MagLab Plante battery 1859; ETHW Gaston Plante; Wikipedia Lead-acid b
- EQ-PF-GAS: Web search (National Gas Museum; The Chemical Engineer Old King Coal part 2; Grace's Guide
- EQ-PF-ENG: Web search (Deutz company history; Britannica Rudolf Diesel; engineering.com)
- EQ-PF-FIREPISTON: Web search (Wikipedia Fire piston; Fox 1969 paper; Univ. Bristol fire piston page; Britann
- EQ-PF-FUEL: Web search (FAO Comparison of energy values; POPS toolkit Annex 28; Univ. Melbourne and SA
- EQ-PF-SOLAR: Web search (Wikipedia Solar desalination; UPC 2015 thesis on Chilean plants)
- EQ-PF-PEARL: Web search (ETHW Pearl Street Station 1882 milestone; Edison Illuminating Company)
- EQ-PF-LPG: Web search (Wikipedia Walter O. Snelling; Cenex history of propane)
- EQ-PF-TINDER: Web search (Future Museum tinderbox; Science Museum Group; Wikipedia Tinderbox)
- EQ-SF-CROSS: Wikipedia Cross-staff
- EQ-SF-OCT: Wikipedia Octant
- EQ-SF-SEX: Wikipedia Sextant
- EQ-SF-CHRON: Wikipedia Marine chronometer
- EQ-SF-COMP: Wikipedia Compass
- EQ-SF-TRAV: Wikipedia Traverse board
- EQ-SF-PORT: Wikipedia Portolan chart
- EQ-SF-GUNT: Wikipedia Gunter's chain
- EQ-SF-THEO: Wikipedia Theodolite
- EQ-SF-HERB: Wikipedia Herbarium
- EQ-SF-SLOANE: Web search (Natural History Museum Sloane Herbarium, data portal)
- EQ-SF-PET: Web search (Wikipedia James Petiver; Trinity Hall news; biostor 189012)
- EQ-SF-ASSAY: Web search (Ercker, Wikipedia; RCA charcoal assay furnace project) and Wikipedia Blowpipe 
- EQ-SF-BARO: Wikipedia Barometer
- EQ-SF-SOUND: Wikipedia Sounding line and Royal Society picture library (Hooke's device)
- EQ-SF-LANT: Wikipedia Lantern
- EQ-SF-CANDLE: Wikipedia Candle clock
- EQ-SF-LEVEL: Wikipedia Spirit level
- EQ-SF-GLOBE: Wikipedia Globe
- EQ-LEM-TEXT: Lemery, Cours de chymie (sourcelibrary.org OCR of the English translation)
- EQ-LEM-WIKI: Wikipedia Nicolas Lemery
- EQ-LEM-BAIN: Wikipedia Bain-marie
- EQ-LEM-MUFF: Wikipedia Muffle furnace
- EQ-LEM-REVERB: Wikipedia Reverberatory furnace
- EQ-LEM-SIEVE: Wikipedia Sieve
- EQ-LEM-FILT: Wikipedia Filtration
- EQ-LEM-FPAPER: Wikipedia Filter paper
- EQ-MET-19: Searched 2026-10-29, nothing covers 1650-1730: (1) gunsmith tools 17th c. with Moxon, Mech
