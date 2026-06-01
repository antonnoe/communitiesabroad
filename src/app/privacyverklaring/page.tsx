import type { Metadata } from "next";
import { getLegalDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Communities Abroad — hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen binnen ons netwerk van platforms.",
};

export default function PrivacyverklaringPage() {
  const { style, body } = getLegalDocument("privacyverklaring");

  return (
    <section className="bg-white py-12">
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}
