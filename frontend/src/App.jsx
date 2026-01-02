import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import BookDetails from './pages/BookDetails';
import AdminDashboard from './pages/AdminDashboard';
import SavedBooks from './pages/SavedBooks';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-premium-black text-white font-poppins">
        <Navbar user={user} admin={admin} onLogout={handleLogout} onAdminLogout={handleAdminLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/admin/login" element={!admin ? <AdminLogin setAdmin={setAdmin} /> : <Navigate to="/admin/dashboard" />} />
            <Route path="/book/:id" element={<BookDetails user={user} />} />
            <Route path="/saved" element={user ? <SavedBooks /> : <Navigate to="/login" />} />
            <Route 
              path="/admin/*" 
              element={admin ? <AdminDashboard admin={admin} /> : <Navigate to="/admin/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
