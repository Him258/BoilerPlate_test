const prisma = require('../../config/db');

exports.getTemplates = async (tenantId) => {
  return await prisma.smsTemplate.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTemplate = async (tenantId, data) => {
  return await prisma.smsTemplate.create({
    data: {
      ...data,
      tenantId
    }
  });
};

exports.updateTemplate = async (tenantId, id, data) => {
  return await prisma.smsTemplate.update({
    where: { id, tenantId },
    data
  });
};

exports.deleteTemplate = async (tenantId, id) => {
  return await prisma.smsTemplate.delete({
    where: { id, tenantId }
  });
};
