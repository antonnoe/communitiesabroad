"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Diensten", href: "/diensten" },
  { name: "Partners", href: "/partners" },
  { name: "Over ons", href: "/over-ons" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Communities Abroad — home"
        >
          <Image
            src="/logo/ca-mark-120.png"
            alt=""
            width={120}
            height={74}
            priority
            className="h-11 w-auto"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-lg font-bold" style={{ color: "#FE0000" }}>
              Communities
            </span>
            <span className="font-heading text-sm font-semibold" style={{ color: "#0071C1" }}>
              Abroad
            </span>
          </span>
        </Link>

        {/* Desktop navigatie */}
        <div className="hidden md:flex md:items-center md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/partners"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/85 hover:text-white"
          >
            Voor partners
          </Link>
        </div>

        {/* Mobiel menu knop */}
        <button
          type="button"
          className="rounded-md p-2 text-gray-700 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu openen"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobiel menu */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/partners"
              className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/85 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Voor partners
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
