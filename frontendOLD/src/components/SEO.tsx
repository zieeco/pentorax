import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PentoraX - Powering a Sustainable Energy Future',
  description = 'Leading provider of solar energy solutions in Africa. We offer residential, commercial, and industrial solar installations with 25-year warranties and expert support.',
  keywords = 'solar energy, solar panels, renewable energy, solar installation, solar power, Nigeria solar, Africa solar, sustainable energy, solar solutions, PentoraX',
  ogTitle,
  ogDescription,
  ogImage = '/pentorax-og-image.png',
  ogUrl,
  twitterCard = 'summary_large_image',
  canonical,
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pentorax.com';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || currentUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="PentoraX" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={ogUrl || currentUrl} />
      <meta property="twitter:title" content={ogTitle || title} />
      <meta property="twitter:description" content={ogDescription || description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="PentoraX" />

      {/* Geo Tags */}
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Lagos" />
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0052CC" />
    </Helmet>
  );
};

export default SEO;
