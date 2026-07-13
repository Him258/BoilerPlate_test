const express = require('express');
const router = express.Router();
const chatController = require('./chat.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/users', chatController.getChatUsers);
router.get('/messages/:userId', chatController.getMessages);

module.exports = router;
