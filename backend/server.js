const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Admin = require('./models/Admin');
const User = require('./models/User');
const Book = require('./models/Book');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected');
        
        // Auto-create default admin
        const adminExists = await Admin.findOne({ email: 'watson777@gmail.com' });
        if (!adminExists) {
            const admin = new Admin({
                email: 'watson777@gmail.com',
                password: 'watson777',
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin created');
        }

        // Seed some books if empty
        const bookCount = await Book.countDocuments();
        if (bookCount === 0) {
            const sampleBooks = [
                {
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    category: "Classic",
                    description: "A story of wealth, love, and the American Dream in the 1920s.",
                    publicationYear: 1925,
                    availability: "Available",
                    libraryLocation: "Shelf A1",
                    coverImage: "https://images.unsplash.com/photo-1543005814-14b24e17a332?auto=format&fit=crop&w=800&q=80"
                },
                {
                    title: "Atomic Habits",
                    author: "James Clear",
                    category: "Self-Help",
                    description: "An easy and proven way to build good habits and break bad ones.",
                    publicationYear: 2018,
                    availability: "Available",
                    libraryLocation: "Shelf B2",
                    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
                },
                {
                    title: "The Alchemist",
                    author: "Paulo Coelho",
                    category: "Fiction",
                    description: "A journey of self-discovery and following one's dreams.",
                    publicationYear: 1988,
                    availability: "Available",
                    libraryLocation: "Shelf C3",
                    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
                }
            ];
            await Book.insertMany(sampleBooks);
            console.log('Sample books seeded');
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
