"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { fieldClass } from "@/components/ui";
import { DESTINATIONS } from "@/lib/constants";
import { isISODate, todayISO } from "@/lib/dates";

export function HeroSearch() {
  const router = useRouter();
  const [today, setToday] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  function captureToday() {
    setToday((current) => current ?? todayISO());
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const destination = String(data.get("destination") || "");
    const checkIn = String(data.get("checkIn") || "");
    const checkOut = String(data.get("checkOut") || "");
    const guests = String(data.get("guests") || "");

    if (checkIn && !isISODate(checkIn)) {
      setError("Choose a valid check-in date.");
      return;
    }
    if (checkOut && !isISODate(checkOut)) {
      setError("Choose a valid check-out date.");
      return;
    }
    const currentDay = today ?? todayISO();
    if (checkIn && checkIn < currentDay) {
      setError("Check-in cannot be in the past.");
      return;
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    if (guests && (!/^\d+$/.test(guests) || Number(guests) < 1)) {
      setError("Enter at least 1 guest.");
      return;
    }

    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    const query = params.toString();
    router.push(query ? `/stays?${query}` : "/stays");
  }

  return (
    <form
      action="/stays"
      method="get"
      onSubmit={onSubmit}
      className="mt-8 rounded-2xl bg-paper/95 p-3 shadow-[0_24px_60px_-20px_rgba(15,47,38,0.45)] backdrop-blur sm:p-4"
      role="search"
      aria-label="Search stays"
    >
      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_0.75fr_auto] lg:items-end lg:gap-0">
        <div className="lg:px-3">
          <label htmlFor="destination" className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
            Destination
          </label>
          <select id="destination" name="destination" className={`${fieldClass} mt-1.5 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0`} defaultValue="">
            <option value="">Anywhere in Sri Lanka</option>
            {DESTINATIONS.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:border-l lg:border-line lg:px-3">
          <label htmlFor="checkIn" className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
            Check-in date
          </label>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            min={today}
            onFocus={captureToday}
            className={`${fieldClass} mt-1.5 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0`}
          />
        </div>
        <div className="lg:border-l lg:border-line lg:px-3">
          <label htmlFor="checkOut" className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
            Check-out date
          </label>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            min={today}
            onFocus={captureToday}
            className={`${fieldClass} mt-1.5 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0`}
          />
        </div>
        <div className="lg:border-l lg:border-line lg:px-3">
          <label htmlFor="guests" className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
            Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={16}
            inputMode="numeric"
            placeholder="2"
            className={`${fieldClass} mt-1.5 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-lagoon px-7 text-sm font-semibold text-white transition hover:bg-lagoon-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon lg:ml-2"
        >
          Search
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-3 px-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
