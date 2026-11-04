import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { PageHero } from "@/components/sites/calif/page-hero";
import { Solutions } from "@/components/sites/calif/solutions";
import { CTA } from "@/components/sites/calif/cta";
import { Footer } from "@/components/sites/calif/footer";

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
          image="/sites/calif/heroes/solutions.jpg"
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
