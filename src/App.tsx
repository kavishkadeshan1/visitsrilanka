import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import DestinationDetail from '@/pages/DestinationDetail';
import Itineraries from '@/pages/Itineraries';
import ItineraryDetail from '@/pages/ItineraryDetail';
import TravelTips from '@/pages/TravelTips';
import TravelTipDetail from '@/pages/TravelTipDetail';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';
import Search from '@/pages/Search';
import ThalarambaBeachPage from '@/pages/ThalarambaBeachPage';

// Admin Imports
import { AuthProvider } from '@/admin/context/AuthContext';
import { AdminLayout } from '@/admin/components/AdminLayout';
import { AdminLogin } from '@/admin/pages/AdminLogin';
import { AdminDashboard } from '@/admin/pages/AdminDashboard';
import { ManagePlaces } from '@/admin/pages/ManagePlaces';
import { ManageItineraries } from '@/admin/pages/ManageItineraries';
import { ManageArticles } from '@/admin/pages/ManageArticles';
import { ManageTravelTips } from '@/admin/pages/ManageTravelTips';
import { ManageTags } from '@/admin/pages/ManageTags';
import { ManageSettings } from '@/admin/pages/ManageSettings';
import { MediaLibrary } from '@/admin/pages/MediaLibrary';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="destinations/:slug" element={<DestinationDetail />} />
              <Route path="thalaramba-beach" element={<ThalarambaBeachPage />} />
              <Route path="itineraries" element={<Itineraries />} />
              <Route path="itineraries/:slug" element={<ItineraryDetail />} />
              <Route path="travel-tips" element={<TravelTips />} />
              <Route path="travel-tips/:slug" element={<TravelTipDetail />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="settings" element={<ManageSettings />} />
              <Route path="places" element={<ManagePlaces />} />
              <Route path="itineraries" element={<ManageItineraries />} />
              <Route path="articles" element={<ManageArticles />} />
              <Route path="travel-tips" element={<ManageTravelTips />} />
              <Route path="tags" element={<ManageTags />} />
              <Route path="media" element={<MediaLibrary />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
