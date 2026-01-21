import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Users, Target, Shield } from 'lucide-react';

export default function AboutPage() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">About Us</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Capital Motor Cars was founded on a simple idea: car buying and leasing shouldn't be stressful.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              With decades of combined experience in the automotive industry, our team understands both sides of the transaction. We've seen the tactics that frustrate customers, and we've built our business to be the opposite.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're leasing your first car, financing a family vehicle, or need quality service work, we provide straightforward guidance and fair pricing. No games, no pressure—just practical help from people who know the business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Users, title: 'Customer First', desc: "Every decision we make starts with what's best for you, not our bottom line." },
              { icon: Target, title: 'Clear Communication', desc: 'We explain everything in plain language. No jargon, no fine print surprises.' },
              { icon: Shield, title: 'Integrity Always', desc: 'We build relationships through honesty, even when it means walking away from a deal.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
