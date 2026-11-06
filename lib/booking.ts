import { nightsBetween } from "@/lib/dates";

export type BookingConfirmation = {
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalLkr: number;
};

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Short reference such as LS-261104-K7Q. Call this from a submit handler, not during render. */
export function createBookingReference(now: Date = new Date()): string {
  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const byte of bytes) {
    code += REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length];
  }
  return `LS-${year}${month}${day}-${code}`;
}

export function quoteStay(
  pricePerNightLkr: number,
  checkIn: string,
  checkOut: string,
): { nights: number; totalLkr: number } | null {
  const nights = nightsBetween(checkIn, checkOut);
  if (!nights) return null;
  return { nights, totalLkr: nights * pricePerNightLkr };
}
