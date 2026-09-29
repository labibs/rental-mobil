"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Car, RotateCcw } from "lucide-react";
import { cars, type CarItem } from "./data/cars";
import { SiteHeader } from "./components/site-header";
import { Hero } from "./components/hero";
import { SearchCard } from "./components/search-card";
import { BrandStrip } from "./components/brand-strip";
import { CarCard } from "./components/car-card";
import { SiteFooter } from "./components/site-footer";
import { WhatsappFab } from "./components/whatsapp-fab";
import {
  defaultFilters,
  matchesFilters,
  type Filters,
  type SearchMode,
} from "./components/catalog-filters";

const categories = ["Populer", "MPV", "SUV", "Hatchback", "Sedan", "Listrik", "Bekas"];

const modeTitles: Record<SearchMode, string> = {
  sewa: "Sewa Harian",
  beli: "Mobil Baru",
  bekas: "Mobil Bekas Berkualitas",
};

export default function Home() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [category, setCategory] = useState("Populer");
  const [sort, setSort] = useState("recommended");
  const [consignedCars, setConsignedCars] = useState<CarItem[]>([]);

  useEffect(() => {
    const modeParam = new URLSearchParams(window.location.search).get("mode");
    if (modeParam === "sewa" || modeParam === "beli" || modeParam === "bekas") {
      setFilters((current) => ({ ...current, mode: modeParam }));
    }
    fetch("/api/consignments")
      .then((response) => (response.ok ? response.json() : { cars: [] }))
      .then((data) => setConsignedCars(Array.isArray(data.cars) ? data.cars : []))
      .catch(() => {});
  }, []);

  const allCars = useMemo(() => [...cars, ...consignedCars], [consignedCars]);

  const filteredCars = useMemo(() => {
    const priceOf = (car: CarItem) =>
      filters.mode === "sewa" ? car.rentPrice : car.buyPrice;
    return allCars
      .filter((car) => matchesFilters(car, filters, category))
      .sort((a, b) => {
        if (sort === "price-low") return priceOf(a) - priceOf(b);
        if (sort === "price-high") return priceOf(b) - priceOf(a);
        if (sort === "rating") return b.rating - a.rating;
        return b.trips + b.rating * 10 - (a.trips + a.rating * 10);
      });
  }, [allCars, category, filters, sort]);

  function updateFilters(patch: Partial<Filters>) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  function scrollToCatalog() {
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetAll() {
    setFilters(defaultFilters);
    setCategory("Populer");
    setSort("recommended");
  }

  return (
    <main className="landing" data-testid="landing-page">
      <SiteHeader />
      <Hero />

      <div className="landing-container search-wrap">
        <SearchCard filters={filters} onChange={updateFilters} onSearch={scrollToCatalog} />
      </div>

      <BrandStrip
        active={filters.brand}
        onSelect={(brand) => {
          updateFilters({ brand });
          scrollToCatalog();
        }}
      />

      <section className="landing-container catalog" id="katalog" data-testid="catalog-section">
        <div className="catalog-head">
          <div>
            <p className="section-eyebrow">Pilihan Untuk Anda</p>
            <h2>
              {modeTitles[filters.mode]}
              {filters.brand ? ` · ${filters.brand}` : ""}
            </h2>
            <span className="catalog-copy">
              Mobil-mobil favorit keluarga Indonesia. Pilih kategori, bandingkan
              harga, dan pesan langsung dari halaman detail.
            </span>
          </div>
          <div className="catalog-tools">
            <label className="catalog-sort">
              <select value={sort} onChange={(event) => setSort(event.target.value)} data-testid="sort-select">
                <option value="recommended">Rekomendasi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
              </select>
            </label>
            <button type="button" className="btn-ghost dark" onClick={resetAll} data-testid="reset-filters-button">
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        <div className="category-tabs" data-testid="category-tabs">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
              data-testid={`category-tab-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="catalog-count" data-testid="catalog-count">
          {filteredCars.length} mobil ditemukan
        </p>

        {filteredCars.length > 0 ? (
          <div className="lp-grid" data-testid="car-grid">
            {filteredCars.map((item) => (
              <CarCard item={item} key={item.id} mode={filters.mode} />
            ))}
          </div>
        ) : (
          <div className="lp-empty" data-testid="empty-state">
            <Car size={34} />
            <h3>Mobil tidak ditemukan</h3>
            <p>Ubah kata kunci, merek, kategori, atau batas harga untuk melihat pilihan lain.</p>
            <button type="button" className="btn-primary" onClick={resetAll}>
              Reset Filter
            </button>
          </div>
        )}
      </section>

      <section className="landing-container consign-banner" data-testid="consign-banner">
        <div>
          <p className="section-eyebrow light">Punya mobil menganggur?</p>
          <h2>Titipkan mobil Anda, biar kami yang pasarkan.</h2>
          <span>
            Titip sewa harian atau titip jual. Ajukan lewat form, tim admin
            kami tinjau, lalu mobil Anda tampil di katalog ini.
          </span>
        </div>
        <Link href="/titip-mobil" className="btn-primary" data-testid="banner-titip-link">
          Mulai Titip Mobil
          <ArrowRight size={17} />
        </Link>
      </section>

      <SiteFooter />
      <WhatsappFab />
    </main>
  );
}
