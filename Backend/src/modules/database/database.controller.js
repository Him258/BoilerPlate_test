const prisma = require('../../config/db');
const schemaService = require('../project/schema.service');
const dataService = require('../project/data.service');
const { sendSuccess, sendError } = require('../../core/response');

/**
 * Helper to write a developer/client audit log entry in Control Plane database
 */
const logDeveloperAudit = async (tenantId, action, actor, resource, ipAddress) => {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId: tenantId || null,
        action,
        actor,
        resource,
        ipAddress,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('[DatabaseController:logDeveloperAudit] Failed to log developer action:', err);
  }
};

exports.createTable = async (req, res) => {
  const startTime = Date.now();
  try {
    const { name, columns } = req.body;
    const project = req.project; // Resolved from apikey/Authorization token

    if (!name) {
      return sendError(res, 'Table name is required', 'VALIDATION_ERROR', [], 400);
    }

    await schemaService.createTable(project, name, columns);

    // Audit Logging
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const actor = req.user ? (req.user.email || req.user.userId || req.user.sub) : 'Client User';
    await logDeveloperAudit(
      project.tenantId,
      'CREATE_TABLE',
      actor,
      `Project: ${project.id}, Table: ${name}`,
      ipAddress
    );

    console.log(`[DatabaseController.createTable] Completed in ${Date.now() - startTime}ms`);
    return sendSuccess(res, 'Table created successfully', null, null, 201);
  } catch (error) {
    console.error('[DatabaseController.createTable] Error:', error);

    if (error.message.includes('Invalid database identifier') ||
        error.message.includes('restricted') ||
        error.message.includes('Unsupported database type') ||
        error.message.includes('already exists')) {
      return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    }

    return sendError(res, error.message || 'Failed to create table', 'INTERNAL_ERROR', [], 500);
  }
};

exports.insertRecord = async (req, res) => {
  const startTime = Date.now();
  try {
    const { table: tableName } = req.params;
    const project = req.project;

    if (!tableName) {
      return sendError(res, 'Table name is required', 'VALIDATION_ERROR', [], 400);
    }

    const record = await dataService.insertRecord(project, tableName, req.body);

    // Trigger realtime notification trigger on socket
    try {
      const socketServer = require('../../socket/socketServer');
      const notificationSocket = require('../../socket/notificationSocket');
      const io = socketServer.getIO();
      if (io) {
        let title = 'New Entry Created';
        let message = `A new record has been added to ${tableName}.`;
        let type = 'General';

        if (tableName === 'patients') {
          title = 'New Patient Registered';
          message = `${record.name || record.firstName || 'A new patient'} was successfully registered.`;
          type = 'Patient';
        } else if (tableName === 'appointments') {
          title = 'Appointment Booked';
          message = `A new appointment for ${record.patientName || 'Patient'} has been scheduled.`;
          type = 'Appointment';
        } else if (tableName === 'prescriptions') {
          title = 'New Prescription';
          message = `A new prescription has been issued.`;
          type = 'Prescription';
        } else if (tableName === 'lab_results' || tableName === 'labs') {
          title = 'Lab Report Ready';
          message = `A new lab report is available.`;
          type = 'Lab';
        } else if (tableName === 'billing' || tableName === 'invoices') {
          title = 'Billing Issued';
          message = `Invoice generated for $${record.amount || '0'}.`;
          type = 'Billing';
        } else if (tableName === 'emergency') {
          title = 'EMERGENCY ALERT';
          message = `Emergency incident reported!`;
          type = 'Emergency';
        }

        await notificationSocket.sendNotification(io, project.tenantId, 'all', title, message, type);
      }
    } catch (err) {
      console.warn('[DatabaseController] Failed to send socket notification:', err.message);
    }

    // Audit Logging
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const actor = req.user ? (req.user.email || req.user.userId || req.user.sub) : 'Client User';
    await logDeveloperAudit(
      project.tenantId,
      'INSERT',
      actor,
      `Project: ${project.id}, Table: ${tableName}, Record ID: ${record.id}`,
      ipAddress
    );

    console.log(`[DatabaseController.insertRecord] Completed in ${Date.now() - startTime}ms`);
    return sendSuccess(res, 'Record inserted successfully', record, null, 201);
  } catch (error) {
    console.error('[DatabaseController.insertRecord] Error:', error);

    if (error.message.includes('Invalid database identifier') ||
        error.message.includes('does not exist') ||
        error.message.includes('restricted')) {
      return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    }

    return sendError(res, error.message || 'Failed to insert record', 'INTERNAL_ERROR', [], 500);
  }
};

exports.listRecords = async (req, res) => {
  const startTime = Date.now();
  try {
    const { table: tableName } = req.params;
    const { page, limit, offset, sort, order, search, select, count } = req.query;
    const project = req.project;

    if (!tableName) {
      return sendError(res, 'Table name is required', 'VALIDATION_ERROR', [], 400);
    }

    // Extract dynamic filters (any query parameters not reserved)
    const reservedKeys = ['page', 'limit', 'offset', 'sort', 'order', 'search', 'select', 'count'];
    const filters = {};
    for (const [key, value] of Object.entries(req.query)) {
      if (!reservedKeys.includes(key)) {
        filters[key] = value;
      }
    }

    const result = await dataService.listRecords(project, tableName, {
      page,
      limit,
      offset,
      sort,
      order,
      search,
      select,
      count,
      filters
    });

    console.log(`[DatabaseController.listRecords] Completed in ${Date.now() - startTime}ms`);
    const meta = result.total !== null ? { total: result.total } : null;
    return sendSuccess(res, 'Records retrieved successfully', result.records, meta);
  } catch (error) {
    console.error('[DatabaseController.listRecords] Error:', error);

    if (error.message.includes('Invalid database identifier') ||
        error.message.includes('does not exist') ||
        error.message.includes('restricted')) {
      return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    }

    return sendError(res, error.message || 'Failed to list records', 'INTERNAL_ERROR', [], 500);
  }
};

exports.updateRecord = async (req, res) => {
  const startTime = Date.now();
  try {
    const { table: tableName, id } = req.params;
    const project = req.project;

    if (!tableName || !id) {
      return sendError(res, 'Table name and record ID are required', 'VALIDATION_ERROR', [], 400);
    }

    const record = await dataService.updateRecord(project, tableName, id, req.body);

    // Audit Logging
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const actor = req.user ? (req.user.email || req.user.userId || req.user.sub) : 'Client User';
    await logDeveloperAudit(
      project.tenantId,
      'UPDATE',
      actor,
      `Project: ${project.id}, Table: ${tableName}, Record ID: ${id}`,
      ipAddress
    );

    console.log(`[DatabaseController.updateRecord] Completed in ${Date.now() - startTime}ms`);
    return sendSuccess(res, 'Record updated successfully', record);
  } catch (error) {
    console.error('[DatabaseController.updateRecord] Error:', error);

    if (error.message.includes('not found')) {
      return sendError(res, error.message, 'NOT_FOUND', [], 404);
    }

    if (error.message.includes('Invalid database identifier') ||
        error.message.includes('does not exist') ||
        error.message.includes('restricted')) {
      return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    }

    return sendError(res, error.message || 'Failed to update record', 'INTERNAL_ERROR', [], 500);
  }
};

exports.deleteRecord = async (req, res) => {
  const startTime = Date.now();
  try {
    const { table: tableName, id } = req.params;
    const project = req.project;

    if (!tableName || !id) {
      return sendError(res, 'Table name and record ID are required', 'VALIDATION_ERROR', [], 400);
    }

    const record = await dataService.deleteRecord(project, tableName, id);

    // Audit Logging
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const actor = req.user ? (req.user.email || req.user.userId || req.user.sub) : 'Client User';
    await logDeveloperAudit(
      project.tenantId,
      'DELETE',
      actor,
      `Project: ${project.id}, Table: ${tableName}, Record ID: ${id}`,
      ipAddress
    );

    console.log(`[DatabaseController.deleteRecord] Completed in ${Date.now() - startTime}ms`);
    return sendSuccess(res, 'Record deleted successfully', record);
  } catch (error) {
    console.error('[DatabaseController.deleteRecord] Error:', error);

    if (error.message.includes('not found')) {
      return sendError(res, error.message, 'NOT_FOUND', [], 404);
    }

    if (error.message.includes('Invalid database identifier') ||
        error.message.includes('restricted')) {
      return sendError(res, error.message, 'VALIDATION_ERROR', [], 400);
    }

    return sendError(res, error.message || 'Failed to delete record', 'INTERNAL_ERROR', [], 500);
  }
};
