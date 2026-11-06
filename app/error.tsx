"use client";

import { buttonClass } from "@/components/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="mx-auto w-full max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-forest">Something went wrong</h1>
      <p className="mt-3 text-sm leading-6 text-mist">
        This page could not be shown. You can try again, or go back to the stays list.
      </p>
      <button type="button" onClick={reset} className={`${buttonClass()} mt-6`}>
        Try again
      </button>
    </main>
  );
}
