import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Voor partners",
  description:
    "Communities Abroad voor adverteerders, dienstverleners en samenwerkingspartners die Nederlandstaligen in Frankrijk willen bereiken.",
};

interface Kenmerk {
  heading: string;
  text: string;
}

interface Mogelijkheid {
  heading: string;
  text: string;
}

interface Cijfer {
  waarde: string;
  label: string;
}

interface PartnersContent {
  heading: string;
  intro: string;
  doelgroep: {
    heading: string;
    intro: string;
    kenmerken: Kenmerk[];
  };
  mogelijkheden: {
    heading: string;
    intro: string;
    items: Mogelijkheid[];
  };
  cijfers: {
    heading: string;
    intro: string;
    items: Cijfer[];
  };
  aanpak: {
    heading: string;
    text: string;
  };
  contact: {
    heading: string;
    text: string;
    email: string;
    telefoon: string;
    opmerking: string;
  };
}

export default function PartnersPage() {
  const content = getContent<PartnersContent>("partners");

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
              B2B
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {content.heading}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/85">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Cijfers - meteen onder hero voor impact */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">
              {content.cijfers.heading}
            </p>
            <p className="mt-2 text-base text-gray-600">
              {content.cijfers.intro}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              {content.cijfers.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-primary/15 bg-primary/5 p-6 text-center"
                >
                  <p className="text-3xl font-bold text-primary">
                    {item.waarde}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doelgroep */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.doelgroep.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {content.doelgroep.intro}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {content.doelgroep.kenmerken.map((k) => (
              <div
                key={k.heading}
                className="rounded-xl border border-primary/10 bg-white p-6"
              >
                <h3 className="text-base font-bold text-gray-900">
                  {k.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {k.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mogelijkheden */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.mogelijkheden.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {content.mogelijkheden.intro}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {content.mogelijkheden.items.map((item, i) => (
              <div
                key={item.heading}
                className="flex gap-6 rounded-xl border border-primary/10 bg-white p-6 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="flex-shrink-0 text-2xl font-bold text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aanpak */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl border-l-4 border-primary pl-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.aanpak.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {content.aanpak.text}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              {content.contact.heading}
            </h2>
            <p className="mt-4 text-lg text-white/85">
              {content.contact.text}
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  E-mail
                </p>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="mt-1 inline-block text-lg font-medium text-white transition-colors hover:text-white/80"
                >
                  {content.contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Telefoon
                </p>
                <a
                  href={`tel:${content.contact.telefoon.replace(/\s/g, "")}`}
                  className="mt-1 inline-block text-lg font-medium text-white transition-colors hover:text-white/80"
                >
                  {content.contact.telefoon}
                </a>
              </div>
              <p className="pt-4 text-sm text-white/70">
                {content.contact.opmerking}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
