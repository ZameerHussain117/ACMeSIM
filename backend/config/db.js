// Handles connecting to MongoDB via Mongoose. Kept separate from server.js
// so the connection logic and its error handling are easy to find.

const mongoose = require('mongoose');
const config = require('./index');

async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(`[db] Connected to MongoDB at ${config.mongoUri}`);
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message);
    // Fail fast — there's no point running an API server that can't reach its database.
    process.exit(1);
  }
}

module.exports = connectDB;
