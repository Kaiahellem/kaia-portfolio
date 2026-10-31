"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import LocalTime from "@/components/LocalTime";

gsap.registerPlugin(SplitText);

const nav = [
  { label: "Prosjekter", href: "#prosjekter" },
  { label: "Prosess", href: "#prosess" },
  { label: "Om meg", href: "#om-meg" },
  { label: "Kontakt", href: "#kontakt" },
];

// Første skjerm: stort navn, undertekst og meny, ingress, lokal tid og status.
// Animasjon: loader teller til 100, glir opp, og navnet reiser seg bokstav for bokstav.
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    let name: SplitText | undefined;
    let lines: SplitText | undefined;
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      name = SplitText.create("[data-name]", { type: "chars", mask: "chars" });
      lines = SplitText.create("[data-intro] > span", { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(name.chars, { yPercent: 105 });
      gsap.set(lines.lines, { yPercent: 105 });
      gsap.set("[data-fade]", { autoAlpha: 0, y: 12 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(counter, {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(loader.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.15")
        .to(name.chars, { yPercent: 0, duration: 1.3, stagger: 0.045 }, "-=0.5")
        .to("[data-fade]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, "-=0.9")
        .to(lines.lines, { yPercent: 0, duration: 1.2, stagger: 0.1 }, "-=0.8")
        .set(loader.current, { display: "none" });
    }, root);

    return () => {
      ctx.revert();
      name?.revert();
      lines?.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative flex flex-col md:min-h-svh">
      <div
        ref={loader}
        aria-hidden
        className="loader fixed inset-0 z-50 flex-col justify-between bg-accent p-4 text-paper md:p-7"
      >
        <span className="font-mono text-[13px] uppercase md:text-[15px]">Kaia Hellem · Oslo</span>
        <span ref={count} className="self-end font-display text-[34vw] leading-[0.8] tabular-nums md:text-[22vw]">
          000
        </span>
      </div>

      <header className="px-4 pt-4 text-accent md:px-7 md:pt-6">
        <h1
          data-name
          className="whitespace-nowrap font-display text-[calc(21.39vw-6.8px)] leading-[0.86] tracking-[-0.01em] md:text-[calc(21.39vw-12px)]"
        >
          KAIA HELLEM
        </h1>

        <div className="mt-4 flex flex-col gap-3 md:mt-5 xl:grid xl:grid-cols-2 xl:items-baseline xl:gap-0">
          <p data-fade className="text-[15px] md:text-[19px]">
            Frontendutvikler &amp; designer, Oslo
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <nav data-fade aria-label="Hovedmeny" className="flex gap-4 text-[15px] md:text-[19px]">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="whitespace-nowrap bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-[var(--ease-out-expo)] hover:bg-[length:100%_1px]"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              data-fade
              href="mailto:kaia.hellem@gmail.com"
              className="font-italic text-[17px] italic transition-opacity hover:opacity-70 md:text-[21px]"
            >
              kaia.hellem@gmail.com
            </a>
          </div>
        </div>
      </header>

      <section className="px-4 pb-20 pt-24 text-accent md:pb-40 md:pl-[50%] md:pr-7 md:pt-40">
        <p data-intro data-waypoint-start className="font-medium leading-[1.05]">
          <span className="block text-[36px] tracking-[-0.025em] md:text-[clamp(2.5rem,4.4vw,4rem)]">
            Jeg designer og bygger
          </span>
          <span className="block font-italic text-[40px] italic tracking-[-0.03em] md:text-[clamp(2.75rem,4.95vw,4.5rem)]">
            merkevare og nettsider.
          </span>
        </p>
      </section>

      <div
        data-fade
        className="absolute inset-x-7 bottom-5 hidden items-end justify-between font-mono text-[15px] uppercase leading-[1.4] text-accent md:flex"
      >
        <LocalTime />
        <p className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative size-2 bg-accent" />
          </span>
          Åpen for jobb
        </p>
      </div>
    </div>
  );
}
