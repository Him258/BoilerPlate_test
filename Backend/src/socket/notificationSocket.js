const prisma = require('../config/db');

module.exports = (io, socket) => {
  const { userId, tenantId } = socket.user;

  // Join the notification room for the tenant
  const tenantNotificationRoom = `notifications_${tenantId}`;
  socket.join(tenantNotificationRoom);
  console.log(`[NotificationSocket] User ${userId} joined room: ${tenantNotificationRoom}`);

  // 1. Fetch all notifications for the tenant on request
  socket.on('notification:get', async () => {
    try {
      const logs = await prisma.notificationLog.findMany({
        where: {
          tenantId,
          OR: [
            { recipient: userId },
            { recipient: 'all' },
            { recipient: null }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });

      const notifications = logs.map(log => ({
        id: log.id,
        title: log.subject || 'Notification',
        message: log.provider || '',
        type: log.channel || 'General',
        read: log.status === 'read',
        time: log.sentAt || new Date(log.createdAt).toLocaleTimeString()
      }));

      socket.emit('notification:list', notifications);
    } catch (err) {
      console.error('[NotificationSocket] Failed to fetch notifications:', err.message);
    }
  });

  // 2. Mark notification as read
  socket.on('notification:read', async (data) => {
    try {
      const { id } = data;
      if (id === 'all') {
        await prisma.notificationLog.updateMany({
          where: {
            tenantId,
            OR: [
              { recipient: userId },
              { recipient: 'all' },
              { recipient: null }
            ]
          },
          data: { status: 'read' }
        });
        io.to(tenantNotificationRoom).emit('notification:read', { id: 'all' });
      } else {
        await prisma.notificationLog.update({
          where: { id },
          data: { status: 'read' }
        });
        io.to(tenantNotificationRoom).emit('notification:read', { id });
      }
    } catch (err) {
      console.error('[NotificationSocket] Failed to mark read:', err.message);
    }
  });

  // 3. Delete notification
  socket.on('notification:delete', async (data) => {
    try {
      const { id } = data;
      await prisma.notificationLog.delete({
        where: { id }
      });
      io.to(tenantNotificationRoom).emit('notification:delete', { id });
    } catch (err) {
      console.error('[NotificationSocket] Failed to delete notification:', err.message);
    }
  });
};

/**
 * Creates and broadcasts a new notification log
 */
module.exports.sendNotification = async (io, tenantId, recipient, title, message, type) => {
  try {
    const log = await prisma.notificationLog.create({
      data: {
        tenantId,
        recipient: recipient || 'all',
        subject: title,
        provider: message,
        channel: type || 'General',
        status: 'unread',
        sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });

    const payload = {
      id: log.id,
      title: log.subject,
      message: log.provider,
      type: log.channel,
      read: false,
      time: log.sentAt
    };

    const tenantNotificationRoom = `notifications_${tenantId}`;
    io.to(tenantNotificationRoom).emit('notification:new', payload);
    console.log(`[Notification] Sent notification: "${title}" to room ${tenantNotificationRoom}`);
  } catch (err) {
    console.error('[Notification] Broadcast failed:', err.message);
  }
};
