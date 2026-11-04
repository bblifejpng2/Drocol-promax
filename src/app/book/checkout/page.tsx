import { redirect } from "next/navigation";
import { isLevelId } from "@/components/sites/calif/book/book-data";

// The online checkout (components/sites/calif/book/checkout.tsx) simulates
// email codes and payments. Until it has a real backend, booking requests go
// to the Contact form with the chosen level filled in.
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { level } = await searchParams;
  redirect(isLevelId(level) ? `/contact?level=${level}#start` : "/contact#start");
}
