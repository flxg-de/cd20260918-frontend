# OPITZ CONSULTING — Design System

A brand & UI design system for **OPITZ CONSULTING**, derived from the official
corporate PowerPoint templates ("OC_Master_2021"). Its primary purpose is to
generate well-branded **company presentations / slide decks**, plus supporting
web UI and marketing surfaces, that look unmistakably "OC".

> **OC Slide Deck** — for Company PowerPoint Presentations and branded artifacts.

---

## 1. Company context

OPITZ CONSULTING is a German IT consultancy — a self-described
**"Digital Service Manufacture"** (Digitale Service Manufaktur). Founded **1990**
by Peter Dix, Bernhard Opitz and Rolf Scheuch in Bensberg near Cologne; still
**owner-managed, now in the second generation** (Dr. Sarah Opitz; MD Tom Gansor).

- **Tagline / north star:** *"Next step in digitalization — next level of automation."*
- **Positioning:** *"IT Driven Business Innovation. Data Driven Business Value."*
- **Scale:** 30+ years, 400–545 employees, **8 locations in Germany + 1 in Poland**
  (Gummersbach HQ, Hamburg, Berlin, Nuremberg, Munich, Stuttgart, Essen, Bad Homburg,
  Kraków/Katowice), ~€60.4m turnover (2024).
- **What they do:** IT consulting, individual application development, system
  integration, analytics & AI, cloud/scalable infrastructure, managed services
  (end-to-end). Partners: AWS (Advanced Consulting Partner), Oracle, Microsoft.
- **Four value pillars:** **MODERN** (IT Modernization), **AUTOMATED**
  (Intelligent Automation), **SAFE** (Security), **INTEGRATED** (System-Integration).
- **Audience:** decision-makers in the German *Mittelstand* (upper middle-class
  companies) and large enterprises (Lufthansa CityLine, thyssenkrupp Steel, BSH, etc.).

### Sources used to build this system
- `sources/Vorlage-Unternehmenspraesi.pptx` — the master corporate "About Us"
  presentation (18 slides, 48 layouts, 2 masters). Theme **"Opitz Farben"** +
  font scheme **"Opitz Schriften"**. **Primary source of truth.**
- `sources/Chartpool.pptx` — a 121-slide library of chart/diagram templates.
- `sources/Icon-Bibliothek.pptx` — "Icon Bibliothek 2026", a 24-category catalog
  of flat icons (Finance, Data Analytics, Team, Technology, Arrows, etc.).
- Extracted media lives in `sources/template-media/`; curated assets in `assets/`.

---

## 2. CONTENT FUNDAMENTALS — how OC writes

**Primary language is GERMAN.** OPITZ's customers are predominantly German, so all
deliverables in this system (slides, deck template, website kit, landing page)
ship in German; English is available as a secondary variant. The copy is written
to sound **confident, modern, and engineering-credible** without hype. Use formal
**"Sie"** when addressing customers; "wir"/"unsere Kunden" for the company voice.

- **Voice:** first-person plural — **"we", "our customers"**. Collaborative and
  partner-like ("at eye level", *"auf Augenhöhe"*), not vendor-y. Customers are
  central: *"We measure our success by the success of our customers."*
- **Tone:** assured, factual, forward-looking. Leans on **proof** — concrete
  numbers (91% satisfaction, NPS 40.26, >130 managed-service customers, >5000
  databases, >99.5% SLA), named clients, and partner badges.
- **Casing:** section labels and titles are frequently **UPPERCASE** or
  Title-with-emphatic-CAPS (e.g. "ManufaCTURe", "#Digital SERVICE"). Display
  headers are uppercase, set in Open Sans ExtraBold.
- **The "#" motif (signature):** topic labels are prefixed with a hashtag —
  **`#HISTORY`, `#LOCATIONs`, `#Figures`, `#OUR PROJECTS`, `#CLIENTS`,
  `#Partners`, `#Management`, `#Added value`, `#TECHNOLOGY & COMPETENCES`,
  `#Digital Product Journey`**. The hashtag is a brand device, not literal social
  tagging. Brand hashtags also act as slogans: **`#futureeffective`**
  (*#zukunftswirksam*), `#Digital Service Manufacture`.
- **Adjective triads:** capabilities are summarised in rhythmic triples —
  *"Modern. Integrated. Automated. Secure."*; *"sustainable – long-term –
  successful"*; *"flexible – automated – efficient"*; *"smart – intelligent –
  dependable"*. Use the **en-dash " – "** separator.
- **Quotes:** testimonials use German typographic quotes **„ … "** (low-open,
  high-close), attributed to a named person + role + company.
- **Emoji:** **none.** Never use emoji. The hashtag and the flat icon set carry
  visual shorthand instead.
- **Numbers:** German formatting (comma decimal: "60,4 Mio. €", "99,5 %",
  "NPS 40,26"). Match the locale of the deck you are producing.
- **Official section labels (verbatim, German)** — use these exact `#` eyebrows:
  `#Digitale Service Manufaktur`, `#Geschichte`, `#Wirkungsstätten` (locations),
  `#Zahlenwerk` (figures), `#Unsere Projekte`, `#Kunden`, `#Partner`,
  `#Management`, `#Mehrwert`, `#Technologie & Kompetenzen`,
  `#Digital Product Journey`. Closing tagline: **`#undweiter Zusammen erfolgreich`**.
  The four value pillars are **MODERN · AUTOMATISIERT · SICHER · INTEGRIERT**
  (disciplines: IT-Modernisierung · Intelligent Automation · Security ·
  Systemintegration). Footer classification line: `Öffentlich / Interner Gebrauch
  / Vertraulich / Streng vertraulich`.

**Examples to emulate (official German wording)**
> „Gemeinsam mit unseren Kunden machen wir IT zum Erfolgsfaktor und
> digitalisieren die individuellen Wettbewerbsvorteile von morgen.“
> „Unsere individuellen IT-Lösungen sind im Jetzt und #zukunftswirksam.
> Modern. Integriert. Automatisiert. Sicher.“
> „Wir sind seit 1990 ein inhabergeführtes Unternehmen und werden es in zweiter
> Generation weiterhin sein.“ — Bernhard und Sarah Opitz
> „Unseren Erfolg messen wir am Erfolg unserer Kunden.“ — Tom Gansor

> The English slogan **„Next step in digitalization – next level of automation“**
> appears verbatim (in English) even in German decks — it is the brand tagline.

---

## 3. VISUAL FOUNDATIONS

**Overall feel:** corporate-tech, clean, geometric, high-contrast. White-dominant
canvases punctuated by saturated brand **blue**, deep **navy**, and a sparing
**signal red**. Confident and orderly — engineering precision, not playful.

### Color
- Core palette (theme "Opitz Farben"): **blue `#0066E8`** (primary), **navy
  `#003066`**, **signal red `#E82000`**, **silver `#C0C0C0`**, **gray `#606060`**,
  **ink `#313338`** (text), white. A **light blue `#5C9DF2`** tint appears in stat
  bubbles/charts.
- **Blue is the workhorse** — fills, links, key figures, primary actions.
  **Navy** anchors dark surfaces and secondary fills. **Red is rare** — reserved
  for a single point of emphasis (one bar in a chart, a key word). Never wash a
  layout in red.
- Charts cycle **gray → red → navy → blue** across categories/years (see
  `assets/brand/turnover-chart.png`). Stat bubbles cycle blue / navy / light-blue
  / gray (see `assets/brand/locations-bubbles.png`).
- Backgrounds are **white** or **navy/dark** for hero/section moments; tints are
  pale blue (`--oc-blue-100`) or light gray (`--oc-gray-100`).

### Type
- **Open Sans** throughout. Display/headers = **ExtraBold (800), UPPERCASE,
  tight tracking**. Body = Regular/Semibold. Light (300) for large lead-ins.
  Mono accents (code, classification) = **Consolas**.
- Big numbers are a hallmark: huge ExtraBold figures (`545`, `91%`, `60,4`) paired
  with small uppercase labels.

### Layout & backgrounds
- **16:9** decks (1280×720 / 1920×1080). Generous white space; left-aligned
  text blocks; strong baseline grid.
- Imagery: **cool, blue-toned tech photography** (binary/DNA streams, night-city
  network meshes, abstract connection spheres) for heroes; **warm German
  countryside / office** photos for the human/"history" story; conceptual stock
  (puzzle pieces, mountain teamwork) for value slides. Full-bleed or angled-edge
  picture placeholders.
- Recurring graphic devices: **stat bubbles** (filled circles, big number + label),
  **plain bar charts** in brand colors, **circular "journey" wheels**
  (`assets/diagrams/digital-product-journey.png`), and the **triangle + signal-waves
  logo mark** — a deep-navy triangle (`#003A6F`) with three nested signal waves in
  **blue `#0068B4`, amber `#F7AD00`, red `#E82000`**. The mark is **multi-color on
  light** backgrounds and **all-white in reverse** on navy/photos. The wordmark
  "OPITZ" is ink, "CONSULTING" is letter-spaced. Use it full-color, never recolor
  the waves.

### Borders, radius, shadow, surfaces
- **Modest radii** — buttons/cards ~6px; bubbles/chips fully round. The brand is
  more rectilinear than rounded.
- **Flat-first.** Shadows are soft and cool-neutral, used sparingly to lift cards.
  Dividers are **hairline silver/gray** (`--oc-gray-200/400`).
- Cards = white surface, hairline border, optional soft shadow; or a solid
  blue/navy fill with white content for emphasis tiles.

### Motion & states
- Calm, professional motion: short fades / slides (`--dur-base` 200ms,
  `--ease-out`). No bounce, no decorative loops on content. Respect
  `prefers-reduced-motion`.
- **Hover:** primary actions darken (`--oc-blue` → `--oc-blue-700`); ghost/link
  elements pick up a pale blue wash (`--oc-blue-100`). **Press:** slightly darker,
  no large scale changes (a subtle 1px translate at most).
- **Focus:** 3px soft blue ring (`--focus-ring`).

### Transparency & blur
- Used lightly — overlay gradients (navy→transparent) to seat white text over
  photos; occasional low-opacity map/silhouette watermarks. No heavy glassmorphism.

### Signature footer (compliance)
Every master slide carries an **ISO 27001 classification footer**:
`© OPITZ CONSULTING <year>  /` · `ABOUT OPITZ CONSULTING` · page number, with a
classification word (**Publicly / Internal use / Confidential / Strictly
confidential** — DE: *Öffentlich / Interner Gebrauch / Vertraulich / Streng
vertraulich*). Reproduce this on branded decks.

---

## 4. ICONOGRAPHY

- **Style:** flat, **single-color filled** pictograms (a few are thin-outline),
  geometric, rounded terminals — the Microsoft Office "Icons_" family as shipped
  in the OC template, recolored to brand. **On color fills they are white**; on
  white they are **brand blue** or **ink**.
- The official **"Icon Bibliothek 2026"** organises icons into 24 themes: Finance
  & Business Strategy, Vehicles & Transport, Data Analytics & Processing,
  E-Commerce & Payment, Team/People/Education, Medicine & Fitness,
  Customers & Community, Food & Hotel, Creativity & Marketing, Search & SEO,
  Environment & Global, Delivery & Logistics, Technology & Devices,
  Arrows & Symbols, Real Estate & Construction, Time & Money, Travel & Summer,
  Social Media, Business People, Support & Development, Office & Management,
  Start-up & Insurance.
- **Copied into `assets/icons/`** (normalized to `fill="currentColor"` so they
  inherit text color): `database, cloud-sync, target, people-growth, idea-gear,
  code, lock, blockchain, ai-head, magic-wand, smiley-question, head-gears,
  handshake, search, award`. These cover OC's core themes (data, security, AI,
  automation, partnership, growth).
- **Substitution / extension:** for icons not in the copied subset, use
  **[Lucide](https://lucide.dev)** (CDN) — closest match for stroke/fill balance
  — OR a filled set; keep one style per artifact. ⚠️ *Flagged: the copied icons
  are the Office set recolored, not a bespoke OC icon font.*
- **Emoji:** never. **Unicode glyphs:** only the typographic **„ "** quotes and
  the **#** hashtag device. Arrows use the icon set, not unicode.

---

## 5. Index / manifest

```
styles.css                  ← consumers link THIS (only @imports)
tokens/
  fonts.css                 Open Sans (Google Fonts CDN) + Consolas mono
  colors.css                brand ramp + semantic aliases
  typography.css            families, weights, scale, helper classes
  spacing.css               spacing, radius, shadow, motion, layout
  base.css                  light resets, .oc-hash, .oc-bubble utilities
guidelines/                 14 foundation specimen cards (@dsCard) → Design System tab
components/
  core/      Button · Badge · Card · Eyebrow · Quote   (+ .d.ts, .prompt.md, card)
  brand/     Logo · LogoMark
  forms/     Input
  charts/    ColumnChart · BarChart · LineChart · DonutChart  (Säulen/Balken/Linien/Kreis)
slides/                     7 ready 1280×720 layouts + slide.css, oc-logo.js, oc-icons.js
  01-title · 02-agenda · 03-section · 04-value-pillars · 05-figures · 06-quote · 07-closing
templates/
  company-deck/             OPITZ Company Deck — copyable 4-slide deck (Design Component)
ui_kits/website/            full OPITZ marketing homepage recreation (index.html + Site.jsx)
assets/
  logos/   oc-logo-mark.svg          (multi-color triangle + signal-waves mark)
  icons/   *.svg                     (15 brand icons, currentColor)
  backgrounds/  bg-binary-dna.png, bg-city-network.jpeg, bg-network-sphere.png
  photos/  hq-gummersbach.png, teamwork-mountain.png, puzzle.png
  brand/   locations-bubbles.png, turnover-chart.png
  diagrams/ digital-product-journey.png
sources/                    original .pptx + raw extracted media (reference)
SKILL.md                    Agent-Skills entry point
```

**Components** (import from `window.OPITZCONSULTINGDesignSystem_dd6368`):
`Button`, `Badge`, `Card`, `Eyebrow`, `Quote`, `StatBubble`, `Input`, `Logo`, `LogoMark`,
`ColumnChart`, `BarChart`, `LineChart`, `DonutChart`.

Charts are pure-SVG (no dependencies) and cycle the brand chart palette
(`--chart-1…6` = blue, navy, light-blue, gray, red, ink) — derived from the
Chartpool's theme accent order. They cover the four Chartpool diagram types:
Säulendiagramm, Balkendiagramm, Liniendiagramm, Kreisdiagramm.

See the **Design System tab** for live token / component / slide cards.
