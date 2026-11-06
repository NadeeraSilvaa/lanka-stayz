/** Stable rupee formatting. Avoids locale differences between server and browser. */
export function formatLkr(amount: number): string {
  const rounded = Math.round(amount);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${rounded < 0 ? "-" : ""}LKR ${grouped}`;
}

export function formatGuests(count: number): string {
  return count === 1 ? "1 guest" : `${count} guests`;
}

export function formatNights(count: number): string {
  return count === 1 ? "1 night" : `${count} nights`;
}
