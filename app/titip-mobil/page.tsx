"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ImagePlus,
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { brands } from "../data/cars";
import { SiteHeader } from "../components/site-header";

type ConsignKind = "sewa" | "jual";

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
  const [photoPreview, setPhotoPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(key: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handlePhotoChange(file: File | null) {
    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
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

      update("imageUrl", result.url);
      setPhotoPreview(result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload foto gagal.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kind }),
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
    setPhotoPreview("");
    setError("");
    setSubmitted(false);
  }

  return (
    <main className="detail-shell">
      <SiteHeader />
      <div className="page-back">
        <Link href="/" className="back-link" data-testid="back-to-catalog-link">
          <ArrowLeft size={18} />
          Kembali ke katalog
        </Link>
      </div>

      <section className="consign-shell">
        <div className="consign-hero">
          <p>Layanan Titip Mobil</p>
          <h1>Titipkan mobilmu, biar kami yang pasarkan</h1>
          <span>
            Isi formulir di bawah ini. Pengajuanmu akan ditinjau admin terlebih
            dahulu, lalu otomatis tampil di katalog utama setelah disetujui.
          </span>
        </div>

        <div className="consign-kind-grid" data-testid="consign-kind-selector">
          <button
            type="button"
            data-testid="kind-sewa-button"
            className={kind === "sewa" ? "active" : ""}
            onClick={() => setKind("sewa")}
          >
            <KeyRound size={22} />
            <strong>Titip Sewa</strong>
            <span>Mobilmu disewakan harian, kamu atur harga per hari.</span>
          </button>
          <button
            type="button"
            data-testid="kind-jual-button"
            className={kind === "jual" ? "active" : ""}
            onClick={() => setKind("jual")}
          >
            <BadgeDollarSign size={22} />
            <strong>Titip Jual</strong>
            <span>Mobilmu kami pasarkan untuk dijual ke pembeli.</span>
          </button>
        </div>

        {submitted ? (
          <div className="consign-success" data-testid="consign-success">
            <CheckCircle2 size={42} />
            <h2>Pengajuan berhasil dikirim</h2>
            <p>
              Terima kasih, {form.ownerName}. Pengajuan{" "}
              {kind === "sewa" ? "titip sewa" : "titip jual"} {form.brand}{" "}
              {form.name} kamu sedang menunggu persetujuan admin. Setelah
              disetujui, mobilmu otomatis tampil di katalog utama.
            </p>
            <div>
              <button
                type="button"
                onClick={resetAll}
                data-testid="consign-again-button"
              >
                Ajukan mobil lain
              </button>
              <Link href="/" data-testid="consign-view-catalog-link">
                Lihat katalog
              </Link>
            </div>
          </div>
        ) : (
          <form
            className="consign-form"
            onSubmit={handleSubmit}
            data-testid="consign-form"
          >
            <div className="consign-section">
              <h2>Data Pemilik</h2>
              <div className="consign-grid">
                <label>
                  Nama lengkap
                  <input
                    required
                    value={form.ownerName}
                    onChange={(event) => update("ownerName", event.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    data-testid="input-owner-name"
                  />
                </label>
                <label>
                  Nomor WhatsApp
                  <input
                    required
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => update("whatsapp", event.target.value)}
                    placeholder="08xxxxxxxxxx"
                    data-testid="input-whatsapp"
                  />
                </label>
              </div>
            </div>

            <div className="consign-section">
              <h2>Data Mobil</h2>
              <div className="consign-grid">
                <label>
                  Brand
                  <input
                    required
                    list="brand-options"
                    value={form.brand}
                    onChange={(event) => update("brand", event.target.value)}
                    placeholder="Toyota"
                    data-testid="input-brand"
                  />
                  <datalist id="brand-options">
                    {brands.map((brand) => (
                      <option value={brand} key={brand} />
                    ))}
                  </datalist>
                </label>
                <label>
                  Nama / tipe mobil
                  <input
                    required
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Avanza G"
                    data-testid="input-car-name"
                  />
                </label>
                <label>
                  Tahun
                  <input
                    required
                    type="number"
                    min="1990"
                    max="2026"
                    value={form.year}
                    onChange={(event) => update("year", event.target.value)}
                    placeholder="2021"
                    data-testid="input-year"
                  />
                </label>
                <label>
                  Transmisi
                  <select
                    value={form.transmission}
                    onChange={(event) =>
                      update("transmission", event.target.value)
                    }
                    data-testid="input-transmission"
                  >
                    <option>Otomatis</option>
                    <option>Manual</option>
                  </select>
                </label>
                <label>
                  Bahan bakar
                  <select
                    value={form.fuel}
                    onChange={(event) => update("fuel", event.target.value)}
                    data-testid="input-fuel"
                  >
                    <option>Bensin</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Listrik</option>
                  </select>
                </label>
                <label>
                  Plat nomor
                  <input
                    value={form.plate}
                    onChange={(event) => update("plate", event.target.value)}
                    placeholder="B 1234 AH"
                    data-testid="input-plate"
                  />
                </label>
                <label>
                  {kind === "sewa"
                    ? "Harga sewa per hari (Rp)"
                    : "Harga jual (Rp)"}
                  <input
                    required
                    type="number"
                    min="1000"
                    step="1000"
                    value={form.price}
                    onChange={(event) => update("price", event.target.value)}
                    placeholder={kind === "sewa" ? "350000" : "185000000"}
                    data-testid="input-price"
                  />
                </label>
                <label>
                  Lokasi mobil
                  <input
                    required
                    value={form.location}
                    onChange={(event) => update("location", event.target.value)}
                    placeholder="Semarang Timur"
                    data-testid="input-location"
                  />
                </label>
              </div>
            </div>

            <div className="consign-section">
              <h2>Foto &amp; Deskripsi</h2>
              <div className="consign-photo">
                <button
                  type="button"
                  className="consign-upload"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="photo-upload-button"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Foto mobil" />
                  ) : (
                    <>
                      <ImagePlus size={22} />
                      <span>
                        {isUploading ? "Mengunggah..." : "Upload foto mobil"}
                      </span>
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) =>
                    handlePhotoChange(event.target.files?.[0] ?? null)
                  }
                  data-testid="photo-file-input"
                />
                <label>
                  Atau tempel URL foto
                  <input
                    value={form.imageUrl}
                    onChange={(event) => {
                      update("imageUrl", event.target.value);
                      setPhotoPreview(event.target.value);
                    }}
                    placeholder="https://contoh.com/foto-mobil.jpg"
                    data-testid="input-image-url"
                  />
                </label>
              </div>
              <label>
                Deskripsi singkat
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) => update("description", event.target.value)}
                  placeholder="Kondisi mobil, riwayat servis, alasan titip..."
                  data-testid="input-description"
                />
              </label>
            </div>

            {error && (
              <p className="consign-error" data-testid="consign-error">
                {error}
              </p>
            )}

            <div className="consign-note" data-testid="consign-note">
              <ShieldCheck size={16} />
              Pengajuan ditinjau admin terlebih dahulu sebelum tampil di katalog
              utama.
            </div>

            <button
              type="submit"
              className="booking-submit"
              disabled={isSubmitting || isUploading}
              data-testid="consign-submit-button"
            >
              {isSubmitting ? (
                <Loader2 className="spin" size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
              {isSubmitting
                ? "Mengirim..."
                : `Kirim Pengajuan ${kind === "sewa" ? "Titip Sewa" : "Titip Jual"}`}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
