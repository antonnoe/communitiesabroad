import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our international relocation, community building, cultural integration, and corporate mobility services.",
};

const services = [
  {
    id: "relocation",
    title: "Relocation Support",
    description:
      "Our relocation experts guide you through every step of your international move, ensuring a smooth transition to your new home.",
    features: [
      "Visa and immigration guidance",
      "Housing search and setup assistance",
      "School and education advisory",
      "Banking and administrative support",
      "Pre-departure orientation programs",
    ],
  },
  {
    id: "community",
    title: "Community Building",
    description:
      "We create and nurture vibrant expat communities that provide social connections, mutual support, and a sense of belonging.",
    features: [
      "Networking events and social gatherings",
      "Online community platforms",
      "Interest-based group facilitation",
      "Mentorship and buddy programs",
      "Family and partner support networks",
    ],
  },
  {
    id: "cultural",
    title: "Cultural Integration",
    description:
      "Our cultural programs help you understand, appreciate, and navigate the cultural nuances of your new environment.",
    features: [
      "Cross-cultural training workshops",
      "Language learning support",
      "Local customs and etiquette guidance",
      "Cultural immersion experiences",
      "Ongoing cultural coaching",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Programs",
    description:
      "We partner with organizations to create comprehensive mobility programs that attract, retain, and support international talent.",
    features: [
      "Global mobility strategy consulting",
      "Employee relocation management",
      "Spouse and family support programs",
      "Repatriation planning",
      "Diversity and inclusion initiatives",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-primary-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-100">
            Comprehensive solutions for individuals, families, and organizations
            navigating international relocation and community building.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {service.title}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {service.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-12 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="text-center">
                    <p className="text-6xl font-bold text-primary-200">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-primary-700">
                      {service.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Need a Tailored Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Every situation is unique. Contact us to discuss how we can create a
            customized plan that fits your specific needs.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
