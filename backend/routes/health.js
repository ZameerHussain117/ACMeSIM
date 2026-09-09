// Simple route to confirm the server is running. Useful for local dev checks
// and later for deployment health checks (e.g. AWS/Render/Railway).

const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
