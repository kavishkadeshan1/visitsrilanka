/**
 * Sitemap Generator Script
 * 
 * Generates sitemap.xml and sitemap-images.xml for all routes in the Visit Sri Lanka website.
 * Run with: npm run generate:sitemap
 */

import { writeFileSync } from 'fs';
import { destinations } from '../src/content/destinations';
import { itineraries } from '../src/content/itineraries';
import { travelTips } from '../src/content/travel-tips';
import { blogPosts } from '../src/content/blog-posts';

const SITE_URL = process.env.VITE_SITE_URL || 'https://visitsrilanka.online';

// Static routes with enhanced SEO data
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'daily', title: 'Visit Sri Lanka - Travel Guide' },
  { path: '/destinations', priority: 0.9, changefreq: 'weekly', title: 'Sri Lanka Destinations' },
  { path: '/thalaramba-beach', priority: 0.9, changefreq: 'weekly', title: 'Thalaramba Beach Travel Guide' },
  { path: '/itineraries', priority: 0.9, changefreq: 'weekly', title: 'Sri Lanka Itineraries' },
  { path: '/travel-tips', priority: 0.8, changefreq: 'weekly', title: 'Travel Tips' },
  { path: '/blog', priority: 0.8, changefreq: 'daily', title: 'Travel Blog' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly', title: 'Contact Us' },
  { path: '/about', priority: 0.6, changefreq: 'monthly', title: 'About Us' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly', title: 'Privacy Policy' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly', title: 'Terms of Service' },
];

// Dynamic routes from content with images
const destinationRoutes = destinations.map((d) => ({
  path: `/destinations/${d.slug}`,
  priority: 0.8,
  changefreq: 'weekly' as const,
  title: d.title,
  image: d.heroImage,
  imageTitle: d.title,
  imageCaption: d.shortDescription,
}));

const itineraryRoutes = itineraries.map((i) => ({
  path: `/itineraries/${i.slug}`,
  priority: 0.8,
  changefreq: 'weekly' as const,
  title: i.title,
  image: i.heroImage,
  imageTitle: i.title,
  imageCaption: i.description,
}));

const tipRoutes = travelTips.map((t) => ({
  path: `/travel-tips/${t.slug}`,
  priority: 0.7,
  changefreq: 'monthly' as const,
  lastmod: t.lastUpdated,
  title: t.title,
  image: t.heroImage,
  imageTitle: t.title,
  imageCaption: t.excerpt,
}));

const blogRoutes = blogPosts.map((b) => ({
  path: `/blog/${b.slug}`,
  priority: 0.7,
  changefreq: 'weekly' as const,
  lastmod: b.lastUpdated,
  title: b.title,
  image: b.heroImage,
  imageTitle: b.title,
  imageCaption: b.excerpt,
}));

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...destinationRoutes,
  ...itineraryRoutes,
  ...tipRoutes,
  ...blogRoutes,
];

// Generate main sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = allRoutes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${(route as { lastmod?: string }).lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  return sitemap;
}

// Generate image sitemap for Google Images
function generateImageSitemap() {
  const routesWithImages = allRoutes.filter((route) => 'image' in route && route.image);

  const urls = routesWithImages
    .map((route) => {
      const r = route as { path: string; image: string; imageTitle?: string; imageCaption?: string };
      return `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <image:image>
      <image:loc>${r.image}</image:loc>
      ${r.imageTitle ? `<image:title>${escapeXml(r.imageTitle)}</image:title>` : ''}
      ${r.imageCaption ? `<image:caption>${escapeXml(r.imageCaption)}</image:caption>` : ''}
      <image:geo_location>Sri Lanka</image:geo_location>
    </image:image>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return sitemap;
}

// Escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate sitemap index
function generateSitemapIndex() {
  const today = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Write all sitemaps
const sitemap = generateSitemap();
writeFileSync('public/sitemap.xml', sitemap);

const imageSitemap = generateImageSitemap();
writeFileSync('public/sitemap-images.xml', imageSitemap);

const sitemapIndex = generateSitemapIndex();
writeFileSync('public/sitemap-index.xml', sitemapIndex);

console.log(`✅ Generated sitemaps with ${allRoutes.length} URLs`);
console.log(`📍 Static routes: ${staticRoutes.length}`);
console.log(`📍 Destinations: ${destinationRoutes.length}`);
console.log(`📍 Itineraries: ${itineraryRoutes.length}`);
console.log(`📍 Travel Tips: ${tipRoutes.length}`);
console.log(`📍 Blog Posts: ${blogRoutes.length}`);
console.log(`🖼️  Image sitemap: ${allRoutes.filter(r => 'image' in r).length} images`);
