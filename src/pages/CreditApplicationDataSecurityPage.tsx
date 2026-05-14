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
  { id: 'encryption-transit', label: 'Encryption in transit' },
  { id: 'encryption-rest', label: 'Encryption at rest' },
  { id: 'file-storage', label: 'Secure file handling' },
  { id: 'access-control', label: 'Access control' },
  { id: 'pdf-documents', label: 'PDFs & documents' },
  { id: 'infrastructure', label: 'Database & infrastructure' },
  { id: 'logging', label: 'Logging & monitoring' },
  { id: 'documentation', label: 'Retention & use of this doc' },
] as const;

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

function SectionCard({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 rounded-2xl border border-border/80 bg-card/40 p-6 shadow-sm backdrop-blur-sm dark:bg-white/[0.03] sm:p-8 md:p-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xs font-black tracking-tight text-accent">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CreditApplicationDataSecurityPage() {
  return (
    <Layout>
      <SEO
        title="Credit Application Security & Data Protection | Capital Motor Cars"
        description="Technical overview of how Capital Motor Cars protects credit applications: TLS, secure handling of licenses and SSN, access control, infrastructure, and compliance documentation for lenders and customers."
        seoKeywords={[
          'credit application security',
          'auto finance data protection',
          'TLS encryption car loan application',
          'Capital Motor Cars privacy compliance',
        ]}
        canonicalPath="/credit-application/data-security"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Credit application security and data protection',
          description:
            'How Capital Motor Cars protects sensitive credit application data including encryption in transit, access controls, and secure processing.',
          dateModified: '2026-05-14',
          author: { '@type': 'Organization', name: 'Capital Motor Cars' },
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/90">Security &amp; compliance</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
              How we protect your credit application
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              A clear technical summary for customers, lenders, dealerships, and regulators: what data we collect on the
              application, how it moves, who can access it, and which industry practices we follow.
            </p>
            <p className="mt-4 text-xs text-white/50">Last updated: {LAST_UPDATED}</p>
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
            Questions for a compliance packet?{' '}
            <a
              href="mailto:sales@capitalmotorcars.com"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              sales@capitalmotorcars.com
            </a>
          </p>
          <Button asChild className="w-full shrink-0 sm:w-auto">
            <Link to="/credit-application">Start or continue application</Link>
          </Button>
        </div>
      </div>

      <section className="bg-background py-10 md:py-14">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="min-w-0 space-y-10 md:space-y-12 lg:pr-60">
            <motion.div {...fadeIn} className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8">
              <div>
                <h2 className="text-lg font-bold text-foreground">What this page covers</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    Our online credit application may collect sensitive categories you would expect from an automotive
                    finance inquiry—including <strong className="text-foreground">driver&apos;s license details</strong>,{' '}
                    <strong className="text-foreground">addresses</strong>,{' '}
                    <strong className="text-foreground">Social Security numbers</strong>,{' '}
                    <strong className="text-foreground">employment and income</strong>, and{' '}
                    <strong className="text-foreground">uploaded documents</strong> (for example PDFs or images). Below we
                    describe how that information is protected in line with common industry expectations for secure web
                    applications and brokered finance workflows.
                  </p>
              </div>
            </motion.div>

            <div>
              <h2 className="mb-5 text-lg font-bold tracking-tight text-foreground">At a glance</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: 'Encryption standards',
                    body: 'Browser sessions use HTTPS (TLS). Typical browsers negotiate TLS 1.2 or 1.3 with our hosting edge. We do not downgrade you to unsecured HTTP for application submission.',
                  },
                  {
                    title: 'Where uploads go',
                    body: 'Credit documents are transmitted inside an encrypted JSON submission from your browser to our site API, then forwarded over HTTPS to our automation layer—not posted as public website URLs.',
                  },
                  {
                    title: 'Backups & at-rest',
                    body:
                      "Our marketing site and admin data live on managed cloud services (e.g. Supabase, Vercel) that publish encryption-at-rest and backup practices in their trust documentation. Copies in email or automation tools follow each vendor's controls.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/70 bg-card/50 p-5 dark:bg-white/[0.02]"
                  >
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <SectionCard id="encryption-transit" number="01" title="Encryption in transit">
                <p>
                  All pages on <strong className="text-foreground">capitalmotorcars.com</strong> are intended to be
                  served over <strong className="text-foreground">HTTPS</strong>. When you submit the credit application,
                  your browser opens a <strong className="text-foreground">TLS-encrypted</strong> connection to our origin
                  (the same site you see in the address bar). That satisfies the usual expectation of{' '}
                  <strong className="text-foreground">TLS 1.2+</strong> for modern browsers; many clients will negotiate{' '}
                  <strong className="text-foreground">TLS 1.3</strong> automatically with our hosting provider.
                </p>
                <p>
                  From there, our servers relay application payloads to downstream workflow tools using{' '}
                  <strong className="text-foreground">HTTPS</strong> as well, so sensitive fields and Base64-encoded
                  attachments are not sent in cleartext across the public internet between those hops.
                </p>
              </SectionCard>

              <SectionCard id="encryption-rest" number="02" title="Encryption at rest">
                <p>
                  The public marketing website does <strong className="text-foreground">not</strong> store completed
                  credit applications in our customer-facing database schema. Instead, structured application data is
                  delivered to our <strong className="text-foreground">automation and broker systems</strong> for
                  processing. Those platforms apply their own{' '}
                  <strong className="text-foreground">encryption at rest</strong> (commonly AES-256 class storage on
                  modern cloud providers—see each vendor&apos;s security whitepaper).
                </p>
                <p>
                  Where we do store operational data (for example lease highlights, blog content, or admin metadata) in
                  Supabase, we rely on the platform&apos;s documented{' '}
                  <strong className="text-foreground">at-rest encryption</strong> and backup encryption practices.
                </p>
              </SectionCard>

              <SectionCard id="file-storage" number="03" title="Secure file storage (licenses & uploads)">
                <p>
                  Driver&apos;s licenses and other uploads are read in the browser and sent as part of the encrypted
                  application payload. They are <strong className="text-foreground">not</strong> written to our public
                  marketing image buckets or exposed as anonymous public URLs from this application flow.
                </p>
                <p>
                  For operational assets that are intentionally public (for example vehicle photography on the site),
                  we use separate storage paths and access rules so marketing assets are not mixed with applicant
                  documents.
                </p>
              </SectionCard>

              <SectionCard id="access-control" number="04" title="Access control & least privilege">
                <p>
                  <strong className="text-foreground">Website administration</strong> (deals, vehicles, blog) requires a
                  Supabase-authenticated account that also exists in our{' '}
                  <strong className="text-foreground">admin allowlist</strong>. Database policies restrict write access to
                  those staff identities; anonymous visitors only receive read-only public content.
                </p>
                <p>
                  <strong className="text-foreground">Submitted applications</strong> are visible only to Capital Motor
                  Cars personnel and systems connected to our processing pipeline (for example automation and CRM
                  tools). Access within those tools should follow your internal least-privilege and offboarding policies;
                  we recommend MFA and workspace role reviews on a schedule.
                </p>
                <p>
                  <strong className="text-foreground">Lead email</strong> routing uses server-side consultant mapping so
                  the browser cannot override delivery to arbitrary external addresses.
                </p>
              </SectionCard>

              <SectionCard id="pdf-documents" number="05" title="PDF generation & email">
                <p>
                  This website does not generate credit PDFs on our Node server. If your operations team creates PDFs or
                  forwards attachments from a workflow tool or mailbox, follow your standard playbook: generate on
                  trusted workstations or compliant services, avoid leaving temporary files on shared drives, transmit
                  only to known broker addresses, and delete working copies when retention policies allow.
                </p>
              </SectionCard>

              <SectionCard id="infrastructure" number="06" title="Database & infrastructure security">
                <p>
                  <strong className="text-foreground">API keys and secrets</strong> for email and webhook forwarding are
                  kept in server or hosting environment variables—not embedded in client bundles. Public forms call
                  same-origin API routes; sensitive upstream URLs stay server-side.
                </p>
                <p>
                  <strong className="text-foreground">Row Level Security (RLS)</strong> in Supabase limits who can read
                  or change operational tables. CORS and rate limiting on our API reduce drive-by abuse of contact and
                  relay endpoints.
                </p>
                <p>
                  <strong className="text-foreground">Hosting</strong> benefits from the network and perimeter controls of
                  our cloud vendors (for example Vercel edge TLS and DDoS mitigation). Firewall-style restrictions for
                  database access are enforced by the managed database product (IP allowlists / platform networking as
                  configured in your Supabase project).
                </p>
              </SectionCard>

              <SectionCard id="logging" number="07" title="Logging & monitoring">
                <p>
                  Expect <strong className="text-foreground">HTTP access logs</strong> and{' '}
                  <strong className="text-foreground">application telemetry</strong> from your hosting and analytics
                  vendors. Our open-source web app does not ship a bespoke SIEM; for lender-grade monitoring, pair this
                  page with your organization&apos;s centralized logging (Splunk, Datadog, CloudWatch, etc.) and the audit
                  exports from your CRM/automation vendor.
                </p>
              </SectionCard>

              <SectionCard id="documentation" number="08" title="Retention, deletion & how to use this document">
                <p>
                  <strong className="text-foreground">Retention and deletion</strong> for the full application record
                  (including any copies in email, spreadsheets, or CRM) are governed by your internal records-management
                  policy and applicable law. We recommend documenting default retention windows and a secure destruction
                  path for physical or exported files.
                </p>
                <p>
                  You may provide <strong className="text-foreground">this URL</strong> plus your subprocessors list
                  (hosting, database, email, automation) as a starter compliance packet. For bespoke lender questionnaires,
                  append answers that reference each vendor&apos;s SOC / ISO reports where required.
                </p>
              </SectionCard>
            </div>

            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-6 sm:p-8">
              <div>
                <h2 className="text-lg font-bold text-foreground">Additional recommendations</h2>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground marker:text-amber-600/80">
                    <li>Publish a formal privacy policy and data subprocessors addendum that names every system touching PII.</li>
                    <li>Run periodic access reviews for automation (Make/Zapier), CRM, and shared inboxes that receive applications.</li>
                    <li>Consider a CAPTCHA or bot mitigation on high-value forms if abuse becomes measurable.</li>
                    <li>Engage counsel for GLBA/FCMA or state-specific auto-finance privacy obligations that apply to your brokerage.</li>
                  </ul>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Ready to apply securely?</p>
                <p className="mt-1 text-sm text-muted-foreground">The same protections described here apply on the live form.</p>
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

        <aside
          className="hidden max-h-[calc(100vh-7.5rem)] w-56 overflow-y-auto rounded-xl border border-border bg-background p-5 shadow-lg ring-1 ring-border/40 dark:bg-slate-950 dark:ring-white/10 lg:fixed lg:right-[max(1rem,calc((100vw-72rem)/2+2rem))] lg:top-28 lg:z-30 lg:block"
          aria-label="On this page"
        >
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
            This is a technical summary, not legal advice. Pair with counsel and vendor DPAs for regulated use cases.
          </p>
        </aside>
      </section>

      <section className="border-t border-border/60 bg-muted/15 py-8 lg:hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

      <section className="border-t border-border/60 bg-muted/25 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 lg:pr-60">
          <h2 className="text-center text-xl font-bold text-foreground md:text-2xl">Compliance checklist alignment</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Map common reviewer questions to the sections above.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 text-sm text-muted-foreground">
            {[
              'HTTPS / TLS for all application traffic (Section 01)',
              'At-rest encryption via managed platforms & downstream tools (Section 02)',
              'No public URLs for applicant document payloads from this flow (Section 03)',
              'Role-based admin access and server-side email controls (Section 04)',
              'Operational guidance for PDF/email handling (Section 05)',
              'Secrets in server env, RLS, CORS, rate limits, managed hosting (Section 06)',
              'Centralized logging recommendation (Section 07)',
              'Retention + how to share this doc (Section 08)',
            ].map((line) => (
              <li
                key={line}
                className="rounded-lg border border-border/50 bg-background/80 px-4 py-3 text-left leading-relaxed"
              >
                <span className="font-semibold text-emerald-700 dark:text-emerald-400/90">&mdash; </span>
                {line}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">
            For an updated PDF or signed attestation, contact{' '}
            <a href="mailto:sales@capitalmotorcars.com" className="font-medium text-foreground underline-offset-4 hover:underline">
              sales@capitalmotorcars.com
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}
