const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchPosts = async (page = 1, limit = 10) => {
  const res = await fetch(`${API_BASE}/posts?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

// create post with image (multipart)
export const createPost = async (formData, token) => {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
};
