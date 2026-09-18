import { NextResponse } from "next/server";

const SESSION_COOKIE = "autohunt_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signSession(value: string) {
  const secret =
    process.env.ADMIN_SESSION_SECRET || "autohunt-development-secret";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return toBase64Url(new Uint8Array(signature));
}

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

  const sessionPayload = `${email}|${Date.now()}`;
  const sessionToken = `${toBase64Url(
    new TextEncoder().encode(sessionPayload),
  )}.${await signSession(sessionPayload)}`;
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}