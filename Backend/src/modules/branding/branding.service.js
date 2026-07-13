const prisma = require('../../config/db');

exports.getBrandings = async () => {
  return await prisma.branding.findMany({ orderBy: { createdAt: 'desc' } });
};

exports.createBranding = async (data) => {
  return await prisma.branding.create({
    data: {
      tenantId: data.tenantId || null,
      tenantName: data.tenantName || null,
      primaryColor: data.primaryColor || '#6366F1',
      font: data.font || 'Inter',
      logoUrl: data.logoUrl || null,
      customCss: data.customCss || null,
      status: data.status || 'Active',
    }
  });
};

exports.updateBranding = async (id, data) => {
  const existing = await prisma.branding.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');
  return await prisma.branding.update({
    where: { id },
    data: {
      tenantId: data.tenantId || null,
      tenantName: data.tenantName || null,
      primaryColor: data.primaryColor,
      font: data.font,
      logoUrl: data.logoUrl || null,
      customCss: data.customCss || null,
      status: data.status,
    }
  });
};

exports.deleteBranding = async (id) => {
  const existing = await prisma.branding.findUnique({ where: { id } });
  if (!existing) throw new Error('Not found');
  return await prisma.branding.delete({ where: { id } });
};
