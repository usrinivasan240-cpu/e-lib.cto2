const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    availability: { type: String, enum: ['Available', 'Issued'], default: 'Available' },
    libraryLocation: { type: String, required: true },
    coverImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema, 'books');
