import { Header } from "@/components/sites/calif/header";
import { Hero } from "@/components/sites/calif/hero";
import { LogoCarousel } from "@/components/sites/calif/logo-carousel";
import { Services } from "@/components/sites/calif/services";
import { Testimonials } from "@/components/sites/calif/testimonials";
import { Press } from "@/components/sites/calif/press";
import { WhyDrocol } from "@/components/sites/calif/why-drocol";
import { CTA } from "@/components/sites/calif/cta";
import { Footer } from "@/components/sites/calif/footer";
import { SHOW_TESTIMONIALS } from "@/components/sites/calif/data";

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
