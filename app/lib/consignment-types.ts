import type { CarItem } from "../data/cars";

export type ConsignmentKind = "sewa" | "jual";
export type ConsignmentStatus = "pending" | "approved" | "rejected";

export type Consignment = {
  id: string;
  kind: ConsignmentKind;
  ownerName: string;
  whatsapp: string;
  brand: string;
  name: string;
  year: number;
  transmission: string;
  fuel: string;
  plate: string;
  price: number;
  location: string;
  image: string;
  gallery?: string[];
  description: string;
  status: ConsignmentStatus;
  createdAt: string;
};

export const DEFAULT_CONSIGNMENT_IMAGE =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1100&q=80";

export function consignmentToCarItem(item: Consignment): CarItem {
  const isRent = item.kind === "sewa";
  const displayName = `${item.brand} ${item.name}`.replace(/\s+/g, " ").trim();

  return {
    id: item.id,
    name: displayName,
    brand: item.brand,
    type: "Titipan",
    condition: "User Car",
    modes: [isRent ? "Rent Car" : "Buy Car"],
    tag: isRent ? "Titip Sewa" : "Titip Jual",
    tagClass: isRent ? "blue" : "green",
    buyPrice: isRent ? 0 : item.price,
    rentPrice: isRent ? item.price : 0,
    rating: 5,
    trips: 0,
    seats: 5,
    transmission: item.transmission,
    fuel: item.fuel,
    location: item.location,
    freeTestDrive: false,
    image: item.image,
    gallery: item.gallery && item.gallery.length > 0 ? item.gallery : [item.image],
    description:
      item.description ||
      `${displayName} titipan dari ${item.ownerName}, berlokasi di ${item.location}.`,
    specs: [
      `Tahun ${item.year}`,
      `Transmisi ${item.transmission}`,
      `Bahan bakar ${item.fuel}`,
      item.plate ? `Plat ${item.plate}` : `Lokasi ${item.location}`,
      `Kontak pemilik: ${item.whatsapp}`,
    ],
  };
}
