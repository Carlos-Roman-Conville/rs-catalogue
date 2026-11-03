# M1a sourcing sheet: cereals and the bread, England 1270 (Catalogue PLAN §8 stage B step 1, parts (a)-(c))

Written 2026-11-03. Sheet only: no record, no code. NATIVE-PLAN rulings (a)-(i) apply. A value is here only if the
work was opened in this session. "Opened" means read through WebFetch (which returns an extraction answering a
question, not the whole page) or, for the BCKOvL paper, through the PDF text extracted from the file WebFetch saved
outside the repo; each row says how much. A work cited by another work is `researched`/low and says so (ruling a). Two
sources that disagree are two rows, never averaged. Place is `region.england`; where a source names a narrower place the
row says so in the reason. Labels: researched / estimate / open. `estimate` is not used: no row here is a guess.
Maslin and dredge are notes on rows, not records. `CAT-` keys other than CAT-BCKOVL-2010 (already in SHEET-2) are
proposals for the B2 records unit to turn into `data/source/` records; each is named once in the row that first uses it
(CAT-SIMS-1995, CAT-ASSIZE-BREAD, CAT-DYER-1988, CAT-DYER-2023, CAT-ZIEGLER-FLOWER, CAT-USDA-FDC-*, CAT-COFID-2021).

## (a) Cereal presence, England, by 1270

Row type is `presence` attestation on the organism record named. "By 1270" is read as "attested at or before 1270";
nothing opened gives an earlier date (A9).

| id | organism | place | date as the source states it | label | confidence and reason | work | locator | url | opened |
|---|---|---|---|---|---|---|---|---|---|
| A1 | `organism.triticum-aestivum` (wheat) | region.england | 1270 (year; calendar not stated) | researched | medium: modern reconstruction (Medieval Accounts Database and Overton and Campbell, per the paper's text), secondary; sown area is printed, so wheat was grown | CAT-BCKOVL-2010 | Table 1 p. 35, Wheat, 1270 (the sown-area figure is not part of this row; the table is the locator) | https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf | text of pp. 5-6, 10, 35 and 59 read from the extracted PDF (97,503 characters, 71 pages; the rest searched by keyword only) |
| A2 | `organism.triticum-aestivum` | region.england | 1269-1270 (account year as Sims gives it; calendar not stated) | researched | low: Sims' thesis summarises the Beaulieu Abbey accounts; the accounts themselves were not opened (cited through, rule a). Narrower place: Beaulieu Abbey manors and granges, Faringdon manor among them. Sims p. 9: wheat "the most valuable crop produced" at Faringdon; p. 15 "Wheat is the most heavily produced crop" over the combined estates; p. 18 the home granges grew wheat and oats | CAT-SIMS-1995 | pp. 9, 15, 18 | https://d.lib.msu.edu/etd/29700/FULL_TEXT/download | thesis text through WebFetch extractions (two prompts; the tool does not report the length) |
| A3 | `organism.secale-cereale` (rye) | region.england | 1270 (year) | researched | medium: as A1. The table column is "Rye/Maslin", so the sown area does not separate pure rye from maslin (a mixture of wheat and rye, p. 6) | CAT-BCKOVL-2010 | Table 1 p. 35, Rye/Maslin, 1270 | same as A1 | as A1 |
| A4 | `organism.secale-cereale` | region.england | 1269-1270 | researched | low: as A2 (cited through). Sims p. 9: "Rye, drage and beans demonstrate similar patterns" at Faringdon (harvested in smaller amounts, mostly seed or sale); p. 13 rye at the Cornwall granges "almost all of which was fed to the workers"; p. 20 rye is in the familial bread (B3) | CAT-SIMS-1995 | pp. 9, 13, 20 | same as A2 | as A2 |
| A5 | `organism.hordeum-vulgare` (barley) | region.england | 1270 (year) | researched | medium: as A1. The column is "Barley/Dredge"; dredge is a mixture of barley and oats (p. 6), so the sown area does not separate them | CAT-BCKOVL-2010 | Table 1 p. 35, Barley/Dredge, 1270 | same as A1 | as A1 |
| A6 | `organism.hordeum-vulgare` | region.england | 1269-1270 | researched | low: as A2 (cited through). Sims p. 10: at Faringdon "barley was the only grain given to" the familia and barley with wheat was baked for the harvest and planting boons; p. 15 barley the third-largest crop on the combined estates | CAT-SIMS-1995 | pp. 10, 15 | same as A2 | as A2 |
| A7 | `organism.avena-sativa` (oats) | region.england | 1270 (year) | researched | medium: as A1 | CAT-BCKOVL-2010 | Table 1 p. 35, Oats, 1270; p. 10 "oats ... fell out of favour as a crop for human consumption" (after the thirteenth-century peak, in the paper's words) | same as A1 | as A1 |
| A8 | `organism.avena-sativa` | region.england | 1269-1270 | researched | low: as A2 (cited through). Sims p. 10: oats "in quantities second only [to] wheat" at Faringdon, low-yielding, much of it horse fodder; p. 11 and p. 18: Beaulieu's ale was made from wheat and oats; p. 20 oats gruel on the home granges. The thesis OCR prints "oats" as "cats"; the WebFetch extraction corrected it | CAT-SIMS-1995 | pp. 10, 11, 18, 20 | same as A2 | as A2 |
| A9 | all four cereals | region.england | open | open | low: nothing opened gives a first attestation earlier than the 1269-70 accounts and the 1270 table. Searched: BCKOvL text (keyword hits on wheat, rye, barley, oats), Sims thesis. Not searched: Domesday and earlier surveys, archaeobotanical reports | none | none | none | no |

Notes on maslin and dredge. BCKOvL p. 6: "rye and maslin (a mixture of wheat and rye)", "barley and dredge (a mixture of
barley and oats)"; Table 1 prints the columns "Rye/Maslin" and "Barley/Dredge", so A3 and A5 each cover a pure grain and
its mixture together. Sims names the mixed sowings as "drage" (dredge) at Faringdon and the Cornwall granges in
1269-70 (pp. 9, 13, 42; Appendix B) and as "mancorn" (his gloss: maslin) at Bec manors in 1288-9 (pp. 46-48, Appendix D;
after the window, so no row). Bec's mixed grain is not evidence for 1270 and is not a row.

## (b) The M1a bread

Which bread sources attest as ordinary household bread in England around 1270. Result: **the sources opened do not
agree, and none describes a household baking its own bread.** The Assize regulates the baker's loaf; Beaulieu is an
abbey's bakehouse feeding its workers; Dyer's abstract names barley and rye for harvest workers; Ziegler's general
article names maslin for most people. The choice is the keeper's.

| id | source | grain or mixture named | household or class described | place and date | label | confidence and reason | locator | url | opened |
|---|---|---|---|---|---|---|---|---|---|
| B1 | CAT-ASSIZE-BREAD (Assize of Bread, translation on the Fordham Internet Medieval Sourcebook, from Statutes of the Realm vol. 1 pp. 199-200) | wheat: wastel is the reference loaf priced against a quarter of wheat; "Bread made of the whole Wheat shall weigh a Cocket and a half"; "bread of common wheat shall weigh two great cockets"; cocket "made of grain of lower price" (grain not named); "Bread of Treet shall weigh 2 wastels" (grain not named) | no household or class is named: the regulated party is the baker | England; the page prints no regnal year (it says forms were issued from Henry II to Edward II). 1266 (51 Henry III) is the date other pages give; Wikipedia shows 1266 only as a category label | researched | medium: a statute text via an anthology page, secondary translation; says what bakers must sell, not what households ate | page text, "Assisa Panis" section | https://sourcebooks.web.fordham.edu/source/breadbeer.asp | page text through WebFetch (length not reported by the tool; estimated about 8,000-10,000 characters) |
| B2 | CAT-SIMS-1995, Beaulieu Abbey, Faringdon manor | barley only: "barley was the only grain given to" the familia; barley and wheat baked for boons | the manor's familia (hired workers) and boon workers | Faringdon manor accounts, 1269-1270 | researched | low: as A2, cited through; wages in grain, not a statement that barley bread was household bread | p. 10 | https://d.lib.msu.edu/etd/29700/FULL_TEXT/download | as A2 |
| B3 | CAT-SIMS-1995, Beaulieu Abbey, six home granges | "familial" bread: a mixture of wheat (374.25 quarters), rye (83.38), barley (166), beans (49.25), peas (98.75), vetches (240.88) and 67.25 quarters of bran, 1,079.75 quarters in all (Table 2); the top three grades (conventual, hospital, clermatin) "baked solely from wheat" | "The familia was given bread from the abbey's bakehouse" (p. 17): workers of an abbey, not a household | Beaulieu home granges, 1269-1270 | researched | low: as A2, cited through; the quantities are the thesis' tabulation of one account year | pp. 17, 20-22 | same | as A2 |
| B4 | CAT-DYER-1988 (Christopher Dyer, "Changes in Diet in the Late Middle Ages: the Case of Harvest Workers", Agricultural History Review 36:1, 1988) | barley and rye: "Barley and rye bread was replaced by wheat" over much of the fourteenth century | harvest workers fed in the autumn on manors; "In the thirteenth century harvest workers were given much bread and some cheese" | manors in eastern and southern England; thirteenth century (no year) | researched | low: Medievalists.net page reproducing the abstract; the article itself was not opened (cited through); the abstract does not say which bread was given in 1270 | abstract | https://www.medievalists.net/2010/10/changes-in-diet-in-the-late-middle-ages-the-case-of-harvest-workers/ | the page, through WebFetch (abstract only) |
| B5 | CAT-ZIEGLER-FLOWER (Vickie L. Ziegler, "The Flower of Wheat: Bread in the Middle Ages and Colonial Era", Penn State Medieval Technology and American History) | wheat for the nobility and institutional rations ("2-3 pounds of wheat bread" a person daily, late medieval English households); maslin (wheat and rye) for "the vast majority"; rye and whole-grain "black" bread for peasants; barley and oats "mostly used as animal fodder, so absent from bread production" | nobility, garrisons, hospitals; the majority; peasants | medieval Europe, with English households named; no date or place narrower than that | researched | low: an educational web article for Europe, not England 1270; the extraction gives no page citations for these statements | whole article | https://engr.psu.edu/MTAH/articles/flower_of_wheat.htm | the page, through WebFetch (length not reported by the tool) |
| B6 | CAT-DYER-2023 (Christopher Dyer, "A simple food with many meanings: bread in late medieval England", Journal of Medieval History, doi 10.1080/03044181.2023.2250947) | wheat: "Wheat bread held the top position ... even though other cereals and legumes were also baked" | not stated in the abstract | late medieval England (so after 1270 in the main) | open | low: abstract only, through a Medievalists.net roundup (a search result; that page was not fetched). The journal page returned HTTP 403. Not used for the window | abstract | https://doi.org/10.1080/03044181.2023.2250947 | no (403) |

BREAD-CHOICE: open B1 names only wheat bread as the baker's regulated loaf and says nothing of households; B2 gives barley as the only grain issued to the Faringdon familia in 1269-70, with barley and wheat for boon bread; B3 gives a mixed-grain "familial" bread (wheat, rye, barley, pulses, bran) from an abbey bakehouse for its workers, with the higher grades wheat only; B4 gives barley and rye bread for thirteenth-century harvest workers in eastern and southern England; B5 gives maslin for most people and wheat for the nobility, Europe-wide; no source opened settles one ordinary household bread for England in the 1270 window.

The keeper chooses. What the rows allow, without a choice: wheaten (B1, B3 higher grades), barley (B2, B4), mixed grain (B3, B5), and rye with barley (B4).

**Condition as a source describes it.** `open`. The Assize (B1) sets a loaf's weight by the price of wheat and does not
describe moisture, age or temperature; no opened source gives "loaf, day of baking" or any other state. Searched: the
Fordham text, Wikipedia's Assize page, the Penn State articles (B5 and the "All Bread Is Not Created Equal" article),
Sims. The Penn State article of Jessica Banks says low-quality bread "weighed the most" because of bran (that page,
as extracted, names no grain and no date), which bears on weight at sale, not on condition.

**Ingredients.**
- Grain or meal: as the BREAD-CHOICE line; B3 gives quantities of grains for one account year of one abbey's familial
  bread (above). No source opened gives a proportion for a household loaf.
- Salt: B1 lists salt among the baker's costs ("servants, lads, salt, kneading, candles, and wood", as the extraction
  reads it); no amount.
- Water: `open`. No opened source gives a water share for a medieval loaf (see (c) for modern reference rows only).
- Leaven or yeast: `open`. The Fordham text as extracted does not name leaven or barm. The Ziegler article speaks of
  "pure white leavened bread" for the white loaf (B5), nothing for other loaves.
- Bran: B3 adds bran to familial bread "probably as filler" (Sims p. 21, his reading); the clermatin grade lost about
  a third of its wheat to bran (p. 22).

**Preparation practice.**
- Baking: B1 regulates bakers, with a baker's allowance of 4d per quarter of wheat "as it is proved by the King's
  Bakers" (the page's text). The Assize text as extracted does not say where bread was baked and does not mention ovens
  or household baking.
- Who baked, where: B3 "the abbey's bakehouse" (Sims p. 17), the only baker named for the window, an institution.
  Wikipedia's Assize page says the act was "purportedly given at the request of the bakers of Coventry" and that baking
  required costly ovens (secondary, `low`; not the Assize text). Who baked household bread and where: `open`.
- Searched, nothing found: household or village baking in the thirteenth century (no opened source).

## (c) Composition sources Life can cite

No composition value below is a value for a record; Life owns the values (CAT-Q1, Rex). A water share for the stated
condition is quoted as reference only, as the source prints it.

| id | source | covers (bread, condition, water or dry matter if given) | item or table | url | opened |
|---|---|---|---|---|---|
| C1 | CAT-USDA-FDC-172686, USDA FoodData Central, SR Legacy, "Bread, wheat" (Baked Products) | modern commercial wheat bread, as sold; water 35.25 g per 100 g (reference only); nearest modern equivalent of the wheaten loaf (B1) | FDC ID 172686 | https://api.nal.usda.gov/fdc/v1/food/172686 (read with the public DEMO_KEY); the human page is https://fdc.nal.usda.gov/ | the item's Water nutrient, through WebFetch; other nutrients not read |
| C2 | CAT-USDA-FDC-172688, SR Legacy, "Bread, whole-wheat, commercially prepared" | modern whole-wheat loaf, as sold; water 39.01 g per 100 g (reference only); nearest to a wheat bread with its bran (B1 "whole wheat" loaf, B3) | FDC ID 172688 | https://api.nal.usda.gov/fdc/v1/food/172688 | as C1 |
| C3 | CAT-USDA-FDC-172684, SR Legacy, "Bread, rye" | modern rye bread, as sold; water 37.3 g per 100 g (reference only); nearest to B4's rye bread, and, by the extra wheat, to maslin; the search listing also printed "Bread, rye, toasted" 172685 (31.0 g) and "Rye grain" 168884 (10.6 g, the grain, not bread) | FDC ID 172684 | https://api.nal.usda.gov/fdc/v1/foods/search?query=bread%20rye&dataType=SR%20Legacy | the first 4 of 192 hits, from the first 100,000 of 122,017 characters of the search result |
| C4 | USDA FoodData Central, barley bread or maslin | none found: the rye search above gave no barley bread or maslin item; no search was made for barley bread itself | none | none | no |
| C5 | CAT-COFID-2021, *McCance and Widdowson's The Composition of Foods Integrated Dataset* (CoFID), UK government, 2021 update (first published 25 March 2015; last updated 19 March 2021) | the UK composition tables, including breads, by food code | the dataset spreadsheet "McCance_Widdowsons_Composition_of_Foods_Integrated_Dataset_2021..xlsx" and user guide PDF, both listed on the page | https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid | the gov.uk publication page only (title, dates, file names, "Open Government Licence v3.0, except where otherwise stated"); the spreadsheet and guide were not opened, so no bread item number or water share is given: `open` |
| C6 | McCance and Widdowson's *The Composition of Foods*, seventh summary edition (Royal Society of Chemistry, 2015, per a library catalogue and a search result) | the printed tables, including the bread group | not read | not opened: needs purchase (for the keeper to ask Rex) | no |
| C7 | CAT-BCKOVL-2010, Table 23 notes | not a bread composition: the notes give kilocalories per bushel for the medieval period "taken from Campbell et al. (1993: 41)" (cited through), storage losses of 10 per cent, and conversion losses "when processed into bread" of 20 per cent for wheat and rye, 22 per cent for barley and 44 per cent for oats. Reference only; not a composition value for a record | Table 23 and its "Sources and notes", p. 59 | https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf | the extracted text of the notes |
| C8 | any study of medieval grain or bread composition | none found | none | none | searched, not found |

## Sources searched

Each search is one WebSearch unless stated; "snippet" means the search result text, not an opened page.

- BCKOvL working paper (CAT-BCKOVL-2010), https://wrap.warwick.ac.uk/id/eprint/57581/1/WRAP_35.2010_broadberry.pdf:
  WebFetch could not read the PDF streams; the file it saved was text-extracted locally (pypdf: 71 pages, 97,503
  characters). Read: pp. 5-6 (arable and the maslin/dredge definitions), p. 10, p. 35 (Table 1), p. 59 (Table 23 notes);
  the remaining pages were searched by keyword (maslin, dredge, bread) only.
- Sims, *Grain Production and Expenditure on Medieval English Estates* (MA thesis, Michigan State University, 1995),
  https://d.lib.msu.edu/etd/29700/FULL_TEXT/download: two WebFetch extractions of the full text (Beaulieu 1269-70, Bec
  1288-9, other estates). The tool did not report the length; the first extraction put it at about 15,000 words. Page
  numbers are those of the extraction's page markers and may be off by one. The accounts Sims uses were not opened.
- Fordham, "Assize of Bread and Ale", https://sourcebooks.web.fordham.edu/source/breadbeer.asp: whole page through
  WebFetch (B1). No year on the page.
- Wikipedia, *Assize of Bread and Ale*, https://en.wikipedia.org/wiki/Assize_of_Bread_and_Ale: whole page through
  WebFetch; no date in the body, "1266" only in a category; used for the Coventry and oven sentences (B1 note).
- Ross, 1956 article on the Assize, https://www.jefftk.com/ross1956.pdf: fetched, but the file is a scanned image
  (CCITT) that WebFetch could not read and no OCR tool is installed. Not opened. A later session with OCR should read it
  for the grain of treet and cocket.
- Penn State, Banks, "All Bread Is Not Created Equal", https://www.engr.psu.edu/mtah/articles/all_bread_not_equal.htm:
  whole page through WebFetch; names Wastel, Simnel, Cocket and Treet; no grain, no class, no thirteenth century.
- Penn State, Ziegler, "The Flower of Wheat", https://engr.psu.edu/MTAH/articles/flower_of_wheat.htm: whole page through
  WebFetch (B5).
- Medievalists.net, Dyer 1988 abstract (B4): whole page through WebFetch. Dyer 1988 itself: not opened.
- Dyer 2023, https://www.tandfonline.com/doi/full/10.1080/03044181.2023.2250947: HTTP 403, not opened. Abstract known
  only from a search-result summary of a Medievalists.net roundup (https://www.medievalists.net/2023/10/medieval-studies-articles-september-2023/,
  not fetched).
- OUP, *Food in Medieval England: Diet and Nutrition*, chapter "The Consumption of Field Crops in Late Medieval
  England", https://academic.oup.com/book/47620/chapter/422427248: fetched; only the title and menus came back (first
  100,000 of 169,594 characters, no body text). Not opened. Needs a subscription.
- USDA FoodData Central: three API reads (items 172686, 172688; search for "bread rye" in SR Legacy, 4 of 192 hits seen)
  with the public DEMO_KEY. Nothing downloaded or saved. A search for FDC 172686/172687 water through WebSearch found
  mirror sites only (not used).
- gov.uk CoFID publication page (C5): whole page through WebFetch. Spreadsheet and user guide not opened.
- WebSearch, "McCance and Widdowson Composition of Foods bread ... water": catalogue records and non-UK tables
  (Philippine, Malaysian) only; none used.
- WebSearch, "thirteenth century England peasant bread maslin barley rye wheat household bread Dyer": snippets from
  Lovefood, Oakden, Cooks Info, the UVic medieval breadmaking project and Medievalists.net; the popular pages were not
  opened and no row rests on them (they say maslin was for servants, labourers and poorer families, and Cooks Info
  doubts the poor ate maslin or rye at all).
- WebSearch, "famuli liveries maslin wheat barley ... Cuxham OR Winchester": nothing on Cuxham or Winchester
  liveries. An LSE paper on the composition of famuli labour c.1300 (https://researchonline.lse.ac.uk/id/eprint/101316)
  and Postan's pamphlet on the famuli were seen as snippets, not opened. Not searched: Harvey's Cuxham, the Winchester
  pipe rolls, Titow.
- WebSearch, "Walter of Henley Husbandry ... wheat rye barley oats dredge": the Lamond edition (BHL and archive.org
  copies) and Oschinsky were seen; no text opened. A later session should read the Lamond text for the grains Walter
  names and for household baking.
- WebSearch, "medieval English bread nutritional composition study ...": no study of medieval bread composition found
  (C8); snippets only from an OUP chapter title, a Penn State outline, the Sims thesis and Penn State articles.
- WebSearch, Middle English Dictionary entry MED8337 (cited in a search result for the 1266 statute, Statutes of the
  Realm vol. 1 p. 199): not opened.
- Not searched: Campbell, Galloway, Keene and Murphy, *A Medieval Capital and Its Grain Supply* (1993; cited through
  BCKOvL for kilocalories per bushel); Bennett on brewing and baking; Davis, *Medieval Market Morality*; the Statutes of
  the Realm volume itself; archaeobotanical reports of bread remains.
