const prisma = require('../../config/db');

exports.getChatUsers = async (tenantId, currentUserId) => {
  // Fetch all active users in the same tenant, except the current user
  return await prisma.user.findMany({
    where: {
      tenantId,
      status: { in: ['ACTIVE', 'Active', 'active'] },
      id: { not: currentUserId }
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      department: true
    }
  });
};

exports.getMessages = async (tenantId, user1Id, user2Id) => {
  return await prisma.message.findMany({
    where: {
      tenantId,
      OR: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });
};

exports.saveMessage = async (tenantId, senderId, receiverId, content) => {
  return await prisma.message.create({
    data: {
      tenantId,
      senderId,
      receiverId,
      content,
      isRead: false
    }
  });
};
