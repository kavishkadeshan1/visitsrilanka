import { Router, Request, Response } from 'express';
import db from '../db';
import { authenticateToken } from './auth';

const router = Router();

// Parse JSON fields from DB row
function parseDestination(row: any) {
  if (!row) return null;
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    galleryImages: JSON.parse(row.gallery_images || '[]'),
    highlights: JSON.parse(row.highlights || '[]'),
    coordinates: { lat: row.lat, lng: row.lng },
    shortDescription: row.short_description,
    longContent: row.long_content,
    heroImage: row.hero_image,
    recommendedDays: row.recommended_days,
    bestTimeToVisit: row.best_time_to_visit,
    sortOrder: row.sort_order,
  };
}

// GET /api/destinations — list all
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM destinations ORDER BY sort_order ASC, id ASC').all();
  res.json(rows.map(parseDestination));
});

// GET /api/destinations/:slug — get single
router.get('/:slug', (req: Request, res: Response) => {
  const row = db.prepare('SELECT * FROM destinations WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Destination not found' });
  res.json(parseDestination(row));
});

// POST /api/destinations — create (admin)
router.post('/', authenticateToken as any, (req: Request, res: Response) => {
  const { slug, title, shortDescription, longContent, heroImage, region, recommendedDays,
    bestTimeToVisit, tags, galleryImages, highlights, lat, lng, sortOrder } = req.body;

  if (!slug || !title) return res.status(400).json({ error: 'slug and title are required' });

  try {
    const result = db.prepare(`
      INSERT INTO destinations (slug, title, short_description, long_content, hero_image, region,
        recommended_days, best_time_to_visit, tags, gallery_images, highlights, lat, lng, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, title, shortDescription || '', longContent || '', heroImage || '', region || 'cultural-triangle',
      recommendedDays || 3, bestTimeToVisit || 'November to April',
      JSON.stringify(tags || []), JSON.stringify(galleryImages || []), JSON.stringify(highlights || []),
      lat || 0, lng || 0, sortOrder || 0
    );
    res.status(201).json({ id: result.lastInsertRowid, slug });
  } catch (err: any) {
    if (err.message?.includes('UNIQUE')) {
      return res.status(409).json({ error: 'A destination with this slug already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/destinations/:slug — update (admin)
router.put('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const { title, shortDescription, longContent, heroImage, region, recommendedDays,
    bestTimeToVisit, tags, galleryImages, highlights, lat, lng, sortOrder } = req.body;

  const existing = db.prepare('SELECT id FROM destinations WHERE slug = ?').get(req.params.slug);
  if (!existing) return res.status(404).json({ error: 'Destination not found' });

  db.prepare(`
    UPDATE destinations SET title = ?, short_description = ?, long_content = ?, hero_image = ?,
      region = ?, recommended_days = ?, best_time_to_visit = ?, tags = ?, gallery_images = ?,
      highlights = ?, lat = ?, lng = ?, sort_order = ?, updated_at = datetime('now')
    WHERE slug = ?
  `).run(
    title, shortDescription || '', longContent || '', heroImage || '', region || 'cultural-triangle',
    recommendedDays || 3, bestTimeToVisit || 'November to April',
    JSON.stringify(tags || []), JSON.stringify(galleryImages || []), JSON.stringify(highlights || []),
    lat || 0, lng || 0, sortOrder || 0, req.params.slug
  );

  res.json({ message: 'Destination updated', slug: req.params.slug });
});

// DELETE /api/destinations/:slug — delete (admin)
router.delete('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM destinations WHERE slug = ?').run(req.params.slug);
  if (result.changes === 0) return res.status(404).json({ error: 'Destination not found' });
  res.json({ message: 'Destination deleted' });
});

export default router;
