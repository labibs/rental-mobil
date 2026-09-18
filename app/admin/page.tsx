import Link from "next/link";
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

export default function AdminPage() {
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
          <a className="active">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a>
            <ClipboardList size={18} />
            Booking
          </a>
          <a>
            <KeyRound size={18} />
            Armada
          </a>
          <a>
            <Users size={18} />
            Pelanggan
          </a>
          <a>
            <Wrench size={18} />
            Servis
          </a>
          <a>
            <Settings size={18} />
            Pengaturan
          </a>
        </nav>
        <div className="support-card">
          <ShieldCheck size={22} />
          <strong>Proteksi Aktif</strong>
          <span>Semua transaksi hari ini terpantau aman.</span>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p>Admin Panel</p>
            <h1>Dashboard Rental Mobil</h1>
          </div>
          <label className="admin-search">
            <Search size={18} />
            <input placeholder="Cari booking, mobil, pelanggan..." />
          </label>
          <button className="icon-button light" title="Notifikasi">
            <Bell size={18} />
            <i />
          </button>
          <button className="primary-admin-button">
            <Plus size={17} />
            Tambah Mobil
          </button>
        </header>

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
              {bookings.map((row) => (
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
              {fleets.map((item) => (
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
      </section>
    </main>
  );
}
