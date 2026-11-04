"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  titel: string;
  minHoogte?: number;
}

// De bestaande zoekfunctie meldt zijn hoogte met postMessage ({ type: "ca-hoogte", id: "peil-zoek", hoogte }).
export default function PeilZoekFrame({ src, titel, minHoogte = 520 }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [hoogte, setHoogte] = useState(minHoogte);

  useEffect(() => {
    function ontvang(e: MessageEvent) {
      if (e.source !== ref.current?.contentWindow) return;
      const d = e.data;
      if (d && d.type === "ca-hoogte" && d.id === "peil-zoek" && typeof d.hoogte === "number" && d.hoogte > 0) {
        setHoogte(Math.max(minHoogte, Math.ceil(d.hoogte)));
      }
    }
    window.addEventListener("message", ontvang);
    return () => window.removeEventListener("message", ontvang);
  }, [minHoogte]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={titel}
      style={{ width: "100%", height: hoogte, border: 0, display: "block" }}
    />
  );
}
