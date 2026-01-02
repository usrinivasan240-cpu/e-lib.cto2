import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, User } from 'lucide-react';
import API_URL from '../api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user account?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Registered Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => (
          <div key={user._id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <User size={24} />
              </div>
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm opacity-60">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(user._id)}
              className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
