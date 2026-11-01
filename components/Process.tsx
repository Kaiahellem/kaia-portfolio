"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    label: "Forstå",
    title: "Forstå",
    sub: "behovet",
    text: "[FYLL INN: hvordan jeg startet HAVN, f.eks. møte med kunden og innholdsliste]",
  },
  {
    n: "02",
    label: "Design",
    title: "Utforske og",
    sub: "designe",
    text: "Jeg skisserer sider og komponenter i Figma, og bestemmer fargepalett og typografi før jeg skriver kode.",
  },
  {
    n: "03",
    label: "Utvikle",
    title: "Fra design",
    sub: "til kode",
    text: "Jeg bygger i Next.js, TypeScript og Sanity, og bruker Claude Code til implementering. Struktur, datamodell og designvalg eier jeg selv.",
  },
  {
    n: "04",
    label: "Forbedre",
    title: "Finpusse og",
    sub: "forbedre",
    text: "Semantisk HTML, tastaturnavigasjon og automatiske tilgjengelighetssjekker med axe i Playwright. Til slutt prøver jeg alt på en ekte mobil.",
  },
];

// Høyde per kort på desktop, som trappetrinn. Kortene stiger opp som vannstand mens seksjonen står fast.
const heights = ["100%", "90%", "80%", "70%"];

export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    // Desktop: seksjonen låses, kortene stiger én etter én i takt med scrollingen
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const inner = gsap.utils.toArray<HTMLElement>("[data-card-inner]");
      gsap.set(cards, { yPercent: 101 });
      // opacity, ikke autoAlpha: teksten må bli i tilgjengelighetstreet selv før kortet har steget opp
      gsap.set(inner, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      cards.forEach((card, i) => {
        tl.to(card, { yPercent: 0, ease: "power2.out", duration: 1 }, i * 0.55).to(
          inner[i],
          { opacity: 1, y: 0, duration: 0.5 },
          i * 0.55 + 0.6,
        );
      });
      tl.to({}, { duration: 0.4 });
    });

    // Mobil: kortene stiger inn hver for seg når de kommer til syne
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.from(card, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  // Brødteksten får samme høyde i alle kort på desktop, så overskriftene står på én linje
  useLayoutEffect(() => {
    const list = root.current?.querySelector("ol");
    if (!list) return;
    const texts = Array.from(list.querySelectorAll<HTMLElement>("[data-card-text]"));
    const desktop = window.matchMedia("(min-width: 768px)");

    const equalize = () => {
      texts.forEach((t) => (t.style.minHeight = ""));
      if (!desktop.matches) return;
      const max = Math.max(...texts.map((t) => t.offsetHeight));
      texts.forEach((t) => (t.style.minHeight = `${max}px`));
    };

    equalize();
    document.fonts?.ready.then(equalize);
    let width = list.clientWidth;
    const ro = new ResizeObserver(() => {
      if (list.clientWidth === width) return;
      width = list.clientWidth;
      equalize();
    });
    ro.observe(list);
    desktop.addEventListener("change", equalize);
    return () => {
      ro.disconnect();
      desktop.removeEventListener("change", equalize);
    };
  }, []);

  return (
    <div ref={root} data-waypoint="section" id="prosess" className="scroll-mt-10 md:pb-24">
      <div ref={pin} className="mx-auto flex max-w-6xl flex-col px-5 pb-20 md:h-svh md:px-10 md:pb-10 md:pt-16">
        <p className="eyebrow mb-5 md:mb-8">Prosess</p>
        <h2 className="max-w-3xl font-serif text-[27px] leading-[1.18] md:text-[52px] md:leading-[1.1]">
          Fra idé til ferdig løsning.
        </h2>

        <ol className="mt-8 grid gap-4 md:mt-auto md:h-[68%] md:grid-cols-4 md:items-end md:overflow-hidden md:pt-10">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-card
              className="relative flex min-h-56 flex-col justify-between rounded-md bg-ink p-5 text-paper md:h-[var(--h)] md:min-h-fit"
              style={{ "--h": heights[i] } as React.CSSProperties}
            >
              {/* Toppen: stiplet vannlinje og nummer, som på en tidevannsmåler */}
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span>{s.n}</span>
                <span className="uppercase tracking-[0.08em]">{s.label}</span>
                <span className="flex-1 border-t border-dashed border-paper/50" />
                <span aria-hidden>▲</span>
              </div>
              {/* Skala langs venstre kant */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-5 left-0 top-12 w-2 opacity-40"
                style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 14px)",
                }}
              />

              <div data-card-inner className="mt-10">
                <h3 className="text-[26px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[clamp(1.5rem,2.2vw,2rem)]">
                  {s.title}{" "}
                  {/* Mellomrommet gjør at skjermlesere ikke leser «Forståbehovet» */}
                  <span className="block font-italic text-[1.1em] italic font-normal tracking-[-0.02em]">{s.sub}</span>
                </h3>
                <p data-card-text className="mt-3 text-sm leading-[1.5]">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
