const organizationService = require('./organization.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAll = async (req, res) => {
  try {
    const data = await organizationService.getAll();
    return sendSuccess(res, 'Organizations retrieved successfully', data);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await organizationService.getById(req.params.id);
    if (!data) return sendError(res, 'Organization not found', 'NOT_FOUND', [], 404);
    return sendSuccess(res, 'Organization retrieved successfully', data);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.create = async (req, res) => {
  try {
    const data = await organizationService.create(req.body);
    return sendSuccess(res, 'Organization created successfully', data);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.update = async (req, res) => {
  try {
    const data = await organizationService.update(req.params.id, req.body);
    return sendSuccess(res, 'Organization updated successfully', data);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.delete = async (req, res) => {
  try {
    await organizationService.delete(req.params.id);
    return sendSuccess(res, 'Organization deleted successfully');
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};
