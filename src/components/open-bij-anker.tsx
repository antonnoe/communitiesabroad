"use client";

import { useEffect } from "react";

// Klapt een uitklap open als de bezoeker via een link naar een bedrag erin springt.
export default function OpenBijAnker() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      const details = el?.closest("details");
      if (details && !details.open) {
        details.open = true;
        el?.scrollIntoView();
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
