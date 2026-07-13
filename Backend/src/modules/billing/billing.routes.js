const express = require('express');
const router = express.Router();
const billingController = require('./billing.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/overview', billingController.getOverview);
router.get('/plans', billingController.getPlans);
router.get('/invoices', billingController.getInvoices);
router.get('/transactions', billingController.getTransactions);
router.get('/usage', billingController.getUsageLimits);

router.get('/coupons', billingController.getCoupons);
router.post('/coupons', billingController.createCoupon);
router.put('/coupons/:id', billingController.updateCoupon);
router.delete('/coupons/:id', billingController.deleteCoupon);

module.exports = router;
