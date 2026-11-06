import type { Metadata } from "next";
import { Suspense } from "react";
import { StayExplorer, StayListFallback } from "@/components/stay-explorer";
import type { QueryValue } from "@/lib/types";

export const metadata: Metadata = {
  title: "Explore Stays",
  description:
    "Browse sample stays in Colombo, Kandy, Ella, Galle, Mirissa, and Nuwara Eliya. Filter by destination, guests, and price.",
};

export default function StaysPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, QueryValue>>;
}) {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
        Explore Stays
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight text-forest sm:text-5xl">
        Twelve sample stays across the island
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-mist">
        Filter by town, property type, guests, or price. The choices stay in the URL. Rates are
        examples, and booking requests are not sent anywhere.
      </p>
      <Suspense fallback={<StayListFallback />}>
        <StayExplorer searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
