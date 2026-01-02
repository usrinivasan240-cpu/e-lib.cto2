const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary';

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 50,
  minPoolSize: 5,
  retryWrites: true,
  retryReads: true,
};

let cached = global.__mongoose;
if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null, listenersAttached: false };
}

const attachConnectionListeners = () => {
  if (cached.listenersAttached) return;
  cached.listenersAttached = true;

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });
};

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, mongooseOptions)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        attachConnectionListeners();
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = {
  MONGODB_URI,
  mongooseOptions,
  connectToDatabase,
};
