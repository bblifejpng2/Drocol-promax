import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sites/calif/header";
import { Footer } from "@/components/sites/calif/footer";
import { CTA } from "@/components/sites/calif/cta";
import { HeroPhoto } from "@/components/sites/calif/page-hero";
import {
  articles,
  getArticle,
  type ArticleBlock,
} from "@/components/sites/calif/research-articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.title} | Drocol Research`, description: article.excerpt };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 mb-4 text-2xl font-semibold text-white lg:text-3xl">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 text-xl font-semibold text-white">{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-lg leading-relaxed text-white/75">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-white/75">
              <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          className={`my-8 rounded-lg border p-6 ${
            block.tone === "warn" ? "border-accent/40 bg-accent/10" : "border-white/15 bg-secondary"
          }`}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">{block.title}</p>
          <p className="leading-relaxed text-white/80">{block.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[480px] text-left">
            <thead>
              <tr className="border-b border-white/10">
                {block.headers.map((h) => (
                  <th key={h} scope="col" className="p-4 text-sm font-semibold text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/10 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="p-4 align-top text-white/75">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "takeaways":
      return (
        <aside className="mt-12 rounded-lg border border-white/10 bg-secondary p-6 lg:p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Key takeaways</p>
          <ol className="space-y-3">
            {block.items.map((item, i) => (
              <li key={item} className="flex gap-4 leading-relaxed text-white/80">
                <span className="text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <Header />
      <main>
        <section className="on-photo relative flex min-h-[420px] flex-col justify-end bg-[#1c1917] px-3 pt-[140px] pb-14 lg:min-h-[520px] lg:px-10 lg:pb-20">
          <HeroPhoto src="/sites/calif/heroes/article.jpg" />
          <div className="hero-fade absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-primary via-primary/70 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <Link href="/research" className="mb-6 inline-block text-white/70 hover:text-white">← All research</Link>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">{article.tag}</p>
            <h1 className="mb-5 text-3xl font-semibold leading-tight text-white lg:text-5xl">{article.title}</h1>
            <p className="text-white/70">
              {article.author} · {article.date} · {article.readTime}
            </p>
          </div>
        </section>

        <article className="bg-primary px-3 py-14 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-xl leading-relaxed text-white lg:text-2xl">{article.intro}</p>
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>

        <section className="bg-secondary px-3 py-14 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">More research</p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link href={`/research/${a.slug}`} className="group flex flex-col gap-1 py-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-accent">{a.tag}</span>
                    <span className="text-xl font-semibold text-white transition-colors group-hover:text-accent">{a.title}</span>
                    <span className="text-sm text-white/40">{a.date} · {a.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
