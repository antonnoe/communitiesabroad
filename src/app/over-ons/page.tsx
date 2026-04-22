import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Over Communities Abroad — de organisatie achter het Nederlandstalige netwerk van platforms voor Nederlanders en Belgen in Frankrijk. Sinds 2002.",
};

interface Principe {
  heading: string;
  text: string;
}

interface OverOnsContent {
  heading: string;
  intro: string;
  verhaal: { heading: string; paragrafen: string[] };
  principes: { heading: string; items: Principe[] };
  missie: { heading: string; text: string };
  bedrijfsgegevens: {
    heading: string;
    naam: string;
    adres: string;
    postcode: string;
    plaats: string;
    land: string;
    kvk: string;
    email: string;
  };
}

export default function OverOnsPage() {
  const content = getContent<OverOnsContent>("over-ons");

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {content.heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/85">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Het verhaal */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.verhaal.heading}
            </h2>
            <div className="mt-8 space-y-6">
              {content.verhaal.paragrafen.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principes */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.principes.heading}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {content.principes.items.map((item) => (
                <div
                  key={item.heading}
                  className="rounded-xl border border-primary/10 bg-white p-8"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Missie */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl border-l-4 border-primary pl-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.missie.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {content.missie.text}
            </p>
          </div>
        </div>
      </section>

      {/* Bedrijfsgegevens */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.bedrijfsgegevens.heading}
            </h2>
            <address className="mt-6 grid grid-cols-1 gap-2 not-italic text-base text-gray-700 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">
                  Onderneming
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {content.bedrijfsgegevens.naam}
                </p>
                <p>KvK {content.bedrijfsgegevens.kvk}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">
                  Adres
                </p>
                <p className="mt-1">{content.bedrijfsgegevens.adres}</p>
                <p>
                  {content.bedrijfsgegevens.postcode}{" "}
                  {content.bedrijfsgegevens.plaats}
                </p>
                <p>{content.bedrijfsgegevens.land}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">
                  E-mail
                </p>
                <a
                  href={`mailto:${content.bedrijfsgegevens.email}`}
                  className="mt-1 inline-block text-primary transition-colors hover:text-primary/80"
                >
                  {content.bedrijfsgegevens.email}
                </a>
              </div>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
