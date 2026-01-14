import React from 'react';
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
declare const SEO: React.FC<SEOProps>;
export default SEO;
