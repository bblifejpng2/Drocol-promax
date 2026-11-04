import type { Metadata } from "next";
import { Header } from "@/components/sites/drocol/header";
import { PageHero } from "@/components/sites/drocol/page-hero";
import { Solutions } from "@/components/sites/drocol/solutions";
import { CTA } from "@/components/sites/drocol/cta";
import { Footer } from "@/components/sites/drocol/footer";

export const metadata: Metadata = {
  title: "Solutions | Drocol",
  description:
    "Assessments, advisory, training, and the technology that amplifies them — built around how your organization actually operates.",
};

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Solutions"
          image="/sites/drocol/heroes/solutions.jpg"
          heading="Security services that meet you where you are."
          description="Assessments, advisory, training, and the technology that amplifies them — built around how your organization actually operates."
        />
        <Solutions />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
