import Link from "next/link";
import { getContent } from "@/lib/content";

interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
}

interface FooterContent {
  brand: string;
  platforms: FooterLink[];
  paginas: FooterLink[];
  juridisch: FooterLink[];
  copyright: string;
  social: SocialLink[];
}

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function Footer() {
  const content = getContent<FooterContent>("footer");

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
              {content.brand}
            </p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-semibold text-white">Platforms</h3>
            <ul className="mt-4 space-y-3">
              {content.platforms.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagina's */}
          <div>
            <h3 className="text-sm font-semibold text-white">Pagina&apos;s</h3>
            <ul className="mt-4 space-y-3">
              {content.paginas.map((link) => (
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

          {/* Juridisch */}
          <div>
            <h3 className="text-sm font-semibold text-white">Juridisch</h3>
            <ul className="mt-4 space-y-3">
              {content.juridisch.map((link) => (
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

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/20 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/40">{content.copyright}</p>
          <div className="flex gap-4">
            {content.social.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors hover:text-white"
                aria-label={link.name}
              >
                {socialIcons[link.name]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
