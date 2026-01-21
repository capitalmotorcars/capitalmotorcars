import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <Layout>
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Contact Us</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Ready to get started or have questions? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
              <div className="bg-muted p-6 md:p-8 rounded-lg">
                <ContactForm />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-muted-foreground">info@capitalmotorcars.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Location</h3>
                    <p className="text-muted-foreground">123 Auto Drive<br />City, State 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
