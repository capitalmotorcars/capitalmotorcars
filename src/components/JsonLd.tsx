import { useEffect } from 'react';

type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

/**
 * Renders JSON-LD structured data in the document head.
 * Supports Organization, LocalBusiness, Service, FAQ, and other schema types.
 */
export function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Reusable schema definitions
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://capitalmotorcars.com/#organization',
  name: 'Capital Motor Cars',
  description: 'Simple, stress-free car leasing and automotive services in New Jersey.',
  url: 'https://capitalmotorcars.com',
  telephone: '+1-201-509-5555',
  email: 'info@capitalmotorcars.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '251 Morris Avenue',
      addressLocality: 'Springfield Township',
      addressRegion: 'NJ',
      postalCode: '07081',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '105 Merchant Way',
      addressLocality: 'Marlton',
      addressRegion: 'NJ',
      postalCode: '08053',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '115 River Road, Suite 158',
      addressLocality: 'Edgewater',
      addressRegion: 'NJ',
      postalCode: '07020',
      addressCountry: 'US',
    },
  ],
  areaServed: {
    '@type': 'State',
    name: 'New Jersey',
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://facebook.com/capitalmotorcars',
    'https://instagram.com/capitalmotorcars',
  ],
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://capitalmotorcars.com/#organization',
      name: 'Capital Motor Cars',
    },
    areaServed: {
      '@type': 'State',
      name: 'New Jersey',
    },
  };
}

export function createFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://capitalmotorcars.com/#website',
      name: 'Capital Motor Cars',
      url: 'https://capitalmotorcars.com',
    },
  };
}
