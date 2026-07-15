const jwt = require('jsonwebtoken');

/**
 * Socket.IO authentication middleware.
 * Verifies JWT token and attaches user payload to the socket object.
 */
module.exports = (socket, next) => {
  // Extract token from handshake auth or headers
  let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  if (!token) {
    console.warn('[SocketAuth] Connection rejected: No token provided');
    return next(new Error('Authentication error: Token is required'));
  }

  const secret = process.env.JWT_SECRET || 'secret';

  try {
    const decoded = jwt.verify(token, secret);
    
    // Support both role and roleId depending on how token payload is structured
    const role = decoded.role || decoded.roleId || null;

    if (!decoded.userId || !decoded.tenantId) {
      console.warn('[SocketAuth] Connection rejected: Missing userId or tenantId in token payload');
      return next(new Error('Authentication error: Invalid token payload'));
    }

    // Attach verified user info to socket
    socket.user = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      role: role,
      email: decoded.email || null
    };

    console.log(`[SocketAuth] Connection authenticated for User: ${socket.user.userId} (Tenant: ${socket.user.tenantId})`);
    next();
  } catch (error) {
    console.error(`[SocketAuth] Token verification failed: ${error.message}`);
    return next(new Error('Authentication error: Invalid or expired token'));
  }
};
