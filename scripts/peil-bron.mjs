// Maakt de vindplaats van een bron leesbaar voor bezoekers: geen Franse datumtekst, een korte documentnaam
// voor de linktekst en de datum waarop de bronpagina zelf is bijgewerkt als aparte, benoemde datum.
const MAANDEN = {
  januari: 1, februari: 2, maart: 3, april: 4, mei: 5, juni: 6, juli: 7, augustus: 8, september: 9, oktober: 10, november: 11, december: 12,
  janvier: 1, février: 2, mars: 3, avril: 4, mai: 5, juin: 6, juillet: 7, août: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12,
  june: 6, august: 8,
};
const MAAND_NL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
const DATUM = String.raw`(\d{1,2})[ -]([a-zéûà]+|\d{2})[ -](\d{4})`;
const MARKERING = new RegExp(String.raw`(?:vérifié|modifié|mis à jour)(?:\s+le)?\s+${DATUM}`, "gi");

function isoUit(d, m, j) {
  const maand = /^\d+$/.test(m) ? Number(m) : MAANDEN[m.toLowerCase()];
  if (!maand || maand < 1 || maand > 12) return null;
  return `${j}-${String(maand).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
export function datumNl(iso) {
  const [j, m, d] = iso.split("-").map(Number);
  return `${d} ${MAAND_NL[m - 1]} ${j}`;
}

// Zet "vérifié le 19 augustus 2026" en "bijgewerkt door de bron op 19 augustus 2026" (ook 01-06-2026 en modifié).
export function normaliseerKenmerk(k) {
  let t = String(k ?? "");
  t = t.replace(MARKERING, (m, d, mm, j) => {
    const iso = isoUit(d, mm, j);
    return iso ? `bijgewerkt door de bron op ${datumNl(iso)}` : m;
  });
  t = t.replace(/(?:écrit|publié) le (\d{2})\/(\d{2})\/(\d{4})/gi, (m, d, mm, j) => `geschreven op ${datumNl(`${j}-${mm}-${d}`)}`);
  t = t.replace(/\bpublié\s+(\d{2})-(\d{2})-(\d{4})/gi, (m, d, mm, j) => `gepubliceerd op ${datumNl(`${j}-${mm}-${d}`)}`);
  return t;
}

// Eerste datum "bijgewerkt door de bron" binnen het eerste deel van de vindplaats (ISO) of null.
function bijgewerktIn(deel) {
  const m = /bijgewerkt door de bron op (\d{1,2}) ([a-z]+) (\d{4})/i.exec(deel);
  return m ? isoUit(m[1], m[2], m[3]) : null;
}

const MAX = 100;
// { naam, rest, bijgewerkt }: documentnaam voor de linktekst (zonder datums), de overige vindplaatsen en
// de datum waarop de bronpagina zelf is bijgewerkt. Lege vindplaats geeft naam null.
export function bronVelden(kenmerk) {
  const vol = normaliseerKenmerk(kenmerk).trim();
  if (!vol) return { naam: null, rest: "", bijgewerkt: null };
  const i = vol.indexOf(";");
  const eerste = (i === -1 ? vol : vol.slice(0, i)).trim();
  const overig = i === -1 ? "" : vol.slice(i + 1).trim();
  const bijgewerkt = bijgewerktIn(eerste);
  let naam = eerste
    .replace(/\s*\(\s*bijgewerkt door de bron op [^)]*\)/gi, "")
    .replace(/\s*,?\s*bijgewerkt door de bron op \d{1,2} [a-z]+ \d{4}/gi, "")
    .replace(/\s+,/g, ",")
    .replace(/[\s,]+$/, "")
    .trim();
  let rest = overig;
  if (naam.length > MAX) {
    let stuk = naam.slice(0, MAX);
    const sp = Math.max(stuk.lastIndexOf(", "), stuk.lastIndexOf(" "));
    if (sp > 50) stuk = stuk.slice(0, sp);
    naam = stuk.replace(/[\s,.:;(]+$/, "") + "…";
    rest = vol;
  }
  return { naam, rest, bijgewerkt };
}
