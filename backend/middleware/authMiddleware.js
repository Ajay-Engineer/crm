const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hig_ai_automation_crm_secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const orgHeader = req.headers['x-organization-id'];

  req.orgId = orgHeader || 'default_org';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Default fallback demo user if no token passed
    req.user = {
      id: 'user_admin_001',
      orgId: req.orgId,
      name: 'Ajai (Admin)',
      email: 'admin@higautomation.ai',
      role: 'owner',
    };
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.orgId = decoded.orgId || req.orgId;
    next();
  } catch (err) {
    // If token invalid, still provide demo fallback user for seamless preview
    req.user = {
      id: 'user_admin_001',
      orgId: req.orgId,
      name: 'Ajai (Admin)',
      email: 'admin@higautomation.ai',
      role: 'owner',
    };
    next();
  }
}

module.exports = authMiddleware;
