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
  console.error("Gebruik: node scripts/peil-export.mjs /pad/naar/register.json");
  process.exit(1);
}
const register = JSON.parse(readFileSync(bron, "utf8"));
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
    };
    return u;
  });

const uit = { stand, aantal: parameters.length, parameters };
const doel = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "peil-zoek.json");
writeFileSync(doel, JSON.stringify(uit) + "\n");
console.log(`${parameters.length} parameters, stand ${stand}, geschreven naar ${doel}`);
