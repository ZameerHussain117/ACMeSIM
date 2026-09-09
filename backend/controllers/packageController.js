// This controller is a lightweight preview so Sprint 4 (eSIM Store) has
// something concrete to build from. Full search/filter logic belongs in
// Sprint 4 — this just proves the mock-data pipeline works end-to-end.

const esimgoService = require('../services/esimgoService');

async function listPackages(req, res) {
  try {
    const packages = await esimgoService.getAvailablePackages();
    res.status(200).json({ count: packages.length, packages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load eSIM packages', details: err.message });
  }
}

module.exports = { listPackages };
