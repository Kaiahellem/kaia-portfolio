import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HavnMock from "@/components/HavnMock";
import PortalMock from "@/components/PortalMock";
import { cases, getCase } from "@/content/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  const title = `${c.title} – case | Kaia Hellem`;
  return { title, description: c.lede, openGraph: { title, description: c.lede } };
}

const wrap = "mx-auto max-w-6xl px-5 md:px-10";

// Plassholdere ([FYLL INN: …]) får en stiplet ramme, så de er lette å finne før publisering.
function Text({ children, className = "" }: { children: string; className?: string }) {
  const parts = children.split(/(\[FYLL INN[^\]]*\])/g);
  return (
    <p className={className}>
      {parts.map((p, i) =>
        p.startsWith("[FYLL INN") ? (
          <mark key={i} className="rounded-sm bg-transparent px-1 text-ink outline outline-1 outline-dashed outline-current">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </p>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-waypoint="section" className="grid gap-4 border-t border-stone pt-6 md:grid-cols-12 md:gap-10 md:pt-8">
      <h2 className="eyebrow md:col-span-3 md:pt-1.5">{title}</h2>
      <div className="space-y-4 text-[16px] leading-[1.6] md:col-span-9 md:text-[18px]">{children}</div>
    </section>
  );
}

const linkClass = "group inline-block text-[13px] font-medium text-accent underline underline-offset-4";
const Arrow = ({ d = "↗" }: { d?: string }) => (
  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
    {d}
  </span>
);

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const next = cases[(cases.indexOf(c) + 1) % cases.length];

  return (
    <main className="pb-16">
      <header className={`${wrap} flex items-baseline justify-between pt-6 md:pt-8`}>
        <Link href="/" className="font-display text-[28px] leading-none tracking-[-0.01em] md:text-[34px]">
          KAIA HELLEM
        </Link>
        <Link href="/#prosjekter" className="text-[14px] underline-offset-4 hover:underline md:text-[16px]">
          ← Alle prosjekter
        </Link>
      </header>

      <div className={`${wrap} pt-16 md:pt-28`}>
        <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{c.kicker}</p>
        <h1 className="mt-4 font-serif text-[48px] leading-[1] md:text-[96px]">{c.title}</h1>
        <p data-waypoint-start className="mt-6 max-w-3xl text-[19px] leading-[1.45] md:mt-8 md:text-[24px]">
          {c.lede}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {c.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={linkClass}>
              {l.label} <Arrow />
              <span className="sr-only"> (åpnes i ny fane)</span>
            </a>
          ))}
        </div>
      </div>

      <div className={`${wrap} mt-14 md:mt-20`}>
        {c.slug === "havn" ? <HavnMock className="md:w-[80%]" /> : <PortalMock className="md:w-[80%]" />}
      </div>

      <div className={`${wrap} mt-16 space-y-12 md:mt-24 md:space-y-16`}>
        <Section title="Utgangspunkt">
          {c.start.map((t) => (
            <Text key={t}>{t}</Text>
          ))}
        </Section>

        <Section title="Min rolle">
          {c.role.map((t) => (
            <Text key={t}>{t}</Text>
          ))}
          {c.ai && (
            <div className="rounded-md border border-stone p-5 md:p-6">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">Bruk av AI</h3>
              <p className="mt-3">Det jeg eide selv:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {c.ai.owned.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <Text className="mt-3">{c.ai.implemented}</Text>
            </div>
          )}
          <p className="text-[14px] text-muted md:text-[15px]">Verktøy: {c.tools}</p>
        </Section>

        <Section title="Tre beslutninger">
          <ol className="space-y-8">
            {c.decisions.map((d, i) => (
              <li key={d.title}>
                <h3 className="font-serif text-[24px] leading-tight md:text-[30px]">
                  <span aria-hidden className="mr-3 font-mono text-[13px] tracking-[0.06em] text-muted">
                    0{i + 1}
                  </span>
                  {d.title}
                </h3>
                <dl className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-[8rem_1fr]">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:pt-1">Valget</dt>
                  <dd>
                    <Text>{d.choice}</Text>
                  </dd>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:pt-1">Alternativet</dt>
                  <dd>
                    <Text>{d.alternative}</Text>
                  </dd>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:pt-1">Hvorfor</dt>
                  <dd>
                    <Text>{d.why}</Text>
                  </dd>
                </dl>
              </li>
            ))}
          </ol>
        </Section>

        {c.demo && (
          <Section title="Demo">
            <Text>{c.demo}</Text>
          </Section>
        )}

        <Section title="Resultat">
          <Text>{c.result}</Text>
        </Section>

        <Section title="Hva jeg ville gjort annerledes">
          <Text>{c.differently}</Text>
        </Section>
      </div>

      <nav aria-label="Flere caser" className={`${wrap} mt-20 flex flex-col gap-6 border-t border-stone pt-8 md:mt-28 md:flex-row md:items-end md:justify-between`}>
        <Link href={`/prosjekter/${next.slug}`} className="group block">
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted">Neste case</span>
          <span data-waypoint="end" className="mt-2 block font-serif text-[36px] leading-none md:text-[56px]">
            {next.title} <Arrow d="→" />
          </span>
        </Link>
        <Link href="/" className="text-[14px] underline underline-offset-4 md:text-[16px]">
          Til forsiden
        </Link>
      </nav>
    </main>
  );
}
