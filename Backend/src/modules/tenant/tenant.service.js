const prisma = require('../../config/db');

exports.getAllTenants = async () => {
  return await prisma.tenant.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTenant = async (data) => {
  return await prisma.tenant.create({
    data: {
      organization: data.organization || 'Unknown',
      owner: data.owner || null,
      totalUsers: data.totalUsers || '0',
      branchesCount: data.branchesCount || '0',
      plan: data.plan || 'Free',
      databaseSize: data.databaseSize || '0 GB',
      status: data.status || 'Active',
      createdDate: data.createdDate || new Date().toISOString()
    }
  });
};

exports.updateTenant = async (id, data) => {
  const existing = await prisma.tenant.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.tenant.update({
    where: { id },
    data: {
      organization: data.organization,
      owner: data.owner,
      totalUsers: data.totalUsers,
      branchesCount: data.branchesCount,
      plan: data.plan,
      databaseSize: data.databaseSize,
      status: data.status,
      createdDate: data.createdDate
    }
  });
};

exports.deleteTenant = async (id) => {
  const existing = await prisma.tenant.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.tenant.delete({
    where: { id }
  });
};
