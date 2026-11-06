import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const word = tone === "light" ? "text-paper" : "text-forest";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
      <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9 shrink-0">
        <rect width="40" height="40" rx="12" fill="#14352b" />
        <path
          d="M8 26.5 20 13l12 13.5"
          fill="none"
          stroke="#f4d35e"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M13 26.5h14V31H13z" fill="#f7f1e4" />
        <circle cx="29" cy="12" r="2.4" fill="#f4d35e" />
      </svg>
      <span className={`font-display text-xl leading-none tracking-tight ${word}`}>
        Lanka Stayz
      </span>
    </Link>
  );
}
