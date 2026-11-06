import type { Destination, PropertyType, SortOption } from "@/lib/constants";

export type PhotoCredit = {
  photographer: string;
  license: string;
  source: "Wikimedia Commons";
  sourceUrl: string;
};

export type StayImage = {
  src: string;
  alt: string;
  credit: PhotoCredit;
};

export type Property = {
  slug: string;
  name: string;
  destination: Destination;
  neighbourhood: string;
  type: PropertyType;
  pricePerNightLkr: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
  summary: string;
  description: string;
  amenities: string[];
  images: StayImage[];
};

/** Fields the booking form needs. Kept small so the client bundle stays obvious. */
export type BookingStay = Pick<
  Property,
  "slug" | "name" | "destination" | "neighbourhood" | "pricePerNightLkr" | "maxGuests"
>;

export type QueryValue = string | string[] | undefined;

export type StayFilters = {
  destination: Destination | "";
  type: PropertyType | "";
  guests: number | null;
  sort: SortOption;
  checkIn: string;
  checkOut: string;
};
