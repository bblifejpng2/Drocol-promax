import Link from "next/link";
import { heroBadge, heroDescription } from "./data";

export function Hero() {
  return (
    <section className="on-photo bg-home relative px-3 pt-[140px] pb-20 lg:px-10 lg:pt-[230px] lg:pb-28">
      {/* Gradient fade at bottom */}
      <div className="hero-fade absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-primary via-primary/70 to-transparent" />
      <div className="relative z-10">
        <div className="mx-auto max-w-screen-xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
              {heroBadge}
            </span>
          </div>

          <h2 className="mb-4 pl-3 text-3xl font-medium leading-[1.08] tracking-[-0.025em] text-white lg:mb-6 lg:text-[68px]">
            Helping organizations build{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #E87722 0%, #F5A623 60%, #E87722 100%)",
              }}
            >
              confidence
            </span>{" "}
            in their security.
          </h2>

          <p className="mb-8 pl-4 text-lg font-light leading-relaxed text-white/60 lg:mb-10 lg:text-xl max-w-xl">
            {heroDescription}
          </p>

          <div className="flex flex-wrap gap-3 pl-4">
            <Link
              href="/contact"
              className="flex items-center rounded-full border border-accent bg-gradient-to-r from-accent to-accent-dark transition-all"
            >
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white/20">
                <img
                  src="/sites/calif/arrow.39f6457d.svg"
                  alt=""
                  className="animate-arrow-bounce"
                />
              </div>
              <div className="px-9 text-lg font-medium text-white">
                Let&apos;s talk
              </div>
            </Link>
            <Link
              href="/solutions"
              className="flex h-[44px] items-center rounded-full border border-white/20 px-8 text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              Solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
