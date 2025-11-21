import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const data = await request('GET', `/posts/${id}`);
            setPost(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading) return <div className="container">Loading...</div>;
    if (!post) return <div className="container">Post not found</div>;

    return (
        <div className="container">
            <div className="card">
                {post.image && <img src={`http://localhost:5000${post.image}`} alt={post.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />}
                <h1>{post.title}</h1>
                <p style={{ color: '#666' }}>By {post.author?.name} on {new Date(post.createdAt).toLocaleDateString()}</p>
                <div style={{ lineHeight: '1.6', marginTop: '20px' }}>
                    {post.content}
                </div>

                <hr style={{ margin: '40px 0' }} />

                <h3>Comments</h3>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                        <div key={index} style={{ background: '#f9f9f9', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
                            <p><strong>{comment.author?.name || 'User'}</strong>: {comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}

                <CommentForm postId={post._id} onCommentAdded={fetchPost} />
            </div>
        </div>
    );
}

function CommentForm({ postId, onCommentAdded }) {
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setSubmitting(true);
        setError(null);

        try {
            await request('POST', `/posts/${postId}/comments`, { text }, token);
            setText('');
            onCommentAdded();
        } catch (err) {
            console.error('Failed to add comment:', err);
            setError('Failed to add comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
            <h4>Add a Comment</h4>
            {token ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your comment here..."
                        rows="4"
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        disabled={submitting}
                    ></textarea>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Comment'}
                    </button>
                </form>
            ) : (
                <p>Please log in to add a comment.</p>
            )}
        </div>
    );
}
