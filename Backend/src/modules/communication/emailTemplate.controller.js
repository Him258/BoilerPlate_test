const emailTemplateService = require('./emailTemplate.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getTemplates = async (req, res) => {
  try {
    const templates = await emailTemplateService.getTemplates(req.user.tenantId);
    return sendSuccess(res, 'Templates fetched', templates);
  } catch (error) {
    return sendError(res, 'Failed to fetch templates', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const template = await emailTemplateService.createTemplate(req.user.tenantId, req.body);
    return sendSuccess(res, 'Template created', template, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create template', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await emailTemplateService.updateTemplate(req.user.tenantId, id, req.body);
    return sendSuccess(res, 'Template updated', template);
  } catch (error) {
    return sendError(res, 'Failed to update template', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    await emailTemplateService.deleteTemplate(req.user.tenantId, id);
    return sendSuccess(res, 'Template deleted', null);
  } catch (error) {
    return sendError(res, 'Failed to delete template', 'INTERNAL_ERROR', [], 500);
  }
};
