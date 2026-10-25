import type { Metadata } from "next";
import Link from "next/link";
import "../toolkaart.css";
import { getContent } from "@/lib/content";
import { datumKort, datumLang, getToolIndex } from "@/lib/toolkaart";

interface OverzichtTekst {
  overzicht: {
    titel: string;
    beschrijving: string;
    intro: string;
    bekijk: string;
    bedragenWoord: string;
  };
  naarTool: string;
  standRegel: string;
  tegels: Record<string, string>;
}

export function generateMetadata(): Metadata {
  const t = getContent<OverzichtTekst>("toolkaart");
  return {
    title: t.overzicht.titel,
    description: t.overzicht.beschrijving,
    alternates: { canonical: "/manifest/tools" },
  };
}

export default function ToolkaartenPage() {
  const t = getContent<OverzichtTekst>("toolkaart");
  const index = getToolIndex();
  const o = t.overzicht;
  return (
    <div className="tk">
      <header className="lijst-kop">
        <h1>{o.titel}</h1>
        <p>{o.intro}</p>
        <p>
          {t.standRegel} {datumLang(index.stand)}.
        </p>
      </header>
      <div className="lijst">
        {index.tools.map((k) => {
          const leeg = k.rekenwijze === "niet in register";
          const controle = k.aantal_gecontroleerde_stappen < k.aantal_rekenstappen;
          return (
            <div className="tk-scherm" key={k.slug} style={{ width: "100%" }}>
              <article className="lijstkaart">
                <div className="in">
                  <h2>{k.naam}</h2>
                  {k.omschrijving ? <p className="wat">{k.omschrijving}</p> : null}
                  <div className="acties">
                    <Link className="naartool" href={`/manifest/tool/${k.slug}`}>
                      {o.bekijk}
                    </Link>
                    <a className="tweede" href={k.url} rel="noopener noreferrer">
                      {t.naarTool} <span aria-hidden="true">&#8599;</span>
                    </a>
                  </div>
                </div>
                <div className="samen">
                  <div className="tegel">
                    <span className="getal">{k.aantal_bedragen}</span>
                    <span className="uitleg">{o.bedragenWoord} gecontroleerd</span>
                  </div>
                  <div className={"tegel" + (leeg || controle ? " let" : "")}>
                    <span className="getal">{k.aantal_rekenstappen}</span>
                    <span className="uitleg">
                      {t.tegels.stappenWoord}{", "}
                      {leeg ? (
                        <strong>{t.tegels.stappenLeeg}</strong>
                      ) : controle ? (
                        <strong>{t.tegels.stappenAantal.replace("{n}", String(k.aantal_gecontroleerde_stappen))}</strong>
                      ) : (
                        t.tegels.stappenAantal.replace("{n}", String(k.aantal_gecontroleerde_stappen))
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
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
