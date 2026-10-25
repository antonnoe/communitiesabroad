import fs from "fs";
import path from "path";

export interface Bedrag {
  id: string;
  naam: string;
  naam_fr?: string;
  waarde_weergave: string;
  eenheid: string | null;
  land: string;
  bron_url: string | null;
  bron_kenmerk: string | null;
  instantie: string | null;
  verificatiedatum: string | null;
}

export interface Rekenstap {
  id: string;
  naam_nl: string;
  omschrijving: string;
  volgorde: string;
  bron_kenmerk: string | null;
  status: "gecontroleerd" | "nog in controle";
  gebruikte_bedragen: string[];
  toelichting?: string;
  bron_url?: string | null;
}

export interface Toolkaart {
  slug: string;
  naam: string;
  url: string;
  omschrijving: string;
  stand: string;
  aantal_bedragen: number;
  laatste_controle: string | null;
  volgende_controle: { datum: string; label: string } | null;
  bedragen: Bedrag[];
  rekenstappen: Rekenstap[];
}

export interface ToolIndexItem {
  slug: string;
  naam: string;
  url: string;
  omschrijving: string;
  stand: string;
  aantal_bedragen: number;
  aantal_rekenstappen: number;
  rekenwijze: "gecontroleerd" | "nog in controle" | "niet in register";
  laatste_controle: string | null;
  volgende_controle: { datum: string; label: string } | null;
}

const map = path.join(process.cwd(), "public", "manifest", "tools");

export function getToolIndex(): { stand: string; tools: ToolIndexItem[] } {
  return JSON.parse(fs.readFileSync(path.join(map, "index.json"), "utf8"));
}

export function getToolkaart(slug: string): Toolkaart | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    return JSON.parse(fs.readFileSync(path.join(map, `${slug}.json`), "utf8"));
  } catch {
    return null;
  }
}

const MAAND_KORT = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const MAAND_LANG = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function datumKort(iso: string | null): string {
  if (!iso) return "";
  const [j, m, d] = iso.split("-").map(Number);
  return `${d} ${MAAND_KORT[m - 1]} ${j}`;
}

export function datumLang(iso: string | null): string {
  if (!iso) return "";
  const [j, m, d] = iso.split("-").map(Number);
  return `${d} ${MAAND_LANG[m - 1]} ${j}`;
}

export function bedragAnker(id: string): string {
  return "b-" + id.replace(/[^a-z0-9]+/gi, "-");
}

// Zet "na r.fr.pv.heffing" om in "Na stap 2". Alleen de regel over de grondslag voor andere stappen wordt getoond.
export function volgordeZin(stap: Rekenstap, stappen: Rekenstap[]): string | null {
  if (!/grondslag voor/i.test(stap.volgorde)) return null;
  const naarStap = (id: string) => {
    const i = stappen.findIndex((s) => s.id === id);
    return i === -1 ? null : `stap ${i + 1}`;
  };
  let onbekend = false;
  const tekst = stap.volgorde.replace(/r\.[a-z0-9_.]+/g, (id) => {
    const n = naarStap(id);
    if (!n) onbekend = true;
    return n ?? id;
  });
  if (onbekend) return null;
  const na = tekst.split(";").pop()!.trim();
  return na.charAt(0).toUpperCase() + na.slice(1) + ".";
}
