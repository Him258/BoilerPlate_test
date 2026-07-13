const leadService = require('./lead.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await leadService.getAllLeads(req.user.tenantId);
    return sendSuccess(res, 'Leads retrieved successfully', leads);
  } catch (error) {
    return sendError(res, 'Failed to fetch leads', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createLead = async (req, res) => {
  try {
    const leadData = req.body;
    const lead = await leadService.createLead(req.user.tenantId, leadData);
    return sendSuccess(res, 'Lead created successfully', lead, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create lead', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const leadData = req.body;
    const lead = await leadService.updateLead(req.user.tenantId, id, leadData);
    return sendSuccess(res, 'Lead updated successfully', lead);
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Lead not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to update lead', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await leadService.deleteLead(req.user.tenantId, id);
    return sendSuccess(res, 'Lead deleted successfully');
  } catch (error) {
    if (error.message === 'Not found') return sendError(res, 'Lead not found', 'NOT_FOUND', [], 404);
    return sendError(res, 'Failed to delete lead', 'INTERNAL_ERROR', [], 500);
  }
};
