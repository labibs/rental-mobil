"use client";

import { brands } from "../data/cars";

const monograms: Record<string, string> = {
  Toyota: "TOYOTA",
  Honda: "HONDA",
  Suzuki: "SUZUKI",
  Hyundai: "HYUNDAI",
  BYD: "BYD",
  Chery: "CHERY",
  Isuzu: "ISUZU",
};

type Props = {
  active: string;
  onSelect: (brand: string) => void;
};

export function BrandStrip({ active, onSelect }: Props) {
  return (
    <section className="brand-strip" data-testid="brand-strip">
      <div className="brand-strip-inner">
        {brands.map((brand) => (
          <button
            type="button"
            key={brand}
            className={active === brand ? "active" : ""}
            onClick={() => onSelect(active === brand ? "" : brand)}
            data-testid={`brand-chip-${brand.toLowerCase()}`}
            title={`Lihat mobil ${brand}`}
          >
            <span className="brand-glyph">{brand.charAt(0)}</span>
            <span className="brand-word">{monograms[brand]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
