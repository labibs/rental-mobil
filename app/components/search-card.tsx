"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
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
  "flex min-w-0 flex-col gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400";
const fieldControl =
  "h-9 w-full rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15";

export function SearchCard({ filters, onChange, onSearch }: Props) {
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
    setExpanded(false); // tutup panel setelah cari
  };

  const handleReset = () => {
    const reset: Filters = {
      ...draft,
      brand: "",
      type: "",
      maxPrice: 0,
      query: "",
    };
    setDraft(reset);
    onChange(reset);
    onSearch(reset);
  };

  const activeFilterCount = [
    Boolean(draft.brand),
    Boolean(draft.type),
    Boolean(draft.maxPrice > 0),
    Boolean(draft.query.trim()),
  ].filter(Boolean).length;

  return (
    <section
      style={{ "--sticky-top": `${NAVBAR_HEIGHT_MOBILE}px` } as CSSProperties}
      className="sticky top-[var(--sticky-top)] z-30 w-full border-b border-slate-200/80 bg-white/90 shadow-[0_10px_24px_-12px_rgba(30,64,175,0.25)] backdrop-blur-md transition-all md:static md:top-auto md:rounded-2xl md:border md:border-slate-200 md:bg-white md:p-3.5 md:shadow-lg md:shadow-blue-900/5 md:backdrop-blur-none"
      data-testid="search-card"
    >
      {/* Aksen gradient tipis di atas */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 md:hidden" />

      {/* Baris 1: Mode Tabs + Tombol Filter */}
      <div className="flex flex-nowrap items-center justify-between gap-2 px-3 py-2 md:p-0">
        <div
          role="tablist"
          className="flex h-9 min-w-0 flex-1 items-stretch gap-0.5 rounded-full bg-slate-100 p-0.5 md:flex-none md:gap-1.5 md:bg-transparent md:p-0"
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
                className={`flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full px-3 text-[11px] font-semibold transition-all md:flex-none md:px-4 md:text-xs ${active
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-100 md:bg-blue-600 md:text-white md:ring-0"
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
          className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition md:text-xs ${expanded || activeFilterCount > 0
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          title={expanded ? "Tutup panel filter" : "Buka panel filter & pencarian"}
        >
          <SlidersHorizontal size={13} />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-blue-700">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Baris 2: Form Filter & Pencarian (Collapsible dengan animasi) */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0 md:grid-rows-[0fr]"
          }`}
      >
        <form
          id="search-fields"
          role="search"
          onSubmit={handleSubmit}
          className="min-h-0 overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white px-3 pb-3 pt-3 md:flex md:flex-row md:items-end md:border-t-0 md:bg-none md:p-0 md:pt-3">
            <label
              className={`${fieldLabel} col-span-2 md:flex-[1.5] md:min-w-[190px]`}
            >
              <span>Cari mobil</span>
              <div className="relative">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  enterKeyHint="search"
                  value={draft.query}
                  onChange={(event) => patchDraft({ query: event.target.value })}
                  placeholder="Avanza, Brio, Ioniq..."
                  data-testid="search-input"
                  className={`${fieldControl} pl-8`}
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

            <label
              className={`${fieldLabel} col-span-2 md:col-span-1 md:flex-1 md:min-w-[135px]`}
            >
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

            <div className="col-span-2 flex w-full gap-2 md:col-span-1 md:w-auto">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  title="Reset filter"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}

              <button
                type="submit"
                data-testid="search-submit-button"
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-xs font-semibold text-white shadow-md shadow-blue-600/25 transition hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] md:flex-none md:w-auto"
              >
                <Search size={14} />
                Cari Mobil
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}