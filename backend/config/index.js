// Central place to read environment variables so the rest of the app never
// touches process.env directly. Makes it obvious what config the app depends on.

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/esim-app',

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  stripeSecretKey: process.env.STRIPE_SECRET_KEY,

  esimgo: {
    apiKey: process.env.ESIMGO_API_KEY,
    baseUrl: process.env.ESIMGO_BASE_URL,
    // Flag used elsewhere in the app to decide whether to call the real
    // eSIMgo API or fall back to the local mock dataset. Flip this once
    // real API access is granted.
    useMockData: !process.env.ESIMGO_API_KEY || process.env.ESIMGO_API_KEY.startsWith('not-yet'),
  },
};
