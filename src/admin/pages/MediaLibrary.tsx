import { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { uploadImage, deleteImage, listImages } from '@/lib/api';

export function MediaLibrary() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => { loadFiles(); }, []);

  const loadFiles = async () => {
    try {
      const data = await listImages();
      setFiles(data.files);
    } catch (err) {
      console.error('Failed to load files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      try {
        await uploadImage(file);
      } catch (err: any) {
        alert(`Failed to upload ${file.name}: ${err.message}`);
      }
    }
    await loadFiles();
    setUploading(false);
  };

  const handleDelete = async (filename: string) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await deleteImage(filename);
      setFiles(files.filter(f => f.filename !== filename));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Media Library</h1>
        <label className="btn-primary cursor-pointer">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
      ) : files.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No images uploaded yet</h3>
          <p className="text-gray-400">Upload images to use across your website</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map(file => (
            <div key={file.filename} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="aspect-square relative overflow-hidden bg-gray-50">
                <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(file.url)} className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100" title="Copy URL">
                    {copied === file.url ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(file.filename)} className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">{file.filename}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
