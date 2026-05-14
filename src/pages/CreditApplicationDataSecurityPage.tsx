import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { ArrowLeft, Lock, Server, Shield, UserCheck } from 'lucide-react';

export default function CreditApplicationDataSecurityPage() {
  return (
    <Layout>
      <SEO
        title="How We Protect Your Credit Application | Capital Motor Cars"
        description="Learn how Capital Motor Cars encrypts and handles your credit application data from your device through our secure systems."
        seoKeywords={[
          'credit application security',
          'encrypted car finance application',
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
            'Overview of encryption in transit, secure submission, and access practices for online credit applications.',
          url: 'https://capitalmotorcars.com/credit-application/data-security',
        }}
      />

      <section className="bg-primary py-10 md:py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link
            to="/credit-application"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to credit application
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            How we protect your information
          </h1>
          <p className="mt-4 text-primary-foreground/85 text-base md:text-lg leading-relaxed">
            When you apply online, your details and documents are handled with industry-standard security from your
            browser through our systems to authorized Capital Motor Cars workflows.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-12">
          <article className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-accent/10 p-2 text-accent">
                <Lock className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Your information is encrypted end to end in transit</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Our website is served over <strong className="text-foreground">HTTPS</strong>. That means the connection
                  between your device and our servers uses <strong className="text-foreground">TLS</strong> (Transport Layer
                  Security), the same class of technology banks and insurers use for web sessions. Data you enter and
                  files you attach are encrypted while moving across the internet to us, so third parties cannot read
                  them off the wire in a normal network path.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  After your submission reaches our application infrastructure, it is forwarded to our internal
                  automation and broker tools using <strong className="text-foreground">secure (HTTPS) connections</strong>{' '}
                  as well, so sensitive payloads are not sent in the clear between systems we control.
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-accent/10 p-2 text-accent">
                <Server className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">What happens when you click submit</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  The credit application form in your browser sends your information to{' '}
                  <strong className="text-foreground">our own website API</strong> (same domain you see in the address
                  bar), not directly to a long list of third-party URLs embedded in the page. Our servers then relay the
                  application to the workflows our team uses to review and respond. That design keeps integration
                  details off the public page and reduces exposure of webhook endpoints in client-side code.
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-accent/10 p-2 text-accent">
                <Shield className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Email notifications (when applicable)</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Where we send lead summaries by email, messages are built on the server and delivered through a
                  professional email provider using modern transport security. Recipient addresses for consultants are
                  resolved from a <strong className="text-foreground">server-side allowlist</strong>, not from unchecked
                  values supplied by the browser, to reduce mis-routing or abuse.
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-accent/10 p-2 text-accent">
                <UserCheck className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Who can access your application</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Only <strong className="text-foreground">authorized Capital Motor Cars staff and systems</strong>{' '}
                  involved in processing your request receive application data. Internal dashboards that touch customer
                  or inventory data are protected with authentication and access rules appropriate to the platform we use
                  (for example, role-based access in our backend services).
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We do not design this flow so that driver licenses or credit details appear as public download links on
                  the open web. Retention and deletion of records in downstream tools follow our operational and legal
                  requirements; if you need a formal data retention statement for a lender or compliance review, contact
                  us and we can provide the latest written summary.
                </p>
              </div>
            </div>
          </article>

          <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Plain language:</strong> “End to end encrypted” on the application page
              refers to <strong className="text-foreground">encryption of your data in transit</strong> between your device
              and our HTTPS services, and secure forwarding from there—not to a separate consumer password you hold for an
              encrypted mailbox. This is the standard pattern for secure web applications in automotive finance.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/credit-application"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Return to application
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
