import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { BookingForm } from "./booking-form";
import { SiteHeader } from "../../components/site-header";
import { CarGallery } from "../../components/car-gallery";
import { ShareButton } from "../../components/share-button";
import { cars, formatBuyPrice, formatRupiah, type CarItem } from "../../data/cars";
import { listConsignments } from "../../lib/consignment-store";
import { consignmentToCarItem } from "../../lib/consignment-types";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let car: CarItem | undefined = cars.find((item) => item.id === id);

  if (!car) {
    const consigned = await listConsignments();
    car = consigned
      .filter((item) => item.status === "approved")
      .map(consignmentToCarItem)
      .find((item) => item.id === id);
  }

  if (!car) {
    notFound();
  }

  return (
    <main className="detail-shell">
      <SiteHeader />
      <div className="page-back">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} />
          Kembali ke katalog
        </Link>
      </div>

      <section className="detail-layout">
        <div className="detail-main">
          <CarGallery images={car.gallery} name={car.name} />

          <section className="detail-card">
            <div className="detail-title">
              <div>
                <p>
                  {car.brand} / {car.type}
                </p>
                <h1>{car.name}</h1>
              </div>
              <div className="detail-title-actions">
                <span className={`badge ${car.tagClass}`}>{car.tag}</span>
                <ShareButton
                  carId={car.id}
                  name={car.name}
                  priceLabel={
                    car.modes.includes("Rent Car")
                      ? `${formatRupiah(car.rentPrice)}/hari`
                      : formatBuyPrice(car.buyPrice)
                  }
                  variant="full"
                />
              </div>
            </div>
            <p className="detail-description">{car.description}</p>
            <div className="detail-stats">
              <span>
                <Star size={17} fill="currentColor" />
                {car.rating} penilaian
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
                {car.freeTestDrive ? "Test drive gratis" : "Pemesanan terjadwal"}
              </span>
            </div>
          </section>

          <section className="detail-card">
            <div className="detail-title compact">
              <div>
                <p>Informasi Unit</p>
                <h2>Spesifikasi dan fasilitas</h2>
              </div>
              <strong>{formatBuyPrice(car.buyPrice)}</strong>
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
