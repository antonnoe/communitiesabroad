import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Leer meer over CommunitiesAbroad — onze missie, waarden en het team achter onze internationale gemeenschapsdiensten.",
};

const waarden = [
  {
    title: "Verbinding",
    description:
      "Wij geloven in de kracht van menselijke verbinding om de ervaring van wonen in het buitenland te transformeren.",
  },
  {
    title: "Inclusie",
    description:
      "Ieder individu verdient het om zich welkom en gesteund te voelen, ongeacht waar hij of zij vandaan komt.",
  },
  {
    title: "Expertise",
    description:
      "Onze diepgaande kennis van internationale relocatie zorgt ervoor dat onze klanten de beste begeleiding krijgen.",
  },
  {
    title: "Impact",
    description:
      "Wij meten ons succes af aan het positieve verschil dat we maken in het leven van de mensen die we begeleiden.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      {/* Pagina header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Over Ons
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Al meer dan 15 jaar is CommunitiesAbroad de vertrouwde partner voor
            mensen en organisaties die over grenzen heen leven en werken.
          </p>
        </div>
      </section>

      {/* Missie sectie */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Onze Missie
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                CommunitiesAbroad is opgericht met een eenvoudige maar krachtige
                missie: de wereld kleiner laten voelen door mensen te helpen een
                betekenisvol leven op te bouwen, waar ze ook naartoe gaan.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Wij begrijpen dat verhuizen naar een nieuw land meer is dan
                logistiek — het gaat om je plek vinden, relaties opbouwen en je
                thuis voelen. Onze integrale aanpak richt zich op zowel de
                praktische als de persoonlijke aspecten van internationale
                relocatie.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Ons Verhaal
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Wat begon als een klein adviesbureau voor expat-gezinnen is
                uitgegroeid tot een volledige organisatie die duizenden
                individuen en honderden bedrijven ondersteunt in meer dan 50
                landen.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Ons team van internationale relocatie-specialisten, cultureel
                adviseurs en community managers brengt eigen ervaring mee met
                wonen en werken in het buitenland. Dat geeft ons uniek inzicht
                in de uitdagingen waar onze klanten voor staan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waarden sectie */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Onze Waarden
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {waarden.map((waarde) => (
              <div
                key={waarde.title}
                className="rounded-xl bg-white p-8 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {waarde.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {waarde.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Samenwerken?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Of u nu een verhuizing plant of een partner zoekt voor uw
            internationale personeelsbestand — wij horen graag van u.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/85"
            >
              Neem Contact Op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
