import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const EditProfile: React.FC = () => {
  // For demo, use userId 1. In a real app, get this from auth context or JWT.
  const userId = 1;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Optionally, fetch current profile info to prefill the form
  React.useEffect(() => {
    api.get(`/users/${userId}`)
      .then(res => {
        setName(res.data.name || '');
        setBio(res.data.bio || '');
        setAvatar(res.data.avatar || '');
      })
      .catch(() => {});
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.put(`/users/${userId}`, { name, bio, avatar });
      setLoading(false);
      navigate(`/profile/${userId}`);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.error || 'Update failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-slate-100">Edit Profile</h2>
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
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-slate-300 mb-2">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile; 