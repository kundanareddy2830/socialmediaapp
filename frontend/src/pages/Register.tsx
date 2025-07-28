import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../lib/api';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        email,
        username,
        password,
        name,
      });
      setAuthToken(data.token);
      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate('/');
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-slate-100">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div>
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register; 