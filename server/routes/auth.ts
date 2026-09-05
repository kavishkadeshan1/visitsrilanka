import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'visit-sri-lanka-admin-secret-2026';
const TOKEN_EXPIRY = '7d';

// Ensure default admin user exists
function ensureAdminUser() {
  try {
    const existing = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
    if (!existing) {
      const hash = bcrypt.hashSync('admin123', 10);
      db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash);
      console.log('👤 Default admin user verified (username: admin)');
    }
  } catch (err: any) {
    console.warn('⚠️ ensureAdminUser notice:', err.message);
  }
}
ensureAdminUser();

// Middleware to verify JWT token
export function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username },
    expiresIn: TOKEN_EXPIRY,
  });
});

// POST /api/auth/change-password (protected)
router.post('/change-password', authenticateToken as any, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const userId = (req as any).user.userId;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(userId) as any;
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(hash, userId);

  res.json({ message: 'Password changed successfully' });
});

// GET /api/auth/verify (check if token is valid)
router.get('/verify', authenticateToken as any, (_req: Request, res: Response) => {
  res.json({ valid: true, user: (_req as any).user });
});

export default router;
