const express = require('express');
const permissionController = require('./permission.controller');

const router = express.Router();

router.get('/', permissionController.getPermissions);
router.post('/', permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
