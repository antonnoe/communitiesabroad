import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CommunitiesAbroad — our mission, values, and the team behind our international community services.",
};

const values = [
  {
    title: "Connection",
    description:
      "We believe in the power of human connection to transform the experience of living abroad.",
  },
  {
    title: "Inclusion",
    description:
      "Every individual deserves to feel welcome and supported, regardless of where they come from.",
  },
  {
    title: "Expertise",
    description:
      "Our deep knowledge of international relocation ensures our clients receive the best guidance.",
  },
  {
    title: "Impact",
    description:
      "We measure our success by the positive difference we make in the lives of the people we serve.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-primary-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About Us
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-100">
            For over 15 years, CommunitiesAbroad has been the trusted partner
            for people and organizations navigating life across borders.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Mission
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                CommunitiesAbroad was founded with a simple but powerful mission:
                to make the world feel smaller by helping people build meaningful
                lives wherever they go.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We understand that moving to a new country is more than
                logistics — it&apos;s about finding your place, building
                relationships, and feeling at home. Our comprehensive approach
                addresses both the practical and personal aspects of
                international relocation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                What started as a small consultancy helping expat families has
                grown into a full-service organization supporting thousands of
                individuals and hundreds of corporations across more than 50
                countries.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Our team of international relocation specialists, cultural
                advisors, and community managers brings firsthand experience of
                living and working abroad, giving us unique insight into the
                challenges our clients face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Our Values
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-primary-700">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Want to Work With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Whether you&apos;re planning a move or looking for a partner to
            support your global workforce, we&apos;d love to hear from you.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
