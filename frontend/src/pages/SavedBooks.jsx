import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import API_URL from '../api';

const SavedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/books/user/saved`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching saved books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedBooks();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-12 gold-gradient">Your Saved Books</h1>
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
      {!loading && books.length === 0 && (
        <div className="text-center py-20 opacity-50">
          You haven't saved any books yet.
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
