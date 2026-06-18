import { useEffect } from 'react';

type JsonLdData = Record<string, unknown>;
export interface BreadcrumbItem {
  name: string;
  url: string;
}

const SITE_URL = 'https://www.capitalmotorcars.com';
const DEFAULT_AUTHOR_NAME = 'Capital Motor Cars Editorial Team';

const routeLabelMap: Record<string, string> = {
  services: 'Services',
  'car-leasing': 'Car Leasing',
  credit: 'Credit & leasing',
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
  '@id': 'https://www.capitalmotorcars.com/#organization',
  name: 'Capital Motor Cars',
  description: 'Simple, stress free car leasing and automotive services in New Jersey.',
  url: 'https://www.capitalmotorcars.com',
  telephone: '+1-201-509-5555',
  email: 'info@capitalmotorcars.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.capitalmotorcars.com/logo.png',
    width: 512,
    height: 512,
  },
  image: 'https://www.capitalmotorcars.com/shared-img.png',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '251 Morris Avenue',
      addressLocality: 'Springfield Township',
      addressRegion: 'NJ',
      postalCode: '07081',
      addressCountry: 'US',
      geo: { '@type': 'GeoCoordinates', latitude: 40.6939, longitude: -74.3252 },
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '105 Merchant Way',
      addressLocality: 'Marlton',
      addressRegion: 'NJ',
      postalCode: '08053',
      addressCountry: 'US',
      geo: { '@type': 'GeoCoordinates', latitude: 39.8923, longitude: -74.9205 },
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '115 River Road, Suite 158',
      addressLocality: 'Edgewater',
      addressRegion: 'NJ',
      postalCode: '07020',
      addressCountry: 'US',
      geo: { '@type': 'GeoCoordinates', latitude: 40.8248, longitude: -74.0003 },
    },
  ],
  areaServed: {
    '@type': 'State',
    name: 'New Jersey',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '760',
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '00:00',
      closes: '00:00',
    },
  ],
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
  '@id': 'https://www.capitalmotorcars.com/#organization',
  name: 'Capital Motor Cars',
  url: 'https://www.capitalmotorcars.com/',
  logo: 'https://www.capitalmotorcars.com/logo.png',
  image: 'https://www.capitalmotorcars.com/og/hero-bg.jpg',
  description: 'Capital Motor Cars is a licensed auto broker and car-leasing service serving New Jersey and New York. A dedicated personal consultant negotiates new-car lease and purchase deals (luxury, SUV, sedan) with zero-down options and free home delivery.',
  telephone: '+1-201-509-5555',
  areaServed: ['New Jersey', 'New York'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '251 Morris Avenue',
    addressLocality: 'Springfield',
    addressRegion: 'NJ',
    postalCode: '07081',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/capitalmotorcars/',
    'https://www.instagram.com/capitalmotorcars/',
    'https://www.linkedin.com/company/capital-motor-cars/',
    'https://x.com/capmotorcars',
    'https://www.yelp.com/biz/capital-motor-cars-springfield',
  ],
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
      '@id': 'https://www.capitalmotorcars.com/#organization',
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
    const pathSegment = segment === 'financing' ? 'credit' : segment;
    currentPath += `/${pathSegment}`;
    breadcrumbs.push({
      name: routeLabelMap[pathSegment] || startCaseSlug(pathSegment),
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
      '@id': 'https://www.capitalmotorcars.com/#website',
      name: 'Capital Motor Cars',
      url: 'https://www.capitalmotorcars.com',
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

export function createHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function createPersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    email: person.email,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Capital Motor Cars',
      url: SITE_URL,
    },
    sameAs: person.sameAs,
  };
}


export function createVehicleSchema(deal: {
  make: string;
  model: string;
  year: number;
  trim?: string;
  monthly_price: number;
  down_payment: number;
  lease_term: number;
  image_url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${deal.year} ${deal.make} ${deal.model} ${deal.trim || ''}`.trim(),
    image: deal.image_url,
    brand: {
      '@type': 'Brand',
      name: deal.make,
    },
    modelDate: deal.year.toString(),
    itemCondition: 'https://schema.org/NewCondition',
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: deal.monthly_price,
        priceCurrency: 'USD',
        unitCode: 'MON',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON'
        }
      },
      itemOffered: {
        '@type': 'Service',
        name: 'Auto Lease',
        description: `${deal.lease_term} month lease with $${deal.down_payment} due at signing.`
      },
      seller: {
        '@type': 'AutoDealer',
        name: 'Capital Motor Cars',
        url: 'https://www.capitalmotorcars.com',
      },
    },
  };
}
