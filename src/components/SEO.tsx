import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  seoKeywords?: string[];
}

/**
 * SEO component that sets document title, meta description, canonical URL, and optional keywords.
 * - Titles should be under 60 characters
 * - Descriptions should be under 160 characters
 */
export function SEO({ title, description, canonicalPath, seoKeywords }: SEOProps) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalPath) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = `${typeof window !== 'undefined' ? window.location.origin : ''}${canonicalPath}`;
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
  }, [title, description, canonicalPath, seoKeywords]);

  return null;
}
