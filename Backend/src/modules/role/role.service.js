const prisma = require('../../config/db');

exports.getRoles = async (tenantId) => {
  return await prisma.role.findMany({
    where: tenantId ? { tenantId } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};

exports.createRole = async (data) => {
  let tenantId = data.tenantId;
  if (!tenantId) {
    let dummyTenant = await prisma.tenant.findFirst();
    if (!dummyTenant) {
      dummyTenant = await prisma.tenant.create({
        data: { organization: "Default Tenant" }
      });
    }
    tenantId = dummyTenant.id;
  }

  return await prisma.role.create({
    data: {
      tenantId: tenantId,
      roleName: data.roleName || 'New Role',
      type: data.type || 'Custom',
      totalUsers: data.totalUsers || '0',
      permissionsGranted: data.permissionsGranted || 'None',
      createdBy: data.createdBy || 'System',
      status: data.status || 'Active'
    }
  });
};

exports.updateRole = async (id, data) => {
  const existing = await prisma.role.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.role.update({
    where: { id },
    data: {
      roleName: data.roleName,
      type: data.type,
      totalUsers: data.totalUsers,
      permissionsGranted: data.permissionsGranted,
      createdBy: data.createdBy,
      status: data.status
    }
  });
};

exports.deleteRole = async (id) => {
  const existing = await prisma.role.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.role.delete({
    where: { id }
  });
};
