import { partners } from "./data";
import { PartnerMark } from "./partner-logos";

// Calif "In good company" strip: two identical slides side by side so the
// translateX(-100%) loop is seamless. Partners repeat to fill wide screens.
const REPEAT = 5;

function LogoSlide({ hidden = false }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEAT }, () => partners).flat();
  return (
    <div
      className="animate-scroll-slide flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={hidden || undefined}
    >
      {items.map((partner, i) => (
        <div
          key={`${partner.id}-${i}`}
          className="flex h-12 w-48 shrink-0 items-center justify-center gap-2.5"
        >
          <PartnerMark id={partner.id} className="h-9 w-9 shrink-0" />
          <span className="whitespace-nowrap text-lg font-bold tracking-tight text-white">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section id="customers" className="bg-primary px-3 pb-12 pt-8 lg:px-6 lg:pb-16 lg:pt-14">
      <div className="px-3 pb-10 text-center lg:pb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          In good company
        </p>
      </div>
      <div className="flex w-full flex-nowrap overflow-hidden">
        <LogoSlide />
        <LogoSlide hidden />
      </div>
    </section>
  );
}
