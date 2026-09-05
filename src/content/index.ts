// Content Index - Export all content modules
export * from './destinations';
export * from './itineraries';
export * from './travel-tips';
export * from './blog-posts';

// Search helper - searches across all content
export interface SearchResult {
  type: 'destination' | 'itinerary' | 'tip' | 'blog';
  slug: string;
  title: string;
  description: string;
  url: string;
}

import { destinations } from './destinations';
import { itineraries } from './itineraries';
import { travelTips } from './travel-tips';
import { blogPosts } from './blog-posts';

export function searchContent(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  const results: SearchResult[] = [];

  // Search destinations
  destinations.forEach((d) => {
    if (
      d.title.toLowerCase().includes(q) ||
      d.shortDescription.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'destination',
        slug: d.slug,
        title: d.title,
        description: d.shortDescription,
        url: `/destinations/${d.slug}`,
      });
    }
  });

  // Search itineraries
  itineraries.forEach((i) => {
    if (
      i.title.toLowerCase().includes(q) ||
      i.shortDescription.toLowerCase().includes(q) ||
      i.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'itinerary',
        slug: i.slug,
        title: i.title,
        description: i.shortDescription,
        url: `/itineraries/${i.slug}`,
      });
    }
  });

  // Search travel tips
  travelTips.forEach((t) => {
    if (
      t.title.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'tip',
        slug: t.slug,
        title: t.title,
        description: t.shortDescription,
        url: `/travel-tips/${t.slug}`,
      });
    }
  });

  // Search blog posts
  blogPosts.forEach((b) => {
    if (
      b.title.toLowerCase().includes(q) ||
      b.shortDescription.toLowerCase().includes(q) ||
      b.tags.some((tag) => tag.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'blog',
        slug: b.slug,
        title: b.title,
        description: b.shortDescription,
        url: `/blog/${b.slug}`,
      });
    }
  });

  return results.slice(0, 10); // Limit results
}
