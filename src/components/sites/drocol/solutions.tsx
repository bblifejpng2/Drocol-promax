import Link from "next/link";
import { solutionItems } from "./data";

// Enterprise layout: sticky service index on the left, detailed service
// sections on the right. Anchors match the homepage (#assess, #advise, ...).
export function Solutions() {
  return (
    <section id="solutions" className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
        <nav aria-label="Services" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
              Our services
            </p>
            <ol className="space-y-1 border-l border-white/10">
              {solutionItems.map((item, i) => (
                <li key={item.anchor}>
                  <a
                    href={`#${item.anchor}`}
                    className="-ml-px flex items-baseline gap-3 border-l border-transparent py-2.5 pl-5 text-lg text-white/60 transition-colors hover:border-accent hover:text-white"
                  >
                    <span className="text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Talk to an expert
            </Link>
          </div>
        </nav>

        <div className="divide-y divide-white/10">
          {solutionItems.map((item, i) => (
            <article
              key={item.anchor}
              id={item.anchor}
              className="scroll-mt-28 py-12 first:pt-0 last:pb-0 lg:py-16"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")} · {item.title}
              </p>
              <h2 className="mb-5 max-w-3xl text-2xl font-semibold leading-tight text-white lg:text-4xl">
                {item.description}
              </h2>
              <p className="mb-6 text-sm uppercase tracking-[0.15em] text-white/40">
                Capabilities
              </p>
              <ul className="mb-8 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
                {item.items.map((sub) => (
                  <li
                    key={sub}
                    className="flex items-center gap-3 border-b border-white/10 py-4 text-white/80 sm:odd:pr-6"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {sub}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="text-accent hover:underline">
                {item.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
