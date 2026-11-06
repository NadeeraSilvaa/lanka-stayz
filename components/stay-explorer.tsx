import Link from "next/link";
import { connection } from "next/server";
import { PropertyCard } from "@/components/property-card";
import { StayFilters as StayFilterForm } from "@/components/stay-filters";
import { buttonClass } from "@/components/ui";
import { TYPE_LABELS } from "@/lib/constants";
import { formatDisplayDate, todayISO } from "@/lib/dates";
import { properties } from "@/lib/data/properties";
import { detailHref, filterProperties, parseStayFilters, staysHref } from "@/lib/filters";
import type { QueryValue, StayFilters } from "@/lib/types";

export async function StayExplorer({
  searchParams,
}: {
  searchParams: Promise<Record<string, QueryValue>>;
}) {
  const filters = parseStayFilters(await searchParams);
  await connection();
  const today = todayISO();
  const stays = filterProperties(properties, filters);
  const datesNote = dateNote(filters);

  return (
    <div className="mt-8 space-y-6">
      <StayFilterForm filters={filters} today={today} />
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-forest">
          {stays.length === 1 ? "1 stay" : `${stays.length} stays`}
        </p>
        <ActiveChips filters={filters} />
      </div>
      {datesNote ? <p className="text-sm text-lagoon">{datesNote}</p> : null}
      {stays.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-paper px-6 py-16 text-center">
          <h2 className="font-display text-3xl text-forest">No stays match these filters</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mist">
            Try another town, fewer guests, or clear the filters to see the full sample catalogue.
          </p>
          <Link href="/stays" className={`${buttonClass()} mt-6`}>
            Clear filters
          </Link>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stays.map((property) => (
            <li key={property.slug}>
              <PropertyCard property={property} href={detailHref(property.slug, filters)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActiveChips({ filters }: { filters: StayFilters }) {
  const chips: { label: string; href: string }[] = [];
  if (filters.destination) {
    chips.push({
      label: filters.destination,
      href: staysHref({ ...filters, destination: "" }),
    });
  }
  if (filters.type) {
    chips.push({
      label: TYPE_LABELS[filters.type],
      href: staysHref({ ...filters, type: "" }),
    });
  }
  if (filters.guests) {
    chips.push({
      label: `${filters.guests}+ guests`,
      href: staysHref({ ...filters, guests: null }),
    });
  }
  if (filters.sort !== "featured") {
    chips.push({
      label: filters.sort === "price-asc" ? "Lowest price" : "Highest price",
      href: staysHref({ ...filters, sort: "featured" }),
    });
  }
  if (chips.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip.label}>
          <Link
            href={chip.href}
            className="inline-flex items-center gap-2 rounded-full bg-foam px-3 py-1 text-xs font-semibold text-forest"
          >
            {chip.label}
            <span aria-hidden="true">×</span>
            <span className="sr-only">Remove {chip.label} filter</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function dateNote(filters: StayFilters): string | null {
  if (filters.checkIn && filters.checkOut && filters.checkOut <= filters.checkIn) {
    return "Check-out is not after check-in, so these dates will not price a stay.";
  }
  if (filters.checkIn && filters.checkOut) {
    return `Dates selected: ${formatDisplayDate(filters.checkIn)} to ${formatDisplayDate(filters.checkOut)}.`;
  }
  if (filters.checkIn) return `Check-in selected: ${formatDisplayDate(filters.checkIn)}.`;
  if (filters.checkOut) return `Check-out selected: ${formatDisplayDate(filters.checkOut)}.`;
  return null;
}

export function StayListFallback() {
  return (
    <div className="mt-8 space-y-6" aria-hidden="true">
      <div className="h-40 rounded-3xl bg-sand/70" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-80 rounded-3xl bg-sand/70" />
        ))}
      </div>
    </div>
  );
}
