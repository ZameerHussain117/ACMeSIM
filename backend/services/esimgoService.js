// Single point of contact for anything eSIMgo-related. Nothing else in the app
// should read the mock JSON file directly or call the eSIMgo API directly —
// they should call functions here instead. That way, once real eSIMgo access
// is granted, only this file needs to change.

const fs = require('fs');
const path = require('path');
const config = require('../config');

const MOCK_DATA_PATH = path.join(__dirname, '..', 'mocks', 'esimPackages.json');

/**
 * Returns the list of available eSIM packages.
 * Uses local mock data until real eSIMgo API access is granted (see config.esimgo.useMockData).
 */
async function getAvailablePackages() {
  if (config.esimgo.useMockData) {
    const raw = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  }

  // TODO (once real eSIMgo access is available): replace this with an actual
  // HTTP call, e.g.:
  //
  // const response = await fetch(`${config.esimgo.baseUrl}/packages`, {
  //   headers: { Authorization: `Bearer ${config.esimgo.apiKey}` },
  // });
  // return response.json();
  throw new Error('Real eSIMgo integration not implemented yet.');
}

module.exports = { getAvailablePackages };
