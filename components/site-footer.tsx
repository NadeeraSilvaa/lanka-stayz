import Link from "next/link";
import { Logo } from "@/components/logo";
import { DESTINATIONS } from "@/lib/constants";
import { staysHref } from "@/lib/filters";
import { site, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-forest text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-paper/80">
            {site.tagline} This preview uses sample stays and does not take payment.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {DESTINATIONS.map((destination) => (
              <li key={destination}>
                <Link
                  href={staysHref({ destination })}
                  className="text-paper/85 hover:text-white"
                >
                  {destination}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">Contact</h2>
          <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-paper/85">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a className="mt-2 block hover:text-white" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <a className="block hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span className="block">{site.hours}</span>
          </address>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">Social</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/85 hover:text-white"
                  aria-label={`Lanka Stayz on ${link.label}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-paper/70">
          © {site.year} Lanka Stayz. Sample catalogue for review. Photographs are credited in the
          README.
        </p>
      </div>
    </footer>
  );
}
