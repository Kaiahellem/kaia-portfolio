# Kaia Hellem — portefølje

Porteføljeside bygget fra Figma-designene «Desktop – Portefølje» og «iPhone 17 – Portefølje», i sjøkart-stil: hvit strek på blå (#1A3391) med et svakt rutenett. Melle-kortet beholder Melle sin bordeaux. Fonter: Anton (navnet), Instrument Serif kursiv, Gloock, Inter og JetBrains Mono.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000.

## Bilder

- `public/images/havn-desktop.webp` — hele forsiden til HAVN i 1440 px bredde, vist rullende i skjermtegningen
- `public/images/havn-mobil.webp` — første skjerm av mobilversjonen, vist i telefontegningen
- `public/images/kaia.jpg` — bildet fra Oslofjorden (1200 × 1300), vist i svart-hvitt med farge ved hover

## CV

`public/cv/Kaia-Hellem-CV.pdf` er lenket fra Kontakt-seksjonen. Kilden ligger i `cv/cv.html`. For å lage ny PDF: åpne filen i Chrome, trykk Cmd + P, velg «Lagre som PDF», marger «Ingen» og huk av «Bakgrunnsgrafikk».

## Animasjoner

| Animasjon | Fil | Hva den gjør |
| --- | --- | --- |
| Loader | `components/Hero.tsx` | Teller til 100, glir opp, og navnet reiser seg bokstav for bokstav |
| Kurslinje | `components/CourseLine.tsx` | Stiplet kurs som tegnes nedover siden mens man scroller, med veipunkter ved prosjektene (nettbrett og desktop) |
| Lokal tid | `components/LocalTime.tsx` | Klokke i Oslo-tid nederst på første skjerm (desktop) |
| Melle-kort | `components/MelleVisual.tsx` | Ordmerke og palett i kode, med reveal ved scroll |
| Tekst-reveal | `components/RevealText.tsx` | Deler tekst i linjer som glir opp når de scrolles inn (GSAP SplitText + ScrollTrigger) |
| HAVN-skjerm | `components/HavnMock.tsx` | Skjerm og mobil tegnes med strek, nettsiden ruller inne i skjermen mens du scroller |
| Prosess | `components/Process.tsx` | Seksjonen låses på desktop, og fire hvite kort stiger opp som vannstand mens du scroller. På mobil glir kortene inn hver for seg |
| Bilde | `components/HoverImage.tsx` | Bildet åpner seg og zoomer ut ved scroll, og en etikett følger musepekeren ved hover |
| Myk scroll | `components/SmoothScroll.tsx` | Lenis, koblet til GSAP sin ticker |

Alle animasjoner skrus av når brukeren har valgt redusert bevegelse (`prefers-reduced-motion`). Uten JavaScript vises siden som vanlig, uten loader.

Farger og fonter ligger som tokens i `app/globals.css`.

## Stack

Next.js, TypeScript, Tailwind CSS v4, GSAP, Lenis.
