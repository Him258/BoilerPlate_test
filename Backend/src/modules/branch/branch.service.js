const prisma = require('../../config/db');

exports.getAllBranches = async (tenantId) => {
  return await prisma.branch.findMany({
    where: tenantId ? { tenantId } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};

exports.createBranch = async (data) => {
  // If tenantId is missing, fetch a dummy one for now since it's required
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

  return await prisma.branch.create({
    data: {
      tenantId: tenantId,
      branchName: data.branchName,
      organization: data.organization,
      manager: data.manager,
      employees: data.employees,
      city: data.city,
      status: data.status || 'Active'
    }
  });
};

exports.updateBranch = async (id, data) => {
  const existing = await prisma.branch.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.branch.update({
    where: { id },
    data: {
      branchName: data.branchName,
      organization: data.organization,
      manager: data.manager,
      employees: data.employees,
      city: data.city,
      status: data.status
    }
  });
};

exports.deleteBranch = async (id) => {
  const existing = await prisma.branch.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.branch.delete({
    where: { id }
  });
};
