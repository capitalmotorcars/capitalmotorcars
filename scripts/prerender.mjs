import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

if (!fs.existsSync(distDir)) {
  console.log('dist directory not found. Please run vite build first.');
  process.exit(0);
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Helper to convert slugs to clean capitalized title words
function formatSlugToTitle(slug) {
  if (!slug) return 'Capital Motor Cars';
  const parts = slug.replace(/^car-leasing-/, '').replace(/-nj$/, '').split('-');
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

// Map of curated overrides
const curatedMeta = {
  '': {
    title: "New York & New Jersey's Trusted Auto Broker | Capital Motor Cars",
    description: "Experience stress-free car leasing and auto leasing with Capital Motor Cars. We negotiate the best car lease deals, SUV lease deals, and luxury car leasing in NJ & NY.",
  },
  'about': {
    title: 'About Us | Capital Motor Cars | Our Story & Leadership',
    description: 'Car leasing and auto broker concierge experts in New Jersey and New York. Learn about our story, founder Christopher Amico, and transparent pricing model.',
  },
  'services': {
    title: 'Car Leasing & Auto Broker Services | Capital Motor Cars NJ',
    description: 'Comprehensive auto leasing, trade-in valuation, lease returns, credit assistance, and doorstep delivery services in New Jersey and New York.',
  },
  'services/car-leasing': {
    title: 'Car Leasing Services NJ & NY | Capital Motor Cars',
    description: 'Stress free car leasing in New Jersey and New York. Pre-negotiated wholesale fleet pricing, zero dealer markup, and free home delivery.',
  },
  'services/credit': {
    title: 'Car Lease Financing & Credit Assistance | Capital Motor Cars',
    description: 'Fast, secure auto lease approvals and transparent credit guidance. We work with captive finance banks to get you approved at true buy-rate terms.',
  },
  'services/trade-in': {
    title: 'Vehicle Trade-In & Equity Extraction | Capital Motor Cars',
    description: 'Appraise and trade in your existing vehicle. Extract positive lease equity or roll value seamlessly into your next new car lease.',
  },
  'trade-in-value': {
    title: 'Instant Trade-In Value Estimate | Capital Motor Cars NJ',
    description: 'Get an accurate, market-grounded trade-in valuation for your car in minutes. Transparent appraisals with zero lowball dealership games.',
  },
  'services/lease-return': {
    title: 'Car Lease Return Service NJ | Capital Motor Cars',
    description: 'Pre-return inspection, disposition fee guidance, and repair coordination so you return your leased vehicle without surprise penalty fees.',
  },
  'lease-calculator': {
    title: 'Car Lease Calculator NJ | Capital Motor Cars',
    description: 'Broker-grade lease payment calculator for New Jersey drivers. Calculate monthly payment, money factor, residual, and NJ EV sales tax savings.',
  },
  'brands': {
    title: 'All Car Brands & Vehicle Makes | Capital Motor Cars',
    description: 'Explore lease specials across all major luxury, SUV, performance, and electric vehicle brands including BMW, Mercedes, Audi, Porsche, and Kia.',
  },
  'contact': {
    title: 'Contact Capital Motor Cars | New Jersey Auto Broker Concierge',
    description: 'Get in touch with our auto leasing consultants in Springfield, Marlton, and Edgewater NJ. Request a transparent, zero-markup vehicle quote.',
  },
  'credit-application': {
    title: 'Secure Online Credit Application | Capital Motor Cars',
    description: 'Apply online in minutes with 256-bit encryption. Fast approvals for new car lease and finance deals with top tier automotive lenders.',
  },
  'blog': {
    title: 'Auto Leasing Guides, Reviews & Market Insights | Capital Motor Cars',
    description: 'Expert automotive advice, model reliability reviews, lease vs buy comparisons, and monthly car lease deal breakdowns.',
  },
  'car-lease-deals-new-jersey': {
    title: 'Best Car Lease Deals in New Jersey | Capital Motor Cars',
    description: 'Explore verified top car lease deals and monthly specials across New Jersey. Zero down payment options with free doorstep delivery.',
  },
  'top-august-2026-car-lease-deals': {
    title: 'Top August 2026 Car Lease Deals & Monthly Specials | Capital Motor Cars',
    description: 'Comprehensive guide to the best car lease deals in August 2026. Compare luxury sedans, family SUVs, and EVs with zero-down terms.',
  },
  'are-car-brokers-worth-it-new-jersey': {
    title: 'Are Car Brokers Worth It in New Jersey? (2026 Guide) | Capital Motor Cars',
    description: 'How working with an independent auto broker in NJ skips showroom fatigue, avoids marked-up money factors, and secures wholesale fleet pricing.',
  }
};

// Load blog metadata from mockBlogs if available
try {
  const mockBlogsContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'mockBlogs.ts'), 'utf-8');
  const slugMatches = [...mockBlogsContent.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)];
  const titleMatches = [...mockBlogsContent.matchAll(/title:\s*['"`]([^'"`]+)['"`]/g)];
  const excerptMatches = [...mockBlogsContent.matchAll(/excerpt:\s*['"`]([^'"`]+)['"`]/g)];

  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i]?.[1];
    const title = titleMatches[i]?.[1];
    const excerpt = excerptMatches[i]?.[1];
    if (slug && title) {
      curatedMeta[slug] = {
        title: `${title} | Capital Motor Cars`,
        description: excerpt ? excerpt.slice(0, 160) : `Expert leasing analysis and pricing guide for ${title} from Capital Motor Cars.`,
      };
    }
  }
} catch (e) {
  console.warn('Note: mockBlogs extraction skipped');
}

// Read sitemap.xml to extract all URLs
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = [...sitemapXml.matchAll(/<loc>https:\/\/www\.capitalmotorcars\.com\/?([^<]*)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1].replace(/^\/|\/$/g, '')).filter(Boolean);
}

// Combine all routes
const allRoutes = new Set([...Object.keys(curatedMeta).filter(Boolean), ...sitemapUrls]);

let generatedCount = 0;

for (const routePath of allRoutes) {
  const targetDir = path.join(distDir, routePath);
  fs.mkdirSync(targetDir, { recursive: true });

  const canonicalUrl = `https://www.capitalmotorcars.com/${routePath}`;
  let title = `${formatSlugToTitle(routePath)} | Capital Motor Cars`;
  let description = `Explore the best lease deals, zero-markup pricing, and free doorstep delivery on ${formatSlugToTitle(routePath)} with Capital Motor Cars.`;

  if (curatedMeta[routePath]) {
    title = curatedMeta[routePath].title;
    description = curatedMeta[routePath].description;
  } else if (routePath.endsWith('-lease-deals-nj') || routePath.includes('-lease-deals-')) {
    title = `${formatSlugToTitle(routePath)} Lease Deals NJ | Capital Motor Cars`;
    description = `Compare best monthly lease specials and zero down terms on ${formatSlugToTitle(routePath)} in New Jersey. Free doorstep delivery.`;
  } else if (routePath.startsWith('car-leasing-')) {
    title = `Car Leasing in ${formatSlugToTitle(routePath)}, NJ | Capital Motor Cars Auto Broker`;
    description = `Stress-free car leasing and auto broker concierge in ${formatSlugToTitle(routePath)}, New Jersey. Wholesale fleet pricing and home delivery.`;
  }

  let pageHtml = baseIndexHtml;
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}">`);
  pageHtml = pageHtml.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}">`);
  pageHtml = pageHtml.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${title}">`);
  pageHtml = pageHtml.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${description}">`);

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf-8');
  generatedCount++;
}

console.log(`✅ Statically pre-rendered HTML snapshots for ALL ${generatedCount} URLs from sitemap in dist/.`);
