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

// ---- Toolkaarten: public/manifest/tools ----
import { readdirSync, existsSync } from "node:fs";

const toolsMap = join(dirname(pad), "tools");
const index = JSON.parse(readFileSync(join(toolsMap, "index.json"), "utf8"));
const kaarten = index.tools.map((t) => ({ t, k: JSON.parse(readFileSync(join(toolsMap, `${t.slug}.json`), "utf8")) }));
const kaartTekst = [...readdirSync(toolsMap)].map((f) => readFileSync(join(toolsMap, f), "utf8")).join("\n");

const KAART_SLEUTELS = ["slug", "naam", "url", "omschrijving", "stand", "aantal_bedragen", "laatste_controle", "volgende_controle", "bedragen", "rekenstappen"].sort();
const BEDRAG_SLEUTELS = new Set(["id", "naam", "naam_fr", "waarde_weergave", "eenheid", "land", "bron_url", "bron_kenmerk", "instantie", "verificatiedatum"]);
const STAP_SLEUTELS = ["id", "naam_nl", "omschrijving", "volgorde", "bron_kenmerk", "status", "gebruikte_bedragen"];
// Alleen bij een stap die nog in controle is komen er een toelichting en een bron bij.
const STAP_SLEUTELS_IN_CONTROLE = new Set([...STAP_SLEUTELS, "toelichting", "bron_url"]);

test("toolkaarten: alleen de vaste openbare velden", () => {
  assert.ok(kaarten.length > 0);
  for (const { k } of kaarten) {
    assert.deepEqual(Object.keys(k).sort(), KAART_SLEUTELS, k.slug);
    for (const b of k.bedragen) for (const key of Object.keys(b)) assert.ok(BEDRAG_SLEUTELS.has(key), `${k.slug}: ${key}`);
    for (const s of k.rekenstappen) {
      assert.ok(["gecontroleerd", "nog in controle"].includes(s.status));
      for (const key of STAP_SLEUTELS) assert.ok(key in s, `${k.slug}: ${s.id} mist ${key}`);
      if (s.status === "gecontroleerd") assert.deepEqual(Object.keys(s).sort(), [...STAP_SLEUTELS].sort(), `${k.slug}: ${s.id}`);
      else for (const key of Object.keys(s)) assert.ok(STAP_SLEUTELS_IN_CONTROLE.has(key), `${k.slug}: ${s.id}: ${key}`);
      if ("toelichting" in s) {
        assert.equal(typeof s.toelichting, "string");
        assert.ok(s.toelichting.length > 0);
        assert.ok(s.bron_url === null || /^https:\/\//.test(s.bron_url), `${k.slug}: ${s.id} bron_url`);
      }
      const ids = new Set(k.bedragen.map((b) => b.id));
      for (const id of s.gebruikte_bedragen) assert.ok(ids.has(id), `${k.slug}: ${s.id} verwijst naar onbekend bedrag ${id}`);
    }
    assert.equal(k.aantal_bedragen, k.bedragen.length);
    assert.ok(/^https:\/\//.test(k.url));
  }
});

test("toolkaarten: geen interne velden en geen repo-namen", () => {
  assert.ok(!/"(afwijkend|gebruikt_in|waarde_in_tool|opmerkingen_intern|verificatie_door|locatie|repo)"\s*:/i.test(kaartTekst));
  const repos = new Set(["cafeclaude", "financieel-kompas-ai", "vastgoedtransactie", "plus-value-calculator", "if-mobiel", "energiebesparing-subsidie-en-fiscale-regelingen", "erfrecht-en-testament", "nlfr-ai-agent", "if-tools-api"]);
  const toolsPad = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "peil-nl-fr", "data", "tools.json");
  if (existsSync(toolsPad)) for (const t of JSON.parse(readFileSync(toolsPad, "utf8")).tools) repos.add(String(t.repo).toLowerCase());
  const waarden = [];
  (function loop(x) {
    if (typeof x === "string") waarden.push(x.toLowerCase());
    else if (Array.isArray(x)) x.forEach(loop);
    else if (x && typeof x === "object") Object.values(x).forEach(loop);
  })(kaarten.map(({ k }) => k).concat(index));
  // De slug is openbaar en mag toevallig gelijk zijn aan een repo-naam; het is de vaste permalink.
  const slugs = new Set(index.tools.map((t) => t.slug));
  for (const w of waarden) assert.ok(!repos.has(w) || slugs.has(w), `repo-naam in uitvoer: ${w}`);
  // Bronnen en toolnamen mogen een repo-achtige naam bevatten, maar nooit een vercel-adres van een privé-repo.
  assert.ok(!/antons-cockpit/i.test(kaartTekst));
});

test("toolkaarten: index klopt met de kaarten", () => {
  assert.equal(index.aantal, index.tools.length);
  for (const { t, k } of kaarten) {
    assert.equal(t.naam, k.naam);
    assert.equal(t.aantal_bedragen, k.bedragen.length);
    assert.equal(t.aantal_rekenstappen, k.rekenstappen.length);
    assert.equal(t.aantal_gecontroleerde_stappen, k.rekenstappen.filter((s) => s.status === "gecontroleerd").length);
  }
});

test("toolkaarten: kaartdata klopt met het register (peil-zoek.json en, indien aanwezig, register.json)", () => {
  const perId = new Map(data.parameters.map((p) => [p.id, p]));
  const vastgoed = kaarten.find(({ k }) => k.slug === "vastgoedtransacties-in-frankrijk")?.k;
  assert.ok(vastgoed && vastgoed.bedragen.length > 0);
  for (const b of vastgoed.bedragen) {
    const p = perId.get(b.id);
    assert.ok(p, `${b.id} staat niet in het register`);
    assert.ok(p.tools.some((t) => t.naam === vastgoed.naam), `${b.id} hoort volgens het register niet bij ${vastgoed.naam}`);
    for (const key of ["waarde_weergave", "eenheid", "bron_url", "bron_kenmerk", "verificatiedatum", "land"]) assert.equal(b[key], p[key], `${b.id}.${key}`);
    assert.equal(b.naam, p.naam);
  }
  // Elk register-bedrag dat deze tool gebruikt staat ook op de kaart.
  const opKaart = new Set(vastgoed.bedragen.map((b) => b.id));
  for (const p of data.parameters) if (p.tools.some((t) => t.naam === vastgoed.naam)) assert.ok(opKaart.has(p.id), `${p.id} ontbreekt op de kaart`);

  const registerPad = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "peil-nl-fr", "data", "register.json");
  if (existsSync(registerPad)) {
    const reg = JSON.parse(readFileSync(registerPad, "utf8")).parameters;
    for (const b of vastgoed.bedragen) {
      const r = reg.find((x) => x.id === b.id);
      assert.equal(r.status, "vastgesteld");
      assert.equal(r.waarde_weergave, b.waarde_weergave);
    }
  }
});

test("toolkaarten: volgende controle ligt na de stand en volgt het land", () => {
  for (const { k } of kaarten) {
    assert.ok(k.volgende_controle && k.volgende_controle.datum > k.stand, k.slug);
    const landen = new Set(k.bedragen.map((b) => b.land));
    if (landen.has("FR") && !landen.has("NL")) assert.match(k.volgende_controle.label, /april/, k.slug);
  }
});

test("peil-zoek.json en tools/index.json dragen stand en versie van Peil (de Peil-run vergelijkt die)", () => {
  const index = JSON.parse(readFileSync(join(dirname(pad), "tools", "index.json"), "utf8"));
  for (const d of [data, index]) {
    assert.match(d.stand, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(d.versie, /^\d+\.\d+\.\d+$/);
  }
  assert.equal(data.versie, index.versie);
  assert.equal(data.stand, index.stand);
});

test("toolkaarten: een rekenstap is alleen gecontroleerd als de regel vastgesteld is en de tool niet afwijkt", () => {
  const dataMap = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "peil-nl-fr", "data");
  if (!existsSync(join(dataMap, "rekenregels.json")) || !existsSync(join(dataMap, "tools.json"))) return;
  const regels = JSON.parse(readFileSync(join(dataMap, "rekenregels.json"), "utf8")).rekenregels;
  const tools = JSON.parse(readFileSync(join(dataMap, "tools.json"), "utf8")).tools;

  for (const { k } of kaarten) {
    const repos = tools.filter((t) => t.peil_slug === k.slug).map((t) => String(t.repo).toLowerCase());
    for (const s of k.rekenstappen) {
      const r = regels.find((x) => x.id === s.id);
      const wijkt = (r.gebruikt_in ?? []).some((g) => repos.includes(String(g.repo).toLowerCase()) && g.afwijkend === true);

      assert.equal(s.status, r.status === "vastgesteld" && !wijkt ? "gecontroleerd" : "nog in controle", `${k.slug}: ${s.id}`);
    }
  }
});
