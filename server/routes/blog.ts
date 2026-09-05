import { Router, Request, Response } from 'express';
import db from '../db';
import { authenticateToken } from './auth';

const router = Router();

function parseBlogPost(row: any) {
  if (!row) return null;
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    shortDescription: row.short_description,
    longContent: row.long_content,
    heroImage: row.hero_image,
    publishedDate: row.published_date,
    lastUpdated: row.last_updated,
    readingTime: row.reading_time,
    featured: !!row.featured,
    sortOrder: row.sort_order,
  };
}

// GET /api/blog
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM blog_posts ORDER BY sort_order ASC, published_date DESC').all();
  res.json(rows.map(parseBlogPost));
});

// GET /api/blog/:slug
router.get('/:slug', (req: Request, res: Response) => {
  const row = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Blog post not found' });
  res.json(parseBlogPost(row));
});

// POST /api/blog
router.post('/', authenticateToken as any, (req: Request, res: Response) => {
  const { slug, title, shortDescription, longContent, heroImage, author, publishedDate,
    lastUpdated, category, tags, readingTime, featured, sortOrder } = req.body;

  if (!slug || !title) return res.status(400).json({ error: 'slug and title are required' });

  try {
    const result = db.prepare(`
      INSERT INTO blog_posts (slug, title, short_description, long_content, hero_image, author,
        published_date, last_updated, category, tags, reading_time, featured, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, title, shortDescription || '', longContent || '', heroImage || '',
      author || 'Travel Team', publishedDate || new Date().toISOString().split('T')[0],
      lastUpdated || new Date().toISOString().split('T')[0], category || 'guides',
      JSON.stringify(tags || []), readingTime || 5, featured ? 1 : 0, sortOrder || 0
    );
    res.status(201).json({ id: result.lastInsertRowid, slug });
  } catch (err: any) {
    if (err.message?.includes('UNIQUE')) return res.status(409).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/blog/:slug
router.put('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const { title, shortDescription, longContent, heroImage, author, publishedDate,
    lastUpdated, category, tags, readingTime, featured, sortOrder } = req.body;

  const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(req.params.slug);
  if (!existing) return res.status(404).json({ error: 'Blog post not found' });

  db.prepare(`
    UPDATE blog_posts SET title = ?, short_description = ?, long_content = ?, hero_image = ?,
      author = ?, published_date = ?, last_updated = ?, category = ?, tags = ?,
      reading_time = ?, featured = ?, sort_order = ?, updated_at = datetime('now')
    WHERE slug = ?
  `).run(
    title, shortDescription || '', longContent || '', heroImage || '',
    author || 'Travel Team', publishedDate || new Date().toISOString().split('T')[0],
    lastUpdated || new Date().toISOString().split('T')[0], category || 'guides',
    JSON.stringify(tags || []), readingTime || 5, featured ? 1 : 0, sortOrder || 0,
    req.params.slug
  );
  res.json({ message: 'Blog post updated', slug: req.params.slug });
});

// DELETE /api/blog/:slug
router.delete('/:slug', authenticateToken as any, (req: Request, res: Response) => {
  const result = db.prepare('DELETE FROM blog_posts WHERE slug = ?').run(req.params.slug);
  if (result.changes === 0) return res.status(404).json({ error: 'Blog post not found' });
  res.json({ message: 'Blog post deleted' });
});

export default router;
