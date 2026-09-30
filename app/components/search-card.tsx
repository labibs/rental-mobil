"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { brands, carTypes } from "../data/cars";
import {
  buyPriceOptions,
  rentPriceOptions,
  type Filters,
  type SearchMode,
} from "./catalog-filters";

const modeTabs: { value: SearchMode; label: string; short: string }[] = [
  { value: "sewa", label: "Sewa Mobil", short: "Sewa" },
  { value: "beli", label: "Beli Mobil Baru", short: "Baru" },
  { value: "bekas", label: "Mobil Bekas", short: "Bekas" },
];

const NAVBAR_HEIGHT = 64; // samakan dengan tinggi navbar kamu (px)

/** Deteksi arah scroll: true = scroll ke bawah (navbar biasanya hidden) */
function useScrollingDown(threshold = 8) {
  const [down, setDown] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < threshold) return;
      setDown(y > last && y > NAVBAR_HEIGHT);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return down;
}

type Props = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onSearch: (next: Filters) => void;
  /** Opsional: kalau navbar sudah punya state hidden sendiri, oper ke sini agar sinkron */
  navbarHidden?: boolean;
};

const fieldLabel =
  "flex min-w-0 flex-col gap-1 text-xs font-medium text-slate-500";
const fieldControl =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

export function SearchCard({
  filters,
  onChange,
  onSearch,
  navbarHidden,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);
  const scrollingDown = useScrollingDown();
  const hidden = navbarHidden ?? scrollingDown;

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const patchDraft = (patch: Partial<Filters>) =>
    setDraft((current) => ({ ...current, ...patch }));

  const priceOptions =
    draft.mode === "sewa" ? rentPriceOptions : buyPriceOptions;

  const handleModeChange = (mode: SearchMode) => {
    patchDraft({ mode, maxPrice: 0 });
    onChange({ mode, maxPrice: 0 });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Filters = { ...draft, query: draft.query.trim() };
    setDraft(next);
    onChange(next);
    onSearch(next);
    setExpanded(false); // tutup panel setelah cari (mobile)
  };

  // Posisi sticky: di bawah navbar saat tampil, naik ke 0 saat navbar hidden
  const stickyStyle = {
    "--sticky-top": hidden ? "0px" : `${NAVBAR_HEIGHT}px`,
  } as CSSProperties;


    return (
      <section
        style={stickyStyle}
        className="sticky top-[var(--sticky-top)] z-30 bg-white shadow-[0_6px_16px_-10px_rgba(15,23,42,0.25)] transition-[top] duration-300 ease-out md:static md:rounded-2xl md:p-4 md:shadow-lg md:ring-1 md:ring-slate-200"
        data-testid="search-card"
      >
        {/* Satu baris penuh: Sewa | Baru | Bekas | Filter */}
        <div className="flex flex-nowrap items-center gap-2 px-3 py-2.5 md:gap-2 md:p-0">
          <div
            role="tablist"
            className="flex min-w-0 flex-1 gap-1 rounded-xl bg-slate-100 p-1 md:flex-none md:gap-2 md:bg-transparent md:p-0"
          >
            {modeTabs.map((tab) => {
              const active = draft.mode === tab.value;
              return (
                <button
                  type="button"
                  role="tab"
                  key={tab.value}
                  aria-selected={active}
                  onClick={() => handleModeChange(tab.value)}
                  data-testid={`mode-tab-${tab.value}`}
                  className={`min-w-0 flex-1 whitespace-nowrap rounded-lg px-2 py-2 text-center text-[13px] font-semibold transition md:flex-none md:px-5 md:text-sm ${
                    active
                      ? "bg-white text-blue-600 shadow-sm md:bg-blue-600 md:text-white md:shadow-none"
                      : "text-slate-500 hover:text-slate-800 md:bg-slate-100 md:text-slate-600 md:hover:bg-slate-200"
                  }`}
                >
                  <span className="sm:hidden">{tab.short}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls="search-fields"
            data-testid="filter-toggle-button"
            className={`inline-flex h-12 shrink-0 items-center gap-1 whitespace-nowrap rounded-xl px-3 text-[13px] font-semibold transition md:ml-auto md:text-sm ${
              expanded
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <SlidersHorizontal size={15} />
            <span>Filter</span>
            <ChevronDown
              size={14}
              className={`transition-transform md:hidden ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* <form ...> tetap seperti sebelumnya */}

      {/* Seluruh form collapse di mobile, selalu tampil di md+ */}
      <form
        id="search-fields"
        role="search"
        onSubmit={handleSubmit}
        className={`${
          expanded ? "flex" : "hidden"
        } flex-col gap-3 px-3 pb-3 pt-3 md:mt-3 md:flex md:flex-row md:items-end md:p-0`}
      >
        <label className={`${fieldLabel} md:flex-1`}>
          <span>Cari mobil</span>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              enterKeyHint="search"
              value={draft.query}
              onChange={(event) => patchDraft({ query: event.target.value })}
              placeholder="Avanza, Fortuner, Ioniq..."
              data-testid="search-input"
              className={`${fieldControl} pl-9`}
            />
          </div>
        </label>

        <label className={`${fieldLabel} md:w-44`}>
          <span>Merek</span>
          <select
            value={draft.brand}
            onChange={(event) => patchDraft({ brand: event.target.value })}
            data-testid="brand-select"
            className={fieldControl}
          >
            <option value="">Semua merek</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className={`${fieldLabel} md:w-44`}>
          <span>Tipe bodi</span>
          <select
            value={draft.type}
            onChange={(event) => patchDraft({ type: event.target.value })}
            data-testid="type-select"
            className={fieldControl}
          >
            <option value="">Semua tipe</option>
            {carTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className={`${fieldLabel} md:w-44`}>
          <span>{draft.mode === "sewa" ? "Harga sewa" : "Harga beli"}</span>
          <select
            value={draft.maxPrice}
            onChange={(event) =>
              patchDraft({ maxPrice: Number(event.target.value) })
            }
            data-testid="price-select"
            className={fieldControl}
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          data-testid="search-submit-button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] md:w-auto"
        >
          <Search size={17} />
          Cari Mobil
        </button>
      </form>
    </section>
  );
}
