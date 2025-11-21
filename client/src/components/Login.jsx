import { useState, useContext } from 'react';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setToken(res.token);
      setUser(res.user);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button className="btn">Login</button>
      {err && <p className="text-red-500">{err}</p>}
    </form>
  );
}
