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

const IMG = {
  avanza:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/7a6bf63d1d9cc5d56ff0af28cbda582ae275091ef6d31ad7df96863a7bd7a746.jpeg",
  zenix:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/865ba4f1553115f7e58ccf077be1a7afe9909b529647c7ec918b0fa2f294d8d3.jpeg",
  fortuner:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/21af0affff207c7536713114ea7c7276f80d213bdd3661e2388a301361c3a702.jpeg",
  alphard:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/1b96fa267031970a3a111afee6dd93e39e439b5dccf79a8445b30e9a62813a34.jpeg",
  brio: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/45e3cc507e9b8aaa142cf130e6cf9e1a78c2a9902214a2e1685d2a359ef9591a.jpeg",
  hrv: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/1856975fd74b382f1bfac3046170f234713075ba2e485dfd53d9f864d00f3656.jpeg",
  crv: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/40447e27bc5b474dec222e00d7dd2ba90cb3dd0e0a25adeeb86aef40621dc607.jpeg",
  ertiga:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/ba00cc913e7fc538aa2bff9ac9a36964bd518f5b9f0c5fda1f11dfbef97e4677.jpeg",
  xl7: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/b44af755841c99b27652ef0fdd938635b9bdef07e6176c9125623abe9bb99202.jpeg",
  creta:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/770523e81488269244dc29acbd37da547d0baf27d738b8509b963d7c8166fd70.jpeg",
  ioniq5:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/0a432748632fb1ff0e4f9285f60025c4b7f343e0a964966ff837b867cf165a7a.jpeg",
  atto3:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/552339131105b48ca6893d56e03901c91cd82a1ab876df2cf6f8c19b1aa9be2e.jpeg",
  seal: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/4bb6203e8d78953ee255105bf73b549e2797b9bebc6a176251f86d6227595266.jpeg",
  omoda5:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/490f80312f983f3186df7d3a1f550241215aa36ec37e49aa5dba677023fbb254.jpeg",
  tiggo8:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/2072693487cfa877c98ca9665d07d0df8f8cb3891a16951460cea66af044767e.jpeg",
  panther:
    "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/d20de9145ced0f68365254dd45662ea24f0f6645e39116a5a2ee360ac86850d6.jpeg",
  mux: "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/fe5bde5609820e107355a843a844a3c04f86c3e493caddbf6d65558c596c5cd2.jpeg",
};

export const HERO_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/3b0cea51-70e1-4a1f-b967-0d40292c2629/images/4df2bdeccd0a05e4693df37680859b8fa9f4e0d0ba38fc90432209e08be96956.jpeg";

export const cars: CarItem[] = [
  {
    id: "toyota-avanza",
    name: "Toyota Avanza 1.5 G CVT",
    brand: "Toyota",
    type: "MPV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Terlaris",
    tagClass: "rose",
    buyPrice: 255_000_000,
    rentPrice: 350_000,
    rating: 4.8,
    trips: 342,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.avanza,
    gallery: [IMG.avanza, IMG.zenix],
    description:
      "MPV sejuta umat yang irit, lega untuk 7 penumpang, dan paling mudah dirawat. Pilihan aman untuk keluarga maupun operasional harian.",
    specs: ["Mesin 1.5L Dual VVT-i", "Transmisi CVT", "7 Penumpang", "Konsumsi BBM 15 km/l"],
  },
  {
    id: "toyota-innova-zenix",
    name: "Toyota Kijang Innova Zenix Hybrid",
    brand: "Toyota",
    type: "MPV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Hybrid",
    tagClass: "green",
    buyPrice: 465_000_000,
    rentPrice: 750_000,
    rating: 4.9,
    trips: 210,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Hybrid",
    location: "Purwokerto",
    freeTestDrive: true,
    image: IMG.zenix,
    gallery: [IMG.zenix, IMG.avanza],
    description:
      "MPV hybrid premium dengan kabin senyap, captain seat, dan efisiensi bahan bakar luar biasa untuk perjalanan luar kota.",
    specs: ["2.0L Hybrid e-CVT", "Captain Seat", "Panoramic Roof", "Toyota Safety Sense"],
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner 2.8 GR Sport",
    brand: "Toyota",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Test Drive Gratis",
    tagClass: "blue",
    buyPrice: 620_000_000,
    rentPrice: 1_100_000,
    rating: 4.9,
    trips: 168,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Diesel",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.fortuner,
    gallery: [IMG.fortuner, IMG.mux],
    description:
      "SUV tangguh bermesin diesel 2.8L yang gagah di jalan raya maupun medan berat. Favorit untuk dinas dan liburan keluarga.",
    specs: ["Mesin 2.8L Diesel Turbo", "4x2 GR Sport", "Ground Clearance Tinggi", "7 Penumpang"],
  },
  {
    id: "toyota-alphard",
    name: "Toyota Alphard 2.5 G",
    brand: "Toyota",
    type: "MPV",
    condition: "User Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Pilihan Keluarga",
    tagClass: "blue",
    buyPrice: 1_150_000_000,
    rentPrice: 2_500_000,
    rating: 4.8,
    trips: 142,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Semarang",
    freeTestDrive: false,
    image: IMG.alphard,
    gallery: [IMG.alphard, IMG.zenix],
    description:
      "MPV mewah tahun 2022 untuk tamu VIP, pernikahan, dan perjalanan keluarga dengan sopir. Kondisi terawat, servis rutin di bengkel resmi.",
    specs: ["Tahun 2022", "Pilot Seat Elektrik", "Pintu Geser Otomatis", "Sopir Opsional"],
  },
  {
    id: "honda-brio",
    name: "Honda Brio RS CVT",
    brand: "Honda",
    type: "Hatchback",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Hemat BBM",
    tagClass: "green",
    buyPrice: 195_000_000,
    rentPrice: 275_000,
    rating: 4.7,
    trips: 298,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.brio,
    gallery: [IMG.brio, IMG.hrv],
    description:
      "City car lincah dan irit, gampang parkir, cocok untuk mobilitas dalam kota dan pengguna pertama.",
    specs: ["Mesin 1.2L i-VTEC", "Transmisi CVT", "Konsumsi BBM 20 km/l", "Smart Key"],
  },
  {
    id: "honda-hrv",
    name: "Honda HR-V 1.5 Turbo RS",
    brand: "Honda",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Rilis Baru",
    tagClass: "green",
    buyPrice: 400_000_000,
    rentPrice: 650_000,
    rating: 4.8,
    trips: 176,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Purwokerto",
    freeTestDrive: true,
    image: IMG.hrv,
    gallery: [IMG.hrv, IMG.crv],
    description:
      "Compact SUV bergaya coupe dengan mesin turbo responsif dan fitur Honda Sensing lengkap.",
    specs: ["1.5L VTEC Turbo", "Honda Sensing", "Walk-Away Auto Lock", "Wireless Charger"],
  },
  {
    id: "honda-crv",
    name: "Honda CR-V 2.0 Hybrid RS",
    brand: "Honda",
    type: "SUV",
    condition: "User Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Hybrid",
    tagClass: "green",
    buyPrice: 590_000_000,
    rentPrice: 950_000,
    rating: 4.8,
    trips: 88,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Hybrid",
    location: "Semarang",
    freeTestDrive: false,
    image: IMG.crv,
    gallery: [IMG.crv, IMG.hrv],
    description:
      "SUV hybrid tahun 2023, km rendah, pajak panjang. Nyaman untuk perjalanan jauh dengan bagasi luas.",
    specs: ["Tahun 2023", "e:HEV Hybrid", "Km 18.000", "Pajak Hidup"],
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga Hybrid GX",
    brand: "Suzuki",
    type: "MPV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Hybrid",
    tagClass: "green",
    buyPrice: 275_000_000,
    rentPrice: 400_000,
    rating: 4.7,
    trips: 224,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Hybrid",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.ertiga,
    gallery: [IMG.ertiga, IMG.xl7],
    description:
      "MPV keluarga dengan teknologi Smart Hybrid yang irit, kabin lega, dan harga bersahabat.",
    specs: ["1.5L Smart Hybrid", "7 Penumpang", "Cruise Control", "Head Unit 10 inci"],
  },
  {
    id: "suzuki-xl7",
    name: "Suzuki XL7 Alpha Hybrid",
    brand: "Suzuki",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Terlaris",
    tagClass: "rose",
    buyPrice: 295_000_000,
    rentPrice: 450_000,
    rating: 4.7,
    trips: 190,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Hybrid",
    location: "Purwokerto",
    freeTestDrive: true,
    image: IMG.xl7,
    gallery: [IMG.xl7, IMG.ertiga],
    description:
      "Crossover 7-seater bergaya SUV dengan ground clearance tinggi, pas untuk jalan kampung sampai jalan tol.",
    specs: ["1.5L Smart Hybrid", "Ground Clearance 200 mm", "7 Penumpang", "Roof Rail"],
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta Prime",
    brand: "Hyundai",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Test Drive Gratis",
    tagClass: "blue",
    buyPrice: 320_000_000,
    rentPrice: 500_000,
    rating: 4.7,
    trips: 134,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.creta,
    gallery: [IMG.creta, IMG.ioniq5],
    description:
      "Compact SUV modern rakitan Indonesia dengan fitur Bluelink dan Hyundai SmartSense.",
    specs: ["1.5L MPI IVT", "Hyundai SmartSense", "Bluelink Connected", "Ventilated Seat"],
  },
  {
    id: "hyundai-ioniq-5",
    name: "Hyundai Ioniq 5 Signature Long Range",
    brand: "Hyundai",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Listrik Penuh",
    tagClass: "indigo",
    buyPrice: 790_000_000,
    rentPrice: 1_500_000,
    rating: 4.9,
    trips: 96,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Listrik",
    location: "Semarang",
    freeTestDrive: true,
    image: IMG.ioniq5,
    gallery: [IMG.ioniq5, IMG.creta],
    description:
      "SUV listrik rakitan Cikarang dengan desain retro-futuristik, jarak tempuh hingga 481 km, dan pengisian ultra cepat.",
    specs: ["Baterai 72,6 kWh", "Jarak 481 km", "Fast Charging 18 menit", "V2L"],
  },
  {
    id: "byd-atto-3",
    name: "BYD Atto 3 Superior",
    brand: "BYD",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Listrik Penuh",
    tagClass: "indigo",
    buyPrice: 515_000_000,
    rentPrice: 900_000,
    rating: 4.8,
    trips: 112,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Listrik",
    location: "Purwokerto",
    freeTestDrive: true,
    image: IMG.atto3,
    gallery: [IMG.atto3, IMG.seal],
    description:
      "SUV listrik dengan Blade Battery yang aman, interior unik, dan biaya operasional sangat rendah.",
    specs: ["Blade Battery 60,48 kWh", "Jarak 480 km", "Layar Putar 12,8 inci", "Garansi Baterai 8 Tahun"],
  },
  {
    id: "byd-seal",
    name: "BYD Seal Performance AWD",
    brand: "BYD",
    type: "Sedan",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Listrik Penuh",
    tagClass: "indigo",
    buyPrice: 720_000_000,
    rentPrice: 1_300_000,
    rating: 4.9,
    trips: 74,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Listrik",
    location: "Semarang",
    freeTestDrive: true,
    image: IMG.seal,
    gallery: [IMG.seal, IMG.atto3],
    description:
      "Sedan listrik performa tinggi, 0-100 km/jam hanya 3,8 detik dengan kenyamanan kelas premium.",
    specs: ["Dual Motor AWD", "0-100 km/jam 3,8 detik", "Jarak 580 km", "Panoramic Glass Roof"],
  },
  {
    id: "chery-omoda-5",
    name: "Chery Omoda 5 RZ",
    brand: "Chery",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Rilis Baru",
    tagClass: "green",
    buyPrice: 400_000_000,
    rentPrice: 600_000,
    rating: 4.6,
    trips: 68,
    seats: 5,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Cilacap Kota",
    freeTestDrive: true,
    image: IMG.omoda5,
    gallery: [IMG.omoda5, IMG.tiggo8],
    description:
      "Crossover futuristik dengan mesin turbo 1.5L, layar ganda 10,25 inci, dan fitur ADAS lengkap.",
    specs: ["1.5L Turbo 7DCT", "Dual Screen 10,25 inci", "ADAS Level 2", "Sunroof"],
  },
  {
    id: "chery-tiggo-8",
    name: "Chery Tiggo 8 Pro Premium",
    brand: "Chery",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Pilihan Keluarga",
    tagClass: "blue",
    buyPrice: 550_000_000,
    rentPrice: 850_000,
    rating: 4.7,
    trips: 82,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Bensin",
    location: "Purwokerto",
    freeTestDrive: true,
    image: IMG.tiggo8,
    gallery: [IMG.tiggo8, IMG.omoda5],
    description:
      "SUV 7 penumpang dengan mesin 2.0L turbo bertenaga, interior mewah, dan fitur berlimpah.",
    specs: ["2.0L Turbo 7DCT", "7 Penumpang", "Sony Audio 12 Speaker", "Ventilated & Massage Seat"],
  },
  {
    id: "isuzu-panther",
    name: "Isuzu Panther Grand Touring",
    brand: "Isuzu",
    type: "MPV",
    condition: "User Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Bandel & Irit",
    tagClass: "rose",
    buyPrice: 185_000_000,
    rentPrice: 300_000,
    rating: 4.6,
    trips: 260,
    seats: 7,
    transmission: "Manual",
    fuel: "Diesel",
    location: "Cilacap Kota",
    freeTestDrive: false,
    image: IMG.panther,
    gallery: [IMG.panther, IMG.mux],
    description:
      "Legenda diesel Indonesia tahun 2016, terkenal bandel dan super irit. Cocok untuk rombongan dan luar kota.",
    specs: ["Tahun 2016", "2.5L Diesel", "Manual 5-percepatan", "Konsumsi 14 km/l"],
  },
  {
    id: "isuzu-mux",
    name: "Isuzu MU-X 4x4 Ultimate",
    brand: "Isuzu",
    type: "SUV",
    condition: "New Car",
    modes: ["Buy Car", "Rent Car"],
    tag: "Test Drive Gratis",
    tagClass: "blue",
    buyPrice: 650_000_000,
    rentPrice: 1_100_000,
    rating: 4.8,
    trips: 58,
    seats: 7,
    transmission: "Otomatis",
    fuel: "Diesel",
    location: "Semarang",
    freeTestDrive: true,
    image: IMG.mux,
    gallery: [IMG.mux, IMG.fortuner],
    description:
      "SUV ladder frame bermesin diesel 1.9L turbo bertenaga besar, siap untuk medan off-road dan touring.",
    specs: ["1.9L Diesel Turbo", "4x4 Terrain Command", "Ground Clearance 235 mm", "7 Penumpang"],
  },
];

export const brands = ["Toyota", "Honda", "Suzuki", "Hyundai", "BYD", "Chery", "Isuzu"];
export const carTypes = Array.from(new Set(cars.map((car) => car.type)));
export const conditions: CarCondition[] = ["New Car", "User Car"];

export function formatBuyPrice(value: number) {
  return formatRupiah(value);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatShortRupiah(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  }
  return formatRupiah(value);
}
