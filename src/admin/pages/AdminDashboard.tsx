import { useState, useEffect } from 'react';
import { MapPin, Route, FileText, Lightbulb, Settings, Image as ImageIcon, Database, Server, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { contentApi, getApiBase } from '@/lib/api';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    itineraries: 0,
    articles: 0,
    tips: 0,
  });
  const [loading, setLoading] = useState(true);
  const apiBase = getApiBase();

  useEffect(() => {
    async function loadStats() {
      try {
        const [dest, itin, blog, tips] = await Promise.allSettled([
          contentApi.destinations.list(),
          contentApi.itineraries.list(),
          contentApi.blog.list(),
          contentApi.travelTips.list(),
        ]);

        setStats({
          destinations: dest.status === 'fulfilled' ? dest.value.length : 0,
          itineraries: itin.status === 'fulfilled' ? itin.value.length : 0,
          articles: blog.status === 'fulfilled' ? blog.value.length : 0,
          tips: tips.status === 'fulfilled' ? tips.value.length : 0,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statCards = [
    {
      name: 'Destinations',
      value: loading ? '...' : stats.destinations.toString(),
      icon: MapPin,
      color: 'bg-blue-500',
      link: '/admin/places',
      desc: 'Beaches, temples & cities',
    },
    {
      name: 'Itineraries',
      value: loading ? '...' : stats.itineraries.toString(),
      icon: Route,
      color: 'bg-emerald-500',
      link: '/admin/itineraries',
      desc: 'Tour packages & multi-day routes',
    },
    {
      name: 'Blog Articles',
      value: loading ? '...' : stats.articles.toString(),
      icon: FileText,
      color: 'bg-purple-500',
      link: '/admin/articles',
      desc: 'Travel stories & guides',
    },
    {
      name: 'Travel Tips',
      value: loading ? '...' : stats.tips.toString(),
      icon: Lightbulb,
      color: 'bg-amber-500',
      link: '/admin/travel-tips',
      desc: 'Visa, safety & planning advice',
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your website content, settings, and media</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-xs font-medium border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Backend Connected: <strong className="font-mono">{apiBase}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-400 mt-2">{stat.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary-600" />
            Quick Actions & Management
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            All content edits made here are saved directly to your SQLite database. Any changes are immediately reflected on your public website.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-primary-50/50 hover:border-primary-200 transition-all"
            >
              <div className="p-2.5 bg-primary-100 text-primary-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Site Settings</div>
                <div className="text-xs text-gray-500">Edit Hero, Testimonials, FAQs</div>
              </div>
            </Link>

            <Link
              to="/admin/media"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-primary-50/50 hover:border-primary-200 transition-all"
            >
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Media Library</div>
                <div className="text-xs text-gray-500">Upload and manage images</div>
              </div>
            </Link>

            <Link
              to="/admin/places"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-primary-50/50 hover:border-primary-200 transition-all"
            >
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Destinations</div>
                <div className="text-xs text-gray-500">Add or edit travel locations</div>
              </div>
            </Link>

            <Link
              to="/admin/articles"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-primary-50/50 hover:border-primary-200 transition-all"
            >
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Blog Posts</div>
                <div className="text-xs text-gray-500">Publish articles & travel guides</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              Deployment Status
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">Backend API</span>
                <span className="font-semibold text-gray-900">Vercel / Express</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">Frontend</span>
                <span className="font-semibold text-gray-900">cPanel File Manager</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">Database</span>
                <span className="font-semibold text-gray-900">SQLite (data/site.db)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">Image Uploads</span>
                <span className="font-semibold text-gray-900">Base64 / Cloud Support</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              to="/"
              className="btn-primary w-full text-center block text-sm py-2.5"
            >
              View Live Website →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
