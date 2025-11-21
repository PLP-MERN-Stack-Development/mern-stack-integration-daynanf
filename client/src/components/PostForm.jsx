import { useState, useContext } from 'react';
import { createPost } from '../services/postService';
import { AuthContext } from '../context/AuthContext';

export default function PostForm({ onCreated }) {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (image) fd.append('image', image);

    try {
      setLoading(true);
      const post = await createPost(fd, token);
      setTitle(''); setContent(''); setImage(null);
      onCreated?.(post);
    } catch (err) {
      console.error(err);
      alert('Could not create post: ' + err.message);
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" />
      <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
      <button type="submit" disabled={loading} className="btn">{loading ? 'Posting...' : 'Post'}</button>
    </form>
  );
}
