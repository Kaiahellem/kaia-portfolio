"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Marker = { x: number; y: number; kind: "project" | "end"; label?: string };
type Course = { w: number; h: number; d: string; markers: Marker[] };

// Kurslinjen: en stiplet bane som går nedover siden, fra ingressen, gjennom hvert prosjekt og ned til kontakt.
// Linjen holder seg i margen inne i hver seksjon og krysser siden i luften mellom seksjonene.
// En prikk (Kaia) følger enden av linjen mens du scroller.
export default function CourseLine() {
  const svg = useRef<SVGSVGElement>(null);
  const maskPath = useRef<SVGPathElement>(null);
  const ball = useRef<SVGCircleElement>(null);
  const [course, setCourse] = useState<Course | null>(null);

  // 1) Mål opp siden og bygg banen
  useEffect(() => {
    const host = svg.current?.parentElement;
    if (!host) return;

    let frame = 0;
    const build = () => {
      const hr = host.getBoundingClientRect();
      const W = host.clientWidth;
      const H = host.scrollHeight;
      const md = W >= 768;
      const inner = (W - Math.min(W, 1152)) / 2 + (md ? 40 : 20);
      const xs = [Math.max(10, inner / 2), W - Math.max(10, inner / 2)];
      const rel = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - hr.top, bottom: r.bottom - hr.top };
      };

      const start = host.querySelector("[data-waypoint-start]");
      const stops = Array.from(host.querySelectorAll<HTMLElement>("[data-waypoint]"));
      if (!start || !stops.length) return;

      const s = rel(start);
      let side = 0;
      let x = xs[side];
      let y = s.top + (s.bottom - s.top) / 2;
      let d = `M ${x} ${y}`;
      const markers: Marker[] = [];

      stops.forEach((el) => {
        side = 1 - side;
        const r = rel(el);
        const nx = xs[side];
        const ny = r.top;
        const k = (ny - y) * 0.55;
        d += ` C ${x} ${y + k} ${nx} ${ny - k} ${nx} ${ny}`;
        x = nx;
        y = ny;

        const kind = el.dataset.waypoint;
        if (kind === "end") {
          markers.push({ x, y: y + 6, kind: "end" });
          d += ` L ${x} ${y + 6}`;
          y += 6;
          return;
        }
        if (kind === "project") markers.push({ x, y, kind: "project", label: el.dataset.label });
        // Følg margen ned til bunnen av innholdet i seksjonen
        const last = el.lastElementChild ?? el;
        const bottom = rel(last).bottom;
        d += ` L ${x} ${bottom}`;
        y = bottom;
      });

      setCourse({ w: W, h: H, d, markers });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(host);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  // 2) Tegn linjen i takt med scrollingen
  useEffect(() => {
    const path = maskPath.current;
    const host = svg.current?.parentElement;
    if (!course || !path || !host) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    // Oppslagstabell fra høyde på siden til lengde langs banen
    const table: { l: number; y: number }[] = [];
    for (let l = 0; l <= len; l += 6) table.push({ l, y: path.getPointAtLength(l).y });
    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = table.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (table[mid].y < y) lo = mid + 1;
        else hi = mid;
      }
      return table[lo].l;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      path.style.strokeDashoffset = "0";
      ball.current?.setAttribute("visibility", "hidden");
      return;
    }

    let current = 0;
    const tick = () => {
      const hostTop = host.getBoundingClientRect().top;
      const target = lengthAt(-hostTop + window.innerHeight * 0.62);
      current += (target - current) * 0.14;
      path.style.strokeDashoffset = `${len - current}`;
      const p = path.getPointAtLength(current);
      ball.current?.setAttribute("cx", `${p.x}`);
      ball.current?.setAttribute("cy", `${p.y}`);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [course]);

  return (
    <svg
      ref={svg}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 hidden md:block"
      width={course?.w ?? 0}
      height={course?.h ?? 0}
      viewBox={course ? `0 0 ${course.w} ${course.h}` : undefined}
      fill="none"
    >
      {course && (
        <>
          <defs>
            <mask id="course-drawn" maskUnits="userSpaceOnUse">
              <path ref={maskPath} d={course.d} stroke="white" strokeWidth={8} style={{ strokeDashoffset: 99999 }} />
            </mask>
          </defs>

          {/* Planlagt kurs, svakt */}
          <path d={course.d} stroke="white" strokeOpacity={0.18} strokeWidth={1} strokeDasharray="6 6" />
          {/* Tilbakelagt kurs */}
          <path d={course.d} stroke="white" strokeWidth={1.25} strokeDasharray="6 6" mask="url(#course-drawn)" />

          {course.markers.map((m) =>
            m.kind === "project" ? (
              <g key={`${m.x}-${m.y}`}>
                <circle cx={m.x} cy={m.y} r={7} stroke="white" strokeWidth={1.25} fill="var(--color-paper)" />
                {m.label && (
                  <text
                    x={m.x}
                    y={m.y - 16}
                    textAnchor="middle"
                    fill="white"
                    fontFamily="var(--font-mono)"
                    fontSize={10}
                    letterSpacing="0.08em"
                  >
                    {m.label}
                  </text>
                )}
              </g>
            ) : (
              <g key="end">
                <circle cx={m.x} cy={m.y} r={9} stroke="white" strokeWidth={1.25} fill="var(--color-paper)" />
                <circle cx={m.x} cy={m.y} r={3} fill="white" />
              </g>
            ),
          )}

          <circle ref={ball} r={5} fill="white" cx={-20} cy={-20} />
        </>
      )}
    </svg>
  );
}
