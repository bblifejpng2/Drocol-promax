import type { Metadata } from "next";
import { Header } from "@/components/sites/drocol/header";
import { PageHero } from "@/components/sites/drocol/page-hero";
import { Company } from "@/components/sites/drocol/company";
import { Testimonials } from "@/components/sites/drocol/testimonials";
import { CTA } from "@/components/sites/drocol/cta";
import { Footer } from "@/components/sites/drocol/footer";

export const metadata: Metadata = {
  title: "Company | Drocol",
  description:
    "Drocol Technologies is a Nigerian cybersecurity company combining expert consulting, original research, and AI-powered technology.",
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Company"
          image="/sites/drocol/heroes/company.jpg"
          heading="Built in Lagos. Building for the continent."
          description="Drocol Technologies is a Nigerian cybersecurity company combining expert consulting, original research, and AI-powered technology — so African organizations can secure what matters and move forward with confidence."
        />
        <Company />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
