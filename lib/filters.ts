import {
  DESTINATIONS,
  PROPERTY_TYPES,
  type Destination,
  type PropertyType,
  type SortOption,
} from "@/lib/constants";
import { isISODate } from "@/lib/dates";
import type { Property, QueryValue, StayFilters } from "@/lib/types";

function firstValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function emptyFilters(): StayFilters {
  return {
    destination: "",
    type: "",
    guests: null,
    sort: "featured",
    checkIn: "",
    checkOut: "",
  };
}

export function parseStayFilters(
  searchParams: Record<string, QueryValue>,
): StayFilters {
  const destinationRaw = firstValue(searchParams.destination);
  const typeRaw = firstValue(searchParams.type);
  const sortRaw = firstValue(searchParams.sort);
  const guestsRaw = firstValue(searchParams.guests);
  const checkInRaw = firstValue(searchParams.checkIn);
  const checkOutRaw = firstValue(searchParams.checkOut);

  const destination = DESTINATIONS.includes(destinationRaw as Destination)
    ? (destinationRaw as Destination)
    : "";
  const type = PROPERTY_TYPES.includes(typeRaw as PropertyType)
    ? (typeRaw as PropertyType)
    : "";
  const sort: SortOption =
    sortRaw === "price-asc" || sortRaw === "price-desc" ? sortRaw : "featured";

  let guests: number | null = null;
  if (/^\d+$/.test(guestsRaw)) {
    const parsed = Number(guestsRaw);
    if (parsed >= 1 && parsed <= 30) guests = parsed;
  }

  return {
    destination,
    type,
    guests,
    sort,
    checkIn: isISODate(checkInRaw) ? checkInRaw : "",
    checkOut: isISODate(checkOutRaw) ? checkOutRaw : "",
  };
}

export function filterProperties(all: Property[], filters: StayFilters): Property[] {
  const matched = all.filter((property) => {
    if (filters.destination && property.destination !== filters.destination) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.guests && property.maxGuests < filters.guests) return false;
    return true;
  });

  return [...matched].sort((a, b) => {
    if (filters.sort === "price-asc") return a.pricePerNightLkr - b.pricePerNightLkr;
    if (filters.sort === "price-desc") return b.pricePerNightLkr - a.pricePerNightLkr;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return 0;
  });
}

export function staysHref(filters: Partial<StayFilters>): string {
  const params = new URLSearchParams();
  if (filters.destination) params.set("destination", filters.destination);
  if (filters.type) params.set("type", filters.type);
  if (filters.guests) params.set("guests", String(filters.guests));
  if (filters.checkIn) params.set("checkIn", filters.checkIn);
  if (filters.checkOut) params.set("checkOut", filters.checkOut);
  if (filters.sort && filters.sort !== "featured") params.set("sort", filters.sort);
  const query = params.toString();
  return query ? `/stays?${query}` : "/stays";
}

/** Carry dates and guests onto a property page. Destination stays on the listing URL. */
export function detailHref(slug: string, filters: StayFilters): string {
  const params = new URLSearchParams();
  if (filters.checkIn) params.set("checkIn", filters.checkIn);
  if (filters.checkOut) params.set("checkOut", filters.checkOut);
  if (filters.guests) params.set("guests", String(filters.guests));
  const query = params.toString();
  return query ? `/stays/${slug}?${query}` : `/stays/${slug}`;
}

export function filtersKey(filters: StayFilters): string {
  return [
    filters.destination,
    filters.type,
    filters.guests ?? "",
    filters.sort,
    filters.checkIn,
    filters.checkOut,
  ].join("|");
}
