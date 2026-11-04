import { partners } from "./data";
import { PartnerMark } from "./partner-logos";

// "In good company" strip: black-and-white partner marks with their names.
// Swap in each partner's official logo files once they supply them.
// Two identical slides side by side keep the scrolling loop seamless.
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
          className="flex shrink-0 items-center gap-16 whitespace-nowrap"
        >
          <span className="flex items-center gap-3">
            <PartnerMark id={partner.id} className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" />
            <span className="text-2xl font-semibold tracking-tight text-white/80 lg:text-3xl">
              {partner.name}
            </span>
          </span>
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
