import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { PageHero } from "@/components/sites/calif/page-hero";
import { Research } from "@/components/sites/calif/research";
import { CTA } from "@/components/sites/calif/cta";
import { Footer } from "@/components/sites/calif/footer";

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
          image="/sites/calif/heroes/research.jpg"
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
