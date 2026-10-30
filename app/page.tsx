import Hero from "@/components/Hero";
import HoverImage from "@/components/HoverImage";
import RevealText from "@/components/RevealText";

const menu = [
  { label: "Prosjekter", href: "#prosjekter" },
  { label: "Om meg", href: "#om-meg" },
  { label: "Kontakt", href: "#kontakt" },
];

const about = [
  "Jeg har bakgrunn som IT-konsulent innen kvalitetssikring og testing av store, offentlige systemer. Nå designer og utvikler jeg selv, blant annet i Next.js, TypeScript og Sanity.",
  "Jeg trives best i skjæringspunktet mellom design og kode, og liker å følge et prosjekt fra idé til ferdig produkt. Nå ser jeg etter et frontendteam hvor jeg kan lære, bidra og bygge ting som faktisk blir brukt.",
  "Når jeg ikke jobber, er jeg som regel på sjøen. Jeg har en seilbåt i Oslo og drømmer om å seile jorda rundt.",
];

const links = [
  { label: "GitHub", text: "github.com/Kaiahellem", href: "https://github.com/Kaiahellem" },
  { label: "LinkedIn", text: "linkedin.com/in/kaiahellem", href: "https://www.linkedin.com/in/kaiahellem/" },
];

const wrap = "mx-auto max-w-6xl px-5 md:px-10";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Meny */}
      <nav aria-label="Seksjoner" className={`${wrap} pb-[72px] md:pb-32`}>
        <ul>
          {menu.map((m) => (
            <li key={m.href} className="border-t border-stone last:border-b">
              <a href={m.href} className="group flex items-center gap-[14px] py-[18px] md:py-7">
                <span className="flex-1 font-serif text-[30px] leading-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-6xl">
                  {m.label}
                </span>
                <span className="text-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Prosjekter */}
      <section id="prosjekter" className={`${wrap} scroll-mt-10 pb-20 md:pb-40`}>
        <p className="eyebrow mb-5 md:mb-10">Prosjekter</p>
        <article className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
          <HoverImage
            src="/images/havn.jpg"
            alt="Forsiden til HAVN Boligstyling"
            width={1600}
            height={1088}
            href="https://styling.havnbolig.no"
            cursorLabel="Se nettsiden"
            className="md:col-span-7"
          />
          <div className="md:col-span-5">
            <div className="flex justify-between text-xs text-muted">
              <span>Kundeprosjekt</span>
              <span>2026</span>
            </div>
            <RevealText as="h2" className="mt-5 font-serif text-[38px] leading-[1.05] md:text-6xl">
              HAVN Boligstyling
            </RevealText>
            <RevealText className="mt-[10px] text-[15px] leading-[1.5] md:text-base">
              Nettside for boligstylist. Design, utvikling og CMS kunden oppdaterer selv.
            </RevealText>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-stone pt-[14px]">
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">Rolle</dt>
                <dd className="mt-1 text-[13px]">Design &amp; utvikling</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">Verktøy</dt>
                <dd className="mt-1 text-[13px]">Figma, Next.js, Sanity</dd>
              </div>
            </dl>
            <a
              href="https://styling.havnbolig.no"
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-block text-[13px] font-medium text-accent underline underline-offset-4"
            >
              Se case{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </article>
      </section>

      {/* Om meg */}
      <section id="om-meg" className={`${wrap} scroll-mt-10 pb-20 md:pb-40`}>
        <p className="eyebrow mb-5 md:mb-10">Om meg</p>
        <RevealText as="h2" className="max-w-4xl font-serif text-2xl leading-[1.25] md:text-5xl md:leading-[1.15]">
          Jeg er Kaia, frontendutvikler og designer i Oslo, med bachelor i frontend- og mobilutvikling fra
          Høyskolen Kristiania.
        </RevealText>
        <div className="mt-5 grid gap-5 md:mt-16 md:grid-cols-12 md:gap-10">
          <figure className="md:col-span-5">
            <HoverImage
              src="/images/kaia.jpg"
              alt="Kaia i en båt på Oslofjorden"
              width={1448}
              height={1236}
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <figcaption className="mt-2 text-[11px] text-muted">Kaia, et sted på Oslofjorden</figcaption>
          </figure>
          <div className="space-y-3 text-[15px] leading-[1.55] md:col-span-6 md:col-start-7 md:text-lg">
            {about.map((p) => (
              <RevealText key={p.slice(0, 20)}>{p}</RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className={`${wrap} scroll-mt-10 pb-14`}>
        <p className="eyebrow mb-5 md:mb-10">Kontakt</p>
        <a
          href="mailto:kaia.hellem@gmail.com"
          className="font-serif text-[clamp(1.875rem,6.4vw,5rem)] leading-[1.1] underline decoration-1 underline-offset-[0.12em] transition-colors hover:text-accent"
        >
          kaia.hellem@gmail.com
        </a>
        <ul className="mt-7 md:mt-14">
          {links.map((l) => (
            <li key={l.label} className="border-t border-stone last:border-b">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 py-4 md:py-6"
              >
                <span className="flex-1 text-sm font-medium md:text-base">{l.label}</span>
                <span className="text-[13px] text-muted transition-colors group-hover:text-ink">{l.text}</span>
                <span className="text-sm text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className={`${wrap} flex justify-between pb-10 pt-6 text-[11px] text-muted`}>
        <span>© 2026 Kaia Hellem</span>
        <span>Oslo</span>
      </footer>
    </main>
  );
}
