# Drocol online booking — how it works and how to switch it on

The checkout at `/book/checkout` is real: email codes are sent through
Brevo, invoices and payments go through Paystack, and paid bookings are
emailed to the client and to Drocol. There is no database — Paystack keeps
each booking with its transaction.

Until the environment variables below are set, `/book/checkout` redirects to
the contact form, so the live site never shows a checkout that can't finish.

## 1. Set it up (about 20 minutes)

1. **Paystack** — dashboard.paystack.com → Settings → API Keys & Webhooks.
   - Copy the **Test Secret Key** (`sk_test_…`).
   - Set **Test Webhook URL** to `https://<your-site>/api/paystack/webhook`.
2. **Brevo** — app.brevo.com.
   - SMTP & API → API Keys → create a key.
   - Senders, Domains & Dedicated IPs → Domains → add and authenticate
     `drocol.com` (add the DNS records Brevo shows), then add the sender
     `bookings@drocol.com`.
3. **Signing secret** — run:
   `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
4. **Vercel** — Project → Settings → Environment Variables. Add every variable
   from `.env.example`, then redeploy. For local testing, put the same values
   in `.env.local` (never commit it).

When `PAYSTACK_SECRET_KEY` starts with `sk_test_`, the checkout and invoice
show a "Test mode" notice. Test card: 4084 0840 8408 4081, any future expiry,
CVV 408.

## 2. Going live

Replace `PAYSTACK_SECRET_KEY` with the **Live Secret Key** (`sk_live_…`), set
the **Live Webhook URL** in Paystack to the same `/api/paystack/webhook`
address, and redeploy. The test-mode notices disappear automatically.

## 3. What happens in a booking

| Step | Where | What happens |
|---|---|---|
| Send code | `POST /api/otp/send` | 6-digit code emailed via Brevo. The browser gets a signed, 10-minute ticket holding only a hash of the code. 30 s between sends. |
| Verify | `POST /api/otp/verify` | Code checked against the ticket (max 5 tries). Returns a signed token for that email, valid 2 hours. |
| Generate invoice | `POST /api/bookings` | Server re-validates everything, **recalculates the price from the level** (never trusts the browser), records acceptance (terms version, time, IP, browser), and initialises a Paystack transaction with the booking in its metadata. |
| Invoice | `/book/invoice/[ref]?s=…` | Rendered from Paystack's record. `s` is a signature so references can't be guessed. "Pay" opens Paystack's hosted checkout (card, transfer, USSD). |
| Paid | `POST /api/paystack/webhook` | Signature checked (HMAC-SHA512 with the secret key). On `charge.success` with the right amount, emails the client a confirmation and Drocol the full booking. |
| Finance team | `POST /api/invoice/share` | Emails the invoice link from Drocol's sender. |

## 4. Known limits (fine to start; revisit as volume grows)

- Rate limits for code sends and verify attempts are kept in memory per
  server instance. Add a shared store (e.g. Upstash Redis) if abused.
- Without a database, a Paystack webhook retry can resend confirmation
  emails. Paystack stops retrying once the endpoint returns 200.
- An invoice's "Pay" link uses Paystack's access code from the moment the
  invoice was created. If someone loses that link, they can start a new
  booking or pay by transfer via the contact page.

## Prices (excluding VAT)

Essentials ₦1,100,000 · Assured ₦2,400,000 · Advanced ₦3,600,000 ·
Sentinel ₦6,500,000. VAT is 7.5%. Source of truth:
`src/components/sites/drocol/book/book-data.ts`.
