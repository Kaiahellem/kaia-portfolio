import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Kaia Hellem — Design & web",
  description:
    "Kaia Hellem designer og bygger merkevare og nettsider. Frontendutvikler og designer i Oslo.",
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
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
        {children}
      </body>
    </html>
  );
}
