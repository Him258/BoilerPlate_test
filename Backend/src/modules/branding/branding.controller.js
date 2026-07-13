const brandingService = require('./branding.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getBrandings = async (req, res) => {
  try {
    const brandings = await brandingService.getBrandings();
    return sendSuccess(res, 'Brandings retrieved successfully', brandings);
  } catch (error) {
    return sendError(res, 'Failed to fetch brandings', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createBranding = async (req, res) => {
  try {
    const branding = await brandingService.createBranding(req.body);
    return sendSuccess(res, 'Branding created successfully', branding, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create branding', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateBranding = async (req, res) => {
  try {
    const { id } = req.params;
    const branding = await brandingService.updateBranding(id, req.body);
    return sendSuccess(res, 'Branding updated successfully', branding);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Branding not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update branding', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteBranding = async (req, res) => {
  try {
    const { id } = req.params;
    await brandingService.deleteBranding(id);
    return sendSuccess(res, 'Branding deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Branding not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete branding', 'INTERNAL_ERROR', [], 500);
  }
};
