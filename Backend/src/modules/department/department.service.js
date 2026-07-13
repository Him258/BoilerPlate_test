const prisma = require('../../config/db');

exports.getAllDepartments = async (tenantId) => {
  return await prisma.department.findMany({
    where: tenantId ? { tenantId } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};

exports.createDepartment = async (data) => {
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

  return await prisma.department.create({
    data: {
      tenantId: tenantId,
      departmentName: data.departmentName,
      organization: data.organization,
      headOfDepartment: data.headOfDepartment,
      employees: data.employees,
      budget: data.budget,
      status: data.status || 'Active'
    }
  });
};

exports.updateDepartment = async (id, data) => {
  const existing = await prisma.department.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.department.update({
    where: { id },
    data: {
      departmentName: data.departmentName,
      organization: data.organization,
      headOfDepartment: data.headOfDepartment,
      employees: data.employees,
      budget: data.budget,
      status: data.status
    }
  });
};

exports.deleteDepartment = async (id) => {
  const existing = await prisma.department.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.department.delete({
    where: { id }
  });
};
