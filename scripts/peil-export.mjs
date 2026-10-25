#!/usr/bin/env node
// Maakt public/manifest/peil-zoek.json uit het privé-register van Peil.
// Gebruik: node scripts/peil-export.mjs /pad/naar/register.json
// Alleen parameters met status "vastgesteld", met een vaste lijst openbare velden.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
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
  if (t.repo && t.openbaar?.naam && t.openbaar?.url) {
    openbaarPerRepo.set(String(t.repo).toLowerCase(), {
      naam: t.openbaar.naam,
      url: t.openbaar.url,
      slug: t.peil_slug ?? null,
      omschrijving: t.openbaar.omschrijving ?? "",
    });
  }
}
// Hoort deze parameter (volgens de koppelregel) bij deze repo (kleine letters)?
function hoortBij(p, repo) {
  const eigen = (p.gebruikt_in ?? []).filter((g) => String(g.repo ?? "").toLowerCase() === repo);
  if (eigen.some((g) => g.afwijkend === true)) return false;
  return eigen.some((g) => g.afwijkend === false && !/niet doorgerekend/i.test(String(g.waarde_in_tool ?? "")));
}
function toolsVoor(p) {
  const gevonden = new Map();
  for (const [repo, openbaar] of openbaarPerRepo) {
    if (!hoortBij(p, repo)) continue;
    gevonden.set(openbaar.naam + "|" + openbaar.url, { naam: openbaar.naam, url: openbaar.url });
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
  "Energie en verbouwen": ["p.fr.elec", "p.fr.energie", "p.fr.dpe", "p.fr.renov", "p.fr.telecom", "p.fr.markt"],
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
const uit = { stand, versie: register.meta?.versie ?? null, aantal: parameters.length, parameters };
const doel = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "peil-zoek.json");
writeFileSync(doel, JSON.stringify(uit) + "\n");
console.log(`${parameters.length} parameters, stand ${stand}, geschreven naar ${doel}`);

// ---- Toolkaarten: public/manifest/tools/<peil_slug>.json en index.json ----
const dataMap = dirname(bron);
const leesOptioneel = (naam, fallback) => {
  try { return JSON.parse(readFileSync(join(dataMap, naam), "utf8")); } catch { return fallback; }
};
const rekenregels = leesOptioneel("rekenregels.json", { rekenregels: [] }).rekenregels ?? [];
const ijkmomenten = leesOptioneel("ijkkalender.json", { ijkmomenten: [] }).ijkmomenten ?? [];
const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
const vastgesteldePerId = new Map(register.parameters.filter((p) => p.status === "vastgesteld" && !TIJDELIJK_UIT.has(p.id)).map((p) => [p.id, p]));

// Volgende controle komt kant-en-klaar uit Peil (afgeleid in de bouw, vanaf Peil 1.9.1). Alleen datum, soort en reden gaan mee.
// Geen volgende_controle in de invoer betekent dat het verkeerde bestand is aangewezen: gebruik dist-intern/data/register.json van Peil.
function controleVan(x) {
  const v = x.volgende_controle;
  if (!v || typeof v.soort !== "string" || typeof v.reden !== "string" || !("datum" in v)) {
    console.error(`FOUT: ${x.id} heeft geen volgende_controle. Draai in peil-nl-fr "npm run bouw" en wijs dist-intern/data/register.json aan.`);
    process.exit(1);
  }
  return { datum: v.datum ?? null, soort: v.soort, reden: v.reden };
}
// Hoe vaak een bedrag verandert, in gewone taal (een zin die met een hoofdletter begint).
const BIJ_WET = /bij wet\b|wetswijziging/i;
function veranderingTekst(p) {
  const f = p.levensduur_a?.aanpassingsfrequentie ?? "onbekend";
  const wet = BIJ_WET.test(p.publicatiemoment ?? "");
  if (f === "zelden" || f === "onregelmatig") return wet ? "Verandert alleen bij een wetswijziging" : f === "zelden" ? "Verandert zelden" : "Verandert onregelmatig";
  return { jaarlijks: "Verandert jaarlijks", halfjaarlijks: "Verandert twee keer per jaar", doorlopend: "Wordt doorlopend bijgewerkt", meerjaarlijks: "Verandert om de paar jaar" }[f] ?? "Nog niet bekend hoe vaak het verandert";
}

// Eerstvolgend controlemoment: Frankrijk half april, Nederland (en CAK) half december, gezien vanaf de peildatum.
function volgendeControle(landen) {
  // Grensoverschrijdende bedragen (XB) bepalen het moment niet zelf; alleen XB: beide momenten gelden.
  const sleutels = new Set([...landen].filter((l) => l === "FR" || l === "NL").map((l) => (l === "FR" ? "fr_april" : "nl_december")));
  if (!sleutels.size) ijkmomenten.forEach((m) => sleutels.add(m.sleutel));
  const ref = new Date(`${stand}T00:00:00Z`);
  let beste = null;
  for (const m of ijkmomenten.filter((x) => sleutels.has(x.sleutel))) {
    let jaar = ref.getUTCFullYear();
    let d = new Date(Date.UTC(jaar, m.maand - 1, m.dag));
    if (d <= ref) d = new Date(Date.UTC(jaar + 1, m.maand - 1, m.dag));
    if (!beste || d < beste.d) beste = { d, m };
  }
  if (!beste) return null;
  const j = beste.d.getUTCFullYear();
  const naam = MAANDEN[beste.m.maand - 1];
  return { datum: beste.d.toISOString().slice(0, 10), label: beste.m.dag === 15 ? `half ${naam} ${j}` : `${beste.m.dag} ${naam} ${j}` };
}

function bouwKaart(slug, repos, openbaar) {
  const bedragenRuw = [...vastgesteldePerId.values()].filter((p) => repos.some((r) => hoortBij(p, r)));
  const ids = new Set(bedragenRuw.map((p) => p.id));
  const regels = rekenregels.filter((r) => (r.gebruikt_in ?? []).some((g) => repos.includes(String(g.repo ?? "").toLowerCase())));
  // Rekenstappen in volgorde van afhankelijkheid (eerst de stappen waar andere op bouwen), verder bestandsvolgorde.
  const ordenen = [];
  const gezet = new Set();
  const ids_regels = new Set(regels.map((r) => r.id));
  const zet = (r) => {
    if (gezet.has(r.id)) return;
    gezet.add(r.id);
    for (const dep of r.gebruikt_rekenregels ?? []) {
      const d = regels.find((x) => x.id === dep);
      if (d && ids_regels.has(dep)) zet(d);
    }
    ordenen.push(r);
  };
  regels.forEach(zet);
  const rekenstappen = ordenen.map((r) => {
    // Alleen "gecontroleerd" als de regel vastgesteld is én geen enkele gebruikt_in-regel van deze tool afwijkt; de reden komt nooit in de uitvoer.
    const status = r.status === "vastgesteld" && !(r.gebruikt_in ?? []).some((g) => repos.includes(String(g.repo ?? "").toLowerCase()) && g.afwijkend === true) ? "gecontroleerd" : "nog in controle";
    return {
      id: r.id,
      naam_nl: r.naam_nl,
      omschrijving: r.omschrijving ?? "",
      volgorde: r.volgorde ?? "",
      bron_kenmerk: r.bron_kenmerk ?? null,
      status,
      laatste_controle: r.verificatiedatum ?? null,
      volgende_controle: controleVan(r),
      gebruikte_bedragen: (r.gebruikt_parameters ?? []).filter((id) => ids.has(id)),
      // Toelichting en officiële bron alleen bij een stap die nog in controle is.
      ...(status !== "gecontroleerd" && r.toelichting_openbaar ? { toelichting: r.toelichting_openbaar, bron_url: r.bron_url ?? null } : {}),
    };
  });
  // Bedragen: eerst die in de eerste rekenstap gebruikt worden, enzovoort; de rest daarna.
  const eersteGebruik = (id) => {
    const i = rekenstappen.findIndex((s) => s.gebruikte_bedragen.includes(id));
    return i === -1 ? 1e6 : i;
  };
  const bedragen = bedragenRuw
    .map((p, i) => ({ p, i }))
    .sort((a, b) => eersteGebruik(a.p.id) - eersteGebruik(b.p.id) || a.i - b.i)
    .map(({ p }) => ({
      id: p.id,
      naam: p.naam_nl,
      ...(p.naam_fr ? { naam_fr: p.naam_fr } : {}),
      waarde_weergave: p.waarde_weergave,
      eenheid: p.eenheid ?? null,
      land: p.land,
      bron_url: p.bron_url ?? null,
      bron_kenmerk: p.bron_kenmerk ?? null,
      instantie: p.instantie ?? null,
      verificatiedatum: p.verificatiedatum ?? null,
      verandert: veranderingTekst(p),
      volgende_controle: controleVan(p),
    }));
  const datums = bedragen.map((b) => b.verificatiedatum).filter(Boolean).sort();
  const landen = new Set(bedragen.map((b) => b.land));
  return {
    slug,
    naam: openbaar.naam,
    url: openbaar.url,
    omschrijving: openbaar.omschrijving ?? "",
    stand,
    aantal_bedragen: bedragen.length,
    laatste_controle: datums.length ? datums[datums.length - 1] : null,
    volgende_controle: volgendeControle(landen),
    bedragen,
    rekenstappen,
  };
}

// Groeperen per slug (twee repos met dezelfde openbare naam delen één slug).
const perSlug = new Map();
for (const [repo, openbaar] of openbaarPerRepo) {
  if (!openbaar.slug) continue;
  const e = perSlug.get(openbaar.slug) ?? { repos: [], openbaar };
  e.repos.push(repo);
  perSlug.set(openbaar.slug, e);
}
const toolsMap = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "manifest", "tools");
rmSync(toolsMap, { recursive: true, force: true });
mkdirSync(toolsMap, { recursive: true });
const kaarten = [...perSlug].map(([slug, e]) => bouwKaart(slug, e.repos, e.openbaar)).sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
for (const k of kaarten) writeFileSync(join(toolsMap, `${k.slug}.json`), JSON.stringify(k) + "\n");
const index = {
  stand,
  versie: register.meta?.versie ?? null,
  aantal: kaarten.length,
  tools: kaarten.map((k) => ({
    slug: k.slug,
    naam: k.naam,
    url: k.url,
    omschrijving: k.omschrijving,
    stand: k.stand,
    aantal_bedragen: k.aantal_bedragen,
    aantal_rekenstappen: k.rekenstappen.length,
    aantal_gecontroleerde_stappen: k.rekenstappen.filter((s) => s.status === "gecontroleerd").length,
    rekenwijze: k.rekenstappen.length === 0 ? "niet in register" : k.rekenstappen.every((s) => s.status === "gecontroleerd") ? "gecontroleerd" : "nog in controle",
    laatste_controle: k.laatste_controle,
    volgende_controle: k.volgende_controle,
  })),
};
writeFileSync(join(toolsMap, "index.json"), JSON.stringify(index) + "\n");
for (const k of kaarten) console.log(`${k.slug}: ${k.aantal_bedragen} bedragen, ${k.rekenstappen.length} rekenstappen`);
