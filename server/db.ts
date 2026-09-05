import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

// Fallback seed data in case database is empty or native sqlite fails
import { destinations as initialDestinations } from '../src/content/destinations';
import { itineraries as initialItineraries } from '../src/content/itineraries';
import { blogPosts as initialBlogPosts } from '../src/content/blog-posts';
import { travelTips as initialTravelTips } from '../src/content/travel-tips';

const require = createRequire(import.meta.url);
const isVercel = Boolean(process.env.VERCEL);

let db: any = null;
let useFallback = isVercel; // On Vercel, use pure-JS store to completely avoid native C++ crash

// ─── Try Loading Native better-sqlite3 (only on non-Vercel environments) ───
if (!isVercel) {
  try {
    const Database = require('better-sqlite3');
    const DATA_DIR = path.join(process.cwd(), 'data');
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const dbPath = path.join(DATA_DIR, 'site.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    console.log(`✅ Local SQLite connected at: ${dbPath}`);
  } catch (err: any) {
    console.warn('⚠️ Native better-sqlite3 not available:', err.message);
    useFallback = true;
  }
}

// ─── Pure-JS Database Store for Vercel Serverless ───
if (useFallback || !db) {
  const storePath = isVercel ? '/tmp/site-store.json' : path.join(process.cwd(), 'data', 'site-store.json');

  const defaultSettings: Record<string, string> = {
    hero_title: 'Discover the Wonder of Sri Lanka',
    hero_subtitle: 'Ancient temples. Pristine beaches. Misty mountains. A journey curated for the curious soul.',
    hero_badge: 'The Pearl of the Indian Ocean',
    hero_image: '/images/hero-nine-arch.jpg',
    whatsapp_number: '+94701234567',
    contact_email: 'info@visitsrilanka.online',
    about_title: 'About Visit Sri Lanka',
    about_content: 'Your gateway to exploring the wonders of Sri Lanka.',
    site_name: 'Visit Sri Lanka',
    categories: JSON.stringify([
      { title: 'Beach & Coast', image: '/images/beach-category.jpg', link: '/destinations', icon: 'Waves' },
      { title: 'Cultural Heritage', image: 'https://images.unsplash.com/photo-1588258524675-65b32578a837?w=600&q=80', link: '/destinations', icon: 'Compass' },
      { title: 'Wildlife Safari', image: '/images/wildlife-category.jpg', link: '/destinations', icon: 'Camera' },
      { title: 'Hill Country', image: 'https://images.unsplash.com/photo-1566296440364-3a9fb1df10a8?w=600&q=80', link: '/destinations', icon: 'Mountain' },
      { title: 'Adventure', image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80', link: '/destinations', icon: 'Play' },
      { title: 'Ayurveda & Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', link: '/destinations', icon: 'TreePalm' },
    ]),
    testimonials: JSON.stringify([
      { name: 'Sarah M.', location: 'London, UK', text: 'Sri Lanka exceeded all our expectations. From the ancient temples to the pristine beaches, every day was an adventure.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
      { name: 'James & Emily', location: 'Sydney, Australia', text: 'The 10-day itinerary was perfectly planned. Seeing blue whales in Mirissa and spotting leopards at Yala - memories we\'ll treasure forever.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=3' },
      { name: 'Michael T.', location: 'New York, USA', text: 'The train ride from Kandy to Ella was worth the trip alone. Incredible scenery, friendly locals, and amazing food.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=4' },
    ]),
    faqs: JSON.stringify([
      { question: 'What is the best time to visit Sri Lanka?', answer: 'Sri Lanka can be visited year-round. The west and south coasts are best December to April, the east coast May to September.' },
      { question: 'How many days do I need in Sri Lanka?', answer: 'We recommend at least 7-10 days. For a comprehensive trip, 14 days is ideal.' },
      { question: 'Is Sri Lanka safe for tourists?', answer: 'Yes, Sri Lanka is considered one of the safest countries in Asia for tourists.' },
      { question: 'Do I need a visa to visit Sri Lanka?', answer: 'Most nationalities need an Electronic Travel Authorization (ETA), available online.' },
      { question: 'What are the must-visit places?', answer: 'Sigiriya Rock Fortress, Galle Fort, Kandy Temple of the Tooth, Ella, Yala National Park, and Mirissa.' },
    ]),
  };

  let memoryStore: {
    admin_users: any[];
    destinations: any[];
    itineraries: any[];
    blog_posts: any[];
    travel_tips: any[];
    site_settings: Record<string, any>;
  } = {
    admin_users: [
      {
        id: 1,
        username: 'admin',
        password_hash: bcrypt.hashSync('admin123', 10),
        created_at: new Date().toISOString(),
      },
    ],
    destinations: initialDestinations.map((d, i) => ({
      id: i + 1,
      slug: d.slug,
      title: d.title,
      short_description: d.shortDescription,
      long_content: d.longContent,
      hero_image: d.heroImage,
      region: d.region,
      recommended_days: d.recommendedDays,
      best_time_to_visit: d.bestTimeToVisit,
      tags: JSON.stringify(d.tags),
      gallery_images: JSON.stringify(d.galleryImages || []),
      highlights: JSON.stringify(d.highlights || []),
      lat: d.coordinates?.lat || 0,
      lng: d.coordinates?.lng || 0,
      sort_order: i,
    })),
    itineraries: initialItineraries.map((it, i) => ({
      id: i + 1,
      slug: it.slug,
      title: it.title,
      short_description: it.shortDescription,
      long_content: it.longContent,
      hero_image: it.heroImage,
      duration: it.duration,
      type: it.type,
      tags: JSON.stringify(it.tags),
      highlights: JSON.stringify(it.highlights || []),
      inclusions: JSON.stringify(it.inclusions || []),
      starting_price: it.startingPrice,
      difficulty: it.difficulty,
      group_size: it.groupSize,
      days: JSON.stringify(it.days || []),
      sort_order: i,
    })),
    blog_posts: initialBlogPosts.map((b, i) => ({
      id: i + 1,
      slug: b.slug,
      title: b.title,
      short_description: b.shortDescription,
      long_content: b.longContent,
      hero_image: b.heroImage,
      author: b.author,
      published_date: b.publishedDate,
      last_updated: b.lastUpdated,
      category: b.category,
      tags: JSON.stringify(b.tags),
      reading_time: b.readingTime,
      featured: b.featured ? 1 : 0,
      sort_order: i,
    })),
    travel_tips: initialTravelTips.map((t, i) => ({
      id: i + 1,
      slug: t.slug,
      title: t.title,
      short_description: t.shortDescription,
      long_content: t.longContent,
      hero_image: t.heroImage,
      category: t.category,
      tags: JSON.stringify(t.tags),
      last_updated: t.lastUpdated,
      faqs: JSON.stringify(t.faqs || []),
      sort_order: i,
    })),
    site_settings: { ...defaultSettings },
  };

  // Load from /tmp if previously saved
  if (fs.existsSync(storePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(storePath, 'utf8'));
      if (parsed.destinations?.length > 0) memoryStore.destinations = parsed.destinations;
      if (parsed.itineraries?.length > 0) memoryStore.itineraries = parsed.itineraries;
      if (parsed.blog_posts?.length > 0) memoryStore.blog_posts = parsed.blog_posts;
      if (parsed.travel_tips?.length > 0) memoryStore.travel_tips = parsed.travel_tips;
      if (parsed.site_settings && Object.keys(parsed.site_settings).length > 0) {
        memoryStore.site_settings = { ...defaultSettings, ...parsed.site_settings };
      }
      if (parsed.admin_users?.length > 0) memoryStore.admin_users = parsed.admin_users;
    } catch {}
  }

  const persist = () => {
    try {
      fs.writeFileSync(storePath, JSON.stringify(memoryStore, null, 2));
    } catch {}
  };

  db = {
    pragma: () => {},
    exec: () => {},
    transaction: (fn: Function) => (...args: any[]) => fn(...args),
    prepare: (sql: string) => {
      const s = sql.trim();

      return {
        all: (...params: any[]) => {
          if (s.includes('FROM destinations')) {
            return [...memoryStore.destinations].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          }
          if (s.includes('FROM itineraries')) {
            return [...memoryStore.itineraries].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          }
          if (s.includes('FROM blog_posts')) {
            return [...memoryStore.blog_posts].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          }
          if (s.includes('FROM travel_tips')) {
            return [...memoryStore.travel_tips].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          }
          if (s.includes('FROM site_settings')) {
            return Object.entries(memoryStore.site_settings).map(([key, value]) => ({ key, value }));
          }
          if (s.includes('FROM admin_users')) {
            return memoryStore.admin_users;
          }
          return [];
        },
        get: (...params: any[]) => {
          if (s.includes('FROM destinations WHERE slug = ?')) {
            return memoryStore.destinations.find(d => d.slug === params[0]) || null;
          }
          if (s.includes('FROM itineraries WHERE slug = ?')) {
            return memoryStore.itineraries.find(i => i.slug === params[0]) || null;
          }
          if (s.includes('FROM blog_posts WHERE slug = ?')) {
            return memoryStore.blog_posts.find(b => b.slug === params[0]) || null;
          }
          if (s.includes('FROM travel_tips WHERE slug = ?')) {
            return memoryStore.travel_tips.find(t => t.slug === params[0]) || null;
          }
          if (s.includes('FROM site_settings WHERE key = ?')) {
            const val = memoryStore.site_settings[params[0]];
            return val !== undefined ? { key: params[0], value: val } : undefined;
          }
          if (s.includes('FROM admin_users WHERE username = ?')) {
            return memoryStore.admin_users.find(u => u.username === params[0]) || null;
          }
          if (s.includes('FROM admin_users WHERE id = ?')) {
            return memoryStore.admin_users.find(u => u.id === params[0]) || null;
          }
          if (s.includes('COUNT(*)')) {
            return { count: 10 };
          }
          return null;
        },
        run: (...params: any[]) => {
          if (s.includes('INSERT INTO admin_users')) {
            const user = { id: Date.now(), username: params[0], password_hash: params[1] };
            memoryStore.admin_users.push(user);
            persist();
            return { lastInsertRowid: user.id, changes: 1 };
          }
          if (s.includes('UPDATE admin_users SET password_hash = ? WHERE id = ?')) {
            const user = memoryStore.admin_users.find(u => u.id === params[1]);
            if (user) { user.password_hash = params[0]; persist(); }
            return { changes: 1 };
          }
          if (s.includes('site_settings')) {
            memoryStore.site_settings[params[0]] = params[1];
            persist();
            return { changes: 1 };
          }
          if (s.includes('INSERT INTO destinations')) {
            const row = {
              id: Date.now(),
              slug: params[0],
              title: params[1],
              short_description: params[2],
              long_content: params[3],
              hero_image: params[4],
              region: params[5],
              recommended_days: params[6],
              best_time_to_visit: params[7],
              tags: params[8],
              gallery_images: params[9],
              highlights: params[10],
              lat: params[11],
              lng: params[12],
              sort_order: params[13],
            };
            memoryStore.destinations.push(row);
            persist();
            return { lastInsertRowid: row.id, changes: 1 };
          }
          if (s.includes('UPDATE destinations')) {
            const slug = params[params.length - 1];
            const idx = memoryStore.destinations.findIndex(d => d.slug === slug);
            if (idx !== -1) {
              memoryStore.destinations[idx] = {
                ...memoryStore.destinations[idx],
                title: params[0],
                short_description: params[1],
                long_content: params[2],
                hero_image: params[3],
                region: params[4],
                recommended_days: params[5],
                best_time_to_visit: params[6],
                tags: params[7],
                gallery_images: params[8],
                highlights: params[9],
                lat: params[10],
                lng: params[11],
                sort_order: params[12],
              };
              persist();
            }
            return { changes: 1 };
          }
          if (s.includes('DELETE FROM destinations')) {
            memoryStore.destinations = memoryStore.destinations.filter(d => d.slug !== params[0]);
            persist();
            return { changes: 1 };
          }
          if (s.includes('INSERT INTO itineraries')) {
            const row = {
              id: Date.now(),
              slug: params[0],
              title: params[1],
              short_description: params[2],
              long_content: params[3],
              hero_image: params[4],
              duration: params[5],
              type: params[6],
              tags: params[7],
              highlights: params[8],
              inclusions: params[9],
              starting_price: params[10],
              difficulty: params[11],
              group_size: params[12],
              days: params[13],
              sort_order: params[14],
            };
            memoryStore.itineraries.push(row);
            persist();
            return { lastInsertRowid: row.id, changes: 1 };
          }
          if (s.includes('UPDATE itineraries')) {
            const slug = params[params.length - 1];
            const idx = memoryStore.itineraries.findIndex(i => i.slug === slug);
            if (idx !== -1) {
              memoryStore.itineraries[idx] = {
                ...memoryStore.itineraries[idx],
                title: params[0],
                short_description: params[1],
                long_content: params[2],
                hero_image: params[3],
                duration: params[4],
                type: params[5],
                tags: params[6],
                highlights: params[7],
                inclusions: params[8],
                starting_price: params[9],
                difficulty: params[10],
                group_size: params[11],
                days: params[12],
                sort_order: params[13],
              };
              persist();
            }
            return { changes: 1 };
          }
          if (s.includes('DELETE FROM itineraries')) {
            memoryStore.itineraries = memoryStore.itineraries.filter(i => i.slug !== params[0]);
            persist();
            return { changes: 1 };
          }
          if (s.includes('INSERT INTO blog_posts')) {
            const row = {
              id: Date.now(),
              slug: params[0],
              title: params[1],
              short_description: params[2],
              long_content: params[3],
              hero_image: params[4],
              author: params[5],
              published_date: params[6],
              last_updated: params[7],
              category: params[8],
              tags: params[9],
              reading_time: params[10],
              featured: params[11],
              sort_order: params[12],
            };
            memoryStore.blog_posts.push(row);
            persist();
            return { lastInsertRowid: row.id, changes: 1 };
          }
          if (s.includes('UPDATE blog_posts')) {
            const slug = params[params.length - 1];
            const idx = memoryStore.blog_posts.findIndex(b => b.slug === slug);
            if (idx !== -1) {
              memoryStore.blog_posts[idx] = {
                ...memoryStore.blog_posts[idx],
                title: params[0],
                short_description: params[1],
                long_content: params[2],
                hero_image: params[3],
                author: params[4],
                published_date: params[5],
                last_updated: params[6],
                category: params[7],
                tags: params[8],
                reading_time: params[9],
                featured: params[10],
                sort_order: params[11],
              };
              persist();
            }
            return { changes: 1 };
          }
          if (s.includes('DELETE FROM blog_posts')) {
            memoryStore.blog_posts = memoryStore.blog_posts.filter(b => b.slug !== params[0]);
            persist();
            return { changes: 1 };
          }
          if (s.includes('INSERT INTO travel_tips')) {
            const row = {
              id: Date.now(),
              slug: params[0],
              title: params[1],
              short_description: params[2],
              long_content: params[3],
              hero_image: params[4],
              category: params[5],
              tags: params[6],
              last_updated: params[7],
              faqs: params[8],
              sort_order: params[9],
            };
            memoryStore.travel_tips.push(row);
            persist();
            return { lastInsertRowid: row.id, changes: 1 };
          }
          if (s.includes('UPDATE travel_tips')) {
            const slug = params[params.length - 1];
            const idx = memoryStore.travel_tips.findIndex(t => t.slug === slug);
            if (idx !== -1) {
              memoryStore.travel_tips[idx] = {
                ...memoryStore.travel_tips[idx],
                title: params[0],
                short_description: params[1],
                long_content: params[2],
                hero_image: params[3],
                category: params[4],
                tags: params[5],
                last_updated: params[6],
                faqs: params[7],
                sort_order: params[8],
              };
              persist();
            }
            return { changes: 1 };
          }
          if (s.includes('DELETE FROM travel_tips')) {
            memoryStore.travel_tips = memoryStore.travel_tips.filter(t => t.slug !== params[0]);
            persist();
            return { changes: 1 };
          }
          return { changes: 0 };
        },
      };
    },
  };
}

// ─── Initialize Database Schema (when using real SQLite locally) ───
export function initializeDatabase() {
  if (!db || useFallback) return;

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS destinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL DEFAULT '',
        long_content TEXT NOT NULL DEFAULT '',
        hero_image TEXT NOT NULL DEFAULT '',
        region TEXT NOT NULL DEFAULT 'cultural-triangle',
        recommended_days INTEGER NOT NULL DEFAULT 3,
        best_time_to_visit TEXT NOT NULL DEFAULT 'November to April',
        tags TEXT NOT NULL DEFAULT '[]',
        gallery_images TEXT NOT NULL DEFAULT '[]',
        highlights TEXT NOT NULL DEFAULT '[]',
        lat REAL NOT NULL DEFAULT 0,
        lng REAL NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS itineraries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL DEFAULT '',
        long_content TEXT NOT NULL DEFAULT '',
        hero_image TEXT NOT NULL DEFAULT '',
        duration INTEGER NOT NULL DEFAULT 5,
        type TEXT NOT NULL DEFAULT 'highlights',
        tags TEXT NOT NULL DEFAULT '[]',
        highlights TEXT NOT NULL DEFAULT '[]',
        inclusions TEXT NOT NULL DEFAULT '[]',
        starting_price TEXT NOT NULL DEFAULT '',
        difficulty TEXT NOT NULL DEFAULT 'moderate',
        group_size TEXT NOT NULL DEFAULT '',
        days TEXT NOT NULL DEFAULT '[]',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL DEFAULT '',
        long_content TEXT NOT NULL DEFAULT '',
        hero_image TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT 'Travel Team',
        published_date TEXT NOT NULL DEFAULT (date('now')),
        last_updated TEXT NOT NULL DEFAULT (date('now')),
        category TEXT NOT NULL DEFAULT 'guides',
        tags TEXT NOT NULL DEFAULT '[]',
        reading_time INTEGER NOT NULL DEFAULT 5,
        featured INTEGER NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS travel_tips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        short_description TEXT NOT NULL DEFAULT '',
        long_content TEXT NOT NULL DEFAULT '',
        hero_image TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'planning',
        tags TEXT NOT NULL DEFAULT '[]',
        last_updated TEXT NOT NULL DEFAULT (date('now')),
        faqs TEXT NOT NULL DEFAULT '[]',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL DEFAULT '{}',
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `);

    console.log('✅ Local SQLite schema verified');
  } catch (err: any) {
    console.error('⚠️ Could not initialize SQLite schema:', err.message);
  }
}

// Call schema initialization immediately on load
initializeDatabase();

export default db;
