# Deployment Guide: Vercel Backend & cPanel Frontend

This guide explains how to deploy:
1. **Backend API** on **Vercel** (Serverless Node/Express with SQLite)
2. **Frontend Website** on **cPanel File Manager** (Static React SPA with Apache `.htaccess`)

---

## Architecture Overview

```
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│       Frontend (cPanel Hosting)      │       │          Backend (Vercel)            │
│  - Stored in: public_html            │ API   │  - Serverless Express API            │
│  - Apache .htaccess (SPA Routing)    ├──────►│  - SQLite Database (data/site.db)    │
│  - Runtime Config: config.js         │ Calls │  - Base64 / Cloud Image Uploads      │
│  - Domain: https://yourdomain.com    │       │  - Domain: https://your-app.vercel.app│
└──────────────────────────────────────┘       └──────────────────────────────────────┘
```

---

## Part 1: Deploy Backend to Vercel

### Step 1: Push Code to GitHub / GitLab / Bitbucket
1. Initialize git and commit your project (if not already done):
   ```bash
   git add .
   git commit -m "Configure Vercel serverless backend and cPanel frontend"
   git push origin main
   ```
   > **Note:** The `data/site.db` SQLite database is included in the commit so your destinations, tours, blog articles, and settings deploy with full data!

### Step 2: Import Project into Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New...** → **Project**.
3. Select your Git repository.
4. In **Project Settings**:
   - **Framework Preset**: Select **Other** (do NOT select Vite, because this Vercel project is your backend API).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: Leave blank (our `vercel.json` already disables the frontend build on Vercel).
   - **Output Directory**: Leave blank.
5. In **Environment Variables**, add:
   - `JWT_SECRET`: Any secure random text (e.g. `your-super-secret-key-2026`)
   - *(Optional)* `TURSO_DATABASE_URL`: If using Turso cloud SQLite (see below).
   - *(Optional)* `TURSO_AUTH_TOKEN`: Turso authentication token.
6. Click **Deploy**.

### Step 3: Verify Your Vercel API
Once deployed, Vercel will assign you a URL (e.g., `https://visit-sri-lanka-api.vercel.app`).
Test it in your browser:
- Open `https://your-app.vercel.app/` → You should see a JSON welcome message: `{"name":"Visit Sri Lanka Backend API","status":"online"}`
- Open `https://your-app.vercel.app/api/health` → `{"status":"ok"}`
- Open `https://your-app.vercel.app/api/destinations` → Returns the full list of destinations.

---

## Part 2: Deploy Frontend to cPanel File Manager

### Step 1: Build & Package the Frontend
Run the automated packaging command in your terminal:
```bash
npm run build:cpanel
```
This command:
1. Compiles TypeScript and builds the optimized production bundle in `dist/`.
2. Automatically ensures Apache `.htaccess` is present for Single Page Application (SPA) routing.
3. Automatically copies `config.js` for runtime backend configuration.
4. Generates a ready-to-upload ZIP file: **`cpanel_public_html.zip`**.

---

### Step 2: Upload to cPanel File Manager
1. Log into your **cPanel Dashboard**.
2. Under **Files**, click **File Manager**.
3. Double-click the **`public_html`** folder (or your addon domain's document root).
4. Click **Upload** in the top navigation bar.
5. Select and upload **`cpanel_public_html.zip`**.
6. Once uploaded (progress bar turns green), close the upload tab and click **Reload** in File Manager.
7. Right-click **`cpanel_public_html.zip`** and click **Extract**.
8. Confirm the extraction path is `/public_html` and click **Extract Files**.
9. *(Optional)* Delete `cpanel_public_html.zip` to save disk space.

---

### Step 3: Connect Frontend to Vercel (Runtime Config)
You don't need to rebuild or touch npm whenever you change your Vercel domain!
1. In cPanel File Manager inside `public_html`, locate **`config.js`**.
2. Right-click **`config.js`** → Click **Edit**.
3. Set your Vercel backend URL:
   ```javascript
   window.__API_URL__ = 'https://your-app.vercel.app/api';
   ```
4. Click **Save Changes**.
5. Visit your domain (e.g., `https://yourdomain.com`). Your frontend is now communicating directly with your Vercel backend!

---

## Part 3: Admin Panel Access

- **Admin URL:** `https://yourdomain.com/admin/login`
- **Default Username:** `admin`
- **Default Password:** `admin123`

### What You Can Manage in Admin:
1. **Site Settings** (`/admin/settings`):
   - Hero title, subtitle, badge, and hero image
   - Homepage experience categories & icons
   - Guest testimonials & reviews
   - Frequently Asked Questions (FAQs)
   - Contact email, WhatsApp number, and about text
2. **Destinations** (`/admin/places`): Add, edit, or delete Sri Lankan destinations with gallery images and highlights.
3. **Itineraries** (`/admin/itineraries`): Manage tour packages, multi-day routes, prices, and difficulties.
4. **Blog Posts** (`/admin/articles`): Write and publish travel stories and travel guides.
5. **Travel Tips** (`/admin/travel-tips`): Manage visa information, packing advice, and practical guides.
6. **Media Library** (`/admin/media`): Upload images to use across any page.

---

## Part 4: Persistent SQLite on Vercel (Turso Option)

### Why Consider Turso?
- **Default Vercel SQLite (`/tmp`):** Works automatically with your bundled database. However, AWS Lambda functions periodically recycle (`cold start`), which resets files in `/tmp`.
- **Turso (LibSQL):** Turso is 100% free cloud SQLite created specifically for Vercel/serverless. Your database stays permanent forever, with zero maintenance.

### 2-Minute Turso Setup (Optional):
1. Install Turso CLI or visit [turso.tech](https://turso.tech):
   ```bash
   # Windows (PowerShell)
   irm https://get.tur.so/install.ps1 | iex
   ```
2. Create and upload your existing database in 1 command:
   ```bash
   turso auth signup
   turso db create visit-db --from-file data/site.db
   ```
3. Get your database URL and token:
   ```bash
   turso db show visit-db --url
   turso db tokens create visit-db
   ```
4. In Vercel Project Settings → **Environment Variables**, add:
   - `TURSO_DATABASE_URL` = `libsql://visit-db-yourusername.turso.io`
   - `TURSO_AUTH_TOKEN` = `your_auth_token`
5. Redeploy on Vercel!

---

## Troubleshooting & FAQ

### 1. Direct page refreshes give a 404 Error on cPanel
**Cause:** In cPanel File Manager, dotfiles (like `.htaccess`) are hidden by default.
**Fix:**
1. In cPanel File Manager, click **Settings** (top right gear icon).
2. Check the box **"Show Hidden Files (dotfiles)"** and click Save.
3. Verify that `.htaccess` is present in `public_html`. If missing, copy it from `cpanel_public_html.zip`.

### 2. Admin settings changed but don't show on the site
- Check that your browser isn't showing cached static data: do a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`).
- Verify in browser DevTools (Network tab) that calls are successfully going to `https://your-app.vercel.app/api/...` with HTTP status `200`.

### 3. Image uploads on Vercel
- Images uploaded via the Admin Panel on Vercel are automatically converted into Base64 data URLs and stored directly in the database.
- You can also paste direct image URLs (from Unsplash, Imgur, or your own CDN) in any image field!
