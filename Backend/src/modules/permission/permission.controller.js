const permissionService = require('./permission.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.getPermissions();
    return sendSuccess(res, 'Permissions retrieved successfully', permissions);
  } catch (error) {
    return sendError(res, 'Failed to fetch permissions', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createPermission = async (req, res) => {
  try {
    const permission = await permissionService.createPermission(req.body);
    return sendSuccess(res, 'Permission created successfully', permission, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create permission', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await permissionService.updatePermission(id, req.body);
    return sendSuccess(res, 'Permission updated successfully', permission);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Permission not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update permission', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    await permissionService.deletePermission(id);
    return sendSuccess(res, 'Permission deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Permission not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete permission', 'INTERNAL_ERROR', [], 500);
  }
};
