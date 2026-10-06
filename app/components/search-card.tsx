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

const NAVBAR_HEIGHT_MOBILE = 60; // Tinggi pasti navbar mobile (px)

type Props = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onSearch: (next: Filters) => void;
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
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);

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

  // Active filter count
  const activeFilterCount = [
    Boolean(draft.brand),
    Boolean(draft.type),
    Boolean(draft.maxPrice > 0),
    Boolean(draft.query.trim()),
  ].filter(Boolean).length;

  return (
    <section
      style={{ "--sticky-top": `${NAVBAR_HEIGHT_MOBILE}px` } as CSSProperties}
      className="sticky top-[var(--sticky-top)] z-30 bg-white border-t border-slate-200/90 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.18)] transition-all md:static md:top-auto md:rounded-2xl md:p-4 md:shadow-lg md:ring-1 md:ring-slate-200 md:border-t-0"
      data-testid="search-card"
    >
      {/* Baris 1: Mode Tabs + Tombol Filter */}
      <div className="flex flex-nowrap items-center justify-between gap-2 px-4 py-2.5 md:p-0">

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
                className={`min-w-0 flex-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-center text-[13px] font-semibold transition md:flex-none md:px-5 md:text-sm ${
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
          className={`inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 text-[13px] font-semibold transition md:h-10 md:text-sm ${
            expanded
              ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              : activeFilterCount > 0
              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-300 hover:bg-blue-100"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          title={expanded ? "Tutup panel filter" : "Buka panel filter & pencarian"}
        >
          <SlidersHorizontal size={15} />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span
              className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                expanded ? "bg-white text-blue-700" : "bg-blue-600 text-white"
              }`}
            >
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Baris 2: Form Filter & Pencarian (Collapsible) */}
      <form
        id="search-fields"
        role="search"
        onSubmit={handleSubmit}
        className={`${
          expanded ? "flex" : "hidden"
        } flex-col gap-3 px-3 pb-3 pt-3 border-t border-slate-100 mt-2.5 md:mt-3 md:flex-row md:items-end md:p-0 md:pt-3`}
      >
        <label className={`${fieldLabel} md:flex-[1.5] md:min-w-[190px]`}>
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
              placeholder="Avanza, Brio, Ioniq..."
              data-testid="search-input"
              className={`${fieldControl} pl-9`}
            />
          </div>
        </label>

        <label className={`${fieldLabel} md:flex-1 md:min-w-[130px]`}>
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

        <label className={`${fieldLabel} md:flex-1 md:min-w-[125px]`}>
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

        <label className={`${fieldLabel} md:flex-1 md:min-w-[135px]`}>
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

        <div className="flex gap-2 w-full md:w-auto">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                const reset: Filters = { ...draft, brand: "", type: "", maxPrice: 0, query: "" };
                setDraft(reset);
                onChange(reset);
                onSearch(reset);
              }}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              title="Reset filter"
            >
              Reset
            </button>
          )}

          <button
            type="submit"
            data-testid="search-submit-button"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] md:flex-none md:w-auto"
          >
            <Search size={17} />
            Cari Mobil
          </button>
        </div>
      </form>
    </section>
  );
}
