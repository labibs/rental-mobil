import { NextResponse } from "next/server";

const SESSION_COOKIE = "autohunt_admin_session";

export async function POST(request: Request) {
  let payload: { email?: string; password?: string };

  try {
    const body = await request.json();
    payload = body && typeof body === "object" ? body : {};
  } catch {
    return NextResponse.json(
      { message: "Format permintaan tidak valid." },
      { status: 400 },
    );
  }

  const configuredEmail = (
    process.env.ADMIN_EMAIL || "admin@autohunt.local"
  ).toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD || "admin123";
  const email = payload.email?.trim().toLowerCase();

  if (!email || email !== configuredEmail || payload.password !== configuredPassword) {
    return NextResponse.json(
      { message: "Email atau password salah." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "authenticated",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}