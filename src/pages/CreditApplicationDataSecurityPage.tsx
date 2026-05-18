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

/** Wraps vocabulary that was previously emphasized; kept for readable JSX grouping. */
function TechTerm({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const LAST_UPDATED = 'May 2026';

const toc = [
  { id: 'what-you-share', label: 'What you share' },
  { id: 'when-you-submit', label: 'When you hit submit' },
  { id: 'uploads', label: 'Photos and PDFs' },
  { id: 'who-sees-it', label: 'Who can see it' },
  { id: 'behind-the-site', label: 'Behind this website' },
  { id: 'after-you-apply', label: 'After you apply' },
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
      className="scroll-mt-24 rounded-2xl border border-border/80 bg-card/40 p-4 shadow-sm sm:scroll-mt-28 sm:p-8 md:p-9"
    >
      <h2 className="break-words text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h2>
      <div className="mt-4 space-y-4 break-words text-base leading-relaxed text-muted-foreground">
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
        description="How Capital Motor Cars handles credit applications in plain English: what you submit, secure connections, uploads, who can see your data, and what happens after you apply."
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
            'Plain-language overview of credit application handling at Capital Motor Cars: secure forms, uploads, access, and follow-up.',
          dateModified: '2026-05-14',
          publisher: { '@type': 'Organization', name: 'Capital Motor Cars' },
        }}
      />

      <section className="relative overflow-x-hidden border-b border-border/60 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-foreground dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.07] dark:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl min-w-0 px-4 pb-12 pt-[max(5.5rem,calc(5.5rem+env(safe-area-inset-top,0px)))] sm:px-6 sm:pb-14 sm:pt-[max(6rem,calc(6rem+env(safe-area-inset-top,0px)))] lg:px-8 lg:pb-16 lg:pt-[max(7rem,calc(7rem+env(safe-area-inset-top,0px)))]">
          <motion.div className="min-w-0" {...fadeIn}>
            <Link
              to="/credit-application"
              className="mb-3 inline-flex min-h-11 items-center gap-2 rounded-md py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-white/75 dark:hover:text-white dark:focus-visible:outline-white/80 sm:mb-4"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              <span className="break-words">Back to credit application</span>
            </Link>
            <h1 className="max-w-3xl break-words text-2xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-tight">
              How we protect your application
            </h1>
            <p className="mt-3 text-sm text-muted-foreground dark:text-white/55">Last updated: {LAST_UPDATED}</p>
            <TrustBadgesGrid
              variant="hero"
              className="mt-8 border-t border-border/60 pt-6 dark:border-white/10 sm:mt-12 sm:pt-10"
            />
          </motion.div>
        </div>
      </section>

      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 lg:px-8">
          <p className="min-w-0 text-base leading-relaxed text-muted-foreground sm:text-sm sm:leading-normal">
            Need help? Email{' '}
            <a
              href="mailto:sales@capitalmotorcars.com"
              className="break-all font-semibold text-foreground underline-offset-4 hover:underline sm:break-normal"
            >
              sales@capitalmotorcars.com
            </a>
            .
          </p>
          <Button asChild className="h-11 w-full shrink-0 sm:h-10 sm:w-auto">
            <Link to="/credit-application">Start or continue application</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-12">
        <div className="min-w-0">
          <section className="bg-background py-8 pb-10 md:py-14">
            <div className="relative">
              <div className="min-w-0 space-y-8 md:space-y-12">
                <div className="lg:hidden">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Jump to section</p>
                  <nav className="mt-3 flex flex-wrap gap-2" aria-label="Jump to section">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          'inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-border/70 bg-background px-3 py-2 text-center text-sm font-medium leading-snug text-foreground sm:min-h-10 sm:px-4 sm:text-xs',
                          'active:bg-accent/10 hover:border-accent/40 hover:bg-accent/5',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-xl border border-border/70 bg-muted/20 p-4 sm:p-7">
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-[15px]">
                    The badges above reflect the same security standards shown across our website. They represent secure
                    encrypted connections (HTTPS/SSL), protection of personal information, privacy-focused practices, and
                    safeguards against malicious traffic and attacks (DDoS protection). Together, these measures help
                    demonstrate that customer credit applications and sensitive data are handled with care and security in
                    mind.
                  </p>
                </div>

                <div className="space-y-6 md:space-y-10">
                  <SectionCard id="what-you-share" title="What you share">
                    <p>
                      The online application may collect information commonly required for vehicle leasing and financing,
                      including your name, contact details, address, employment information, income, housing payment, and
                      Social Security number (SSN). In some cases, we may also request co-applicant details, trade-in
                      vehicle information, or business-related information.
                    </p>
                  </SectionCard>

                  <SectionCard id="when-you-submit" title="When you hit submit">
                    <p>
                      Our website uses secure HTTPS encryption to help protect all application data submitted through our
                      forms. Information is securely processed through our internal systems and trusted workflow tools using
                      encrypted connections.
                    </p>
                    <p>
                      We also implement security measures, including traffic protection and request limits, to help prevent
                      spam, abuse, and unauthorized access.
                    </p>
                  </SectionCard>

                  <SectionCard id="uploads" title="Photos and PDFs">
                    <p>
                      Any documents or photos uploaded through the application are securely transmitted using encrypted
                      connections and are not stored in any public media library or marketing system.
                    </p>
                    <p>
                      Please upload only documents required for the application process, using clear and readable files to
                      ensure smooth and reliable submission.
                    </p>
                  </SectionCard>

                  <SectionCard id="who-sees-it" title="Who can see it">
                    <p>
                      Only authorized Capital Motor Cars staff and the secure systems we use to operate our brokerage can
                      access completed applications and uploaded documents. Website visitors cannot view or access your
                      information.
                    </p>
                    <p>
                      Application emails are securely routed through our server systems to help prevent misdirected or
                      tampered submissions.
                    </p>
                    <p>
                      Once your information is shared with a lender, it becomes subject to that lender&apos;s own security
                      practices and policies. This section applies only to Capital Motor Cars systems and our direct
                      transfer process.
                    </p>
                    <p>
                      Any printed files, downloaded PDFs, emails, or spreadsheets containing customer information should
                      be handled securely, with restricted access and proper disposal when no longer needed.
                    </p>
                  </SectionCard>

                  <SectionCard id="behind-the-site" title="Behind this website">
                    <p>
                      Sensitive keys for email and automation live in server or hosting configuration.
                    </p>
                    <p>
                      Public forms talk to our API on the same domain. We use standard web controls (CORS) so random other
                      websites cannot silently post to those endpoints from a visitor&apos;s browser without going through our
                      pages the way we expect.
                    </p>
                    <p>
                      Inventory, blog posts, and dealer-facing content live in a managed database. Behind the scenes we use
                      row-level security (RLS) so permissions line up with that idea.
                    </p>
                    <p>
                      The marketing database is not where we park finished credit applications. When you submit, the package
                      is passed along for processing instead of sitting in the same tables as blog drafts or lease highlights.
                    </p>
                    <p>
                      The site is hosted on modern cloud infrastructure (encrypted connections at the edge, protections
                      against large-scale junk traffic).
                    </p>
                  </SectionCard>

                  <SectionCard id="after-you-apply" title="After you apply">
                    <p>
                      If you need a correction, a copy of what was submitted, or you want to ask how your data was handled,
                      email{' '}
                      <a
                        href="mailto:info@capitalmotorcars.com"
                        className="break-all font-medium text-foreground underline-offset-4 hover:underline sm:break-normal"
                      >
                        info@capitalmotorcars.com
                      </a>
                      . We cannot promise instant turnaround on every request, but we will take genuine inquiries seriously.
                    </p>
                    <p>
                      This page will get updated when our process changes in a material way.
                    </p>
                  </SectionCard>
                </div>
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
          </div>
        </aside>
      </div>
    </Layout>
  );
}
