const userSocketManager = require('./userSocketManager');

module.exports = (io, socket) => {
  const { userId: senderId, tenantId } = socket.user;

  // 1. Handle typingStart event
  socket.on('typingStart', (data) => {
    try {
      const { receiverId } = data;
      if (!receiverId) return;

      // Security Check: Verify receiver is online and belongs to same tenant
      const receiverInfo = userSocketManager.getUserInfo(receiverId);
      if (receiverInfo && receiverInfo.tenantId === tenantId) {
        const receiverRoom = `user_${receiverId}`;
        socket.to(receiverRoom).emit('typingStart', {
          senderId
        });
        console.log(`[TypingSocket] User ${senderId} started typing to ${receiverId}`);
      }
    } catch (err) {
      console.error('[TypingSocket] Error on typingStart:', err.message);
    }
  });

  // 2. Handle typingStop event
  socket.on('typingStop', (data) => {
    try {
      const { receiverId } = data;
      if (!receiverId) return;

      // Security Check: Verify receiver is online and belongs to same tenant
      const receiverInfo = userSocketManager.getUserInfo(receiverId);
      if (receiverInfo && receiverInfo.tenantId === tenantId) {
        const receiverRoom = `user_${receiverId}`;
        socket.to(receiverRoom).emit('typingStop', {
          senderId
        });
        console.log(`[TypingSocket] User ${senderId} stopped typing to ${receiverId}`);
      }
    } catch (err) {
      console.error('[TypingSocket] Error on typingStop:', err.message);
    }
  });
};
