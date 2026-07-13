const express = require('express');
const teamController = require('./team.controller');

const router = express.Router();

router.get('/', teamController.getAll);
router.post('/', teamController.create);
router.put('/:id', teamController.update);
router.delete('/:id', teamController.delete);

module.exports = router;
