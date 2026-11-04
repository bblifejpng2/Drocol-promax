import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/sites/drocol/header";
import { Footer } from "@/components/sites/drocol/footer";
import { Checkout } from "@/components/sites/drocol/book/checkout";
import { isLevelId } from "@/components/sites/drocol/book/book-data";
import { getConfig, isTestMode } from "@/lib/booking/server";

export const metadata: Metadata = {
  title: "Book your test | Drocol",
  description: "Choose your testing level and start date, add your details, and generate your invoice.",
  robots: { index: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { level } = await searchParams;
  const initialLevel = isLevelId(level) ? level : "advanced";
  // Until Paystack/Brevo keys are set, send visitors to the contact form.
  if (!getConfig()) redirect(`/contact?level=${initialLevel}#start`);

  return (
    <>
      <Header />
      <main className="phone-main-offset min-h-screen bg-primary pb-24 pt-28 lg:pt-32">
        {isTestMode() ? (
          <div className="mx-auto mb-8 max-w-screen-xl px-3 lg:px-6">
            <p className="rounded-md border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm text-amber-200">
              <b>Test mode.</b> Real email codes, Paystack test payments — no real money moves.
            </p>
          </div>
        ) : null}
        <Checkout initialLevel={initialLevel} />
      </main>
      <Footer />
    </>
  );
}
