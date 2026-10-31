import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CourseLine from "@/components/CourseLine";

const description =
  "Kaia Hellem designer og bygger merkevare og nettsider. Frontendutvikler og designer i Oslo.";

export const metadata: Metadata = {
  title: "Kaia Hellem — Design & web",
  description,
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
        {/* Merker at JS kjører, så loaderen kan vises uten å blokkere siden uten JS */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
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
