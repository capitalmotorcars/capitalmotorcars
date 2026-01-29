import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { RelatedLinks, aboutPageLinks } from '@/components/ui/RelatedLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { UserCheck, MessageSquare, Settings, MapPin } from 'lucide-react';
import porscheCayenne from '@/assets/porsche-cayenne.png';

const approachItems = [
  {
    icon: UserCheck,
    title: 'Defined responsibility',
    description: 'Each engagement is managed with clear ownership and accountability from start to finish.',
  },
  {
    icon: MessageSquare,
    title: 'Clear communication',
    description: 'Options, timelines, and next steps are explained upfront, without pressure or unnecessary complexity.',
  },
  {
    icon: Settings,
    title: 'Practical execution',
    description: 'We coordinate directly with dealerships, lenders, and service partners to ensure the process moves smoothly and efficiently.',
  },
];

const locations = [
  {
    name: 'Corporate Office',
    city: 'Springfield, NJ',
    address: '251 Morris Avenue, Springfield Township, NJ 07081',
    phone: '201-509-5555',
  },
  {
    name: 'The View',
    city: 'Marlton, NJ',
    address: '105 Merchant Way Marlton, NJ 08053',
    phone: '856-553-5555',
  },
  {
    name: 'Pier 115',
    city: 'Edgewater, NJ',
    address: '115 River Road, Suite 158, Edgewater, NJ 07020',
    phone: '917-495-5727',
  },
];

export default function AboutPage() {
  const { ref: introRef, isRevealed: introRevealed } = useScrollReveal();
  const { ref: approachRef, isRevealed: approachRevealed } = useScrollReveal();
  const { ref: supportRef, isRevealed: supportRevealed } = useScrollReveal();
  const { ref: locationsRef, isRevealed: locationsRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO 
        title="About Us | Capital Motor Cars"
        description="Capital Motor Cars brings clarity to automotive decisions. We guide clients through leasing and financing with transparency and accountability."
      />
      <JsonLd data={organizationSchema} />
      
      <PageHero
        title="About Capital Motor Cars"
        subtitle="Clarity and structure for an automotive process that is often complex and time-consuming."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        heroImage={porscheCayenne}
        heroImageAlt="Porsche Cayenne GTS"
      />

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-background">
        <div 
          ref={introRef} 
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${introRevealed ? 'revealed' : ''}`}
        >
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Capital Motor Cars was created to bring clarity and structure to an automotive process that is often complex and time-consuming. Our focus is on guiding clients through decisions with transparency, accountability, and a clearly defined process.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We work with individuals and businesses who value straightforward communication and long-term thinking. Every engagement is handled with attention to detail, realistic expectations, and consistent follow-through.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div 
          ref={approachRef} 
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${approachRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl font-semibold text-foreground mb-12">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {approachItems.map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Support */}
      <section className="py-16 md:py-24 bg-background">
        <div 
          ref={supportRef} 
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${supportRevealed ? 'revealed' : ''}`}
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-foreground mb-6">How We Support Our Clients</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our role is to simplify decision-making and execution. We help clients evaluate options, manage details, and move forward with confidence, whether they are leasing, financing, or managing end-of-lease requirements.
            </p>
            <p className="text-lg font-medium text-foreground">
              The goal is not speed at any cost, but clarity at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div 
          ref={locationsRef} 
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${locationsRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl font-semibold text-foreground mb-4">Locations</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Capital Motor Cars operates across multiple locations to support clients efficiently and locally.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div 
                key={location.name} 
                className="bg-card border border-border rounded-lg p-6 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.city}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pl-8">{location.address}</p>
                <a 
                  href={`tel:${location.phone.replace(/\D/g, '')}`}
                  className="text-sm text-primary hover:underline underline-offset-4 pl-8 block"
                >
                  {location.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks 
        title="Explore More" 
        links={aboutPageLinks} 
        className="bg-background border-t border-border"
      />
    </Layout>
  );
}
