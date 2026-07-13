const prisma = require('../../config/db');

exports.getProviders = async (tenantId) => {
  return await prisma.aIProvider.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createProvider = async (tenantId, data) => {
  return await prisma.aIProvider.create({
    data: {
      tenantId,
      name: data.name,
      description: data.description,
      status: data.status || 'Active',
      tokens: data.tokens || "0",
      logo: data.logo || "bg-indigo-500",
    }
  });
};

exports.updateProvider = async (tenantId, id, data) => {
  const provider = await prisma.aIProvider.findFirst({ where: { id, tenantId } });
  if (!provider) throw new Error('Provider not found');

  return await prisma.aIProvider.update({
    where: { id },
    data
  });
};

exports.deleteProvider = async (tenantId, id) => {
  const provider = await prisma.aIProvider.findFirst({ where: { id, tenantId } });
  if (!provider) throw new Error('Provider not found');

  return await prisma.aIProvider.delete({
    where: { id }
  });
};
