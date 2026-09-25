# PRD — Mitra.Mobil (Rental & Jual Beli Mobil)

## Problem Statement
Web katalog rental/jual mobil (Next.js 15 prototype). Permintaan user (Sep 2026): tambahkan menu "Titip Mobil" berisi Titip Sewa dan Titip Jual, lengkap dengan form, dan data yang disubmit harus menunggu approve admin dulu sebelum tampil di katalog utama. Desain mengikuti yang sudah ada.

## Arsitektur
- Next.js 15 App Router (TypeScript), berjalan via `yarn dev` port 3000 (supervisor lama menunjuk path /app/frontend yang sudah tidak ada).
- Penyimpanan pengajuan titip mobil: file JSON `/app/data/consignments.json` (pilihan user untuk prototype).
- Foto upload: Emergent Object Storage via `/app/app/lib/storage.ts`, disajikan lewat `/api/consignments/photo/<path>`.
- Auth admin: cookie HMAC `autohunt_admin_session` (login route + middleware), diverifikasi ulang di API admin via `/app/app/lib/admin-session.ts`.

## Persona
- Pemilik mobil: menitipkan mobil untuk disewakan/dijual.
- Admin: meninjau dan menyetujui/menolak pengajuan.
- Pengunjung: melihat katalog (mobil statis + titipan yang approved).

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
