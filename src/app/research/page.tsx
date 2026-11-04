import type { Metadata } from "next";
import { Header } from "@/components/sites/drocol/header";
import { PageHero } from "@/components/sites/drocol/page-hero";
import { Research } from "@/components/sites/drocol/research";
import { CTA } from "@/components/sites/drocol/cta";
import { Footer } from "@/components/sites/drocol/footer";

export const metadata: Metadata = {
  title: "Research | Drocol",
  description:
    "A long-term research program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations across Africa.",
};

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Research"
          image="/sites/drocol/heroes/research.jpg"
          heading="Research & Insights"
          description="A long-term research program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations operating across Africa."
        />
        <Research />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
