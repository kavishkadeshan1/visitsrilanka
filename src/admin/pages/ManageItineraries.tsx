import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Loader2, Clock, DollarSign } from 'lucide-react';
import { contentApi, uploadImage, getImageUrl } from '@/lib/api';

export function ManageItineraries() {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    shortDescription: '',
    longContent: '',
    heroImage: '',
    duration: 7,
    type: 'highlights',
    startingPrice: '$850',
    difficulty: 'moderate',
    groupSize: '2-12 people',
    highlights: [] as string[],
    tags: [] as string[],
  });

  useEffect(() => {
    loadItineraries();
  }, []);

  const loadItineraries = async () => {
    try {
      const data = await contentApi.itineraries.list();
      setItineraries(data);
    } catch (err) {
      console.error('Failed to load itineraries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      await contentApi.itineraries.delete(slug);
      setItineraries(itineraries.filter(i => i.slug !== slug));
    } catch (err: any) {
      alert(`Error deleting itinerary: ${err.message}`);
    }
  };

  const handleEdit = (itinerary: any) => {
    setEditingItinerary(itinerary);
    setFormData({
      slug: itinerary.slug,
      title: itinerary.title,
      shortDescription: itinerary.shortDescription || itinerary.description || '',
      longContent: itinerary.longContent || '',
      heroImage: itinerary.heroImage || '',
      duration: itinerary.duration || 7,
      type: itinerary.type || 'highlights',
      startingPrice: itinerary.startingPrice || '',
      difficulty: itinerary.difficulty || 'moderate',
      groupSize: itinerary.groupSize || '2-12 people',
      highlights: itinerary.highlights || [],
      tags: itinerary.tags || [],
    });
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItinerary(null);
    setFormData({
      slug: '',
      title: '',
      shortDescription: '',
      longContent: '',
      heroImage: '',
      duration: 7,
      type: 'highlights',
      startingPrice: '$850',
      difficulty: 'moderate',
      groupSize: '2-12 people',
      highlights: [],
      tags: [],
    });
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingItinerary ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
      setFormData(prev => ({ ...prev, heroImage: url }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData(prev => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
    setHighlightInput('');
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItinerary) {
        await contentApi.itineraries.update(editingItinerary.slug, formData);
      } else {
        await contentApi.itineraries.create(formData);
      }
      await loadItineraries();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const filtered = itineraries.filter(i =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Manage Itineraries</h1>
          <p className="text-gray-500 text-sm mt-1">Manage tour packages, multi-day routes, and pricing</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Itinerary
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search itineraries..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
            Loading itineraries from database...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Itinerary</th>
                  <th className="p-4 font-medium">Duration</th>
                  <th className="p-4 font-medium">Starting Price</th>
                  <th className="p-4 font-medium">Difficulty</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.slug || item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {item.heroImage ? (
                          <img
                            src={getImageUrl(item.heroImage)}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                            onError={e => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{item.title}</div>
                          <span className="text-xs text-gray-400 font-mono">/{item.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {item.duration} Days
                      </div>
                    </td>
                    <td className="p-4 text-gray-900 font-medium text-sm">
                      <div className="flex items-center gap-0.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        {item.startingPrice || 'On request'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        {item.difficulty || 'Moderate'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.slug)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No itineraries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">
              {editingItinerary ? 'Edit Itinerary' : 'New Itinerary'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500"
                    placeholder="e.g. Classic Sri Lanka Highlights"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    disabled={!!editingItinerary}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 disabled:bg-gray-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={e => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="$850"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                  >
                    <option value="highlights">Highlights</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="cultural">Cultural</option>
                    <option value="adventure">Adventure</option>
                    <option value="beach">Beach & Coast</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.heroImage}
                    onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                    className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="URL or upload an image..."
                  />
                  <label className="btn-secondary flex items-center gap-1.5 cursor-pointer text-sm">
                    <Upload className="w-4 h-4" />
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {formData.heroImage && (
                  <img
                    src={getImageUrl(formData.heroImage)}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  placeholder="Overview of this tour package..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description (Markdown)</label>
                <textarea
                  rows={5}
                  value={formData.longContent}
                  onChange={e => setFormData({ ...formData, longContent: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-mono text-xs"
                  placeholder="Day-by-day description or comprehensive overview..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={e => setHighlightInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddHighlight(); } }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g. Climb Sigiriya Lion Rock at sunrise..."
                  />
                  <button type="button" onClick={handleAddHighlight} className="btn-secondary text-sm">Add</button>
                </div>
                <ul className="space-y-1">
                  {formData.highlights.map((h, i) => (
                    <li key={i} className="flex items-center justify-between text-xs bg-gray-50 px-3 py-1.5 rounded-lg">
                      <span className="text-gray-800">• {h}</span>
                      <button type="button" onClick={() => handleRemoveHighlight(i)} className="text-gray-400 hover:text-red-500">×</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary py-2 px-5 text-sm flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingItinerary ? 'Save Changes' : 'Create Itinerary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
