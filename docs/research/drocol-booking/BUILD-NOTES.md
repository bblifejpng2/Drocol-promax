# Drocol booking: build notes for the live version

Copied from the "Build notes for the engineer" panel in `prototype.html`.
The site's `/book` and `/book/checkout` pages simulate email codes and
payments. This is what the live version needs. Keep every secret in server
environment variables.

## 1. Email verification
- `POST /api/otp/send {email}`: generate a 6-digit code, store only a hash, expire after 10 minutes. Rate-limit by email and IP, 30 seconds between sends. Send from a drocol.com address.
- `POST /api/otp/verify {email, code}`: max 5 attempts per code. On success, return a signed token bound to the email (about 2 hours), so the client isn't asked again.

## 2. Generate invoice
- `POST /api/invoices {booking, token}`: check the token. Recalculate the price on the server from the level. Never trust an amount from the browser.
- Create a Paystack payment request: `POST https://api.paystack.co/paymentrequest` with the client's email, a line item for the level, a 7.5% VAT tax line, amounts in kobo, a due date, the booking reference in the description, and `send_notification: false`.
- Save the booking with the acceptance record: verified email, both checkboxes, agreement versions, timestamp, IP and browser. Then redirect to `/invoice/{id}`.

## 3. Invoice page and payment
- Render the invoice from the server record. The Pay button opens Paystack's hosted payment page for that payment request (confirm the link format in Paystack's docs).
- "Send to finance team" emails the invoice link from Drocol's own email, because Paystack's notify endpoint only emails the original customer.

## Print
- Print invoice calls `window.print()`. A print stylesheet should hide everything except the invoice and lay it out on A4. Save as PDF in the print dialog gives clients a PDF copy.

## 4. Payment confirmation
- `POST /api/paystack/webhook`: verify the `x-paystack-signature` header (HMAC SHA-512 of the raw body with the secret key). Handle `charge.success` and payment request events once each (idempotent), then mark the invoice paid.
- Email the client a confirmation and email info@drocol.com the full booking. Never mark an invoice paid from a browser redirect alone.

## Prices (excluding VAT)
- Essentials ₦1,100,000 · Assured ₦2,400,000 · Advanced ₦3,600,000 · Sentinel ₦6,500,000. VAT is 7.5%.
- Source of truth in code: `src/components/sites/calif/book/book-data.ts`.
