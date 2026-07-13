const prisma = require('../../config/db');

exports.getTemplates = async (tenantId) => {
  return await prisma.emailTemplate.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTemplate = async (tenantId, data) => {
  return await prisma.emailTemplate.create({
    data: {
      ...data,
      tenantId
    }
  });
};

exports.updateTemplate = async (tenantId, id, data) => {
  return await prisma.emailTemplate.update({
    where: { id, tenantId },
    data
  });
};

exports.deleteTemplate = async (tenantId, id) => {
  return await prisma.emailTemplate.delete({
    where: { id, tenantId }
  });
};
