"use client";

import { useRef, useState } from "react";

interface Props {
  tekst: string;
  knop: string;
  gekopieerd: string;
  terugval: string;
}

export default function KopieerBronregel({ tekst, knop, gekopieerd, terugval }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const [label, setLabel] = useState(knop);

  function melding(nieuw: string, ms: number) {
    setLabel(nieuw);
    window.setTimeout(() => setLabel(knop), ms);
  }

  function selecteer() {
    const el = codeRef.current;
    const sel = window.getSelection();
    if (el && sel) {
      const r = document.createRange();
      r.selectNodeContents(el);
      sel.removeAllRanges();
      sel.addRange(r);
    }
    melding(terugval, 5000);
  }

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(tekst);
      melding(gekopieerd, 2000);
    } catch {
      selecteer();
    }
  }

  return (
    <>
      <code ref={codeRef}>{tekst}</code>
      <button type="button" className="knop" onClick={kopieer} aria-live="polite">
        {label}
      </button>
    </>
  );
}
