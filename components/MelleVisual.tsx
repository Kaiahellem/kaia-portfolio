"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MelleIcon, MelleWordmark } from "@/components/MelleLogo";

gsap.registerPlugin(ScrollTrigger);

// Fargene fra merkevarearket i Figma («Melle – nettside» → Merkevare)
const c = { blekk: "#1A1A1A", papir: "#F4F1EC", stein: "#CFC8BD", dempet: "#67615A", bordeaux: "#6B1E2A" };

const palette = [
  { name: "Blekk", hex: c.blekk, use: "Tekst og logo", text: c.papir },
  { name: "Papir", hex: c.papir, use: "Bakgrunn", text: c.blekk },
  { name: "Stein", hex: c.stein, use: "Flater og linjer", text: c.blekk },
  { name: "Dempet", hex: c.dempet, use: "Sekundærtekst", text: c.papir },
  { name: "Bordeaux", hex: c.bordeaux, use: "Aksent", text: c.papir },
];

const INTERVAL = 3500;

function LogoView() {
  const tile = "flex items-center justify-center rounded-[1.6cqw]";
  return (
    <div className="grid h-full grid-cols-[1.7fr_1fr] grid-rows-2 gap-[2.4cqw] p-[4cqw]" style={{ background: c.papir }}>
      <div className={tile} style={{ background: "#fff", color: c.blekk }}>
        <MelleWordmark className="w-[62%]" />
      </div>
      <div className={tile} style={{ background: c.bordeaux, color: c.papir }}>
        <MelleIcon className="w-[34%]" />
      </div>
      <div className={tile} style={{ background: c.blekk, color: c.papir }}>
        <MelleWordmark className="w-[62%]" />
      </div>
      <div className={tile} style={{ background: c.stein, color: c.blekk }}>
        <MelleIcon className="w-[34%]" />
      </div>
    </div>
  );
}

function ColorView() {
  return (
    <ul className="grid h-full grid-cols-5">
      {palette.map((p) => (
        <li
          key={p.hex}
          className="flex flex-col justify-end gap-[0.6cqw] p-[2.4cqw]"
          style={{ background: p.hex, color: p.text }}
        >
          <span className="font-serif text-[3.4cqw] leading-none">{p.name}</span>
          <span className="text-[max(9px,1.75cqw)] leading-tight opacity-75">
            {p.hex}
            <span className="hidden @md:inline">
              <br />
              {p.use}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function TypeView() {
  const label = "w-[22%] shrink-0 text-[max(8px,1.6cqw)] uppercase tracking-[0.12em] opacity-60";
  return (
    <div className="flex h-full flex-col justify-center gap-[2.2cqw] px-[6cqw]" style={{ background: c.papir, color: c.blekk }}>
      {[
        { size: "9.5cqw", spec: "Gloock 80", text: "Melle Studio" },
        { size: "4.8cqw", spec: "Gloock 44", text: "Visuell profil og nettside" },
        { size: "3.2cqw", spec: "Gloock 24", text: "Visuell profil og nettside" },
      ].map((t) => (
        <div key={t.spec} className="flex items-baseline gap-[2cqw]">
          <span className={label}>{t.spec}</span>
          <span className="truncate font-serif leading-[1.05]" style={{ fontSize: t.size }}>
            {t.text}
          </span>
        </div>
      ))}
      <div className="flex items-baseline gap-[2cqw] border-t pt-[2.2cqw]" style={{ borderColor: c.stein }}>
        <span className={label}>Inter 16</span>
        <span className="text-[max(10px,2.3cqw)] leading-snug">
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj
          <br />
          0123456789 · Æ Ø Å
        </span>
      </div>
    </div>
  );
}

const views: { key: string; label: string; describe: string; render: () => ReactNode }[] = [
  {
    key: "logo",
    label: "Logo",
    describe: "Melle-logoen i fire varianter: ordmerke på papir og på blekk, og m-ikonet på bordeaux og på stein.",
    render: () => <LogoView />,
  },
  {
    key: "farger",
    label: "Farger",
    describe: "Fargepaletten: blekk, papir, stein, dempet og bordeaux, med bruksområde for hver.",
    render: () => <ColorView />,
  },
  {
    key: "typografi",
    label: "Typografi",
    describe: "Typografien: Gloock til overskrifter i flere størrelser, og Inter til brødtekst.",
    render: () => <TypeView />,
  },
];

// Melle-identiteten bygget i kode: logo, farger og typografi, som veksler mens kortet er synlig.
export default function MelleVisual({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const id = useId();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false); // hover eller fokus
  const [stopped, setStopped] = useState(false); // brukeren har valgt selv
  const [reduced, setReduced] = useState(false);

  const playing = inView && !held && !stopped && !reduced;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    if (card.current) io.observe(card.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  // Kortet åpner seg når det scrolles inn
  useLayoutEffect(() => {
    if (!card.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        card.current,
        { clipPath: "inset(12% 6% 12% 6% round 6px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: card.current, start: "top 80%", once: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  const next = () => setActive((i) => (i + 1) % views.length);

  const choose = (i: number) => {
    setActive(i);
    setStopped(true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const i = (active + dir + views.length) % views.length;
    choose(i);
    root.current?.querySelector<HTMLButtonElement>(`#${CSS.escape(`${id}-tab-${i}`)}`)?.focus();
  };

  return (
    <div
      ref={root}
      className={className}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
    >
      <div
        ref={card}
        className="relative aspect-[609/414] overflow-hidden rounded-md @container"
        style={{ background: c.papir }}
      >
        {views.map((v, i) => (
          <div
            key={v.key}
            id={`${id}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${
              i === active ? "opacity-100" : "pointer-events-none scale-[1.02] opacity-0"
            }`}
          >
            <span className="sr-only">{v.describe}</span>
            <div aria-hidden className="h-full">
              {v.render()}
            </div>
          </div>
        ))}
      </div>

      <div role="tablist" aria-label="Melle visuell identitet" className="mt-3 flex gap-5" onKeyDown={onKey}>
        {views.map((v, i) => (
          <button
            key={v.key}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => choose(i)}
            className={`relative pb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity ${
              i === active ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            {v.label}
            {/* Linjen under fanen fylles opp til neste visning */}
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
            {i === active && (
              <span
                key={`${active}-${stopped}`}
                aria-hidden
                onAnimationEnd={next}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-current"
                style={
                  playing || held
                    ? {
                        animation: `melle-progress ${INTERVAL}ms linear forwards`,
                        animationPlayState: playing ? "running" : "paused",
                      }
                    : undefined
                }
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
