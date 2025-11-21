import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ background: '#333', color: 'white', padding: '1rem' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>MERN Blog</Link>
                <div>
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem' }}>Hello, {user.name}</span>
                            <Link to="/create" style={{ color: 'white', marginRight: '1rem' }}>Create Post</Link>
                            <button onClick={logout} className="btn btn-danger">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
                            <Link to="/register" style={{ color: 'white' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
