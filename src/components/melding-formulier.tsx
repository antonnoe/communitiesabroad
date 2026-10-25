"use client";

import { useState } from "react";

interface Props {
  slug: string;
  knop: string;
  label: string;
  hulp: string;
  verstuur: string;
  bezig: string;
  gelukt: string;
  mislukt: string;
  leeg: string;
  teLang: string;
}

const MAX = 1000;

export default function MeldingFormulier(p: Props) {
  const [bericht, setBericht] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"rust" | "bezig" | "gelukt" | "fout">("rust");
  const [fout, setFout] = useState("");

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    const tekst = bericht.trim();
    if (!tekst) {
      setFout(p.leeg);
      setStatus("fout");
      return;
    }
    if (tekst.length > MAX) {
      setFout(p.teLang);
      setStatus("fout");
      return;
    }
    setStatus("bezig");
    try {
      const res = await fetch("/api/peil-melding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: p.slug, bericht: tekst, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("gelukt");
      setBericht("");
    } catch {
      setFout(p.mislukt);
      setStatus("fout");
    }
  }

  return (
    <details className="meld">
      <summary>{p.knop}</summary>
      {status === "gelukt" ? (
        <p className="uitslag" role="status" style={{ marginTop: 12 }}>
          {p.gelukt}
        </p>
      ) : (
        <form onSubmit={verstuur} noValidate>
          <label htmlFor={`melding-${p.slug}`}>{p.label}</label>
          <textarea
            id={`melding-${p.slug}`}
            name="bericht"
            value={bericht}
            maxLength={MAX}
            onChange={(e) => setBericht(e.target.value)}
            aria-describedby={`melding-hulp-${p.slug}`}
          />
          <p className="teller" aria-hidden="true">
            {bericht.length} / {MAX}
          </p>
          <p className="hulp" id={`melding-hulp-${p.slug}`}>
            {p.hulp}
          </p>
          <div className="pot" aria-hidden="true">
            <label htmlFor={`website-${p.slug}`}>Website</label>
            <input
              id={`website-${p.slug}`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <button type="submit" disabled={status === "bezig"}>
            {status === "bezig" ? p.bezig : p.verstuur}
          </button>
          {status === "fout" && (
            <p className="uitslag fout" role="alert">
              {fout}
            </p>
          )}
        </form>
      )}
    </details>
  );
}
