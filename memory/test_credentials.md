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

## Data Uji (25 Sep 2026)
- titip-muhm4t2y-kusum — Daihatsu Xenia R, sewa, APPROVED
- titip-muhm4t6z-lcyv6 — Honda Brio Satya, jual, REJECTED
- titip-muhm9g1o-057ny — Toyota TESTX, sewa, APPROVED (dibuat testing agent)
