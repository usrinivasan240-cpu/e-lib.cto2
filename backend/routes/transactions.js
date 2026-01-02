const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// User: Make payment (Simulated)
router.post('/', auth('user'), async (req, res) => {
    try {
        const { bookId, amount } = req.body;
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

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Manage/View all transactions
router.get('/', auth('admin'), async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('user', 'name email').populate('book', 'title');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
