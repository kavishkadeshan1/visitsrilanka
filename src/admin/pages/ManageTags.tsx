import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const initialTags = ['Adventure', 'Beaches', 'Culture', 'Wildlife', 'History', 'Nature', 'Food'];

export function ManageTags() {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('admin_tags');
    if (saved) {
      try {
        setTags(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tags from local storage");
      }
    }
  }, []);

  const saveTags = (newTags: string[]) => {
    setTags(newTags);
    localStorage.setItem('admin_tags', JSON.stringify(newTags));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      saveTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleDelete = (tagToDelete: string) => {
    if (window.confirm(`Are you sure you want to delete the tag "${tagToDelete}"?`)) {
      saveTags(tags.filter(tag => tag !== tagToDelete));
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Manage Tags</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Tag</h2>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            type="text" 
            placeholder="E.g., Surfing" 
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
          />
          <button type="submit" className="btn-primary" disabled={!newTag.trim()}>
            <Plus className="w-5 h-5" />
            Add Tag
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
              <span className="text-gray-700 font-medium text-sm">{tag}</span>
              <button 
                onClick={() => handleDelete(tag)}
                className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                title="Delete tag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {tags.length === 0 && (
            <p className="text-gray-500 text-sm">No tags available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
