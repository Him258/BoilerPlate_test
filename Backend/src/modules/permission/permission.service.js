const prisma = require('../../config/db');

exports.getPermissions = async () => {
  return await prisma.permission.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

exports.createPermission = async (data) => {
  return await prisma.permission.create({
    data: {
      module: data.module || 'Unknown',
      canView: data.canView || '❌',
      canCreate: data.canCreate || '❌',
      canUpdate: data.canUpdate || '❌',
      canDelete: data.canDelete || '❌',
      canImport: data.canImport || '❌',
      canExport: data.canExport || '❌',
      canApprove: data.canApprove || '❌'
    }
  });
};

exports.updatePermission = async (id, data) => {
  const existing = await prisma.permission.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.permission.update({
    where: { id },
    data: {
      module: data.module,
      canView: data.canView,
      canCreate: data.canCreate,
      canUpdate: data.canUpdate,
      canDelete: data.canDelete,
      canImport: data.canImport,
      canExport: data.canExport,
      canApprove: data.canApprove
    }
  });
};

exports.deletePermission = async (id) => {
  const existing = await prisma.permission.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.permission.delete({
    where: { id }
  });
};
