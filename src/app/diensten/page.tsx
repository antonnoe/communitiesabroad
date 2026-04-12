import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Ontdek onze platforms en tools voor eindgebruikers, en marketing- en zichtbaarheidsmogelijkheden voor professionals en adverteerders.",
};

interface DienstItem {
  name: string;
  platform?: string;
  description: string;
}

interface DienstenContent {
  heading: string;
  intro: string;
  gebruikers: {
    heading: string;
    items: DienstItem[];
  };
  professionals: {
    heading: string;
    items: DienstItem[];
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {content.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Voor gebruikers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {content.gebruikers.heading}
          </h2>
          <div className="mt-10 space-y-12">
            {content.gebruikers.items.map((item) => (
              <div
                key={item.name}
                className="border-l-4 border-primary/20 pl-6"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {item.name}
                  {item.platform && (
                    <span className="ml-2 text-sm font-medium text-primary/60">
                      ({item.platform})
                    </span>
                  )}
                </h3>
                {item.description.split("\n\n").map((p, i) => (
                  <p key={i} className="mt-3 text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voor professionals */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {content.professionals.heading}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.professionals.items.map((item) => (
              <div
                key={item.name}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href={content.professionals.cta.href}
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/85"
            >
              {content.professionals.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
