import fs from "fs";
import path from "path";

const legalDirectory = path.join(process.cwd(), "content", "legal");

export interface LegalDocument {
  style: string;
  body: string;
}

/**
 * Leest een juridisch HTML-document uit content/legal/ en haalt de inhoud
 * van de <style>- en <body>-tags eruit. Zo blijft het HTML-bestand de enige
 * bron van waarheid; de bijbehorende pagina rendert dit document.
 */
export function getLegalDocument(slug: string): LegalDocument {
  const filePath = path.join(legalDirectory, `${slug}.html`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const styleMatch = fileContents.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = fileContents.match(/<body>([\s\S]*?)<\/body>/i);

  if (!styleMatch || !bodyMatch) {
    throw new Error(`Ongeldig juridisch document: ${slug}.html mist <style> of <body>.`);
  }

  return {
    style: styleMatch[1].trim(),
    body: bodyMatch[1].trim(),
  };
}
