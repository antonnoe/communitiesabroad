import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met CommunitiesAbroad. Wij staan klaar om u te helpen met uw internationale relocatie en community-behoeften.",
};

const contactMethoden = [
  {
    title: "E-mail",
    value: "info@communitiesabroad.com",
    href: "mailto:info@communitiesabroad.com",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    title: "Telefoon",
    value: "+31 (0)20 123 4567",
    href: "tel:+31201234567",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
  },
  {
    title: "Kantoor",
    value: "Amsterdam, Nederland",
    href: null,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Pagina header */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Heeft u vragen of wilt u aan de slag? Wij horen graag van u. Ons
            team reageert binnen 24 uur.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contactformulier */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Stuur Ons een Bericht
              </h2>
              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Voornaam
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                      placeholder="Jan"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Achternaam
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                      placeholder="de Vries"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                    placeholder="jan@voorbeeld.nl"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Onderwerp
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-primary focus:ring-primary focus:outline-none"
                  >
                    <option value="">Kies een onderwerp</option>
                    <option value="relocatie">Relocatie Ondersteuning</option>
                    <option value="community">Community Building</option>
                    <option value="cultureel">Culturele Integratie</option>
                    <option value="zakelijk">Zakelijke Programma&apos;s</option>
                    <option value="overig">Overig</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                    placeholder="Vertel ons hoe we u kunnen helpen..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/85 sm:w-auto"
                >
                  Verstuur Bericht
                </button>
              </form>
            </div>

            {/* Contactgegevens */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bereik Ons Direct
              </h2>
              <p className="mt-4 text-gray-600">
                Liever direct contact opnemen? Gebruik een van onderstaande
                mogelijkheden.
              </p>
              <div className="mt-8 space-y-6">
                {contactMethoden.map((methode) => (
                  <div key={methode.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {methode.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {methode.title}
                      </h3>
                      {methode.href ? (
                        <a
                          href={methode.href}
                          className="mt-1 text-sm text-gray-600 transition-colors hover:text-primary"
                        >
                          {methode.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-gray-600">
                          {methode.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-xl bg-primary/5 p-8">
                <h3 className="text-lg font-semibold text-gray-900">
                  Openingstijden
                </h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>Maandag – Vrijdag: 9:00 – 18:00</p>
                  <p>Zaterdag – Zondag: Gesloten</p>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Wij streven ernaar alle berichten binnen 24 uur te
                  beantwoorden op werkdagen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
