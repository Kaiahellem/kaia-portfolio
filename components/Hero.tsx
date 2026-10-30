"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Animasjon 1: loader som teller til 100, glir opp og avslører hero-teksten linje for linje.
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      split = SplitText.create("[data-hero-title]", { type: "chars", mask: "chars" });
      gsap.set(split.chars, { yPercent: 110 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 16 });

      tl.to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(loader.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.15")
        .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.035 }, "-=0.45")
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, "-=0.9")
        .set(loader.current, { display: "none" });
    }, root);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <div ref={root}>
      <div
        ref={loader}
        aria-hidden
        className="loader fixed inset-0 z-50 flex-col justify-between bg-ink p-5 text-paper md:p-10"
      >
        <span className="font-serif text-xl">Kaia Hellem</span>
        <div className="flex items-end justify-between">
          <span className="eyebrow !text-stone">Design &amp; web · Oslo</span>
          <span ref={count} className="font-serif text-7xl leading-none tabular-nums md:text-9xl">
            000
          </span>
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-14 md:px-10 md:pt-10">
        <a href="#" className="font-serif text-xl" data-hero-fade>
          Kaia Hellem
        </a>
        <a
          href="#kontakt"
          data-hero-fade
          className="rounded-full bg-accent px-[18px] py-[10px] text-[13px] font-medium text-paper transition-colors hover:bg-ink"
        >
          Kontakt
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-[72px] md:px-10 md:pb-24 md:pt-40">
        <p className="eyebrow mb-4" data-hero-fade>
          Design &amp; web
        </p>
        <h1
          data-hero-title
          className="font-serif text-[clamp(3.6rem,13vw,11rem)] leading-[0.95] tracking-[-0.01em]"
        >
          Kaia Hellem
        </h1>
        <p className="mt-4 max-w-md text-[17px] leading-[1.5] md:mt-8 md:text-xl" data-hero-fade>
          Jeg designer og bygger merkevare og nettsider.
        </p>
        <div className="mt-7 flex items-center gap-5" data-hero-fade>
          <a
            href="#prosjekter"
            className="rounded-full bg-accent px-[18px] py-[10px] text-[13px] font-medium text-paper transition-colors hover:bg-ink"
          >
            Se prosjekter
          </a>
          <a href="#kontakt" className="group text-[13px] font-medium text-accent">
            Ta kontakt{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
