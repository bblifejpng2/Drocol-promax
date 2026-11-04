import Link from "next/link";
import { serviceCategories, servicesIntro } from "./data";

export function Services() {
  return (
    <section id="services" className="bg-secondary px-3 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-white lg:text-5xl">
            {servicesIntro.heading}
          </h2>
          <p className="text-lg leading-relaxed text-white/60 lg:text-xl">
            {servicesIntro.subtitle}
          </p>
        </div>

        {serviceCategories.map((category, i) => (
          <div
            key={category.id}
            id={category.id}
            className={
              i === 0
                ? "mb-12 lg:mb-16"
                : "mb-12 border-t border-white/10 pt-12 last:mb-0 lg:mb-16 lg:pt-16 lg:last:mb-0"
            }
          >
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-accent">
              {category.num} · {category.tag}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-white lg:text-2xl">
                  {category.label}
                </h3>
                <p className="leading-relaxed text-white/60">{category.subtitle}</p>
              </div>
              <div>
                <p className="leading-relaxed text-white/60">{category.description}</p>
              </div>
              <div>
                <ul className="mb-4 space-y-2">
                  {category.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-3 text-white/80">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="text-accent hover:underline">
                  {category.cta} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
