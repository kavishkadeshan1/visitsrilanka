import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  generateTitle,
  generateCanonical,
  generateOGTags,
  generateTwitterTags,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  type PageMeta,
} from '@/lib/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  breadcrumbs?: { name: string; url: string }[];
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  type = 'website',
  publishedDate,
  modifiedDate,
  author,
  noindex = false,
  jsonLd,
  breadcrumbs,
}: SEOHeadProps) {
  const location = useLocation();
  const canonical = generateCanonical(location.pathname);

  const meta: PageMeta = {
    title: generateTitle(title),
    description,
    canonical,
    image,
    type,
    publishedDate,
    modifiedDate,
    author,
  };

  const og = generateOGTags(meta);
  const twitter = generateTwitterTags(meta);

  // Combine custom JSON-LD with site-wide schemas
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    ...(breadcrumbs ? [generateBreadcrumbSchema(breadcrumbs)] : []),
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ];

  // Default keywords for Sri Lanka travel
  const defaultKeywords = 'Sri Lanka travel, Sri Lanka tourism, visit Sri Lanka, Sri Lanka holidays';
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{meta.title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex,nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} 
      />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index, follow'} />
      
      {/* Author & Publisher */}
      <meta name="author" content={author || 'Visit Sri Lanka'} />
      <meta name="publisher" content="Visit Sri Lanka" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="LK" />
      <meta name="geo.placename" content="Sri Lanka" />
      
      {/* OpenGraph */}
      {Object.entries(og).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Card */}
      {Object.entries(twitter).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Article meta (for blog posts) */}
      {type === 'article' && (
        <>
          <meta property="article:section" content="Travel" />
          <meta property="article:tag" content="Sri Lanka" />
          <meta property="article:tag" content="Travel" />
          <meta property="article:tag" content="Tourism" />
        </>
      )}
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {author && <meta property="article:author" content={author} />}
      
      {/* Mobile & App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Visit Sri Lanka" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}
