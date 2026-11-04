import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { PageHero } from "@/components/sites/calif/page-hero";
import { Contact } from "@/components/sites/calif/contact";
import { Footer } from "@/components/sites/calif/footer";

export const metadata: Metadata = {
  title: "Contact | Drocol",
  description:
    "Get in touch with the Drocol team. Available 24/7 for security consultations, incident response, and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Contact"
          image="/sites/calif/heroes/contact.jpg"
          heading="Let's talk."
          description="Tell us what you're building, and what keeps you up at night. Available 24/7."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
