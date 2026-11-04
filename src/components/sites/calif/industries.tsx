"use client";

import { useState } from "react";
import Link from "next/link";
import { industries } from "./data";

// Enterprise split selector: sector list on the left, the selected sector's
// detail panel on the right. On small screens the list sits above the panel.
export function Industries() {
  const [active, setActive] = useState(0);
  const industry = industries[active];

  return (
    <section id="industries" className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="border-t border-white/10">
          {industries.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`industry-tab-${i}`}
                aria-selected={selected}
                aria-controls="industry-panel"
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between border-b border-white/10 py-5 text-left text-xl transition-colors lg:text-2xl ${
                  selected ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-accent transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active}`}
          className="self-start rounded-lg border border-white/10 bg-primary p-8 lg:sticky lg:top-28 lg:p-12"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
            {String(active + 1).padStart(2, "0")} · Industry
          </p>
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-white lg:text-4xl">
            {industry.title}
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/70">{industry.body}</p>
          <p className="mb-4 text-sm uppercase tracking-[0.15em] text-white/40">
            Key frameworks
          </p>
          <ul className="mb-10 flex flex-wrap gap-2">
            {industry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80"
              >
                {tag}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-gradient-to-r from-accent to-accent-dark px-7 py-3 font-medium text-white"
          >
            Talk to us about {industry.title.toLowerCase()}
          </Link>
        </div>
      </div>
    </section>
  );
}
