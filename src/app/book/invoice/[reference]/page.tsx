import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sites/drocol/header";
import { Footer } from "@/components/sites/drocol/footer";
import { Invoice } from "@/components/sites/drocol/book/invoice";
import { getConfig, invoiceSigOk, isTestMode, paystack, type BookingRecord } from "@/lib/booking/server";

export const metadata: Metadata = {
  title: "Your invoice | Drocol",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type Tx = { status: string; paid_at: string | null; amount: number; metadata: unknown };

export default async function InvoicePage({ params, searchParams }: Props) {
  const { reference } = await params;
  const { s, ac } = await searchParams;
  const cfg = getConfig();
  if (!cfg || !/^DRC-[0-9A-Z-]+$/.test(reference) || !invoiceSigOk(cfg.signingSecret, reference, s)) notFound();

  let tx: Tx | null = null;
  try {
    tx = await paystack<Tx>(cfg, `/transaction/verify/${encodeURIComponent(reference)}`);
  } catch {
    tx = null;
  }

  let booking: BookingRecord | null = null;
  if (tx) {
    try {
      const m = typeof tx.metadata === "string" ? JSON.parse(tx.metadata) : tx.metadata;
      booking = (m as { booking?: BookingRecord })?.booking ?? null;
    } catch {
      booking = null;
    }
  }

  const accessCode = typeof ac === "string" && /^[A-Za-z0-9]{5,64}$/.test(ac) ? ac : null;
  const paid = !!tx && !!booking && tx.status === "success" && tx.amount === booking.total * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-primary pb-24 pt-28 lg:pt-32 print:pt-0">
        {booking ? (
          <Invoice
            booking={booking}
            paid={paid}
            paidAt={paid ? tx?.paid_at ?? null : null}
            payUrl={!paid && accessCode ? `https://checkout.paystack.com/${accessCode}` : null}
            sig={String(s)}
            ac={accessCode}
            testMode={isTestMode()}
          />
        ) : (
          <div className="mx-auto max-w-xl px-3 text-center">
            <h1 className="mb-3 text-2xl font-semibold text-white">We couldn&apos;t load this invoice</h1>
            <p className="mb-6 text-white/60">Please refresh in a moment. If it keeps happening, contact us with your booking reference {reference}.</p>
            <Link href="/contact" className="text-accent hover:underline">Contact us</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
