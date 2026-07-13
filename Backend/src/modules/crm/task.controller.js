const taskService = require('./task.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.tenantId);
    return sendSuccess(res, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    return sendError(res, 'Failed to fetch tasks', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await taskService.createTask(req.user.tenantId, taskData);
    return sendSuccess(res, 'Task created successfully', task, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create task', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = req.body;
    const task = await taskService.updateTask(req.user.tenantId, id, taskData);
    return sendSuccess(res, 'Task updated successfully', task);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Task not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update task', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(req.user.tenantId, id);
    return sendSuccess(res, 'Task deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Task not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete task', 'INTERNAL_ERROR', [], 500);
  }
};
