"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Car, RotateCcw, X } from "lucide-react";
import { cars, brands, carTypes, type CarItem } from "./data/cars";
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
  rentPriceOptions,
  buyPriceOptions,
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
      .catch(() => { });
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

      <div className="search-wrap">
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
        {/* Catalog header */}
        <div className="catalog-head">
          <div>
            <p className="section-eyebrow">Pilihan Untuk Anda</p>
            <h2>
              {modeTitles[filters.mode]}
              {filters.brand ? ` · ${filters.brand}` : ""}
            </h2>
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


        <p className="catalog-count" data-testid="catalog-count">
          <strong>{filteredCars.length}</strong> mobil ditemukan
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

      {/* Section Titip Mobil yang Menarik & Berkontras Tinggi */}
      <section className="landing-container mt-14 mb-20 md:mt-20 md:mb-20" data-testid="consign-banner">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 sm:p-10 md:p-12 text-white shadow-2xl ring-1 ring-white/10">
          {/* Subtle glowing ambient lights */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-400/30 uppercase tracking-wider mb-4">
                <span>✨</span>
                <span>Program Kemitraan Pemilik Mobil</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                Punya mobil menganggur di garasi?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Titipkan mobil Anda, biar kami yang pasarkan! Pilih <strong className="text-white">titip sewa harian</strong> dengan tarif yang Anda atur sendiri, atau <strong className="text-white">titip jual aman</strong> tanpa repot layani calon pembeli.
              </p>

              {/* 3 Keuntungan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">✓</span>
                  <span>Bagi Hasil Transparan</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs">✓</span>
                  <span>Perawatan &amp; Asuransi</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs">✓</span>
                  <span>Pantau Status Online</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/titip-mobil"
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-7 text-sm md:text-base font-bold text-white shadow-lg shadow-blue-600/40 transition hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-[0.98]"
                data-testid="banner-titip-link"
              >
                <span>Mulai Titip Mobil</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Mitra%20Mobil,%20saya%20tertarik%20titip%20mobil"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-slate-200 backdrop-blur transition hover:bg-white/10 hover:text-white"
              >
                Tanya Admin WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsappFab />
    </main>
  );
}
