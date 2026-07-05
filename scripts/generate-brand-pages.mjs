import fs from 'fs';
import path from 'path';
import { getBrandData } from './brand-data.mjs';

const brands = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Cadillac', 
  'Infiniti', 'Jaguar', 'Lamborghini', 'Land Rover', 'Lincoln', 'Maserati', 'Volvo', 'Toyota', 'Honda', 'Ford', 
  'Chevrolet', 'Volkswagen', 'Hyundai', 'Kia', 'Nissan', 'Buick', 'Chrysler', 'Dodge', 'Fiat', 'Genesis', 'GMC', 
  'Jeep', 'Mazda', 'Mini', 'Mitsubishi', 'Ram', 'Subaru'
];

function generateBrandPageContent(brand, image) {
  const componentName = brand.replace(/[-\s]/g, '') + 'BrandPage';
  const slug = brand.toLowerCase().replace(/[-\s]/g, '-');
  const data = getBrandData(brand);
  
  return `import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ${componentName}() {
  return (
    <Layout>
      <SEO
        title="2026 ${brand} Lease Deals NJ & NY | Zero Down Specials"
        description="${data.metaDesc.replace(/"/g, '\\"')}"
        seoKeywords={['2026 ${brand} lease deals NJ', '${brand} lease specials NY', 'zero down ${brand} lease', '${brand} broker NJ']}
        ogImage="${image}"
        canonicalPath="/brand/${slug}"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "${brand} Lease Deals NJ & NY",
          description: "Affordable ${brand} leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/${slug}"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 ${brand} Lease Deals"
        highlightedTitle=""
        subtitle="${data.metaDesc.replace(/"/g, '\\"')}"
        heroImage="${image}"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">${data.introHeadline}</h2>
            <p className="text-lg text-muted-foreground">${data.introBody}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">${data.features[0].title}</h3>
              <p className="text-muted-foreground">${data.features[0].desc}</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">${data.features[1].title}</h3>
              <p className="text-muted-foreground">${data.features[1].desc}</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">${data.features[2].title}</h3>
              <p className="text-muted-foreground">${data.features[2].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Brand Heritage & Tech */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-3xl overflow-hidden bg-muted">
                <img src="${image}" alt="${brand} Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">${brand}</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ${data.heritage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular ${brand} <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for ${brand}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">${brand} SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">${brand} Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">${brand} Trucks/Crossovers</h3>
              <p className="text-muted-foreground mb-6">Versatile and robust vehicles designed for utility and everyday practicality.</p>
              <Link to="/vehicles/truck" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Lease Vs Buy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-lg text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-accent/5">
              <BadgeDollarSign className="w-64 h-64" />
            </div>
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a ${brand}?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              ${data.leaseVsBuy}
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">${brand} Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            ${data.faqs.map((faq, i) => `
            <AccordionItem value="item-${i + 1}" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                ${faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                ${faq.a}
              </AccordionContent>
            </AccordionItem>
            `).join('')}
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">${brand}</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred ${brand} model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new ${brand} delivered to your door.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 relative overflow-hidden group hover:border-accent transition-all">
                <span className="absolute -right-4 -bottom-4 text-8xl font-black text-muted/20 group-hover:text-accent/10 transition-colors pointer-events-none">{item.step}</span>
                <h3 className="text-lg font-bold mb-2 relative z-10">{item.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: CTA Form */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="glass-card-theme form-card-theme p-8 rounded-[2.5rem]">
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a ${brand} Quote</h2>
            <ContactForm source="${brand} Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
`;
}

function generatePages() {
  const brandsDir = path.resolve('src/pages/brands');
  if (!fs.existsSync(brandsDir)) {
    fs.mkdirSync(brandsDir, { recursive: true });
  }

  const generatedComponents = [];
  const brandImageMap = JSON.parse(fs.readFileSync(path.resolve('scripts/brand-image-map.json'), 'utf-8'));

  brands.forEach((brand) => {
    // Dynamically generate a brand-specific image URL using the wikipedia map
    const img = brandImageMap[brand] || `https://loremflickr.com/1600/900/${brand.toLowerCase().replace(/\s+/g, '')},car/all`;
    const componentName = brand.replace(/[-\s]/g, '') + 'BrandPage';
    const slug = brand.toLowerCase().replace(/[-\s]/g, '-');
    const content = generateBrandPageContent(brand, img);
    
    fs.writeFileSync(path.join(brandsDir, `${componentName}.tsx`), content, 'utf-8');
    generatedComponents.push({ name: componentName, slug });
    console.log(`Generated ${componentName}.tsx`);
  });

  return generatedComponents;
}

const components = generatePages();

// Update App.tsx
const appPath = path.resolve('src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf-8');

// First remove any existing brand imports
brands.forEach(brand => {
  const componentName = brand.replace(/[-\s]/g, '') + 'BrandPage';
  const importRegex = new RegExp(`const ${componentName} = lazy\\(\\(.*?\\);\\n?`, 'g');
  appContent = appContent.replace(importRegex, '');
  const slug = brand.toLowerCase().replace(/[-\s]/g, '-');
  const routeRegex = new RegExp(`<Route path="/brand/${slug}" element={<${componentName} />} />\\n?\\s*`, 'g');
  appContent = appContent.replace(routeRegex, '');
});

// Generate new imports and routes
const imports = components
  .map(c => `const ${c.name} = lazy(() => import('./pages/brands/${c.name}'));`)
  .join('\n');

const routes = components
  .map(c => `                <Route path="/brand/${c.slug}" element={<${c.name} />} />`)
  .join('\n');

// Find insertion points
const importInsertionPoint = appContent.lastIndexOf('const CarKeyReplacementPage');
if (importInsertionPoint !== -1) {
  appContent = appContent.slice(0, importInsertionPoint) + imports + '\n' + appContent.slice(importInsertionPoint);
}

const routeInsertionPoint = appContent.lastIndexOf('<Route path="/services/car-key-replacement"');
if (routeInsertionPoint !== -1) {
  // Find the /> that closes the Route element (not the /> inside element={<Component />})
  const routeLine = appContent.indexOf('\n', routeInsertionPoint);
  const endOfRoute = routeLine !== -1 ? routeLine : appContent.indexOf('/>', routeInsertionPoint) + 2;
  appContent = appContent.slice(0, endOfRoute) + '\n' + routes + appContent.slice(endOfRoute);
}

fs.writeFileSync(appPath, appContent, 'utf-8');
console.log('App.tsx updated successfully');

// Update sitemap.xml
const sitemapPath = path.resolve('public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  
  // Remove existing brand URLs
  const brandUrlRegex = /\s*<url>\s*<loc>https:\/\/www\.capitalmotorcars\.com\/brand\/[^<]+<\/loc>\s*<changefreq>weekly<\/changefreq>\s*<priority>0\.8<\/priority>\s*<\/url>/g;
  sitemapContent = sitemapContent.replace(brandUrlRegex, '');

  const sitemapUrls = components.map(c => `
  <url>
    <loc>https://www.capitalmotorcars.com/brand/${c.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
  
  sitemapContent = sitemapContent.replace('</urlset>', sitemapUrls + '\n</urlset>');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log('sitemap.xml updated successfully');
}
