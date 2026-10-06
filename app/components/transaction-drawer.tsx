"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Receipt,
  ShoppingBag,
  X,
} from "lucide-react";
import { useTransactions, type Transaction } from "../lib/transaction-store";
import { formatRupiah } from "../data/cars";
import { waLink } from "../lib/whatsapp";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function TransactionDrawer({ open, onClose }: Props) {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  if (!open) return null;

  const filtered = transactions.filter((trx) => {
    if (filter === "active") return trx.status === "Sedang Berjalan" || trx.status === "Menunggu Konfirmasi";
    if (filter === "completed") return trx.status === "Selesai";
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Receipt size={19} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Transaksi &amp; Pesanan</h2>
              <p className="text-xs text-slate-500">
                {transactions.length} pesanan terdaftar (dummy)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-100 bg-slate-50/60 px-5 py-2.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            Semua ({transactions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("active")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === "active"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            Aktif (
            {
              transactions.filter(
                (t) => t.status === "Sedang Berjalan" || t.status === "Menunggu Konfirmasi"
              ).length
            }
            )
          </button>
          <button
            type="button"
            onClick={() => setFilter("completed")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === "completed"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            Selesai ({transactions.filter((t) => t.status === "Selesai").length})
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <ShoppingBag size={42} className="mb-3 text-slate-300" />
              <p className="font-semibold text-slate-700">Belum ada transaksi</p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Pilih mobil impian Anda di katalog kami dan nikmati perjalanan tanpa ribet.
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isActive = item.status === "Sedang Berjalan";
              const isPending = item.status === "Menunggu Konfirmasi";
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-blue-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                        <img
                          src={item.carImage}
                          alt={item.carName}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-400">#{item.id}</span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.carName}
                        </h3>
                        <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 mt-0.5">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : isPending
                          ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                      {isPending && <Clock size={10} />}
                      {item.status === "Selesai" && <CheckCircle2 size={10} />}
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-50 pt-2.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.startDate} {item.endDate ? `· ${item.endDate}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Total Biaya</span>
                      <p className="text-sm font-black text-slate-900">{formatRupiah(item.totalPrice)}</p>
                    </div>

                    <a
                      href={waLink(
                        null,
                        `Halo Admin Mitra.Mobil, saya ingin menanyakan status transaksi #${item.id} untuk mobil ${item.carName}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      <MessageCircle size={13} />
                      <span>Chat CS</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition"
          >
            <span>Lanjut Sewa Mobil Lain</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
