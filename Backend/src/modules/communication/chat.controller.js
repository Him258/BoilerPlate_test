const chatService = require('./chat.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getChatUsers = async (req, res) => {
  try {
    const users = await chatService.getChatUsers(req.user.tenantId, req.user.userId);
    return sendSuccess(res, 'Chat users fetched', users);
  } catch (error) {
    return sendError(res, 'Failed to fetch users', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await chatService.getMessages(req.user.tenantId, req.user.userId, userId);
    return sendSuccess(res, 'Messages fetched', messages);
  } catch (error) {
    return sendError(res, 'Failed to fetch messages', 'INTERNAL_ERROR', [], 500);
  }
};
