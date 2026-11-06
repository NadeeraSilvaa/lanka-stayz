import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { BookingExperience, BookingFallback } from "@/components/booking-experience";
import { CheckIcon } from "@/components/icons";
import { PropertyGallery } from "@/components/property-gallery";
import { TYPE_LABELS } from "@/lib/constants";
import { getPropertyBySlug, properties } from "@/lib/data/properties";
import { todayISO } from "@/lib/dates";
import { formatGuests, formatLkr } from "@/lib/format";
import { parseStayFilters } from "@/lib/filters";
import type { BookingStay, QueryValue } from "@/lib/types";

type StayPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, QueryValue>>;
};

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: StayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Stay not found" };
  return {
    title: property.name,
    description: property.summary,
  };
}

export default async function StayPage({ params, searchParams }: StayPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const stay: BookingStay = {
    slug: property.slug,
    name: property.name,
    destination: property.destination,
    neighbourhood: property.neighbourhood,
    pricePerNightLkr: property.pricePerNightLkr,
    maxGuests: property.maxGuests,
  };

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-mist">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-forest">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/stays" className="hover:text-forest">
              Explore Stays
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-forest">{property.name}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <article>
          <PropertyGallery images={property.images} name={property.name} />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-lagoon">
            {TYPE_LABELS[property.type]} · {property.neighbourhood}, {property.destination}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-forest sm:text-5xl">
            {property.name}
          </h1>
          <p className="mt-3 text-lg text-mist">{property.summary}</p>
          <dl className="mt-6 grid gap-3 rounded-2xl border border-line bg-paper p-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-mist">Nightly rate</dt>
              <dd className="mt-1 font-semibold text-forest">{formatLkr(property.pricePerNightLkr)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-mist">Guests</dt>
              <dd className="mt-1 font-semibold text-forest">Up to {formatGuests(property.maxGuests)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-mist">Rooms</dt>
              <dd className="mt-1 font-semibold text-forest">
                {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
              </dd>
            </div>
          </dl>
          <div className="mt-6 space-y-4 text-base leading-7 text-foreground">
            {property.description.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <h2 className="mt-10 font-display text-2xl text-forest">Amenities</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {property.amenities.map((amenity) => (
              <li
                key={amenity}
                className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-foreground"
              >
                <CheckIcon />
                {amenity}
              </li>
            ))}
          </ul>
        </article>
        <Suspense fallback={<BookingFallback />}>
          <BookingSlot stay={stay} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function BookingSlot({
  stay,
  searchParams,
}: {
  stay: BookingStay;
  searchParams: Promise<Record<string, QueryValue>>;
}) {
  const filters = parseStayFilters(await searchParams);
  await connection();
  const today = todayISO();
  const initialGuests = filters.guests
    ? String(filters.guests)
    : stay.maxGuests >= 2
      ? "2"
      : "1";

  return (
    <BookingExperience
      stay={stay}
      initialCheckIn={filters.checkIn}
      initialCheckOut={filters.checkOut}
      initialGuests={initialGuests}
      today={today}
    />
  );
}
