"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Portal vist som en strektegnet bærbar PC (adminsiden) og en telefon (kundesiden), i samme stil som HAVN.
// Tegningen ligger i et viewBox på 1000 × 780. Skjerminnholdet er HTML lagt nøyaktig over.
const VB = { w: 1000, h: 780 };
const screen = { x: 44, y: 62, w: 752, h: 470 }; // 1440 × 900, samme forhold som skjermbildet
const phone = { x: 806, y: 330, w: 164, h: 355 }; // 390 × 844
const pct = (r: { x: number; y: number; w: number; h: number }) => ({
  left: `${(r.x / VB.w) * 100}%`,
  top: `${(r.y / VB.h) * 100}%`,
  width: `${(r.w / VB.w) * 100}%`,
  height: `${(r.h / VB.h) * 100}%`,
});

const line = { stroke: "white", strokeWidth: 1.5, fill: "none", vectorEffect: "non-scaling-stroke" as const };

export default function PortalMock({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

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
    }, root);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`relative ${className}`}
      style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
      role="img"
      aria-label="Portal vist på en bærbar PC med adminsiden og en mobil med kundesiden, tegnet med hvit strek"
    >
      {/* Adminsiden på den bærbare */}
      <div className="absolute overflow-hidden bg-[#f7f7f8]" style={pct(screen)}>
        <div data-shot className="h-full">
          <Image
            src="/images/portal-admin.webp"
            alt=""
            width={1440}
            height={900}
            sizes="(min-width: 768px) 50vw, 90vw"
            className="block h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {/* Lokk og skjermkant */}
        <rect data-draw pathLength={1} x={30} y={48} width={780} height={498} rx={16} {...line} />
        <rect data-draw pathLength={1} x={44} y={62} width={752} height={470} rx={2} {...line} strokeOpacity={0.5} />
        <circle data-draw pathLength={1} cx={420} cy={55} r={2.5} {...line} strokeOpacity={0.7} />
        {/* Underdel med tastatur og styreflate, sett rett forfra */}
        <path data-draw pathLength={1} d="M 0 546 H 840 L 822 572 Q 818 578 810 578 H 30 Q 22 578 18 572 Z" {...line} />
        <path data-draw pathLength={1} d="M 370 546 Q 370 556 380 556 H 460 Q 470 556 470 546" {...line} strokeOpacity={0.6} />

        {/* Telefon: blå flate skjuler streken bak */}
        <rect x={796} y={318} width={184} height={380} rx={26} fill="var(--color-paper)" />
        <rect data-draw pathLength={1} x={796} y={318} width={184} height={380} rx={26} {...line} />

        {/* Påskrifter */}
        <g data-note className="max-md:hidden" fill="white" fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.06em">
          <path d="M 30 18 V 30 M 810 18 V 30 M 30 24 H 362 M 478 24 H 810" {...line} strokeOpacity={0.7} />
          <text x={420} y={28} textAnchor="middle">ADMIN</text>
          <path d="M 796 714 V 726 M 980 714 V 726 M 796 720 H 850 M 926 720 H 980" {...line} strokeOpacity={0.7} />
          <text x={888} y={724} textAnchor="middle">KUNDE</text>
          <path d="M 60 578 V 720 H 84" {...line} strokeOpacity={0.7} />
          <text x={92} y={724}>NEXT.JS · SUPABASE · PLAYWRIGHT</text>
        </g>
      </svg>

      {/* Kundesiden på telefonen */}
      <div className="absolute overflow-hidden rounded-[7%/3.2%] bg-[#f7f7f8]" style={pct(phone)}>
        <div data-shot className="h-full">
          <Image
            src="/images/portal-kunde.webp"
            alt=""
            width={390}
            height={844}
            sizes="(min-width: 768px) 12vw, 20vw"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
