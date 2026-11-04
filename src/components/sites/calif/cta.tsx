import Link from "next/link";
import { ctaHeading, ctaDescription } from "./data";

export function CTA() {
  return (
    <section className="bg-primary px-3 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto mb-12 w-[200px] text-accent/60 lg:mb-16">
        <svg
          fill="none"
          aria-hidden="true"
          className="block w-full"
          viewBox="0 0 600 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={3}
            d="M0 12C25 0 75 0 100 12s75 12 100 0 75-12 100 0 75 12 100 0 75-12 100 0 75 12 100 0"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-screen-xl text-center">
        <h2 className="mb-4 text-3xl font-semibold text-white lg:text-5xl">
          {ctaHeading.split("confidence").map((part, i) =>
            i === 0 ? (
              <span key={i}>{part}</span>
            ) : (
              <span key={i}>
                <span
                  className="bg-clip-text text-transparent italic font-light"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #E87722, #F5A623)",
                  }}
                >
                  confidence
                </span>
                {part}
              </span>
            )
          )}
        </h2>
        <p className="mb-8 text-lg font-light text-white/80 lg:mb-10 lg:text-2xl max-w-2xl mx-auto">
          {ctaDescription}
        </p>
        <div className="inline-block">
          <Link
            href="/contact"
            className="flex items-center rounded-full border border-accent bg-gradient-to-r from-accent to-accent-dark transition-all"
          >
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="animate-arrow-bounce text-white">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </div>
            <div className="px-9 text-lg font-medium text-white">
              Let&apos;s talk
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
