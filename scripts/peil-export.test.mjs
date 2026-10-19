// Controleert de gegenereerde public/manifest/peil-zoek.json op uitsluitend openbare velden.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pad = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "peil-zoek.json");
const tekst = readFileSync(pad, "utf8");
const data = JSON.parse(tekst);

const TOEGESTAAN = new Set([
  "id", "naam", "naam_fr", "waarde_weergave", "eenheid", "geldig_jaar", "geldig_van", "geldig_tot",
  "land", "bron_url", "bron_kenmerk", "verificatiedatum", "trefwoorden", "categorie", "tools",
]);

test("geen sleutels buiten de vaste lijst openbare velden", () => {
  assert.ok(data.parameters.length > 0);
  for (const p of data.parameters) {
    for (const k of Object.keys(p)) assert.ok(TOEGESTAAN.has(k), `${p.id}: onverwachte sleutel ${k}`);
    assert.ok(Array.isArray(p.tools), `${p.id}: tools ontbreekt`);
  }
});

test("elk tools-item heeft alleen naam en url (https)", () => {
  for (const p of data.parameters) {
    for (const t of p.tools) {
      assert.deepEqual(Object.keys(t).sort(), ["naam", "url"], p.id);
      assert.ok(t.naam && /^https:\/\//.test(t.url), `${p.id}: ${JSON.stringify(t)}`);
    }
  }
});

test("geen interne woorden in de uitvoer", () => {
  assert.ok(!/afwijk/i.test(tekst));
  assert.ok(!/gebruikt_in/i.test(tekst));
});
