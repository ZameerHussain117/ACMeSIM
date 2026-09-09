// Preview route only — confirms the mock eSIMgo data pipeline works.
// Search, filtering by type (local/regional/global), and pagination are
// built out properly in Sprint 4 (eSIM Store).

const express = require('express');
const router = express.Router();
const { listPackages } = require('../controllers/packageController');

router.get('/packages', listPackages);

module.exports = router;
