"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { buttonClass } from "@/components/ui";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/stays", label: "Explore Stays" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                isActive(pathname, link.href)
                  ? "bg-foam text-forest"
                  : "text-mist hover:bg-foam hover:text-forest"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/stays" className={`${buttonClass("accent")} ml-2`}>
            Find a stay
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-line p-2 text-forest transition hover:bg-foam md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-paper px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive(pathname, link.href) ? "bg-foam text-forest" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/stays"
                onClick={() => setOpen(false)}
                className={`${buttonClass("accent")} w-full`}
              >
                Find a stay
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function HeaderFallback() {
  return <div className="h-16 border-b border-line bg-paper" aria-hidden="true" />;
}
