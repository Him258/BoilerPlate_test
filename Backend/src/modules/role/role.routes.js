const express = require('express');
const roleController = require('./role.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.put('/:id/permissions', roleController.updatePermissions);

module.exports = router;
