"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
};

// Animasjon 2: teksten deles i linjer som glir opp når den kommer inn i bildet.
export default function RevealText({ as: Tag = "p", className, children, id }: Props) {
  const el = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!el.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(el.current!, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el.current, start: "top 88%", once: true },
          }),
      });
      return () => split.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <Tag ref={el} className={className} id={id}>
      {children}
    </Tag>
  );
}
