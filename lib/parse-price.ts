/** Parse display prices like "$1,200.00" into a USD number. */
export function parsePriceUsd(price: string): number {
  const cleaned = price.replace(/[$,\s]/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}
