const express = require('express');
const router = express.Router();
const followupController = require('./followup.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', followupController.getAllFollowUps);
router.post('/', followupController.createFollowUp);
router.put('/:id', followupController.updateFollowUp);
router.delete('/:id', followupController.deleteFollowUp);

module.exports = router;
