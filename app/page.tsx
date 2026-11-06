import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/hero-search";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading, buttonClass } from "@/components/ui";
import { destinationGuides, getFeaturedProperties, heroImage } from "@/lib/data/properties";
import { staysHref } from "@/lib/filters";

export default function HomePage() {
  const featured = getFeaturedProperties();

  return (
    <main id="main">
      <section className="relative isolate min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover motion-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/35 to-forest/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-4 pb-10 pt-20 sm:pb-16 sm:pt-28">
          <p className="motion-fade-up font-display text-2xl tracking-tight text-white sm:text-3xl">
            Lanka Stayz
          </p>
          <h1 className="motion-fade-up-delay mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-white sm:text-6xl">
            Discover Your Perfect Stay in Sri Lanka
          </h1>
          <p className="motion-fade-up-delay-2 mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
            Browse villas, boutique hotels, and holiday homes across the island. Search by town,
            dates, and guests — then request a booking in minutes.
          </p>
          <div className="motion-fade-up-delay-2">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading eyebrow="Destinations" title="Start with a town">
          Six regions travellers ask for most. Each link opens Explore Stays with that destination
          already selected.
        </SectionHeading>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {destinationGuides.map((guide) => (
            <li key={guide.destination}>
              <Link
                href={staysHref({ destination: guide.destination })}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <span className="block font-display text-xl sm:text-2xl">{guide.destination}</span>
                  <span className="mt-1 block text-sm text-white/85">{guide.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Featured stays" title="Six places to start">
              A curated sample from the catalogue. Open any stay for photos, amenities, and a
              booking request.
            </SectionHeading>
            <Link href="/stays" className={buttonClass("secondary")}>
              Explore all stays
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <li key={property.slug}>
                <PropertyCard property={property} href={`/stays/${property.slug}`} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading eyebrow="Why Lanka Stayz" title="Built for a clearer first look">
          A prototype booking experience focused on search, property detail, and a validated
          request — without payment clutter.
        </SectionHeading>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Search that sticks",
              text: "Destination, dates, and guests stay in the URL, so a shortlist is easy to share or reopen.",
            },
            {
              title: "Rates in LKR",
              text: "Every card shows the nightly price in Sri Lankan rupees before you open the stay.",
            },
            {
              title: "Request, not checkout",
              text: "Book Now validates guest details and shows a reference. No card is charged in this preview.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-line pt-5">
              <h2 className="font-display text-2xl text-forest">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mist">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
