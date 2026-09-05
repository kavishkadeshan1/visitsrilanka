import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken } from './auth';

const router = Router();

const isVercel = Boolean(process.env.VERCEL);

// Configure multer: memory storage on Vercel serverless, disk storage locally
const storage = isVercel
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (_req, _file, cb) => {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    });

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype.split('/')[1]);
    if (extOk && mimeOk) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, png, gif, webp, svg) are allowed'));
    }
  },
});

// POST /api/upload — upload a single image (admin only)
router.post('/', authenticateToken as any, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  // On Vercel serverless, return Base64 data URL so image is saved directly into DB
  if (isVercel || req.file.buffer) {
    const mime = req.file.mimetype || 'image/jpeg';
    const base64 = req.file.buffer.toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;
    const filename = `${Date.now()}-${req.file.originalname}`;
    return res.json({
      url: dataUrl,
      filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({
    url,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
  });
});

// DELETE /api/upload/:filename — delete an uploaded image (admin only)
router.delete('/:filename', authenticateToken as any, (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  // Safety check — don't allow path traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'File deleted successfully' });
});

// GET /api/upload/list — list all uploaded images (admin only)
router.get('/list', authenticateToken as any, (_req: Request, res: Response) => {
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    return res.json({ files: [] });
  }

  const files = fs.readdirSync(uploadDir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    .map(f => {
      const stat = fs.statSync(path.join(uploadDir, f));
      return {
        filename: f,
        url: `/uploads/${f}`,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  res.json({ files });
});

export default router;
