import type { Metadata } from "next";
import Link from "next/link";
import "./zo-controleren-wij.css";
import { getContent } from "@/lib/content";
import { datumLang, getPeilStand, getToolIndex } from "@/lib/toolkaart";

interface KopTekst { kop: string; tekst: string }
interface Tekst {
  metadata: { title: string; description: string };
  kop: { bovenregel: string; titel: string; tekst: string; stand: string };
  stroom: {
    bovenregel: string; titel: string; tekst: string;
    bronnen: { chip: string; soort: string; tekst: string }[];
    zwarteLijstKop: string; zwarteLijst: string;
    peilOnder: string; waarden: string; rekenregels: string; dubbel: string; dubbelTekst: string; ritmeRegel: string;
    voorUKop: string; voorU: string; bedragen: string;
    cafeNaam: string; cafeTekst: string; cafeHref: string; verder: string; verderHref: string;
  };
  heenTerug: { bovenregel: string; titel: string; heenTitel: string; heen: KopTekst[]; terugTitel: string; terug: KopTekst[] };
  onderAntwoord: { bovenregel: string; titel: string; tekst: string; lagen: { kop: string; vraag: string; tekst: string }[] };
  ritme: { bovenregel: string; titel: string; momenten: KopTekst[] };
  zelf: { titel: string; tekst: string; knoppen: { label: string; href: string }[] };
}

export function generateMetadata(): Metadata {
  const t = getContent<Tekst>("zo-controleren-wij").metadata;
  return { title: t.title, description: t.description, alternates: { canonical: "/zo-controleren-wij" } };
}

function Verwijzing({ href, label, className }: { href: string; label: string; className: string }) {
  return href.startsWith("http") ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">{label} ↗</a>
  ) : (
    <Link href={href} className={className}>{label}</Link>
  );
}

export default function ZoControlerenWijPage() {
  const t = getContent<Tekst>("zo-controleren-wij");
  const stand = getPeilStand();
  const tools = [...getToolIndex().tools].sort((a, b) => b.aantal_bedragen - a.aantal_bedragen);
  const s = t.stroom;
  const standTekst = t.kop.stand.replace("{versie}", stand.versie).replace("{versiedatum}", datumLang(stand.versiedatum));

  return (
    <div className="zc">
      <header className="hero">
        <div className="w">
          <p className="oog">{t.kop.bovenregel}</p>
          <h1>{t.kop.titel}</h1>
          <p className="lead">{t.kop.tekst}</p>
          <span className="stand">{standTekst}</span>
        </div>
      </header>

      <section className="b" aria-labelledby="zc-stroom">
        <div className="w">
          <p className="oog">{s.bovenregel}</p>
          <h2 id="zc-stroom">{s.titel}</h2>
          <p className="intro">{s.tekst}</p>
          <div className="zl">
            <div className="laag bron3">
              {s.bronnen.map((b) => (
                <div key={b.soort}>
                  <span className={`chip ${b.soort}`}>{b.chip}</span>
                  <p>{b.tekst}</p>
                </div>
              ))}
            </div>
            <p className="smal"><b>{s.zwarteLijstKop}</b> {s.zwarteLijst}</p>
            <div className="peil">
              <div className="peilnaam">
                <div className="pn" aria-hidden="true">PEIL</div>
                <div className="pl"><span className="sr">Peil, </span>{s.peilOnder}</div>
              </div>
              <div className="tg">
                <div className="tegel"><b>{stand.vastgesteld}</b><span>{s.waarden}</span></div>
                {stand.rekenregels_vastgesteld ? (
                  <div className="tegel"><b>{stand.rekenregels_vastgesteld}</b><span>{s.rekenregels}</span></div>
                ) : null}
                <div className="tegel"><b>{s.dubbel}</b><span>{s.dubbelTekst}</span></div>
                <p className="tick">{s.ritmeRegel}</p>
              </div>
            </div>
            <p className="smal"><b>{s.voorUKop}</b> {s.voorU}</p>
            <ul className="laag tools">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/manifest/tool/${tool.slug}`} className="tool">
                    <b>{tool.naam}</b>
                    <span>{tool.aantal_bedragen} {s.bedragen}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a href={s.cafeHref} className="tool" target="_blank" rel="noopener noreferrer">
                  <b>{s.cafeNaam} ↗</b>
                  <span>{s.cafeTekst}</span>
                </a>
              </li>
            </ul>
          </div>
          <Link href={s.verderHref} className="verder">{s.verder}</Link>
        </div>
      </section>

      <section className="b" aria-labelledby="zc-heen">
        <div className="w">
          <p className="oog">{t.heenTerug.bovenregel}</p>
          <h2 id="zc-heen">{t.heenTerug.titel}</h2>
          <div className="twee">
            <div className="kaart">
              <h3>{t.heenTerug.heenTitel}</h3>
              <ol className="st">
                {t.heenTerug.heen.map((h) => (<li key={h.kop}><b>{h.kop}</b> {h.tekst}</li>))}
              </ol>
            </div>
            <div className="kaart">
              <h3>{t.heenTerug.terugTitel}</h3>
              <ul className="t">
                {t.heenTerug.terug.map((h) => (<li key={h.kop}><b>{h.kop}</b> {h.tekst}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="b" aria-labelledby="zc-onder">
        <div className="w">
          <p className="oog">{t.onderAntwoord.bovenregel}</p>
          <h2 id="zc-onder">{t.onderAntwoord.titel}</h2>
          <p className="intro">{t.onderAntwoord.tekst}</p>
          <div className="vier">
            {t.onderAntwoord.lagen.map((l) => (
              <div className="kaart" key={l.kop}>
                <h3>{l.kop}</h3>
                <p className="vr">{l.vraag}</p>
                <p>{l.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b" aria-labelledby="zc-ritme">
        <div className="w">
          <p className="oog">{t.ritme.bovenregel}</p>
          <h2 id="zc-ritme">{t.ritme.titel}</h2>
          <div className="ritme">
            {t.ritme.momenten.map((m) => (
              <div key={m.kop}><h3>{m.kop}</h3><p>{m.tekst}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="b" aria-labelledby="zc-zelf">
        <div className="w">
          <h2 id="zc-zelf">{t.zelf.titel}</h2>
          <p className="intro">{t.zelf.tekst}</p>
          <div className="knoppen">
            {t.zelf.knoppen.map((k, i) => (
              <Verwijzing key={k.href} href={k.href} label={k.label} className={i === 0 ? "knop" : "knop licht"} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
