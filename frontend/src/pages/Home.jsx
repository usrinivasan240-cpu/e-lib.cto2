import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon } from 'lucide-react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (query = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/books?query=${query}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Discover Your Next <span className="gold-gradient">Masterpiece</span>
        </h1>
        
        {/* Search UI Component as requested */}
        <div className="relative">
          <input 
            type="text" 
            className="[--background:#000000] [--color:#ffffff] [--muted:#242424] [--muted-foreground:#9c9c9c] [--border:#2e2e2e] relative inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-[--border] bg-[--background] hover:bg-[--muted] text-[--color] px-4 py-2 justify-start rounded-[0.5rem] text-sm font-normal shadow-none h-10 w-80 md:w-[500px] outline-none"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchBooks(e.target.value); // Real-time search
            }}
            placeholder="Search books..."
          />
          <kbd
            className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] flex h-7 select-none items-center gap-1 rounded border border-[#2e2e2e] bg-[#242424] px-1.5 font-mono text-[10px] font-medium text-[#9c9c9c]"
          >
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
      
      {!loading && books.length === 0 && (
        <div className="text-center py-20 opacity-50">
          No books found matching your search.
        </div>
      )}
    </div>
  );
};

export default Home;
