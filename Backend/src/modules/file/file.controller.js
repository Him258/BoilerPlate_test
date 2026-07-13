const fileService = require('./file.service');
const { sendSuccess, sendError } = require('../../core/response');

exports.getFiles = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;
    const files = await fileService.getFiles(req.user.tenantId, parentId);
    return sendSuccess(res, 'Files fetched', files);
  } catch (error) {
    return sendError(res, 'Failed to fetch files', 'INTERNAL_ERROR', [], 500);
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No file provided', 'BAD_REQUEST', [], 400);
    }
    const parentId = req.body.parentId || null;
    const file = await fileService.createFile(req.user.tenantId, {
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
      parentId: parentId
    });
    return sendSuccess(res, 'File uploaded', file, null, 201);
  } catch (error) {
    console.error('Error uploading file:', error);
    return sendError(res, 'Failed to upload file', 'INTERNAL_ERROR', [], 500);
  }
};

exports.createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    if (!name) return sendError(res, 'Folder name required', 'BAD_REQUEST', [], 400);
    
    const folder = await fileService.createFolder(req.user.tenantId, name, parentId || null);
    return sendSuccess(res, 'Folder created', folder, null, 201);
  } catch (error) {
    return sendError(res, 'Failed to create folder', 'INTERNAL_ERROR', [], 500);
  }
};

exports.renameFile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return sendError(res, 'New name required', 'BAD_REQUEST', [], 400);
    
    const updated = await fileService.renameFile(req.user.tenantId, req.params.id, name);
    return sendSuccess(res, 'Renamed successfully', updated);
  } catch (error) {
    return sendError(res, 'Failed to rename', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteFile = async (req, res) => {
  try {
    await fileService.deleteFile(req.user.tenantId, req.params.id);
    return sendSuccess(res, 'File deleted', null);
  } catch (error) {
    return sendError(res, 'Failed to delete file', 'INTERNAL_ERROR', [], 500);
  }
};
