import { Header } from "@/components/sites/drocol/header";
import { Hero } from "@/components/sites/drocol/hero";
import { LogoCarousel } from "@/components/sites/drocol/logo-carousel";
import { Services } from "@/components/sites/drocol/services";
import { Testimonials } from "@/components/sites/drocol/testimonials";
import { Press } from "@/components/sites/drocol/press";
import { WhyDrocol } from "@/components/sites/drocol/why-drocol";
import { CTA } from "@/components/sites/drocol/cta";
import { Footer } from "@/components/sites/drocol/footer";
import { SHOW_TESTIMONIALS } from "@/components/sites/drocol/data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCarousel />
        <Services />
        {SHOW_TESTIMONIALS && <Testimonials />}
        <WhyDrocol />
        <Press />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
