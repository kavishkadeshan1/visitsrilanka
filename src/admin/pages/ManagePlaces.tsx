import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Loader2 } from 'lucide-react';
import { contentApi, uploadImage } from '@/lib/api';

export function ManagePlaces() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    shortDescription: '',
    longContent: '',
    region: 'cultural-triangle',
    heroImage: '',
    recommendedDays: 3,
    bestTimeToVisit: 'November to April',
    tags: [] as string[],
    highlights: [] as string[],
    lat: 0,
    lng: 0,
  });

  useEffect(() => { loadPlaces(); }, []);

  const loadPlaces = async () => {
    try {
      const data = await contentApi.destinations.list();
      setPlaces(data);
    } catch (err) {
      console.error('Failed to load destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    try {
      await contentApi.destinations.delete(slug);
      setPlaces(places.filter(p => p.slug !== slug));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEdit = (place: any) => {
    setEditingPlace(place);
    setFormData({
      slug: place.slug,
      title: place.title,
      shortDescription: place.shortDescription || '',
      longContent: place.longContent || '',
      region: place.region,
      heroImage: place.heroImage || '',
      recommendedDays: place.recommendedDays || 3,
      bestTimeToVisit: place.bestTimeToVisit || '',
      tags: place.tags || [],
      highlights: place.highlights || [],
      lat: place.lat || place.coordinates?.lat || 0,
      lng: place.lng || place.coordinates?.lng || 0,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPlace(null);
    setFormData({
      slug: '', title: '', shortDescription: '', longContent: '', region: 'cultural-triangle',
      heroImage: '', recommendedDays: 3, bestTimeToVisit: 'November to April',
      tags: [], highlights: [], lat: 0, lng: 0,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
      setFormData({ ...formData, heroImage: url });
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingPlace) {
        await contentApi.destinations.update(editingPlace.slug, formData);
      } else {
        await contentApi.destinations.create(formData);
      }
      await loadPlaces();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredPlaces = places.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Manage Destinations</h1>
        <button onClick={handleAdd} className="btn-primary">
          <Plus className="w-5 h-5" /> Add Destination
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text" placeholder="Search destinations..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-medium">Destination</th>
                <th className="p-4 font-medium">Region</th>
                <th className="p-4 font-medium">Days</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <tr key={place.slug} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={place.heroImage} alt={place.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <div className="font-semibold text-gray-900">{place.title}</div>
                        <div className="text-xs text-gray-500">{place.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 capitalize">{place.region?.replace('-', ' ')}</td>
                  <td className="p-4 text-gray-600">{place.recommendedDays || place.recommended_days}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(place)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(place.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPlaces.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No destinations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingPlace ? 'Edit Destination' : 'Add Destination'}</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value, slug: editingPlace ? formData.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input required type="text" value={formData.slug} disabled={!!editingPlace}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg disabled:bg-gray-100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  rows={2} className="w-full p-2 border border-gray-300 rounded-lg resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content (Markdown)</label>
                <textarea value={formData.longContent} onChange={e => setFormData({ ...formData, longContent: e.target.value })}
                  rows={6} className="w-full p-2 border border-gray-300 rounded-lg resize-none font-mono text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="south-coast">South Coast</option>
                    <option value="cultural-triangle">Cultural Triangle</option>
                    <option value="hill-country">Hill Country</option>
                    <option value="east-coast">East Coast</option>
                    <option value="west-coast">West Coast</option>
                    <option value="north">North</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Days</label>
                  <input type="number" min="1" value={formData.recommendedDays}
                    onChange={e => setFormData({ ...formData, recommendedDays: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                {formData.heroImage && <img src={formData.heroImage} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />}
                <div className="flex gap-2">
                  <input type="text" value={formData.heroImage} onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" placeholder="URL or upload" />
                  <label className="btn-outline py-2 px-3 cursor-pointer text-sm">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
                <input type="text" value={formData.bestTimeToVisit} onChange={e => setFormData({ ...formData, bestTimeToVisit: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input type="text" value={(formData.tags || []).join(', ')}
                  onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="w-full p-2 border border-gray-300 rounded-lg" placeholder="beach, surfing, sunset" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
                <textarea value={(formData.highlights || []).join('\n')}
                  onChange={e => setFormData({ ...formData, highlights: e.target.value.split('\n').filter(Boolean) })}
                  rows={4} className="w-full p-2 border border-gray-300 rounded-lg resize-none text-sm" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary py-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingPlace ? 'Save Changes' : 'Add Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
