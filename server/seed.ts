/**
 * Seed script — migrates existing static TypeScript content into the SQLite database.
 * Run once: npx tsx server/seed.ts
 */
import db, { initializeDatabase } from './db';

// Import static content
import { destinations } from '../src/content/destinations';
import { itineraries } from '../src/content/itineraries';
import { blogPosts } from '../src/content/blog-posts';
import { travelTips } from '../src/content/travel-tips';

function seedDestinations() {
  const existingCount = (db.prepare('SELECT COUNT(*) as count FROM destinations').get() as any).count;
  if (existingCount > 0) {
    console.log(`⏩ Destinations already seeded (${existingCount} records)`);
    return;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO destinations (slug, title, short_description, long_content, hero_image, region,
      recommended_days, best_time_to_visit, tags, gallery_images, highlights, lat, lng, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAll = db.transaction(() => {
    destinations.forEach((d, i) => {
      insert.run(
        d.slug, d.title, d.shortDescription, d.longContent, d.heroImage, d.region,
        d.recommendedDays, d.bestTimeToVisit, JSON.stringify(d.tags),
        JSON.stringify(d.galleryImages), JSON.stringify(d.highlights),
        d.coordinates.lat, d.coordinates.lng, i
      );
    });
  });

  insertAll();
  console.log(`✅ Seeded ${destinations.length} destinations`);
}

function seedItineraries() {
  const existingCount = (db.prepare('SELECT COUNT(*) as count FROM itineraries').get() as any).count;
  if (existingCount > 0) {
    console.log(`⏩ Itineraries already seeded (${existingCount} records)`);
    return;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO itineraries (slug, title, short_description, long_content, hero_image, duration, type,
      tags, highlights, inclusions, starting_price, difficulty, group_size, days, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAll = db.transaction(() => {
    itineraries.forEach((it, i) => {
      insert.run(
        it.slug, it.title, it.shortDescription, it.longContent, it.heroImage,
        it.duration, it.type, JSON.stringify(it.tags), JSON.stringify(it.highlights),
        JSON.stringify(it.inclusions), it.startingPrice, it.difficulty,
        it.groupSize, JSON.stringify(it.days), i
      );
    });
  });

  insertAll();
  console.log(`✅ Seeded ${itineraries.length} itineraries`);
}

function seedBlogPosts() {
  const existingCount = (db.prepare('SELECT COUNT(*) as count FROM blog_posts').get() as any).count;
  if (existingCount > 0) {
    console.log(`⏩ Blog posts already seeded (${existingCount} records)`);
    return;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO blog_posts (slug, title, short_description, long_content, hero_image, author,
      published_date, last_updated, category, tags, reading_time, featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAll = db.transaction(() => {
    blogPosts.forEach((b, i) => {
      insert.run(
        b.slug, b.title, b.shortDescription, b.longContent, b.heroImage,
        b.author, b.publishedDate, b.lastUpdated, b.category,
        JSON.stringify(b.tags), b.readingTime, b.featured ? 1 : 0, i
      );
    });
  });

  insertAll();
  console.log(`✅ Seeded ${blogPosts.length} blog posts`);
}

function seedTravelTips() {
  const existingCount = (db.prepare('SELECT COUNT(*) as count FROM travel_tips').get() as any).count;
  if (existingCount > 0) {
    console.log(`⏩ Travel tips already seeded (${existingCount} records)`);
    return;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO travel_tips (slug, title, short_description, long_content, hero_image,
      category, tags, last_updated, faqs, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAll = db.transaction(() => {
    travelTips.forEach((t, i) => {
      insert.run(
        t.slug, t.title, t.shortDescription, t.longContent, t.heroImage,
        t.category, JSON.stringify(t.tags), t.lastUpdated,
        JSON.stringify(t.faqs), i
      );
    });
  });

  insertAll();
  console.log(`✅ Seeded ${travelTips.length} travel tips`);
}

// Run seeding
console.log('\n🌱 Seeding database...\n');
initializeDatabase();
seedDestinations();
seedItineraries();
seedBlogPosts();
seedTravelTips();
console.log('\n🎉 Database seeding complete!\n');
