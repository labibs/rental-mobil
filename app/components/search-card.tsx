"use client";

import { useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { brands, carTypes } from "../data/cars";
import {
  buyPriceOptions,
  rentPriceOptions,
  type Filters,
  type SearchMode,
} from "./catalog-filters";

const modeTabs: { value: SearchMode; label: string }[] = [
  { value: "sewa", label: "Sewa Mobil" },
  { value: "beli", label: "Beli Mobil Baru" },
  { value: "bekas", label: "Mobil Bekas" },
];

type Props = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onSearch: () => void;
};

export function SearchCard({ filters, onChange, onSearch }: Props) {
  const [expanded, setExpanded] = useState(false);
  const priceOptions = filters.mode === "sewa" ? rentPriceOptions : buyPriceOptions;

  return (
    <section className="search-card" data-testid="search-card">
      <div className="search-tabs" role="tablist">
        {modeTabs.map((tab) => (
          <button
            type="button"
            role="tab"
            key={tab.value}
            aria-selected={filters.mode === tab.value}
            className={filters.mode === tab.value ? "active" : ""}
            onClick={() => onChange({ mode: tab.value, maxPrice: 0 })}
            data-testid={`mode-tab-${tab.value}`}
          >
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          className="search-toggle"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          data-testid="filter-toggle-button"
        >
          <SlidersHorizontal size={16} />
          Filter
          <ChevronDown size={14} className={expanded ? "rotated" : ""} />
        </button>
      </div>

      <div className={`search-fields ${expanded ? "expanded" : ""}`}>
        <label className="search-field grow">
          <span>Cari mobil</span>
          <div className="search-input">
            <Search size={16} />
            <input
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              onKeyDown={(event) => event.key === "Enter" && onSearch()}
              placeholder="Avanza, Fortuner, Ioniq..."
              data-testid="search-input"
            />
          </div>
        </label>
        <label className="search-field">
          <span>Merek</span>
          <select
            value={filters.brand}
            onChange={(event) => onChange({ brand: event.target.value })}
            data-testid="brand-select"
          >
            <option value="">Semua merek</option>
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </label>
        <label className="search-field">
          <span>Tipe bodi</span>
          <select
            value={filters.type}
            onChange={(event) => onChange({ type: event.target.value })}
            data-testid="type-select"
          >
            <option value="">Semua tipe</option>
            {carTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="search-field">
          <span>{filters.mode === "sewa" ? "Harga sewa" : "Harga beli"}</span>
          <select
            value={filters.maxPrice}
            onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
            data-testid="price-select"
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="btn-primary search-submit"
          onClick={onSearch}
          data-testid="search-submit-button"
        >
          <Search size={17} />
          Cari Mobil
        </button>
      </div>
    </section>
  );
}
