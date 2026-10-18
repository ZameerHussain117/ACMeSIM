// Configures the Express app itself (middleware, routes). Kept separate from
// server.js so the app can be imported directly in tests later without
// actually starting a live server/port.

const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const packageRoutes = require('./routes/packages');
const authRoutes = require('./routes/authRoutes'); // <-- Added for Sprint 3 Google Auth

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes); // GET /health
app.use('/api', packageRoutes); // GET /api/packages (preview only — full logic in Sprint 4)
app.use('/api/auth', authRoutes); // <-- Mounted Google Auth routes (/api/auth/google)

// TODO (Sprint 4): expand package routes with search/filter
// TODO (Sprint 5): app.use('/api/transactions', transactionRoutes)
// TODO (Sprint 13): app.use('/api/admin', adminRoutes)

/*
  ========================================================
  TEMPORARILY COMMENTED OUT: eSIM Catalogue Route
  (Uncomment later once your eSIM Go API key is ready)
  ========================================================
app.get('/catalogue-preview', async (req, res) => {
  try {
    const resp = await fetch(
      "https://api.esim-go.com/v2.5/catalogue?countries=PK",
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const result = await resp.json();
    console.log(result);
    
    const bundles = result.bundles || [];

    const html = `...`; // (Catalogue HTML template)
    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`);
  }
});
*/

// Temporary root endpoint for quick health check
app.get('/', (req, res) => {
  res.json({ message: 'ACMeSIM Backend & Google Auth API are running successfully!' });
});


// Catch-all 404 for anything not matched above
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;