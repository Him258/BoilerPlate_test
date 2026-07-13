const masterService = require('./master.service');
const { sendSuccess, sendError } = require('../../core/response');

const validateEntity = (entity) => {
const ALLOWED_MODELS = ['country', 'state', 'city', 'category', 'tag', 'unit', 'tax', 'status', 'department', 'team'];
  if (!ALLOWED_MODELS.includes(entity.toLowerCase())) {
    throw new Error('Invalid master data entity');
  }
  return entity.toLowerCase();
};

exports.getAll = async (req, res) => {
  try {
    const entity = validateEntity(req.params.entity);
    const data = await masterService.getAll(entity, req.user.tenantId);
    return sendSuccess(res, `${entity} retrieved successfully`, data);
  } catch (error) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' GET ALL ERROR: ' + error.stack + '\n');
    if (error.message === 'Invalid master data entity') return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    return sendError(res, `Failed to fetch ${req.params.entity}`, 'INTERNAL_ERROR', [], 500);
  }
};

exports.create = async (req, res) => {
  try {
    const entity = validateEntity(req.params.entity);
    const data = await masterService.create(entity, req.user.tenantId, req.body);
    return sendSuccess(res, `${entity} created successfully`, data, null, 201);
  } catch (error) {
    require('fs').appendFileSync('error.log', new Date().toISOString() + ' CREATE ERROR: ' + error.stack + '\n');
    if (error.message === 'Invalid master data entity') return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    return sendError(res, `Failed to create ${req.params.entity}`, 'INTERNAL_ERROR', [], 500);
  }
};

exports.update = async (req, res) => {
  try {
    const entity = validateEntity(req.params.entity);
    const { id } = req.params;
    const data = await masterService.update(entity, req.user.tenantId, id, req.body);
    return sendSuccess(res, `${entity} updated successfully`, data);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, `${req.params.entity} not found`, 'NOT_FOUND', [], 404);
    if (error.message === 'Invalid master data entity') return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    return sendError(res, `Failed to update ${req.params.entity}`, 'INTERNAL_ERROR', [], 500);
  }
};

exports.remove = async (req, res) => {
  try {
    const entity = validateEntity(req.params.entity);
    const { id } = req.params;
    await masterService.remove(entity, req.user.tenantId, id);
    return sendSuccess(res, `${entity} deleted successfully`);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, `${req.params.entity} not found`, 'NOT_FOUND', [], 404);
    if (error.message === 'Invalid master data entity') return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    return sendError(res, `Failed to delete ${req.params.entity}`, 'INTERNAL_ERROR', [], 500);
  }
};
