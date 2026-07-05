import fs from 'fs';

const sitemapPath = 'public/sitemap.xml';
let content = fs.readFileSync(sitemapPath, 'utf8');

const deadSlugs = [
  'car-skidding-in-winter',
  'road-trip-2026-the-ultimate-packing-guide',
  'audi-a4-reliability-long-term-performance-and-durability',
  'got-bad-credit-heres-how-to-get-approved-for-a-car-lease',
  'returning-your-lease-car-to-the-dealership-how-to-prepare-and-what-you-need-to-know',
  'car-key-not-working-in-ignition',
  'are-jeeps-reliable',
  'hyundai-sonata-reliability',
  'negotiate-the-best-car-lease-deal'
];

deadSlugs.forEach(slug => {
  const urlPattern = new RegExp(`<url>\\s*<loc>[^<]*${slug}[^<]*</loc>[\\s\\S]*?</url>`, 'g');
  content = content.replace(urlPattern, '');
});

fs.writeFileSync(sitemapPath, content);
console.log('Cleaned dead blog links from sitemap.');
