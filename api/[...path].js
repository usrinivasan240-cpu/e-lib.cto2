const app = require('../backend/app');
const { connectToDatabase } = require('../backend/db');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'OPTIONS') {
      await connectToDatabase();
    }

    return app(req, res);
  } catch (err) {
    console.error('API handler error:', err);

    if (res.headersSent) {
      return res.end();
    }

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
