const prisma = require('../../config/db');

exports.getTemplates = async (tenantId) => {
  return await prisma.whatsappTemplate.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTemplate = async (tenantId, data) => {
  return await prisma.whatsappTemplate.create({
    data: {
      ...data,
      tenantId
    }
  });
};

exports.updateTemplate = async (tenantId, id, data) => {
  return await prisma.whatsappTemplate.update({
    where: { id, tenantId },
    data
  });
};

exports.deleteTemplate = async (tenantId, id) => {
  return await prisma.whatsappTemplate.delete({
    where: { id, tenantId }
  });
};
