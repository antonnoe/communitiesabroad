import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://communitiesabroad.com"),
  title: {
    default: "Communities Abroad — Nederlandstalig netwerk van platforms voor Frankrijk",
    template: "%s · Communities Abroad",
  },
  description:
    "Communities Abroad ontwikkelt en onderhoudt het Nederlandstalige netwerk van platforms voor Nederlanders en Belgen in Frankrijk: forum, kennisplatform, AI-assistent, persoonlijk dossier, dienstverlenergids en dagelijkse nieuwsbrief. Sinds 2002.",
  icons: {
    icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Communities Abroad",
    description:
      "Het Nederlandstalige netwerk van platforms voor Nederlanders en Belgen in Frankrijk. Sinds 2002.",
    url: "https://communitiesabroad.com",
    siteName: "Communities Abroad",
    images: [
      {
        url: "/logo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Communities Abroad",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Communities Abroad",
    description:
      "Het Nederlandstalige netwerk van platforms voor Nederlanders en Belgen in Frankrijk. Sinds 2002.",
    images: ["/logo/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
