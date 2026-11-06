import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { DESTINATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lanka Stayz is a booking preview for villas, hotels, and guesthouses across Sri Lanka, with nightly rates shown in rupees.",
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">About Us</p>
      <h1 className="mt-2 font-display text-4xl text-forest sm:text-5xl">
        A calmer way to look at the island
      </h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-foreground">
        <p>
          Lanka Stayz lists places to sleep in six parts of Sri Lanka: Colombo, Kandy, Ella, Galle,
          Mirissa, and Nuwara Eliya. The idea is simple. Show the nightly rate in rupees, say how
          many people fit, and let a guest send a request without a payment screen in the way.
        </p>
        <p>
          This public preview uses a sample catalogue. The houses, hotels, and bungalows are
          written for the demo. The photographs are real pictures of those towns, credited to the
          photographers, and they are not shots of the fictional buildings.
        </p>
        <p>
          A booking request checks the name, email, Sri Lankan mobile number, dates, and guest
          count, then shows a reference. It does not reserve the room and it does not charge a
          card. That last mile belongs to a full product, with hosts, availability, and payments.
        </p>
      </div>
      <h2 className="mt-10 font-display text-2xl text-forest">Where the catalogue looks</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {DESTINATIONS.map((destination) => (
          <li key={destination} className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-forest">
            {destination}
          </li>
        ))}
      </ul>
      <Link href="/stays" className={`${buttonClass()} mt-8`}>
        Explore Stays
      </Link>
    </main>
  );
}
