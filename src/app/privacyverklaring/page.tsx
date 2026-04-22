import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Communities Abroad — hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen binnen ons netwerk van platforms.",
};

const styleContent = `.ca-privacy {
    font-family: 'Mulish', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.8em;
    color: #2c2c2c;
    max-width: 780px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
  }

  .ca-privacy h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    color: #800000;
    font-size: 1.6rem;
    margin: 0 0 0.5rem 0;
    border-bottom: 3px solid #800000;
    padding-bottom: 0.8rem;
  }

  .ca-privacy h2 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    color: #800000;
    font-size: 1.25rem;
    margin: 2.2rem 0 0.8rem 0;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(128, 0, 0, 0.15);
  }

  .ca-privacy h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #800000;
    font-size: 1.05rem;
    margin: 1.4rem 0 0.4rem 0;
  }

  .ca-privacy p {
    margin: 0 0 0.8rem 0;
    font-size: 0.95rem;
    text-align: justify;
  }

  .ca-privacy .ca-privacy-meta {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .ca-privacy .ca-privacy-toc {
    background: rgba(128, 0, 0, 0.04);
    border: 1px solid rgba(128, 0, 0, 0.12);
    border-radius: 6px;
    padding: 1.2rem 1.5rem;
    margin: 1.5rem 0 2rem 0;
  }

  .ca-privacy .ca-privacy-toc-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #800000;
    font-size: 1rem;
    margin: 0 0 0.6rem 0;
  }

  .ca-privacy .ca-privacy-toc ol {
    margin: 0;
    padding-left: 1.2rem;
  }

  .ca-privacy .ca-privacy-toc li {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }

  .ca-privacy .ca-privacy-toc a {
    color: #800000;
    text-decoration: none;
    border-bottom: 1px solid rgba(128, 0, 0, 0.3);
  }

  .ca-privacy .ca-privacy-toc a:hover {
    border-bottom-color: #800000;
  }

  .ca-privacy ul {
    padding-left: 1.4rem;
    margin: 0.5rem 0 1rem 0;
  }

  .ca-privacy li {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
  }

  .ca-privacy a { color: #800000; text-decoration: none; }
  .ca-privacy a:hover { text-decoration: underline; }

  .ca-privacy strong { color: #800000; }

  .ca-privacy .ca-privacy-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0 1.5rem 0;
    font-size: 0.88rem;
  }

  .ca-privacy .ca-privacy-table th {
    background: rgba(128, 0, 0, 0.08);
    color: #800000;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-align: left;
    padding: 0.6rem 0.8rem;
    border-bottom: 2px solid rgba(128, 0, 0, 0.2);
  }

  .ca-privacy .ca-privacy-table td {
    padding: 0.5rem 0.8rem;
    border-bottom: 1px solid rgba(128, 0, 0, 0.08);
    vertical-align: top;
  }

  .ca-privacy .ca-privacy-note {
    background: rgba(128, 0, 0, 0.04);
    border-left: 3px solid #800000;
    padding: 0.8rem 1.2rem;
    margin: 1rem 0;
    font-size: 0.9rem;
    border-radius: 0 4px 4px 0;
  }

  .ca-privacy .ca-privacy-schema {
    background: #f9f7f5;
    border: 1px solid rgba(128, 0, 0, 0.12);
    border-left: 4px solid #800000;
    border-radius: 4px;
    padding: 1.2rem 1.5rem;
    margin: 1rem 0 1.5rem 0;
    font-size: 0.88rem;
    line-height: 1.6em;
    white-space: pre-line;
  }

  .ca-privacy .ca-privacy-footer {
    margin-top: 2.5rem;
    padding-top: 1.2rem;
    border-top: 2px solid rgba(128, 0, 0, 0.2);
    font-size: 0.85rem;
    color: #666;
  }

  .ca-privacy .ca-privacy-changelog {
    background: rgba(128, 0, 0, 0.03);
    border: 1px solid rgba(128, 0, 0, 0.10);
    border-radius: 6px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0 0 0;
    font-size: 0.85rem;
  }

  .ca-privacy .ca-privacy-changelog-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: #800000;
    font-size: 0.95rem;
    margin: 0 0 0.5rem 0;
  }`;

const bodyContent = `<div class="ca-privacy">

<h1>Privacyverklaring Communities Abroad</h1>

<p class="ca-privacy-meta">
  <strong>Versie:</strong> 2.2 — 22 april 2026<br>
  <strong>Van toepassing op:</strong> het volledige netwerk van platforms van Communities Abroad<br>
  <strong>Verantwoordelijke:</strong> Communities Abroad, KvK 55741509, Oirschot, Nederland
</p>

<div class="ca-privacy-toc">
  <p class="ca-privacy-toc-title">Inhoudsopgave</p>
  <ol>
    <li><a href="#inleiding">Inleiding</a></li>
    <li><a href="#verantwoordelijke">Verwerkingsverantwoordelijke</a></li>
    <li><a href="#netwerk-platforms">Het netwerk van platforms</a></li>
    <li><a href="#gegevens">Welke gegevens verwerken wij, waarom en hoe lang?</a></li>
    <li><a href="#verwerkers">Verwerkers en subverwerkers</a></li>
    <li><a href="#doorgifte">Doorgifte van gegevens buiten de EER</a></li>
    <li><a href="#ai-transparantie">AI-transparantie (EU AI Act)</a></li>
    <li><a href="#localstorage">Lokale opslag in de browser (localStorage)</a></li>
    <li><a href="#cafeclaude">Café Claude – AI-assistent</a></li>
    <li><a href="#correspondentie-assistent">Correspondentie-assistent</a></li>
    <li><a href="#dossierfrankrijk">DossierFrankrijk – Persoonlijk dossier</a></li>
    <li><a href="#datastromen">Datastromen tussen platforms</a></li>
    <li><a href="#cookies">Cookies</a></li>
    <li><a href="#rechten">Uw rechten onder de AVG</a></li>
    <li><a href="#datalekken">Datalekken</a></li>
    <li><a href="#disclaimer-ai">Disclaimer AI-gegenereerde informatie</a></li>
    <li><a href="#klachten">Klachten</a></li>
    <li><a href="#wijzigingen">Wijzigingen</a></li>
  </ol>
</div>

<!-- ============================================================ -->
<h2 id="inleiding">1. Inleiding</h2>

<p>Communities Abroad neemt uw privacy serieus. Deze verklaring beschrijft hoe wij, als verwerkingsverantwoordelijke, persoonsgegevens verzamelen, gebruiken, delen en beschermen binnen ons netwerk van platforms, bestaande uit websites, forums, directories, AI-diensten en nieuwsbrieven.</p>

<p>Dit document vervangt alle eerdere privacyverklaringen van Communities Abroad en is van toepassing op alle hieronder genoemde platforms.</p>

<!-- ============================================================ -->
<h2 id="verantwoordelijke">2. Verwerkingsverantwoordelijke</h2>

<p><strong>Communities Abroad</strong><br>
Landgoed de Stille Wille 174<br>
5091 WE Oirschot<br>
Nederland<br>
KvK-nummer: 55741509</p>

<p>Voor alle vragen of verzoeken met betrekking tot uw privacy: <strong>info@communitiesabroad.com</strong></p>

<!-- ============================================================ -->
<h2 id="netwerk-platforms">3. Het netwerk van platforms</h2>

<p>Communities Abroad exploiteert een samenhangend netwerk van platforms ten behoeve van Nederlandstalige personen die in Frankrijk wonen, werken of van plan zijn daarheen te verhuizen. Dit netwerk bestaat uit de volgende onderling gekoppelde platforms:</p>

<div class="ca-privacy-schema">
<strong>Nederlanders.fr</strong> — Community &amp; forum (25.000+ leden)
Gratis toegankelijk · Discussies · Deep links naar Infofrankrijk

<strong>Infofrankrijk.com</strong> — Informatieportaal &amp; tools
Freemium model · Artikelen · Interactieve tools &amp; calculators · Abonnementenbeheer (master identity)

<strong>Interactieve tools op Infofrankrijk.com:</strong>
— Financieel Kompas: belasting- en inkomenssimulatie voor Nederlanders in Frankrijk
— Correspondentie-assistent: juridische en administratieve brieven in het Frans
— EnergiePortaal: energiekosten- en DPE-analyse voor woningen in Frankrijk

<strong>Café Claude (cafeclaude.fr)</strong> — AI-gestuurde assistent
Click-funnel met zes domeinen · Pre-gegenereerde antwoorden met kwaliteitscontrole · Gekoppeld aan Infofrankrijk-content

<strong>DossierFrankrijk (dossierfrankrijk.nl)</strong> — Persoonlijk dossier
Opslag van tool-resultaten en chatgesprekken · Toegankelijk voor abonnees van Infofrankrijk

<strong>Nedergids.nl</strong> — Geodirectory
Bedrijvengids voor Nederlandstalige dienstverleners in Frankrijk

<strong>DoctorsOnMaps.com</strong> — Geodirectory
Artsen en medische dienstverleners in Frankrijk

<strong>CommunitiesAbroad.com</strong> — Bedrijfswebsite
Informatief; er worden geen persoonsgegevens verwerkt

<strong>Frankrijknieuws</strong> — Nieuwsbrief
Dagelijkse e-mail met nieuws uit en over Frankrijk
</div>

<!-- ============================================================ -->
<h2 id="gegevens">4. Welke gegevens verwerken wij, waarom en hoe lang?</h2>

<p>Wij verwerken verschillende soorten gegevens, afhankelijk van de dienst die u gebruikt. Voor elke verwerking hebben wij een wettelijke grondslag onder de AVG en een specifieke bewaartermijn.</p>

<table class="ca-privacy-table">
<thead>
<tr>
  <th>Dienst / Doel</th>
  <th>Welke persoonsgegevens?</th>
  <th>Grondslag (AVG)</th>
  <th>Bewaartermijn</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong>Forum</strong> (nederlanders.fr)</td>
  <td>Gebruikersnaam, e-mailadres, IP-adres, profielgegevens (vrijwillig), geplaatste berichten.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Zolang account actief is. Na verwijdering worden berichten geanonimiseerd.</td>
</tr>
<tr>
  <td><strong>Informatieportaal</strong> (infofrankrijk.com)</td>
  <td>Accountgegevens, e-mailadres, abonneestatus, betaalgegevens (bij abonnement).</td>
  <td>Uitvoering overeenkomst</td>
  <td>Zolang account actief is + 12 maanden na opzegging.</td>
</tr>
<tr>
  <td><strong>AI-assistent</strong> (cafeclaude.fr)</td>
  <td>Ingevoerde vragen, e-mailadres (bij ingelogde sessie), gegenereerde antwoorden.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Duur van de sessie, tenzij opgeslagen in DossierFrankrijk.</td>
</tr>
<tr>
  <td><strong>Correspondentie-assistent</strong> (tool op Infofrankrijk.com)</td>
  <td>Ingevoerde keuzes en antwoorden in klikstromen, gegenereerde brieven, contactgegevens opgeslagen in contactkaarten (localStorage). Bij ingelogde sessies: e-mailadres en abonneestatus.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Klikstroomgegevens: duur van de sessie. Contactkaarten: zolang de gebruiker deze in de browser bewaart (localStorage). Gegenereerde brieven: niet opgeslagen op servers, tenzij de gebruiker deze opslaat in DossierFrankrijk.</td>
</tr>
<tr>
  <td><strong>Interactieve tools</strong> (Financieel Kompas, EnergiePortaal)</td>
  <td>Ingevoerde financiële en woninggegevens, berekende resultaten. Bij ingelogde sessies: e-mailadres en abonneestatus.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Duur van de sessie, tenzij opgeslagen in DossierFrankrijk.</td>
</tr>
<tr>
  <td><strong>Persoonlijk dossier</strong> (dossierfrankrijk.nl)</td>
  <td>Opgeslagen tool-resultaten, chatgesprekken, door gebruiker aangemaakte mappen.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Zolang abonnement actief is + 90 dagen na opzegging.</td>
</tr>
<tr>
  <td><strong>Directories</strong> (nedergids.nl, doctorsonmaps.com)</td>
  <td>Naam, (zakelijk) adres, e-mailadres, telefoonnummer, specialisatie, en overige gegevens die u aanlevert voor uw vermelding.</td>
  <td>Uitvoering overeenkomst</td>
  <td>Zolang vermelding actief is, of tot verzoek om verwijdering.</td>
</tr>
<tr>
  <td><strong>Nieuwsbrief</strong> (Frankrijknieuws)</td>
  <td>E-mailadres, (optioneel: voornaam).</td>
  <td>Toestemming</td>
  <td>Zolang ingeschreven. Uitschrijven via elke e-mail mogelijk.</td>
</tr>
<tr>
  <td><strong>Advertentiepartners</strong></td>
  <td>Naam contactpersoon, e-mailadres, bedrijfsnaam, KvK-nummer, bankgegevens.</td>
  <td>Uitvoering overeenkomst / Wettelijke verplichting</td>
  <td>7 jaar na einde overeenkomst (fiscale bewaarplicht).</td>
</tr>
<tr>
  <td><strong>Serverlogbestanden</strong> (alle platforms)</td>
  <td>IP-adres, browsertype, apparaat-ID's.</td>
  <td>Gerechtvaardigd belang</td>
  <td>Maximaal 90 dagen.</td>
</tr>
</tbody>
</table>

<!-- ============================================================ -->
<h2 id="verwerkers">5. Verwerkers en subverwerkers</h2>

<p>Wij verkopen uw persoonsgegevens nooit aan derden. Wij delen uw gegevens alleen met verwerkers als dit noodzakelijk is voor onze dienstverlening, of als wij hiertoe wettelijk verplicht zijn.</p>

<table class="ca-privacy-table">
<thead>
<tr>
  <th>Verwerker</th>
  <th>Dienst</th>
  <th>Locatie</th>
  <th>Waarborg</th>
</tr>
</thead>
<tbody>
<tr>
  <td>NING</td>
  <td>Forumplatform nederlanders.fr</td>
  <td>Verenigde Staten</td>
  <td>NING Data Privacy Addendum; DPF-certificering niet bevestigd</td>
</tr>
<tr>
  <td>Anthropic PBC</td>
  <td>AI-taalmodel voor Café Claude en Correspondentie-assistent</td>
  <td>Verenigde Staten</td>
  <td>Anthropic API Terms of Service; Zero Data Retention (geen opslag van prompts/antwoorden door Anthropic)</td>
</tr>
<tr>
  <td>Supabase Inc.</td>
  <td>Database &amp; authenticatie DossierFrankrijk</td>
  <td>AWS Frankfurt (EU)</td>
  <td>Verwerkersovereenkomst (DPA)</td>
</tr>
<tr>
  <td>Vercel Inc.</td>
  <td>Hosting webapplicaties en tools</td>
  <td>EU-regio</td>
  <td>Verwerkersovereenkomst (DPA)</td>
</tr>
<tr>
  <td>CozmosLabs / WordPress</td>
  <td>CMS &amp; abonnementenbeheer Infofrankrijk</td>
  <td>EU</td>
  <td>Verwerkersovereenkomst (DPA)</td>
</tr>
<tr>
  <td>Mailchimp (Intuit Inc.)</td>
  <td>Verzending nieuwsbrief Frankrijknieuws</td>
  <td>Verenigde Staten</td>
  <td>Verwerkersovereenkomst (DPA); DPF-gecertificeerd</td>
</tr>
</tbody>
</table>

<!-- ============================================================ -->
<h2 id="doorgifte">6. Doorgifte van gegevens buiten de EER</h2>

<p>Sommige van onze verwerkers zijn gevestigd buiten de Europese Economische Ruimte (EER), met name in de Verenigde Staten. Dit betreft:</p>

<ul>
  <li><strong>NING</strong> (forumplatform nederlanders.fr) — gevestigd in de VS. De DPF-certificering van NING is niet bevestigd. NING biedt een eigen Data Privacy Addendum aan.</li>
  <li><strong>Anthropic PBC</strong> (AI-taalmodel voor Café Claude en Correspondentie-assistent) — gevestigd in de VS. De aan het taalmodel doorgestuurde gegevens worden verwerkt op servers van Anthropic in de Verenigde Staten. Anthropic biedt Zero Data Retention (ZDR) aan voor API-gebruik, wat inhoudt dat ingevoerde prompts en gegenereerde antwoorden niet door Anthropic worden opgeslagen na verwerking.</li>
  <li><strong>Mailchimp (Intuit Inc.)</strong> (nieuwsbrief Frankrijknieuws) — gevestigd in de VS. Mailchimp is gecertificeerd onder het EU-US Data Privacy Framework (DPF).</li>
</ul>

<p>Voor doorgifte naar de VS baseren wij ons waar mogelijk op het <strong>EU-US Data Privacy Framework (DPF)</strong>, het adequaatheidsbesluit dat de Europese Commissie op 10 juli 2023 heeft vastgesteld. Indien een verwerker niet onder het DPF is gecertificeerd, zijn de standaard contractbepalingen van de betreffende dienstverlener of de <strong>Standaard Contractbepalingen (SCC's)</strong> van de Europese Commissie van toepassing.</p>

<p>Communities Abroad streeft ernaar alle nieuwe diensten en verwerkers binnen de EU te selecteren. Waar dat (nog) niet mogelijk is, zorgen wij voor passende waarborgen en transparantie over de locatie van gegevensverwerking.</p>

<!-- ============================================================ -->
<h2 id="ai-transparantie">7. AI-transparantie (EU AI Act)</h2>

<h3>7.1 Classificatie</h3>
<p>De AI-gestuurde diensten van Communities Abroad — Café Claude en Correspondentie-assistent — vallen onder de categorie <strong>AI-systemen met beperkt risico</strong> volgens de Europese AI-verordening (Verordening (EU) 2024/1689). Voor deze categorie gelden transparantieverplichtingen op grond van artikel 50.</p>

<h3>7.2 Rol van Communities Abroad</h3>
<p>Communities Abroad vervult ten aanzien van deze AI-diensten de rol van zowel <strong>aanbieder</strong> (provider) als <strong>gebruiksverantwoordelijke</strong> (deployer) in de zin van de AI-verordening, en voldoet aan de verplichtingen die bij beide rollen horen.</p>

<h3>7.3 Transparantiemaatregelen</h3>
<p>Om aan de transparantieverplichtingen te voldoen, treft Communities Abroad de volgende maatregelen: gebruikers worden vanaf het eerste contactmoment geïnformeerd dat zij communiceren met een AI-systeem, door middel van een zichtbaar label en een korte toelichting bij eerste gebruik. Alle antwoorden van de AI-assistent zijn herkenbaar als automatisch gegenereerde content. De Correspondentie-assistent maakt onderscheid tussen drie generatiemodi (cache, basis en vrij), waarbij het transparantieniveau per modus wordt aangegeven. Een permanente disclaimer is beschikbaar via de interface (zie ook artikel 16 van deze verklaring).</p>

<h3>7.4 AI-geletterdheid</h3>
<p>Conform artikel 4 van de AI-verordening draagt Communities Abroad zorg voor voldoende kennis en bewustzijn over de mogelijkheden en beperkingen van de ingezette AI-systemen.</p>

<!-- ============================================================ -->
<h2 id="localstorage">8. Lokale opslag in de browser (localStorage)</h2>

<h3>8.1 Wat is localStorage?</h3>
<p>Sommige tools binnen het netwerk van platforms slaan gegevens op in de lokale opslag van uw browser (localStorage). Deze gegevens worden niet naar onze servers verstuurd en blijven uitsluitend op uw eigen apparaat.</p>

<h3>8.2 Welke tools gebruiken localStorage?</h3>
<p>De volgende tools maken gebruik van localStorage:</p>

<ul>
  <li><strong>Correspondentie-assistent</strong> — Contactkaarten: namen, adressen en referentienummers van partijen waarmee u correspondeert. Deze gegevens worden uitsluitend lokaal opgeslagen zodat u ze bij een volgend gebruik niet opnieuw hoeft in te voeren.</li>
  <li><strong>Financieel Kompas</strong> — Laatst gebruikte invoerwaarden, zodat u bij een volgend bezoek niet alle gegevens opnieuw hoeft in te vullen.</li>
</ul>

<h3>8.3 Uw controle</h3>
<p>U kunt localStorage-gegevens te allen tijde verwijderen via de instellingen van uw browser, of via de wisfunctie die in de betreffende tool is ingebouwd. Het verwijderen van localStorage-gegevens heeft geen invloed op uw account of abonnement.</p>

<h3>8.4 Optionele synchronisatie met DossierFrankrijk</h3>
<p>De Correspondentie-assistent biedt de mogelijkheid om contactkaarten op te slaan in DossierFrankrijk. Dit gebeurt alleen op uw uitdrukkelijke verzoek (opt-in). Wanneer u hiervoor kiest, worden de contactkaartgegevens overgedragen naar de Supabase-database van DossierFrankrijk en vallen zij onder de bewaarvoorwaarden van artikel 11 van deze verklaring.</p>

<!-- ============================================================ -->
<h2 id="cafeclaude">9. Café Claude – AI-assistent</h2>

<h3>9.1 Werking</h3>
<p>Café Claude is een AI-gestuurde assistent die vooraf gecontroleerde antwoorden biedt over wonen, werken en ondernemen in Frankrijk. De gebruiker navigeert via een click-funnel door zes domeinen (Wonen, Geld, Zorg, Ondernemen, Verzekeren, Bureaucratie) naar steeds specifiekere onderwerpen. Het merendeel van de antwoorden is pre-gegenereerd en heeft een geautomatiseerde kwaliteitscontrole doorlopen (Q-score ≥ 8 op een schaal van 10). Bronnen worden geclassificeerd naar betrouwbaarheid (AAA/AA/A) en zijn zichtbaar bij elk antwoord. Een publiek toegankelijk kwaliteitsdashboard toont de prestaties van alle gecachte antwoorden.</p>

<h3>9.2 Beperkingen</h3>
<p>De AI-assistent kan onjuiste, onvolledige of verouderde informatie genereren. Dit is een inherente eigenschap van generatieve AI-technologie ("hallucinatie"). De gegenereerde antwoorden zijn niet geverifieerd door een mens, tenzij uitdrukkelijk anders vermeld.</p>

<h3>9.3 Geen persoonlijk advies</h3>
<p>De informatie die Café Claude verstrekt is algemeen van aard en vormt uitdrukkelijk geen individueel juridisch, fiscaal, financieel of medisch advies. Voor beslissingen met juridische, financiële of medische gevolgen dient u altijd een gekwalificeerde adviseur te raadplegen.</p>

<h3>9.4 Gegevensverwerking</h3>
<p>Café Claude verwerkt tijdens een sessie: de door u ingevoerde vragen en context, uw e-mailadres (bij ingelogde sessies via SSO), en de door de AI gegenereerde antwoorden. Chatgesprekken worden niet permanent opgeslagen op de servers van Communities Abroad, tenzij u ervoor kiest een gesprek op te slaan in DossierFrankrijk.</p>

<p>De vragen die u invoert worden doorgestuurd naar het AI-taalmodel van Anthropic (Claude). Anthropic verwerkt deze gegevens conform de Anthropic API Terms of Service. Bij API-gebruik met Zero Data Retention (ZDR) worden ingevoerde prompts en gegenereerde antwoorden niet door Anthropic opgeslagen na verwerking. De verwerking vindt plaats op servers in de Verenigde Staten (zie ook artikel 6).</p>

<!-- ============================================================ -->
<h2 id="correspondentie-assistent">10. Correspondentie-assistent</h2>

<h3>10.1 Werking</h3>
<p>De Correspondentie-assistent helpt gebruikers bij het opstellen van juridische en administratieve brieven in het Frans. De tool werkt via klikstromen (gestructureerde keuzevragen) en genereert brieven op basis van drie modi: cache (vooraf geverifieerde templates), basis (gesloten set van geverifieerde bronnen) en vrij (met expliciete waarschuwing dat AI-gegenereerde content niet is geverifieerd).</p>

<h3>10.2 Bronnen</h3>
<p>De briefinhoud in de modi "cache" en "basis" is afkomstig van geverifieerde externe bronnen, waaronder modelbrieven van het Institut National de la Consommation (INC, inc-conso.fr) en informatie van economie.gouv.fr. In de modus "vrij" wordt de briefinhoud door het AI-model gegenereerd en is deze niet geverifieerd.</p>

<h3>10.3 Gegevensverwerking</h3>
<p>De Correspondentie-assistent verwerkt tijdens een sessie: de door u gemaakte keuzes in de klikstroom, de door u ingevoerde adresgegevens en referentienummers, en de gegenereerde brief. In de modi "basis" en "vrij" worden uw invoer en de gegenereerde brief doorgestuurd naar het AI-taalmodel van Anthropic (Claude) conform dezelfde voorwaarden als beschreven in artikel 9.4.</p>

<p>In de modus "cache" vindt geen verwerking door een extern AI-model plaats; de brief wordt volledig lokaal samengesteld op basis van vooraf gecachete templates.</p>

<h3>10.4 Contactkaarten</h3>
<p>De Correspondentie-assistent biedt de mogelijkheid om contactgegevens van partijen waarmee u correspondeert (zoals namen, adressen en referentienummers) op te slaan als contactkaarten. Deze worden standaard opgeslagen in de localStorage van uw browser (zie artikel 8). Optioneel kunt u contactkaarten synchroniseren met DossierFrankrijk (zie artikel 8.4).</p>

<h3>10.5 AI-auditeur</h3>
<p>Elke gegenereerde brief doorloopt een geautomatiseerde kwaliteitscontrole (AI-auditeur, 9 checks). De uitkomst van deze controle wordt aan de gebruiker getoond als een kwaliteitsbadge. Deze controle is volledig geautomatiseerd en vindt plaats via het AI-taalmodel van Anthropic.</p>

<!-- ============================================================ -->
<h2 id="dossierfrankrijk">11. DossierFrankrijk – Persoonlijk dossier</h2>

<h3>11.1 Functie</h3>
<p>DossierFrankrijk biedt abonnees van Infofrankrijk de mogelijkheid om resultaten van interactieve tools en chatgesprekken met Café Claude op te slaan in een persoonlijk, digitaal dossier.</p>

<h3>11.2 Wat wordt opgeslagen</h3>
<p>In DossierFrankrijk worden uitsluitend de volgende gegevenstypen opgeslagen: resultaten van tools en calculators op Infofrankrijk.com (zoals vastgoedanalyses, energiekostenberekeningen en belastingscenario's), chatgesprekken met Café Claude die u kiest op te slaan, gegenereerde brieven uit de Correspondentie-assistent die u kiest op te slaan, contactkaarten uit de Correspondentie-assistent (bij opt-in synchronisatie), door u aangemaakte mappen en de daarin opgeslagen items, en AI-samenvattingen van artikelen en overheidswebsites. U kunt geen eigen bestanden uploaden, geen vrije tekst invoeren en geen externe documenten toevoegen.</p>

<h3>11.3 Persoonsgegevens</h3>
<p>Hoewel de opgeslagen content zelf vaak algemeen van aard is, worden deze gegevens gekoppeld aan uw account. Daarmee kwalificeren zij als persoonsgegevens in de zin van de AVG. Communities Abroad verwerkt deze gegevens als verwerkingsverantwoordelijke.</p>

<h3>11.4 Toegang door beheerder</h3>
<p>Communities Abroad heeft als beheerder van de onderliggende database technisch toegang tot de opgeslagen gegevens van alle gebruikers. Communities Abroad verbindt zich ertoe deze toegang uitsluitend te gebruiken voor: technisch onderhoud en foutherstel, het uitvoeren van verzoeken van de gebruiker (inzage, export, verwijdering), en situaties waarin daartoe een wettelijke verplichting bestaat. Communities Abroad raadpleegt, kopieert of analyseert nooit individuele dossiers voor commerciële, redactionele of andere doeleinden.</p>

<h3>11.5 Export en verwijdering</h3>
<p>U kunt te allen tijde uw volledige dossier exporteren als PDF of gestructureerd bestand. U kunt individuele items, mappen of uw volledige dossier permanent verwijderen. Bij opzegging van het abonnement wordt het dossier na 90 dagen automatisch en onomkeerbaar verwijderd, tenzij u eerder om verwijdering verzoekt.</p>

<!-- ============================================================ -->
<h2 id="datastromen">12. Datastromen tussen platforms</h2>

<p>De platforms binnen het netwerk wisselen gegevens uit ten behoeve van een naadloze gebruikerservaring:</p>

<table class="ca-privacy-table">
<thead>
<tr>
  <th>Van</th>
  <th>Naar</th>
  <th>Welke gegevens</th>
  <th>Doel</th>
</tr>
</thead>
<tbody>
<tr>
  <td>Infofrankrijk</td>
  <td>Café Claude</td>
  <td>E-mailadres, abonneestatus, artikelcontext</td>
  <td>Authenticatie (SSO) en contextbewust antwoord</td>
</tr>
<tr>
  <td>Infofrankrijk</td>
  <td>DossierFrankrijk</td>
  <td>E-mailadres, abonneestatus, tool-resultaten</td>
  <td>Authenticatie (SSO) en opslag van resultaten</td>
</tr>
<tr>
  <td>Infofrankrijk</td>
  <td>Correspondentie-assistent</td>
  <td>E-mailadres, abonneestatus</td>
  <td>Authenticatie (SSO) en toegang tot premium niveaus</td>
</tr>
<tr>
  <td>Infofrankrijk</td>
  <td>Financieel Kompas / EnergiePortaal</td>
  <td>E-mailadres, abonneestatus</td>
  <td>Authenticatie (SSO) en toegang tot premium functies</td>
</tr>
<tr>
  <td>Café Claude</td>
  <td>DossierFrankrijk</td>
  <td>Chatgesprek (vraag + antwoord + bronnen)</td>
  <td>Opslag op verzoek van gebruiker</td>
</tr>
<tr>
  <td>Correspondentie-assistent</td>
  <td>DossierFrankrijk</td>
  <td>Gegenereerde brief, contactkaarten</td>
  <td>Opslag op verzoek van gebruiker (opt-in)</td>
</tr>
<tr>
  <td>Café Claude / Correspondentie-assistent</td>
  <td>Anthropic (Claude API)</td>
  <td>Ingevoerde vraag of briefcontext van gebruiker</td>
  <td>Genereren van AI-antwoord of brief</td>
</tr>
<tr>
  <td>Infofrankrijk</td>
  <td>Nederlanders.fr</td>
  <td>Geen persoonsgegevens; alleen deep links</td>
  <td>Verwijzingen naar relevante discussies</td>
</tr>
</tbody>
</table>

<div class="ca-privacy-note">
  <strong>SSO-mechanisme:</strong> Wanneer u bent ingelogd op Infofrankrijk.com, wordt een versleuteld token (HMAC-SHA256) gegenereerd waarmee u automatisch wordt herkend bij DossierFrankrijk, Café Claude, Correspondentie-assistent, Financieel Kompas en EnergiePortaal. Dit token bevat uitsluitend uw e-mailadres en abonneestatus en wordt via een beveiligde verbinding (HTTPS) overgedragen.
</div>

<!-- ============================================================ -->
<h2 id="cookies">13. Cookies</h2>

<p>Onze websites maken gebruik van cookies. Sommige zijn technisch noodzakelijk voor de werking van de website, andere worden gebruikt voor analyse van websiteverkeer. Bij uw eerste bezoek krijgt u de keuze welke cookies u accepteert. U kunt uw keuzes te allen tijde wijzigen via de cookie-instellingen op de betreffende website.</p>

<!-- ============================================================ -->
<h2 id="rechten">14. Uw rechten onder de AVG</h2>

<p>U heeft te allen tijde controle over uw persoonsgegevens. Onder de AVG heeft u de volgende rechten:</p>

<p><strong>Recht op inzage</strong> — U kunt opvragen welke gegevens wij van u verwerken. Forum- en directorygebruikers kunnen veel gegevens zelf inzien via hun profiel. In DossierFrankrijk kunt u uw volledige dossier op elk moment zelf inzien.</p>

<p><strong>Recht op rectificatie</strong> — U kunt onjuiste gegevens laten corrigeren of zelf aanpassen via uw profiel.</p>

<p><strong>Recht op verwijdering</strong> — U kunt verzoeken om verwijdering van uw gegevens, tenzij wij een wettelijke bewaarplicht hebben. In DossierFrankrijk kunt u zelf items, mappen en uw volledige dossier verwijderen.</p>

<p><strong>Recht op beperking</strong> — U kunt verzoeken de verwerking van uw gegevens tijdelijk te stoppen in bepaalde omstandigheden.</p>

<p><strong>Recht op gegevensoverdraagbaarheid</strong> — U kunt uw gegevens in een gestructureerd, gangbaar en machineleesbaar formaat opvragen. DossierFrankrijk biedt een exportfunctie waarmee u uw dossier kunt downloaden.</p>

<p><strong>Recht van bezwaar</strong> — U kunt bezwaar maken tegen verwerkingen op basis van gerechtvaardigd belang.</p>

<p><strong>Recht om toestemming in te trekken</strong> — Wanneer verwerking op toestemming is gebaseerd (zoals voor de nieuwsbrief), kunt u deze altijd intrekken.</p>

<p>U kunt een verzoek indienen via <strong>info@communitiesabroad.com</strong>. Wij reageren binnen één maand op uw verzoek.</p>

<!-- ============================================================ -->
<h2 id="datalekken">15. Datalekken</h2>

<p>Indien zich een inbreuk voordoet op de beveiliging van persoonsgegevens, handelt Communities Abroad conform de AVG (artikelen 33 en 34). Dit betekent dat wij een datalek binnen 72 uur melden bij de Autoriteit Persoonsgegevens wanneer er een risico is voor de rechten van betrokkenen. Wanneer het lek een hoog risico oplevert voor uw rechten en vrijheden, informeren wij u ook rechtstreeks.</p>

<!-- ============================================================ -->
<h2 id="disclaimer-ai">16. Disclaimer AI-gegenereerde informatie</h2>

<p>De volgende disclaimer is van toepassing op alle AI-gegenereerde content binnen het netwerk van platforms, waaronder antwoorden van Café Claude, gegenereerde brieven van de Correspondentie-assistent en AI-samenvattingen op Infofrankrijk.com:</p>

<div class="ca-privacy-note">
  <strong>AI-disclaimer</strong><br><br>
  De AI-gestuurde tools genereren antwoorden en brieven automatisch op basis van beschikbare bronnen en AI-technologie. Er zit geen mens achter de gegenereerde content. AI kan informatie produceren die correct lijkt maar feitelijk onjuist is. Dit geldt in het bijzonder voor actuele regelgeving, tarieven, procedures en deadlines.<br><br>
  De verstrekte informatie is algemeen van aard en vormt geen individueel juridisch, fiscaal, financieel of medisch advies. Controleer genoemde bronnen altijd zelf en raadpleeg voor beslissingen met juridische of financiële gevolgen een gekwalificeerde adviseur.<br><br>
  Bij de Correspondentie-assistent geldt aanvullend: brieven in de modus "cache" zijn samengesteld uit vooraf geverifieerde templates; brieven in de modi "basis" en "vrij" zijn door AI gegenereerd en dienen door de gebruiker te worden gecontroleerd alvorens te worden verzonden.<br><br>
  Gebruik van de AI-gestuurde tools is op eigen verantwoordelijkheid.
</div>

<!-- ============================================================ -->
<h2 id="klachten">17. Klachten</h2>

<p>Heeft u een klacht over hoe wij met uw privacy omgaan? Neem dan eerst contact op via info@communitiesabroad.com, zodat wij samen een oplossing kunnen vinden. U heeft daarnaast altijd het recht een klacht in te dienen bij de <strong>Autoriteit Persoonsgegevens</strong> (autoriteitpersoonsgegevens.nl).</p>

<!-- ============================================================ -->
<h2 id="wijzigingen">18. Wijzigingen</h2>

<p>Dit privacybeleid kan van tijd tot tijd worden gewijzigd. De meest actuele versie vindt u altijd op deze pagina, met de datum van de laatste update bovenaan. Substantiële wijzigingen worden minimaal 30 dagen voor inwerkingtreding gecommuniceerd via e-mail aan geregistreerde gebruikers en gepubliceerd op de betreffende platforms.</p>

<!-- ============================================================ -->
<div class="ca-privacy-changelog">
  <p class="ca-privacy-changelog-title">Wijzigingslog</p>
  <p><strong>Versie 2.2</strong> — 22 april 2026<br>
  Wijzigingen ten opzichte van versie 2.1:</p>
  <ul>
    <li>Terminologische verduidelijking: de term "ecosysteem" is vervangen door "netwerk van platforms" in de gehele tekst, inclusief de titel van artikel 3 en de daaraan gekoppelde anchor-id's.</li>
  </ul>
  <p><strong>Versie 2.1</strong> — 12 april 2026<br>
  Wijzigingen ten opzichte van versie 2.0 (24 februari 2026):</p>
  <ul>
    <li>AI-verwerker gewijzigd van Google (Gemini API) naar Anthropic PBC (Claude API), inclusief vermelding van Zero Data Retention (artikelen 5, 6, 9.4, 12).</li>
    <li>Correspondentie-assistent toegevoegd als dienst, inclusief beschrijving van klikstromen, drie generatiemodi, contactkaarten en AI-auditeur (artikelen 3, 4, 7, 10, 12, 16).</li>
    <li>Financieel Kompas en EnergiePortaal toegevoegd als interactieve tools (artikelen 3, 4, 12).</li>
    <li>Nieuw artikel 8 over lokale opslag in de browser (localStorage), inclusief contactkaarten en optionele synchronisatie met DossierFrankrijk.</li>
    <li>Mailchimp (Intuit Inc.) vermeld als e-mailmarketingprovider (artikelen 5, 6).</li>
    <li>Spelling "InfoFrankrijk" gecorrigeerd naar "Infofrankrijk" in het gehele document.</li>
    <li>SSO-notitie uitgebreid met vermelding van Correspondentie-assistent, Financieel Kompas en EnergiePortaal (artikel 12).</li>
    <li>DossierFrankrijk artikel 11.2 uitgebreid met opslag van brieven en contactkaarten uit de Correspondentie-assistent.</li>
  </ul>
</div>

<!-- ============================================================ -->
<div class="ca-privacy-footer">
  <p><strong>Communities Abroad</strong><br>
  Landgoed de Stille Wille 174 · 5091 WE Oirschot · Nederland<br>
  KvK 55741509 · info@communitiesabroad.com<br><br>
  Deze privacyverklaring is van toepassing op het volledige netwerk van platforms: Infofrankrijk.com, Nederlanders.fr, Nedergids.nl, DoctorsOnMaps.com, CaféClaude.fr, DossierFrankrijk.nl en Frankrijknieuws.</p>
</div>

</div>`;

export default function PrivacyverklaringPage() {
  return (
    <section className="bg-white py-12">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </section>
  );
}
