import type { Metadata } from "next";
import Link from "next/link";
import "../manifest/toolkaart.css";
import "./peil.css";
import { getContent } from "@/lib/content";
import { datumLang, getPeilAantal, getToolIndex } from "@/lib/toolkaart";
import PeilZoekFrame from "@/components/peil-zoek-frame";
import KopieerBronregel from "@/components/kopieer-bronregel";

interface PeilTekst {
  metadata: { title: string; description: string };
  kop: { bovenregel: string; titel: string; tekst: string; zoekTitel: string; datumzin: string };
  werking: {
    titel: string;
    stappen: { titel: string; tekst: string }[];
    momentenLabel: string;
    momenten: { kop: string; tekst: string }[];
    link: string;
    linkHref: string;
  };
  tools: {
    titel: string;
    tekst: string;
    bedragen: string;
    laatste: string;
    volgende: string;
    label: string;
    toolkaart: string;
    naarTool: string;
    alle: string;
    alleHref: string;
  };
  wijzigingen: { titel: string; versie: string };
  partners: {
    bovenregel: string;
    titel: string;
    tekst: string;
    bronTitel: string;
    bronregel: string;
    kopieer: string;
    gekopieerd: string;
    terugval: string;
    licentieTitel: string;
    licentie: string;
    licentieLink: string;
    licentieHref: string;
    apiTitel: string;
    api: { voor: string; pad: string; midden: string; padIndex: string; padToolVoor: string; padTool: string; na: string };
    samenTitel: string;
    samenTekst: string;
    samenLink: string;
    samenHref: string;
    voorbehoud: string;
  };
}

export function generateMetadata(): Metadata {
  const t = getContent<PeilTekst>("peil").metadata;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/peil" },
  };
}

function vul(tekst: string, waarden: Record<string, string>): string {
  return tekst.replace(/\{(\w+)\}/g, (m, k) => waarden[k] ?? m);
}

export default function PeilPage() {
  const t = getContent<PeilTekst>("peil");
  const index = getToolIndex();
  const wijzigingen = index.wijzigingen ?? [];
  const waarden = {
    versie: index.versie,
    versiedatum: datumLang(index.versiedatum),
    stand: datumLang(index.stand),
  };
  const datumdelen = t.kop.datumzin.split(/(\{versiedatum\}|\{stand\})/);
  const p = t.partners;

  return (
    <div className="tk pl">
      <section className="zoekkop gutter" aria-labelledby="peil-t1">
        <div className="in">
          <p className="bovenregel">{t.kop.bovenregel}</p>
          <h1 id="peil-t1">{t.kop.titel}</h1>
          <p className="zacht smal">{t.kop.tekst}</p>
          <p className="datumzin">
            {datumdelen.map((d, i) =>
              d === "{versiedatum}" || d === "{stand}" ? (
                <b key={i}>{waarden[d.slice(1, -1) as "versiedatum" | "stand"]}</b>
              ) : (
                vul(d, waarden)
              ),
            )}
          </p>
          <PeilZoekFrame src="/manifest/peil-zoek.html" titel={t.kop.zoekTitel} />
        </div>
      </section>

      <section className="blok gutter" aria-labelledby="peil-t2">
        <div className="in">
          <h2 id="peil-t2">{t.werking.titel}</h2>
          <ol className="stappen smal">
            {t.werking.stappen.map((s) => (
              <li key={s.titel}>
                <h3>{s.titel}</h3>
                <p>{s.tekst}</p>
              </li>
            ))}
          </ol>
          <ul className="ijk" aria-label={t.werking.momentenLabel}>
            {t.werking.momenten.map((m) => (
              <li key={m.kop}>
                <b>{m.kop}</b>
                <span>{m.tekst}</span>
              </li>
            ))}
          </ul>
          <Link className="verder" href={t.werking.linkHref}>
            {t.werking.link} &rarr;
          </Link>
        </div>
      </section>

      <section className="blok gutter" aria-labelledby="peil-t3">
        <div className="in">
          <h2 id="peil-t3">{t.tools.titel}</h2>
          <p className="zacht smal">{t.tools.tekst}</p>
          <div className="tegels">
            {index.tools.map((k) => (
              <article className="tool" key={k.slug}>
                <h3>{k.naam}</h3>
                {k.rekenwijze === "nog in controle" ? <span className="label">{t.tools.label}</span> : null}
                <dl>
                  <dt>{t.tools.bedragen}</dt>
                  <dd>{k.aantal_bedragen}</dd>
                  <dt>{t.tools.laatste}</dt>
                  <dd>{datumLang(k.laatste_controle)}</dd>
                  {k.volgende_controle ? (
                    <>
                      <dt>{t.tools.volgende}</dt>
                      <dd>{k.volgende_controle.label}</dd>
                    </>
                  ) : null}
                </dl>
                <div className="acties">
                  <Link href={`/manifest/tool/${k.slug}`}>{t.tools.toolkaart}</Link>
                  <a href={k.url} target="_blank" rel="noopener noreferrer">
                    {t.tools.naarTool} <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <Link className="verder" href={t.tools.alleHref}>
            {t.tools.alle} &rarr;
          </Link>
        </div>
      </section>

      {wijzigingen.length > 0 ? (
        <section className="blok gutter" aria-labelledby="peil-t4">
          <div className="in">
            <h2 id="peil-t4">{t.wijzigingen.titel}</h2>
            <ul className="wijz">
              {wijzigingen.map((w) => (
                <li key={`${w.versie}-${w.datum}`}>
                  <span className="wanneer">
                    <b>{datumLang(w.datum)}</b>
                    {t.wijzigingen.versie} {w.versie}
                  </span>
                  <span>{w.samenvatting}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="partner gutter" aria-labelledby="peil-t5">
        <div className="in">
          <p className="bovenregel">{p.bovenregel}</p>
          <h2 id="peil-t5">{p.titel}</h2>
          <p className="smal">{p.tekst}</p>
          <div className="vakken">
            <div className="vak bronregel">
              <h3>{p.bronTitel}</h3>
              <KopieerBronregel
                tekst={vul(p.bronregel, waarden)}
                knop={p.kopieer}
                gekopieerd={p.gekopieerd}
                terugval={p.terugval}
              />
            </div>
            <div className="vak">
              <h3>{p.licentieTitel}</h3>
              <p>
                {p.licentie}{" "}
                <a href={p.licentieHref} rel="noopener noreferrer">
                  {p.licentieLink}
                </a>
              </p>
            </div>
            <div className="vak">
              <h3>{p.apiTitel}</h3>
              <p>
                {vul(p.api.voor, { aantal: String(getPeilAantal()) })}{" "}
                <a className="pad" href={p.api.pad}>{p.api.pad}</a>. {p.api.midden}{" "}
                <a className="pad" href={p.api.padIndex}>{p.api.padIndex}</a> {p.api.padToolVoor} <span className="pad">{p.api.padTool}</span>. {p.api.na}
              </p>
            </div>
            <div className="vak">
              <h3>{p.samenTitel}</h3>
              <p>{p.samenTekst}</p>
              <Link className="verder" href={p.samenHref}>
                {p.samenLink} &rarr;
              </Link>
            </div>
          </div>
          <p className="voorbehoud smal">{p.voorbehoud}</p>
        </div>
      </section>
    </div>
  );
}
