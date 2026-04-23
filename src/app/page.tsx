import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";

interface Platform {
  name: string;
  subtitle: string;
  description: string;
  url: string | null;
}

interface Pijler {
  letter: string;
  heading: string;
  subheading: string;
  text: string;
}

interface HomeContent {
  hero: {
    heading: string;
    subheading: string;
    cta1: { label: string; href: string };
    cta2: { label: string; href: string };
  };
  pijlers: {
    intro: string;
    items: Pijler[];
  };
  platforms: {
    intro: string;
    items: Platform[];
  };
  samenhang: {
    heading: string;
    text: string;
  };
  partnersCta: {
    heading: string;
    text: string;
    cta: { label: string; href: string };
  };
}

const LOGO_RED = "#FE0000";
const LOGO_BLUE = "#0071C1";

const platformIcons: Record<string, React.ReactNode> = {
  "Nederlanders.fr": (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  "Infofrankrijk.com": (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  "Café Claude": (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  DossierFrankrijk: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  NederGids: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Frankrijknieuws: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

export default function Home() {
  const content = getContent<HomeContent>("home");

  return (
    <>
      {/* Hero — transparante bordeaux tint, logo rechts, bordeaux tekst */}
      <section
        className="border-b border-primary/10"
        style={{ backgroundColor: "rgba(128,0,0,0.10)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-5 lg:items-center lg:px-8 lg:py-32">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {content.hero.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary/85">
              {content.hero.subheading}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={content.hero.cta1.href}
                className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/85 hover:text-white"
              >
                {content.hero.cta1.label}
              </Link>
              <Link
                href={content.hero.cta2.href}
                className="rounded-lg border-2 border-primary bg-white px-6 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                {content.hero.cta2.label}
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-2">
            <Image
              src="/logo/ca-logo-480.png"
              alt="Communities Abroad"
              width={480}
              height={378}
              priority
              className="h-auto w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Hart en hoofd — blauw/rood accenten */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Hart en hoofd
            </h2>
            <p className="mx-auto mt-4 text-lg text-gray-600">
              {content.pijlers.intro}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {content.pijlers.items.map((pijler, i) => {
              const isHart = i === 0;
              const accent = isHart ? LOGO_BLUE : LOGO_RED;
              return (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border-2 bg-white p-10"
                  style={{
                    borderColor: isHart ? "rgba(0,113,193,0.18)" : "rgba(254,0,0,0.15)",
                    background: isHart
                      ? "linear-gradient(135deg, rgba(0,113,193,0.05) 0%, #fff 60%)"
                      : "linear-gradient(135deg, rgba(254,0,0,0.04) 0%, #fff 60%)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 select-none font-heading text-[10rem] font-bold leading-none"
                    style={{
                      color: isHart ? "rgba(0,113,193,0.08)" : "rgba(254,0,0,0.06)",
                    }}
                  >
                    {pijler.letter}
                  </div>
                  <div className="relative">
                    <p
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: accent }}
                    >
                      {pijler.subheading}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-gray-900">
                      {pijler.heading}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-gray-600">
                      {pijler.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* De platforms */}
      <section id="platforms" className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              De platforms
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              {content.platforms.intro}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.platforms.items.map((platform) => (
              <div
                key={platform.name}
                className="group relative rounded-xl border border-primary/10 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {platformIcons[platform.name]}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {platform.name}
                </h3>
                <p className="text-sm font-medium text-primary/70">
                  {platform.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {platform.description}
                </p>
                {platform.url && (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Bezoek {platform.name}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De samenhang */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.samenhang.heading}
            </h2>
            {content.samenhang.text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mt-6 text-lg leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Partners CTA */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {content.partnersCta.heading}
            </h2>
            <p className="mt-6 text-lg text-white/85">
              {content.partnersCta.text}
            </p>
            <div className="mt-10">
              <Link
                href={content.partnersCta.cta.href}
                className="inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90"
              >
                {content.partnersCta.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
