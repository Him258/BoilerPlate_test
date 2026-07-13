const express = require('express');
const branchController = require('./branch.controller');

const router = express.Router();

router.get('/', branchController.getAll);
router.post('/', branchController.create);
router.put('/:id', branchController.update);
router.delete('/:id', branchController.delete);

module.exports = router;
