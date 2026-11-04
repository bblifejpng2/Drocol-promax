import Image from "next/image";

type PageHeroProps = {
  label: string;
  heading: string;
  description: string;
  /** Page-specific background photo, e.g. "/sites/calif/heroes/solutions.jpg". */
  image?: string;
};

/**
 * Full-bleed hero photo with a dark tint. Loaded eagerly at high priority
 * because it is the first thing on the page. While it loads, the section's
 * plain dark background shows — never another page's photo.
 * `unoptimized`: the files in /public/sites/calif/heroes are already
 * web-sized JPEGs, and the on-the-fly resizer was stalling under load.
 */
export function HeroPhoto({ src }: { src: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        unoptimized
        loading="eager"
        fetchPriority="high"
        className="object-cover object-center"
      />
      {/* Darken the photo so white text stays readable */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}

export function PageHero({ label, heading, description, image }: PageHeroProps) {
  return (
    <section className="on-photo relative flex min-h-[480px] flex-col justify-end bg-[#1c1917] px-3 pt-[160px] pb-16 lg:min-h-[640px] lg:px-10 lg:pt-[220px] lg:pb-24">
      {image && <HeroPhoto src={image} />}
      {/* Gradient fade at bottom */}
      <div className="hero-fade absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-primary via-primary/70 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-screen-xl">
        <p className="mb-4 pl-3 text-xs uppercase tracking-[0.2em] text-accent">
          {label}
        </p>
        <h1 className="mb-4 pl-3 text-3xl font-semibold leading-tight text-white lg:text-6xl">
          {heading}
        </h1>
        <p className="pl-4 text-lg font-light leading-relaxed text-white/80 lg:text-xl max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
