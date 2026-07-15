const userSocketManager = require('./userSocketManager');
const prisma = require('../config/db');

module.exports = (io, socket) => {
  const { userId, tenantId, role, email } = socket.user;

  // 1. Join tenant, role, and user-specific rooms
  const tenantRoom = `hospital_${tenantId}`;
  const roleRoom = role ? `role_${role}` : null;
  const userRoom = `user_${userId}`;

  socket.join(tenantRoom);
  console.log(`[Presence] Socket ${socket.id} joined room: ${tenantRoom}`);

  if (roleRoom) {
    socket.join(roleRoom);
    console.log(`[Presence] Socket ${socket.id} joined room: ${roleRoom}`);
  }

  socket.join(userRoom);
  console.log(`[Presence] Socket ${socket.id} joined room: ${userRoom}`);

  // 2. Check if user is already online before registering this socket
  const wasOnline = userSocketManager.isUserOnline(userId);

  // Register socket
  userSocketManager.registerSocket(userId, socket.id, tenantId, role, email);

  // If user just transitioned from offline to online, broadcast userOnline
  if (!wasOnline) {
    console.log(`[Presence] User ${userId} is now Online. Broadcasting to room: ${tenantRoom}`);
    socket.to(tenantRoom).emit('userOnline', {
      userId,
      email,
      role,
      online: true
    });
  }

  // 3. Handle disconnect
  socket.on('disconnect', async () => {
    console.log(`[Presence] Socket ${socket.id} disconnected`);
    
    // Unregister socket and check if user is completely offline
    const isCompletelyOffline = userSocketManager.unregisterSocket(userId, socket.id);

    if (isCompletelyOffline) {
      const lastSeenTime = new Date().toISOString();
      console.log(`[Presence] User ${userId} is now Offline. Broadcasting to room: ${tenantRoom}`);

      // Save Last Seen to Control Plane Database
      try {
        await prisma.user.update({
          where: { id: userId },
          data: { lastLogin: lastSeenTime }
        });
        console.log(`[Presence] Successfully saved last seen time for user ${userId} to database`);
      } catch (err) {
        console.error(`[Presence] Failed to save last seen time for user ${userId}:`, err.message);
      }

      // Broadcast userOffline
      io.to(tenantRoom).emit('userOffline', {
        userId,
        lastSeen: lastSeenTime,
        online: false
      });
    }
  });
};
