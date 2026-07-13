const express = require('express');
const router = express.Router();
const emailTemplateController = require('./emailTemplate.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', emailTemplateController.getTemplates);
router.post('/', emailTemplateController.createTemplate);
router.put('/:id', emailTemplateController.updateTemplate);
router.delete('/:id', emailTemplateController.deleteTemplate);

module.exports = router;
