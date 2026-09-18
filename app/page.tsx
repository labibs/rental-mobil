"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  Bookmark,
  Car,
  ChevronDown,
  Gauge,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  brands,
  cars,
  conditions,
  formatRupiah,
  formatUsd,
  type CarCondition,
  type CarItem,
  type OfferMode,
} from "./data/cars";

const MAX_PRICE = 300000;

export default function Home() {
  const [mode, setMode] = useState<OfferMode>("Rent Car");
  const [condition, setCondition] = useState<CarCondition>("New Car");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [freeTestDrive, setFreeTestDrive] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return cars
      .filter((car) => car.modes.includes(mode))
      .filter((car) => car.condition === condition)
      .filter((car) =>
        selectedBrands.length === 0 ? true : selectedBrands.includes(car.brand)
      )
      .filter((car) => (freeTestDrive ? car.freeTestDrive : true))
      .filter((car) => car.buyPrice <= maxPrice)
      .filter((car) => {
        if (!normalizedQuery) return true;
        return [car.name, car.brand, car.type, car.location]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.rentPrice - b.rentPrice;
        if (sort === "price-high") return b.rentPrice - a.rentPrice;
        if (sort === "rating") return b.rating - a.rating;
        return b.trips + b.rating * 10 - (a.trips + a.rating * 10);
      });
  }, [condition, freeTestDrive, maxPrice, mode, query, selectedBrands, sort]);

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  }

  function resetFilters() {
    setCondition("New Car");
    setSelectedBrands([]);
    setFreeTestDrive(false);
    setMaxPrice(MAX_PRICE);
    setQuery("");
    setSort("recommended");
  }

  return (
    <main className="site-shell full-page">
      <section className="app-window">
        <TopBar />
        <div className="workspace">
          <aside className="filter-panel">
            <div className="panel-heading">
              <h2>Filter</h2>
              <button className="link-button" onClick={resetFilters}>
                Reset
              </button>
            </div>

            <label className="toggle-row">
              <span className="toggle-label">
                <ShieldCheck size={16} />
                Free Test Drive
              </span>
              <input
                checked={freeTestDrive}
                onChange={(event) => setFreeTestDrive(event.target.checked)}
                type="checkbox"
              />
            </label>

            <div className="field-group">
              <p>Type of Car</p>
              <div className="segmented">
                {conditions.map((item) => (
                  <button
                    className={condition === item ? "active" : ""}
                    key={item}
                    onClick={() => setCondition(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <p>Brand</p>
              {brands.map((brand) => (
                <label className="check-row" key={brand}>
                  <span>
                    <span className="brand-mark">{brand.charAt(0)}</span>
                    {brand}
                  </span>
                  <input
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    type="checkbox"
                  />
                </label>
              ))}
              <button className="more-brand">
                More Brand <ChevronDown size={14} />
              </button>
            </div>

            <div className="field-group">
              <p>Price Range</p>
              <div className="histogram" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, index) => (
                  <span
                    key={index}
                    style={{ height: `${18 + ((index * 13) % 34)}px` }}
                  />
                ))}
              </div>
              <input
                aria-label="Maksimal harga beli"
                className="range-input"
                max={MAX_PRICE}
                min={80000}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                step={5000}
                type="range"
                value={maxPrice}
              />
              <div className="price-boxes">
                <strong>$80.000</strong>
                <strong>{formatUsd(maxPrice)}</strong>
              </div>
            </div>
          </aside>

          <section className="content-panel">
            <div className="action-row">
              <div className="rent-tabs">
                {(["Buy Car", "Rent Car"] as OfferMode[]).map((item) => (
                  <button
                    className={mode === item ? "active" : ""}
                    key={item}
                    onClick={() => setMode(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="search-box">
                <Search size={18} />
                <input
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find car here ..."
                  value={query}
                />
              </label>
              <button className="tool-button" onClick={resetFilters} title="Reset filter">
                <Settings2 size={18} />
                <span>Reset</span>
              </button>
              <label className="sort-button">
                <SlidersHorizontal size={16} />
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="rating">Top Rating</option>
                  <option value="price-low">Rent Price Low</option>
                  <option value="price-high">Rent Price High</option>
                </select>
              </label>
            </div>

            <div className="results-head">
              <h1>{filteredCars.length} Car Found</h1>
              <div className="chips">
                {freeTestDrive && (
                  <button onClick={() => setFreeTestDrive(false)}>
                    Free Test Drive
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={() =>
                    setCondition(condition === "New Car" ? "User Car" : "New Car")
                  }
                >
                  {condition}
                  <X size={14} />
                </button>
                <button onClick={() => setMaxPrice(MAX_PRICE)}>
                  Max {formatUsd(maxPrice)}
                  <X size={14} />
                </button>
                {selectedBrands.map((brand) => (
                  <button key={brand} onClick={() => toggleBrand(brand)}>
                    {brand}
                    <X size={14} />
                  </button>
                ))}
              </div>
            </div>

            {filteredCars.length > 0 ? (
              <div className="car-grid">
                {filteredCars.map((item) => (
                  <CarCard item={item} key={item.id} mode={mode} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Car size={34} />
                <h2>Mobil tidak ditemukan</h2>
                <p>Ubah kata kunci, brand, atau range harga untuk melihat pilihan lain.</p>
                <button onClick={resetFilters}>Reset Filter</button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function CarCard({ item, mode }: { item: CarItem; mode: OfferMode }) {
  const priceLabel =
    mode === "Buy Car" ? formatUsd(item.buyPrice) : `${formatRupiah(item.rentPrice)} / hari`;

  return (
    <article className="car-card">
      <button className="bookmark-button" title="Simpan mobil">
        <Bookmark size={16} />
      </button>
      <Link href={`/cars/${item.id}`} className="card-link" aria-label={`Lihat detail ${item.name}`}>
        <div className="card-title">
          <div>
            <h3>{item.name}</h3>
            <p>{item.type} / {item.condition}</p>
          </div>
        </div>
        <div className="car-image-wrap">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="card-bottom">
          <span className={`badge ${item.tagClass}`}>
            {item.tagClass === "green" ? (
              <Sparkles size={13} />
            ) : item.tagClass === "rose" ? (
              <Users size={13} />
            ) : item.tagClass === "indigo" ? (
              <Zap size={13} />
            ) : (
              <Gauge size={13} />
            )}
            {item.tag}
          </span>
          <div>
            <span className="rating">
              <Star size={13} fill="currentColor" />
              {item.rating}
            </span>
            <strong>{priceLabel}</strong>
          </div>
        </div>
      </Link>
    </article>
  );
}

function TopBar() {
  return (
    <header className="top-bar">
      <button className="location-pill">
        <MapPin size={16} />
        Semarang, Indonesia
        <ChevronDown size={14} />
      </button>
      <Link href="/" className="brand">
        <span>
          <Car size={21} />
        </span>
        Auto.Hunt
      </Link>
      <div className="top-actions">
        <button className="icon-button" title="Pesan">
          <MessageCircle size={18} />
          <i />
        </button>
        <button className="icon-button" title="Notifikasi">
          <Bell size={18} />
          <i />
        </button>
        <button className="avatar-button" title="Profil">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=160&q=80"
            alt="Profil pengguna"
          />
          <ChevronDown size={14} />
        </button>
        <Link href="/admin" className="admin-link">
          <LayoutDashboard size={16} />
          Admin
        </Link>
        <button className="sell-button">
          <Plus size={16} />
          Sell Car
        </button>
      </div>
    </header>
  );
}
