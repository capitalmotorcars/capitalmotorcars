import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { getAllDeals } from '@/services/dealService';
import type { LeaseDeal } from '@/types/deals';
import { motion } from 'motion/react';
import { Tag, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function fmtDollar(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function DealsPage() {
  const [deals, setDeals] = useState<LeaseDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<LeaseDeal | null>(null);

  useEffect(() => {
    async function loadDeals() {
      try {
        const allDeals = await getAllDeals();
        // Only show active deals
        setDeals(allDeals.filter(d => d.is_active));
      } catch (error) {
        console.error("Failed to load deals:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDeals();
  }, []);

  return (
    <Layout
      breadcrumbItems={[
        { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
        { name: 'Specials', url: 'https://www.capitalmotorcars.com/deals' },
      ]}
    >
      <SEO
        title="Monthly Lease Specials & Deals | Capital Motor Cars"
        description="Exclusive car lease specials and zero down lease deals in New Jersey and New York. Limited time offers on top brands."
        canonicalPath="/deals"
      />

      <section className="relative pt-24 pb-12 overflow-hidden bg-muted/5 dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background pointer-events-none" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest mb-6"
            >
              <Tag className="w-3.5 h-3.5" />
              Limited Time Offers
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase mb-6"
            >
              Monthly <span className="text-accent italic">Specials</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Take advantage of our aggressive manufacturer incentives and massive dealer discounts. These specific vehicles are priced to move immediately.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-orange-500 bg-orange-500/10 px-4 py-2 rounded-full mx-auto w-fit"
            >
              <Clock className="w-4 h-4 animate-pulse" />
              Offers valid while inventory lasts
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-20 max-w-lg mx-auto bg-muted/5 rounded-[2rem] border-2 border-border/10 p-8">
              <ShieldCheck className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3">No Active Specials</h2>
              <p className="text-muted-foreground">We are currently negotiating our next batch of lease specials. Check back soon or contact us for a custom quote on any vehicle.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex flex-col bg-background rounded-[2.5rem] border-2 border-border/40 hover:border-accent/40 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6 md:p-8 flex flex-col h-full gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-accent uppercase tracking-widest mb-1 block">
                          {deal.year} {deal.make}
                        </span>
                        <h3 className="text-2xl font-black text-foreground tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                          {deal.model}
                        </h3>
                        {deal.trim && <p className="text-sm text-muted-foreground mt-1 font-medium">{deal.trim}</p>}
                      </div>
                    </div>
                    
                    {deal.image_url && (
                      <div className="relative h-48 -mx-4 overflow-hidden flex items-center justify-center">
                        <img 
                          src={deal.image_url} 
                          alt={`${deal.year} ${deal.make} ${deal.model}`} 
                          className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-all duration-500" 
                        />
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-foreground tracking-tighter">${deal.monthly_price}</span>
                        <span className="text-sm text-muted-foreground font-semibold">/mo</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                        {fmtDollar(deal.down_payment)} Down &bull; {deal.lease_term} Months
                      </p>
                    </div>

                    {deal.highlights && (
                      <div className="mt-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                        <p className="text-sm font-medium text-foreground leading-relaxed italic">
                          {deal.highlights}
                        </p>
                      </div>
                    )}

                    <div className="mt-auto pt-6">
                      <Button
                        onClick={() => setSelectedDeal(deal)}
                        className="w-full bg-foreground hover:bg-accent text-background font-black uppercase tracking-widest h-14 rounded-xl shadow-lg hover:shadow-accent/25 transition-all duration-300"
                      >
                        Claim This Deal
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <Dialog open={!!selectedDeal} onOpenChange={(open) => !open && setSelectedDeal(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden bg-background border-border/10">
          {selectedDeal && (
            <>
              <div className="bg-accent/5 p-6 border-b border-border/10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Tag className="w-24 h-24" />
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <DialogTitle className="text-2xl font-black uppercase tracking-tight text-foreground mb-2 relative z-10">
                  Claim Deal
                </DialogTitle>
                <DialogDescription className="text-foreground/80 font-medium relative z-10">
                  Lock in this {selectedDeal.year} {selectedDeal.make} {selectedDeal.model} for ${selectedDeal.monthly_price}/mo. 
                </DialogDescription>
              </div>
              <div className="p-6 relative z-20">
                <ContactForm 
                  source="contact"
                  initialValues={{ 
                    message: `I am interested in claiming the lease special for the ${selectedDeal.year} ${selectedDeal.make} ${selectedDeal.model} ${selectedDeal.trim ? selectedDeal.trim : ''} at $${selectedDeal.monthly_price}/mo with $${selectedDeal.down_payment} down.`
                  }}
                  hideServiceField={true}
                  showVehicleField={false}
                  onSubmitSuccess={() => setSelectedDeal(null)}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
