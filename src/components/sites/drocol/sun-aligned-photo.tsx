"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

type Props = {
  src: string;
  /** Intrinsic image size in pixels. */
  width: number;
  height: number;
  /** Sun position in the image, in intrinsic pixels. */
  sunX: number;
  sunY: number;
};

type Layout = { img: CSSProperties; glowX: number; glowY: number };

/**
 * Hero background that positions the photo so its sun sits just above the
 * element marked `data-sun-target` in the same section (the word
 * "confidence"), at every screen size. The tint opens up around the sun so
 * it glows, while the rest of the photo stays dark enough for white text.
 * Before measuring (and without JS) it falls back to a normal cover crop.
 */
export function SunAlignedPhoto({ src, width, height, sunX, sunY }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const section = wrap?.parentElement;
    const target = section?.querySelector<HTMLElement>("[data-sun-target]");
    if (!wrap || !section || !target) return;

    const update = () => {
      const sr = section.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      const W = sr.width;
      const H = sr.height;
      // Aim: sun centred over the word, clearly above it so the word itself
      // stays on darker sky and remains readable.
      const tx = tr.left - sr.left + tr.width / 2;
      const ty = tr.top - sr.top - Math.max(tr.height * 1.1, 70);
      // Smallest scale that still covers the section with the sun at (tx, ty).
      const s = Math.min(
        2.4,
        Math.max(W / width, H / height, tx / sunX, (W - tx) / (width - sunX), ty / sunY, (H - ty) / (height - sunY)),
      );
      setLayout({
        img: { width: width * s, height: height * s, left: tx - sunX * s, top: ty - sunY * s },
        glowX: tx,
        glowY: ty,
      });
    };

    // ResizeObserver fires once on observe, then on every size change
    // (window resize, fonts loading, text wrapping differently).
    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(target);
    return () => ro.disconnect();
  }, [width, height, sunX, sunY]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        unoptimized
        loading="eager"
        fetchPriority="high"
        className={layout ? "absolute max-w-none" : "absolute inset-0 h-full w-full object-cover"}
        style={layout?.img}
      />
      <div
        className="absolute inset-0"
        style={{
          background: layout
            ? `radial-gradient(circle at ${layout.glowX}px ${layout.glowY}px, rgba(0,0,0,0) 0px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.45) 110px, rgba(0,0,0,0.62) 300px)`
            : "rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}
