import { naira } from "@/components/sites/drocol/book/book-data";
import {
  escapeHtml,
  getConfig,
  json,
  sendEmail,
  verifyWebhookSignature,
  type BookingRecord,
} from "@/lib/booking/server";

type ChargeEvent = {
  event: string;
  data: { reference: string; status: string; amount: number; paid_at?: string; metadata?: unknown };
};

function bookingFrom(metadata: unknown): BookingRecord | null {
  try {
    const m = typeof metadata === "string" ? JSON.parse(metadata) : metadata;
    return (m as { booking?: BookingRecord })?.booking ?? null;
  } catch {
    return null;
  }
}

// Paystack calls this after a payment. It is the only place an invoice is
// treated as paid server-side — never trust a browser redirect alone.
// Set the URL in Paystack Dashboard → Settings → API Keys & Webhooks:
//   https://<your-domain>/api/paystack/webhook
export async function POST(req: Request) {
  const cfg = getConfig();
  if (!cfg) return json({ ok: false }, 503);

  const raw = await req.text();
  if (!verifyWebhookSignature(cfg.paystackSecret, raw, req.headers.get("x-paystack-signature"))) {
    return json({ ok: false }, 401);
  }

  const event = JSON.parse(raw) as ChargeEvent;
  if (event.event !== "charge.success" || event.data.status !== "success") return json({ ok: true });

  const b = bookingFrom(event.data.metadata);
  // Ignore payments that aren't bookings, or whose amount doesn't match.
  if (!b || event.data.amount !== b.total * 100) return json({ ok: true });

  const receipt = b.ref.replace("DRC-", "RCP-");
  const rows: [string, string][] = [
    ["Invoice", b.invoiceNo],
    ["Receipt", receipt],
    ["Level", `${b.levelName} · ${b.days} working days`],
    ["Company", b.company],
    ["Domain", b.domain],
    ["Apps", b.apps || "To agree"],
    ["User types", b.roles],
    ["Start date", b.start],
    ["Booked by", `${b.name}, ${b.position}`],
    ["Email", b.email],
    ["Phone", b.phone],
    ["Signs authorisation", b.signer],
    ["Total paid", naira(b.total)],
    ["Notes", b.notes || "—"],
  ];
  const table = `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#78716c">${escapeHtml(k)}</td><td style="padding:6px 12px;color:#1c1917">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  // Paystack may retry webhooks; without a database a retry can resend
  // these emails. Harmless, and Paystack stops retrying once we return 200.
  await Promise.allSettled([
    sendEmail(
      cfg,
      [{ email: b.email, name: b.name }],
      `Payment received — ${b.invoiceNo}`,
      `<div style="font-family:Arial,sans-serif;color:#1c1917">
        <p>Hi ${escapeHtml(b.name)},</p>
        <p>We've received your payment of <b>${naira(b.total)}</b>. Your start date of <b>${escapeHtml(b.start)}</b> is held.</p>
        <p>Next: we'll email you within one business day to confirm your domain, send the authorisation letter for signature, and share a secure link for test accounts.</p>
        ${table}
        <p style="color:#78716c;font-size:13px">Drocol Limited · Oniru, Victoria Island, Lagos · ${escapeHtml(cfg.notifyEmail)}</p>
      </div>`,
      `We've received your payment of ${naira(b.total)}.\n\n${text}`,
      { email: cfg.notifyEmail, name: "Drocol" },
    ),
    sendEmail(
      cfg,
      [{ email: cfg.notifyEmail, name: "Drocol bookings" }],
      `New paid booking: ${b.levelName} — ${b.company}`,
      `<div style="font-family:Arial,sans-serif;color:#1c1917"><p>A booking has been paid.</p>${table}
        <p style="color:#78716c;font-size:12px">Acceptance: terms v${escapeHtml(b.acceptance.termsVersion)}, ${escapeHtml(b.acceptance.at)}, IP ${escapeHtml(b.acceptance.ip)}, ${escapeHtml(b.acceptance.userAgent)}</p></div>`,
      `A booking has been paid.\n\n${text}\n\nAcceptance: terms v${b.acceptance.termsVersion}, ${b.acceptance.at}, IP ${b.acceptance.ip}`,
      { email: b.email, name: b.name },
    ),
  ]);

  return json({ ok: true });
}
