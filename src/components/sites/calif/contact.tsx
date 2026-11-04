import { contactItems } from "./data";
import { ContactForm } from "./contact-form";

// Enterprise contact: 24/7 incident line up top, channel cards, then a
// project enquiry form beside the office details.
export function Contact() {
  const [general, support, direct, location] = contactItems;

  return (
    <section id="contact" className="bg-secondary px-3 py-16 lg:px-6 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        {/* Incident banner */}
        <div className="mb-12 flex flex-col gap-4 rounded-lg border border-accent/40 bg-accent/10 p-6 md:flex-row md:items-center md:justify-between lg:mb-16 lg:p-8">
          <div className="flex items-center gap-4">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            <div>
              <p className="text-lg font-semibold text-white">
                Facing an active security incident?
              </p>
              <p className="text-white/60">{support.desc}</p>
            </div>
          </div>
          {support.href && (
            <a
              href={support.href}
              className="inline-flex shrink-0 justify-center rounded-full bg-gradient-to-r from-accent to-accent-dark px-7 py-3 font-medium text-white"
            >
              Call {support.value}
            </a>
          )}
        </div>

        {/* Channel cards */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mb-24">
          {[general, support, direct].map((item) => (
            <div key={item.label} className="rounded-lg border border-white/10 bg-primary p-6 lg:p-8">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-accent">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mb-3 block text-xl font-semibold text-white transition-colors hover:text-accent"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mb-3 text-xl font-semibold text-white">{item.value}</p>
              )}
              <p className="leading-relaxed text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Enquiry form + office */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <h2 className="mb-3 text-3xl font-semibold text-white lg:text-4xl">
              Start a project
            </h2>
            <p className="mb-10 text-lg text-white/60">
              Talk to our security team. No pressure, no jargon — just a practical
              conversation about your security.
            </p>
            <ContactForm email={general.value} />
          </div>
          <aside className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              {location.label}
            </p>
            <p className="mb-2 text-2xl font-semibold text-white">{location.value}</p>
            <p className="mb-10 text-white/60">{location.desc}</p>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
              What happens next
            </p>
            <ol className="space-y-4 text-white/70">
              <li className="flex gap-4"><span className="text-white/30">01</span>We reply within one business day.</li>
              <li className="flex gap-4"><span className="text-white/30">02</span>A short call to understand your environment and goals.</li>
              <li className="flex gap-4"><span className="text-white/30">03</span>A clear proposal with scope, timeline, and cost.</li>
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
