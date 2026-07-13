const userService = require('./user.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getUsers = async (req, res) => {
  try {
    const tenantId = req.user ? req.user.tenantId : req.query.tenantId;
    const users = await userService.getUsers(tenantId);
    return sendSuccess(res, 'Users retrieved successfully', users);
  } catch (error) {
    return sendError(res, 'Failed to fetch users', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createUser = async (req, res) => {
  try {
    const tenantId = req.user ? req.user.tenantId : req.body.tenantId;
    const user = await userService.createUser({ ...req.body, tenantId });
    return sendSuccess(res, 'User created successfully', user, null, 201);
  } catch (error) {
    if (error.message === 'Email already exists') return sendError(res, error.message, 'CONFLICT', [], 409);
    return sendError(res, 'Failed to create user', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    return sendSuccess(res, 'User updated successfully', user);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'User not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update user', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return sendSuccess(res, 'User deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'User not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete user', 'INTERNAL_ERROR', [], 500);
  }
};
