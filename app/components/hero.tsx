import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { HERO_IMAGE } from "../data/cars";

const stats = [
  { value: "500+", label: "Mobil siap pakai" },
  { value: "7", label: "Merek populer" },
  { value: "10K+", label: "Perjalanan sukses" },
  { value: "#1", label: "Rental di Cilacap" },
];

export function Hero() {
  return (
    <section className="hero" data-testid="hero-section">
      <img src={HERO_IMAGE} alt="Showroom Mitra Mobil" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-inner">
        <p className="hero-eyebrow">Sewa · Jual Beli · Titip Mobil</p>
        <h1>
          Lebih dari Sekadar Mobil.
          <br />
          <span>Perjalanan Baru Anda.</span>
        </h1>
        <p className="hero-copy">
          Temukan Avanza, Fortuner, Ioniq 5 hingga BYD Seal dalam satu tempat.
          Sewa harian, beli unit baru maupun bekas, atau titipkan mobil Anda
          untuk kami pasarkan.
        </p>
        <div className="hero-actions">
          <a href="#katalog" className="btn-primary" data-testid="hero-explore-button">
            Jelajahi Katalog
            <ArrowRight size={17} />
          </a>
          <Link href="/titip-mobil" className="btn-ghost" data-testid="hero-titip-button">
            <PlayCircle size={18} />
            Titipkan Mobil Anda
          </Link>
        </div>
        <dl className="hero-stats" data-testid="hero-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
