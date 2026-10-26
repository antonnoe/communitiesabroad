import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "../../toolkaart.css";
import { getContent } from "@/lib/content";
import { bedragAnker, datumKort, datumLang, getToolIndex, getToolkaart, volgordeZin } from "@/lib/toolkaart";
import type { Bedrag, VolgendeControle } from "@/lib/toolkaart";
import MeldingFormulier from "@/components/melding-formulier";
import OpenBijAnker from "@/components/open-bij-anker";

interface KaartTekst {
  bovenregel: string;
  controleZin: string;
  zoSnelMogelijk: string;
  naarTool: string;
  tegels: Record<string, string>;
  standRegel: string;
  peilUitleg: string;
  zoWerkenLink: string;
  bedragen: { kop: string; intro: string; leeg: string; kolommen: string[]; toonRest: string; toonRestEen?: string; volgende: string; vaststeller: string };
  schattingen: { kop: string; intro: string; label: string; herziening: string };
  rekenwijze: { kop: string; stapGecontroleerd: string; stapInControle: string; bronLink: string; leeg: string; gebruikt: string; gecontroleerd: string; laatsteStap: string; volgendeStap: string };
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

function volgendeTekst(v: VolgendeControle, t: KaartTekst): string {
  return v.datum ? datumKort(v.datum) : t.zoSnelMogelijk;
}

function Rij({ b, t }: { b: Bedrag; t: KaartTekst }) {
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
      <span className="controle">
        <span>
          {t.bedragen.volgende}: <b>{volgendeTekst(b.volgende_controle, t)}</b> {b.volgende_controle.reden.startsWith(b.verandert) ? null : <> &middot; {b.verandert}</>}
          {b.instantie ? <> &middot; {t.bedragen.vaststeller.replace("{x}", b.instantie)}</> : null}
        </span>
        <span>{b.volgende_controle.reden}</span>
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
  const metStatus = stappen.filter((s) => s.status === "gecontroleerd" || s.status === "nog in controle");
  const gecontroleerd = metStatus.filter((s) => s.status === "gecontroleerd").length;
  const inControle = metStatus.length > gecontroleerd;
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
            <p className="controlezin">{t.controleZin}</p>
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
                {t.tegels.stappenWoord}
                {stappen.length === 0 || metStatus.length > 0 ? ", " : null}
                {stappen.length === 0 ? (
                  <strong>{t.tegels.stappenLeeg}</strong>
                ) : metStatus.length === 0 ? null : inControle ? (
                  <strong>{t.tegels.stappenAantal.replace("{n}", String(gecontroleerd))}</strong>
                ) : (
                  t.tegels.stappenAantal.replace("{n}", String(gecontroleerd))
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
                    <Rij key={b.id} b={b} t={t} />
                  ))}
                </div>
                {rest.length > 0 && (
                  <details className="meer" id="alle-bedragen">
                    <summary>{rest.length === 1 && t.bedragen.toonRestEen ? t.bedragen.toonRestEen : t.bedragen.toonRest.replace("{n}", String(rest.length))}</summary>
                    <div className="rijen">
                      {rest.map((b) => (
                        <Rij key={b.id} b={b} t={t} />
                      ))}
                    </div>
                  </details>
                )}
              </>
            )}
          </section>

          {k.schattingen.length > 0 && (
            <section className="blok schattingen" aria-labelledby="schattingen-kop">
              <h2 id="schattingen-kop">{t.schattingen.kop}</h2>
              <p className="intro">{t.schattingen.intro}</p>
              <ul className="schatlijst">
                {k.schattingen.map((x) => (
                  <li key={x.id} id={bedragAnker(x.id)}>
                    <p className="schatnaam">
                      <span className="schatlabel">{t.schattingen.label}</span> {x.naam}
                      {x.naam_fr ? (
                        <>
                          {" "}
                          <i lang="fr">({x.naam_fr})</i>
                        </>
                      ) : null}
                    </p>
                    <p className="schatwaarde">{x.bandbreedte}</p>
                    <p className="schattoelichting">{x.toelichting}</p>
                    {x.herziening ? (
                      <p className="schatherziening">
                        {t.schattingen.herziening}: <b>{datumKort(x.herziening)}</b>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="blok">
            <h2>{t.rekenwijze.kop}</h2>
            {stappen.length === 0 ? (
              <p className="eerlijk">{t.rekenwijze.leeg}</p>
            ) : (
              <>
                <ol className="stappen">
                  {stappen.map((s) => {
                    const pijl = volgordeZin(s, stappen);
                    return (
                      <li key={s.id} className={pijl ? "levert" : undefined}>
                        <h3>{s.naam_nl}</h3>
                        {s.status === "gecontroleerd" ? (
                          <p className="stapstatus">
                            <span className="vink" aria-hidden="true" />
                            {t.rekenwijze.stapGecontroleerd}
                          </p>
                        ) : s.status === "nog in controle" ? (
                          <p className="stapstatus let">
                            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                              <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                              <path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                            {t.rekenwijze.stapInControle}
                          </p>
                        ) : null}
                        <p className="stapcontrole">
                          {t.rekenwijze.laatsteStap} {datumKort(s.laatste_controle) || "onbekend"} &middot; {t.rekenwijze.volgendeStap} {volgendeTekst(s.volgende_controle, t)}
                        </p>
                        {s.omschrijving ? <p>{s.omschrijving}</p> : null}
                        {s.status !== "gecontroleerd" && s.toelichting ? (
                          <p className="toelichting">
                            {s.toelichting}
                            {s.bron_url ? (
                              <>
                                {" "}
                                <a href={s.bron_url} rel="noopener noreferrer">
                                  {t.rekenwijze.bronLink} <span aria-hidden="true">&#8599;</span>
                                </a>
                              </>
                            ) : null}
                          </p>
                        ) : null}
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
