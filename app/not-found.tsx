import Link from "next/link";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">404</p>
      <h1 className="mt-2 font-display text-4xl text-forest">That page is not on the map</h1>
      <p className="mt-3 text-sm leading-6 text-mist">
        The stay may have been renamed, or the address was typed wrong. The catalogue is still on
        Explore Stays.
      </p>
      <Link href="/stays" className={`${buttonClass()} mt-6`}>
        Explore Stays
      </Link>
    </main>
  );
}
