import RevealText from "@/components/RevealText";

const items = [
  {
    role: "IT-konsulent",
    org: "Capgemini (Sogeti)",
    years: "2024–nå",
    text: "Oppdrag for Utdanningsdirektoratet på nasjonale eksamens- og prøvesystemer. Jobbet tett med utviklere og produkteiere i et smidig team; feilsøking i utviklerverktøy, SQL og API-er (Postman).",
  },
  {
    role: "IT-support",
    org: "Høyskolen Kristiania",
    years: "2021–2023",
    text: "Feilsøking og vedlikehold av nettsider og systemer, og kursholder i digitale verktøy.",
  },
  {
    role: "BSc Frontend- og mobilutvikling",
    org: "Høyskolen Kristiania",
    years: "2020–2023",
  },
];

// Erfaring som punkter langs en linje, med samme markør som «Prosjekt» i tegnforklaringen.
export default function Experience({ className = "" }: { className?: string }) {
  return (
    <section data-waypoint="section" id="erfaring" aria-labelledby="erfaring-tittel" className={`scroll-mt-10 ${className}`}>
      <h2 id="erfaring-tittel" className="eyebrow mb-5 md:mb-10">
        Erfaring
      </h2>
      <ol className="relative border-l border-dashed border-stone pl-6 md:pl-10">
        {items.map((it) => (
          <li key={it.role + it.years} className="relative pb-8 last:pb-0 md:grid md:grid-cols-12 md:gap-10 md:pb-12">
            {/* Markør på linjen */}
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+6.5px)] top-1.5 size-3 rounded-full border border-ink bg-paper md:-left-[calc(2.5rem+6.5px)]"
            />
            <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted md:col-span-3 md:pt-1">{it.years}</p>
            <div className="mt-1 md:col-span-9 md:mt-0">
              <h3 className="text-[19px] font-medium leading-snug md:text-[22px]">
                {it.role}
                <span className="text-muted"> · {it.org}</span>
              </h3>
              {it.text && (
                <RevealText className="mt-2 max-w-2xl text-[15px] leading-[1.55] md:text-[17px]">{it.text}</RevealText>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
