import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { PageHero } from "@/components/sites/calif/page-hero";
import { Company } from "@/components/sites/calif/company";
import { Testimonials } from "@/components/sites/calif/testimonials";
import { CTA } from "@/components/sites/calif/cta";
import { Footer } from "@/components/sites/calif/footer";

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
          image="/sites/calif/heroes/company.jpg"
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
