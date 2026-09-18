export type CarCondition = "New Car" | "User Car";
export type OfferMode = "Buy Car" | "Rent Car";
export type TagClass = "blue" | "green" | "indigo" | "rose";

export type CarItem = {
  id: string;
  name: string;
  brand: string;
  type: string;
  condition: CarCondition;
  modes: OfferMode[];
  tag: string;
  tagClass: TagClass;
  buyPrice: number;
  rentPrice: number;
  rating: number;
  trips: number;
  seats: number;
  transmission: string;
  fuel: string;
  location: string;
  freeTestDrive: boolean;
  image: string;
  gallery: string[];
  description: string;
  specs: string[];
};

export const cars: CarItem[] = [
  {
    id: "bmw-m4-coupe",
    name: "BMW M4 Coupe",
    brand: "BMW",
    type: "Sedan",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Free Test Drive",
    tagClass: "blue",
    buyPrice: 266500,
    rentPrice: 2450000,
    rating: 4.9,
    trips: 128,
    seats: 4,
    transmission: "Automatic",
    fuel: "Bensin",
    location: "Semarang Kota",
    freeTestDrive: true,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Coupe premium dengan tenaga responsif, kabin sporty, dan paket test drive gratis untuk area Semarang.",
    specs: ["3.0L TwinPower Turbo", "0-100 km/jam 4.1 detik", "Apple CarPlay", "Premium insurance"],
  },
  {
    id: "bmw-i4-m-sport",
    name: "BMW i4 M Sport",
    brand: "BMW",
    type: "Sedan",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Full Electric",
    tagClass: "indigo",
    buyPrice: 252720,
    rentPrice: 2100000,
    rating: 4.8,
    trips: 96,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    location: "Candisari",
    freeTestDrive: false,
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Sedan listrik bertenaga dengan akselerasi halus, cocok untuk perjalanan bisnis maupun city tour.",
    specs: ["Range hingga 510 km", "Fast charging", "M Sport package", "Driver assistance"],
  },
  {
    id: "toyota-gr-supra",
    name: "Toyota GR Supra",
    brand: "Toyota",
    type: "Sport Car",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Best Seller",
    tagClass: "rose",
    buyPrice: 185450,
    rentPrice: 1850000,
    rating: 4.9,
    trips: 164,
    seats: 2,
    transmission: "Automatic",
    fuel: "Bensin",
    location: "Tembalang",
    freeTestDrive: false,
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Sport car favorit untuk akhir pekan, pre-wedding, dan pengalaman berkendara yang lebih emosional.",
    specs: ["Rear-wheel drive", "Adaptive suspension", "Sport exhaust", "Keyless entry"],
  },
  {
    id: "tesla-model-s",
    name: "Tesla Model S",
    brand: "Tesla",
    type: "Coupe",
    condition: "User Car",
    modes: ["Rent Car"],
    tag: "Full Electric",
    tagClass: "indigo",
    buyPrice: 167250,
    rentPrice: 1750000,
    rating: 4.7,
    trips: 112,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    location: "Banyumanik",
    freeTestDrive: false,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Pilihan electric luxury untuk perjalanan nyaman dengan kabin lega dan biaya energi efisien.",
    specs: ["Panoramic roof", "Premium audio", "Autopilot ready", "Home charging cable"],
  },
  {
    id: "honda-civic-type-r",
    name: "Honda Civic Type R",
    brand: "Honda",
    type: "Coupe",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "New Release",
    tagClass: "green",
    buyPrice: 95120,
    rentPrice: 980000,
    rating: 4.8,
    trips: 76,
    seats: 4,
    transmission: "Manual",
    fuel: "Bensin",
    location: "Gajahmungkur",
    freeTestDrive: true,
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Hot hatch manual yang tajam dan menyenangkan, tetap praktis untuk dipakai harian.",
    specs: ["Manual 6-speed", "Bucket seat", "Brembo brake", "Drive mode selector"],
  },
  {
    id: "porsche-taycan",
    name: "Porsche Taycan",
    brand: "Porsche",
    type: "Sport Car",
    condition: "User Car",
    modes: ["Rent Car"],
    tag: "Free Test Drive",
    tagClass: "blue",
    buyPrice: 90900,
    rentPrice: 2250000,
    rating: 4.9,
    trips: 88,
    seats: 4,
    transmission: "Automatic",
    fuel: "Electric",
    location: "Simpang Lima",
    freeTestDrive: true,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Electric sport sedan untuk pengalaman premium, stabil, dan sangat senyap di jalan kota.",
    specs: ["800V architecture", "Sport Chrono", "Air suspension", "Premium insurance"],
  },
  {
    id: "mercedes-benz-c300",
    name: "Mercedes Benz C300",
    brand: "Mercedes Benz",
    type: "Sedan",
    condition: "User Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Executive",
    tagClass: "green",
    buyPrice: 118800,
    rentPrice: 1350000,
    rating: 4.7,
    trips: 104,
    seats: 5,
    transmission: "Automatic",
    fuel: "Bensin",
    location: "Semarang Barat",
    freeTestDrive: true,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "Sedan eksekutif yang nyaman untuk tamu perusahaan, meeting, dan perjalanan antar kota.",
    specs: ["Ambient light", "Burmester audio", "Leather seat", "Blind spot assist"],
  },
  {
    id: "toyota-alphard",
    name: "Toyota Alphard",
    brand: "Toyota",
    type: "MPV",
    condition: "User Car",
    modes: ["Rent Car"],
    tag: "Family Choice",
    tagClass: "blue",
    buyPrice: 130000,
    rentPrice: 1650000,
    rating: 4.8,
    trips: 142,
    seats: 7,
    transmission: "Automatic",
    fuel: "Bensin",
    location: "Semarang Timur",
    freeTestDrive: false,
    image:
      "https://images.unsplash.com/photo-1626072778346-0ab6604d39d4?auto=format&fit=crop&w=1100&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626072778346-0ab6604d39d4?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1100&q=80",
    ],
    description:
      "MPV premium untuk keluarga, tamu VIP, dan perjalanan dengan sopir di area Jawa Tengah.",
    specs: ["Captain seat", "Rear entertainment", "Power sliding door", "Optional driver"],
  },
];

export const brands = Array.from(new Set(cars.map((car) => car.brand)));
export const conditions: CarCondition[] = ["New Car", "User Car"];

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
