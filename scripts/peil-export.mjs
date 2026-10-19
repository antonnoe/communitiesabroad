#!/usr/bin/env node
// Maakt public/manifest/peil-zoek.json uit het privé-register van Peil.
// Gebruik: node scripts/peil-export.mjs /pad/naar/register.json
// Alleen parameters met status "vastgesteld", met een vaste lijst openbare velden.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const bron = process.argv[2];
if (!bron) {
  console.error("Gebruik: node scripts/peil-export.mjs /pad/naar/register.json");
  process.exit(1);
}
const register = JSON.parse(readFileSync(bron, "utf8"));
const stand = register.meta?.peildatum ?? register.meta?.versiedatum;

const parameters = register.parameters
  .filter((p) => p.status === "vastgesteld")
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
    };
    return u;
  });

const uit = { stand, aantal: parameters.length, parameters };
const doel = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "peil-zoek.json");
writeFileSync(doel, JSON.stringify(uit) + "\n");
console.log(`${parameters.length} parameters, stand ${stand}, geschreven naar ${doel}`);
