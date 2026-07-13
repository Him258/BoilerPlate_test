const prisma = require('../../config/db');

// Global models that don't use tenantId
const GLOBAL_MODELS = ['country', 'state', 'city'];

exports.getAll = async (entity, tenantId) => {
  const isGlobal = GLOBAL_MODELS.includes(entity);
  const where = isGlobal ? {} : { tenantId };
  
  return await prisma[entity].findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
};

exports.create = async (entity, tenantId, data) => {
  const isGlobal = GLOBAL_MODELS.includes(entity);
  const createData = isGlobal ? { ...data } : { ...data, tenantId };
  
  // Remove id if it was sent from frontend (to let DB auto-generate)
  if (createData.id) delete createData.id;
  
  if (entity === 'department' && createData.employees !== undefined) createData.employees = parseInt(createData.employees, 10) || 0;
  if (entity === 'team' && createData.members !== undefined) createData.members = parseInt(createData.members, 10) || 0;
  if (entity === 'category' && createData.items !== undefined) createData.items = parseInt(createData.items, 10) || 0;
  
  return await prisma[entity].create({
    data: createData
  });
};

exports.update = async (entity, tenantId, id, data) => {
  const isGlobal = GLOBAL_MODELS.includes(entity);
  const where = isGlobal ? { id } : { id, tenantId };
  
  const existing = await prisma[entity].findFirst({ where });
  if (!existing) throw new Error('Not found');

  // Remove id and tenantId from update payload
  const updateData = { ...data };
  if (updateData.id) delete updateData.id;
  if (updateData.tenantId) delete updateData.tenantId;

  if (entity === 'department' && updateData.employees !== undefined) updateData.employees = parseInt(updateData.employees, 10) || 0;
  if (entity === 'team' && updateData.members !== undefined) updateData.members = parseInt(updateData.members, 10) || 0;
  if (entity === 'category' && updateData.items !== undefined) updateData.items = parseInt(updateData.items, 10) || 0;

  return await prisma[entity].update({
    where: { id },
    data: updateData
  });
};

exports.remove = async (entity, tenantId, id) => {
  const isGlobal = GLOBAL_MODELS.includes(entity);
  const where = isGlobal ? { id } : { id, tenantId };
  
  const existing = await prisma[entity].findFirst({ where });
  if (!existing) throw new Error('Not found');

  return await prisma[entity].delete({
    where: { id }
  });
};
