import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const isVercel = Boolean(process.env.VERCEL);

let dbPath: string;

if (isVercel) {
  // On Vercel serverless, only /tmp is writable
  const tmpDir = '/tmp';
  const tmpDbPath = path.join(tmpDir, 'site.db');

  if (!fs.existsSync(tmpDbPath)) {
    // Copy bundled seed database from project root to /tmp
    const bundledDbPath = path.join(process.cwd(), 'data', 'site.db');
    if (fs.existsSync(bundledDbPath)) {
      try {
        fs.copyFileSync(bundledDbPath, tmpDbPath);
        console.log('📦 Copied bundled SQLite database to /tmp/site.db');
      } catch (err) {
        console.error('⚠️ Could not copy database to /tmp:', err);
      }
    }
  }
  dbPath = tmpDbPath;
} else {
  // Local or standard Node.js server
  const DATA_DIR = path.join(process.cwd(), 'data');
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  dbPath = path.join(DATA_DIR, 'site.db');
}

const db = new Database(dbPath);

// Journal mode: WAL for persistent servers, DELETE for serverless Lambda
if (!isVercel) {
  db.pragma('journal_mode = WAL');
} else {
  db.pragma('journal_mode = DELETE');
}
db.pragma('foreign_keys = ON');

// ─── Create Tables ───
export function initializeDatabase() {
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

  console.log('✅ Database tables initialized');
}

export default db;
