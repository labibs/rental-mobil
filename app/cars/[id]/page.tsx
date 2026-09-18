import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { BookingForm } from "./booking-form";
import { cars, formatUsd } from "../../data/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = cars.find((item) => item.id === id);

  if (!car) {
    notFound();
  }

  return (
    <main className="detail-shell">
      <header className="detail-topbar">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} />
          Kembali ke katalog
        </Link>
        <Link href="/" className="brand dark">
          <span>
            <Car size={21} />
          </span>
          Mitra.Mobil
        </Link>
      </header>

      <section className="detail-layout">
        <div className="detail-main">
          <div className="detail-hero">
            <img src={car.image} alt={car.name} />
          </div>
          <div className="thumb-row">
            {car.gallery.map((image) => (
              <img src={image} alt={`${car.name} gallery`} key={image} />
            ))}
          </div>

          <section className="detail-card">
            <div className="detail-title">
              <div>
                <p>
                  {car.brand} / {car.type}
                </p>
                <h1>{car.name}</h1>
              </div>
              <span className={`badge ${car.tagClass}`}>{car.tag}</span>
            </div>
            <p className="detail-description">{car.description}</p>
            <div className="detail-stats">
              <span>
                <Star size={17} fill="currentColor" />
                {car.rating} rating
              </span>
              <span>
                <Users size={17} />
                {car.seats} kursi
              </span>
              <span>
                <Fuel size={17} />
                {car.fuel}
              </span>
              <span>
                <Gauge size={17} />
                {car.transmission}
              </span>
              <span>
                <MapPin size={17} />
                {car.location}
              </span>
              <span>
                <ShieldCheck size={17} />
                {car.freeTestDrive ? "Free test drive" : "Booking terjadwal"}
              </span>
            </div>
          </section>

          <section className="detail-card">
            <div className="detail-title compact">
              <div>
                <p>Informasi Unit</p>
                <h2>Spesifikasi dan fasilitas</h2>
              </div>
              <strong>{formatUsd(car.buyPrice)}</strong>
            </div>
            <div className="spec-grid">
              {car.specs.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="detail-aside">
          <BookingForm car={car} />
        </aside>
      </section>
    </main>
  );
}
