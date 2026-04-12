import Link from "next/link";

const diensten = [
  {
    title: "Relocatie Ondersteuning",
    description:
      "Begeleiding van A tot Z bij internationale verhuizingen, van visumaanvraag tot het opbouwen van een nieuw thuis.",
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    title: "Community Building",
    description:
      "Het creëren van levendige expat-gemeenschappen die verbinding, steun en gedeelde ervaringen bevorderen.",
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    title: "Culturele Integratie",
    description:
      "Programma's en begeleiding om culturele verschillen te overbruggen en lokale connecties op te bouwen.",
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "Zakelijke Programma's",
    description:
      "Maatwerkoplossingen voor bedrijven die internationaal talent beheren en mondiale teams ondersteunen.",
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
  },
];

const cijfers = [
  { value: "50+", label: "Landen wereldwijd" },
  { value: "10.000+", label: "Mensen begeleid" },
  { value: "200+", label: "Zakelijke partners" },
  { value: "15+", label: "Jaar ervaring" },
];

export default function Home() {
  return (
    <>
      {/* Hero sectie */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Bloeiende Gemeenschappen{" "}
              <span className="text-white/70">Over Grenzen Heen</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Wij helpen individuen, gezinnen en organisaties bij de
              complexiteit van internationale verhuizingen en het opbouwen van
              betekenisvolle connecties in hun nieuwe gemeenschap.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/diensten"
                className="rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90"
              >
                Onze Diensten
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Neem Contact Op
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cijfers sectie */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cijfers.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diensten overzicht */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hoe Wij Helpen
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Uitgebreide ondersteuning bij elke fase van uw internationale
              reis.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diensten.map((dienst) => (
              <div
                key={dienst.title}
                className="rounded-xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {dienst.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {dienst.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {dienst.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/diensten"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Meer over onze diensten &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA sectie */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Klaar om te Beginnen?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Of u nu als individu een verhuizing plant of als bedrijf
            internationaal talent wilt ondersteunen — wij staan voor u klaar.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90"
            >
              Neem Contact Op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
