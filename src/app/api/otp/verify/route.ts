import {
  OTP_MAX_TRIES,
  VERIFIED_TTL_MS,
  getConfig,
  json,
  notConfigured,
  otpHash,
  readToken,
  registerTry,
  signToken,
} from "@/lib/booking/server";

type Ticket = { email: string; h: string; n: string; exp: number };

export async function POST(req: Request) {
  const cfg = getConfig();
  if (!cfg) return notConfigured();

  const body = (await req.json().catch(() => ({}))) as { ticket?: unknown; code?: unknown; email?: unknown };
  const ticket = readToken<Ticket>(cfg.signingSecret, body.ticket);
  if (!ticket) return json({ error: "That code has expired. Send a new one." }, 400);

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email !== ticket.email) return json({ error: "Email changed. Send a new code." }, 400);

  if (registerTry(ticket.n) > OTP_MAX_TRIES) return json({ error: "Too many attempts. Send a new code." }, 429);

  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!/^\d{6}$/.test(code) || otpHash(cfg.signingSecret, email, code, ticket.n) !== ticket.h) {
    return json({ error: "That code doesn't match. Check it and try again." }, 400);
  }

  const verified = signToken(cfg.signingSecret, { email, v: 1, exp: Date.now() + VERIFIED_TTL_MS });
  return json({ verified });
}
