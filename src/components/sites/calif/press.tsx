import { approachSteps } from "./data";

export function Press() {
  return (
    <section id="approach" className="bg-primary px-3 py-16 lg:px-6 lg:py-24">
      <div className="px-3 pb-12 text-center lg:pb-16">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
          Our Approach
        </p>
        <h2 className="mx-auto max-w-screen-xl text-3xl font-semibold text-white lg:text-5xl">
          How we work
        </h2>
      </div>
      <div className="mx-auto max-w-4xl divide-y divide-white/15 border-t border-b border-white/15">
        {approachSteps.map((step) => (
          <div
            key={step.num}
            className="group flex items-baseline gap-8 py-8 lg:py-10"
          >
            <span className="text-2xl font-bold text-white/20 lg:text-3xl">
              {step.num}
            </span>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-white lg:text-3xl">
                {step.title}
              </h3>
              <p className="text-lg leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
