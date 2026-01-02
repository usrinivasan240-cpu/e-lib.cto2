import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminBooks from './AdminBooks';
import AdminUsers from './AdminUsers';
import AdminTransactions from './AdminTransactions';
import { BookOpen, Users, History, LayoutDashboard } from 'lucide-react';

const AdminDashboard = ({ admin }) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/books', name: 'Manage Books', icon: <BookOpen size={20} /> },
    { path: '/admin/users', name: 'Manage Users', icon: <Users size={20} /> },
    { path: '/admin/transactions', name: 'Transactions', icon: <History size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              location.pathname === item.path 
                ? 'bg-primary text-black font-bold' 
                : 'hover:bg-white/5 opacity-70 hover:opacity-100'
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </aside>

      {/* Content Area */}
      <div className="flex-1 glassmorphism rounded-2xl p-6 min-h-[600px] border border-white/5">
        <Routes>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="transactions" element={<AdminTransactions />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminOverview = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6 gold-gradient">Admin Overview</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <p className="opacity-60 text-sm">Total Books</p>
        <p className="text-4xl font-bold mt-2">124</p>
      </div>
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <p className="opacity-60 text-sm">Active Users</p>
        <p className="text-4xl font-bold mt-2">850</p>
      </div>
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <p className="opacity-60 text-sm">Revenue</p>
        <p className="text-4xl font-bold mt-2 text-primary">$12,450</p>
      </div>
    </div>
    <div className="mt-12 p-8 border-2 border-dashed border-white/10 rounded-2xl text-center opacity-40">
        Welcome to the Command Center. Select a category from the sidebar to manage your library.
    </div>
  </div>
);

export default AdminDashboard;
