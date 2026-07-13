const express = require('express');
const domainController = require('./domain.controller');
const router = express.Router();

router.get('/', domainController.getDomains);
router.post('/', domainController.createDomain);
router.put('/:id', domainController.updateDomain);
router.delete('/:id', domainController.deleteDomain);

module.exports = router;
