import type { NextRequest } from "next/server";

const SESSION_COOKIE = "autohunt_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

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
  return Buffer.from(signature).toString("base64url");
}

export async function verifyAdminRequest(
  request: NextRequest,
): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const [encodedPayload, signature] = token?.split(".") || [];

  if (!encodedPayload || !signature) {
    return false;
  }

  try {
    const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const [email, issuedAtValue] = payload.split("|");
    const issuedAt = Number(issuedAtValue);
    const expectedSignature = await signSession(payload);
    const isFresh =
      Number.isFinite(issuedAt) &&
      Date.now() - issuedAt < SESSION_MAX_AGE * 1000 &&
      Date.now() >= issuedAt;

    return Boolean(email) && isFresh && signature === expectedSignature;
  } catch {
    return false;
  }
}
