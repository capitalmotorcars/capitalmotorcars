import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  seoKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
}

/**
 * SEO component that sets document title, meta description, canonical URL,
 * and social sharing tags (Open Graph & Twitter).
 */
export function SEO({
  title,
  description,
  canonicalPath,
  seoKeywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Basic Meta
    document.title = title;

    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);

    // Robots (noindex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else if (metaRobots) {
      metaRobots.remove();
    }

    // Open Graph
    updateMeta('og:title', ogTitle || title, 'property');
    updateMeta('og:description', ogDescription || description, 'property');
    updateMeta('og:type', ogType, 'property');
    updateMeta('og:site_name', 'Capital Motor Cars', 'property');
    if (canonicalPath) {
      updateMeta('og:url', `https://www.capitalmotorcars.com${canonicalPath}`, 'property');
    }
    if (ogImage) updateMeta('og:image', ogImage, 'property');

    // Twitter
    updateMeta('twitter:card', twitterCard);
    updateMeta('twitter:title', ogTitle || title);
    updateMeta('twitter:description', ogDescription || description);
    if (ogImage) updateMeta('twitter:image', ogImage);

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalPath) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = `https://www.capitalmotorcars.com${canonicalPath}`;
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    // Keywords (optional)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (seoKeywords?.length) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seoKeywords.join(', '));
    } else if (metaKeywords) {
      metaKeywords.remove();
    }

    return () => {
      document.title = 'Capital Motor Cars';
    };
  }, [title, description, canonicalPath, seoKeywords, ogTitle, ogDescription, ogImage, ogType, twitterCard, noindex]);

  return null;
}
