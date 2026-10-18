// Actual entry point — connects to MongoDB, then starts the HTTP server.
// Run with: npm run dev (or npm start)

const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config');

async function start() {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    app.listen(config.port, () => {
      console.log(`[server] Running on http://localhost:${config.port} (${config.nodeEnv})`);
    });
  } catch (error) {
    console.error('[server] Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

start();