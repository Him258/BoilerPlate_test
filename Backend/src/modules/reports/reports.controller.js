const reportsService = require('./reports.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAnalytics = async (req, res) => {
  try {
    const data = await reportsService.getAnalytics(req.user.tenantId, req.user.role);
    return sendSuccess(res, 'Analytics fetched successfully', data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return sendError(res, 'Failed to fetch analytics', 'INTERNAL_ERROR', [], 500);
  }
};
