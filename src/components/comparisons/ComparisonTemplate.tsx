import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Scale, DollarSign, Gauge } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';

export interface ComparisonData {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  vehicle1: {
    make: string;
    model: string;
    image: string;
    price: number;
    horsepower: number;
    mpg: string;
    cargo: string;
    pros: string[];
  };
  vehicle2: {
    make: string;
    model: string;
    image: string;
    price: number;
    horsepower: number;
    mpg: string;
    cargo: string;
    pros: string[];
  };
  verdict: string;
}

export function ComparisonTemplate({ data }: { data: ComparisonData }) {
  const schemas = [
    createWebPageSchema({
      name: data.title,
      description: data.description,
      url: `https://www.capitalmotorcars.com/comparisons/\${data.slug}`,
    }),
    createBreadcrumbSchema([
      { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
      { name: 'Comparisons', url: 'https://www.capitalmotorcars.com/comparisons' },
      { name: `\${data.vehicle1.make} \${data.vehicle1.model} vs \${data.vehicle2.make} \${data.vehicle2.model}`, url: `https://www.capitalmotorcars.com/comparisons/\${data.slug}` },
    ]),
  ];

  return (
    <Layout>
      <SEO
        title={`\${data.title} | Capital Motor Cars`}
        description={data.description}
        canonicalPath={`/comparisons/\${data.slug}`}
        seoKeywords={data.keywords}
        ogType="website"
      />
      <JsonLd data={schemas} />

      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <BackgroundEffects />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 14% 18%, hsl(var(--accent) / 0.18), transparent 30%), radial-gradient(circle at 86% 22%, hsl(var(--accent) / 0.1), transparent 28%)' }} />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-14 lg:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-accent">
                <Scale className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-gradient-heading-dark">
                {data.vehicle1.make} {data.vehicle1.model} vs {data.vehicle2.make} {data.vehicle2.model}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Which luxury SUV offers the best lease value in 2026? We break down the specs, pricing, and features.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Vehicle 1 */}
            <div className="bg-card dark:bg-white/[0.02] border border-border/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-64 overflow-hidden relative">
                <img src={data.vehicle1.image} alt={`\${data.vehicle1.make} \${data.vehicle1.model}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/80 backdrop-blur text-white px-4 py-2 rounded-xl font-bold text-xl">
                    {data.vehicle1.make} {data.vehicle1.model}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4 text-accent" /> Est. Lease</span>
                  <span className="font-bold text-xl">~\${data.vehicle1.price}/mo</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><Gauge className="w-4 h-4 text-accent" /> Horsepower</span>
                  <span className="font-bold">{data.vehicle1.horsepower} HP</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Efficiency</span>
                  <span className="font-bold">{data.vehicle1.mpg}</span>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold mb-3">Key Advantages:</h4>
                  <ul className="space-y-2">
                    {data.vehicle1.pros.map(pro => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link to={`/contact?vehicle=\${data.vehicle1.make} \${data.vehicle1.model}`}>Quote {data.vehicle1.model}</Link>
                </Button>
              </div>
            </div>

            {/* Vehicle 2 */}
            <div className="bg-card dark:bg-white/[0.02] border border-border/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-64 overflow-hidden relative">
                <img src={data.vehicle2.image} alt={`\${data.vehicle2.make} \${data.vehicle2.model}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/80 backdrop-blur text-white px-4 py-2 rounded-xl font-bold text-xl">
                    {data.vehicle2.make} {data.vehicle2.model}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4 text-accent" /> Est. Lease</span>
                  <span className="font-bold text-xl">~\${data.vehicle2.price}/mo</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><Gauge className="w-4 h-4 text-accent" /> Horsepower</span>
                  <span className="font-bold">{data.vehicle2.horsepower} HP</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <span className="text-muted-foreground flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Efficiency</span>
                  <span className="font-bold">{data.vehicle2.mpg}</span>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold mb-3">Key Advantages:</h4>
                  <ul className="space-y-2">
                    {data.vehicle2.pros.map(pro => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link to={`/contact?vehicle=\${data.vehicle2.make} \${data.vehicle2.model}`}>Quote {data.vehicle2.model}</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SectionDividerCreative variant="wave" />

      <section className="py-16 lg:py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="The Verdict" subtitle="Which one should you lease?" />
            <div className="mt-8 bg-card dark:bg-white/[0.04] p-8 md:p-12 rounded-[2rem] border border-border/50 dark:border-white/10 shadow-lg text-lg leading-relaxed text-muted-foreground">
              <ShieldCheck className="w-12 h-12 text-accent mb-6" />
              <p>{data.verdict}</p>
              
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue">
                  <Link to="/contact">Get Lease Quotes for Both</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
