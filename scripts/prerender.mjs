import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");

if (!fs.existsSync(distDir)) {
  console.log("dist directory not found. Please run vite build first.");
  process.exit(0);
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatSlugToTitle(slug) {
  if (!slug) return "Capital Motor Cars";
  const parts = slug.replace(/^car-leasing-/, "").replace(/-nj$/, "").split("-");
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

function renderMarkdownToHtml(markdown) {
  if (!markdown) return "";
  const lines = markdown.split("\n");
  let html = "";
  let tableRows = [];
  let listItems = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      if (inList) {
        html += `<ul class="list-disc pl-6 mb-4 space-y-1">${listItems.map(item => `<li>${item}</li>`).join("")}</ul>`;
        inList = false;
        listItems = [];
      }
      continue;
    }

    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      html += "<hr class=\"my-8 border-t border-border/40\" />";
      continue;
    }

    if (line.startsWith("### ")) {
      html += `<h3 class="text-xl font-bold mt-6 mb-3 text-foreground">${escapeHtml(line.replace(/^###\s+/, ""))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      html += `<h2 class="text-2xl font-black mt-8 mb-4 text-foreground tracking-tight">${escapeHtml(line.replace(/^##\s+/, ""))}</h2>`;
      continue;
    }

    if (line.startsWith("|")) {
      tableRows.push(line);
      if (i === lines.length - 1 || !lines[i + 1].trim().startsWith("|")) {
        const headers = tableRows[0].split("|").map(c => c.trim()).filter(Boolean);
        const rows = tableRows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
        html += `<div class="overflow-x-auto my-6 border border-accent/20 rounded-2xl"><table class="w-full text-left border-collapse"><thead class="bg-accent/5"><tr>`;
        headers.forEach(h => { html += `<th class="p-3 text-sm font-bold uppercase">${escapeHtml(h)}</th>`; });
        html += `</tr></thead><tbody>`;
        rows.forEach(r => {
          html += `<tr class="border-b border-accent/10">`;
          r.forEach(c => { html += `<td class="p-3 text-sm">${escapeHtml(c)}</td>`; });
          html += `</tr>`;
        });
        html += `</tbody></table></div>`;
        tableRows = [];
      }
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      inList = true;
      listItems.push(escapeHtml(line.replace(/^[-*]\s+/, "")));
      continue;
    }

    if (inList) {
      html += `<ul class="list-disc pl-6 mb-4 space-y-1">${listItems.map(item => `<li>${item}</li>`).join("")}</ul>`;
      inList = false;
      listItems = [];
    }

    html += `<p class="mb-4 leading-relaxed text-muted-foreground">${escapeHtml(line)}</p>`;
  }

  if (inList) {
    html += `<ul class="list-disc pl-6 mb-4 space-y-1">${listItems.map(item => `<li>${item}</li>`).join("")}</ul>`;
  }

  return html;
}

function extractFaqsFromContent(content) {
  const faqs = [];
  if (!content) return faqs;
  const parts = content.split(/### Frequently Asked Questions/i);
  if (parts.length < 2) return faqs;

  const faqText = parts[1];
  const qRegex = /###\s+([^\n\r?]+(?:\?|:))\s*([\s\S]*?)(?=(?:###|\n\n--|$))/g;
  let match;
  while ((match = qRegex.exec(faqText)) !== null) {
    const q = match[1].trim();
    const a = match[2].trim().replace(/\n+/g, " ").slice(0, 350);
    if (q && a) {
      faqs.push({ question: q, answer: a });
    }
  }
  return faqs;
}

// 1. Load blog dictionary from mockBlogs.ts using esbuild
let blogMap = new Map();
try {
  const js = execSync("npx esbuild src/data/mockBlogs.ts --format=cjs", { maxBuffer: 25 * 1024 * 1024 }).toString();
  const mod = { exports: {} };
  const fn = new Function("module", "exports", js);
  fn(mod, mod.exports);
  const blogs = mod.exports.mockBlogs || [];
  for (const b of blogs) {
    if (b && b.slug) {
      blogMap.set(b.slug, b);
    }
  }
  console.log(`Loaded ${blogMap.size} full blog posts from mockBlogs.`);
} catch (e) {
  console.warn("Could not load mockBlogs via esbuild:", e.message);
}

// Curated overrides for standard static pages
const curatedMeta = {
  "": {
    title: "New York & New Jersey's Trusted Auto Broker | Capital Motor Cars",
    description: "Experience stress-free car leasing and auto leasing with Capital Motor Cars. We negotiate the best car lease deals, SUV lease deals, and luxury car leasing in NJ & NY.",
  },
  "about": {
    title: "About Us | Capital Motor Cars | Our Story & Leadership",
    description: "Car leasing and auto broker concierge experts in New Jersey and New York. Learn about our story, founder Christopher Amico, and transparent pricing model.",
  },
  "services": {
    title: "Car Leasing & Auto Broker Services | Capital Motor Cars NJ",
    description: "Comprehensive auto leasing, trade-in valuation, lease returns, credit assistance, and doorstep delivery services in New Jersey and New York.",
  },
  "services/car-leasing": {
    title: "Car Leasing Services NJ & NY | Capital Motor Cars",
    description: "Stress free car leasing in New Jersey and New York. Pre-negotiated wholesale fleet pricing, zero dealer markup, and free home delivery.",
  },
  "services/credit": {
    title: "Car Lease Financing & Credit Assistance | Capital Motor Cars",
    description: "Fast, secure auto lease approvals and transparent credit guidance. We work with captive finance banks to get you approved at true buy-rate terms.",
  },
  "services/trade-in": {
    title: "Vehicle Trade-In & Equity Extraction | Capital Motor Cars",
    description: "Appraise and trade in your existing vehicle. Extract positive lease equity or roll value seamlessly into your next new car lease.",
  },
  "trade-in-value": {
    title: "Instant Trade-In Value Estimate | Capital Motor Cars NJ",
    description: "Get an accurate, market-grounded trade-in valuation for your car in minutes. Transparent appraisals with zero lowball dealership games.",
  },
  "services/lease-return": {
    title: "Car Lease Return Service NJ | Capital Motor Cars",
    description: "Pre-return inspection, disposition fee guidance, and repair coordination so you return your leased vehicle without surprise penalty fees.",
  },
  "lease-calculator": {
    title: "Car Lease Calculator NJ | Capital Motor Cars",
    description: "Broker-grade lease payment calculator for New Jersey drivers. Calculate monthly payment, money factor, residual, and NJ EV sales tax savings.",
  },
  "brands": {
    title: "All Car Brands & Vehicle Makes | Capital Motor Cars",
    description: "Explore lease specials across all major luxury, SUV, performance, and electric vehicle brands including BMW, Mercedes, Audi, Porsche, and Kia.",
  },
  "contact": {
    title: "Contact Capital Motor Cars | New Jersey Auto Broker Concierge",
    description: "Get in touch with our auto leasing consultants in Springfield, Marlton, and Edgewater NJ. Request a transparent, zero-markup vehicle quote.",
  },
  "credit-application": {
    title: "Secure Online Credit Application | Capital Motor Cars",
    description: "Apply online in minutes with 256-bit encryption. Fast approvals for new car lease and finance deals with top tier automotive lenders.",
  },
  "blog": {
    title: "Auto Leasing Guides, Reviews & Market Insights | Capital Motor Cars",
    description: "Expert automotive advice, model reliability reviews, lease vs buy comparisons, and monthly car lease deal breakdowns.",
  },
  "car-lease-deals-new-jersey": {
    title: "Best Car Lease Deals in New Jersey (2026 Specials) | $0 Down | Capital Motor Cars",
    description: "Explore the best 2026 car lease deals in New Jersey with $0 down payment options, pre-negotiated wholesale fleet pricing, and free doorstep delivery across NJ.",
  },
};

// Add all blogs into curatedMeta
for (const [slug, blog] of blogMap.entries()) {
  curatedMeta[slug] = {
    title: `${blog.seo_title || blog.title} | Capital Motor Cars`,
    description: (blog.seo_description || blog.excerpt || blog.title).slice(0, 160),
    isBlog: true,
    blogData: blog
  };
}

// Read sitemap.xml to extract all URLs
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
  const locMatches = [...sitemapXml.matchAll(/<loc>https:\/\/www\.capitalmotorcars\.com\/?([^<]*)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1].replace(/^\/|\/$/g, "")).filter(Boolean);
}

const allRoutes = new Set([...Object.keys(curatedMeta).filter(Boolean), ...sitemapUrls]);
let generatedCount = 0;

for (const routePath of allRoutes) {
  const targetDir = path.join(distDir, routePath);
  fs.mkdirSync(targetDir, { recursive: true });

  const canonicalUrl = `https://www.capitalmotorcars.com/${routePath}`;
  let title = `${formatSlugToTitle(routePath)} | Capital Motor Cars`;
  let description = `Explore the best lease deals, zero-markup pricing, and free doorstep delivery on ${formatSlugToTitle(routePath)} with Capital Motor Cars.`;
  let isBlog = false;
  let blogData = null;

  if (curatedMeta[routePath]) {
    title = curatedMeta[routePath].title;
    description = curatedMeta[routePath].description;
    isBlog = Boolean(curatedMeta[routePath].isBlog);
    blogData = curatedMeta[routePath].blogData;
  } else if (routePath.endsWith("-lease-deals-nj") || routePath.includes("-lease-deals-")) {
    title = `${formatSlugToTitle(routePath)} Lease Deals NJ | Capital Motor Cars`;
    description = `Compare best monthly lease specials and zero down terms on ${formatSlugToTitle(routePath)} in New Jersey. Free doorstep delivery.`;
  } else if (routePath.startsWith("car-leasing-")) {
    title = `Car Leasing in ${formatSlugToTitle(routePath)}, NJ | Capital Motor Cars Auto Broker`;
    description = `Stress-free car leasing and auto broker concierge in ${formatSlugToTitle(routePath)}, New Jersey. Wholesale fleet pricing and home delivery.`;
  }

  let pageHtml = baseIndexHtml;
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}<\/title>`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`);
  pageHtml = pageHtml.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}">`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}">`);

  // Build semantic pre-rendered body HTML & JSON-LD
  let semanticBody = "";
  let routeSchemaJson = null;
  if (isBlog && blogData) {
    const renderedContent = renderMarkdownToHtml(blogData.content);
    const faqs = extractFaqsFromContent(blogData.content);
    const isProblemArticle = /reliability|squeak|problem|issue|repair|maintenance|broken|fault|noise|defect|key|lock|bearing|transmission|hybrid|battery|engine/i.test(blogData.slug + " " + blogData.title + " " + (blogData.seo_keywords || ""));
    const repairCardHtml = isProblemArticle ? `
      <aside aria-label="Repair to Lease Upgrade" class="my-12 p-8 rounded-3xl border-2 border-accent/30 bg-card/60 shadow-xl">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-white mb-3">Smart Ownership Upgrade</span>
        <h3 class="text-2xl md:text-3xl font-black text-foreground mb-3">Tired of Repair Bills &amp; Mechanical Headaches?</h3>
        <p class="text-muted-foreground text-base leading-relaxed mb-6">Don&apos;t pour thousands into aging parts, brake overhauls, or transmission diagnostics. Trade in your vehicle at top market value—even with existing squeaks or issues—and drive a brand-new 2026 vehicle with <strong>$0 down</strong> and <strong>complete factory warranty coverage</strong>.</p>
        <div class="flex flex-wrap gap-4">
          <a href="/trade-in-value" class="inline-block bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-accent/90">Value Your Trade-In &amp; Get Lease Quote &rarr;</a>
          <a href="/car-lease-deals-new-jersey" class="inline-block border border-accent/30 text-foreground font-bold px-6 py-3 rounded-xl hover:bg-accent/10">Browse NJ Lease Specials</a>
          <a href="tel:12015095555" class="inline-block text-accent font-bold py-3 px-2">Call (201) 509-5555</a>
        </div>
      </aside>` : "";

    semanticBody = `
<div id="root">
  <main class="min-h-screen bg-background text-foreground">
    <article class="max-w-4xl mx-auto px-4 py-12">
      <header class="mb-8">
        <nav aria-label="Breadcrumb" class="text-sm text-muted-foreground mb-4">
          <a href="/" class="hover:underline">Home</a> &gt; <a href="/blog" class="hover:underline">Blog</a> &gt; <span>${escapeHtml(blogData.title)}</span>
        </nav>
        <h1 class="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">${escapeHtml(blogData.title)}</h1>
        <div class="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span>By <strong>Christopher Amico</strong> (President & CEO)</span>
          <span>•</span>
          <time datetime="${blogData.published_at || "2026-08-01"}">${new Date(blogData.published_at || "2026-08-01").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
        </div>
        ${blogData.excerpt ? `<p class="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 py-1 mb-8">${escapeHtml(blogData.excerpt)}</p>` : ""}
      </header>
      <div class="prose dark:prose-invert max-w-none text-foreground">
        ${renderedContent}
      </div>
      ${repairCardHtml}
      <footer class="mt-16 p-6 rounded-2xl border border-accent/20 bg-card">
        <h3 class="text-lg font-bold">About the Author: Christopher Amico</h3>
        <p class="text-sm text-muted-foreground mt-1">Christopher Amico has over 30 years of automotive industry experience, including corporate background at Mercedes-Benz and consulting for BMW North America. He founded Capital Motor Cars to bring transparent wholesale fleet pricing, true bank buy-rate financing, and zero dealership games to car leasing in New Jersey and New York.</p>
        <p class="mt-3"><a href="/contact" class="text-accent font-semibold hover:underline">Contact Capital Motor Cars</a> | Call: (201) 509-5555</p>
      </footer>
    </article>
  </main>
</div>`;

    const schemaGraph = [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        "isPartOf": { "@id": "https://www.capitalmotorcars.com/#website" },
        "headline": blogData.title,
        "description": blogData.excerpt || blogData.seo_description || description,
        "url": canonicalUrl,
        "datePublished": blogData.published_at || "2026-08-01T00:00:00Z",
        "dateModified": "2026-09-03T00:00:00Z",
        "mainEntityOfPage": canonicalUrl,
        "author": {
          "@type": "Person",
          "name": "Christopher Amico",
          "jobTitle": "President & CEO",
          "worksFor": { "@id": "https://www.capitalmotorcars.com/#organization" },
          "sameAs": "https://www.linkedin.com/company/capital-motor-cars/"
        },
        "publisher": { "@id": "https://www.capitalmotorcars.com/#organization" },
        "image": blogData.cover_image_url || "https://www.capitalmotorcars.com/og/hero-bg.jpg"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.capitalmotorcars.com/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.capitalmotorcars.com/blog" },
          { "@type": "ListItem", "position": 3, "name": blogData.title, "item": canonicalUrl }
        ]
      }
    ];

    if (faqs.length > 0) {
      schemaGraph.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      });
    }

    routeSchemaJson = {
      "@context": "https://schema.org",
      "@graph": schemaGraph
    };
  } else if (routePath.startsWith("services/")) {
    const serviceName = formatSlugToTitle(routePath.replace("services/", ""));
    semanticBody = `
<div id="root">
  <main class="min-h-screen bg-background text-foreground">
    <section class="max-w-4xl mx-auto px-4 py-12">
      <nav aria-label="Breadcrumb" class="text-sm text-muted-foreground mb-4">
        <a href="/" class="hover:underline">Home</a> &gt; <a href="/services" class="hover:underline">Services</a> &gt; <span>${escapeHtml(serviceName)}</span>
      </nav>
      <h1 class="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">${escapeHtml(title)}</h1>
      <p class="text-lg text-muted-foreground leading-relaxed mb-8">${escapeHtml(description)}</p>
      <div class="p-6 rounded-2xl border border-accent/20 bg-card mb-8">
        <h2 class="text-xl font-bold mb-2">Why Lease with Capital Motor Cars</h2>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Pre-negotiated wholesale fleet pricing ($1,500 to $4,000 below retail MSRP)</li>
          <li>Direct captive bank buy-rates with zero dealer APR markups</li>
          <li>$0 mandatory dealer add-on fees</li>
          <li>White-glove doorstep vehicle delivery across New Jersey and New York</li>
        </ul>
      </div>
      <p><a href="/contact" class="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">Request a Custom Quote</a> or call <a href="tel:+12015095555" class="font-bold">(201) 509-5555</a></p>
    </section>
  </main>
</div>`;

    routeSchemaJson = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${canonicalUrl}#service`,
          "name": `${serviceName} Services`,
          "description": description,
          "provider": { "@id": "https://www.capitalmotorcars.com/#organization" },
          "areaServed": ["New Jersey", "New York"],
          "url": canonicalUrl
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.capitalmotorcars.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.capitalmotorcars.com/services" },
            { "@type": "ListItem", "position": 3, "name": serviceName, "item": canonicalUrl }
          ]
        }
      ]
    };
  } else if (routePath.startsWith("car-leasing-")) {
    const cityName = formatSlugToTitle(routePath);
    semanticBody = `
<div id="root">
  <main class="min-h-screen bg-background text-foreground">
    <section class="max-w-4xl mx-auto px-4 py-12">
      <nav aria-label="Breadcrumb" class="text-sm text-muted-foreground mb-4">
        <a href="/" class="hover:underline">Home</a> &gt; <span>${escapeHtml(cityName)}</span>
      </nav>
      <h1 class="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">${escapeHtml(title)}</h1>
      <p class="text-lg text-muted-foreground leading-relaxed mb-8">${escapeHtml(description)}</p>
      <div class="p-6 rounded-2xl border border-accent/20 bg-card mb-8">
        <h2 class="text-xl font-bold mb-2">Car Leasing & Auto Broker Concierge in ${escapeHtml(cityName)}, NJ</h2>
        <p class="text-muted-foreground leading-relaxed mb-4">Capital Motor Cars delivers transparent wholesale fleet pricing, zero dealer markup, and complimentary white-glove doorstep delivery directly to your home or office in ${escapeHtml(cityName)} and surrounding New Jersey communities.</p>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>True $0 down payment lease specials</li>
          <li>All makes and models (BMW, Mercedes-Benz, Audi, Porsche, Range Rover, Genesis, Kia, Hyundai)</li>
          <li>Complete lease trade-in equity realization and lease-return support</li>
        </ul>
      </div>
      <p><a href="/contact" class="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">Get a Local Quote in ${escapeHtml(cityName)}</a> or call <a href="tel:+12015095555" class="font-bold">(201) 509-5555</a></p>
    </section>
  </main>
</div>`;

    routeSchemaJson = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutomotiveBusiness",
          "@id": `${canonicalUrl}#localbusiness`,
          "name": `Capital Motor Cars - ${cityName}`,
          "description": description,
          "parentOrganization": { "@id": "https://www.capitalmotorcars.com/#organization" },
          "areaServed": cityName,
          "telephone": "+1-201-509-5555",
          "url": canonicalUrl
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.capitalmotorcars.com/" },
            { "@type": "ListItem", "position": 2, "name": cityName, "item": canonicalUrl }
          ]
        }
      ]
    };
  }

  // Inject semantic body into <div id="root">
  if (semanticBody) {
    pageHtml = pageHtml.replace(/<div id=["']root["']><\/div>/i, semanticBody.trim());
  }

  // Inject route-specific JSON-LD into <head>
  if (routeSchemaJson) {
    const schemaTag = `\n  <script type="application/ld+json">\n${JSON.stringify(routeSchemaJson, null, 2)}\n  </script>\n</head>`;
    pageHtml = pageHtml.replace(/<\/head>/i, schemaTag);
  }

  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  generatedCount++;
}

console.log(`✅ Statically pre-rendered HTML snapshots & semantic content for ALL ${generatedCount} URLs from sitemap in dist/.`);
