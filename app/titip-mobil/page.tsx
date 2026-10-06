"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Car,
  CheckCircle2,
  FileText,
  ImagePlus,
  KeyRound,
  Loader2,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brands } from "../data/cars";
import { SiteHeader } from "../components/site-header";
import { WhatsappFab } from "../components/whatsapp-fab";

type ConsignKind = "sewa" | "jual";

const MAX_PHOTOS = 6;

const initialForm = {
  ownerName: "",
  whatsapp: "",
  brand: "",
  name: "",
  year: "",
  transmission: "Otomatis",
  fuel: "Bensin",
  plate: "",
  price: "",
  location: "",
  imageUrl: "",
  description: "",
};

export default function TitipMobilPage() {
  const [kind, setKind] = useState<ConsignKind>("sewa");
  const [form, setForm] = useState(initialForm);
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUploading = uploadingCount > 0;

  function update(key: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadOne(file: File) {
    const data = new FormData();
    data.append("photo", file);
    const response = await fetch("/api/consignments/upload", {
      method: "POST",
      body: data,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.message || "Upload foto gagal.");
    }
    return result.url as string;
  }

  async function handlePhotoChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      setError(`Maksimal ${MAX_PHOTOS} foto.`);
      return;
    }
    const selected = Array.from(files).slice(0, remaining);

    setError("");
    setUploadingCount(selected.length);

    for (const file of selected) {
      try {
        const url = await uploadOne(file);
        setPhotos((current) =>
          current.length < MAX_PHOTOS ? [...current, url] : current,
        );
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Upload foto gagal.",
        );
      } finally {
        setUploadingCount((current) => Math.max(0, current - 1));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addPhotoUrl() {
    const trimmed = form.imageUrl.trim();
    if (!trimmed) return;
    if (photos.length >= MAX_PHOTOS) {
      setError(`Maksimal ${MAX_PHOTOS} foto.`);
      return;
    }
    setPhotos((current) => [...current, trimmed]);
    update("imageUrl", "");
    setError("");
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.ownerName.trim()) {
      setError("Nama lengkap pemilik wajib diisi.");
      return;
    }
    if (!form.whatsapp.trim()) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }
    if (!form.brand.trim() || !form.name.trim()) {
      setError("Brand dan nama mobil wajib diisi.");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Harga / tarif sewa harus berupa angka yang valid.");
      return;
    }

    setIsSubmitting(true);

    try {
      const gallery = form.imageUrl.trim()
        ? [...photos, form.imageUrl.trim()]
        : photos;
      const response = await fetch("/api/consignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: gallery[0] || "", gallery, kind }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Pengajuan gagal dikirim.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Pengajuan gagal dikirim.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetAll() {
    setForm(initialForm);
    setPhotos([]);
    setError("");
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        {/* Tombol Kembali */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
            data-testid="back-to-catalog-link"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke katalog</span>
          </Link>
        </div>

        {/* Hero Section dengan Animasi Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 ring-1 ring-blue-200 uppercase tracking-wider mb-3">
            <span>🚗</span>
            <span>Layanan Kemitraan Mitra Mobil</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-3">
            Titipkan Mobilmu, Biar Kami Pasarkan
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
            Dapatkan passive income harian atau jual mobilmu dengan aman tanpa repot. Cukup isi formulir di bawah ini, tim admin kami akan memverifikasi dan mobilmu langsung tampil di katalog.
          </p>
        </motion.div>

        {/* Pilihan Jenis Layanan: Titip Sewa vs Titip Jual */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          data-testid="consign-kind-selector"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            data-testid="kind-sewa-button"
            onClick={() => setKind("sewa")}
            className={`relative flex flex-col items-start p-5 sm:p-6 rounded-2xl text-left transition-all ${
              kind === "sewa"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600"
                : "bg-white text-slate-800 shadow-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  kind === "sewa" ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                }`}
              >
                <KeyRound size={22} />
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  kind === "sewa" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
                }`}
              >
                Populer
              </span>
            </div>
            <strong className="text-lg font-bold mb-1">Titip Sewa Harian</strong>
            <span className={`text-xs sm:text-sm leading-relaxed ${kind === "sewa" ? "text-blue-100" : "text-slate-500"}`}>
              Mobilmu disewakan per hari. Kamu bebas tentukan tarif sewa, kami kelola operasional dan perawatannya.
            </span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            data-testid="kind-jual-button"
            onClick={() => setKind("jual")}
            className={`relative flex flex-col items-start p-5 sm:p-6 rounded-2xl text-left transition-all ${
              kind === "jual"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600"
                : "bg-white text-slate-800 shadow-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  kind === "jual" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"
                }`}
              >
                <BadgeDollarSign size={22} />
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  kind === "jual" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Bebas Repot
              </span>
            </div>
            <strong className="text-lg font-bold mb-1">Titip Jual Mobil</strong>
            <span className={`text-xs sm:text-sm leading-relaxed ${kind === "jual" ? "text-blue-100" : "text-slate-500"}`}>
              Mobilmu dipasarkan ke ribuan calon pembeli potensial via showroom dan portal online kami.
            </span>
          </motion.button>
        </div>

        {/* Konten Form atau Layar Sukses */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-slate-200/80 max-w-xl mx-auto"
              data-testid="consign-success"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mx-auto mb-6 ring-8 ring-emerald-50/50">
                <CheckCircle2 size={46} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                Pengajuan Berhasil Dikirim!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Terima kasih, <strong className="text-slate-900">{form.ownerName}</strong>. Pengajuan{" "}
                <span className="font-semibold text-blue-600">
                  {kind === "sewa" ? "titip sewa" : "titip jual"} {form.brand} {form.name}
                </span>{" "}
                sedang dalam antrean peninjauan tim admin kami. Setelah disetujui, mobil Anda akan langsung tampil di katalog publik.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  data-testid="consign-again-button"
                >
                  Ajukan Mobil Lain
                </button>
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-700 transition"
                  data-testid="consign-view-catalog-link"
                >
                  <span>Lihat Katalog Mobil</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80 space-y-8"
              data-testid="consign-form"
            >
              {/* Bagian 1: Data Pemilik */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <User size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    1. Data Pemilik
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Nama Lengkap *</span>
                    <input
                      required
                      type="text"
                      value={form.ownerName}
                      onChange={(event) => update("ownerName", event.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      data-testid="input-owner-name"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Nomor WhatsApp Aktif *</span>
                    <input
                      required
                      type="tel"
                      value={form.whatsapp}
                      onChange={(event) => update("whatsapp", event.target.value)}
                      placeholder="08xxxxxxxxxx"
                      data-testid="input-whatsapp"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>
                </div>
              </div>

              {/* Bagian 2: Data Mobil */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Car size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    2. Informasi Kendaraan
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Merek / Brand *</span>
                    <input
                      required
                      list="brand-options"
                      value={form.brand}
                      onChange={(event) => update("brand", event.target.value)}
                      placeholder="Toyota, Honda, Suzuki..."
                      data-testid="input-brand"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <datalist id="brand-options">
                      {brands.map((brand) => (
                        <option value={brand} key={brand} />
                      ))}
                    </datalist>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Nama / Model Mobil *</span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      placeholder="Avanza 1.5 G CVT"
                      data-testid="input-car-name"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Tahun Pembuatan *</span>
                    <input
                      required
                      type="number"
                      min="1990"
                      max="2026"
                      value={form.year}
                      onChange={(event) => update("year", event.target.value)}
                      placeholder="2022"
                      data-testid="input-year"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Transmisi</span>
                    <select
                      value={form.transmission}
                      onChange={(event) => update("transmission", event.target.value)}
                      data-testid="input-transmission"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option>Otomatis</option>
                      <option>Manual</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Bahan Bakar</span>
                    <select
                      value={form.fuel}
                      onChange={(event) => update("fuel", event.target.value)}
                      data-testid="input-fuel"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option>Bensin</option>
                      <option>Diesel</option>
                      <option>Hybrid</option>
                      <option>Listrik</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Nomor Plat (Opsional)</span>
                    <input
                      type="text"
                      value={form.plate}
                      onChange={(event) => update("plate", event.target.value)}
                      placeholder="B 1234 ABC"
                      data-testid="input-plate"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>
                      {kind === "sewa"
                        ? "Tarif Sewa Harian (Rp) *"
                        : "Harga Jual Mobil (Rp) *"}
                    </span>
                    <input
                      required
                      type="number"
                      min="1000"
                      step="1000"
                      value={form.price}
                      onChange={(event) => update("price", event.target.value)}
                      placeholder={kind === "sewa" ? "350000" : "185000000"}
                      data-testid="input-price"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                    <span>Lokasi Mobil (Kota / Daerah) *</span>
                    <input
                      required
                      type="text"
                      value={form.location}
                      onChange={(event) => update("location", event.target.value)}
                      placeholder="Jakarta Selatan, Cilacap, Surabaya..."
                      data-testid="input-location"
                      className="h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </label>
                </div>
              </div>

              {/* Bagian 3: Foto & Deskripsi */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    3. Foto &amp; Deskripsi
                  </h2>
                </div>

                <p className="text-xs text-slate-500 mb-4" data-testid="photo-hint">
                  Unggah hingga <strong>{MAX_PHOTOS} foto</strong> (tampak depan, samping, interior, speedometer). Foto urutan pertama otomatis menjadi foto utama di katalog.
                </p>

                {/* Grid Preview Foto & Tombol Upload */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4" data-testid="photo-grid">
                  {photos.map((url, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
                      key={`${url}-${index}`}
                      data-testid={`photo-item-${index}`}
                    >
                      <img
                        src={url}
                        alt={`Foto mobil ${index + 1}`}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                          Foto Utama
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label="Hapus foto"
                        onClick={() => removePhoto(index)}
                        data-testid={`remove-photo-${index}`}
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-white opacity-90 transition hover:bg-rose-600 hover:opacity-100 shadow"
                      >
                        <X size={13} />
                      </button>
                    </motion.div>
                  ))}

                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      data-testid="photo-upload-button"
                      className="flex h-28 sm:h-32 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-3 text-center transition hover:border-blue-500 hover:bg-blue-50/30"
                    >
                      {isUploading ? (
                        <Loader2 className="animate-spin text-blue-600" size={24} />
                      ) : (
                        <ImagePlus className="text-slate-400 group-hover:text-blue-500" size={24} />
                      )}
                      <span className="text-xs font-bold text-slate-700">
                        {isUploading
                          ? `Mengunggah (${uploadingCount})...`
                          : photos.length === 0
                          ? "Pilih Foto"
                          : "Tambah Foto"}
                      </span>
                      <small className="text-[10px] text-slate-400">
                        {photos.length}/{MAX_PHOTOS} Foto
                      </small>
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  hidden
                  multiple
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => handlePhotoChange(event.target.files)}
                  data-testid="photo-file-input"
                />

                {/* Alternatif Tambah URL Foto */}
                <div className="mb-4">
                  <span className="block text-xs font-bold text-slate-700 mb-1.5">
                    Atau tempel tautan URL foto
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) => update("imageUrl", event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addPhotoUrl();
                        }
                      }}
                      placeholder="https://contoh.com/foto-mobil.jpg"
                      data-testid="input-image-url"
                      className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={addPhotoUrl}
                      disabled={!form.imageUrl.trim()}
                      data-testid="add-photo-url-button"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-40"
                    >
                      Tambah
                    </button>
                  </div>
                </div>

                {/* Deskripsi Tambahan */}
                <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700">
                  <span>Deskripsi Kondisi Kendaraan</span>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                    placeholder="Contoh: Kondisi mesin sangat prima, AC dingin, servis rutin bengkel resmi, tidak pernah terendam banjir..."
                    data-testid="input-description"
                    className="rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </label>
              </div>

              {/* Notifikasi Error */}
              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-700 font-medium" data-testid="consign-error">
                  {error}
                </div>
              )}

              {/* Catatan Verifikasi Keamanan */}
              <div
                className="flex items-center gap-3 rounded-2xl bg-blue-50/70 border border-blue-100 p-4 text-xs sm:text-sm text-blue-900 font-medium"
                data-testid="consign-note"
              >
                <ShieldCheck size={20} className="text-blue-600 shrink-0" />
                <span>
                  Unit titip akan diverifikasi dan disurvei oleh tim profesional Mitra Mobil sebelum tayang publik untuk memastikan keamanan mitra dan penyewa.
                </span>
              </div>

              {/* Tombol Kirim Pengajuan */}
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                data-testid="consign-submit-button"
                className="w-full h-13 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-6 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Sedang Mengirim Pengajuan...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Kirim Pengajuan {kind === "sewa" ? "Titip Sewa" : "Titip Jual"}
                    </span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </main>

      <WhatsappFab />
    </div>
  );
}
