import { useState, useEffect } from 'react';
import { Save, Upload, Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { contentApi, uploadImage } from '@/lib/api';

export function ManageSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [message, setMessage] = useState('');



  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await contentApi.settings.getAll();
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await contentApi.settings.update(settings);
      setMessage('✅ Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, settingKey: string, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
      if (index !== undefined) {
        // Update item in array
        const arr = Array.isArray(settings[settingKey]) ? [...settings[settingKey]] : [];
        if (arr[index]) {
          arr[index] = { ...arr[index], image: url };
          setSettings({ ...settings, [settingKey]: arr });
        }
      } else {
        setSettings({ ...settings, [settingKey]: url });
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    const arr = Array.isArray(settings[key]) ? [...settings[key]] : [];
    arr[index] = { ...arr[index], [field]: value };
    setSettings({ ...settings, [key]: arr });
  };

  const addArrayItem = (key: string, template: any) => {
    const arr = Array.isArray(settings[key]) ? [...settings[key]] : [];
    arr.push(template);
    setSettings({ ...settings, [key]: arr });
  };

  const removeArrayItem = (key: string, index: number) => {
    const arr = Array.isArray(settings[key]) ? [...settings[key]] : [];
    arr.splice(index, 1);
    setSettings({ ...settings, [key]: arr });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'categories', label: 'Categories' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact & About' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>



      {/* ─── HERO TAB ─── */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold">Hero Section</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
            {settings.hero_image && (
              <img src={settings.hero_image} alt="Hero" className="w-full h-48 object-cover rounded-xl mb-3" />
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={settings.hero_image || ''}
                onChange={e => updateSetting('hero_image', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Image URL or upload..."
              />
              <label className="btn-outline py-2 px-4 cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'hero_image')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={settings.hero_badge || ''}
              onChange={e => updateSetting('hero_badge', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={settings.hero_title || ''}
              onChange={e => updateSetting('hero_title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <textarea
              value={settings.hero_subtitle || ''}
              onChange={e => updateSetting('hero_subtitle', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
        </div>
      )}

      {/* ─── CATEGORIES TAB ─── */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Tour Categories</h2>
            <button
              onClick={() => addArrayItem('categories', { title: 'New Category', image: '', link: '/destinations', icon: 'Compass' })}
              className="btn-primary py-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          {(Array.isArray(settings.categories) ? settings.categories : []).map((cat: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Category {i + 1}</span>
                <button onClick={() => removeArrayItem('categories', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                  <input type="text" value={cat.title || ''} onChange={e => updateArrayItem('categories', i, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                  <input type="text" value={cat.icon || ''} onChange={e => updateArrayItem('categories', i, 'icon', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Image</label>
                <div className="flex gap-2">
                  {cat.image && <img src={cat.image} alt={cat.title} className="w-16 h-16 object-cover rounded-lg" />}
                  <input type="text" value={cat.image || ''} onChange={e => updateArrayItem('categories', i, 'image', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" />
                  <label className="p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'categories', i)} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Link</label>
                <input type="text" value={cat.link || ''} onChange={e => updateArrayItem('categories', i, 'link', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TESTIMONIALS TAB ─── */}
      {activeTab === 'testimonials' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Testimonials</h2>
            <button
              onClick={() => addArrayItem('testimonials', { name: '', location: '', text: '', rating: 5, avatar: '' })}
              className="btn-primary py-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          {(Array.isArray(settings.testimonials) ? settings.testimonials : []).map((t: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Testimonial {i + 1}</span>
                <button onClick={() => removeArrayItem('testimonials', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <input type="text" value={t.name || ''} onChange={e => updateArrayItem('testimonials', i, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                  <input type="text" value={t.location || ''} onChange={e => updateArrayItem('testimonials', i, 'location', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Quote</label>
                <textarea value={t.text || ''} onChange={e => updateArrayItem('testimonials', i, 'text', e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={t.rating || 5} onChange={e => updateArrayItem('testimonials', i, 'rating', parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Avatar URL</label>
                  <input type="text" value={t.avatar || ''} onChange={e => updateArrayItem('testimonials', i, 'avatar', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── FAQS TAB ─── */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">FAQ Section</h2>
            <button
              onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
              className="btn-primary py-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          {(Array.isArray(settings.faqs) ? settings.faqs : []).map((faq: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">FAQ {i + 1}</span>
                <button onClick={() => removeArrayItem('faqs', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                <input type="text" value={faq.question || ''} onChange={e => updateArrayItem('faqs', i, 'question', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                <textarea value={faq.answer || ''} onChange={e => updateArrayItem('faqs', i, 'answer', e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── CONTACT TAB ─── */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold">Contact & About</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input type="text" value={settings.site_name || ''} onChange={e => updateSetting('site_name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input type="text" value={settings.whatsapp_number || ''} onChange={e => updateSetting('whatsapp_number', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="+94701234567" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input type="email" value={settings.contact_email || ''} onChange={e => updateSetting('contact_email', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
            <input type="text" value={settings.about_title || ''} onChange={e => updateSetting('about_title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Content</label>
            <textarea value={settings.about_content || ''} onChange={e => updateSetting('about_content', e.target.value)} rows={6} className="w-full p-2 border border-gray-300 rounded-lg resize-none" />
          </div>
        </div>
      )}
    </div>
  );
}
