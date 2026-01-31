import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy | Capital Motor Cars"
        description="Learn how Capital Motor Cars collects, uses, and protects your personal information. Your privacy matters to us."
      />
      <section className="bg-primary py-10 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground line-clamp-2 max-w-[95vw] md:max-w-none">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-gray prose-sm sm:prose-base">
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2 className="text-xl font-semibold text-primary mt-10">Who we are</h2>
          <p className="text-muted-foreground">Our website address is: https://capitalmotorcars.com/</p>

          <h2 className="text-xl font-semibold text-primary mt-10">Comments</h2>
          <p className="text-muted-foreground">
            When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
          </p>
          <p className="text-muted-foreground">
            An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here:{' '}
            <a href="https://automattic.com/privacy/" target="_blank" rel="noreferrer">
              https://automattic.com/privacy/
            </a>
            . After approval of your comment, your profile picture is visible to the public in the context of your comment.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Media</h2>
          <p className="text-muted-foreground">
            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Cookies</h2>
          <p className="text-muted-foreground">
            If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
          </p>
          <p className="text-muted-foreground">
            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
          </p>
          <p className="text-muted-foreground">
            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
          </p>
          <p className="text-muted-foreground">
            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Embedded content from other websites</h2>
          <p className="text-muted-foreground">
            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
          </p>
          <p className="text-muted-foreground">
            These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Who we share your data with</h2>
          <p className="text-muted-foreground">
            If you request a password reset, your IP address will be included in the reset email.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">How long we retain your data</h2>
          <p className="text-muted-foreground">
            If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
          </p>
          <p className="text-muted-foreground">
            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">What rights you have over your data</h2>
          <p className="text-muted-foreground">
            If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Where we send your data</h2>
          <p className="text-muted-foreground">
            Visitor comments may be checked through an automated spam detection service.
          </p>
          <p className="text-muted-foreground">
            We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. Additionally, we use this information for site optimization, fraud/security purposes, and advertising. For more information about how Microsoft collects and uses your data, visit the Microsoft Privacy Statement.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Consent to Receive SMS/MMS Notifications</h2>
          <p className="text-muted-foreground">
            By providing your mobile number, you agree that Capital Motor Cars may send you periodic SMS or MMS messages containing, but not limited to, important information, updates, deals, and specials. Message and data rates may apply. You will receive up to 4 messages per month. You may unsubscribe at any time by texting the word STOP to the (908) 350-9927. You may receive a subsequent message confirming your opt-out request. Though Capital Motor Cars will never charge you for the text messages you receive, depending on your phone plan, you may see some charges from your mobile provider. Please reach out to your wireless provider if you have questions about your text or data plan.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-10">Privacy Policy</h2>
          <p className="text-muted-foreground">
            No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data consent, this information will not be shared with any third parties.
          </p>
        </div>
      </section>
    </Layout>
  );
}
