const aiProviderService = require('./ai-provider.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getProviders = async (req, res) => {
  try {
    const providers = await aiProviderService.getProviders(req.user.tenantId);
    return sendSuccess(res, 'Providers fetched successfully', providers);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.createProvider = async (req, res) => {
  try {
    const { name, description, status, logo } = req.body;
    if (!name) return sendError(res, 'Name is required', 'BAD_REQUEST', [], 400);

    const provider = await aiProviderService.createProvider(req.user.tenantId, { name, description, status, logo });
    return sendSuccess(res, 'Provider created successfully', provider, null, 201);
  } catch (error) {
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await aiProviderService.updateProvider(req.user.tenantId, req.params.id, req.body);
    return sendSuccess(res, 'Provider updated successfully', provider);
  } catch (error) {
    if (error.message === 'Provider not found') {
      return sendError(res, error.message, 'NOT_FOUND', [], 404);
    }
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    await aiProviderService.deleteProvider(req.user.tenantId, req.params.id);
    return sendSuccess(res, 'Provider deleted successfully');
  } catch (error) {
    if (error.message === 'Provider not found') {
      return sendError(res, error.message, 'NOT_FOUND', [], 404);
    }
    return sendError(res, error.message, 'INTERNAL_ERROR', [], 500);
  }
};
