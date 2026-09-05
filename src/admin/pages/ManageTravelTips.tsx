import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Loader2, Lightbulb } from 'lucide-react';
import { contentApi, uploadImage, getImageUrl } from '@/lib/api';

export function ManageTravelTips() {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    shortDescription: '',
    longContent: '',
    heroImage: '',
    category: 'planning',
    tags: [] as string[],
  });

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      const data = await contentApi.travelTips.list();
      setTips(data);
    } catch (err) {
      console.error('Failed to load travel tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this travel tip?')) return;
    try {
      await contentApi.travelTips.delete(slug);
      setTips(tips.filter(t => t.slug !== slug));
    } catch (err: any) {
      alert(`Error deleting tip: ${err.message}`);
    }
  };

  const handleEdit = (tip: any) => {
    setEditingTip(tip);
    setFormData({
      slug: tip.slug,
      title: tip.title,
      shortDescription: tip.shortDescription || '',
      longContent: tip.longContent || '',
      heroImage: tip.heroImage || '',
      category: tip.category || 'planning',
      tags: tip.tags || [],
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTip(null);
    setFormData({
      slug: '',
      title: '',
      shortDescription: '',
      longContent: '',
      heroImage: '',
      category: 'planning',
      tags: [],
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingTip ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
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

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTip) {
        await contentApi.travelTips.update(editingTip.slug, formData);
      } else {
        await contentApi.travelTips.create(formData);
      }
      await loadTips();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const filtered = tips.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Manage Travel Tips</h1>
          <p className="text-gray-500 text-sm mt-1">Manage essential travel advice, visa guides, and FAQs</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Travel Tip
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search travel tips..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
            Loading travel tips from database...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Guide / Tip</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Tags</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(tip => (
                  <tr key={tip.slug || tip.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {tip.heroImage ? (
                          <img
                            src={getImageUrl(tip.heroImage)}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                            onError={e => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-amber-500">
                            <Lightbulb className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{tip.title}</div>
                          <span className="text-xs text-gray-400 font-mono">/{tip.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">
                        {tip.category || 'Planning'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(tip.tags || []).slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(tip)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tip.slug)}
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
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No travel tips found.
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
              {editingTip ? 'Edit Travel Tip' : 'New Travel Tip'}
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
                    placeholder="e.g. Sri Lanka Visa & Entry Guide 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    disabled={!!editingTip}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 disabled:bg-gray-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="planning">Trip Planning</option>
                  <option value="visa">Visa & Entry</option>
                  <option value="transport">Getting Around & Trains</option>
                  <option value="health">Health & Safety</option>
                  <option value="budget">Money & Budgeting</option>
                  <option value="culture">Culture & Etiquette</option>
                </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                  placeholder="Key takeaways or quick summary..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Advice (Markdown)</label>
                <textarea
                  rows={6}
                  value={formData.longContent}
                  onChange={e => setFormData({ ...formData, longContent: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-mono text-xs"
                  placeholder="In-depth guide with subheadings, bullet points, and advice..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Add a tag..."
                  />
                  <button type="button" onClick={handleAddTag} className="btn-secondary text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
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
                  {editingTip ? 'Save Changes' : 'Create Tip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
