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

// MongoDB URI with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary';
const PORT = process.env.PORT || 5000;

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // In production, you might want to gracefully shutdown
    // process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// MongoDB connection options for better stability
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 50,
    minPoolSize: 5,
    retryWrites: true,
    retryReads: true,
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI, mongooseOptions)
    .then(async () => {
        console.log('MongoDB connected successfully');

        // Auto-create default admin
        try {
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
        } catch (err) {
            console.error('Error creating default admin:', err);
        }

        // Seed some books if empty
        try {
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
        } catch (err) {
            console.error('Error seeding books:', err);
        }

        // Start server only after MongoDB connection is established
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`MongoDB connection failed: ${err.message}`);
        console.error('Please check your MONGODB_URI environment variable.');
        process.exit(1);
    });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// Middleware to ensure DB is connected before processing requests
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: 'Database not connected. Please try again later.'
        });
    }
    next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));
