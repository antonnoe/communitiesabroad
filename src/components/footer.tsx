import Link from "next/link";

const footerLinks = {
  bedrijf: [
    { name: "Over Ons", href: "/over-ons" },
    { name: "Diensten", href: "/diensten" },
    { name: "Contact", href: "/contact" },
  ],
  diensten: [
    { name: "Relocatie Ondersteuning", href: "/diensten#relocatie" },
    { name: "Community Building", href: "/diensten#community" },
    { name: "Culturele Integratie", href: "/diensten#cultureel" },
    { name: "Zakelijke Programma's", href: "/diensten#zakelijk" },
  ],
  juridisch: [
    { name: "Privacyverklaring", href: "/privacyverklaring" },
    { name: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Merk */}
          <div>
            <span className="text-xl font-bold text-white">
              Communities<span className="text-white/60">Abroad</span>
            </span>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Wij helpen individuen en organisaties om te floreren in
              internationale gemeenschappen. Bruggen bouwen tussen culturen en
              grenzen.
            </p>
          </div>

          {/* Bedrijf links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Bedrijf</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diensten links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Diensten</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.diensten.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisch links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Juridisch</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.juridisch.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-sm text-white/40">
            &copy; {new Date().getFullYear()} CommunitiesAbroad. Alle rechten
            voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
