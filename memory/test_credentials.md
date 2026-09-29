# Test Credentials — Mitra.Mobil

## Admin Panel
- URL: /admin/login
- Email: admin@autohunt.local
- Password: admin123
- Sumber: /app/.env (ADMIN_EMAIL, ADMIN_PASSWORD)

## Endpoint Penting
- POST /api/admin/login — login admin (set cookie sesi)
- POST /api/admin/logout — logout
- POST /api/consignments — submit pengajuan titip mobil (publik)
- GET /api/consignments — daftar titipan approved (publik)
- POST /api/consignments/upload — upload foto (object storage)
- GET /api/admin/consignments — list semua pengajuan (admin)
- PATCH /api/admin/consignments/[id] — approve/reject (admin)

## Data Uji (29 Sep 2026 — dibersihkan)
- titip-muhm4t2y-kusum — Daihatsu Xenia R, sewa, APPROVED
- titip-muhm4t6z-lcyv6 — Honda Brio Satya, jual, REJECTED
- (data QA testing agent sudah dihapus dari /app/data/consignments.json)

## Nomor WhatsApp Bisnis
- 0821-7782-6596 (wa.me/6282177826596) — dipakai di footer & notifikasi
