const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// User: Make payment (Simulated)
router.post('/', auth('user'), async (req, res) => {
    try {
        const { bookId, amount } = req.body;

        // Validate required fields
        if (!bookId || !amount) {
            return res.status(400).json({ message: 'Book ID and amount are required' });
        }

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const transaction = new Transaction({
            user: req.user.id,
            book: bookId,
            amount: amount,
            status: 'Completed'
        });
        await transaction.save();

        // Update book availability if needed
        book.availability = 'Issued';
        await book.save();

        console.log('Transaction completed:', { userId: req.user.id, bookId, amount });
        res.status(201).json(transaction);
    } catch (err) {
        console.error('Error processing transaction:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        res.status(500).json({ message: 'Error processing transaction' });
    }
});

// Admin: Manage/View all transactions
router.get('/', auth('admin'), async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('user', 'fullName email')
            .populate('book', 'title')
            .sort({ transactionDate: -1 });
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

module.exports = router;
