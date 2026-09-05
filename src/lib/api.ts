/**
 * API client for communicating with the Express backend.
 * Used by both public pages and admin panel.
 */

/**
 * Dynamically resolves the API base URL.
 * Checks runtime config (window.__API_URL__) first for cPanel File Manager edits,
 * then Vite build-time env variable (VITE_API_URL), and defaults to '/api'.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined' && (window as any).__API_URL__) {
    return (window as any).__API_URL__.replace(/\/+$/, '');
  }
  return (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
}

/**
 * Returns the origin of the backend server (without '/api' suffix).
 * e.g. 'https://your-app.vercel.app'
 */
export function getBackendOrigin(): string {
  const base = getApiBase();
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return base.replace(/\/api\/?$/, '');
  }
  return '';
}

/**
 * Resolves an image URL. If it's a relative path like '/uploads/...',
 * prefixes it with the backend host when deployed on cPanel with an external Vercel backend.
 */
export function getImageUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return '';
  if (
    pathOrUrl.startsWith('http://') ||
    pathOrUrl.startsWith('https://') ||
    pathOrUrl.startsWith('data:') ||
    pathOrUrl.startsWith('blob:')
  ) {
    return pathOrUrl;
  }
  if (pathOrUrl.startsWith('/uploads/')) {
    const origin = getBackendOrigin();
    if (origin) {
      return `${origin}${pathOrUrl}`;
    }
  }
  return pathOrUrl;
}

// ─── Token Management ───
let authToken: string | null = localStorage.getItem('admin_token');

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
}

export function getAuthToken() {
  return authToken;
}

// ─── Fetch Helpers ───
async function request<T>(method: string, path: string, body?: any, isFormData = false): Promise<T> {
  const headers: Record<string, string> = {};

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getApiBase()}${cleanPath}`;

  const res = await fetch(url, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `API Error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: any) => request<T>('POST', path, body),
  put: <T>(path: string, body: any) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

// ─── Auth API ───
export async function loginAdmin(username: string, password: string) {
  const data = await api.post<{ token: string; user: { id: number; username: string } }>(
    '/auth/login',
    { username, password }
  );
  setAuthToken(data.token);
  return data;
}

export async function verifyToken() {
  try {
    await api.get('/auth/verify');
    return true;
  } catch {
    setAuthToken(null);
    return false;
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return api.post('/auth/change-password', { currentPassword, newPassword });
}

export function logoutAdmin() {
  setAuthToken(null);
}

// ─── Upload API ───
export async function uploadImage(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('image', file);
  return request('POST', '/upload', formData, true);
}

export async function deleteImage(filename: string) {
  return api.delete(`/upload/${filename}`);
}

export async function listImages() {
  return api.get<{ files: { filename: string; url: string; size: number; uploadedAt: string }[] }>('/upload/list');
}

// ─── Content API ───
export const contentApi = {
  // Destinations
  destinations: {
    list: () => api.get<any[]>('/destinations'),
    get: (slug: string) => api.get<any>(`/destinations/${slug}`),
    create: (data: any) => api.post('/destinations', data),
    update: (slug: string, data: any) => api.put(`/destinations/${slug}`, data),
    delete: (slug: string) => api.delete(`/destinations/${slug}`),
  },

  // Itineraries
  itineraries: {
    list: () => api.get<any[]>('/itineraries'),
    get: (slug: string) => api.get<any>(`/itineraries/${slug}`),
    create: (data: any) => api.post('/itineraries', data),
    update: (slug: string, data: any) => api.put(`/itineraries/${slug}`, data),
    delete: (slug: string) => api.delete(`/itineraries/${slug}`),
  },

  // Blog
  blog: {
    list: () => api.get<any[]>('/blog'),
    get: (slug: string) => api.get<any>(`/blog/${slug}`),
    create: (data: any) => api.post('/blog', data),
    update: (slug: string, data: any) => api.put(`/blog/${slug}`, data),
    delete: (slug: string) => api.delete(`/blog/${slug}`),
  },

  // Travel Tips
  travelTips: {
    list: () => api.get<any[]>('/travel-tips'),
    get: (slug: string) => api.get<any>(`/travel-tips/${slug}`),
    create: (data: any) => api.post('/travel-tips', data),
    update: (slug: string, data: any) => api.put(`/travel-tips/${slug}`, data),
    delete: (slug: string) => api.delete(`/travel-tips/${slug}`),
  },

  // Settings
  settings: {
    getAll: () => api.get<Record<string, any>>('/settings'),
    get: (key: string) => api.get<{ key: string; value: any }>(`/settings/${key}`),
    update: (settings: Record<string, any>) => api.put('/settings', settings),
    updateOne: (key: string, value: any) => api.put(`/settings/${key}`, { value }),
  },
};
