import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "De diensten van Communities Abroad: platforms en tools voor particulieren, en marketing- en samenwerkingsmogelijkheden voor professionals.",
};

interface DienstItem {
  name: string;
  platform?: string;
  description: string;
  url?: string | null;
}

interface DienstenContent {
  heading: string;
  intro: string;
  gebruikers: {
    heading: string;
    intro: string;
    items: DienstItem[];
  };
  abonnement: {
    heading: string;
    text: string;
    cta: { label: string; href: string };
  };
  professionals: {
    heading: string;
    text: string;
    cta: { label: string; href: string };
  };
}

export default function DienstenPage() {
  const content = getContent<DienstenContent>("diensten");

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

      {/* Voor gebruikers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.gebruikers.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {content.gebruikers.intro}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-8">
            {content.gebruikers.items.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-primary/10 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h3>
                    {item.platform && (
                      <p className="text-sm font-medium text-primary/70">
                        {item.platform}
                      </p>
                    )}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Bezoek →
                    </a>
                  )}
                </div>
                {item.description.split("\n\n").map((p, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abonnement */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.abonnement.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              {content.abonnement.text}
            </p>
            <div className="mt-8">
              <a
                href={content.abonnement.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/85"
              >
                {content.abonnement.cta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl border-l-4 border-primary pl-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.professionals.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              {content.professionals.text}
            </p>
            <div className="mt-6">
              <Link
                href={content.professionals.cta.href}
                className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {content.professionals.cta.label}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
