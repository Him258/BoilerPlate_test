const prisma = require('../../config/db');

exports.getAllLeads = async (tenantId) => {
  return await prisma.lead.findMany({
    where: { tenantId, deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createLead = async (tenantId, data) => {
  return await prisma.lead.create({
    data: {
      tenantId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      companyName: data.company || data.companyName,
      source: data.source,
      owner: data.owner,
      dealAmount: data.dealAmount ? parseFloat(data.dealAmount) : null,
      status: data.status ? data.status.toUpperCase() : 'NEW'
    }
  });
};

exports.updateLead = async (tenantId, id, data) => {
  const lead = await prisma.lead.findFirst({ where: { id, tenantId } });
  if (!lead) throw new Error('Not found');

  return await prisma.lead.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      companyName: data.company || data.companyName,
      source: data.source,
      owner: data.owner,
      dealAmount: data.dealAmount !== undefined ? (data.dealAmount ? parseFloat(data.dealAmount) : null) : undefined,
      status: data.status ? data.status.toUpperCase() : undefined
    }
  });
};

exports.deleteLead = async (tenantId, id) => {
  const lead = await prisma.lead.findFirst({ where: { id, tenantId } });
  if (!lead) throw new Error('Not found');

  return await prisma.lead.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};
