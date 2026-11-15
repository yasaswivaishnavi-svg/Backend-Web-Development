// TODO: Implement the requireRole factory.
//
// requireRole(...allowedRoles) must RETURN an Express middleware that:
//
// 1. Responds 401 { error: { code: 'UNAUTHENTICATED', message: '...' } }
//    if req.user is missing (defensive — requireAuth should have set it).
//
// 2. Responds 403 { error: { code: 'FORBIDDEN', message: '...' } }
//    if req.user.role is NOT in allowedRoles.
//
// 3. Otherwise calls next().
//
// Read the role ONLY from req.user.role — never from req.body.
//
// Right now it lets everyone through, so the role gates do nothing.

/*module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // Replace this pass-through with the real check:
    next();
  };
};*/


// Authorization middleware factory
module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {

    // Check whether the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication is required',
        },
      });
    }

    // Check whether the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action',
        },
      });
    }

    // Allow the request to continue
    next();
  };
};

