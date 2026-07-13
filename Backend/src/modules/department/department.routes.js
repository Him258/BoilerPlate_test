const express = require('express');
const departmentController = require('./department.controller');

const router = express.Router();

router.get('/', departmentController.getAll);
router.post('/', departmentController.create);
router.put('/:id', departmentController.update);
router.delete('/:id', departmentController.delete);

module.exports = router;
