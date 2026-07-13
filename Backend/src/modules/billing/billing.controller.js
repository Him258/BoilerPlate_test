const billingService = require('./billing.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getOverview = async (req, res) => {
  try {
    const overview = await billingService.getOverview(req.user.tenantId);
    return sendSuccess(res, 'Overview fetched', overview);
  } catch (error) {
    return sendError(res, 'Failed to fetch overview', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await billingService.getPlans();
    return sendSuccess(res, 'Plans fetched', plans);
  } catch (error) {
    return sendError(res, 'Failed to fetch plans', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await billingService.getInvoices(req.user.tenantId);
    return sendSuccess(res, 'Invoices fetched', invoices);
  } catch (error) {
    return sendError(res, 'Failed to fetch invoices', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await billingService.getTransactions(req.user.tenantId);
    return sendSuccess(res, 'Transactions fetched', transactions);
  } catch (error) {
    return sendError(res, 'Failed to fetch transactions', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await billingService.getCoupons(req.user.tenantId);
    return sendSuccess(res, 'Coupons fetched', coupons);
  } catch (error) {
    return sendError(res, 'Failed to fetch coupons', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await billingService.createCoupon(req.user.tenantId, req.body);
    return sendSuccess(res, 'Coupon created', coupon, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create coupon', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await billingService.updateCoupon(req.user.tenantId, id, req.body);
    return sendSuccess(res, 'Coupon updated', coupon);
  } catch (error) {
    return sendError(res, 'Failed to update coupon', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await billingService.deleteCoupon(req.user.tenantId, id);
    return sendSuccess(res, 'Coupon deleted', null);
  } catch (error) {
    return sendError(res, 'Failed to delete coupon', 'INTERNAL_ERROR', [], 500);
  }
};

exports.getUsageLimits = async (req, res) => {
  try {
    const usage = await billingService.getUsageLimits(req.user.tenantId);
    return sendSuccess(res, 'Usage limits fetched', usage);
  } catch (error) {
    return sendError(res, 'Failed to fetch usage limits', 'INTERNAL_ERROR', [], 500);
  }
};
