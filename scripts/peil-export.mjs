#!/usr/bin/env node
// Maakt public/manifest/peil-zoek.json uit het privé-register van Peil.
// Gebruik: node scripts/peil-export.mjs /pad/naar/register.json
// Alleen parameters met status "vastgesteld", met een vaste lijst openbare velden.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { trefwoordenVoor } from "./peil-trefwoorden.mjs";

const bron = process.argv[2];
if (!bron) {
  console.error("Gebruik: node scripts/peil-export.mjs /pad/naar/register.json [/pad/naar/tools.json]");
  process.exit(1);
}
const register = JSON.parse(readFileSync(bron, "utf8"));
const toolsBron = process.argv[3] ?? join(dirname(bron), "tools.json");
const toolsBestand = JSON.parse(readFileSync(toolsBron, "utf8"));
// Koppelregel (repo-namen case-insensitief): een tool hoort bij een parameter als (a) minstens één gebruikt_in-regel
// van die repo afwijkend:false heeft met waarde_in_tool niet "niet doorgerekend", (b) dezelfde repo bij die parameter
// geen regel met afwijkend:true heeft en (c) de tool in tools.json een openbaar-veld met naam en url heeft.
// Alleen naam en url gaan mee naar buiten, nooit repo, locatie of waarde_in_tool.
const openbaarPerRepo = new Map();
for (const t of toolsBestand.tools ?? []) {
  if (t.repo && t.openbaar?.naam && t.openbaar?.url) openbaarPerRepo.set(String(t.repo).toLowerCase(), { naam: t.openbaar.naam, url: t.openbaar.url });
}
function toolsVoor(p) {
  const regels = (p.gebruikt_in ?? []).map((g) => ({ ...g, repo: String(g.repo ?? "").toLowerCase() }));
  const gevonden = new Map();
  for (const repo of new Set(regels.map((g) => g.repo))) {
    const openbaar = openbaarPerRepo.get(repo);
    if (!openbaar) continue;
    const eigen = regels.filter((g) => g.repo === repo);
    if (eigen.some((g) => g.afwijkend === true)) continue;
    if (!eigen.some((g) => g.afwijkend === false && !/niet doorgerekend/i.test(String(g.waarde_in_tool ?? "")))) continue;
    gevonden.set(openbaar.naam + "|" + openbaar.url, openbaar);
  }
  return [...gevonden.values()].sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
}
const stand = register.meta?.peildatum ?? register.meta?.versiedatum;

// Tijdelijk niet openbaar tot de lopende keuring klaar is (naam misleidend zonder toelichting).
// Leeg: na de keuring van 19-10-2026 staan twijfelgevallen in Peil zelf op te_verifieren.
const TIJDELIJK_UIT = new Set([]);

// Indeling in categorieën: ÉÉN plek, op het begin van de id (p.<land>.<onderwerp>).
const CATEGORIEEN = {
  "Inkomstenbelasting": ["p.fr.ir", "p.fr.ps", "p.fr.csg", "p.fr.micro", "p.nl.ib", "p.nl.box2", "p.nl.box3", "p.xb.verdrag", "p.xb.deruyter"],
  "Erven en schenken": ["p.fr.succ", "p.fr.don", "p.fr.erf", "p.fr.av", "p.nl.erf", "p.nl.schenk"],
  "Vastgoed en wonen": ["p.fr.dmto", "p.fr.notaris", "p.fr.pv", "p.fr.ifi", "p.fr.tf", "p.fr.th", "p.fr.huur", "p.fr.vefa", "p.fr.bouw", "p.fr.diagnostics", "p.fr.gite", "p.fr.lmp", "p.fr.assur", "p.nl.ovb"],
  "Zorg, sociaal en administratie": ["p.fr.secu", "p.fr.apa", "p.fr.aspa", "p.fr.retraite", "p.fr.csi", "p.nl.aow", "p.nl.zorg", "p.nl.zorgtoeslag", "p.nl.zvw", "p.nl.wlz", "p.nl.leges", "p.xb.cak", "p.xb.ehic"],
  "Ondernemen": ["p.fr.acre", "p.fr.cfe", "p.fr.cvae", "p.fr.tva", "p.fr.urssaf", "p.fr.sociaal", "p.fr.efact", "p.fr.handel", "p.nl.btw"],
  "Energie en verbouwen": ["p.fr.elec", "p.fr.dpe", "p.fr.renov", "p.fr.telecom", "p.fr.markt"],
};
function categorieVoor(id) {
  const onderwerp = String(id).split(".").slice(0, 3).join(".");
  for (const [naam, lijst] of Object.entries(CATEGORIEEN)) if (lijst.includes(onderwerp)) return naam;
  console.error(`FOUT: id "${id}" valt in geen categorie. Voeg "${onderwerp}" toe aan CATEGORIEEN in scripts/peil-export.mjs.`);
  process.exit(1);
}

const parameters = register.parameters
  .filter((p) => p.status === "vastgesteld" && !TIJDELIJK_UIT.has(p.id))
  .map((p) => {
    const u = {
      id: p.id,
      naam: p.naam_nl,
      ...(p.naam_fr ? { naam_fr: p.naam_fr } : {}),
      waarde_weergave: p.waarde_weergave,
      eenheid: p.eenheid ?? null,
      geldig_jaar: p.geldig_jaar ?? null,
      geldig_van: p.geldig_van ?? null,
      geldig_tot: p.geldig_tot ?? null,
      land: p.land,
      bron_url: p.bron_url ?? null,
      bron_kenmerk: p.bron_kenmerk ?? null,
      verificatiedatum: p.verificatiedatum ?? null,
      trefwoorden: trefwoordenVoor(p.id),
      categorie: categorieVoor(p.id),
      tools: toolsVoor(p),
    };
    return u;
  });

const metTools = parameters.filter((p) => p.tools.length);
const perTool = {};
for (const p of metTools) for (const t of p.tools) perTool[t.naam] = (perTool[t.naam] ?? 0) + 1;
console.log(`${metTools.length} van ${parameters.length} parameters hebben minstens één tool`, perTool);
const uit = { stand, aantal: parameters.length, parameters };
const doel = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "peil-zoek.json");
writeFileSync(doel, JSON.stringify(uit) + "\n");
console.log(`${parameters.length} parameters, stand ${stand}, geschreven naar ${doel}`);
