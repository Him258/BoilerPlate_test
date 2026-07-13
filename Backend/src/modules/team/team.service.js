const prisma = require('../../config/db');

exports.getAllTeams = async (tenantId) => {
  return await prisma.team.findMany({
    where: tenantId ? { tenantId } : undefined,
    include: { department: true },
    orderBy: { createdAt: 'desc' }
  });
};

exports.createTeam = async (data) => {
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

  let resolvedDepartmentId = null;
  if (data.departmentId) {
    let dept = await prisma.department.findFirst({ where: { departmentName: data.departmentId } });
    if (!dept) {
      dept = await prisma.department.create({
        data: { tenantId, departmentName: data.departmentId }
      });
    }
    resolvedDepartmentId = dept.id;
  }

  return await prisma.team.create({
    data: {
      tenantId: tenantId,
      teamName: data.teamName,
      departmentId: resolvedDepartmentId,
      lead: data.lead,
      members: data.members,
      velocity: data.velocity,
      status: data.status || 'Active'
    }
  });
};

exports.updateTeam = async (id, data) => {
  const existing = await prisma.team.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  let resolvedDepartmentId = data.departmentId;
  if (data.departmentId && !data.departmentId.includes('-')) {
    let dept = await prisma.department.findFirst({ where: { departmentName: data.departmentId } });
    if (!dept) {
      dept = await prisma.department.create({
        data: { tenantId: existing.tenantId, departmentName: data.departmentId }
      });
    }
    resolvedDepartmentId = dept.id;
  }

  return await prisma.team.update({
    where: { id },
    data: {
      teamName: data.teamName,
      departmentId: resolvedDepartmentId,
      lead: data.lead,
      members: data.members,
      velocity: data.velocity,
      status: data.status
    }
  });
};

exports.deleteTeam = async (id) => {
  const existing = await prisma.team.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.team.delete({
    where: { id }
  });
};
