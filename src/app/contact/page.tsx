import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Communities Abroad — algemeen contact, specifieke onderwerpen en bedrijfsgegevens.",
};

interface SpecifiekItem {
  heading: string;
  text: string;
  linkLabel: string;
  linkHref: string;
}

interface ContactContent {
  heading: string;
  intro: string;
  algemeen: {
    heading: string;
    email: string;
    telefoon: string;
    reactietijd: string;
  };
  specifiek: {
    heading: string;
    intro: string;
    items: SpecifiekItem[];
  };
  bedrijf: {
    heading: string;
    naam: string;
    adres: string;
    postcode: string;
    plaats: string;
    land: string;
    kvk: string;
  };
}

export default function ContactPage() {
  const content = getContent<ContactContent>("contact");

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

      {/* Algemeen */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.algemeen.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                  E-mail
                </p>
                <a
                  href={`mailto:${content.algemeen.email}`}
                  className="mt-1 inline-block text-lg font-medium text-gray-900 transition-colors hover:text-primary"
                >
                  {content.algemeen.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                  Telefoon
                </p>
                <a
                  href={`tel:${content.algemeen.telefoon.replace(/\s/g, "")}`}
                  className="mt-1 inline-block text-lg font-medium text-gray-900 transition-colors hover:text-primary"
                >
                  {content.algemeen.telefoon}
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              {content.algemeen.reactietijd}
            </p>
          </div>
        </div>
      </section>

      {/* Specifieke onderwerpen */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.specifiek.heading}
            </h2>
            <p className="mt-4 text-base text-gray-600">
              {content.specifiek.intro}
            </p>
            <div className="mt-10 space-y-4">
              {content.specifiek.items.map((item) => {
                const isExternal = item.linkHref.startsWith("http");
                const LinkComponent = isExternal ? "a" : Link;
                const linkProps = isExternal
                  ? { href: item.linkHref, target: "_blank", rel: "noopener noreferrer" }
                  : { href: item.linkHref };
                return (
                  <div
                    key={item.heading}
                    className="rounded-xl border border-primary/10 bg-white p-6"
                  >
                    <h3 className="text-base font-bold text-gray-900">
                      {item.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                    <LinkComponent
                      {...linkProps}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {item.linkLabel}
                      <span aria-hidden>→</span>
                    </LinkComponent>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bedrijfsgegevens */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl border-t border-primary/10 pt-12">
            <h2 className="text-base font-semibold uppercase tracking-widest text-primary/70">
              {content.bedrijf.heading}
            </h2>
            <address className="mt-4 not-italic text-base text-gray-700">
              <p className="font-semibold text-gray-900">{content.bedrijf.naam}</p>
              <p>{content.bedrijf.adres}</p>
              <p>
                {content.bedrijf.postcode} {content.bedrijf.plaats}
              </p>
              <p>{content.bedrijf.land}</p>
              <p className="mt-3 text-sm text-gray-600">
                KvK {content.bedrijf.kvk}
              </p>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
