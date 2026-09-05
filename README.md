# Visit Sri Lanka - Production-Ready Tourism Website

A modern, SEO-optimized tourism website for Sri Lanka built with React 18, Vite, TypeScript, and Tailwind CSS.

## 🌴 Features

- **13 Pages**: Home, Destinations, Itineraries, Travel Tips, Blog, Contact, About, Privacy, Terms, and 404
- **SEO Optimized**: Per-page meta tags, OpenGraph, Twitter cards, JSON-LD structured data
- **Mobile-First**: Responsive design with Tailwind CSS
- **Fast**: Route-based code splitting, lazy loading images, optimized vendor chunks
- **Accessible**: Keyboard navigation, ARIA labels, semantic HTML
- **Modern Stack**: React 18, TypeScript strict mode, Framer Motion animations

## 📦 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Routing**: React Router 6
- **SEO**: react-helmet-async
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the site
npm run build

# Preview the build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── cards/          # Card components (Destination, Itinerary, Blog, Tip)
│   ├── layout/         # Layout, Navbar, Footer
│   └── seo/            # SEO components (SEOHead)
├── content/            # Static JSON/TS content data
│   ├── destinations.ts # 12 destinations
│   ├── itineraries.ts  # 6 itineraries
│   ├── travel-tips.ts  # 10 travel guides
│   └── blog-posts.ts   # 10 blog articles
├── lib/                # Utilities
│   ├── seo.ts          # SEO helpers (meta, JSON-LD)
│   └── utils.ts        # General utilities
├── pages/              # Route pages
├── styles/             # Global styles
├── App.tsx             # Router setup
└── main.tsx            # Entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_SITE_URL=https://visitsrilanka.online
VITE_WHATSAPP_NUMBER=+94701234567
VITE_CONTACT_EMAIL=info@visitsrilanka.online
```

## 📝 Content Management

Content is stored in TypeScript files in `src/content/`. Each content type exports:

1. **Type definitions** for TypeScript safety
2. **Data arrays** with all content items
3. **Helper functions** for querying (getBySlug, getByCategory, etc.)

To update content, simply edit the corresponding file and rebuild.

## 🌐 Deployment

### Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel

1. Connect your GitHub repo to Vercel
2. Framework preset: Vite
3. Add environment variables in Vercel dashboard

### Generic Static Hosting

1. Run `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure redirects for SPA (all routes → index.html)

**Nginx example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📊 SEO Checklist

- [x] Per-page title and meta description
- [x] Canonical URLs
- [x] OpenGraph and Twitter card tags
- [x] JSON-LD structured data (Organization, WebSite, Article, FAQ, BreadcrumbList)
- [x] robots.txt
- [x] sitemap.xml generation
- [x] Semantic HTML
- [x] Mobile-responsive

## 🎯 Next Improvements

1. **CMS Integration**: Connect to Contentful, Sanity, or Strapi for easier content updates
2. **i18n**: Add multi-language support (German, French, Chinese)
3. **Real Images**: Replace Unsplash placeholders with original photography
4. **Blog Automation**: Add RSS feed and newsletter integration
5. **Analytics**: Add Google Analytics 4 or Plausible
6. **Form Backend**: Connect contact form to email service (SendGrid, Mailchimp)
7. **SSG/Prerendering**: Add prerendering for better SEO (consider Astro migration)
8. **Performance**: Add WebP/AVIF image optimization pipeline
9. **Testing**: Add Playwright E2E tests
10. **PWA**: Add service worker for offline support

## 📄 License

MIT License - Feel free to use this template for your own projects.

---

Built with ❤️ for travelers exploring Sri Lanka
