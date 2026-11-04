"use client";

import { useCallback, useState } from "react";
import { DrocolLogo } from "../logo";
import {
  COMPANY_DETAILS,
  LEVELS,
  emailOk,
  fmtDay,
  naira,
  naira2,
  totalOf,
  vatOf,
  type LevelId,
} from "./book-data";
import { Modal, btnLine, btnPrimary, inputClass } from "./book-ui";

export type InvoiceData = {
  no: string;
  ref: string;
  level: LevelId;
  issued: Date;
  payBy: Date;
  company: string;
  phone: string;
  name: string;
  position: string;
  email: string;
  domain: string;
  apps: string;
  roles: string;
  start: Date;
  status: "unpaid" | "paid";
  paidAt?: Date;
  receipt?: string;
};

const label = "text-xs uppercase tracking-[0.15em] text-white/40";
const smallBtn = "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-accent hover:text-white";

export function Invoice({
  invoice,
  onPaid,
  onBack,
  toast,
}: {
  invoice: InvoiceData;
  onPaid: (inv: InvoiceData) => void;
  onBack: () => void;
  toast: (msg: string) => void;
}) {
  const [payOpen, setPayOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [financeEmail, setFinanceEmail] = useState("");
  const [financeBad, setFinanceBad] = useState(false);
  const closePay = useCallback(() => setPayOpen(false), []);

  const t = LEVELS[invoice.level];
  const paid = invoice.status === "paid";
  const total = totalOf(t.price);

  const copyNo = async () => {
    try {
      await navigator.clipboard.writeText(invoice.no);
      toast("Copied " + invoice.no);
    } catch {
      toast(invoice.no);
    }
  };

  const simulatePayment = () => {
    onPaid({ ...invoice, status: "paid", paidAt: new Date(), receipt: invoice.no.replace("INV-", "RCP-") });
    setPayOpen(false);
    toast("Payment received (simulated)");
  };

  const sendToFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk(financeEmail.trim())) {
      setFinanceBad(true);
      toast("Enter a valid email address");
      return;
    }
    setFinanceOpen(false);
    toast(`Invoice sent to ${financeEmail.trim()} (simulated)`);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-3 lg:px-6">
      <button type="button" onClick={onBack} className="self-start text-white/60 hover:text-white print:hidden">
        ← Back to booking
      </button>

      <article aria-label={`Invoice ${invoice.no}`} className="overflow-hidden rounded-lg border border-white/10 bg-secondary">
        {/* Head */}
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 bg-primary p-6 lg:p-8">
          <DrocolLogo markClassName="h-10 w-auto" wordClassName="h-6 w-auto" />
          <div className="text-right">
            <p className={label}>Invoice</p>
            <p className="font-mono text-lg text-white">{invoice.no}</p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${paid ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
              {paid ? "Paid" : "Pending"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6 lg:p-8">
          {/* Status */}
          <div className="grid grid-cols-1 gap-4 rounded-md border border-white/10 bg-primary p-5 sm:grid-cols-2">
            <div>
              <p className={label}>Total due (incl. VAT)</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-white">{naira2(total)}</p>
            </div>
            <div className="text-sm text-white/70 sm:text-right">
              <p>Invoice date: {fmtDay(invoice.issued)}</p>
              <p>Due date: {paid && invoice.paidAt ? `${fmtDay(invoice.paidAt)} (paid)` : fmtDay(invoice.payBy)}</p>
              <p className={`mt-1 font-semibold ${paid ? "text-emerald-300" : "text-amber-300"}`}>{paid ? "Paid" : "Awaiting payment"}</p>
            </div>
          </div>

          {/* Parties */}
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
              <p className="mb-1 text-base font-semibold text-white">{invoice.name}</p>
              <p>Company: {invoice.company}</p>
              <p>Position: {invoice.position}</p>
              <p>Phone: {invoice.phone}</p>
              <p className="break-words">Email: {invoice.email}</p>
            </div>
          </div>

          {/* Line items */}
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
                    <b className="font-semibold text-white">Penetration test: {t.name}</b>
                    <small className="mt-1 block text-white/50">
                      {invoice.apps || invoice.domain} · {invoice.roles} user type{invoice.roles === "1" ? "" : "s"} · {t.days} working days from {fmtDay(invoice.start)}
                    </small>
                  </td>
                  <td className="py-4 pr-4 text-white/70">1</td>
                  <td className="py-4 pr-4 text-right tabular-nums text-white/70">{naira2(t.price)}</td>
                  <td className="py-4 text-right font-semibold tabular-nums text-white">{naira2(t.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-auto flex w-full max-w-xs flex-col gap-2 text-sm tabular-nums">
            <div className="flex justify-between text-white/70"><span>Subtotal</span><span>{naira2(t.price)}</span></div>
            <div className="flex justify-between text-white/70"><span>VAT (7.5%)</span><span>{naira2(vatOf(t.price))}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-semibold text-white"><span>Total</span><span>{naira2(total)}</span></div>
          </div>

          <dl className="grid grid-cols-2 gap-4 rounded-md border border-white/10 p-5 text-sm sm:grid-cols-4">
            <div><dt className={label}>TIN</dt><dd className="mt-1 font-mono text-white">{COMPANY_DETAILS.tin}</dd></div>
            <div><dt className={label}>Service</dt><dd className="mt-1 text-white">{t.name}</dd></div>
            <div><dt className={label}>Booking ref</dt><dd className="mt-1 font-mono text-white">{invoice.ref}</dd></div>
            <div>
              <dt className={label}>Invoice no</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2 font-mono text-white">
                {invoice.no}
                <button type="button" onClick={copyNo} className="rounded-full border border-white/15 px-2.5 py-0.5 font-sans text-xs text-white/70 hover:border-accent print:hidden">Copy</button>
              </dd>
            </div>
          </dl>

          {/* Payment */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 print:hidden">
            {paid ? (
              <div role="status" className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-200">
                <b className="block text-lg text-emerald-100">Payment received</b>
                Receipt {invoice.receipt} · {invoice.paidAt && fmtDay(invoice.paidAt)}. A receipt is on its way to {invoice.email}.
              </div>
            ) : (
              <>
                <button type="button" onClick={() => setPayOpen(true)} className={`${btnPrimary} h-14 w-full text-lg`}>
                  Pay {naira2(total)} with Paystack
                </button>
                <p className="text-center text-sm text-white/50">
                  Card, bank transfer or USSD. Payment holds your start date of {fmtDay(invoice.start)}.
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={smallBtn} onClick={() => window.print()}>Print invoice</button>
              {!paid && (
                <button type="button" className={smallBtn} onClick={() => setFinanceOpen((o) => !o)}>
                  Send to my finance team
                </button>
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
                <button type="submit" className={btnLine}>Send invoice</button>
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
              ["We test", `From ${fmtDay(invoice.start)}. Anything critical is flagged the same day.`],
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

      {payOpen && (
        <Modal title="Simulated payment" onClose={closePay}>
          <p className="text-white/70">
            In the live version, this button opens Paystack&apos;s secure checkout for this invoice, where the client pays by card, bank transfer or USSD.
          </p>
          <div className="flex items-center justify-between rounded-md border border-white/10 bg-primary p-4">
            <span className="text-white/50">Amount</span>
            <b className="text-xl tabular-nums text-white">{naira(total)}</b>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className={btnPrimary} onClick={simulatePayment}>Simulate successful payment</button>
            <button type="button" className={btnLine} onClick={closePay}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
