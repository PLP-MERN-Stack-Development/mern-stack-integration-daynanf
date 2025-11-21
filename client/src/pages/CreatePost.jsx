import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) formData.append('image', file);

        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!res.ok) throw new Error('Failed to create post');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error creating post');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        rows="10"
                        required
                    />
                    <input
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                        accept="image/*"
                    />
                    <button type="submit" className="btn btn-primary">Publish</button>
                </form>
            </div>
        </div>
    );
}
