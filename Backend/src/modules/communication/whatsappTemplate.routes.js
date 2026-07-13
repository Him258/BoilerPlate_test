const express = require('express');
const router = express.Router();
const whatsappTemplateController = require('./whatsappTemplate.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', whatsappTemplateController.getTemplates);
router.post('/', whatsappTemplateController.createTemplate);
router.put('/:id', whatsappTemplateController.updateTemplate);
router.delete('/:id', whatsappTemplateController.deleteTemplate);

module.exports = router;
