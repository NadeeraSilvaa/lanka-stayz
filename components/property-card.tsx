import Image from "next/image";
import Link from "next/link";
import { TYPE_LABELS } from "@/lib/constants";
import { formatGuests, formatLkr } from "@/lib/format";
import type { Property } from "@/lib/types";

export function PropertyCard({ property, href }: { property: Property; href: string }) {
  const cover = property.images[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-[0_1px_2px_rgba(15,47,38,0.06),0_12px_28px_-16px_rgba(15,47,38,0.28)] transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_1px_2px_rgba(15,47,38,0.06),0_22px_40px_-18px_rgba(15,47,38,0.35)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-forest shadow-sm">
          {TYPE_LABELS[property.type]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-mist">
          {property.neighbourhood}, {property.destination}
        </p>
        <h3 className="mt-1 font-display text-2xl tracking-tight text-forest">
          <Link href={href} className="transition hover:text-palm">
            {property.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-foreground">
          <span className="text-lg font-semibold text-forest">{formatLkr(property.pricePerNightLkr)}</span>
          <span className="text-mist"> / night</span>
        </p>
        <p className="mt-1 text-sm text-mist">Up to {formatGuests(property.maxGuests)}</p>
        <div className="mt-auto pt-5">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-palm-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
