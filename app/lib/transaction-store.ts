"use client";

import { useEffect, useState } from "react";

export type Transaction = {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  carBrand?: string;
  type: "Sewa Harian" | "Beli Mobil";
  startDate: string;
  endDate?: string;
  totalPrice: number;
  status: "Sedang Berjalan" | "Menunggu Konfirmasi" | "Selesai" | "Dibatalkan";
  createdAt: string;
  location: string;
  customerName?: string;
  customerPhone?: string;
  days?: number;
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TRX-829104",
    carId: "toyota-avanza",
    carName: "Toyota Avanza 1.5 G CVT",
    carImage: "/cars/avanza.png",
    carBrand: "Toyota",
    type: "Sewa Harian",
    startDate: "2026-10-06",
    endDate: "2026-10-08",
    totalPrice: 700000,
    status: "Sedang Berjalan",
    createdAt: "Hari ini, 09:30",
    location: "Cilacap Kota",
    customerName: "Pelanggan Setia",
    days: 2,
  },
  {
    id: "TRX-614022",
    carId: "toyota-innova-zenix",
    carName: "Toyota Innova Zenix 2.0 V",
    carImage: "/cars/zenix.png",
    carBrand: "Toyota",
    type: "Sewa Harian",
    startDate: "2026-09-28",
    endDate: "2026-09-30",
    totalPrice: 1500000,
    status: "Selesai",
    createdAt: "28 Sep 2026",
    location: "Stasiun Kroya",
    customerName: "Pelanggan Setia",
    days: 2,
  },
];

const STORAGE_KEY = "mitra_mobil_transactions";

export function getStoredTransactions(): Transaction[] {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

export function saveTransaction(trx: Transaction) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredTransactions();
    const updated = [trx, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("mitra_mobil_transactions_updated"));
  } catch (err) {
    console.error("Failed to save transaction", err);
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTransactions(getStoredTransactions());

    function handleUpdate() {
      setTransactions(getStoredTransactions());
    }

    window.addEventListener("mitra_mobil_transactions_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("mitra_mobil_transactions_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { transactions: mounted ? transactions : INITIAL_TRANSACTIONS, mounted };
}
