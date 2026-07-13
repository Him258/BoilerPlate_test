const roleService = require('./role.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getRoles = async (req, res) => {
  try {
    const tenantId = req.user ? req.user.tenantId : req.query.tenantId;
    const roles = await roleService.getRoles(tenantId);
    return sendSuccess(res, 'Roles retrieved successfully', roles);
  } catch (error) {
    return sendError(res, 'Failed to fetch roles', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createRole = async (req, res) => {
  try {
    const tenantId = req.user ? req.user.tenantId : req.body.tenantId;
    const role = await roleService.createRole({ ...req.body, tenantId });
    return sendSuccess(res, 'Role created successfully', role, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create role', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.updateRole(id, req.body);
    return sendSuccess(res, 'Role updated successfully', role);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Role not found', 'NOT_FOUND', [], 404);
    if (error.message === 'Cannot edit system roles') return sendError(res, 'Cannot edit system roles', 'FORBIDDEN', [], 403);
    return sendError(res, 'Failed to update role', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await roleService.deleteRole(id);
    return sendSuccess(res, 'Role deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Role not found', 'NOT_FOUND', [], 404);
    if (error.message === 'Cannot delete system roles') return sendError(res, 'Cannot delete system roles', 'FORBIDDEN', [], 403);
    return sendError(res, 'Failed to delete role', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;
    const role = await roleService.updatePermissions(id, permissions);
    return sendSuccess(res, 'Permissions updated successfully', role);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Role not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update permissions', 'INTERNAL_ERROR', [], 500);
  }
};
