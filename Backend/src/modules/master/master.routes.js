const express = require('express');
const masterController = require('./master.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

// Generic Master Data endpoints
// e.g. GET /api/v1/master/country
router.get('/:entity', masterController.getAll);
router.post('/:entity', masterController.create);
router.put('/:entity/:id', masterController.update);
router.delete('/:entity/:id', masterController.remove);

module.exports = router;
