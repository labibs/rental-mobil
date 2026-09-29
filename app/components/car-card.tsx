import Link from "next/link";
import { ArrowUpRight, Fuel, Gauge, Star, Users } from "lucide-react";
import { formatRupiah, formatShortRupiah, type CarItem } from "../data/cars";
import type { SearchMode } from "./catalog-filters";

export function CarCard({ item, mode }: { item: CarItem; mode: SearchMode }) {
  const isRent = mode === "sewa";
  const price = isRent ? formatRupiah(item.rentPrice) : formatShortRupiah(item.buyPrice);

  return (
    <article className="lp-card" data-testid={`car-card-${item.id}`}>
      <Link href={`/cars/${item.id}`} className="lp-card-link" aria-label={`Lihat detail ${item.name}`}>
        <div className="lp-card-media">
          <img src={item.image} alt={item.name} loading="lazy" />
          <span className={`badge ${item.tagClass}`}>{item.tag}</span>
          <span className="lp-card-condition">
            {item.condition === "New Car" ? "Baru" : "Bekas"}
          </span>
        </div>
        <div className="lp-card-body">
          <div className="lp-card-head">
            <div>
              <p>{item.brand} · {item.type}</p>
              <h3>{item.name}</h3>
            </div>
            <span className="lp-rating">
              <Star size={13} fill="currentColor" />
              {item.rating}
            </span>
          </div>
          <ul className="lp-card-specs">
            <li>
              <Gauge size={14} />
              {item.transmission}
            </li>
            <li>
              <Fuel size={14} />
              {item.fuel}
            </li>
            <li>
              <Users size={14} />
              {item.seats} kursi
            </li>
          </ul>
          <div className="lp-card-foot">
            <div>
              <small>{isRent ? "Sewa per hari" : "Harga beli"}</small>
              <strong data-testid={`car-price-${item.id}`}>{price}</strong>
            </div>
            <span className="lp-card-arrow">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
