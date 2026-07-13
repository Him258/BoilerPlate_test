const followupService = require('./followup.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAllFollowUps = async (req, res) => {
  try {
    const followUps = await followupService.getAllFollowUps(req.user.tenantId);
    return sendSuccess(res, 'Follow-ups retrieved successfully', followUps);
  } catch (error) {
    return sendError(res, 'Failed to fetch follow-ups', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createFollowUp = async (req, res) => {
  try {
    const followUp = await followupService.createFollowUp(req.user.tenantId, req.body);
    return sendSuccess(res, 'Follow-up created successfully', followUp, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create follow-up', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const followUp = await followupService.updateFollowUp(req.user.tenantId, id, req.body);
    return sendSuccess(res, 'Follow-up updated successfully', followUp);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Follow-up not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update follow-up', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    await followupService.deleteFollowUp(req.user.tenantId, id);
    return sendSuccess(res, 'Follow-up deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Follow-up not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete follow-up', 'INTERNAL_ERROR', [], 500);
  }
};
