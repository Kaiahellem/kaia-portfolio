# Kaia Hellem — portefølje

Porteføljeside bygget fra Figma-designene «Desktop – Portefølje» og «iPhone 17 – Portefølje», i Melle-paletten (blekk, papir, varm grå og bordeaux). Fonter: Anton (navnet), Instrument Serif kursiv, Gloock, Inter og JetBrains Mono.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000.

## Bilder

De to bildene er plassholdere. Bytt dem ut med ekte bilder med samme filnavn:

- `public/images/havn.jpg` — skjermbilde av HAVN Boligstyling (ca. 1600 × 1088)
- `public/images/kaia.jpg` — bildet fra Oslofjorden (ca. 1448 × 1236)

Endrer du størrelsen mye, oppdater `width` og `height` i `app/page.tsx`.

## Animasjoner

| Animasjon | Fil | Hva den gjør |
| --- | --- | --- |
| Loader | `components/Hero.tsx` | Teller til 100, glir opp, og navnet reiser seg bokstav for bokstav |
| Lokal tid | `components/LocalTime.tsx` | Klokke i Oslo-tid nederst på første skjerm (desktop) |
| Melle-kort | `components/MelleVisual.tsx` | Ordmerke og palett i kode, med reveal ved scroll |
| Tekst-reveal | `components/RevealText.tsx` | Deler tekst i linjer som glir opp når de scrolles inn (GSAP SplitText + ScrollTrigger) |
| Bilde | `components/HoverImage.tsx` | Bildet åpner seg og zoomer ut ved scroll, og en etikett følger musepekeren ved hover |
| Myk scroll | `components/SmoothScroll.tsx` | Lenis, koblet til GSAP sin ticker |

Alle animasjoner skrus av når brukeren har valgt redusert bevegelse (`prefers-reduced-motion`). Uten JavaScript vises siden som vanlig, uten loader.

Farger og fonter ligger som tokens i `app/globals.css`.

## Stack

Next.js, TypeScript, Tailwind CSS v4, GSAP, Lenis.
