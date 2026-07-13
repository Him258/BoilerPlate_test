const express = require('express');
const router = express.Router();
const smsTemplateController = require('./smsTemplate.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', smsTemplateController.getTemplates);
router.post('/', smsTemplateController.createTemplate);
router.put('/:id', smsTemplateController.updateTemplate);
router.delete('/:id', smsTemplateController.deleteTemplate);

module.exports = router;
