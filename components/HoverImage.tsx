"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
  cursorLabel?: string;
  sizes?: string;
  className?: string;
};

// Animasjon 3: bildet åpner seg når det scrolles inn, og en etikett følger musepekeren ved hover.
export default function HoverImage({
  src,
  alt,
  width,
  height,
  href,
  cursorLabel,
  sizes = "(min-width: 768px) 60vw, 100vw",
  className = "",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!wrap.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        wrap.current,
        { clipPath: "inset(12% 6% 12% 6% round 6px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top 95%", end: "top 45%", scrub: true },
        },
      );
      gsap.fromTo(
        img.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      if (!label.current) return;
      const el = wrap.current!;
      const xTo = gsap.quickTo(label.current, "x", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(label.current, "y", { duration: 0.45, ease: "power3" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const enter = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.set(label.current, { x: e.clientX - r.left, y: e.clientY - r.top });
        gsap.to(label.current, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" });
      };
      const leave = () => gsap.to(label.current, { scale: 0.4, autoAlpha: 0, duration: 0.25 });

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  }, []);

  const inner = (
    <div ref={wrap} className={`group relative overflow-hidden rounded-md bg-stone ${href ? "" : className}`}>
      <div ref={img} className="will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </div>
      {cursorLabel && (
        <span
          ref={label}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-paper opacity-0"
        >
          {cursorLabel}
        </span>
      )}
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={cursorLabel ? `${cursorLabel}: ${alt}` : alt}
      className={`block cursor-none max-md:cursor-pointer ${className}`}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}
