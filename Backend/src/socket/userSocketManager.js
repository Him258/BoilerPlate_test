const userSockets = new Map(); // userId -> { sockets: Set, tenantId, role, email }

/**
 * Register an active socket for a user
 */
exports.registerSocket = (userId, socketId, tenantId, role, email) => {
  if (!userSockets.has(userId)) {
    userSockets.set(userId, {
      sockets: new Set(),
      tenantId,
      role,
      email
    });
  }
  userSockets.get(userId).sockets.add(socketId);
  console.log(`[UserSocketManager] Registered socket ${socketId} for user ${userId} (Tenant: ${tenantId})`);
};

/**
 * Unregister a specific socket for a user
 */
exports.unregisterSocket = (userId, socketId) => {
  const userSession = userSockets.get(userId);
  if (userSession) {
    userSession.sockets.delete(socketId);
    console.log(`[UserSocketManager] Unregistered socket ${socketId} for user ${userId}`);
    if (userSession.sockets.size === 0) {
      userSockets.delete(userId);
      console.log(`[UserSocketManager] User ${userId} is now completely offline`);
      return true; // Completely offline
    }
  }
  return false; // Still has other active sockets
};

/**
 * Get all active sockets for a user
 */
exports.getSocketsForUser = (userId) => {
  const userSession = userSockets.get(userId);
  return userSession ? Array.from(userSession.sockets) : [];
};

/**
 * Get information for a specific user
 */
exports.getUserInfo = (userId) => {
  return userSockets.get(userId) || null;
};

/**
 * Check if a user is online
 */
exports.isUserOnline = (userId) => {
  return userSockets.has(userId) && userSockets.get(userId).sockets.size > 0;
};

/**
 * Get all online user IDs in a specific tenant
 */
exports.getOnlineUsersInTenant = (tenantId) => {
  const onlineUsers = [];
  for (const [userId, session] of userSockets.entries()) {
    if (session.tenantId === tenantId) {
      onlineUsers.push({
        userId,
        role: session.role,
        email: session.email
      });
    }
  }
  return onlineUsers;
};
