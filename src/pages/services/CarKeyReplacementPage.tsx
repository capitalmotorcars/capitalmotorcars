import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { CountyHubs } from '@/components/shared/CountyHubs';
import { ServiceSEOBlock } from '@/components/services/ServiceSEOBlock';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  CircleDot,
  Search,
  Key,
  ShieldCheck,
  TrendingUp,
  Zap,
  Phone,
  Settings,
  Sparkles,
  Lock
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const repairSteps = [
  {
    icon: Search,
    title: "Verify",
    description: "We verify your vehicle's VIN and ownership to guarantee security."
  },
  {
    icon: Settings,
    title: "Cut",
    description: "Using precision laser cutting, we craft a perfect physical key."
  },
  {
    icon: Zap,
    title: "Program",
    description: "We program the smart fob to your car's immobilizer system."
  },
  {
    icon: Sparkles,
    title: "Test",
    description: "Comprehensive testing of all buttons, remote start, and proximity."
  }
];

const idealFor = [
  "Drivers who have lost their only car key or key fob",
  "Those needing a spare smart key for a second driver",
  "Keys that are broken, damaged, or unresponsive",
  "Lease returns missing the required second key"
];

const faqs = [
  { question: "Do you offer mobile car key replacement?", answer: "Yes, our mobile locksmiths can come directly to your location in New Jersey and New York. Whether you're stuck at home or the office, we can cut and program a new key on-site." },
  { question: "Is it cheaper than going to the dealership?", answer: "Absolutely. Dealerships often charge premium prices and require you to tow your car to them. We offer highly competitive pricing and the convenience of coming to you." },
  { question: "Can you program smart keys and push-to-start fobs?", answer: "Yes! We specialize in modern automotive locksmithing. We can program proximity keys, smart fobs, and push-to-start remotes for almost all vehicle makes and models." },
];

export default function CarKeyReplacementPage() {

  return (
    <Layout>
      <SEO
        title="Car Key Replacement & Programming NJ & NY | Capital Motor Cars"
        description="Lost your car key or need a spare fob? Get fast, mobile car key replacement and programming services in New Jersey and New York from Capital Motor Cars."
        seoKeywords={['car key replacement NJ', 'car key programming NY', 'lost car key locksmith', 'smart key replacement New Jersey', 'key fob programming']}
        ogImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=60"
        canonicalPath="/services/car-key-replacement"
      />
      <JsonLd data={[
        createServiceSchema({
          name: "Car Key Replacement & Programming",
          description: "Mobile automotive locksmith services offering laser key cutting and smart fob programming.",
          url: "https://www.capitalmotorcars.com/services/car-key-replacement"
        }),
        createFaqSchema(faqs),
      ]} />

      <ServiceHero
        badge="Fast & Secure"
        title="Car Key Replacement & Programming Services"
        highlightedTitle=""
        subtitle="Lost your car key or need a spare fob? Avoid dealership markups and towing fees. We offer fast, mobile car key replacement and smart fob programming in New Jersey & New York."
        heroImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: "Get a Quote", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />

      <TrustStatsBar />

      <section className="py-12 md:py-20 w-full overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Benefits</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Why Choose <span className="text-accent italic">Capital</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/5 bg-muted/10 dark:bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-[-3%] right-[-10%] md:top-[-4%] md:right-[-5%] p-6 opacity-[0.08] dark:opacity-[0.07] pointer-events-none">
                <Key className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Mobile Service</span>
                    <p className="text-sm text-muted-foreground">We come directly to you. No expensive tow trucks required.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Secure Programming</span>
                    <p className="text-sm text-muted-foreground">We use authorized diagnostic tools to pair fobs seamlessly.</p>
                  </div>
                </div>

                <div className="pt-12 border-t border-border/40 dark:border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                    <CircleDot className="w-5 h-5" /> Who is this for?
                  </h3>
                  <div className="space-y-4">
                    {idealFor.map((ideal, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                        <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {ideal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/10 bg-muted/10 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-[-5%] right-[-15%] md:right-[-10%] p-6 opacity-[0.05] dark:opacity-[0.04] pointer-events-none">
                <ShieldCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" /> What To Expect
              </h3>

              <ul className="space-y-6">
                {[
                  "Laser cutting for high-security keys",
                  "Transponder and smart fob programming",
                  "Cheaper than dealership rates",
                  "Same-day or next-day service"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-lg text-black dark:text-white group-hover:text-accent transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 w-full border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">How it <span className="text-accent italic">Works</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairSteps.map((step, index) => (
              <div key={index} className="group relative p-10 rounded-[2.5rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.03] hover:border-accent transition-all duration-500 overflow-hidden">
                <span className="absolute -right-4 -bottom-4 text-9xl font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-accent/10 transition-colors leading-none select-none pointer-events-none">
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter mb-3 text-black dark:text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Support</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Replacement <span className="text-accent italic">FAQ</span>
            </h2>
          </div>
          <div className="max-w-7xl mx-auto glass-card-theme p-4 md:p-8 mt-12 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-lg font-bold hover:text-accent transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 justify-start items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Request Your <span className="text-accent italic">Key</span>
            </h2>
            <div className="mt-10 w-full">
              <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto">
                Fill out the form below with your VIN and vehicle details, and we'll get you a quote instantly.
              </p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm
                  source="service"
                  serviceTitle="Car Key Replacement"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceSEOBlock 
        title="Professional Car Key Replacement When You Need It Most"
        paragraphs={[
          "Losing your car keys can be incredibly stressful, especially if you're stranded. In the past, your only option was to tow your vehicle to a local dealership and pay exorbitant fees for a replacement fob and programming.",
          "Capital Motor Cars provides a seamless alternative. Our certified automotive locksmiths are fully equipped to cut and program high-security keys, proximity fobs, and push-to-start remotes for almost every make and model on the road today. Best of all, our mobile service comes to you, saving you both time and money."
        ]}
        bullets={[
          "Mobile locksmiths serving NJ and NY",
          "Laser cutting for high-security sidewinder keys",
          "Programming for smart fobs and remotes",
          "Save hundreds compared to dealership pricing"
        ]}
        imageSrc="https://images.unsplash.com/photo-1503376712394-6f921ea6247d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Programming smart car key fob"
        testimonialQuote="I lost the only key to my Honda Accord. The dealership wanted $450 and told me I had to tow it there. Capital came to my driveway and made me two new keys for way less. Incredible service!"
      />

      <CountyHubs />

      <RelatedServices excludeId="car-key-replacement" />
    </Layout>
  );
}
