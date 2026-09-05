import { Router, Request, Response } from 'express';
import db from '../db';
import { authenticateToken } from './auth';

const router = Router();

function parseTravelTip(row: any) {
  if (!row) return null;
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    faqs: JSON.parse(row.faqs || '[]'),
    shortDescription: row.short_description,
    longContent: row.long_content,
    heroImage: row.hero_image,
    lastUpdated: row.last_updated,
    sortOrder: row.sort_order,
  };
}

// GET /api/travel-tips
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM travel_tips ORDER BY sort_order ASC, id ASC').all();
  res.json(rows.map(parseTravelTip));
});

// GET /api/travel-tips/:slug
router.get('/:slug', (req: Request, res: Response) => {
  const row = db.prepare('SELECT * FROM travel_tips WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Travel tip not found' });
  res.json(parseTravelTip(row));
});

// POST /api/travel-tips
router.post('/', authenticateToken as any, (req: Request, res: Response) => {
  const { slug, title, shortDescription, longContent, heroImage, category,
    tags, lastUpdated, faqs, sortOrder } = req.body;

  if (!slug || !title) return res.status(400).json({ error: 'slug and title are required' });

  try {
    const result = db.prepare(`
      INSERT INTO travel_tips (slug, title, short_description, long_content, hero_image,
        category, tags, last_updated, faqs, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, title, shortDescription || '', longContent || '', heroImage || '',
      category || 'planning', JSON.stringify(tags || []),
      lastUpdated || new Date().toISOString().split('T')[0],
      JSON.stringify(faqs || []), sortOrder || 0
    );
    res.status(201).json({ id: result.lastInsertRowid, slug });
  } catch (err: any) {
    if (err.message?.includes('UNIQUE')) return res.status(409).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/travel-tips/:slug
router.put('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const { title, shortDescription, longContent, heroImage, category,
    tags, lastUpdated, faqs, sortOrder } = req.body;

  const existing = db.prepare('SELECT id FROM travel_tips WHERE slug = ?').get(req.params.slug);
  if (!existing) return res.status(404).json({ error: 'Travel tip not found' });

  db.prepare(`
    UPDATE travel_tips SET title = ?, short_description = ?, long_content = ?, hero_image = ?,
      category = ?, tags = ?, last_updated = ?, faqs = ?, sort_order = ?, updated_at = datetime('now')
    WHERE slug = ?
  `).run(
    title, shortDescription || '', longContent || '', heroImage || '',
    category || 'planning', JSON.stringify(tags || []),
    lastUpdated || new Date().toISOString().split('T')[0],
    JSON.stringify(faqs || []), sortOrder || 0, req.params.slug
  );
  res.json({ message: 'Travel tip updated', slug: req.params.slug });
});

// DELETE /api/travel-tips/:slug
router.delete('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM travel_tips WHERE slug = ?').run(req.params.slug);
  if (result.changes === 0) return res.status(404).json({ error: 'Travel tip not found' });
  res.json({ message: 'Travel tip deleted' });
});

export default router;
