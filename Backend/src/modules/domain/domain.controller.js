const domainService = require('./domain.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getDomains = async (req, res) => {
  try {
    const domains = await domainService.getDomains();
    return sendSuccess(res, 'Domains retrieved successfully', domains);
  } catch (error) {
    return sendError(res, 'Failed to fetch domains', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createDomain = async (req, res) => {
  try {
    const domain = await domainService.createDomain(req.body);
    return sendSuccess(res, 'Domain created successfully', domain, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create domain', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateDomain = async (req, res) => {
  try {
    const { id } = req.params;
    const domain = await domainService.updateDomain(id, req.body);
    return sendSuccess(res, 'Domain updated successfully', domain);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Domain not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update domain', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteDomain = async (req, res) => {
  try {
    const { id } = req.params;
    await domainService.deleteDomain(id);
    return sendSuccess(res, 'Domain deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Domain not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete domain', 'INTERNAL_ERROR', [], 500);
  }
};
