import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { EventLeadModal } from '@/components/forms/EventLeadModal';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  DollarSign,
  Gift,
  Phone,
  Sparkles,
  Star,
  Tag,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function ThanksForVisitingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: deals, isLoading } = useDeals();

  return (
    <Layout>
      <SEO
        title="Thanks for Visiting Capital Motor Cars | Claim $500 Discount"
        description="Thanks for visiting us! Claim your exclusive $500 discount voucher on your next car lease or finance with Capital Motor Cars."
        noindex={true}
        canonicalPath="/thanksforvisiting"
      />

      {/* Lead Generation Modal */}
      <EventLeadModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-muted/30 via-background to-background border-b border-border/40">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in-50 duration-500">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Event Exclusive • Limited Time Offer</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[1.08] mb-6">
            Thanks For <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-indigo-600">
              Visiting Us!
            </span>
          </h1>

          {/* Subtitle / Value Prop */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            As an exclusive thank you for connecting with Capital Motor Cars, claim your{' '}
            <strong className="text-foreground font-bold underline decoration-accent decoration-2 underline-offset-4">
              $500 discount voucher
            </strong>{' '}
            towards any new car lease or purchase.
          </p>

          {/* Hero Discount Voucher Card */}
          <div className="max-w-2xl mx-auto mb-10 p-6 sm:p-8 rounded-3xl bg-card border-2 border-accent/40 shadow-2xl shadow-accent/10 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <Gift className="w-64 h-64 text-accent" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="text-center sm:text-left space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Voucher Code: CMC-EVENT500</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                  $500 OFF
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Applicable to any lease or finance deal with Capital Motor Cars.
                </p>
              </div>

              {/* Primary Modal Trigger */}
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-base uppercase tracking-wider shadow-xl shadow-accent/25 flex items-center justify-center gap-2 group transform active:scale-95 transition-all"
              >
                <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Claim Your $500</span>
              </Button>
            </div>
          </div>

          {/* Dual Action / Call Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm uppercase tracking-wider shadow-md"
            >
              Fill Out Voucher Form
            </Button>

            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              or
            </span>

            <a
              href="tel:+12015095555"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-border/80 hover:border-accent hover:text-accent font-bold text-sm uppercase tracking-wider transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Us: (201) 509-5555</span>
            </a>
          </div>

          {/* Quick Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>All Makes & Models</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
              <Zap className="w-4 h-4 text-accent shrink-0" />
              <span>Zero Down Available</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
              <Car className="w-4 h-4 text-accent shrink-0" />
              <span>Free NJ / NY Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>No Dealership Hassle</span>
            </div>
          </div>
        </div>
      </section>

      {/* This Month's Lease Deals Section */}
      <section className="py-16 md:py-24 bg-muted/10 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-2 block">
              Featured Monthly Specials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              This Month's Lease Deals
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore a few of our featured monthly lease specials. Your $500 voucher can be applied towards any vehicle in our nationwide inventory.
            </p>
          </div>

          {/* Deals Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-muted/40 border border-border/50" />
              ))}
            </div>
          ) : deals && deals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {deals.slice(0, 6).map((deal) => (
                <div
                  key={deal.id}
                  className="group relative flex flex-col rounded-3xl border-2 border-border/60 dark:border-white/10 bg-card overflow-hidden hover:border-accent hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative h-52 sm:h-56 bg-gradient-to-b from-muted/30 to-transparent p-4 flex items-center justify-center overflow-hidden">
                    {deal.image_url ? (
                      <img
                        src={deal.image_url}
                        alt={`${deal.year} ${deal.make} ${deal.model}`}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <Car className="w-16 h-16 text-muted-foreground/30" />
                    )}

                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        Special
                      </span>
                    </div>
                  </div>

                  {/* Deal Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                        {deal.year} {deal.make}
                      </div>
                      <h3 className="text-xl font-black uppercase text-foreground line-clamp-1">
                        {deal.model} {deal.trim || ''}
                      </h3>
                    </div>

                    {/* Price Block */}
                    <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-black text-foreground">
                          ${deal.monthly_price}
                          <span className="text-xs font-normal text-muted-foreground">/mo</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          ${deal.down_payment} down • {deal.lease_term} mos
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                          $500 Off Eligible
                        </span>
                      </div>
                    </div>

                    {/* Claim Towards this car CTA */}
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Apply $500 To This Car</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback if no specific deals in database */
            <div className="p-8 rounded-3xl bg-card border border-border text-center max-w-xl mx-auto space-y-4">
              <Car className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-xl font-bold">We Lease & Finance All Makes & Models</h3>
              <p className="text-sm text-muted-foreground">
                Whether you're looking for BMW, Mercedes, Audi, Toyota, Lexus, Jeep, or EV options, we negotiate the lowest monthly payments with zero hassle.
              </p>
              <Button onClick={() => setIsModalOpen(true)} className="rounded-xl">
                Claim $500 On Any Vehicle
              </Button>
            </div>
          )}

          {/* View All Deals Button (Brings user to homepage as requested) */}
          <div className="mt-12 md:mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl border-2 border-border/80 hover:border-accent hover:bg-accent/5 font-black text-sm uppercase tracking-wider text-foreground hover:text-accent transition-all duration-300 shadow-md group"
            >
              <span>View All Deals on Homepage</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Explore our full inventory, lease calculator, reviews, and services on the main website.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Call Concierge Strip */}
      <section className="py-12 bg-card border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-foreground">
            Have Questions or Need a Custom Quote?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Our auto brokers are available to find any car, build, or trim you desire. Mention your event code <strong className="text-foreground">CMC-EVENT500</strong> for your instant $500 discount.
          </p>
          <div className="pt-2">
            <a
              href="tel:+12015095555"
              className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-base shadow-lg shadow-accent/25 transition-all uppercase tracking-wider"
            >
              <Phone className="w-5 h-5" />
              <span>Call (201) 509-5555</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
