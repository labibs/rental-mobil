import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "autohunt_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const [encodedPayload, signature] = token?.split(".") || [];
  let sessionIsValid = false;

  if (encodedPayload && signature) {
    try {
      const payload = fromBase64Url(encodedPayload);
      const [email, issuedAtValue] = payload.split("|");
      const issuedAt = Number(issuedAtValue);
      const expectedSignature = await signSession(payload);
      const isFresh =
        Number.isFinite(issuedAt) &&
        Date.now() - issuedAt < SESSION_MAX_AGE * 1000 &&
        Date.now() >= issuedAt;
      sessionIsValid =
        Boolean(email) && isFresh && signature === expectedSignature;
    } catch {
      sessionIsValid = false;
    }
  }

  if (sessionIsValid) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};