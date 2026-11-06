import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Lanka Stayz desk in Colombo. This preview stores nothing and sends no email.",
};

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">Contact</p>
        <h1 className="mt-2 font-display text-4xl text-forest sm:text-5xl">Talk to Lanka Stayz</h1>
        <p className="mt-4 text-base leading-7 text-mist">
          Questions about a sample stay, or about how this preview works, can be written here. The
          form checks the fields in the browser and then stops.
        </p>
        <address className="mt-8 space-y-1 text-sm not-italic leading-6 text-foreground">
          {site.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <a className="mt-3 block font-semibold text-palm" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <a className="block font-semibold text-palm" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <span className="block text-mist">{site.hours}</span>
        </address>
      </div>
      <ContactForm />
    </main>
  );
}
