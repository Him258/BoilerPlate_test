const prisma = require('../../config/db');

exports.getUsers = async (tenantId) => {
  return await prisma.user.findMany({
    where: tenantId ? { tenantId } : undefined,
    orderBy: { createdAt: 'desc' }
  });
};

exports.createUser = async (data) => {
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

  const existingUser = await prisma.user.findFirst({
    where: {
      tenantId: tenantId,
      email: data.email
    }
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Handle organization resolution
  let resolvedOrganization = data.organization || "Default Tenant";
  if (data.organization && data.organization.length > 0) {
    let tenant = await prisma.tenant.findFirst({ where: { organization: data.organization } });
    if (!tenant) {
      tenant = await prisma.tenant.create({ data: { organization: data.organization } });
    }
    tenantId = tenant.id;
    resolvedOrganization = tenant.organization;
  }

  return await prisma.user.create({
    data: {
      tenantId: tenantId,
      name: data.name || 'Unknown User',
      email: data.email,
      role: data.role || 'Staff',
      organization: resolvedOrganization,
      status: data.status || 'Active',
      lastLogin: data.lastLogin || 'Never'
    }
  });
};

exports.updateUser = async (id, data) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  let tenantId = existing.tenantId;
  let resolvedOrganization = data.organization || existing.organization;
  if (data.organization && data.organization !== existing.organization) {
    let tenant = await prisma.tenant.findFirst({ where: { organization: data.organization } });
    if (!tenant) {
      tenant = await prisma.tenant.create({ data: { organization: data.organization } });
    }
    tenantId = tenant.id;
    resolvedOrganization = tenant.organization;
  }

  return await prisma.user.update({
    where: { id },
    data: {
      tenantId: tenantId,
      name: data.name,
      email: data.email,
      role: data.role,
      organization: resolvedOrganization,
      status: data.status,
      lastLogin: data.lastLogin
    }
  });
};

exports.deleteUser = async (id) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');

  return await prisma.user.delete({
    where: { id }
  });
};
