// Innholdet til case-sidene. Tekst i formatet [FYLL INN: …] mangler og må fylles ut før publisering.

export type Decision = {
  title: string;
  choice: string;
  alternative: string;
  why: string;
};

export type Case = {
  slug: "havn" | "portal";
  title: string;
  kicker: string;
  lede: string;
  start: string[];
  role: string[];
  ai?: { owned: string[]; implemented: string };
  decisions: Decision[];
  result: string;
  differently: string;
  demo?: string;
  tools: string;
  links: { label: string; href: string }[];
};

export const cases: Case[] = [
  {
    slug: "havn",
    title: "HAVN Boligstyling",
    kicker: "Kundeprosjekt · 2026",
    lede: "Nettside for en boligstylist, som viser frem prosjektene og gjør det enkelt å bestille befaring.",
    start: [
      "En boligstylist trengte en nettside som viser frem prosjektene og gjør det enkelt for nye kunder å bestille befaring.",
      "[FYLL INN: hvordan kunden presenterte seg før, og hva som ikke fungerte]",
    ],
    role: [
      "Jeg designet siden i Figma og bygget den i Next.js med TypeScript og Tailwind. Innholdet ligger i Sanity, kontaktskjemaet går via Formspree, og siden kjører på Vercel.",
      "[FYLL INN: om og hvordan du brukte AI-verktøy i HAVN]",
    ],
    decisions: [
      {
        title: "Sanity som CMS",
        choice: "Sanity, med egne innholdstyper for prosjekter, tjenester og Om-siden.",
        alternative: "WordPress.",
        why: "Kunden skal bare redigere noen få innholdstyper.",
      },
      {
        title: "Kontaktskjema uten egen backend",
        choice: "Formspree tar imot henvendelsene fra skjemaet.",
        alternative: "En egen backend for skjemaet.",
        why: "Volumet av henvendelser er lavt.",
      },
      {
        title: "[FYLL INN: tredje beslutning]",
        choice: "[FYLL INN: valget, f.eks. bilder via Sanity sitt CDN fremfor bilder i koden]",
        alternative: "[FYLL INN: alternativet]",
        why: "[FYLL INN: hvorfor]",
      },
    ],
    result: "[FYLL INN: resultat, f.eks. tilbakemelding fra kunden eller hvor ofte innholdet oppdateres]",
    differently: "[FYLL INN: hva du ville gjort annerledes]",
    tools: "Figma, Next.js, TypeScript, Tailwind, Sanity, Formspree, Vercel",
    links: [
      { label: "Se nettsiden", href: "https://styling.havnbolig.no" },
      { label: "Se koden", href: "https://github.com/Kaiahellem/havn-boligstyling" },
    ],
  },
  {
    slug: "portal",
    title: "Portal",
    kicker: "Selvinitiert · 2026",
    lede: "Kundeportal for webprosjekter: ett sted der kunden ser hvor prosjektet står, hva de må gjøre nå, og alle dokumenter, filer og godkjenninger.",
    start: [
      "Rundt et webprosjekt havner ting fort spredt: tilbudet i én e-post, avtalen i en annen, innhold på WeTransfer og tilbakemeldinger på SMS. Ingen har ett sted å se hvor ting står og hva som skjer videre.",
      "Portal samler alt på én side per kunde, med en egen adminside for den som leverer prosjektet.",
    ],
    role: [
      "Jeg skrev briefen, designet appen og har ansvaret for løsningen. Den er bygget i Next.js og TypeScript med Supabase (Postgres, innlogging og fillagring), og testet med Vitest og Playwright.",
    ],
    ai: {
      owned: [
        "Briefen: problemet, flytene og kravene til sikkerhet og tilgjengelighet",
        "Datamodellen og tilgangsreglene",
        "Verifisering av testene",
      ],
      implemented:
        "Claude Code implementerte [FYLL INN: hvilke deler, f.eks. komponenter, migreringer og tester], ut fra briefen og en plan jeg godkjente før koden ble skrevet.",
    },
    decisions: [
      {
        title: "Innlogging uten passord",
        choice:
          "Én e-post med både en lenke og en sekssifret kode. Admin må i tillegg bruke en autentiseringsapp (TOTP), og bare inviterte brukere kan logge inn.",
        alternative: "Passord, eller en vanlig magisk lenke.",
        why: "En vanlig lenke åpnes ofte i e-postappens innebygde nettleser, og skannere som Outlook Safe Links kan bruke opp engangslenken før kunden rekker det. Koden virker på hvilken som helst enhet.",
      },
      {
        title: "Tilgangsstyring i databasen",
        choice:
          "Row Level Security på hver tabell, med egne tester som viser at en kunde aldri ser en annen kundes data, interne kommentarer eller skjulte steg.",
        alternative: "Tilgangssjekk bare i applikasjonskoden.",
        why: "Alt utenom noen få bakgrunnsjobber kjører som den innloggede brukeren, så reglene gjelder uansett hvor spørringen kommer fra. Serverkoden sjekker rollen i tillegg, så det er to lag.",
      },
      {
        title: "Ende-til-ende-tester med tilgjengelighetssjekk",
        choice:
          "Playwright-tester av innlogging, godkjenninger, opplasting, endringsønsker og kundeisolasjon, med axe-sjekk mot WCAG 2.1 AA på desktop og mobil.",
        alternative: "Bare manuell testing.",
        why: "Briefen krever WCAG 2.1 AA. [FYLL INN: hvorfor automatiske tester i tillegg til manuell sjekk med NVDA og JAWS]",
      },
    ],
    result: "[FYLL INN: resultat, f.eks. om Portal er i bruk og hva det har endret]",
    differently: "[FYLL INN: hva du ville gjort annerledes]",
    demo: "[FYLL INN: video/demo-lenke]",
    tools: "Next.js, TypeScript, Supabase, Vitest, Playwright",
    links: [{ label: "Se koden", href: "https://github.com/Kaiahellem/portal" }],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
