# PRD — Mitra.Mobil (Rental & Jual Beli Mobil)

## Problem Statement
Web katalog rental/jual mobil (Next.js 15 prototype). Permintaan user (Sep 2026): tambahkan menu "Titip Mobil" berisi Titip Sewa dan Titip Jual, lengkap dengan form, dan data yang disubmit harus menunggu approve admin dulu sebelum tampil di katalog utama. Desain mengikuti yang sudah ada.

## Arsitektur
- Next.js 15 App Router (TypeScript), berjalan via supervisor `frontend` (`yarn dev -p 3000 -H 0.0.0.0`, directory `/app`). Tidak ada backend FastAPI/Mongo terpisah; API = Next route handlers.
- Penyimpanan pengajuan titip mobil: file JSON `/app/data/consignments.json` (pilihan user untuk prototype).
- Foto upload: Emergent Object Storage via `/app/app/lib/storage.ts`, disajikan lewat `/api/consignments/photo/<path>`.
- Auth admin: cookie HMAC `autohunt_admin_session` (login route + middleware), diverifikasi ulang di API admin via `/app/app/lib/admin-session.ts`.

## Persona
- Pemilik mobil: menitipkan mobil untuk disewakan/dijual.
- Admin: meninjau dan menyetujui/menolak pengajuan.
- Pengunjung: melihat katalog (mobil statis + titipan yang approved).

## Yang Sudah Diimplementasikan (29 Sep 2026) — Redesain DriveX-style
- Landing page baru (`/app/app/page.tsx` + `/app/app/components/*`): header putih sticky + hamburger mobile (`site-header.tsx`), hero besar dengan gambar showroom AI + tagline + 2 CTA + statistik, search card (tab Sewa/Beli Baru/Bekas, cari, merek, tipe bodi, harga; collapsible di HP), brand strip 7 merek, section "Pilihan Untuk Anda" dengan tab kategori (Populer/MPV/SUV/Hatchback/Sedan/Listrik/Bekas), sort, grid kartu (3→2→1 kolom), banner titip mobil, footer.
- Palet baru: charcoal `#151a1f` + biru telur asin `--egg #a8d5d8` / `--egg-deep #3e8f96` (variabel `--blue` dialihkan ke teal agar halaman lama ikut). Font Plus Jakarta Sans. CSS landing di `/app/app/landing.css`.
- Data dummy diganti 17 mobil populer Indonesia (Toyota Avanza/Innova Zenix/Fortuner/Alphard, Honda Brio/HR-V/CR-V, Suzuki Ertiga/XL7, Hyundai Creta/Ioniq 5, BYD Atto 3/Seal, Chery Omoda 5/Tiggo 8, Isuzu Panther/MU-X) dengan gambar AI dan harga Rupiah langsung (tanpa konversi USD). `consignmentToCarItem` sekarang memakai harga Rupiah mentah.
- Halaman detail, titip mobil, admin memakai header baru; admin responsif di HP (nav horizontal scroll, header wrap, tanpa overflow).
- Supervisor `frontend` diperbaiki: `yarn dev -p 3000 -H 0.0.0.0` di `/app`.
- Testing agent iteration_2: semua 9 skenario lulus (desktop + mobile 390px).
- (29 Sep 2026) Baris merek memakai logo resmi SVG self-hosted di `/app/public/brands/*.svg` (Toyota/Honda/Suzuki/Hyundai dari simple-icons; BYD/Chery dari Wikimedia Commons; Isuzu dari worldvectorlogo). Grayscale default, berwarna saat hover/aktif.

## Yang Sudah Diimplementasikan (25 Sep 2026)
- Halaman `/titip-mobil`: pilihan Titip Sewa / Titip Jual + form lengkap (pemilik, WA, brand, tipe, tahun, transmisi, bahan bakar, plat, harga, lokasi, foto upload/URL, deskripsi) + panel sukses "menunggu persetujuan admin".
- API: `POST/GET /api/consignments` (GET publik hanya approved), `POST /api/consignments/upload`, `GET /api/admin/consignments`, `PATCH /api/admin/consignments/[id]` (approve/reject, terproteksi sesi admin).
- Panel admin: nav "Titip Mobil" dengan badge jumlah pending, daftar pengajuan + tombol Setujui/Tolak, notifikasi pending.
- Katalog utama: fetch approved consignments dan merge ke grid (kondisi "Mobil Bekas", badge "Titip Sewa"/"Titip Jual"); halaman detail `/cars/[id]` mendukung mobil titipan (rejected/pending → 404); booking form menyesuaikan mode sewa vs jual.
- Testing agent iteration_1: 9/9 skenario lulus (100%).

## Backlog / Next Tasks
- P1: Migrasi penyimpanan JSON → MongoDB sebelum produksi (JSON tidak concurrency-safe).
- P1: Notifikasi ke pemilik (WhatsApp/email) saat pengajuan disetujui/ditolak.
- P2: Admin bisa edit/hapus pengajuan; unggah multi-foto untuk galeri.
- P2: Caching/ISR untuk GET /api/consignments; pecah admin/page.tsx menjadi komponen per section.
