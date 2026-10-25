import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "../../toolkaart.css";
import { getContent } from "@/lib/content";
import { bedragAnker, datumKort, datumLang, getToolIndex, getToolkaart, volgordeZin } from "@/lib/toolkaart";
import type { Bedrag } from "@/lib/toolkaart";
import MeldingFormulier from "@/components/melding-formulier";
import OpenBijAnker from "@/components/open-bij-anker";

interface KaartTekst {
  bovenregel: string;
  naarTool: string;
  tegels: Record<string, string>;
  standRegel: string;
  peilUitleg: string;
  zoWerkenLink: string;
  bedragen: { kop: string; intro: string; leeg: string; kolommen: string[]; toonRest: string };
  rekenwijze: { kop: string; label: string; zin: string; leeg: string; gebruikt: string; gecontroleerd: string };
  zoWerkenWij: { kop: string; tekst: string; linkLabel: string; linkHref: string };
  melding: Record<string, string>;
  disclaimer: string;
  terug: string;
}

const ZICHTBAAR = 5;

export const dynamicParams = false;

export function generateStaticParams() {
  return getToolIndex().tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = getToolkaart(slug);
  if (!k) return {};
  const beschrijving = `Welke bedragen van ${k.naam} wij hebben gecontroleerd bij de officiële bron, en hoe de tool rekent. Stand van Peil: ${datumLang(k.stand)}.`;
  return {
    title: `Toolkaart ${k.naam}`,
    description: beschrijving,
    alternates: { canonical: `/manifest/tool/${k.slug}` },
    openGraph: { title: `Toolkaart ${k.naam}`, description: beschrijving, url: `/manifest/tool/${k.slug}` },
  };
}

function Rij({ b }: { b: Bedrag }) {
  return (
    <div className="rij" id={bedragAnker(b.id)}>
      <span className="naam">
        {b.naam}
        {b.naam_fr ? (
          <>
            {" "}
            <i lang="fr">({b.naam_fr})</i>
          </>
        ) : null}
      </span>
      <span className="waarde">{b.waarde_weergave}</span>
      <span className="bron">
        {b.bron_url ? (
          <a href={b.bron_url} rel="noopener noreferrer">
            {b.instantie ?? "Bron"}
          </a>
        ) : (
          <span>{b.instantie ?? "Bron"}</span>
        )}
        {b.bron_kenmerk ? <small> {b.bron_kenmerk}</small> : null}
      </span>
      <span className="datum">
        <span className="vink" aria-hidden="true" />
        {datumKort(b.verificatiedatum)}
      </span>
    </div>
  );
}

export default async function ToolkaartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = getToolkaart(slug);
  if (!k) notFound();
  const t = getContent<KaartTekst>("toolkaart");
  const stappen = k.rekenstappen;
  const inControle = stappen.some((s) => s.status !== "gecontroleerd");
  const eerste = k.bedragen.slice(0, ZICHTBAAR);
  const rest = k.bedragen.slice(ZICHTBAAR);
  const bedragPerId = new Map(k.bedragen.map((b) => [b.id, b]));

  return (
    <div className="tk">
      <OpenBijAnker />
      <p className="tk-terug">
        <Link href="/manifest/tools">&larr; {t.terug}</Link>
      </p>
      <div className="tk-scherm">
        <article className="kaart">
          <header className="kop">
            <p className="bovenregel">{t.bovenregel}</p>
            <h1>{k.naam}</h1>
            {k.omschrijving ? <p className="wat">{k.omschrijving}</p> : null}
            <a className="naartool" href={k.url} rel="noopener noreferrer">
              {t.naarTool} <span aria-hidden="true">&#8599;</span>
            </a>
          </header>

          <section className="samen" aria-label="Samenvatting">
            <div className="tegel">
              <span className="getal">{k.aantal_bedragen}</span>
              <span className="uitleg">{t.tegels.bedragen}</span>
            </div>
            <div className={"tegel" + (stappen.length === 0 || inControle ? " let" : "")}>
              <span className="getal">{stappen.length}</span>
              <span className="uitleg">
                {t.tegels.stappenWoord},{" "}
                {stappen.length === 0 ? (
                  <strong>{t.tegels.stappenLeeg}</strong>
                ) : inControle ? (
                  <strong>{t.tegels.stappenControle}</strong>
                ) : (
                  t.tegels.stappenGecontroleerd
                )}
              </span>
            </div>
            <div className="tegel">
              <span className="getal klein">{datumKort(k.laatste_controle) || "onbekend"}</span>
              <span className="uitleg">{t.tegels.laatste}</span>
            </div>
            <div className="tegel">
              <span className="getal klein">{k.volgende_controle?.label ?? "onbekend"}</span>
              <span className="uitleg">{t.tegels.volgende}</span>
            </div>
          </section>
          <p className="peiluitleg">
            {t.peilUitleg}{" "}
            <a href={t.zoWerkenWij.linkHref} rel="noopener noreferrer">
              {t.zoWerkenLink}
            </a>
          </p>
          <p className="stand">
            {t.standRegel} {datumLang(k.stand)}.
          </p>

          <section className="blok">
            <h2>{t.bedragen.kop}</h2>
            {k.bedragen.length === 0 ? (
              <p className="eerlijk">{t.bedragen.leeg}</p>
            ) : (
              <>
                <p className="intro">{t.bedragen.intro}</p>
                <div className="rijen">
                  <div className="rij koprij" aria-hidden="true">
                    {t.bedragen.kolommen.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  {eerste.map((b) => (
                    <Rij key={b.id} b={b} />
                  ))}
                </div>
                {rest.length > 0 && (
                  <details className="meer" id="alle-bedragen">
                    <summary>{t.bedragen.toonRest.replace("{n}", String(rest.length))}</summary>
                    <div className="rijen">
                      {rest.map((b) => (
                        <Rij key={b.id} b={b} />
                      ))}
                    </div>
                  </details>
                )}
              </>
            )}
          </section>

          <section className="blok">
            <h2>{t.rekenwijze.kop}</h2>
            {stappen.length === 0 ? (
              <p className="eerlijk">{t.rekenwijze.leeg}</p>
            ) : (
              <>
                {inControle && (
                  <div className="incontrole">
                    <span className="label">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      {t.rekenwijze.label}
                    </span>
                    <p>{t.rekenwijze.zin}</p>
                  </div>
                )}
                <ol className="stappen">
                  {stappen.map((s) => {
                    const pijl = volgordeZin(s, stappen);
                    return (
                      <li key={s.id} className={pijl ? "levert" : undefined}>
                        <h3>{s.naam_nl}</h3>
                        {s.omschrijving ? <p>{s.omschrijving}</p> : null}
                        {s.gebruikte_bedragen.length > 0 && (
                          <p className="gebruikt">
                            <span>{t.rekenwijze.gebruikt}</span>
                            {s.gebruikte_bedragen.map((id) => (
                              <a key={id} href={`#${bedragAnker(id)}`}>
                                {bedragPerId.get(id)?.naam ?? id}
                              </a>
                            ))}
                          </p>
                        )}
                        {s.bron_kenmerk ? <p className="wet">{s.bron_kenmerk}</p> : null}
                        {pijl ? <p className="pijl">{pijl}</p> : null}
                      </li>
                    );
                  })}
                </ol>
              </>
            )}
          </section>

          <footer className="voet">
            <div className="voetvak">
              <h2>{t.zoWerkenWij.kop}</h2>
              <p>{t.zoWerkenWij.tekst}</p>
              <a href={t.zoWerkenWij.linkHref} rel="noopener noreferrer">
                {t.zoWerkenWij.linkLabel} <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
            <div className="voetvak">
              <h2>{t.melding.kop}</h2>
              <p>{t.melding.tekst}</p>
              <MeldingFormulier
                slug={k.slug}
                knop={t.melding.knop}
                label={t.melding.label}
                hulp={t.melding.hulp}
                verstuur={t.melding.verstuur}
                bezig={t.melding.bezig}
                gelukt={t.melding.gelukt}
                mislukt={t.melding.mislukt}
                leeg={t.melding.leeg}
                teLang={t.melding.teLang}
              />
            </div>
            <p className="disclaimer">{t.disclaimer}</p>
          </footer>
        </article>
      </div>
    </div>
  );
}
