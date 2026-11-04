// Server-only booking helpers: signed tokens, Brevo email, Paystack calls and
// server-side validation/pricing. Import only from route handlers and server
// components — this file reads secret environment variables.
import { createHmac, randomInt, randomBytes, timingSafeEqual } from "node:crypto";
import {
  LEVELS,
  addBusinessDays,
  dateFromIso,
  emailOk,
  isBusinessDay,
  isLevelId,
  totalOf,
  vatOf,
  type LevelId,
} from "@/components/sites/drocol/book/book-data";

// ---------- configuration ----------
export type BookingConfig = {
  paystackSecret: string;
  brevoKey: string;
  fromEmail: string;
  fromName: string;
  notifyEmail: string;
  signingSecret: string;
};

export function getConfig(): BookingConfig | null {
  const c = {
    paystackSecret: process.env.PAYSTACK_SECRET_KEY ?? "",
    brevoKey: process.env.BREVO_API_KEY ?? "",
    fromEmail: process.env.BOOKING_FROM_EMAIL ?? "",
    fromName: process.env.BOOKING_FROM_NAME ?? "Drocol",
    notifyEmail: process.env.BOOKING_NOTIFY_EMAIL ?? "info@drocol.com",
    signingSecret: process.env.BOOKING_SIGNING_SECRET ?? "",
  };
  if (!c.paystackSecret || !c.brevoKey || !c.fromEmail || c.signingSecret.length < 32) return null;
  return c;
}

export const isTestMode = () => (process.env.PAYSTACK_SECRET_KEY ?? "").startsWith("sk_test_");

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

export const notConfigured = () =>
  json({ error: "Online booking isn't set up yet. Please contact us and we'll book you in." }, 503);

// ---------- signed tokens (base64url payload + HMAC-SHA256) ----------
const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");
const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("base64url");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function signToken(secret: string, payload: Record<string, unknown>) {
  const body = b64(JSON.stringify(payload));
  return `${body}.${hmac(secret, body)}`;
}

export function readToken<T extends { exp: number }>(secret: string, token: unknown): T | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!safeEqual(sig, hmac(secret, body))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
    return typeof data.exp === "number" && data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

/** Signature that lets someone view one invoice; prevents guessing others. */
export const invoiceSig = (secret: string, reference: string) => hmac(secret, `invoice:${reference}`);
export const invoiceSigOk = (secret: string, reference: string, sig: unknown) =>
  typeof sig === "string" && safeEqual(sig, invoiceSig(secret, reference));

// ---------- email codes ----------
export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_RESEND_MS = 30 * 1000;
export const OTP_MAX_TRIES = 5;
export const VERIFIED_TTL_MS = 2 * 60 * 60 * 1000;

export const newOtpCode = () => String(randomInt(100000, 1000000));
export const otpHash = (secret: string, email: string, code: string, nonce: string) =>
  hmac(secret, `otp:${email.toLowerCase()}:${code}:${nonce}`);
export const newNonce = () => randomBytes(12).toString("base64url");

// Best-effort, per-instance limits. Serverless instances don't share memory;
// add a shared store (e.g. Upstash Redis) if abuse appears.
const lastSend = new Map<string, number>();
const tries = new Map<string, number>();

export function canSend(email: string) {
  const key = email.toLowerCase();
  const last = lastSend.get(key) ?? 0;
  if (Date.now() - last < OTP_RESEND_MS) return false;
  lastSend.set(key, Date.now());
  return true;
}

export function registerTry(nonce: string) {
  const n = (tries.get(nonce) ?? 0) + 1;
  tries.set(nonce, n);
  if (tries.size > 5000) tries.clear();
  return n;
}

// ---------- Brevo ----------
export async function sendEmail(
  cfg: BookingConfig,
  to: { email: string; name?: string }[],
  subject: string,
  html: string,
  text: string,
  replyTo?: { email: string; name?: string },
) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": cfg.brevoKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: cfg.fromEmail, name: cfg.fromName },
      to,
      subject,
      htmlContent: html,
      textContent: text,
      ...(replyTo ? { replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Brevo send failed", res.status, detail.slice(0, 300));
    throw new Error("email_failed");
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// ---------- Paystack ----------
type PaystackResponse<T> = { status: boolean; message: string; data: T };

export async function paystack<T>(cfg: BookingConfig, path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(`https://api.paystack.co${path}`, {
    method: init?.method ?? "GET",
    headers: { authorization: `Bearer ${cfg.paystackSecret}`, "content-type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as PaystackResponse<T> | null;
  if (!res.ok || !data?.status) {
    console.error("Paystack error", path, res.status, data?.message);
    throw new Error(data?.message || "paystack_failed");
  }
  return data.data;
}

export const verifyWebhookSignature = (secret: string, rawBody: string, signature: string | null) => {
  if (!signature) return false;
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
};

// ---------- booking validation & pricing ----------
export type BookingRecord = {
  ref: string;
  invoiceNo: string;
  level: LevelId;
  levelName: string;
  days: number;
  price: number;
  vat: number;
  total: number;
  company: string;
  domain: string;
  apps: string;
  apiUrl: string;
  roles: string;
  start: string;
  notes: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  signer: string;
  issuedAt: string;
  payBy: string;
  acceptance: { authorised: true; terms: true; termsVersion: string; at: string; ip: string; userAgent: string };
};

export const TERMS_VERSION = "2026-11-04";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function hostOf(u: string) {
  try {
    return new URL(/^https?:\/\//i.test(u) ? u : `https://${u}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function newReference() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const tail = Array.from(randomBytes(6), (b) => chars[b % chars.length]).join("");
  return `DRC-${ymd}-${tail}`;
}

/** Validates the browser's booking and rebuilds every price on the server. */
export function buildBooking(
  input: Record<string, unknown>,
  verifiedEmail: string,
  meta: { ip: string; userAgent: string },
): { ok: true; booking: BookingRecord } | { ok: false; error: string } {
  const level = input.level;
  if (!isLevelId(level)) return { ok: false, error: "Choose a testing level." };
  const t = LEVELS[level];

  const company = str(input.company, 120);
  const domain = hostOf(str(input.domain, 200));
  const appsList = str(input.apps, 500).split(/[\s,;]+/).map(hostOf).filter(Boolean);
  const name = str(input.fullName, 120);
  const position = str(input.position, 120);
  const email = str(input.email, 200).toLowerCase();
  const phone = str(input.phone, 40);
  const startIso = str(input.start, 10);

  if (!company || !domain.includes(".")) return { ok: false, error: "Add your company name and domain." };
  if (appsList.length > t.apps) return { ok: false, error: `${t.name} covers up to ${t.apps} app${t.apps > 1 ? "s" : ""}.` };
  if (!name || !position || !phone) return { ok: false, error: "Add your name, position and phone number." };
  if (!emailOk(email) || email !== verifiedEmail.toLowerCase()) return { ok: false, error: "Verify your work email first." };
  if (input.agreeAuth !== true || input.agreeTerms !== true) return { ok: false, error: "Confirm your authority and accept the terms." };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startIso)) return { ok: false, error: "Choose a start date." };
  const start = dateFromIso(startIso);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  // One day of slack for time zones between the browser and the server.
  const earliest = addBusinessDays(today, 1);
  if (Number.isNaN(start.getTime()) || !isBusinessDay(start) || start < earliest) {
    return { ok: false, error: "Choose a weekday at least 2 business days from today." };
  }

  let signer = `${name} (booker)`;
  if (input.signer === "other") {
    const sName = str(input.sName, 120);
    const sEmail = str(input.sEmail, 200);
    if (!sName || !emailOk(sEmail)) return { ok: false, error: "Add the signer's name and work email." };
    signer = `${sName} <${sEmail}>`;
  }

  const allowedRoles = t.roles === 99 ? [...Array.from({ length: 9 }, (_, i) => String(i + 1)), "10 or more"] : Array.from({ length: t.roles }, (_, i) => String(i + 1));
  const roles = allowedRoles.includes(str(input.roles, 12)) ? str(input.roles, 12) : allowedRoles[Math.min(1, allowedRoles.length - 1)];

  const ref = newReference();
  let payBy = new Date(start);
  for (let k = 0; k < 2; ) {
    payBy.setDate(payBy.getDate() - 1);
    if (isBusinessDay(payBy)) k++;
  }
  if (payBy < today) payBy = today;

  const now = new Date().toISOString();
  return {
    ok: true,
    booking: {
      ref,
      invoiceNo: ref.replace("DRC-", "INV-"),
      level,
      levelName: t.name,
      days: t.days,
      price: t.price,
      vat: vatOf(t.price),
      total: totalOf(t.price),
      company,
      domain,
      apps: appsList.join(", "),
      apiUrl: t.api ? str(input.apiUrl, 200) : "",
      roles,
      start: startIso,
      notes: str(input.notes, 1500),
      name,
      position,
      email,
      phone,
      signer,
      issuedAt: now,
      payBy: payBy.toISOString().slice(0, 10),
      acceptance: { authorised: true, terms: true, termsVersion: TERMS_VERSION, at: now, ip: meta.ip, userAgent: meta.userAgent.slice(0, 200) },
    },
  };
}

export const clientIp = (req: Request) =>
  (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

export const originOf = (req: Request) => {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) return site.replace(/\/$/, "");
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") ?? url.host;
  return `${proto}://${host}`;
};
