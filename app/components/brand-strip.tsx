"use client";

import { brands } from "../data/cars";

const logos: Record<string, { src: string; wordmark: boolean }> = {
  Toyota: { src: "/brands/toyota.svg", wordmark: false },
  Honda: { src: "/brands/honda.svg", wordmark: false },
  Suzuki: { src: "/brands/suzuki.svg", wordmark: false },
  Hyundai: { src: "/brands/hyundai.svg", wordmark: false },
  BYD: { src: "/brands/byd.svg", wordmark: true },
  Chery: { src: "/brands/chery.svg", wordmark: true },
  Isuzu: { src: "/brands/isuzu.svg", wordmark: true },
};

type Props = {
  active: string;
  onSelect: (brand: string) => void;
};

export function BrandStrip({ active, onSelect }: Props) {
  return (
    <section className="brand-strip" data-testid="brand-strip">
      <div className="brand-strip-inner">
        {brands.map((brand) => {
          const logo = logos[brand];
          return (
            <button
              type="button"
              key={brand}
              className={`${active === brand ? "active" : ""} ${logo.wordmark ? "wordmark" : ""}`}
              onClick={() => onSelect(active === brand ? "" : brand)}
              data-brand={brand}
              data-testid={`brand-chip-${brand.toLowerCase()}`}
              title={`Lihat mobil ${brand}`}
              aria-label={`Lihat mobil ${brand}`}
            >
              <img src={logo.src} alt={`Logo ${brand}`} className="brand-logo" />
              {!logo.wordmark && <span className="brand-word">{brand.toUpperCase()}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
