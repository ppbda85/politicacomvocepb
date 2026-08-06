import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "pcv_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET não configurado. Defina essa variável de ambiente (uma string aleatória qualquer) antes de usar o painel administrativo."
    );
  }
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function buildToken(expiresAt: number): string {
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const validSignature =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!validSignature) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      "ADMIN_PASSWORD não configurado. Defina essa variável de ambiente antes de usar o painel administrativo."
    );
  }
  return password.length > 0 && password === expected;
}

export async function createSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const token = buildToken(expiresAt);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function hasValidSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return isValidToken(token);
}
