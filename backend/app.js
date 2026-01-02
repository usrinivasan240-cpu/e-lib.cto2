const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected. Please try again later.',
    });
  }

  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));

module.exports = app;
