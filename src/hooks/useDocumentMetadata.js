import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage SEO and social sharing metadata.
 * 
 * @param {Object} metadata
 * @param {string} metadata.title - The document title
 * @param {string} [metadata.description] - Meta description
 * @param {string} [metadata.keywords] - Meta keywords (comma-separated)
 * @param {string} [metadata.ogImage] - Open Graph image URL
 * @param {string} [metadata.canonicalUrl] - Canonical URL for the page
 */
export default function useDocumentMetadata({ title, description, keywords, ogImage, canonicalUrl }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create meta tag
    const updateOrCreateMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Basic Meta Tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);

    // 3. Update Open Graph (OG) Meta Tags
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', 'website', true);
    if (ogImage) {
      updateOrCreateMeta('og:image', ogImage, true);
    }

    // 4. Update Twitter Cards
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    if (ogImage) {
      updateOrCreateMeta('twitter:image', ogImage);
    }

    // 5. Canonical Link
    const currentUrl = canonicalUrl || window.location.href;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [title, description, keywords, ogImage, canonicalUrl]);
}
