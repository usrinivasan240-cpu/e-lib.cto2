import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import API_URL from '../api';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', description: '',
    publicationYear: '', libraryLocation: '', coverImage: ''
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (currentBook) {
        await axios.put(`${API_URL}/api/books/${currentBook._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/books`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchBooks();
      setFormData({ title: '', author: '', category: '', description: '', publicationYear: '', libraryLocation: '', coverImage: '' });
      setCurrentBook(null);
    } catch (err) {
      console.error('Error saving book:', err);
      alert('Error saving book');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Error deleting book');
    }
  };

  const openEdit = (book) => {
    setCurrentBook(book);
    setFormData(book);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Manage Library Collection</h2>
        <button 
          onClick={() => { setIsModalOpen(true); setCurrentBook(null); }}
          className="flex items-center gap-2 bg-primary text-black font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all"
        >
          <Plus size={20} /> Add New Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/10 opacity-70">
            <tr>
              <th className="pb-4 font-semibold">Book Info</th>
              <th className="pb-4 font-semibold">Category</th>
              <th className="pb-4 font-semibold">Location</th>
              <th className="pb-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {books.map(book => (
              <tr key={book._id} className="hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img src={book.coverImage} className="w-10 h-14 object-cover rounded" />
                    <div>
                      <p className="font-bold">{book.title}</p>
                      <p className="text-sm opacity-60">{book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm">{book.category}</td>
                <td className="py-4 text-sm">{book.libraryLocation}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(book)} className="p-2 hover:bg-white/10 rounded text-blue-400"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(book._id)} className="p-2 hover:bg-white/10 rounded text-red-400"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glassmorphism w-full max-w-2xl rounded-2xl p-8 border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{currentBook ? 'Edit Book' : 'Add New Book'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm opacity-60 mb-1 block">Title</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="text-sm opacity-60 mb-1 block">Author</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
              <div>
                <label className="text-sm opacity-60 mb-1 block">Category</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div>
                <label className="text-sm opacity-60 mb-1 block">Publication Year</label>
                <input required type="number" className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.publicationYear} onChange={e => setFormData({...formData, publicationYear: e.target.value})} />
              </div>
              <div>
                <label className="text-sm opacity-60 mb-1 block">Library Location</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.libraryLocation} onChange={e => setFormData({...formData, libraryLocation: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-sm opacity-60 mb-1 block">Cover Image URL</label>
                <input required className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="text-sm opacity-60 mb-1 block">Description</label>
                <textarea required rows="3" className="w-full bg-black/40 border border-white/10 rounded px-3 py-2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <button type="submit" className="col-span-2 mt-4 bg-primary text-black font-bold py-3 rounded-lg">{currentBook ? 'Update Book' : 'Add Book'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
