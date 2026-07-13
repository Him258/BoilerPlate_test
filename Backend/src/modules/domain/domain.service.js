const prisma = require('../../config/db');

exports.getDomains = async () => {
  return await prisma.webhook.findMany({ orderBy: { createdAt: 'desc' } });
};

exports.createDomain = async (data) => {
  return await prisma.webhook.create({
    data: {
      tenantId: data.tenantId || null,
      endpointUrl: data.endpointUrl || '',
      events: data.events || null,
      environment: data.environment || null,
      provider: data.provider || null,
      sslStatus: data.sslStatus || 'Pending',
      status: data.status || 'Active',
    }
  });
};

exports.updateDomain = async (id, data) => {
  const existing = await prisma.webhook.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');
  return await prisma.webhook.update({
    where: { id },
    data: {
      tenantId: data.tenantId || null,
      endpointUrl: data.endpointUrl,
      provider: data.provider || null,
      sslStatus: data.sslStatus || 'Pending',
      status: data.status,
    }
  });
};

exports.deleteDomain = async (id) => {
  const existing = await prisma.webhook.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');
  return await prisma.webhook.delete({ where: { id } });
};
