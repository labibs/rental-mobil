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
