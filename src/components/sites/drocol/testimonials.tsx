import { Fragment } from "react";
import { DROCOL_INSTAGRAM, testimonials, testimonialsHeading } from "./data";

/** Renders every "Drocol" in a quote as an orange link to Drocol's Instagram. */
function QuoteWithBrandLink({ text }: { text: string }) {
  const parts = text.split("Drocol");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={DROCOL_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Drocol on Instagram (opens in a new tab)"
          className="font-semibold text-accent hover:underline"
        >
          Drocol
        </a>
      )}
    </Fragment>
  ));
}

export function Testimonials() {
  return (
    <section id="clients-say" className="keep-light bg-white">
      {/* Wave separator: dark → white */}
      <div className="overflow-hidden leading-none">
        <svg
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
          viewBox="0 0 1440 80"
        >
          <path fill="var(--secondary)" d="M0 0h1440v40C960 80 480 0 0 40Z" />
        </svg>
      </div>

      <div className="py-12 lg:py-16">
        <div className="px-3 pb-10 text-center text-3xl lg:pb-12 lg:text-5xl">
          <h2 className="mx-auto max-w-screen-xl font-semibold text-neutral-900">
            {testimonialsHeading}
          </h2>
        </div>
        <div className="px-3">
          <div className="mx-auto max-w-screen-xl columns-1 gap-3 md:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <figure
                key={t.name + t.role}
                className="mx-auto mb-3 flex w-full max-w-3xl break-inside-avoid flex-col rounded-lg border bg-white shadow-lg"
              >
                <figcaption className="p-4 pb-0">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-sm font-bold text-accent">
                      {t.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </figcaption>
                <blockquote className="px-4 pb-4 text-base leading-relaxed text-gray-800">
                  <p className="mb-4">
                    <QuoteWithBrandLink text={t.quote} />
                  </p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Wave separator: white → dark */}
      <div className="overflow-hidden leading-none">
        <svg
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
          viewBox="0 0 1440 80"
        >
          <path fill="var(--primary)" d="M0 80h1440V40C960 0 480 80 0 40Z" />
        </svg>
      </div>
    </section>
  );
}
