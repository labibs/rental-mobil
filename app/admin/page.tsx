 "use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Car,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Gauge,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";

const stats = [
  {
    label: "Total Pendapatan",
    value: "Rp 128,4 jt",
    trend: "+18.2%",
    icon: CircleDollarSign,
    className: "revenue",
  },
  {
    label: "Booking Aktif",
    value: "42",
    trend: "+9.8%",
    icon: ClipboardList,
    className: "booking",
  },
  {
    label: "Armada Tersedia",
    value: "86",
    trend: "-3.1%",
    icon: Car,
    className: "fleet",
  },
  {
    label: "Pelanggan Baru",
    value: "312",
    trend: "+22.4%",
    icon: Users,
    className: "customer",
  },
];

const bookings = [
  ["BKG-1048", "Rafi Putra", "BMW M4 Coupe", "18 Sep", "Berjalan", "Rp 2,4 jt"],
  ["BKG-1047", "Nadia R.", "Tesla Model S", "18 Sep", "Menunggu", "Rp 1,8 jt"],
  ["BKG-1046", "Arkan D.", "Toyota Supra", "19 Sep", "Disetujui", "Rp 2,1 jt"],
  ["BKG-1045", "Maya Sari", "Honda Civic", "20 Sep", "Selesai", "Rp 980 rb"],
];

const fleets = [
  ["BMW M4 Coupe", "Sedan", "B 1420 AU", "Tersedia", "92%"],
  ["Tesla Model S", "Electric", "B 7710 EV", "Disewa", "87%"],
  ["Toyota Supra", "Sport", "B 9088 TR", "Servis", "64%"],
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "Booking", icon: ClipboardList },
  { key: "fleet", label: "Armada", icon: KeyRound },
  { key: "customers", label: "Pelanggan", icon: Users },
  { key: "service", label: "Servis", icon: Wrench },
  { key: "settings", label: "Pengaturan", icon: Settings },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCarForm, setShowCarForm] = useState(false);
  const [fleetRows, setFleetRows] = useState(fleets);
  const [newCar, setNewCar] = useState({
    name: "",
    type: "SUV",
    plate: "",
  });

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return bookings;
    return bookings.filter((row) =>
      row.join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const currentSection =
    navItems.find((item) => item.key === activeSection) || navItems[0];

  function handleAddCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newCar.name.trim() || !newCar.plate.trim()) return;

    setFleetRows((current) => [
      [
        newCar.name.trim(),
        newCar.type,
        newCar.plate.trim().toUpperCase(),
        "Tersedia",
        "100%",
      ],
      ...current,
    ]);
    setNewCar({ name: "", type: "SUV", plate: "" });
    setShowCarForm(false);
    setActiveSection("fleet");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <span>
            <Car size={21} />
          </span>
          Auto.Hunt
        </Link>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.key}
                className={activeSection === item.key ? "active" : ""}
                onClick={() => setActiveSection(item.key)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="support-card">
          <ShieldCheck size={22} />
          <strong>Proteksi Aktif</strong>
          <span>Semua transaksi hari ini terpantau aman.</span>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          <LogOut size={17} />
          Keluar
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>Admin Panel</p>
            <h1>{currentSection.label} Rental Mobil</h1>
          </div>
          <label className="admin-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari booking, mobil, pelanggan..."
            />
          </label>
          <button
            type="button"
            className="icon-button light"
            title="Notifikasi"
            onClick={() => setShowNotifications((current) => !current)}
          >
            <Bell size={18} />
            <i />
          </button>
          <button
            type="button"
            className="primary-admin-button"
            onClick={() => setShowCarForm(true)}
          >
            <Plus size={17} />
            Tambah Mobil
          </button>
        </header>

        {showNotifications && (
          <div className="admin-notice">
            <Bell size={17} />
            <span>2 booking menunggu persetujuan hari ini.</span>
          </div>
        )}

        {activeSection === "dashboard" && (
          <div className="stats-grid">
          {stats.map((item) => {
            const Icon = item.icon;
            const negative = item.trend.startsWith("-");
            return (
              <article className={`stat-card ${item.className}`} key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="stat-icon">
                  <Icon size={22} />
                </div>
                <small className={negative ? "down" : "up"}>
                  {negative ? (
                    <ArrowDownRight size={14} />
                  ) : (
                    <ArrowUpRight size={14} />
                  )}
                  {item.trend} bulan ini
                </small>
              </article>
            );
          })}
          </div>
        )}

        {activeSection === "dashboard" ? (
          <div className="admin-layout">
          <section className="admin-card wide">
            <div className="section-title">
              <div>
                <p>Operasional</p>
                <h2>Booking Terbaru</h2>
              </div>
              <button title="Menu lainnya">
                <MoreHorizontal size={19} />
              </button>
            </div>
            <div className="booking-table">
              <div className="table-row table-head">
                <span>ID</span>
                <span>Pelanggan</span>
                <span>Mobil</span>
                <span>Tanggal</span>
                <span>Status</span>
                <span>Total</span>
              </div>
              {filteredBookings.map((row) => (
                <div className="table-row" key={row[0]}>
                  {row.map((cell, index) => (
                    <span
                      key={`${row[0]}-${cell}`}
                      className={index === 4 ? `status ${cell.toLowerCase()}` : ""}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
              {filteredBookings.length === 0 && (
                <p className="empty-state">Booking tidak ditemukan.</p>
              )}
            </div>
          </section>

          <section className="admin-card">
            <div className="section-title">
              <div>
                <p>Hari Ini</p>
                <h2>Jadwal Ambil</h2>
              </div>
              <CalendarDays size={20} />
            </div>
            <div className="timeline">
              <div>
                <Clock3 size={16} />
                <span>09:00</span>
                <strong>Tesla Model S</strong>
                <small>Diambil Nadia R.</small>
              </div>
              <div>
                <MapPin size={16} />
                <span>11:30</span>
                <strong>BMW M4 Coupe</strong>
                <small>Antar ke Tembalang</small>
              </div>
              <div>
                <CheckCircle2 size={16} />
                <span>15:00</span>
                <strong>Honda Civic</strong>
                <small>Pengembalian unit</small>
              </div>
            </div>
          </section>

          <section className="admin-card wide">
            <div className="section-title">
              <div>
                <p>Fleet</p>
                <h2>Manajemen Armada</h2>
              </div>
              <button className="mini-action">
                <Plus size={16} />
                Unit
              </button>
            </div>
            <div className="fleet-list">
              {fleetRows.map((item) => (
                <article key={item[0]}>
                  <div className="fleet-thumb">
                    <Car size={22} />
                  </div>
                  <div>
                    <strong>{item[0]}</strong>
                    <span>{item[1]} / {item[2]}</span>
                  </div>
                  <span className={`fleet-status ${item[3].toLowerCase()}`}>
                    {item[3]}
                  </span>
                  <div className="health">
                    <Gauge size={16} />
                    {item[4]}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-card">
            <div className="section-title">
              <div>
                <p>Pengguna</p>
                <h2>Top Pelanggan</h2>
              </div>
              <UserRound size={20} />
            </div>
            <div className="customer-list">
              {["Rafi Putra", "Nadia R.", "Maya Sari"].map((name, index) => (
                <div key={name}>
                  <span>{name.charAt(0)}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{8 - index} transaksi</small>
                  </div>
                  <b>Rp {12 - index * 2},1 jt</b>
                </div>
              ))}
            </div>
          </section>
          </div>
        ) : (
          <section className="admin-card admin-section-page">
            <div className="section-title">
              <div>
                <p>Manajemen</p>
                <h2>{currentSection.label}</h2>
              </div>
              {activeSection === "fleet" && (
                <button
                  type="button"
                  className="mini-action"
                  onClick={() => setShowCarForm(true)}
                >
                  <Plus size={16} />
                  Unit
                </button>
              )}
            </div>

            {activeSection === "bookings" && (
              <div className="booking-table">
                <div className="table-row table-head">
                  <span>ID</span>
                  <span>Pelanggan</span>
                  <span>Mobil</span>
                  <span>Tanggal</span>
                  <span>Status</span>
                  <span>Total</span>
                </div>
                {filteredBookings.map((row) => (
                  <div className="table-row" key={row[0]}>
                    {row.map((cell, index) => (
                      <span
                        key={`${row[0]}-${cell}`}
                        className={index === 4 ? `status ${cell.toLowerCase()}` : ""}
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
                {filteredBookings.length === 0 && (
                  <p className="empty-state">Booking tidak ditemukan.</p>
                )}
              </div>
            )}

            {activeSection === "fleet" && (
              <div className="fleet-list">
                {fleetRows.map((item) => (
                  <article key={`${item[0]}-${item[2]}`}>
                    <div className="fleet-thumb">
                      <Car size={22} />
                    </div>
                    <div>
                      <strong>{item[0]}</strong>
                      <span>{item[1]} / {item[2]}</span>
                    </div>
                    <span className={`fleet-status ${item[3].toLowerCase()}`}>
                      {item[3]}
                    </span>
                    <div className="health">
                      <Gauge size={16} />
                      {item[4]}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeSection === "customers" && (
              <div className="customer-list">
                {["Rafi Putra", "Nadia R.", "Maya Sari"].map((name, index) => (
                  <div key={name}>
                    <span>{name.charAt(0)}</span>
                    <div>
                      <strong>{name}</strong>
                      <small>{8 - index} transaksi</small>
                    </div>
                    <b>Rp {12 - index * 2},1 jt</b>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "service" && (
              <div className="admin-placeholder">
                <Wrench size={30} />
                <h3>Jadwal servis</h3>
                <p>Belum ada unit yang masuk antrean servis.</p>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="admin-placeholder">
                <Settings size={30} />
                <h3>Pengaturan panel</h3>
                <p>Pengaturan akun dan notifikasi siap dikembangkan.</p>
              </div>
            )}
          </section>
        )}

        {showCarForm && (
          <div className="admin-modal-backdrop" role="presentation">
            <form className="admin-modal" onSubmit={handleAddCar}>
              <div className="section-title">
                <div>
                  <p>Armada</p>
                  <h2>Tambah Mobil</h2>
                </div>
                <button
                  type="button"
                  className="icon-button light"
                  onClick={() => setShowCarForm(false)}
                  aria-label="Tutup formulir"
                >
                  ×
                </button>
              </div>
              <label>
                Nama mobil
                <input
                  required
                  value={newCar.name}
                  onChange={(event) =>
                    setNewCar({ ...newCar, name: event.target.value })
                  }
                  placeholder="Contoh: Hyundai Ioniq 5"
                />
              </label>
              <label>
                Tipe
                <select
                  value={newCar.type}
                  onChange={(event) =>
                    setNewCar({ ...newCar, type: event.target.value })
                  }
                >
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Electric</option>
                  <option>Sport</option>
                </select>
              </label>
              <label>
                Nomor polisi
                <input
                  required
                  value={newCar.plate}
                  onChange={(event) =>
                    setNewCar({ ...newCar, plate: event.target.value })
                  }
                  placeholder="B 1234 AH"
                />
              </label>
              <button type="submit" className="primary-admin-button">
                <Plus size={17} />
                Simpan Unit
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
