import { NextResponse } from "next/server";
import {
  listConsignments,
  saveConsignments,
} from "../../lib/consignment-store";
import {
  consignmentToCarItem,
  DEFAULT_CONSIGNMENT_IMAGE,
  type Consignment,
} from "../../lib/consignment-types";

export async function GET() {
  const items = await listConsignments();
  const approved = items.filter((item) => item.status === "approved");
  return NextResponse.json({ cars: approved.map(consignmentToCarItem) });
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    const parsed = await request.json();
    body = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return NextResponse.json(
      { message: "Format permintaan tidak valid." },
      { status: 400 },
    );
  }

  const kind = body.kind === "sewa" || body.kind === "jual" ? body.kind : null;
  const ownerName = asString(body.ownerName);
  const whatsapp = asString(body.whatsapp);
  const brand = asString(body.brand);
  const name = asString(body.name);
  const transmission = asString(body.transmission);
  const fuel = asString(body.fuel);
  const plate = asString(body.plate).toUpperCase();
  const location = asString(body.location);
  const description = asString(body.description);
  const imageUrl = asString(body.imageUrl);
  const gallery = Array.isArray(body.gallery)
    ? body.gallery
        .map(asString)
        .filter((url) => url.startsWith("http") || url.startsWith("/api/"))
        .slice(0, 6)
    : [];
  const year = Number(body.year);
  const price = Number(body.price);

  if (
    !kind ||
    !ownerName ||
    !whatsapp ||
    !brand ||
    !name ||
    !transmission ||
    !fuel ||
    !location ||
    !Number.isFinite(year) ||
    year < 1950 ||
    year > 2100 ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return NextResponse.json(
      { message: "Lengkapi semua data wajib dengan benar." },
      { status: 400 },
    );
  }

  const item: Consignment = {
    id: `titip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    kind,
    ownerName,
    whatsapp,
    brand,
    name,
    year: Math.round(year),
    transmission,
    fuel,
    plate,
    price: Math.round(price),
    location,
    image: gallery[0] || imageUrl || DEFAULT_CONSIGNMENT_IMAGE,
    gallery: gallery.length > 0 ? gallery : imageUrl ? [imageUrl] : [],
    description,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const items = await listConsignments();
  items.unshift(item);
  await saveConsignments(items);

  return NextResponse.json({ ok: true, consignment: item }, { status: 201 });
}
