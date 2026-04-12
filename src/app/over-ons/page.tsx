import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Leer meer over Communities Abroad — ons verhaal, missie en onafhankelijkheid.",
};

interface OverOnsContent {
  heading: string;
  verhaal: { heading: string; text: string };
  missie: { heading: string; text: string };
  onafhankelijkheid: { heading: string; text: string };
  bedrijfsgegevens: {
    heading: string;
    naam: string;
    adres: string;
    postcode: string;
    plaats: string;
    land: string;
    kvk: string;
  };
}

export default function OverOnsPage() {
  const content = getContent<OverOnsContent>("over-ons");

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {content.heading}
          </h1>
        </div>
      </section>

      {/* Verhaal */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {content.verhaal.heading}
            </h2>
            {content.verhaal.text.split("\n\n").map((p, i) => (
              <p key={i} className="mt-6 text-lg text-gray-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Missie & Onafhankelijkheid */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {content.missie.heading}
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                {content.missie.text}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {content.onafhankelijkheid.heading}
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                {content.onafhankelijkheid.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bedrijfsgegevens */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {content.bedrijfsgegevens.heading}
            </h2>
            <address className="mt-6 not-italic text-lg text-gray-600">
              <p className="font-semibold text-gray-900">
                {content.bedrijfsgegevens.naam}
              </p>
              <p>{content.bedrijfsgegevens.adres}</p>
              <p>
                {content.bedrijfsgegevens.postcode}{" "}
                {content.bedrijfsgegevens.plaats}
              </p>
              <p>{content.bedrijfsgegevens.land}</p>
              <p className="mt-4">KvK: {content.bedrijfsgegevens.kvk}</p>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
