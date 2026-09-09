// Server-side enforcement of authentication and role-based access control (RBAC).
//
// IMPORTANT: this is the REAL security boundary. Hiding a button in the frontend
// does not stop someone from calling the API endpoint directly — these middleware
// functions are what actually block the request, on every request, no exceptions.
//
// Actual login/signup route logic (issuing tokens) is built in Sprint 3.
// This file only builds the verification side: given a token, is it valid,
// and does the user have the right role?

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Verifies the JWT on the request and attaches the decoded payload to req.user.
 * Any route wrapped with this will reject requests with no token, an expired
 * token, or a token signed with the wrong secret (i.e. tampered/forged).
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // e.g. { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Restricts a route to a specific role. Must be used AFTER requireAuth, since
 * it relies on req.user already being set.
 *
 * Example usage:
 *   router.delete('/users/:id', requireAuth, requireRole('admin'), deleteUserHandler);
 */
function requireRole(allowedRole) {
  return (req, res, next) => {
    if (!req.user) {
      // Defensive check — this should never trigger if requireAuth ran first,
      // but fail closed (deny) rather than open if middleware order is ever mixed up.
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (req.user.role !== allowedRole) {
      return res.status(403).json({ error: 'Forbidden — insufficient role' });
    }

    next();
  };
}

// TODO (Sprint 3): implement the actual /auth/signup, /auth/login, /auth/verify-otp
// routes that CREATE and SIGN the JWTs this middleware verifies. This file only
// covers verification, not issuance.

module.exports = { requireAuth, requireRole };
