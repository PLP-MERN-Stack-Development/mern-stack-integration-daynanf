import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../services/api';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await request('GET', '/posts');
                setPosts(data.posts || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="container">
            <h1>Recent Posts</h1>
            <div className="posts-grid">
                {posts.map(post => (
                    <div key={post._id} className="card">
                        {post.image && <img src={`http://localhost:5000${post.image}`} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                        <h2>{post.title}</h2>
                        <p>{post.content.substring(0, 100)}...</p>
                        <p><small>By {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}</small></p>
                        <Link to={`/posts/${post._id}`} className="btn btn-primary">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
