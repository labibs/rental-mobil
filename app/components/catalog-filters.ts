import type { CarItem, OfferMode } from "../data/cars";

export type SearchMode = "sewa" | "beli" | "bekas";

export type Filters = {
  mode: SearchMode;
  brand: string;
  type: string;
  maxPrice: number;
  query: string;
};

export const defaultFilters: Filters = {
  mode: "sewa",
  brand: "",
  type: "",
  maxPrice: 0,
  query: "",
};

export const rentPriceOptions = [
  { value: 0, label: "Semua harga" },
  { value: 400_000, label: "≤ Rp 400 rb / hari" },
  { value: 700_000, label: "≤ Rp 700 rb / hari" },
  { value: 1_000_000, label: "≤ Rp 1 jt / hari" },
  { value: 2_000_000, label: "≤ Rp 2 jt / hari" },
];

export const buyPriceOptions = [
  { value: 0, label: "Semua harga" },
  { value: 250_000_000, label: "≤ Rp 250 jt" },
  { value: 400_000_000, label: "≤ Rp 400 jt" },
  { value: 600_000_000, label: "≤ Rp 600 jt" },
  { value: 1_000_000_000, label: "≤ Rp 1 M" },
];

export function offerModeOf(mode: SearchMode): OfferMode {
  return mode === "sewa" ? "Rent Car" : "Buy Car";
}

export function matchesFilters(car: CarItem, filters: Filters, category: string) {
  const offerMode = offerModeOf(filters.mode);
  if (!car.modes.includes(offerMode)) return false;
  if (filters.mode === "beli" && car.condition !== "New Car") return false;
  if (filters.mode === "bekas" && car.condition !== "User Car") return false;
  if (filters.brand && car.brand !== filters.brand) return false;
  if (filters.type && car.type !== filters.type) return false;

  const price = filters.mode === "sewa" ? car.rentPrice : car.buyPrice;
  if (filters.maxPrice && price > filters.maxPrice) return false;

  if (category === "Listrik" && car.fuel !== "Listrik") return false;
  if (category === "Bekas" && car.condition !== "User Car") return false;
  if (!["Populer", "Listrik", "Bekas"].includes(category) && car.type !== category) {
    return false;
  }

  const q = filters.query.trim().toLowerCase();
  if (!q) return true;
  return [car.name, car.brand, car.type, car.location, car.fuel]
    .join(" ")
    .toLowerCase()
    .includes(q);
}
