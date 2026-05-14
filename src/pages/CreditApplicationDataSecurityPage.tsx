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

/** Bold + underline for acronyms and technical vocabulary in body copy. */
function TechTerm({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-[3px]',
        className,
      )}
    >
      {children}
    </span>
  );
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
              This page is written for customers and dealers first. If you are a lender or someone doing a quick review,
              you should still find enough detail here to understand how we handle the sensitive parts of an application.
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
                    The badges above are the same ones we show on the home page. They line up with how most people think
                    about safety online: a secure connection (<TechTerm>HTTPS</TechTerm> / <TechTerm>SSL</TechTerm>),
                    protection for personal data, respect for privacy, and a network that can stand up to junk traffic (
                    <TechTerm>DDoS</TechTerm> protection). The fifth badge is a general trust mark so visitors know we are
                    not treating a credit application like a casual contact form.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    Badges are not the same as a legal certificate. They summarize how we operate. The sections below spell
                    out what actually happens when someone applies, in everyday language (with technical terms called out
                    when we use them).
                  </p>
                </div>

                <div className="space-y-8 md:space-y-10">
                  <SectionCard id="what-you-share" title="What you share">
                    <p>
                      The online application asks for the kind of information any lender or broker needs to pull credit
                      and work a deal: your name, contact information, address, employer, income, housing payment, and
                      often a <TechTerm>Social Security number</TechTerm> (<TechTerm>SSN</TechTerm>). Depending on the form,
                      we may also ask about a <TechTerm>co-applicant</TechTerm>, <TechTerm>trade-in</TechTerm> vehicle, or{' '}
                      <TechTerm>business</TechTerm> details.
                    </p>
                    <p>
                      You can usually upload supporting files: driver&apos;s license, insurance card, pay stubs, prior
                      lease paperwork, or similar (often as <TechTerm>PDF</TechTerm> or photos). None of this is surprising
                      on a finance application, but it is all worth protecting because it can be used for{' '}
                      <TechTerm>identity theft</TechTerm> if it leaked.
                    </p>
                    <p>
                      We only collect what the application asks for. If you are not comfortable submitting something, call
                      us at <strong className="text-foreground">201-509-5555</strong> and we can walk through alternatives
                      where the lender allows them.
                    </p>
                  </SectionCard>

                  <SectionCard id="when-you-submit" title="When you hit submit">
                    <p>
                      You should see a padlock in your browser on our site. That means the data travels over an encrypted
                      connection (<TechTerm>HTTPS</TechTerm>), the same idea as online banking or shopping on a reputable
                      store. Modern phones and laptops negotiate a current version of <TechTerm>TLS</TechTerm> with our
                      hosting provider so the tunnel stays up to date.
                    </p>
                    <p>
                      When you press submit, your answers go to <strong className="text-foreground">our</strong> website
                      first, not straight into a random third-party widget in the open. The <TechTerm>browser</TechTerm>{' '}
                      talks to our own <TechTerm>API</TechTerm> on the same site you are looking at. We do not publish your
                      application as a public link that anyone could bookmark or forward around the internet.
                    </p>
                    <p>
                      From there, our <TechTerm>server</TechTerm> forwards the package to the workflow tools our staff rely
                      on (for example <TechTerm>automation</TechTerm> and <TechTerm>email</TechTerm>). Those next steps also
                      use <TechTerm>HTTPS</TechTerm> so the handoff is not sent as <TechTerm>plain text</TechTerm> across the
                      public web.
                    </p>
                    <p>
                      We also put basic limits on how hard someone can hammer our public forms (
                      <TechTerm>rate limits</TechTerm> and <TechTerm>request size caps</TechTerm>) so automated junk does
                      not crowd out real customers.
                    </p>
                  </SectionCard>

                  <SectionCard id="uploads" title="Photos and PDFs">
                    <p>
                      If you attach a photo or <TechTerm>PDF</TechTerm>, it is read in your <TechTerm>browser</TechTerm>{' '}
                      and sent together with the rest of your answers in that same <TechTerm>encrypted</TechTerm>{' '}
                      submission. We do not put your license or bank paperwork in the same public{' '}
                      <TechTerm>image library</TechTerm> we use for vehicle photos on the marketing site.
                    </p>
                    <p>
                      Please only upload documents you are comfortable sharing with a finance office. Use clear photos
                      (not blurry screenshots) and keep <TechTerm>file sizes</TechTerm> reasonable so the form stays
                      reliable on slower connections.
                    </p>
                    <p>
                      If a file fails to upload, try a smaller PDF or a single page at a time. When in doubt, call{' '}
                      <strong className="text-foreground">201-509-5555</strong> and we can help you get the paperwork to
                      the right person without leaving it in the wrong place.
                    </p>
                  </SectionCard>

                  <SectionCard id="who-sees-it" title="Who can see it">
                    <p>
                      Only Capital Motor Cars staff and the software we use to run the brokerage should see a completed
                      application. A random person browsing inventory on the <TechTerm>website</TechTerm> cannot open your
                      form or your <TechTerm>uploads</TechTerm>.
                    </p>
                    <p>
                      Lead emails are routed on the <TechTerm>server</TechTerm>, not by whatever address someone might try
                      to type into the browser. That reduces the chance of an application being mis-sent because of a
                      tampered field on the <TechTerm>client side</TechTerm>.
                    </p>
                    <p>
                      Once your information reaches a <TechTerm>lender</TechTerm>, their systems and staff fall under their
                      own rules. We are describing what happens on <strong className="text-foreground">our</strong> site and
                      our immediate handoff, not every <TechTerm>bank portal</TechTerm> down the line.
                    </p>
                    <p>
                      If your team prints a <TechTerm>PDF</TechTerm>, forwards <TechTerm>email</TechTerm>, or saves a{' '}
                      <TechTerm>spreadsheet</TechTerm> with applicant data, treat those copies like cash in a safe. Shred
                      what you do not need, lock screens, and remove access when someone leaves the company. Good habits
                      there matter as much as anything on the website.
                    </p>
                  </SectionCard>

                  <SectionCard id="behind-the-site" title="Behind this website">
                    <p>
                      The parts of the site you see in the browser are only half the story. Sensitive keys for email and
                      automation live in <TechTerm>server</TechTerm> or <TechTerm>hosting configuration</TechTerm>, not
                      inside the <TechTerm>JavaScript bundle</TechTerm> that downloads to your phone. That way a curious user
                      cannot &quot;view source&quot; and walk away with a private <TechTerm>webhook URL</TechTerm>.
                    </p>
                    <p>
                      Public forms (contact, credit, trade-in) talk to our <TechTerm>API</TechTerm> on the same{' '}
                      <TechTerm>domain</TechTerm>. We use standard web controls (<TechTerm>CORS</TechTerm>) so random other
                      websites cannot silently post to those <TechTerm>endpoints</TechTerm> from a visitor&apos;s browser
                      without going through our pages the way we expect.
                    </p>
                    <p>
                      Inventory, blog posts, and dealer-facing content live in a managed <TechTerm>database</TechTerm>.
                      Only approved staff accounts on an internal <TechTerm>allowlist</TechTerm> can change that data.
                      Everyone else gets read-only public content. Behind the scenes we use{' '}
                      <TechTerm>row-level security</TechTerm> (<TechTerm>RLS</TechTerm>) so permissions line up with that
                      idea.
                    </p>
                    <p>
                      The marketing <TechTerm>database</TechTerm> is not where we park finished credit applications. When
                      you submit, the package is passed along for processing instead of sitting in the same tables as blog
                      drafts or lease highlights.
                    </p>
                    <p>
                      The site is hosted on modern <TechTerm>cloud infrastructure</TechTerm> (<TechTerm>encrypted</TechTerm>{' '}
                      connections at the edge, protections against large-scale junk traffic). Anyone with{' '}
                      <TechTerm>admin</TechTerm> access to our backing systems should still use strong passwords, turn on{' '}
                      <TechTerm>MFA</TechTerm> (<TechTerm>multi-factor authentication</TechTerm>) where the vendor offers it,
                      and avoid sharing one login across multiple people.
                    </p>
                  </SectionCard>

                  <SectionCard id="after-you-apply" title="After you apply">
                    <p>
                      How long a file is kept, and whether it lives in <TechTerm>email</TechTerm>, a <TechTerm>CRM</TechTerm>,
                      or a shared drive, is partly a business choice and partly a legal one. We recommend writing down a
                      simple <TechTerm>retention</TechTerm> rule (&quot;delete working copies after X days unless the deal
                      is open&quot;) and sticking to it.
                    </p>
                    <p>
                      If you need a correction, a copy of what was submitted, or you want to ask how your data was handled,
                      email{' '}
                      <a
                        href="mailto:sales@capitalmotorcars.com"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        sales@capitalmotorcars.com
                      </a>
                      . We cannot promise instant turnaround on every request, but we will take genuine inquiries seriously.
                    </p>
                    <p>
                      This page will get updated when our process changes in a material way. The{' '}
                      <TechTerm>Last updated</TechTerm> date at the top is there so you know how fresh the wording is.
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
