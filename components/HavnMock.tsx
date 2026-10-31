"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// HAVN vist i en strektegnet skjerm og telefon, i samme stil som kurslinjen.
// Tegningen ligger i et viewBox på 1000 × 780. Skjerm- og telefoninnholdet er HTML lagt nøyaktig over.
const VB = { w: 1000, h: 780 };
const screen = { x: 34, y: 84, w: 832, h: 502 }; // innholdsflate under nettleserlinjen
const phone = { x: 800, y: 340, w: 170, h: 380 };
const pct = (r: { x: number; y: number; w: number; h: number }) => ({
  left: `${(r.x / VB.w) * 100}%`,
  top: `${(r.y / VB.h) * 100}%`,
  width: `${(r.w / VB.w) * 100}%`,
  height: `${(r.h / VB.h) * 100}%`,
});

const line = { stroke: "white", strokeWidth: 1.5, fill: "none", vectorEffect: "non-scaling-stroke" as const };

export default function HavnMock({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const draw = root.current!.querySelectorAll("[data-draw]");
      gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set("[data-shot]", { clipPath: "inset(0 0 100% 0)" });
      gsap.set("[data-note]", { autoAlpha: 0 });

      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .to(draw, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.05 })
        .to("[data-shot]", { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out", stagger: 0.15 }, "-=0.5")
        .to("[data-note]", { autoAlpha: 1, duration: 0.6, stagger: 0.1 }, "-=0.6");

      // Siden ruller inne i skjermen mens seksjonen passerer
      gsap.to(page.current, {
        y: () => {
          const el = page.current!;
          const box = el.parentElement!.clientHeight;
          return -(el.offsetHeight - box);
        },
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 25%",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`relative ${className}`}
      style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
      role="img"
      aria-label="HAVN Boligstyling vist på en skjerm og en mobil, tegnet med hvit strek"
    >
      {/* Skjerminnhold: hele forsiden, som ruller */}
      <div className="absolute overflow-hidden bg-[#e9e1d8]" style={pct(screen)}>
        <div ref={page} data-shot className="will-change-transform">
          <Image
            src="/images/havn-desktop.webp"
            alt=""
            width={1440}
            height={4925}
            sizes="(min-width: 768px) 55vw, 90vw"
            className="block h-auto w-full"
          />
        </div>
      </div>

      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {/* Skjerm */}
        <rect data-draw pathLength={1} x={20} y={40} width={860} height={560} rx={14} {...line} />
        <rect data-draw pathLength={1} x={34} y={54} width={832} height={532} rx={3} {...line} strokeOpacity={0.5} />
        <line data-draw pathLength={1} x1={34} y1={84} x2={866} y2={84} {...line} strokeOpacity={0.5} />
        {[52, 66, 80].map((cx) => (
          <circle key={cx} data-draw pathLength={1} cx={cx} cy={69} r={4} {...line} strokeOpacity={0.7} />
        ))}
        <rect data-draw pathLength={1} x={300} y={61} width={300} height={16} rx={8} {...line} strokeOpacity={0.5} />
        <text data-note x={450} y={73} textAnchor="middle" fill="white" fontSize={10} fontFamily="var(--font-mono)">
          styling.havnbolig.no
        </text>
        {/* Fot */}
        <path data-draw pathLength={1} d="M 415 600 L 400 690 M 485 600 L 500 690" {...line} />
        <path data-draw pathLength={1} d="M 330 690 H 570" {...line} strokeLinecap="round" />

        {/* Telefon: blå flate skjuler skjermstreken bak */}
        <rect x={790} y={330} width={190} height={400} rx={26} fill="var(--color-paper)" />
        <rect data-draw pathLength={1} x={790} y={330} width={190} height={400} rx={26} {...line} />

        {/* Påskrifter */}
        <g data-note className="max-md:hidden" fill="white" fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.06em">
          <path d="M 20 12 V 24 M 880 12 V 24 M 20 18 H 404 M 496 18 H 880" {...line} strokeOpacity={0.7} />
          <text x={450} y={22} textAnchor="middle">1440 PX</text>
          <path d="M 790 744 V 756 M 980 744 V 756 M 790 750 H 846 M 924 750 H 980" {...line} strokeOpacity={0.7} />
          <text x={885} y={754} textAnchor="middle">393 PX</text>
          <path d="M 60 600 V 740 H 84" {...line} strokeOpacity={0.7} />
          <text x={92} y={744}>NEXT.JS · SANITY · VERCEL</text>
        </g>
      </svg>

      {/* Telefoninnhold: første skjerm av mobilversjonen */}
      <div className="absolute overflow-hidden rounded-[6%/3%] bg-[#e9e1d8]" style={pct(phone)}>
        <div data-shot className="h-full">
          <Image
            src="/images/havn-mobil.webp"
            alt=""
            width={786}
            height={1704}
            sizes="(min-width: 768px) 12vw, 20vw"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
