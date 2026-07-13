const prisma = require('../../config/db');

exports.getAllTasks = async (tenantId) => {
  return await prisma.task.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTask = async (tenantId, data) => {
  return await prisma.task.create({
    data: {
      tenantId,
      leadId: data.leadId || null,
      title: data.title,
      description: data.description || null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      assignedTo: data.assignedTo || null,
      priority: data.priority || 'Medium',
      status: data.status || 'Pending'
    }
  });
};

exports.updateTask = async (tenantId, id, data) => {
  const task = await prisma.task.findFirst({ where: { id, tenantId } });
  if (!task) throw new Error('Not found');

  return await prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      assignedTo: data.assignedTo,
      priority: data.priority,
      status: data.status
    }
  });
};

exports.deleteTask = async (tenantId, id) => {
  const task = await prisma.task.findFirst({ where: { id, tenantId } });
  if (!task) throw new Error('Not found');

  return await prisma.task.delete({
    where: { id }
  });
};
