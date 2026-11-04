import type { Metadata } from "next";
import { Header } from "@/components/sites/drocol/header";
import { PageHero } from "@/components/sites/drocol/page-hero";
import { Contact } from "@/components/sites/drocol/contact";
import { isLevelId } from "@/components/sites/drocol/book/book-data";
import { Footer } from "@/components/sites/drocol/footer";

export const metadata: Metadata = {
  title: "Contact | Drocol",
  description:
    "Get in touch with the Drocol team. Available 24/7 for security consultations, incident response, and general enquiries.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { level } = await searchParams;
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Contact"
          image="/sites/drocol/heroes/contact.jpg"
          heading="Let's talk."
          description="Tell us what you're building, and what keeps you up at night. Available 24/7."
        />
        <Contact level={isLevelId(level) ? level : undefined} />
      </main>
      <Footer />
    </>
  );
}
