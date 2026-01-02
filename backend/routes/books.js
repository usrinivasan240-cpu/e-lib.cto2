const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const SavedBook = require('../models/SavedBook');
const auth = require('../middleware/auth');

// Get all books / Search
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                    { publicationYear: isNaN(query) ? undefined : Number(query) }
                ].filter(condition => condition.publicationYear !== undefined || !condition.hasOwnProperty('publicationYear'))
            };
        }
        const books = await Book.find(filter);
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error('Error fetching book:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).json({ message: 'Error fetching book' });
    }
});

// Save/Bookmark book (User only)
router.post('/:id/save', auth('user'), async (req, res) => {
    try {
        const alreadySaved = await SavedBook.findOne({ user: req.user.id, book: req.params.id });
        if (alreadySaved) return res.status(400).json({ message: 'Book already saved' });

        const savedBook = new SavedBook({ user: req.user.id, book: req.params.id });
        await savedBook.save();
        console.log('Book saved:', { userId: req.user.id, bookId: req.params.id });
        res.json({ message: 'Book saved successfully' });
    } catch (err) {
        console.error('Error saving book:', err);
        res.status(500).json({ message: 'Error saving book' });
    }
});

// Get saved books (User only)
router.get('/user/saved', auth('user'), async (req, res) => {
    try {
        const savedBooks = await SavedBook.find({ user: req.user.id }).populate('book');
        res.json(savedBooks.map(sb => sb.book));
    } catch (err) {
        console.error('Error fetching saved books:', err);
        res.status(500).json({ message: 'Error fetching saved books' });
    }
});

// Admin routes
router.post('/', auth('admin'), async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        console.log('New book created:', { id: book._id, title: book.title });
        res.status(201).json(book);
    } catch (err) {
        console.error('Error creating book:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Error creating book' });
    }
});

router.put('/:id', auth('admin'), async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        console.log('Book updated:', { id: book._id });
        res.json(book);
    } catch (err) {
        console.error('Error updating book:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        res.status(500).json({ message: 'Error updating book' });
    }
});

router.delete('/:id', auth('admin'), async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        console.log('Book deleted:', { id: req.params.id });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Error deleting book' });
    }
});

module.exports = router;
