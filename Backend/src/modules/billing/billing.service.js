const prisma = require('../../config/db');

// --- OVERVIEW ---
exports.getOverview = async (tenantId) => {
  // Calculate Current MRR by looking at active subscriptions
  const subscription = await prisma.subscription.findFirst({
    where: { tenantId, status: 'ACTIVE' },
    include: { plan: true }
  });

  const currentMRR = subscription ? parseFloat(subscription.plan.price) : 0;
  
  // Total Active Subscriptions could be active users or similar, here we mock it as 1 for the tenant
  const activeSubscriptions = subscription ? 1 : 0;

  return {
    mrr: currentMRR,
    activeSubscriptions
  };
};

// --- PLANS ---
exports.getPlans = async () => {
  return await prisma.plan.findMany({
    orderBy: { price: 'asc' }
  });
};

// --- INVOICES ---
exports.getInvoices = async (tenantId) => {
  return await prisma.invoice.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    include: { plan: true }
  });
};

// --- TRANSACTIONS ---
exports.getTransactions = async (tenantId) => {
  return await prisma.transaction.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    include: { invoice: true }
  });
};

// --- COUPONS ---
exports.getCoupons = async (tenantId) => {
  return await prisma.coupon.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createCoupon = async (tenantId, data) => {
  return await prisma.coupon.create({
    data: { ...data, tenantId }
  });
};

exports.updateCoupon = async (tenantId, id, data) => {
  return await prisma.coupon.update({
    where: { id, tenantId },
    data
  });
};

exports.deleteCoupon = async (tenantId, id) => {
  return await prisma.coupon.delete({
    where: { id, tenantId }
  });
};

// --- USAGE LIMITS ---
exports.getUsageLimits = async (tenantId) => {
  return await prisma.usageMetric.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  });
};
