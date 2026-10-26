import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hoe wij werken",
  description:
    "Hoe Communities Abroad zorgt dat haar tools kloppen en werken: Peil, Cockpit, de toolkaarten, het forum als toets en ons manifest.",
};

interface Sectie {
  heading: string;
  paragrafen: string[];
  link?: { label: string; href: string };
}

interface HoeWijWerkenContent {
  heading: string;
  intro: string;
  secties: Sectie[];
  samenvatting: { heading: string; items: { kop: string; tekst: string }[] };
}

function Knop({ href, label }: { href: string; label: string }) {
  const extern = href.startsWith("http");
  const cls =
    "mt-6 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90";
  return extern ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} ↗
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export default function HoeWijWerkenPage() {
  const content = getContent<HoeWijWerkenContent>("hoe-wij-werken");

  return (
    <>
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.heading}</h1>
            <p className="mt-6 text-lg leading-8 text-white/85">{content.intro}</p>
          </div>
        </div>
      </section>

      {content.secties.map((s, i) => (
        <section key={s.heading} className={i % 2 === 0 ? "bg-white py-16" : "bg-primary/5 py-16"}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">{s.heading}</h2>
              <div className="mt-6 space-y-5">
                {s.paragrafen.map((p, j) => (
                  <p key={j} className="text-lg leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
              {s.link ? <Knop href={s.link.href} label={s.link.label} /> : null}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/15 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{content.samenvatting.heading}</h2>
            <ul className="mt-6 space-y-4">
              {content.samenvatting.items.map((it) => (
                <li key={it.kop} className="text-lg leading-relaxed text-gray-700">
                  <strong className="text-primary">{it.kop}</strong> {it.tekst}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
