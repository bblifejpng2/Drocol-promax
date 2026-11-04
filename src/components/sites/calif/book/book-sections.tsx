import Link from "next/link";
import { HeroPhoto } from "../page-hero";
import {
  COMPARE,
  FAQ,
  HOW_STEPS,
  LEVEL_ORDER,
  LEVELS,
  PROOF_POINTS,
  TESTER,
  naira,
  totalOf,
  type CompareValue,
} from "./book-data";

// Online checkout is paused until payments and email codes have a backend
// (see docs/research/drocol-booking/BUILD-NOTES.md); requests go to Contact.
const checkoutHref = (level: string) => `/contact?level=${level}#start`;

function Tick({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function BookHero() {
  return (
    <section className="on-photo relative bg-[#1c1917] px-3 pt-[140px] pb-16 lg:px-10 lg:pt-[200px] lg:pb-24">
      <HeroPhoto src="/sites/calif/heroes/book.jpg" />
      <div className="hero-fade absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-primary via-primary/70 to-transparent" />
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <p className="mb-4 pl-3 text-xs uppercase tracking-[0.2em] text-accent">
          Penetration testing for web apps and APIs
        </p>
        <h1 className="mb-5 max-w-4xl pl-3 text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-white lg:text-[64px]">
          Find the holes before{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)" }}
          >
            attackers do
          </span>
          .
        </h1>
        <p className="mb-8 max-w-2xl pl-4 text-lg font-light leading-relaxed text-white/80 lg:text-xl">
          Fixed-price security testing, led by a CISSP-certified tester. Pick a level, choose a start date, and book in five minutes.
        </p>
        <div className="mb-14 flex flex-wrap gap-3 pl-4">
          <a href="#pricing" className="flex h-[44px] items-center rounded-full border border-accent bg-gradient-to-r from-accent to-accent-dark px-9 text-lg font-medium text-white">
            See pricing
          </a>
          <Link href="/contact" className="flex h-[44px] items-center rounded-full border border-white/20 px-8 text-lg font-medium text-white/80 transition-colors hover:text-white">
            Talk to us
          </Link>
        </div>
        <dl className="grid grid-cols-1 gap-6 border-t border-white/15 pt-8 pl-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_POINTS.map(([title, body]) => (
            <div key={title}>
              <dt className="mb-1 font-semibold text-white">{title}</dt>
              <dd className="text-sm leading-relaxed text-white/60">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function BookPricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-primary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-white lg:text-5xl">Choose your testing level</h2>
          <p className="text-lg leading-relaxed text-white/60 lg:text-xl">
            Every level is tested hands-on by a certified tester, with automated tools to cover more ground. Each level includes everything in the one before it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LEVEL_ORDER.map((id) => {
            const level = LEVELS[id];
            return (
              <article
                key={id}
                id={`level-${id}`}
                className={`relative flex flex-col gap-6 rounded-lg border p-6 lg:p-7 ${
                  level.recommended ? "border-accent bg-secondary" : "border-white/10 bg-secondary/60"
                }`}
              >
                {level.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Recommended
                  </span>
                )}
                <div>
                  <h3 className="mb-2 text-2xl font-semibold text-white">{level.name}</h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    <span className="font-medium text-white">Best for</span> {level.fit}
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tabular-nums text-white">{naira(level.price)}</p>
                  <p className="text-sm tabular-nums text-white/40">{naira(totalOf(level.price))} with VAT</p>
                </div>
                <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
                  {level.facts.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-white/50">{k}</dt>
                      <dd className="text-right text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex-1">
                  <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/40">{level.plusLabel}</p>
                  <ul className="space-y-2.5">
                    {level.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-white/80">
                        <Tick className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={checkoutHref(id)}
                  className={`flex h-[44px] items-center justify-center rounded-full font-medium transition-colors ${
                    level.recommended
                      ? "bg-gradient-to-r from-accent to-accent-dark text-white"
                      : "border border-white/20 text-white hover:border-accent"
                  }`}
                >
                  Book {level.name}
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-white/50">
          All prices are fixed, with 7.5% VAT added to your invoice. Choose a level and we confirm your start date within one business day. Need a bigger scope?{" "}
          <Link href="/contact" className="text-accent hover:underline">Get a custom quote</Link>.
        </p>
      </div>
    </section>
  );
}

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true)
    return (
      <span className="inline-flex text-accent">
        <Tick />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <span className="text-white/25">
        –<span className="sr-only">Not included</span>
      </span>
    );
  return <>{value}</>;
}

export function BookCompare() {
  const rec = LEVEL_ORDER.findIndex((id) => LEVELS[id].recommended);
  const colClass = (i: number) => (i === rec ? "bg-accent/[0.07]" : "");
  return (
    <section id="compare" className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Compare</p>
        <h2 className="mb-12 text-3xl font-semibold leading-tight text-white lg:mb-16 lg:text-5xl">Every level, side by side</h2>
        <div className="relative overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="p-4"><span className="sr-only">Feature</span></th>
                {LEVEL_ORDER.map((id, i) => (
                  <th key={id} scope="col" className={`p-4 text-base font-semibold text-white ${colClass(i)}`}>
                    {LEVELS[id].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([label, values]) => (
                <tr key={label} className="border-b border-white/10">
                  <td className="p-4 text-white/60">{label}</td>
                  {values.map((v, i) => (
                    <td key={i} className={`p-4 text-white/90 ${colClass(i)}`}>
                      <CompareCell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Price</td>
                {LEVEL_ORDER.map((id, i) => (
                  <td key={id} className={`p-4 tabular-nums ${colClass(i)}`}>
                    <span className="block text-lg font-semibold text-white">{naira(LEVELS[id].price)}</span>
                    <small className="text-white/40">{naira(totalOf(LEVELS[id].price))} with VAT</small>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4"><span className="sr-only">Book</span></td>
                {LEVEL_ORDER.map((id, i) => (
                  <td key={id} className={`p-4 ${colClass(i)}`}>
                    <Link
                      href={checkoutHref(id)}
                      className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium ${
                        i === rec ? "bg-gradient-to-r from-accent to-accent-dark text-white" : "border border-white/20 text-white hover:border-accent"
                      }`}
                    >
                      Book {LEVELS[id].name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function BookHow() {
  return (
    <section id="how" className="scroll-mt-24 bg-primary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">How it works</p>
        <h2 className="mb-12 text-3xl font-semibold leading-tight text-white lg:mb-16 lg:text-5xl">From booking to report</h2>
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {HOW_STEPS.map((step) => (
            <li key={step.num} className="border-t-2 border-accent/60 pt-6">
              <p className="mb-3 text-sm text-white/40">{step.num}</p>
              <h3 className="mb-3 text-xl font-semibold text-white lg:text-2xl">{step.title}</h3>
              <p className="mb-4 leading-relaxed text-white/60">{step.body}</p>
              <p className="text-sm text-accent">{step.time}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-6 rounded-lg border border-white/10 bg-secondary p-6 sm:flex-row sm:items-start lg:mt-24 lg:p-10">
          <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xl font-bold text-accent">
            {TESTER.initials}
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Your tester</p>
            <h3 className="text-2xl font-semibold text-white">{TESTER.name}</h3>
            <p className="mb-4 text-white/50">{TESTER.role}</p>
            <p className="max-w-3xl leading-relaxed text-white/70">{TESTER.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BookFaq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-secondary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">FAQ</p>
          <h2 className="text-3xl font-semibold leading-tight text-white lg:text-5xl">Before you book</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-white">
                {item.q}
                <span aria-hidden="true" className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-white/60">
                {item.contactLink && (
                  <>
                    <Link href="/contact" className="text-accent hover:underline">Contact us</Link>{" "}
                  </>
                )}
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookCustomScope() {
  return (
    <section className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-6 rounded-lg border border-accent/40 bg-accent/10 p-8 md:flex-row md:items-center md:justify-between lg:p-12">
        <div className="max-w-2xl">
          <h2 className="mb-3 text-2xl font-semibold text-white lg:text-3xl">Need a custom scope?</h2>
          <p className="leading-relaxed text-white/70">
            Several apps, internal networks, or something that doesn&apos;t fit a level. Tell us what you need and we&apos;ll send a fixed quote within one business day.
          </p>
        </div>
        <Link href="/contact" className="inline-flex h-[44px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-dark px-8 font-medium text-white">
          Contact us
        </Link>
      </div>
    </section>
  );
}
