import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminRequest } from "../../../lib/admin-session";
import { listConsignments } from "../../../lib/consignment-store";

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json(
      { message: "Tidak memiliki akses." },
      { status: 401 },
    );
  }

  const items = await listConsignments();
  return NextResponse.json({ consignments: items });
}
