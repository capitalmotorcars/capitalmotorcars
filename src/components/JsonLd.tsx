import { useEffect } from 'react';

type JsonLdData = Record<string, unknown>;
export interface BreadcrumbItem {
  name: string;
  url: string;
}

const SITE_URL = 'https://capitalmotorcars.com';
const DEFAULT_AUTHOR_NAME = 'Capital Motor Cars Editorial Team';

const routeLabelMap: Record<string, string> = {
  services: 'Services',
  'car-leasing': 'Car Leasing',
  financing: 'Financing',
  'trade-in': 'Trade-In',
  'trade-in-value': 'Trade-In Value',
  'wear-and-tear': 'Wear & Tear Repair',
  'wheel-repair': 'Wheel & Rim Repair',
  detailing: 'Detailing',
  brands: 'Brands',
  about: 'About',
  contact: 'Contact',
  'credit-application': 'Credit Application',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Use',
  quiz: 'Vehicle Quiz',
  blog: 'Blog',
  'car-lease-deals-new-jersey': 'Car Lease Deals New Jersey',
  'auto-leasing-new-jersey': 'Auto Leasing New Jersey',
  'luxury-car-leasing-nj': 'Luxury Car Leasing NJ',
  vehicles: 'Vehicles',
  admin: 'Admin',
  login: 'Login',
  deals: 'Deals',
  blogs: 'Blog Posts',
};

function startCaseSlug(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

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
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://capitalmotorcars.com/#organization',
  name: 'Capital Motor Cars',
  description: 'Simple, stress free car leasing and automotive services in New Jersey.',
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
    'https://www.facebook.com/capitalmotorcars/',
    'https://www.instagram.com/capitalmotorcars/',
    'https://www.linkedin.com/company/capital-motor-cars/',
    'https://www.x.com/capmotorcars',
    'https://www.yelp.com/biz/capital-motor-cars-springfield',
  ],
};

export const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  '@id': 'https://capitalmotorcars.com/#auto-dealer',
  name: 'Capital Motor Cars',
  url: SITE_URL,
  image: `${SITE_URL}/shared-img.png?v=2`,
  telephone: '+1-201-509-5555',
  email: 'sales@capitalmotorcars.com',
  priceRange: '$$',
  makesOffered: [
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Lexus',
    'Porsche',
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
  ],
  areaServed: [
    {
      '@type': 'State',
      name: 'New Jersey',
    },
    {
      '@type': 'State',
      name: 'New York',
    },
  ],
  address: localBusinessSchema.address,
  sameAs: localBusinessSchema.sameAs,
  parentOrganization: {
    '@id': localBusinessSchema['@id'],
  },
};

export const organizationSchema = localBusinessSchema;

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Capital Motor Cars',
  publisher: {
    '@id': localBusinessSchema['@id'],
  },
  inLanguage: 'en-US',
};

export function createSiteNavigationSchema(items: { name: string; url: string }[]) {
  return items.map((item) => ({
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: item.name,
    url: item.url,
  }));
}

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

export function createBreadcrumbItemsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [{ name: 'Home', url: `${SITE_URL}/` }];
  }

  const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: `${SITE_URL}/` }];
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: routeLabelMap[segment] || startCaseSlug(segment),
      url: `${SITE_URL}${currentPath}`,
    });
  }

  return breadcrumbs;
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

export function createArticleSchema(article: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: article.url,
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.authorName || DEFAULT_AUTHOR_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Capital Motor Cars',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function createLocalCarBrokerSchema(local: {
  city: string;
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoBroker',
    name: local.name,
    description: local.description,
    url: local.url,
    image: local.image,
    telephone: '+1-201-509-5555',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: local.city,
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: local.city,
    },
    provider: {
      '@type': 'Organization',
      name: 'Capital Motor Cars',
      url: SITE_URL,
    },
  };
}
