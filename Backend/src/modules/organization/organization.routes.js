const express = require('express');
const organizationController = require('./organization.controller');

const router = express.Router();

router.get('/', organizationController.getAll);
router.get('/:id', organizationController.getById);
router.post('/', organizationController.create);
router.put('/:id', organizationController.update);
router.delete('/:id', organizationController.delete);

module.exports = router;
