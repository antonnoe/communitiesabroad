import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Ontdek onze diensten op het gebied van internationale relocatie, community building, culturele integratie en zakelijke mobiliteit.",
};

const diensten = [
  {
    id: "relocatie",
    title: "Relocatie Ondersteuning",
    description:
      "Onze relocatie-experts begeleiden u bij elke stap van uw internationale verhuizing, voor een soepele overgang naar uw nieuwe thuis.",
    features: [
      "Visum- en immigratiebegeleiding",
      "Hulp bij het zoeken en inrichten van een woning",
      "Advies over scholen en onderwijs",
      "Ondersteuning bij bankzaken en administratie",
      "Oriëntatieprogramma's voor vertrek",
    ],
  },
  {
    id: "community",
    title: "Community Building",
    description:
      "Wij creëren en onderhouden levendige expat-gemeenschappen die sociale verbindingen, wederzijdse steun en een gevoel van thuishoren bieden.",
    features: [
      "Netwerkevenementen en sociale bijeenkomsten",
      "Online community platformen",
      "Facilitatie van interessegroepen",
      "Mentorschap en buddy-programma's",
      "Ondersteuningsnetwerken voor gezinnen en partners",
    ],
  },
  {
    id: "cultureel",
    title: "Culturele Integratie",
    description:
      "Onze culturele programma's helpen u de culturele nuances van uw nieuwe omgeving te begrijpen, waarderen en navigeren.",
    features: [
      "Interculturele trainingen en workshops",
      "Ondersteuning bij het leren van de taal",
      "Begeleiding bij lokale gewoonten en etiquette",
      "Culturele onderdompeling-ervaringen",
      "Doorlopende culturele coaching",
    ],
  },
  {
    id: "zakelijk",
    title: "Zakelijke Programma's",
    description:
      "Wij werken samen met organisaties om uitgebreide mobiliteitsprogramma's te ontwikkelen die internationaal talent aantrekken, behouden en ondersteunen.",
    features: [
      "Advies over mondiale mobiliteitsstrategie",
      "Beheer van werknemersrelocatie",
      "Ondersteuningsprogramma's voor partners en gezinnen",
      "Repatriëringplanning",
      "Diversiteits- en inclusie-initiatieven",
    ],
  },
];

export default function DienstenPage() {
  return (
    <>
      {/* Pagina header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Onze Diensten
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Uitgebreide oplossingen voor individuen, gezinnen en organisaties die
            internationale relocatie en community building navigeren.
          </p>
        </div>
      </section>

      {/* Diensten lijst */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-20">
            {diensten.map((dienst, index) => (
              <div
                key={dienst.id}
                id={dienst.id}
                className="grid grid-cols-1 gap-12 lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {dienst.title}
                  </h2>
                  <p className="mt-6 text-lg text-gray-600">
                    {dienst.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {dienst.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary/70"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`flex items-center justify-center rounded-2xl bg-primary/5 p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="text-center">
                    <p className="text-6xl font-bold text-primary/20">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-primary">
                      {dienst.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Op Maat Gemaakt Nodig?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Elke situatie is uniek. Neem contact met ons op om te bespreken hoe
            wij een plan op maat kunnen maken dat past bij uw specifieke
            behoeften.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/85"
            >
              Vraag een Gesprek Aan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
