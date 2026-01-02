import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookCard = ({ book }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glassmorphism rounded-xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover'} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 text-xs backdrop-blur-md">
          {book.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">{book.title}</h3>
        <p className="text-sm opacity-70 mb-4">{book.author}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className={`text-xs px-2 py-1 rounded ${book.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {book.availability}
          </span>
          <Link 
            to={`/book/${book._id}`}
            className="text-primary text-sm font-semibold hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
