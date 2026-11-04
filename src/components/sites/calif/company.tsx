import { approachSteps, companyManifesto, companyPillars } from "./data";
import { TESTER } from "./book/book-data";

export function Company() {
  return (
    <>
      {/* Manifesto */}
      <section className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-accent">
            Our belief
          </p>
          <p className="max-w-5xl text-3xl font-medium leading-tight tracking-tight text-white lg:text-6xl">
            {companyManifesto.statement}
          </p>
        </div>
      </section>

      {/* Mission / why we exist */}
      <section className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
              Security as a foundation for growth.
            </h2>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
              Mission
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              {companyManifesto.mission}
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
              Why we exist
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              {companyManifesto.why}
            </p>
          </div>
        </div>
      </section>

      {/* What we're built on */}
      <section id="company" className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 grid grid-cols-1 gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-5xl">
              What we&apos;re built on
            </h2>
            <p className="text-lg leading-relaxed text-white/60 lg:text-right">
              {companyManifesto.future}
            </p>
          </div>
          <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {companyPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="border-b border-white/10 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="mb-6 text-xs text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="leading-relaxed text-white/60">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">Leadership</p>
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-5xl">Led by practitioners</h2>
          </div>
          <div className="flex flex-col gap-6 rounded-lg border border-white/10 bg-secondary p-6 sm:flex-row sm:items-start lg:p-10">
            <div aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent/15 text-2xl font-bold text-accent">
              {TESTER.initials}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">{TESTER.name}</h3>
              <p className="mb-4 text-white/50">{TESTER.role}</p>
              <p className="leading-relaxed text-white/70">{TESTER.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 max-w-3xl lg:mb-16">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              How we work
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white lg:text-5xl">
              We don&apos;t begin with tools. We begin with understanding.
            </h2>
          </div>
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {approachSteps.map((step) => (
              <li key={step.num} className="border-t-2 border-accent/60 pt-6">
                <p className="mb-3 text-sm text-white/40">{step.num}</p>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-white/60">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
