import React from 'react';
import { Link } from 'react-router-dom';
import { Library, User, LogOut, Shield } from 'lucide-react';

const Navbar = ({ user, admin, onLogout, onAdminLogout }) => {
  return (
    <nav className="glassmorphism sticky top-0 z-50 border-b border-white/10 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Library className="text-primary" />
          <span className="gold-gradient">Premium E-Library</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-primary transition-colors">Books</Link>
          {user && (
            <>
              <Link to="/saved" className="hover:text-primary transition-colors">Saved</Link>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm opacity-70">Hello, {user.name}</span>
                <button onClick={onLogout} className="text-red-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          )}
          {admin && (
            <>
              <Link to="/admin/dashboard" className="flex items-center gap-1 text-secondary hover:text-primary">
                <Shield size={20} /> Dashboard
              </Link>
              <button onClick={onAdminLogout} className="text-red-400 hover:text-red-500">
                <LogOut size={20} />
              </button>
            </>
          )}
          {!user && !admin && (
            <div className="flex gap-4">
              <Link to="/login" className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-black transition-all">
                Login
              </Link>
              <Link to="/admin/login" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
