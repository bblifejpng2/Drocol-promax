import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { Footer } from "@/components/sites/calif/footer";
import {
  BookCompare,
  BookCustomScope,
  BookFaq,
  BookHero,
  BookHow,
  BookPricing,
} from "@/components/sites/calif/book/book-sections";

export const metadata: Metadata = {
  title: "Book a test | Drocol",
  description:
    "Fixed-price penetration testing for web apps and APIs. Pick a level, choose a start date and book in five minutes.",
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main>
        <BookHero />
        <BookPricing />
        <BookCompare />
        <BookHow />
        <BookFaq />
        <BookCustomScope />
      </main>
      <Footer />
    </>
  );
}
