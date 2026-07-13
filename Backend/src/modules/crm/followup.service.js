const prisma = require('../../config/db');

exports.getAllFollowUps = async (tenantId) => {
  return await prisma.followUp.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createFollowUp = async (tenantId, data) => {
  return await prisma.followUp.create({
    data: {
      tenantId,
      title: data.title,
      leadName: data.leadName,
      company: data.company,
      date: new Date(data.date),
      type: data.type || 'Call',
      status: data.status || 'Pending',
      owner: data.owner
    }
  });
};

exports.updateFollowUp = async (tenantId, id, data) => {
  const followUp = await prisma.followUp.findFirst({ where: { id, tenantId } });
  if (!followUp) throw new Error('Not found');

  return await prisma.followUp.update({
    where: { id },
    data: {
      title: data.title,
      leadName: data.leadName,
      company: data.company,
      date: data.date ? new Date(data.date) : undefined,
      type: data.type,
      status: data.status,
      owner: data.owner
    }
  });
};

exports.deleteFollowUp = async (tenantId, id) => {
  const followUp = await prisma.followUp.findFirst({ where: { id, tenantId } });
  if (!followUp) throw new Error('Not found');

  return await prisma.followUp.delete({
    where: { id }
  });
};
