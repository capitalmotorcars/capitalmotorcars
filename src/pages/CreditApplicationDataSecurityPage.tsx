import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TrustBadgesGrid } from '@/components/security/TrustBadgesGrid';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const LAST_UPDATED = 'May 2026';

const toc = [
  { id: 'what-you-share', label: 'What you share' },
  { id: 'when-you-submit', label: 'When you hit submit' },
  { id: 'uploads', label: 'Photos and PDFs' },
  { id: 'who-sees-it', label: 'Who can see it' },
  { id: 'behind-the-site', label: 'Behind this website' },
] as const;

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 rounded-2xl border border-border/80 bg-card/40 p-6 shadow-sm sm:p-8 md:p-9"
    >
      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
        {children}
      </div>
    </article>
  );
}

export default function CreditApplicationDataSecurityPage() {
  return (
    <Layout>
      <SEO
        title="How We Protect Your Application | Capital Motor Cars"
        description="Plain-language summary of how Capital Motor Cars handles credit application information: secure forms, uploads, and who can access your data."
        seoKeywords={[
          'credit application security',
          'car loan application privacy',
          'Capital Motor Cars data protection',
        ]}
        canonicalPath="/credit-application/data-security"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'How we protect your credit application',
          description:
            'Plain-language overview of how Capital Motor Cars handles sensitive credit application information.',
          dateModified: '2026-05-14',
          publisher: { '@type': 'Organization', name: 'Capital Motor Cars' },
        }}
      />

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
          <motion.div {...fadeIn}>
            <Link
              to="/credit-application"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to credit application
            </Link>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-tight">
              How we protect your application
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              If you are filling out our credit form, you deserve a straight answer about what happens to your information.
              This page is written for customers and dealers, not for engineers.
            </p>
            <p className="mt-3 text-sm text-white/55">Last updated: {LAST_UPDATED}</p>
            <TrustBadgesGrid
              variant="hero"
              className="mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10"
            />
          </motion.div>
        </div>
      </section>

      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Need something in writing for a bank or lawyer? Email{' '}
            <a
              href="mailto:sales@capitalmotorcars.com"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              sales@capitalmotorcars.com
            </a>
            .
          </p>
          <Button asChild className="w-full shrink-0 sm:w-auto">
            <Link to="/credit-application">Start or continue application</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-12">
        <div className="min-w-0">
          <section className="bg-background py-10 md:py-14">
            <div className="relative">
              <div className="min-w-0 space-y-10 md:space-y-12">
                <div className="rounded-xl border border-border/70 bg-muted/20 p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    The badges above are the same ones we show on the home page. They are there so you can see, at a
                    glance, that we take connection security, privacy, and uptime seriously. The words under each badge
                    match what you would read on a typical secure business site (SSL, encryption, privacy, network
                    protection, and general trust standards). Details follow in plain English.
                  </p>
                </div>

                <div className="space-y-8 md:space-y-10">
                  <SectionCard id="what-you-share" title="What you share">
                    <p>
                      The online application asks for the kind of information any lender or broker needs: who you are,
                      where you live and work, income, and often a Social Security number. You may also upload a
                      driver&apos;s license, pay stubs, or other documents. None of that is unusual for a finance
                      application, but it is sensitive, and we treat it that way.
                    </p>
                  </SectionCard>

                  <SectionCard id="when-you-submit" title="When you hit submit">
                    <p>
                      You should see a padlock in your browser on our site. That means the data travels over an encrypted
                      connection (the same HTTPS you use for online banking or shopping). Your answers are sent to our
                      website first; we do not post them as a public link anyone could stumble on.
                    </p>
                    <p>
                      From there, our systems pass the information along to the tools our team uses to process
                      applications (for example automation and email). Those handoffs also go over encrypted connections.
                    </p>
                  </SectionCard>

                  <SectionCard id="uploads" title="Photos and PDFs">
                    <p>
                      If you attach a photo or PDF, it rides along with the rest of your application in that same secure
                      submission. We do not drop your license into the same public folders we use for car photos on the
                      website.
                    </p>
                  </SectionCard>

                  <SectionCard id="who-sees-it" title="Who can see it">
                    <p>
                      Only people and systems that need the application to do their job at Capital Motor Cars (and the
                      services we use to run the business) should see it. Random visitors browsing the site cannot pull up
                      your form answers.
                    </p>
                    <p>
                      If someone on your team prints a PDF or saves a copy in email or a spreadsheet, treat that copy
                      like any other sensitive file at your office. This page cannot control what happens after it leaves
                      our pipeline, but good habits matter.
                    </p>
                  </SectionCard>

                  <SectionCard id="behind-the-site" title="Behind this website">
                    <p>
                      The public site is built so that passwords and hook addresses for email and automation stay on the
                      server, not inside the page code where a curious person could dig them out. We also slow down
                      automated junk hitting our contact and application endpoints so the forms stay usable for real
                      customers.
                    </p>
                    <p>
                      Inventory, blog posts, and other site content live in a managed database with access rules so only
                      approved staff accounts can change them.
                    </p>
                    <p>
                      Completed applications are not stored like a shopping cart in the marketing database. They are
                      handed off for processing. Long-term storage and how long you keep copies are business and legal
                      decisions your team should document separately.
                    </p>
                  </SectionCard>
                </div>

                <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:p-8">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Ready to apply?</p>
                    <p className="mt-1 text-sm text-muted-foreground">Same form, same protections.</p>
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <a href="tel:+12015095555" className="inline-flex items-center justify-center gap-2">
                        201-509-5555
                      </a>
                    </Button>
                    <Button asChild className="w-full sm:w-auto">
                      <Link to="/credit-application">Apply online</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border/60 bg-muted/15 py-8 lg:hidden">
            <div className="px-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Jump to section</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground',
                      'hover:border-accent/40 hover:bg-accent/5',
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="relative hidden lg:block" aria-label="On this page">
          <div className="sticky top-28 z-10 max-h-[calc(100vh-7.5rem)] w-full overflow-y-auto rounded-xl border border-border bg-background p-5 shadow-lg ring-1 ring-border/40 dark:bg-slate-950 dark:ring-white/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">On this page</p>
            <nav className="mt-4 space-y-2 border-t border-border/60 pt-4">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="mt-6 rounded-lg border border-border/70 bg-muted/50 p-4 text-xs leading-relaxed text-foreground/90 dark:bg-slate-900/80 dark:text-slate-200">
              This page is for your information. It is not legal advice. Your lawyer can tell you what else you need for
              your state or your lenders.
            </p>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
