import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'dwivedyabhinav777@gmail.com';
const ADMIN_PASS = '123456';

const AdminSignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Admin Sign In</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all">Sign In</button>
      </form>
    </div>
  );
};

export default AdminSignInPage; 