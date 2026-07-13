const tenantService = require('./tenant.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantService.getAllTenants();
    return sendSuccess(res, 'Tenants retrieved successfully', tenants);
  } catch (error) {
    return sendError(res, 'Failed to fetch tenants', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createTenant = async (req, res) => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    return sendSuccess(res, 'Tenant created successfully', tenant, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create tenant', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await tenantService.updateTenant(id, req.body);
    return sendSuccess(res, 'Tenant updated successfully', tenant);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Tenant not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update tenant', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;
    await tenantService.deleteTenant(id);
    return sendSuccess(res, 'Tenant deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Tenant not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete tenant', 'INTERNAL_ERROR', [], 500);
  }
};
