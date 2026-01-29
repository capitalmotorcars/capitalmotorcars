import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { RelatedLinks } from '@/components/ui/RelatedLinks';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  href: string;
  title: string;
  description?: string;
}

interface ServiceTemplateProps {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage: string;
  whoIsThisFor: string[];
  commonIssues: string[];
  howItWorks: { title: string; description: string }[];
  whatToExpect: string[];
  faqs: FAQ[];
  icon: LucideIcon;
  relatedLinks?: RelatedLink[];
  serviceValue?: string;
  heroBadge?: string;
  heroKeyPoints?: string[];
  heroStats?: { label: string; value: string }[];
}

export function ServiceTemplate({
  title,
  description,
  metaTitle,
  metaDescription,
  heroImage,
  whoIsThisFor,
  commonIssues,
  howItWorks,
  whatToExpect,
  faqs,
  icon: Icon,
  relatedLinks = [],
  serviceValue,
  heroBadge,
  heroKeyPoints,
  heroStats,
}: ServiceTemplateProps) {
  const location = useLocation();
  const { ref: whoRef, isRevealed: whoRevealed } = useScrollReveal();
  const { ref: issuesRef, isRevealed: issuesRevealed } = useScrollReveal();
  const { ref: howRef, isRevealed: howRevealed } = useScrollReveal();
  const { ref: expectRef, isRevealed: expectRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();

  const schemas = useMemo(() => {
    const baseUrl = 'https://capitalmotorcars.com';
    const serviceSchema = createServiceSchema({
      name: title,
      description: metaDescription || description,
      url: `${baseUrl}${location.pathname}`,
    });
    const faqSchema = createFaqSchema(faqs);
    return [serviceSchema, faqSchema];
  }, [title, description, metaDescription, location.pathname, faqs]);

  // Build breadcrumbs for the service
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: title },
  ];

  return (
    <Layout>
      <SEO 
        title={metaTitle || `${title} | Capital Motor Cars`}
        description={metaDescription || description.slice(0, 157) + (description.length > 157 ? '...' : '')}
      />
      <JsonLd data={schemas} />
      
      <PageHero
        title={title}
        subtitle={description}
        breadcrumbs={breadcrumbs}
        heroImage={heroImage}
        heroImageAlt={title}
        badge={heroBadge}
        keyPoints={heroKeyPoints}
        stats={heroStats}
      >
        <Button 
          asChild 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Link to="/contact">Schedule a Call</Link>
        </Button>
      </PageHero>

      <SectionDivider variant="curved" nextSectionDark />

      {/* Who This Is For */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_8%)]">
        <div 
          ref={whoRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', whoRevealed && 'revealed')}
        >
          <SectionHeading title="Who This Is For" align="left" dark />
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl p-6">
            {whoIsThisFor.map((item, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3 stagger-in', `stagger-in-${Math.min(index + 1, 8)}`)}
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_6%)]">
        <div 
          ref={issuesRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', issuesRevealed && 'revealed')}
        >
          <SectionHeading title="Common Issues We Address" align="left" dark />
          <ul className="space-y-3 max-w-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl p-6">
            {commonIssues.map((issue, index) => (
              <li
                key={index}
                className={cn('flex items-start gap-3 stagger-in', `stagger-in-${Math.min(index + 1, 8)}`)}
              >
                <ArrowRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-white/85">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_8%)]">
        <div 
          ref={howRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', howRevealed && 'revealed')}
        >
          <SectionHeading title="How the Process Works" dark />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className={cn('text-center p-5 border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl stagger-in', `stagger-in-${Math.min(index + 1, 8)}`)}
              >
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/85">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_6%)]">
        <div 
          ref={expectRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', expectRevealed && 'revealed')}
        >
          <SectionHeading title="What You Can Expect" align="left" dark />
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {whatToExpect.map((item, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3 p-4 border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl stagger-in', `stagger-in-${Math.min(index + 1, 8)}`)}
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_8%)]">
        <div 
          ref={faqRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', faqRevealed && 'revealed')}
        >
          <SectionHeading title="Frequently Asked Questions" dark />
          <div className="max-w-2xl mx-auto border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl p-6">
            <Accordion type="single" collapsible className="w-full [&_[data-state=open]]:text-white [&_button]:text-white [&_button:hover]:text-white/90 [&_.text-muted-foreground]:text-white/85">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className={cn('stagger-in', `stagger-in-${Math.min(index + 1, 8)}`)}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/85">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-16 bg-[hsl(216_27%_6%)]">
        <div 
          ref={formRef}
          className={cn('container mx-auto px-4 lg:px-8 scroll-reveal', formRevealed && 'revealed')}
        >
          <div className="max-w-xl mx-auto">
            <SectionHeading
              title="Interested in this service?"
              subtitle="Leave your details and we will get back to you."
              dark
            />
            <div className="border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 md:p-8 rounded-xl stagger-in stagger-in-1 [&_label]:text-white [&_input]:bg-white/10 [&_input]:border-white/25 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_textarea]:bg-white/10 [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:placeholder:text-white/60 [&_.text-muted-foreground]:text-white/90 [&_button:not([type=submit])]:bg-white/10 [&_button:not([type=submit])]:border-white/25 [&_button:not([type=submit])]:text-white">
              <ContactForm 
                compact 
                initialValues={serviceValue ? { service: serviceValue } : undefined}
                hideServiceField={!!serviceValue}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <RelatedLinks title="Related Services" links={relatedLinks} dark />
      )}
    </Layout>
  );
}
