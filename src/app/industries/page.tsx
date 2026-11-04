import type { Metadata } from "next";
import { Header } from "@/components/sites/calif/header";
import { PageHero } from "@/components/sites/calif/page-hero";
import { Industries } from "@/components/sites/calif/industries";
import { CTA } from "@/components/sites/calif/cta";
import { Footer } from "@/components/sites/calif/footer";

export const metadata: Metadata = {
  title: "Industries | Drocol",
  description:
    "Every industry faces different threats, regulations, and operational realities. Understanding those differences is where good security begins.",
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          label="Industries"
          image="/sites/calif/heroes/industries.jpg"
          heading="Security that fits your industry."
          description="Every industry faces different threats, regulations, and operational realities. Understanding those differences is where good security begins — and where we start every engagement."
        />
        <Industries />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
