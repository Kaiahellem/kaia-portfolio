"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const palette = [
  { name: "Blekk", hex: "#1A1A1A" },
  { name: "Papir", hex: "#F4F1EC" },
  { name: "Varm grå", hex: "#CFC8BD" },
  { name: "Bordeaux", hex: "#6B1E2A" },
];

// Melle-identiteten bygget i kode i stedet for som bilde.
// Ordmerket er Gloock med det andre «l» speilvendt. Bytt gjerne til den ekte logoen som SVG.
export default function MelleVisual({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        defaults: { ease: "expo.out" },
      });
      tl.fromTo(
        root.current,
        { clipPath: "inset(12% 6% 12% 6% round 6px)" },
        { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.2 },
      )
        .from("[data-letter]", { yPercent: 110, duration: 1.1, stagger: 0.06 }, "-=0.8")
        .from("[data-swatch]", { scale: 0, duration: 0.6, stagger: 0.06, ease: "back.out(2)" }, "-=0.6")
        .from("[data-label]", { autoAlpha: 0, y: 8, duration: 0.6 }, "<");
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      role="img"
      aria-label="Melle-ordmerket i papirfarge på bordeaux, med fargepaletten blekk, papir, varm grå og bordeaux"
      className={`relative aspect-[609/414] overflow-hidden rounded-md bg-melle text-melle-paper ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center pb-[4%]">
        <span
          aria-hidden
          className="flex overflow-hidden pb-[0.08em] font-serif text-[clamp(4.5rem,15vw,8.25rem)] leading-none"
        >
          <span data-letter className="inline-block">m</span>
          <span data-letter className="inline-block">e</span>
          <span data-letter className="inline-block">l</span>
          <span data-letter className="inline-block">
            <span className="inline-block -scale-x-100">l</span>
          </span>
          <span data-letter className="inline-block">e</span>
        </span>
      </div>

      <div className="absolute inset-x-[18px] bottom-[18px] flex items-center justify-between md:inset-x-7 md:bottom-7">
        <span data-label className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-80 md:text-[11px]">
          Visuell identitet
        </span>
        <ul className="flex gap-1.5" aria-hidden>
          {palette.map((c) => (
            <li
              key={c.hex}
              data-swatch
              title={`${c.name} ${c.hex}`}
              className="size-3.5 rounded-full md:size-[18px]"
              style={{
                background: c.hex,
                boxShadow: c.hex === "#6B1E2A" ? "inset 0 0 0 1px #F4F1EC" : undefined,
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
