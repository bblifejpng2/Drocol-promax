import { emailOk, naira } from "@/components/sites/drocol/book/book-data";
import {
  canSend,
  escapeHtml,
  getConfig,
  invoiceSigOk,
  json,
  notConfigured,
  originOf,
  paystack,
  sendEmail,
  type BookingRecord,
} from "@/lib/booking/server";

// "Send to my finance team": emails the invoice link from Drocol's address.
export async function POST(req: Request) {
  const cfg = getConfig();
  if (!cfg) return notConfigured();

  const body = (await req.json().catch(() => ({}))) as { ref?: unknown; s?: unknown; ac?: unknown; email?: unknown };
  const ref = typeof body.ref === "string" ? body.ref : "";
  if (!/^DRC-[0-9A-Z-]+$/.test(ref) || !invoiceSigOk(cfg.signingSecret, ref, body.s)) {
    return json({ error: "Invoice not found." }, 404);
  }
  const to = typeof body.email === "string" ? body.email.trim() : "";
  if (!emailOk(to)) return json({ error: "Enter a valid email address." }, 400);
  if (!canSend(`share:${ref}:${to}`)) return json({ error: "Already sent — please wait a moment." }, 429);

  let b: BookingRecord | null = null;
  try {
    const tx = await paystack<{ metadata: unknown }>(cfg, `/transaction/verify/${encodeURIComponent(ref)}`);
    const m = typeof tx.metadata === "string" ? JSON.parse(tx.metadata) : tx.metadata;
    b = (m as { booking?: BookingRecord })?.booking ?? null;
  } catch {
    b = null;
  }
  if (!b) return json({ error: "Invoice not found." }, 404);

  const ac = typeof body.ac === "string" && /^[A-Za-z0-9]{5,64}$/.test(body.ac) ? `&ac=${body.ac}` : "";
  const link = `${originOf(req)}/book/invoice/${ref}?s=${body.s}${ac}`;

  try {
    await sendEmail(
      cfg,
      [{ email: to }],
      `Invoice ${b.invoiceNo} from Drocol — ${naira(b.total)}`,
      `<div style="font-family:Arial,sans-serif;color:#1c1917">
        <p>${escapeHtml(b.name)} (${escapeHtml(b.company)}) asked us to send you this invoice.</p>
        <p><b>${escapeHtml(b.invoiceNo)}</b> · Penetration test: ${escapeHtml(b.levelName)} · <b>${naira(b.total)}</b> incl. VAT</p>
        <p><a href="${escapeHtml(link)}">View and pay the invoice</a> (card, bank transfer or USSD via Paystack).</p>
        <p style="color:#78716c;font-size:13px">Drocol Limited · RC 9626903 · Oniru, Victoria Island, Lagos</p>
      </div>`,
      `${b.name} (${b.company}) asked us to send you invoice ${b.invoiceNo} for ${naira(b.total)}.\nView and pay: ${link}`,
      { email: b.email, name: b.name },
    );
  } catch {
    return json({ error: "We couldn't send the email. Try again shortly." }, 502);
  }
  return json({ ok: true });
}
