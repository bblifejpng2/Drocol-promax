import {
  buildBooking,
  clientIp,
  getConfig,
  invoiceSig,
  json,
  notConfigured,
  originOf,
  paystack,
  readToken,
} from "@/lib/booking/server";

type Verified = { email: string; v: 1; exp: number };

export async function POST(req: Request) {
  const cfg = getConfig();
  if (!cfg) return notConfigured();

  const input = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!input) return json({ error: "Invalid request." }, 400);

  const verified = readToken<Verified>(cfg.signingSecret, input.verified);
  if (!verified || verified.v !== 1) return json({ error: "Your email verification expired. Verify your email again." }, 401);

  const result = buildBooking(input, verified.email, {
    ip: clientIp(req),
    userAgent: req.headers.get("user-agent") ?? "",
  });
  if (!result.ok) return json({ error: result.error }, 400);
  const b = result.booking;

  const sig = invoiceSig(cfg.signingSecret, b.ref);
  const origin = originOf(req);

  try {
    const tx = await paystack<{ authorization_url: string; access_code: string; reference: string }>(
      cfg,
      "/transaction/initialize",
      {
        method: "POST",
        body: {
          email: b.email,
          amount: String(b.total * 100), // kobo
          currency: "NGN",
          reference: b.ref,
          callback_url: `${origin}/book/invoice/${b.ref}?s=${sig}`,
          metadata: JSON.stringify({
            booking: b,
            custom_fields: [
              { display_name: "Invoice", variable_name: "invoice", value: b.invoiceNo },
              { display_name: "Level", variable_name: "level", value: b.levelName },
              { display_name: "Company", variable_name: "company", value: b.company },
              { display_name: "Domain", variable_name: "domain", value: b.domain },
              { display_name: "Start date", variable_name: "start", value: b.start },
              { display_name: "Phone", variable_name: "phone", value: b.phone },
            ],
          }),
        },
      },
    );
    return json({ url: `/book/invoice/${b.ref}?s=${sig}&ac=${encodeURIComponent(tx.access_code)}` });
  } catch {
    return json({ error: "We couldn't create your invoice. Please try again or contact us." }, 502);
  }
}
