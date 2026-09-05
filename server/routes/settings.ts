import { Router, Request, Response } from 'express';
import db from '../db';
import { authenticateToken } from './auth';

const router = Router();

// Default site settings
const DEFAULT_SETTINGS: Record<string, any> = {
  hero_image: '/images/hero-nine-arch.jpg',
  hero_title: 'Discover the Wonder of Sri Lanka',
  hero_subtitle: 'Ancient temples. Pristine beaches. Misty mountains. A journey curated for the curious soul.',
  hero_badge: 'The Pearl of the Indian Ocean',
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
  whatsapp_number: '+94701234567',
  contact_email: 'info@visitsrilanka.online',
  about_title: 'About Visit Sri Lanka',
  about_content: 'Your gateway to exploring the wonders of Sri Lanka.',
  site_name: 'Visit Sri Lanka',
};

// Initialize default settings
function initializeSettings() {
  const insert = db.prepare('INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)');
  const insertMany = db.transaction(() => {
    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
      insert.run(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  });
  insertMany();
}
initializeSettings();

// GET /api/settings — get all settings (public)
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT key, value FROM site_settings').all() as { key: string; value: string }[];
  const settings: Record<string, any> = {};
  for (const row of rows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch {
      settings[row.key] = row.value;
    }
  }
  res.json(settings);
});

// GET /api/settings/:key — get single setting
router.get('/:key', (req: Request, res: Response) => {
  const row = db.prepare('SELECT value FROM site_settings WHERE key = ?').get(req.params.key) as { value: string } | undefined;
  if (!row) return res.status(404).json({ error: 'Setting not found' });
  try {
    res.json({ key: req.params.key, value: JSON.parse(row.value) });
  } catch {
    res.json({ key: req.params.key, value: row.value });
  }
});

// PUT /api/settings — update multiple settings (admin)
router.put('/', authenticateToken as any, (req: Request, res: Response) => {
  const settings = req.body;

  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ error: 'Settings object required' });
  }

  const upsert = db.prepare(`
    INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `);

  const updateMany = db.transaction(() => {
    for (const [key, value] of Object.entries(settings)) {
      upsert.run(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  });

  updateMany();
  res.json({ message: 'Settings updated', keys: Object.keys(settings) });
});

// PUT /api/settings/:key — update single setting (admin)
router.put('/:key', authenticateToken as any, (req: Request, res: Response) => {
  const { value } = req.body;

  db.prepare(`
    INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(req.params.key, typeof value === 'string' ? value : JSON.stringify(value));

  res.json({ message: 'Setting updated', key: req.params.key });
});

export default router;
