"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { fieldClass } from "@/components/ui";
import { DESTINATIONS, PROPERTY_TYPES, SORT_OPTIONS, TYPE_LABELS } from "@/lib/constants";
import { filtersKey } from "@/lib/filters";
import type { StayFilters } from "@/lib/types";

export function StayFilters({ filters, today }: { filters: StayFilters; today: string }) {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, raw] of data.entries()) {
      const value = String(raw);
      if (!value) continue;
      if (key === "sort" && value === "featured") continue;
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `/stays?${query}` : "/stays");
  }

  return (
    <form
      key={filtersKey(filters)}
      action="/stays"
      method="get"
      onSubmit={onSubmit}
      className="grid gap-3 rounded-2xl border border-line bg-paper p-4 shadow-[0_12px_32px_-24px_rgba(15,47,38,0.35)] sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="lg:col-span-2">
        <label htmlFor="filter-destination" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Destination
        </label>
        <select
          id="filter-destination"
          name="destination"
          defaultValue={filters.destination}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
          className={`${fieldClass} mt-1.5`}
        >
          <option value="">All destinations</option>
          {DESTINATIONS.map((destination) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-type" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Type
        </label>
        <select
          id="filter-type"
          name="type"
          defaultValue={filters.type}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
          className={`${fieldClass} mt-1.5`}
        >
          <option value="">All types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-guests" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Guests
        </label>
        <input
          id="filter-guests"
          name="guests"
          type="number"
          min={1}
          max={16}
          inputMode="numeric"
          defaultValue={filters.guests ?? ""}
          placeholder="Any"
          className={`${fieldClass} mt-1.5`}
        />
      </div>
      <div>
        <label htmlFor="filter-sort" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Sort by price
        </label>
        <select
          id="filter-sort"
          name="sort"
          defaultValue={filters.sort}
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
          className={`${fieldClass} mt-1.5`}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-forest px-4 text-sm font-semibold text-paper transition hover:bg-palm-deep"
        >
          Apply
        </button>
      </div>
      <div>
        <label htmlFor="filter-check-in" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Check-in date
        </label>
        <input
          id="filter-check-in"
          name="checkIn"
          type="date"
          min={today}
          defaultValue={filters.checkIn}
          className={`${fieldClass} mt-1.5`}
        />
      </div>
      <div>
        <label htmlFor="filter-check-out" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
          Check-out date
        </label>
        <input
          id="filter-check-out"
          name="checkOut"
          type="date"
          min={today}
          defaultValue={filters.checkOut}
          className={`${fieldClass} mt-1.5`}
        />
      </div>
      <p className="text-xs leading-5 text-mist sm:col-span-2 lg:col-span-4 lg:self-end">
        Dates carry through to each property page. This preview does not check real availability.
      </p>
    </form>
  );
}
