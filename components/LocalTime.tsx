"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// Klokke i Oslo-tid. Viser plassholder til den har startet i nettleseren, så server og klient er like.
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()).replaceAll(".", ":"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p>
      Lokal tid
      <br />
      <time suppressHydrationWarning className="tabular-nums">
        {time ?? "--:--:--"}
      </time>{" "}
      (Oslo)
    </p>
  );
}
