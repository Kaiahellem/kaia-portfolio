import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Ikon for hjemskjerm på iPhone/iPad
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const anton = await readFile(join(process.cwd(), "node_modules/@fontsource/anton/files/anton-latin-400-normal.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a3391",
          color: "#ffffff",
          fontFamily: "Anton",
          fontSize: 132,
          lineHeight: 1,
          paddingTop: 10,
        }}
      >
        K
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, weight: 400 }] },
  );
}
