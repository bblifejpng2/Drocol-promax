import Link from "next/link";
import {
  Banknote,
  BookOpen,
  CalendarClock,
  FileCheck,
  ScanSearch,
  Siren,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

// Same card wall as the testimonial section ("Don't take our word for it"),
// filled with verifiable facts from Drocol's own material instead of quotes.
type Reason = {
  icon: LucideIcon;
  title: string;
  kicker: string;
  body: string;
  link?: { href: string; label: string };
};

const reasons: Reason[] = [
  {
    icon: UserCheck,
    title: "Led by a certified tester",
    kicker: "CISSP · 6+ years",
    body: "Every engagement is led by Damilola Agoi-George, CISSP, with over six years across penetration testing, NDPA compliance, ISO 27001 and incident response.",
    link: { href: "/company", label: "Meet the team" },
  },
  {
    icon: ScanSearch,
    title: "Machines find. Humans judge.",
    kicker: "Drocol Core",
    body: "Our AI-assisted engine covers more ground, faster. A certified professional then reproduces and proves every finding, so false positives never reach your team.",
  },
  {
    icon: Banknote,
    title: "Fixed prices in naira",
    kicker: "From ₦1,100,000",
    body: "Four testing levels with VAT shown upfront. Bigger or unusual scopes get a fixed written quote within one business day.",
    link: { href: "/book", label: "See pricing" },
  },
  {
    icon: CalendarClock,
    title: "Starts in 2 business days",
    kicker: "Critical issues flagged same day",
    body: "Testing can begin two business days after booking. Anything critical is reported as soon as it's confirmed, not saved for the final report.",
  },
  {
    icon: FileCheck,
    title: "Audit-ready reports",
    kicker: "NDPA · ISO 27001 · OWASP",
    body: "An executive summary for leadership, evidence and fixes written for developers, and findings mapped to the frameworks your auditors ask about. Then we retest.",
  },
  {
    icon: Siren,
    title: "Available 24/7",
    kicker: "Incident response",
    body: "For active incidents and managed clients, our team picks up around the clock on +234 807 093 9166.",
    link: { href: "/contact", label: "Contact us" },
  },
  {
    icon: BookOpen,
    title: "Research, published openly",
    kicker: "Free to read",
    body: "Practical guides on the threats and regulations facing African organizations — from the NDPA to what really happens in a penetration test.",
    link: { href: "/research", label: "Read the research" },
  },
];

export function WhyDrocol() {
  return (
    <section id="why-drocol" className="keep-light bg-white">
      {/* Wave separator: page → white */}
      <div className="overflow-hidden leading-none">
        <svg className="block w-full" preserveAspectRatio="none" style={{ height: "80px" }} viewBox="0 0 1440 80" aria-hidden="true">
          <path fill="var(--secondary)" d="M0 0h1440v40C960 80 480 0 0 40Z" />
        </svg>
      </div>

      <div className="py-12 lg:py-16">
        <div className="px-3 pb-10 text-center lg:pb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent-dark">Why Drocol</p>
          <h2 className="mx-auto max-w-screen-xl text-3xl font-semibold text-neutral-900 lg:text-5xl">
            Don&apos;t take our word for it. Check the facts.
          </h2>
        </div>
        <div className="px-3">
          <div className="mx-auto max-w-screen-xl columns-1 gap-3 md:columns-2 lg:columns-3">
            {reasons.map(({ icon: Icon, title, kicker, body, link }) => (
              <article
                key={title}
                className="mx-auto mb-3 flex w-full max-w-3xl break-inside-avoid flex-col rounded-lg border bg-white shadow-lg"
              >
                <div className="flex items-center gap-3 p-4 pb-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{kicker}</p>
                  </div>
                </div>
                <div className="p-4 text-base leading-relaxed text-gray-800">
                  <p>{body}</p>
                  {link && (
                    <Link href={link.href} className="mt-3 inline-block font-semibold text-accent-dark hover:underline">
                      {link.label} →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Wave separator: white → page */}
      <div className="overflow-hidden leading-none">
        <svg className="block w-full" preserveAspectRatio="none" style={{ height: "80px" }} viewBox="0 0 1440 80" aria-hidden="true">
          <path fill="var(--primary)" d="M0 80h1440V40C960 0 480 80 0 40Z" />
        </svg>
      </div>
    </section>
  );
}
