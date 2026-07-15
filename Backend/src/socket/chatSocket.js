const chatService = require('../modules/communication/chat.service');
const userSocketManager = require('./userSocketManager');
const prisma = require('../config/db');

module.exports = (io, socket) => {
  const { userId: senderId, tenantId } = socket.user;

  // 1. Handle sendMessage event
  socket.on('sendMessage', async (data, callback) => {
    try {
      const { receiverId, content, message } = data;
      const actualContent = content || message;

      // Validation
      if (!receiverId || !actualContent || typeof actualContent !== 'string' || actualContent.trim().length === 0) {
        console.warn(`[ChatSocket] Invalid sendMessage payload from user ${senderId}`);
        if (callback) callback({ success: false, error: 'Invalid payload' });
        return;
      }

      console.log("Message Received");

      // Security Check: Verify receiver belongs to the same tenant
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId }
      });

      if (!receiver || receiver.tenantId !== tenantId) {
        console.warn(`[ChatSocket] Security Alert: User ${senderId} attempted to message user ${receiverId} in tenant ${receiver?.tenantId} (Expected: ${tenantId})`);
        if (callback) callback({ success: false, error: 'Access denied: Users must belong to the same tenant' });
        return;
      }

      // Save Message to DB using the existing Chat Service
      const savedMessage = await chatService.saveMessage(tenantId, senderId, receiverId, actualContent.trim());
      console.log("Message Saved");

      // Check if receiver is online
      const receiverSockets = userSocketManager.getSocketsForUser(receiverId);
      const isOnline = receiverSockets.length > 0;

      let finalMessage = savedMessage;

      if (isOnline) {
        // If receiver is online, update status to "delivered"
        finalMessage = await prisma.message.update({
          where: { id: savedMessage.id },
          data: { status: 'delivered' }
        });
        console.log("Receiver Found");
        console.log("Message Delivered");
      } else {
        console.log("Receiver Offline");
      }

      const messagePayload = {
        senderId: finalMessage.senderId,
        receiverId: finalMessage.receiverId,
        message: finalMessage.content,
        messageId: finalMessage.id,
        timestamp: finalMessage.createdAt
      };

      // Deliver to receiver user room
      const receiverRoom = `user_${receiverId}`;
      io.to(receiverRoom).emit('receiveMessage', messagePayload);

      // Deliver to other active sockets of the sender (to keep multi-device in sync)
      const senderRoom = `user_${senderId}`;
      socket.to(senderRoom).emit('receiveMessage', messagePayload);

      // Emit messageSent back to sender
      socket.emit('messageSent', messagePayload);

      // If online, broadcast delivered receipt immediately
      if (isOnline) {
        io.to(senderRoom).emit('messageDelivered', {
          messageId: finalMessage.id,
          receiverId,
          status: 'delivered'
        });
      }

      // Acknowledge sending socket
      if (callback) {
        callback({
          success: true,
          message: finalMessage
        });
      }
    } catch (error) {
      console.error('[ChatSocket] Failed to process sendMessage:', error.message);
      if (callback) callback({ success: false, error: 'Internal server error' });
    }
  });

  // 2. Handle messageRead event
  socket.on('messageRead', async (data, callback) => {
    try {
      const { messageId, senderId: msgSenderId } = data;
      const currentUserId = senderId; // The user who is reading the message

      let updatedCount = 0;
      let targetSenderId = msgSenderId;

      if (messageId) {
        // Mark a specific message as read
        const message = await prisma.message.findUnique({
          where: { id: messageId }
        });

        if (message && message.receiverId === currentUserId && message.tenantId === tenantId) {
          targetSenderId = message.senderId;
          await prisma.message.update({
            where: { id: messageId },
            data: { status: 'read', isRead: true }
          });
          updatedCount = 1;

          // Notify the original sender
          const senderRoom = `user_${targetSenderId}`;
          io.to(senderRoom).emit('messageRead', {
            messageId,
            receiverId: currentUserId,
            status: 'read'
          });
          console.log(`[ChatSocket] Message ${messageId} marked as read by receiver ${currentUserId}`);
        }
      } else if (targetSenderId) {
        // Mark all messages from a specific sender to this user as read
        const result = await prisma.message.updateMany({
          where: {
            senderId: targetSenderId,
            receiverId: currentUserId,
            tenantId,
            status: { not: 'read' }
          },
          data: { status: 'read', isRead: true }
        });

        updatedCount = result.count;

        if (updatedCount > 0) {
          // Notify the original sender that all their messages are read
          const senderRoom = `user_${targetSenderId}`;
          io.to(senderRoom).emit('messageRead', {
            senderId: targetSenderId,
            receiverId: currentUserId,
            status: 'read',
            allRead: true
          });
          console.log(`[ChatSocket] All messages from ${targetSenderId} marked as read by ${currentUserId}`);
        }
      }

      if (callback) callback({ success: true, count: updatedCount });
    } catch (error) {
      console.error('[ChatSocket] Failed to process messageRead:', error.message);
      if (callback) callback({ success: false, error: 'Internal server error' });
    }
  });
};
