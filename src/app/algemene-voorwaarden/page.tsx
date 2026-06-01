import type { Metadata } from "next";
import { getLegalDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Algemene Voorwaarden van Communities Abroad — voorwaarden voor het gebruik van ons netwerk van platforms en diensten.",
};

export default function AlgemeneVoorwaardenPage() {
  const { style, body } = getLegalDocument("algemene-voorwaarden");

  return (
    <section className="bg-white py-12">
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}
