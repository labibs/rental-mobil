"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { formatRupiah, type CarItem } from "../../data/cars";

export function BookingForm({ car }: { car: CarItem }) {
  const [pickupDate, setPickupDate] = useState("2026-09-19");
  const [returnDate, setReturnDate] = useState("2026-09-21");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState(car.location);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / 86_400_000);
    return Math.max(diff, 1);
  }, [pickupDate, returnDate]);

  const serviceFee = 150000;
  const subtotal = car.rentPrice * days;
  const total = subtotal + serviceFee;

  function submitBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
  }

  return (
    <form className="booking-card" onSubmit={submitBooking}>
      <div className="booking-price">
        <span>Mulai dari</span>
        <strong>{formatRupiah(car.rentPrice)}</strong>
        <small>per hari</small>
      </div>

      <label>
        <span>
          <UserRound size={16} />
          Nama
        </span>
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="Nama lengkap"
          required
          value={name}
        />
      </label>

      <label>
        <span>
          <Phone size={16} />
          Nomor WhatsApp
        </span>
        <input
          onChange={(event) => setPhone(event.target.value)}
          placeholder="08xxxxxxxxxx"
          required
          type="tel"
          value={phone}
        />
      </label>

      <div className="date-grid">
        <label>
          <span>
            <CalendarDays size={16} />
            Ambil
          </span>
          <input
            min="2026-09-18"
            onChange={(event) => setPickupDate(event.target.value)}
            required
            type="date"
            value={pickupDate}
          />
        </label>
        <label>
          <span>
            <CalendarDays size={16} />
            Kembali
          </span>
          <input
            min={pickupDate}
            onChange={(event) => setReturnDate(event.target.value)}
            required
            type="date"
            value={returnDate}
          />
        </label>
      </div>

      <label>
        <span>
          <MapPin size={16} />
          Lokasi Ambil
        </span>
        <select value={pickup} onChange={(event) => setPickup(event.target.value)}>
          <option>{car.location}</option>
          <option>Simpang Lima</option>
          <option>Bandara Ahmad Yani</option>
          <option>Stasiun Tawang</option>
          <option>Antar ke alamat saya</option>
        </select>
      </label>

      <div className="booking-summary">
        <div>
          <span>
            {days} hari x {formatRupiah(car.rentPrice)}
          </span>
          <strong>{formatRupiah(subtotal)}</strong>
        </div>
        <div>
          <span>Biaya layanan</span>
          <strong>{formatRupiah(serviceFee)}</strong>
        </div>
        <div className="total">
          <span>Total</span>
          <strong>{formatRupiah(total)}</strong>
        </div>
      </div>

      <button className="booking-submit" type="submit">
        <CreditCard size={18} />
        Booking Online
      </button>

      {confirmed && (
        <div className="booking-success">
          <CheckCircle2 size={18} />
          Booking {car.name} berhasil dibuat. Admin akan menghubungi{" "}
          {phone || "nomor Anda"}.
        </div>
      )}
    </form>
  );
}
