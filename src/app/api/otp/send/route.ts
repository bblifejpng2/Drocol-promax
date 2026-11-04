import { emailOk } from "@/components/sites/drocol/book/book-data";
import {
  OTP_TTL_MS,
  canSend,
  getConfig,
  json,
  newNonce,
  newOtpCode,
  notConfigured,
  otpHash,
  sendEmail,
  signToken,
} from "@/lib/booking/server";

export async function POST(req: Request) {
  const cfg = getConfig();
  if (!cfg) return notConfigured();

  const body = (await req.json().catch(() => ({}))) as { email?: unknown };
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!emailOk(email)) return json({ error: "Enter a valid work email first." }, 400);
  if (!canSend(email)) return json({ error: "Please wait 30 seconds before requesting another code." }, 429);

  const code = newOtpCode();
  const nonce = newNonce();
  const ticket = signToken(cfg.signingSecret, {
    email,
    h: otpHash(cfg.signingSecret, email, code, nonce),
    n: nonce,
    exp: Date.now() + OTP_TTL_MS,
  });

  try {
    await sendEmail(
      cfg,
      [{ email }],
      `Your Drocol verification code: ${code}`,
      `<div style="font-family:Arial,sans-serif;font-size:16px;color:#1c1917">
        <p>Your Drocol booking verification code is:</p>
        <p style="font-size:30px;font-weight:bold;letter-spacing:6px;margin:16px 0">${code}</p>
        <p>It expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
        <p style="color:#78716c;font-size:13px">Drocol Limited · Oniru, Victoria Island, Lagos</p>
      </div>`,
      `Your Drocol booking verification code is ${code}. It expires in 10 minutes.`,
    );
  } catch {
    return json({ error: "We couldn't send the code. Check the address or try again shortly." }, 502);
  }

  return json({ ticket });
}
