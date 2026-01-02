import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, CreditCard, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../api';

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSave = async () => {
    if (!user) return navigate('/login');
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/books/${id}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book saved to your bookmarks!');
    } catch (err) {
      console.error('Error saving book:', err);
      alert(err.response?.data?.message || 'Error saving book');
    } finally {
      setSaving(false);
    }
  };

  const handlePayment = async () => {
    if (!user) return navigate('/login');
    setPaying(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/transactions`, {
        bookId: id,
        amount: 29.99 // Simulated price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Payment successful! Book issued.');
      // Refresh book data
      const res = await axios.get(`${API_URL}/api/books/${id}`);
      setBook(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing payment');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!book) return <div className="text-center py-20">Book not found.</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-4xl font-bold mb-2 gold-gradient">{book.title}</h1>
          <p className="text-xl opacity-80 mb-6 flex items-center gap-2">
            <UserIcon size={20} className="text-secondary" /> {book.author}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="glassmorphism px-3 py-1 rounded-full text-sm border border-primary/20">{book.category}</span>
            <span className="flex items-center gap-1 opacity-70 text-sm"><Calendar size={16} /> {book.publicationYear}</span>
            <span className="flex items-center gap-1 opacity-70 text-sm"><MapPin size={16} /> {book.libraryLocation}</span>
          </div>

          <p className="text-lg leading-relaxed opacity-90 mb-8 border-l-4 border-primary pl-6">
            {book.description}
          </p>

          <div className="mt-auto space-y-6">
            <div className="flex items-center gap-6">
              <span className={`text-lg font-bold ${book.availability === 'Available' ? 'text-green-400' : 'text-red-400'}`}>
                {book.availability}
              </span>
              <span className="text-2xl font-bold text-primary">$29.99</span>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handlePayment} 
                disabled={paying || book.availability !== 'Available'}
                className="pay-btn flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard size={20} /> {paying ? 'Processing...' : 'Issue Book / Pay Now'}
              </button>

              <button 
                onClick={handleSave}
                disabled={saving}
                className="bookmarkBtn"
              >
                <Bookmark size={20} className={saving ? 'animate-pulse' : ''} />
                <span className="ml-2 text-sm font-bold">Save</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;
