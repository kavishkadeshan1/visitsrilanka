import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { initializeDatabase } from './db';
import authRoutes from './routes/auth';
import destinationRoutes from './routes/destinations';
import itineraryRoutes from './routes/itineraries';
import blogRoutes from './routes/blog';
import travelTipRoutes from './routes/travel-tips';
import settingsRoutes from './routes/settings';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure uploads directory exists (use /tmp on Vercel)
const UPLOADS_DIR = process.env.VERCEL
  ? '/tmp/uploads'
  : path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch {
    // Ignore read-only directory error on serverless boot
  }
}

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Root info endpoint (useful when viewing Vercel URL in browser)
app.get('/', (_req, res) => {
  res.json({
    name: 'Visit Sri Lanka Backend API',
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      destinations: '/api/destinations',
      itineraries: '/api/itineraries',
      blog: '/api/blog',
      travelTips: '/api/travel-tips',
      settings: '/api/settings',
      auth: '/api/auth/login',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/travel-tips', travelTipRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React static build in production (when hosted as single monolith)
const DIST_DIR = path.join(process.cwd(), 'dist');
if (!process.env.VERCEL && fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  // SPA fallback — all non-API routes serve index.html
  app.get('{*path}', (_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

// Initialize database
initializeDatabase();

// Only listen on port if not running in a serverless environment (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 API available at http://localhost:${PORT}/api`);
    if (fs.existsSync(DIST_DIR)) {
      console.log(`🌐 Serving React app from ${DIST_DIR}`);
    }
  });
}

export default app;
