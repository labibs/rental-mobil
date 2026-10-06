import Link from "next/link";
import { Car, Fuel, Gauge, Users } from "lucide-react";
import { formatRupiah, formatShortRupiah, type CarItem } from "../data/cars";
import type { SearchMode } from "./catalog-filters";

function getClassBadge(type: string, tagClass: string) {
  const t = type.toLowerCase();
  if (t === "hatchback" || t === "city car") return { label: "Economy", bg: "#fef3c7", text: "#92400e" };
  if (t === "mpv") return { label: "Family", bg: "#ede9fe", text: "#5b21b6" };
  if (t === "suv") return { label: "SUV", bg: "#dbeafe", text: "#1e40af" };
  if (t === "sedan") return { label: "Sedan", bg: "#ccfbf1", text: "#115e59" };
  if (t === "listrik" || tagClass === "green") return { label: "EV", bg: "#dcfce7", text: "#166534" };
  return { label: "Standard", bg: "#f1f5f9", text: "#334155" };
}

export function CarCard({ item, mode }: { item: CarItem; mode: SearchMode }) {
  const isRent = mode === "sewa";
  const price = isRent ? formatRupiah(item.rentPrice) : formatShortRupiah(item.buyPrice);
  const badgeInfo = getClassBadge(item.type, item.tagClass);

  const deposit = item.rentPrice > 1000000 ? "Rp 1 Juta" : isRent ? "Rp 500rb" : "DP 20%";
  const kmLimit = item.rentPrice > 1500000 ? "350 km" : "Bebas KM";
  const guarantee = isRent ? "KTP+SIM" : "Garansi 1 Thn";

  return (
    <article className="k-card" data-testid={`car-card-${item.id}`}>
      <Link href={`/cars/${item.id}`} className="k-card-link" aria-label={`Lihat detail ${item.name}`}>

        {/* Image Area */}
        <div className="k-img-wrap">
          <img src={item.image} alt={item.name} loading="lazy" className="k-img" />
          {/* Condition badge overlaid on image */}
          <span className={`k-cond-badge ${item.condition === "New Car" ? "k-cond-new" : "k-cond-mitra"}`}>
            {item.condition === "New Car" ? "BARU" : "MITRA"}
          </span>
        </div>

        {/* Body */}
        <div className="k-body">
          {/* Car name */}
          <h3 className="k-name">{item.name}</h3>

          {/* Pills row */}
          <div className="k-pills">
            <span className="k-pill-cat" style={{ backgroundColor: badgeInfo.bg, color: badgeInfo.text }}>
              {badgeInfo.label}
            </span>
            <span className="k-pill-seat">
              <Users size={10} />
              {item.seats}
            </span>
          </div>

          {/* Specs */}
          <div className="k-specs">
            <span className="k-spec"><Fuel size={10} />{item.fuel}</span>
            <span className="k-spec-dot">·</span>
            <span className="k-spec"><Gauge size={10} />{item.transmission}</span>
          </div>

          {/* Stats */}
          <div className="k-stats">
            <div className="k-stat">
              <span className="k-stat-lbl">Deposit</span>
              <span className="k-stat-val">{deposit}</span>
            </div>
            <div className="k-stat">
              <span className="k-stat-lbl">Batas KM</span>
              <span className="k-stat-val">{kmLimit}</span>
            </div>
            <div className="k-stat">
              <span className="k-stat-lbl">Syarat</span>
              <span className="k-stat-val">{guarantee}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="k-footer">
            <div className="k-price-block">
              <span className="k-price-lbl">{isRent ? "Per Hari" : "Harga OTR"}</span>
              <strong className="k-price" data-testid={`car-price-${item.id}`}>{price}</strong>
            </div>
            <button type="button" className="k-btn">
              {isRent ? "Sewa" : "Beli"}
            </button>
          </div>
        </div>

      </Link>
    </article>
  );
}
