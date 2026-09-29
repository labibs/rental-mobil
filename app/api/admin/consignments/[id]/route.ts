import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminRequest } from "../../../../lib/admin-session";
import {
  listConsignments,
  saveConsignments,
} from "../../../../lib/consignment-store";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json(
      { message: "Tidak memiliki akses." },
      { status: 401 },
    );
  }

  const { id } = await params;

  let body: { action?: unknown };
  try {
    const parsed = await request.json();
    body = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return NextResponse.json(
      { message: "Format permintaan tidak valid." },
      { status: 400 },
    );
  }

  if (body.action !== "approve" && body.action !== "reject") {
    return NextResponse.json(
      { message: "Aksi tidak dikenal." },
      { status: 400 },
    );
  }

  const items = await listConsignments();
  const target = items.find((item) => item.id === id);

  if (!target) {
    return NextResponse.json(
      { message: "Pengajuan tidak ditemukan." },
      { status: 404 },
    );
  }

  target.status = body.action === "approve" ? "approved" : "rejected";
  await saveConsignments(items);

  return NextResponse.json({ ok: true, consignment: target });
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json(
      { message: "Tidak memiliki akses." },
      { status: 401 },
    );
  }

  const { id } = await params;

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

  const items = await listConsignments();
  const target = items.find((item) => item.id === id);

  if (!target) {
    return NextResponse.json(
      { message: "Pengajuan tidak ditemukan." },
      { status: 404 },
    );
  }

  if (body.kind === "sewa" || body.kind === "jual") target.kind = body.kind;
  if (asString(body.ownerName)) target.ownerName = asString(body.ownerName);
  if (asString(body.whatsapp)) target.whatsapp = asString(body.whatsapp);
  if (asString(body.brand)) target.brand = asString(body.brand);
  if (asString(body.name)) target.name = asString(body.name);
  if (asString(body.transmission))
    target.transmission = asString(body.transmission);
  if (asString(body.fuel)) target.fuel = asString(body.fuel);
  if (asString(body.location)) target.location = asString(body.location);
  if (typeof body.plate === "string")
    target.plate = asString(body.plate).toUpperCase();
  if (typeof body.description === "string")
    target.description = asString(body.description);

  const year = Number(body.year);
  if (Number.isFinite(year) && year >= 1950 && year <= 2100) {
    target.year = Math.round(year);
  }

  const price = Number(body.price);
  if (Number.isFinite(price) && price > 0) {
    target.price = Math.round(price);
  }

  await saveConsignments(items);

  return NextResponse.json({ ok: true, consignment: target });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json(
      { message: "Tidak memiliki akses." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const items = await listConsignments();
  const next = items.filter((item) => item.id !== id);

  if (next.length === items.length) {
    return NextResponse.json(
      { message: "Pengajuan tidak ditemukan." },
      { status: 404 },
    );
  }

  await saveConsignments(next);

  return NextResponse.json({ ok: true });
}
