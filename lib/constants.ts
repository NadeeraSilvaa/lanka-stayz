export const DESTINATIONS = [
  "Colombo",
  "Kandy",
  "Ella",
  "Galle",
  "Mirissa",
  "Nuwara Eliya",
] as const;

export type Destination = (typeof DESTINATIONS)[number];

export const PROPERTY_TYPES = [
  "apartment",
  "hotel",
  "villa",
  "guesthouse",
  "bungalow",
  "cabin",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const TYPE_LABELS: Record<PropertyType, string> = {
  apartment: "Apartment",
  hotel: "Hotel",
  villa: "Villa",
  guesthouse: "Guesthouse",
  bungalow: "Bungalow",
  cabin: "Cabin",
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
