import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

/**
 * SEO component that sets document title and meta description.
 * - Titles should be under 60 characters
 * - Descriptions should be under 160 characters
 */
export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Cleanup: restore default title on unmount (optional)
    return () => {
      document.title = 'Capital Motor Cars';
    };
  }, [title, description]);

  return null;
}
