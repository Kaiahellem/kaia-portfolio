import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CourseLine from "@/components/CourseLine";

const description =
  "Kaia Hellem, frontendutvikler og designer i Oslo. Designer og bygger webløsninger i Next.js og TypeScript, med to års erfaring som konsulent i Capgemini.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kaiahellem.no"),
  title: "Kaia Hellem — Frontendutvikler & designer",
  description,
  robots: { index: false, follow: false },
  // Safari på iPhone gjør ellers tall, datoer og adresser om til lenker. Det endrer siden før React
  // starter, og kan få React til å tegne alt på nytt midt i loaderen.
  formatDetection: { telephone: false, date: false, email: false, address: false },
  openGraph: {
    title: "Kaia Hellem — Frontendutvikler & designer",
    description,
    siteName: "Kaia Hellem",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaia Hellem — Frontendutvikler & designer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3391",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        {/* Uten JavaScript kjører aldri animasjonen som fjerner loaderen, så da skjules den */}
        <noscript>
          <style>{".loader{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll />
        <div className="relative">
          {children}
          <CourseLine />
        </div>
      </body>
    </html>
  );
}
