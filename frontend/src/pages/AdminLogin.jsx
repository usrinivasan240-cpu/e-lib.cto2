import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import API_URL from '../api';

const AdminLogin = ({ setAdmin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/admin/login`, formData);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      setAdmin(res.data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError('Login failed. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glassmorphism p-8 rounded-2xl border border-secondary/30"
      >
        <div className="flex justify-center mb-4 text-secondary">
          <ShieldAlert size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-secondary">Admin Access</h2>
        <p className="text-center opacity-60 mb-8 text-sm">Restricted Area - Authorized Personnel Only</p>
        
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm opacity-70 mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm opacity-70 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Enter Admin Panel'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
