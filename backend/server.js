const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
const { connectToDatabase } = require('./db');

const Admin = require('./models/Admin');
const Book = require('./models/Book');

const PORT = process.env.PORT || 5000;

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const ensureDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'watson777@gmail.com' });
    if (!adminExists) {
      const admin = new Admin({
        email: 'watson777@gmail.com',
        password: 'watson777',
        role: 'admin',
      });
      await admin.save();
      console.log('Default admin created');
    }
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
};

const seedSampleBooksIfEmpty = async () => {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount !== 0) return;

    const sampleBooks = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Classic',
        description: 'A story of wealth, love, and the American Dream in the 1920s.',
        publicationYear: 1925,
        availability: 'Available',
        libraryLocation: 'Shelf A1',
        coverImage:
          'https://images.unsplash.com/photo-1543005814-14b24e17a332?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Self-Help',
        description: 'An easy and proven way to build good habits and break bad ones.',
        publicationYear: 2018,
        availability: 'Available',
        libraryLocation: 'Shelf B2',
        coverImage:
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'Fiction',
        description: "A journey of self-discovery and following one's dreams.",
        publicationYear: 1988,
        availability: 'Available',
        libraryLocation: 'Shelf C3',
        coverImage:
          'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      },
    ];

    await Book.insertMany(sampleBooks);
    console.log('Sample books seeded');
  } catch (err) {
    console.error('Error seeding books:', err);
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();

    await ensureDefaultAdmin();
    await seedSampleBooksIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.error('Please check your MONGODB_URI environment variable.');
    process.exit(1);
  }
};

startServer();

// Ensure the mongoose connection is closed on shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
  } finally {
    process.exit(0);
  }
});
