import { getSiteUrl } from './utils';

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// SEO Keywords for different page types
export const SEO_KEYWORDS = {
  home: 'Sri Lanka travel, Sri Lanka tourism, visit Sri Lanka, Sri Lanka holidays, Sri Lanka vacation, Sri Lanka trip planner, best places to visit Sri Lanka 2026',
  destinations: 'Sri Lanka destinations, places to visit Sri Lanka, Sri Lanka tourist attractions, Sri Lanka sightseeing, top destinations Sri Lanka, must visit places Sri Lanka',
  itineraries: 'Sri Lanka itinerary, Sri Lanka travel plan, Sri Lanka trip itinerary, days in Sri Lanka, Sri Lanka tour package, Sri Lanka travel route',
  blog: 'Sri Lanka travel blog, Sri Lanka travel tips, Sri Lanka travel advice, Sri Lanka travel stories, visiting Sri Lanka guide',
  travelTips: 'Sri Lanka travel tips, Sri Lanka travel advice, Sri Lanka travel information, Sri Lanka travel guide, how to travel Sri Lanka, Sri Lanka tourist information',
  contact: 'contact Sri Lanka travel, Sri Lanka travel inquiry, book Sri Lanka trip, Sri Lanka tour booking',
};

// Generate full page title with site name
export function generateTitle(pageTitle: string): string {
  const siteName = 'Visit Sri Lanka';
  if (pageTitle === siteName || pageTitle.includes('Visit Sri Lanka')) return pageTitle;
  return `${pageTitle} | ${siteName}`;
}

// Generate canonical URL
export function generateCanonical(path: string): string {
  const siteUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash except for home page
  const normalizedPath = cleanPath === '/' ? cleanPath : cleanPath.replace(/\/$/, '');
  return `${siteUrl}${normalizedPath}`;
}

// Generate OpenGraph meta tags
export function generateOGTags(meta: PageMeta) {
  const siteUrl = getSiteUrl();
  return {
    'og:title': meta.title,
    'og:description': meta.description,
    'og:type': meta.type || 'website',
    'og:url': meta.canonical || siteUrl,
    'og:image': meta.image || `${siteUrl}/og-image.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': meta.title,
    'og:site_name': 'Visit Sri Lanka',
    'og:locale': 'en_US',
  };
}

// Generate Twitter Card meta tags
export function generateTwitterTags(meta: PageMeta) {
  const siteUrl = getSiteUrl();
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@visitsrilanka',
    'twitter:creator': '@visitsrilanka',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': meta.image || `${siteUrl}/og-image.jpg`,
    'twitter:image:alt': meta.title,
  };
}

// Generate JSON-LD for Organization
export function generateOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteUrl}/#organization`,
    name: 'Visit Sri Lanka',
    alternateName: 'VisitSriLanka',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: '512',
      height: '512',
    },
    image: `${siteUrl}/og-image.jpg`,
    description: 'Your comprehensive travel guide to exploring Sri Lanka - the Pearl of the Indian Ocean',
    slogan: 'Discover the Pearl of the Indian Ocean',
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    sameAs: [
      'https://www.facebook.com/visitsrilanka',
      'https://www.instagram.com/visitsrilanka',
      'https://twitter.com/visitsrilanka',
      'https://www.youtube.com/@visitsrilanka',
      'https://www.pinterest.com/visitsrilanka',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Sinhala', 'Tamil'],
    },
  };
}

// Generate JSON-LD for WebSite with search action
export function generateWebsiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Visit Sri Lanka',
    alternateName: 'Sri Lanka Travel Guide',
    url: siteUrl,
    description: 'Comprehensive travel guide to Sri Lanka featuring destinations, itineraries, travel tips, and local insights',
    inLanguage: 'en',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate JSON-LD for BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

// Generate JSON-LD for Article (blog posts)
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  url: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Organization',
      name: article.author || 'Visit Sri Lanka',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Visit Sri Lanka',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${siteUrl}${article.url}`,
    },
  };
}

// Generate JSON-LD for FAQPage
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
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

// Generate JSON-LD for TouristDestination
export function generateDestinationSchema(destination: {
  name: string;
  description: string;
  image: string;
  url: string;
  coordinates?: { lat: number; lng: number };
  highlights?: string[];
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    image: destination.image,
    url: destination.url.startsWith('http') ? destination.url : `${siteUrl}${destination.url}`,
    touristType: ['Cultural tourist', 'Nature lover', 'Adventure seeker', 'Photographer'],
    containedInPlace: {
      '@type': 'Country',
      name: 'Sri Lanka',
      '@id': 'https://www.wikidata.org/wiki/Q854',
    },
    ...(destination.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng,
      },
    }),
  };
}

// Generate JSON-LD for TravelAction / Trip Itinerary
export function generateItinerarySchema(itinerary: {
  name: string;
  description: string;
  image: string;
  url: string;
  duration: string;
  price?: string;
  destinations?: string[];
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: itinerary.name,
    description: itinerary.description,
    image: itinerary.image,
    url: itinerary.url.startsWith('http') ? itinerary.url : `${siteUrl}${itinerary.url}`,
    itinerary: {
      '@type': 'ItemList',
      name: `${itinerary.name} Itinerary`,
      numberOfItems: itinerary.destinations?.length || 0,
      itemListElement: itinerary.destinations?.map((dest, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: dest,
      })),
    },
    touristType: ['Cultural tourist', 'Nature lover', 'Adventure seeker'],
    provider: {
      '@type': 'TravelAgency',
      name: 'Visit Sri Lanka',
      url: siteUrl,
    },
  };
}

// Generate JSON-LD for HowTo (Travel Tips)
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  image: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Generate JSON-LD for ItemList (Collection pages)
export function generateItemListSchema(list: {
  name: string;
  description: string;
  items: { name: string; url: string; image?: string; position: number }[];
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.name,
    description: list.description,
    numberOfItems: list.items.length,
    itemListElement: list.items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
      ...(item.image && { image: item.image }),
    })),
  };
}

// Generate JSON-LD for LocalBusiness (Contact page)
export function generateLocalBusinessSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Visit Sri Lanka',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: 'Your comprehensive travel guide to exploring Sri Lanka',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: 'Colombo',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '6.9271',
      longitude: '79.8612',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  };
}

// Generate JSON-LD for WebPage
export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': page.type || 'WebPage',
    name: page.name,
    description: page.description,
    url: page.url.startsWith('http') ? page.url : `${siteUrl}${page.url}`,
    ...(page.image && { primaryImageOfPage: { '@type': 'ImageObject', url: page.image } }),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    inLanguage: 'en',
  };
}

// Generate JSON-LD for Review aggregate
export function generateAggregateRatingSchema(rating: {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'TouristDestination',
      name: rating.itemName,
    },
    ratingValue: rating.ratingValue,
    bestRating: rating.bestRating || 5,
    ratingCount: rating.reviewCount,
  };
}

// Generate JSON-LD for Video (if using video content)
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'Visit Sri Lanka',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}

// Generate meta keywords string
export function generateKeywords(baseKeywords: string, additionalKeywords: string[] = []): string {
  const keywords = [baseKeywords, ...additionalKeywords].filter(Boolean).join(', ');
  return keywords;
}
