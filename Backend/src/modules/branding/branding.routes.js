const express = require('express');
const brandingController = require('./branding.controller');
const router = express.Router();

router.get('/', brandingController.getBrandings);
router.post('/', brandingController.createBranding);
router.put('/:id', brandingController.updateBranding);
router.delete('/:id', brandingController.deleteBranding);

module.exports = router;
