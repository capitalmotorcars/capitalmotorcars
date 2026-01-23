import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { RelatedLinks } from '@/components/ui/RelatedLinks';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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

  return (
    <Layout>
      <SEO 
        title={metaTitle || `${title} | Capital Motor Cars`}
        description={metaDescription || description.slice(0, 157) + (description.length > 157 ? '...' : '')}
      />
      <JsonLd data={schemas} />
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <Link 
                to="/services" 
                className="text-primary-foreground/60 text-sm hover:text-primary-foreground"
              >
                ← Back to Services
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {title}
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl">
              {description}
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-background">
        <div 
          ref={whoRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${whoRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading title="Who This Is For" align="left" />
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {whoIsThisFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 md:py-20 bg-muted">
        <div 
          ref={issuesRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${issuesRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading 
            title="Common Issues We Address" 
            align="left" 
          />
          <ul className="space-y-3 max-w-2xl">
            {commonIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-background">
        <div 
          ref={howRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${howRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading title="How the Process Works" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20 bg-muted">
        <div 
          ref={expectRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${expectRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading title="What You Can Expect" align="left" />
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {whatToExpect.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-background">
        <div 
          ref={faqRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${faqRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading title="Frequently Asked Questions" />
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-20 bg-muted">
        <div 
          ref={formRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${formRevealed ? 'revealed' : ''}`}
        >
          <div className="max-w-xl mx-auto">
            <SectionHeading
              title="Interested in this service?"
              subtitle="Leave your details and we will get back to you."
            />
            <div className="bg-background p-6 md:p-8 rounded-lg border border-border">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <RelatedLinks 
          title="Related Services" 
          links={relatedLinks} 
          className="bg-background border-t border-border"
        />
      )}
    </Layout>
  );
}
