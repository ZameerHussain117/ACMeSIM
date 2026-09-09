// Configures the Express app itself (middleware, routes). Kept separate from
// server.js so the app can be imported directly in tests later without
// actually starting a live server/port.

const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const packageRoutes = require('./routes/packages');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes); // GET /health
app.use('/api', packageRoutes); // GET /api/packages (preview only — full logic in Sprint 4)

// TODO (Sprint 3): app.use('/api/auth', authRoutes)
// TODO (Sprint 4): expand package routes with search/filter
// TODO (Sprint 5): app.use('/api/transactions', transactionRoutes)
// TODO (Sprint 13): app.use('/api/admin', adminRoutes)

// Catch-all 404 for anything not matched above
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
