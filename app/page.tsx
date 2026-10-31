import Hero from "@/components/Hero";
import HoverImage from "@/components/HoverImage";
import RevealText from "@/components/RevealText";
import MelleVisual from "@/components/MelleVisual";
import HavnMock from "@/components/HavnMock";
import Process from "@/components/Process";

const about = [
  "Jeg liker å utforske ideer og gjøre dem om til gjennomtenkte uttrykk og digitale opplevelser. Fra de første skissene og valg av farger og typografi, til design og utvikling av nettsider. Jeg trives best når jeg får kombinere det visuelle med det tekniske, og følge et prosjekt hele veien fra idé til ferdig produkt.",
  "Jeg er opptatt av å lage ting som både ser bra ut, fungerer godt og gir verdi for dem som bruker dem.",
  "Utenfor skjermen finner du meg helst på sjøen, gjerne med seilbåten min i Oslofjorden.",
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

      {/* Prosjekter */}
      <section id="prosjekter" className={`${wrap} scroll-mt-10 pb-20 md:pb-40`}>
        <p className="eyebrow mb-5 md:mb-10">Prosjekter</p>
        <article data-waypoint="project" data-label="HAVN" className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
          <HavnMock className="md:col-span-7" />
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
              Se nettsiden{" "}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
              <span className="sr-only"> (åpnes i ny fane)</span>
            </a>
          </div>
        </article>

        {/* Melle Studio: tekst til venstre, visuell identitet til høyre på desktop */}
        <article data-waypoint="project" data-label="MELLE" className="mt-16 grid gap-5 md:mt-32 md:grid-cols-12 md:items-end md:gap-10">
          <MelleVisual className="md:order-2 md:col-span-7" />
          <div className="md:order-1 md:col-span-5">
            <div className="flex justify-between text-xs text-muted">
              <span>Selvinitiert</span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping bg-current opacity-60 motion-reduce:hidden" />
                  <span className="relative size-2 bg-current" />
                </span>
                Pågår
              </span>
            </div>
            <RevealText as="h2" className="mt-5 font-serif text-[38px] leading-[1.05] md:text-6xl">
              Melle Studio
            </RevealText>
            <RevealText className="mt-[10px] text-[15px] leading-[1.5] md:text-base">
              Navn, posisjonering og visuell identitet for et designstudio.
            </RevealText>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-stone pt-[14px]">
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">Rolle</dt>
                <dd className="mt-1 text-[13px]">Strategi &amp; identitet</dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">Verktøy</dt>
                <dd className="mt-1 text-[13px]">Figma</dd>
              </div>
            </dl>
          </div>
        </article>
      </section>

      {/* Prosess */}
      <Process />

      {/* Om meg */}
      <section data-waypoint="section" id="om-meg" className={`${wrap} scroll-mt-10 pb-20 md:pb-40`}>
        <p className="eyebrow mb-5 md:mb-10">Om meg</p>
        <RevealText as="h2" className="max-w-4xl font-serif text-2xl leading-[1.25] md:text-5xl md:leading-[1.15]">
          Hei, jeg er Kaia! Frontendutvikler og designer i Oslo som liker å gjøre ideer om til digitale
          opplevelser.
        </RevealText>
        <div className="mt-5 grid gap-5 md:mt-16 md:grid-cols-12 md:gap-10">
          <figure className="md:col-span-5">
            <HoverImage
              src="/images/kaia.jpg"
              alt="Kaia i en båt på Oslofjorden"
              width={1200}
              height={1300}
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
      <section data-waypoint="end" id="kontakt" className={`${wrap} scroll-mt-10 pb-14`}>
        <p className="eyebrow mb-5 md:mb-10">Kontakt</p>
        <a
          href="mailto:kaia.hellem@gmail.com"
          className="font-serif text-[clamp(1.875rem,6.4vw,5rem)] leading-[1.1] underline decoration-1 underline-offset-[0.12em] transition-colors hover:opacity-70"
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

      <footer className={`${wrap} pb-10 pt-10 font-mono text-[11px] uppercase text-muted md:pt-16`}>
        <div className="max-w-sm">
          <p className="border-b border-ink pb-2 text-[13px] text-ink">Key</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-full border border-ink" /> Prosjekt
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 border-t border-dashed border-ink" /> Kurs
            </li>
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-ink" /> Kaia
            </li>
            <li className="flex items-center gap-2">
              <span className="relative size-3 rounded-full border border-ink">
                <span className="absolute inset-[3px] rounded-full bg-ink" />
              </span>{" "}
              Mål
            </li>
          </ul>
        </div>
        <div className="mt-10 flex justify-between">
          <span>© 2026 Kaia Hellem</span>
          <span>59°54′N 10°45′E</span>
        </div>
      </footer>
    </main>
  );
}
