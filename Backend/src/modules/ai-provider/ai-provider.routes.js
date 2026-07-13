const express = require('express');
const router = express.Router();
const aiProviderController = require('./ai-provider.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', aiProviderController.getProviders);
router.post('/', aiProviderController.createProvider);
router.put('/:id', aiProviderController.updateProvider);
router.delete('/:id', aiProviderController.deleteProvider);

module.exports = router;
