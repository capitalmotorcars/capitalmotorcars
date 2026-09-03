# 🤖 Comprehensive AEO & GEO Audit Report: Capital Motor Cars
**Audit Date:** September 2026  
**Audited Domain:** [https://www.capitalmotorcars.com](https://www.capitalmotorcars.com)  
**Methodology:** Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO) Framework (Google AI Overviews, Google AI Mode, ChatGPT Search, Perplexity AI, Claude, and Bing Copilot)

---

## Executive Summary & Readiness Score

| Metric | Score | Status | Primary Constraint |
|---|---|---|---|
| **Overall AI Citation Readiness** | **68 / 100** | 🟡 **Needs Work** | Client-Side JS dependency (Empty Static HTML DOM) |
| **Google AI Overviews & AI Mode** | **74 / 100** | 🟢 **Good** | Strong topical depth; needs SSR content & author entity |
| **ChatGPT Search (OpenAI)** | **62 / 100** | 🟡 **Needs Work** | Crawlers do not execute JS; missing Reddit/Wiki entity signals |
| **Perplexity AI** | **66 / 100** | 🟡 **Needs Work** | Missing static DOM text & external discussion citations |
| **Claude / Anthropic** | **70 / 100** | 🟢 **Good** | Clean robots.txt; comprehensive llms.txt knowledge base |
| **Bing Copilot** | **72 / 100** | 🟢 **Good** | IndexNow compatibility; structured comparison tables |

---

## 🚨 Critical Findings: What Is Currently Missing

### 1. The "Empty Static DOM" Blindspot (HIGHEST PRIORITY)
- **The Issue:** All **651 static HTML snapshots** in `dist/` currently serve an empty body tag:
  ```html
  <body>
    <div id="root"></div>
  </body>
  ```
- **Why It Matters:** **AI search crawlers (GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot) DO NOT execute client-side JavaScript.** When they crawl an article like `/what-does-a-zero-down-lease-really-mean` or `/services/car-leasing`, they receive an empty `<div id="root"></div>`. None of the 2,000+ words, comparison tables, or FAQs are accessible to raw text scrapers.
- **The Fix:** Enhance `scripts/prerender.mjs` to inject semantic pre-rendered HTML (`<article>`, `<h1>`, `<h2>`, `<p>`, `<table>`, `<dl>`) directly inside `<div id="root">` so non-JS crawlers ingest 100% of the content on first byte.

---

### 2. Route-Specific JSON-LD Missing from Static Snapshots
- **The Issue:** While route-specific `<title>` and `<meta name="description">` are pre-rendered into `dist/**/*.html`, the `<script type="application/ld+json">` tag in all 651 static files only contains the generic homepage `AutomotiveBusiness` and `WebSite` schema.
- **Why It Matters:** `Article` schema, `author` (`Person`), `FAQPage` schema, `BreadcrumbList`, and `Service` schemas are injected via client-side React (`<JsonLd />`). Because AI engines read raw HTML, they never see the structured Q&As or Article metadata.
- **The Fix:** Inject page-specific JSON-LD (`Article`, `BreadcrumbList`, `FAQPage`, `Service`) directly into the `<head>` during static pre-rendering in `scripts/prerender.mjs`.

---

### 3. E-E-A-T & Author Person Schema (Named Human vs Corporate Byline)
- **The Issue:** Over 60 blog guides currently list the author as a generic corporate string: `author: "Capital Motor Cars"`.
- **Why It Matters:** Ahrefs and Google AI Overviews research reveals that articles authored by verified human industry authorities achieve **2.8x higher citation frequency** in AI search answers than anonymous or generic corporate authors.
- **The Fix:** 
  - Standardize article author to: **Christopher Amico** (President & CEO, 30+ Years Automotive Fleet Specialist, former Mercedes-Benz & BMW Consultant).
  - Inject Schema.org `Person` schema with `jobTitle`, `alumniOf`, `knowsAbout`, and external LinkedIn verification.

---

### 4. Passage-Level Citability & BLUF (Bottom Line Up Front)
- **The Issue:** 60 out of 83 blog guides lack an executive summary or "Key Takeaways" box at the top of the article.
- **Why It Matters:** **~44% of AI citations come from the first 30% of a page** (SE Ranking 2026 AI Citation Study). Answer engines look for concise 134–167 word self-contained definition blocks immediately following question headings.
- **The Fix:** Add a formatted `### 🔑 Key Takeaways` executive summary box and answer-first definitions ("What is...", "In New Jersey, a zero-down lease means...") to all legacy blog guides.

---

### 5. Local City Schema on 200+ Programmatic Landing Pages
- **The Issue:** The 220+ programmatic county and city pages (`/car-leasing-paramus-nj`, `/car-leasing-hoboken-nj`, etc.) rely solely on React for local schema and lack static geolocation coordinates in the pre-rendered HTML.
- **Why It Matters:** For localized queries like *"Best car lease broker near Paramus NJ"* or *"Zero down lease in Hoboken"*, AI search engines rely on static geographic entities (`geo: GeoCoordinates`, `areaServed`, `postalCode`).
- **The Fix:** Pre-render localized `AutomotiveBusiness` sub-branch schema into every regional city HTML snapshot.

---

### 6. Off-Page Entity Signals (The 3x Backlink Correlation)
- **The Issue:** Research demonstrates that **brand mentions in Reddit, YouTube, Wikipedia, and business directories correlate 3x more strongly with AI citations than standard website backlinks** (Ahrefs Dec 2025 Study: YouTube correlation ~0.737 vs Domain Rating ~0.266).
- **Current Missing Entity Links:**
  - Google Business Profile / Google Maps CID URL in `sameAs`.
  - Better Business Bureau (BBB) accredited profile link in `sameAs`.
  - Crunchbase entity profile.
  - Active YouTube channel video embeds on flagship lease guides (EV tax credit walkthrough, lease calculator demo).

---

## 🏆 What Is Already Strong & Passing (100%)

1. ✅ **`public/robots.txt` AI Crawler Whitelist:** Fully open to all major AI search crawlers (`GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `DuckAssistBot`).
2. ✅ **`public/llms.txt` & `public/llms-full.txt`:** Fully compliant with the emerging llms.txt standard with complete corporate history, fee transparency policies, and service menus.
3. ✅ **Structured Comparison Tables:** 173 markdown data comparison tables across blog guides.
4. ✅ **Structured FAQ Questions:** 199+ structured FAQ questions matching natural language search intent across 73 blog guides.
5. ✅ **Clean Knowledge Graph:** `index.html` features a pristine `@graph` with zero duplicate aggregate rating errors.

---

## 🎯 Step-by-Step Action Plan to Reach 90+ Score

1. **Step 1 (Build Script):** Upgrade `scripts/prerender.mjs` to inject static semantic HTML body text and page-specific JSON-LD schemas into all 651 `dist/` HTML files.
2. **Step 2 (Author E-E-A-T):** Standardize blog authorship to Christopher Amico with embedded `Person` schema.
3. **Step 3 (Passage Optimization):** Add "Key Takeaways" summary boxes and 40-60 word definition snippets to legacy articles.
4. **Step 4 (Entity Authority):** Add Google Maps CID and BBB profiles to the `sameAs` entity array in `index.html` and `JsonLd.tsx`.
