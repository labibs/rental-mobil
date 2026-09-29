import type { Consignment } from "./consignment-types";

export function normalizeWhatsapp(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export function waLink(phone: string | null, text: string) {
  const base = phone ? `https://wa.me/${normalizeWhatsapp(phone)}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function ownerStatusMessage(item: Consignment, origin: string) {
  const car = `${item.brand} ${item.name} (${item.year})`;
  const kind = item.kind === "sewa" ? "titip sewa" : "titip jual";

  if (item.status === "approved") {
    return [
      `Halo ${item.ownerName}, kabar baik dari Mitra.Mobil!`,
      ``,
      `Pengajuan ${kind} mobil *${car}* Anda telah *DISETUJUI* dan kini sudah tampil di katalog kami.`,
      `Lihat di: ${origin}/cars/${item.id}`,
      ``,
      `Terima kasih sudah mempercayakan mobil Anda kepada Mitra.Mobil.`,
    ].join("\n");
  }

  return [
    `Halo ${item.ownerName}, terima kasih sudah mengajukan ${kind} mobil *${car}* di Mitra.Mobil.`,
    ``,
    `Mohon maaf, saat ini pengajuan Anda *belum dapat kami setujui*. Silakan hubungi kami untuk informasi lebih lanjut atau ajukan kembali dengan data/foto yang lebih lengkap di ${origin}/titip-mobil.`,
    ``,
    `Salam, Tim Mitra.Mobil`,
  ].join("\n");
}

export function shareCarMessage(name: string, priceLabel: string, url: string) {
  return `Cek mobil ini di Mitra.Mobil: *${name}* — ${priceLabel}\n${url}`;
}
