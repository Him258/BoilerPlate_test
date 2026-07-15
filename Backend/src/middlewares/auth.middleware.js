const jwt = require('jsonwebtoken');
const { sendError } = require('../core/response');

const prisma = require('../config/db');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('[authMiddleware] Missing or malformed Authorization header:', authHeader);
      return sendError(res, 'Authentication token is missing', 'UNAUTHORIZED', [], 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Decode token without verification to inspect its content
    let decodedUnverified = null;
    let headerUnverified = null;
    try {
      decodedUnverified = jwt.decode(token);
      const parts = token.split('.');
      if (parts.length === 3) {
        headerUnverified = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      }
    } catch (e) {
      console.warn('[authMiddleware] Failed to decode token manually:', e.message);
    }

    const secret = process.env.JWT_SECRET || 'secret';
    console.log('[authMiddleware] Attempting token verification...');
    console.log('[authMiddleware] Unverified Header:', headerUnverified);
    console.log('[authMiddleware] Unverified Payload:', decodedUnverified);
    console.log('[authMiddleware] JWT_SECRET configuration - Length:', secret.length, 'Preview:', `${secret.substring(0, 3)}...${secret.substring(secret.length - 3)}`);

    const decoded = jwt.verify(token, secret);
    console.log('[authMiddleware] Token successfully verified! Decoded payload:', decoded);

    // Verify user and tenant exist in database to prevent stale token errors
    if (decoded.userId && decoded.tenantId) {
      const [tenantExists, userExists] = await Promise.all([
        prisma.tenant.findUnique({ where: { id: decoded.tenantId } }),
        prisma.user.findUnique({ where: { id: decoded.userId } })
      ]);
      if (!tenantExists || !userExists) {
        console.warn('[authMiddleware] Stale token detected. Tenant or User no longer exists in database.');
        return sendError(res, 'Session is invalid or expired', 'UNAUTHORIZED', [], 401);
      }
    }

    req.user = decoded; // { userId, tenantId, roleId }
    next();
  } catch (error) {
    console.error('[authMiddleware] Verification failed! Error:', error.message);
    if (error.stack) {
      console.error('[authMiddleware] Stack trace:', error.stack);
    }
    return sendError(res, 'Invalid or expired token', 'UNAUTHORIZED', [], 401);
  }
};

module.exports = authMiddleware;



