import Link from "next/link";
import { researchIntro, researchItems } from "./data";
import { articles } from "./research-articles";

// Editorial research list: date, topic and title per row,
// followed by the areas the research program publishes in.
export function Research() {
  return (
    <>
      <section id="research" className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-5xl">
              Latest research
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/60 lg:text-right">
              {researchIntro}
            </p>
          </div>

          <ul className="border-t border-white/15">
            {articles.map((article) => (
              <li key={article.slug} className="border-b border-white/15">
                <Link
                  href={`/research/${article.slug}`}
                  className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[140px_180px_1fr_auto] md:items-baseline md:gap-8 lg:py-10"
                >
                <time className="text-sm text-white/40">{article.date}</time>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {article.tag}
                </p>
                <div>
                  <h3 className="mb-2 text-xl font-semibold leading-snug text-white transition-colors group-hover:text-accent lg:text-2xl">
                    {article.title}
                  </h3>
                  <p className="leading-relaxed text-white/60">{article.excerpt}</p>
                </div>
                <p className="whitespace-nowrap text-sm text-white/40">
                  {article.readTime} <span aria-hidden="true" className="text-accent">→</span>
                </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
            Research program
          </p>
          <h2 className="mb-12 text-3xl font-semibold leading-tight text-white lg:mb-16 lg:text-4xl">
            What we publish
          </h2>
          <ul className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {researchItems.map((item) => (
              <li
                key={item.title}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-6 sm:pr-8"
              >
                <span className="text-lg text-white">{item.title}</span>
                <span className="whitespace-nowrap text-xs uppercase tracking-[0.15em] text-white/40">
                  {item.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
