"use client";

import { useState } from "react";
import Link from "next/link";
import { DrocolLogo } from "../logo";
import { COMPANY_DETAILS, dateFromIso, emailOk, fmtDay, naira2 } from "./book-data";
import { btnLine, btnPrimary, inputClass, Toast } from "./book-ui";
import type { BookingRecord } from "@/lib/booking/server";

export type InvoiceProps = {
  booking: BookingRecord;
  paid: boolean;
  paidAt: string | null;
  payUrl: string | null;
  sig: string;
  ac: string | null;
  testMode: boolean;
};

const label = "text-xs uppercase tracking-[0.15em] text-white/40";
const smallBtn = "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-accent hover:text-white";

export function Invoice({ booking: b, paid, paidAt, payUrl, sig, ac, testMode }: InvoiceProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [financeEmail, setFinanceEmail] = useState("");
  const [financeBad, setFinanceBad] = useState(false);
  const [sending, setSending] = useState(false);

  const show = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3500);
  };
  const copy = async (text: string, done: string) => {
    try {
      await navigator.clipboard.writeText(text);
      show(done);
    } catch {
      show(text);
    }
  };

  const sendToFinance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk(financeEmail.trim())) {
      setFinanceBad(true);
      return;
    }
    setSending(true);
    const res = await fetch("/api/invoice/share", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ref: b.ref, s: sig, ac, email: financeEmail.trim() }),
    }).catch(() => null);
    setSending(false);
    const data = (await res?.json().catch(() => null)) as { error?: string } | null;
    if (res?.ok) {
      setFinanceOpen(false);
      show(`Invoice sent to ${financeEmail.trim()}`);
    } else {
      show(data?.error ?? "Couldn't send. Try again.");
    }
  };

  const start = dateFromIso(b.start);
  const receipt = b.ref.replace("DRC-", "RCP-");

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-3 lg:px-6">
      {testMode && (
        <p className="rounded-md border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm text-amber-200 print:hidden">
          <b>Test mode.</b> Payments use Paystack test keys — no real money moves. Use Paystack&apos;s test card 4084 0840 8408 4081, any future expiry, CVV 408.
        </p>
      )}
      <Link href="/book" className="self-start text-white/60 hover:text-white print:hidden">
        ← Back to pricing
      </Link>

      <article aria-label={`Invoice ${b.invoiceNo}`} className="overflow-hidden rounded-lg border border-white/10 bg-secondary print:border-black/20">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 bg-primary p-6 lg:p-8">
          <DrocolLogo markClassName="h-10 w-auto" wordClassName="h-6 w-auto" />
          <div className="text-right">
            <p className={label}>Invoice</p>
            <p className="font-mono text-lg text-white">{b.invoiceNo}</p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${paid ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
              {paid ? "Paid" : "Pending"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-4 rounded-md border border-white/10 bg-primary p-5 sm:grid-cols-2">
            <div>
              <p className={label}>Total due (incl. VAT)</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-white">{naira2(b.total)}</p>
            </div>
            <div className="text-sm text-white/70 sm:text-right">
              <p>Invoice date: {fmtDay(new Date(b.issuedAt))}</p>
              <p>Due date: {paid && paidAt ? `${fmtDay(new Date(paidAt))} (paid)` : fmtDay(dateFromIso(b.payBy))}</p>
              <p className={`mt-1 font-semibold ${paid ? "text-emerald-300" : "text-amber-300"}`}>{paid ? "Paid" : "Awaiting payment"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 p-5 text-sm leading-relaxed text-white/70">
              <p className={`${label} mb-2`}>From</p>
              <p className="mb-1 text-base font-semibold text-white">{COMPANY_DETAILS.name}</p>
              <p>{COMPANY_DETAILS.address}</p>
              <p>{COMPANY_DETAILS.rc}</p>
              <p>Phone: {COMPANY_DETAILS.phone}</p>
              <p>Email: {COMPANY_DETAILS.email}</p>
            </div>
            <div className="rounded-md border border-white/10 p-5 text-sm leading-relaxed text-white/70">
              <p className={`${label} mb-2`}>Customer</p>
              <p className="mb-1 text-base font-semibold text-white">{b.name}</p>
              <p>Company: {b.company}</p>
              <p>Position: {b.position}</p>
              <p>Phone: {b.phone}</p>
              <p className="break-words">Email: {b.email}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th scope="col" className="py-3 pr-4 font-normal">SN</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Description</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Qty</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Unit price</th>
                  <th scope="col" className="py-3 text-right font-normal">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 text-white/70">1</td>
                  <td className="py-4 pr-4">
                    <b className="font-semibold text-white">Penetration test: {b.levelName}</b>
                    <small className="mt-1 block text-white/50">
                      {b.apps || b.domain} · {b.roles} user type{b.roles === "1" ? "" : "s"} · {b.days} working days from {fmtDay(start)}
                    </small>
                  </td>
                  <td className="py-4 pr-4 text-white/70">1</td>
                  <td className="py-4 pr-4 text-right tabular-nums text-white/70">{naira2(b.price)}</td>
                  <td className="py-4 text-right font-semibold tabular-nums text-white">{naira2(b.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-auto flex w-full max-w-xs flex-col gap-2 text-sm tabular-nums">
            <div className="flex justify-between text-white/70"><span>Subtotal</span><span>{naira2(b.price)}</span></div>
            <div className="flex justify-between text-white/70"><span>VAT (7.5%)</span><span>{naira2(b.vat)}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-semibold text-white"><span>Total</span><span>{naira2(b.total)}</span></div>
          </div>

          <dl className="grid grid-cols-2 gap-4 rounded-md border border-white/10 p-5 text-sm sm:grid-cols-4">
            <div><dt className={label}>TIN</dt><dd className="mt-1 font-mono text-white">{COMPANY_DETAILS.tin}</dd></div>
            <div><dt className={label}>Service</dt><dd className="mt-1 text-white">{b.levelName}</dd></div>
            <div><dt className={label}>Booking ref</dt><dd className="mt-1 break-all font-mono text-white">{b.ref}</dd></div>
            <div>
              <dt className={label}>Invoice no</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2 font-mono text-white">
                {b.invoiceNo}
                <button type="button" onClick={() => copy(b.invoiceNo, `Copied ${b.invoiceNo}`)} className="rounded-full border border-white/15 px-2.5 py-0.5 font-sans text-xs text-white/70 hover:border-accent print:hidden">
                  Copy
                </button>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 print:hidden">
            {paid ? (
              <div role="status" className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-200">
                <b className="block text-lg text-emerald-100">Payment received</b>
                Receipt {receipt}{paidAt ? ` · ${fmtDay(new Date(paidAt))}` : ""}. A confirmation is on its way to {b.email}.
              </div>
            ) : payUrl ? (
              <>
                <a href={payUrl} className={`${btnPrimary} h-14 w-full text-lg`}>
                  Pay {naira2(b.total)} with Paystack
                </a>
                <p className="text-center text-sm text-white/50">
                  Card, bank transfer or USSD on Paystack&apos;s secure page. Payment holds your start date of {fmtDay(start)}.
                </p>
              </>
            ) : (
              <div className="rounded-md border border-white/15 bg-primary p-5 text-white/70">
                This payment link has expired. <Link href={`/book/checkout?level=${b.level}`} className="text-accent hover:underline">Start a new booking</Link> or{" "}
                <Link href="/contact" className="text-accent hover:underline">contact us</Link> to pay by transfer.
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={smallBtn} onClick={() => window.print()}>Print or save as PDF</button>
              <button type="button" className={smallBtn} onClick={() => copy(window.location.href, "Invoice link copied")}>Copy invoice link</button>
              {!paid && (
                <button type="button" className={smallBtn} onClick={() => setFinanceOpen((o) => !o)}>Send to my finance team</button>
              )}
            </div>
            {financeOpen && (
              <form onSubmit={sendToFinance} noValidate className="flex flex-wrap items-end gap-2">
                <label className="flex min-w-[240px] flex-1 flex-col gap-2 text-sm text-white/80">
                  Finance team email
                  <input
                    type="email"
                    placeholder="accounts@yourcompany.com"
                    className={`${inputClass} ${financeBad ? "border-red-400" : "border-white/15"}`}
                    value={financeEmail}
                    onChange={(e) => { setFinanceEmail(e.target.value); setFinanceBad(false); }}
                  />
                </label>
                <button type="submit" disabled={sending} className={btnLine}>{sending ? "Sending…" : "Send invoice"}</button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 bg-primary px-6 py-4 text-xs text-white/40 lg:px-8">
          <span>{COMPANY_DETAILS.name}</span>
          <span>Security, proven.</span>
          <span>Payments by Paystack</span>
        </div>
      </article>

      {paid && (
        <section className="rounded-lg border border-white/10 bg-secondary p-6 lg:p-8 print:hidden">
          <h3 className="mb-6 text-xl font-semibold text-white">What happens next</h3>
          <ol className="flex flex-col gap-5">
            {[
              ["Your date is held", "We confirm your booking by email within one business day."],
              ["Get ready", "Confirm your domain and share test accounts through the secure link we send."],
              ["We test", `From ${fmtDay(start)}. Anything critical is flagged the same day.`],
              ["Report and retest", "A prioritised report with compliance mapping, then a retest of your fixes."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm ${i === 0 ? "border-accent bg-accent text-white" : "border-white/20 text-white/60"}`}>{i + 1}</span>
                <div>
                  <b className="font-semibold text-white">{title}</b>
                  <p className="text-white/60">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
      <Toast message={toast} />
    </div>
  );
}
