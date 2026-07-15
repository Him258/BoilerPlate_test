const prisma = require('../../config/db');

exports.getPermissions = async () => {
  const permissions = await prisma.permission.findMany({
    orderBy: { createdAt: 'desc' },
    include: { rolePermissions: true }
  });
  return permissions.map(p => ({
    ...p,
    roleId: p.rolePermissions.length > 0 ? p.rolePermissions[0].roleId : null
  }));
};

exports.createPermission = async (data) => {
  const permission = await prisma.permission.create({
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

  if (data.roleId) {
    await prisma.rolePermission.create({
      data: {
        roleId: data.roleId,
        permissionId: permission.id
      }
    });
  }

  return { ...permission, roleId: data.roleId || null };
};

exports.updatePermission = async (id, data) => {
  const existing = await prisma.permission.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  const updated = await prisma.permission.update({
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

  if (data.roleId) {
    // Delete existing and map to new roleId
    await prisma.rolePermission.deleteMany({ where: { permissionId: id } });
    await prisma.rolePermission.create({
      data: {
        roleId: data.roleId,
        permissionId: id
      }
    });
  }

  return { ...updated, roleId: data.roleId || null };
};

exports.deletePermission = async (id) => {
  const existing = await prisma.permission.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.permission.delete({
    where: { id }
  });
};
