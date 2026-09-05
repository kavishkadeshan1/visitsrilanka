import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, FileText, Route, Lightbulb, Settings, Image, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Destinations', href: '/admin/places', icon: MapPin },
  { name: 'Itineraries', href: '/admin/itineraries', icon: Route },
  { name: 'Blog Posts', href: '/admin/articles', icon: FileText },
  { name: 'Travel Tips', href: '/admin/travel-tips', icon: Lightbulb },
  { name: 'Media Library', href: '/admin/media', icon: Image },
];

export function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-primary-950 border-r border-white/10">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-white/10">
        <span className="font-display text-2xl font-bold tracking-tight text-white">
          Admin <span className="text-secondary-400">Panel</span>
        </span>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <NavLink
            to="/"
            className="group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 text-gray-400 hover:text-white hover:bg-white/5 transition-colors mb-2"
          >
            ← View Site
          </NavLink>
          <button
            onClick={logout}
            className="group flex w-full items-center gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
