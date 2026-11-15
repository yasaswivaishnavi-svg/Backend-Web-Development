/*'use strict';
// middleware/rateLimiter.js
//
// YOUR TASK: replace this pass-through with a real rate limiter.
//
// Right now this middleware lets EVERY request through, so the login route can be
// brute-forced without limit. Build a strict limiter with `express-rate-limit`
// (already in package.json) that is exported as the middleware used by the three
// auth routes in src/routes/auth.js.
//
// Requirements (checked by the tests):
//   - windowMs: 15 minutes
//   - max: 5 attempts per window per IP
//   - after the limit, respond with 429 and a `Retry-After` header
//   - standardHeaders: true, legacyHeaders: false
//   - (recommended) skipSuccessfulRequests: true so only FAILED attempts count
//
// Also add a COMMENT explaining how a Redis-backed store (rate-limit-redis) would
// replace the default in-memory store in a multi-instance deployment, and why the
// in-memory store is not enough when several instances run behind a load balancer.
//
// Hint: express-rate-limit returns a middleware function — export it directly:
//   const rateLimit = require('express-rate-limit');
//   module.exports = rateLimit({ ...options });

module.exports = (req, res, next) => next(); // TODO: replace this stub*/


'use strict';

// Import express-rate-limit package
const rateLimit = require('express-rate-limit');

// Create a shared rate limiter for authentication routes
const authLimiter = rateLimit({
  // Time window: 15 minutes
  windowMs: 15 * 60 * 1000,

  // Allow maximum 5 failed attempts per IP
  max: 5,

  // Send modern RateLimit headers
  standardHeaders: true,

  // Disable older X-RateLimit headers
  legacyHeaders: false,

  // Count only failed requests
  skipSuccessfulRequests: true,

  // Return 429 when the limit is exceeded
  handler: (req, res) => {
    res.set('Retry-After', String(
      Math.max(1, Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000))
    ));

    res.status(429).json({
      message: 'Too many requests. Please try again later.'
    });
  }
});

// Redis store can replace the default in-memory store using rate-limit-redis
// and a shared Redis connection. In a multi-instance deployment behind a
// load balancer, each server has its own memory, so request counts are separate.
// Redis provides one shared counter across all instances, ensuring consistent
// rate limiting regardless of which server handles the request.

module.exports = authLimiter;

