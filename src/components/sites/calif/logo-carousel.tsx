import { partners } from "./data";

// "In good company" strip: partner names as plain wordmarks. We don't draw
// logos for real companies; add their official logo files here once they
// supply them. Two identical slides side by side keep the loop seamless.
const REPEAT = 5;

function NameSlide({ hidden = false }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEAT }, () => partners).flat();
  return (
    <ul
      className="animate-scroll-slide flex shrink-0 items-center gap-16 pr-16"
      aria-hidden={hidden || undefined}
    >
      {items.map((partner, i) => (
        <li
          key={`${partner.id}-${i}`}
          className="flex shrink-0 items-center gap-16 whitespace-nowrap text-2xl font-semibold tracking-tight text-white/70 lg:text-3xl"
        >
          {partner.name}
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent/50" />
        </li>
      ))}
    </ul>
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
        <NameSlide />
        <NameSlide hidden />
      </div>
    </section>
  );
}
