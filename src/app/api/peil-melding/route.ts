import { NextResponse } from "next/server";
import { getToolkaart } from "@/lib/toolkaart";

export const runtime = "nodejs";

const DOEL = "https://antonnoe-antons-cockpit-private.vercel.app/api/intake/melding";
const MAX_TEKENS = 1000;
const MAX_PER_UUR = 5;
const UUR = 60 * 60 * 1000;

// Eenvoudige rem in het geheugen van de functie: per IP maximaal 5 meldingen per uur.
const log = new Map<string, number[]>();

function teVaak(ip: string): boolean {
  const nu = Date.now();
  const recent = (log.get(ip) ?? []).filter((t) => nu - t < UUR);
  if (recent.length >= MAX_PER_UUR) {
    log.set(ip, recent);
    return true;
  }
  recent.push(nu);
  log.set(ip, recent);
  if (log.size > 5000) for (const [k, v] of log) if (v.every((t) => nu - t >= UUR)) log.delete(k);
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { slug, bericht, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: een mens laat dit veld leeg. Een bot krijgt gewoon "gelukt" en er gebeurt niets.
  if (typeof website === "string" && website.trim() !== "") return NextResponse.json({ ok: true });

  if (typeof slug !== "string" || !getToolkaart(slug)) return NextResponse.json({ ok: false }, { status: 400 });
  const tekst = typeof bericht === "string" ? bericht.trim() : "";
  if (!tekst || tekst.length > MAX_TEKENS) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = (request.headers.get("x-forwarded-for") ?? "onbekend").split(",")[0].trim();
  if (teVaak(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  try {
    const res = await fetch(DOEL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        onderdeel: slug,
        bericht: tekst,
        url: `https://communitiesabroad.com/manifest/tool/${slug}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
