"use client";

import Image from "next/image";
import { useState } from "react";
import type { StayImage } from "@/lib/types";

export function PropertyGallery({ images, name }: { images: StayImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              aria-label={`Show photo ${index + 1} of ${name}: ${image.alt}`}
              className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon ${
                index === active ? "ring-2 ring-lagoon" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-6 text-mist">
        {current.alt}{" "}
        <a
          href={current.credit.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-palm underline-offset-2 hover:underline"
        >
          Photo: {current.credit.photographer}
        </a>
        , {current.credit.license}. Area photograph, not a picture of this exact building.
      </p>
    </div>
  );
}
