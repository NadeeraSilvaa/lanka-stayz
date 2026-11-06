import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export function buttonClass(variant: "primary" | "secondary" | "ghost" | "accent" = "primary"): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-forest text-paper hover:bg-palm-deep",
    accent: "bg-lagoon text-white hover:bg-lagoon-deep",
    secondary: "border border-forest/12 bg-paper text-forest hover:bg-foam",
    ghost: "text-forest hover:bg-foam",
  };
  return `${base} ${variants[variant]}`;
}

export const fieldClass =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:border-palm focus-visible:ring-2 focus-visible:ring-palm/25 aria-[invalid=true]:border-red-600";

function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function Field({
  id,
  label,
  error,
  hint,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactElement<Record<string, unknown>>;
}) {
  const description = describedBy(id, error, hint);
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": description,
        "aria-required": required || undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-forest">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </label>
      <div className="mt-1.5">{control}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-mist">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl tracking-tight text-forest sm:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-base leading-7 text-mist">{children}</p> : null}
    </div>
  );
}
