import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Forhåndsvisning når lenken deles i e-post, LinkedIn, Slack osv. Samme uttrykk som første skjerm.
export const alt = "Kaia Hellem – frontendutvikler og designer i Oslo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", file));

export default async function OpengraphImage() {
  const [anton, inter, interMedium] = await Promise.all([
    font("anton/files/anton-latin-400-normal.woff"),
    font("inter/files/inter-latin-400-normal.woff"),
    font("inter/files/inter-latin-500-normal.woff"),
  ]);

  // Svakt rutenett, som på et sjøkart
  const grid =
    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px 48px",
          background: "#1a3391",
          backgroundImage: grid,
          backgroundSize: "80px 80px",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Anton", fontSize: 232, lineHeight: 0.86, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
            KAIA HELLEM
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 30 }}>
            <span>Frontendutvikler &amp; designer, Oslo</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 760 }}>
            Jeg designer og bygger webløsninger i Next.js og TypeScript.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: "0.04em" }}>
            <div style={{ width: 12, height: 12, background: "#ffffff" }} />
            ÅPEN FOR JOBB
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400 },
        { name: "Inter", data: inter, weight: 400 },
        { name: "Inter", data: interMedium, weight: 500 },
      ],
    },
  );
}
