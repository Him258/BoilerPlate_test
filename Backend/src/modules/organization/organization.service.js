const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async () => {
  return await prisma.subsidiaryOrganization.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tenant: true
    }
  });
};

exports.getById = async (id) => {
  return await prisma.subsidiaryOrganization.findUnique({
    where: { id },
    include: {
      tenant: true
    }
  });
};

exports.create = async (data) => {
  return await prisma.subsidiaryOrganization.create({
    data
  });
};

exports.update = async (id, data) => {
  return await prisma.subsidiaryOrganization.update({
    where: { id },
    data
  });
};

exports.delete = async (id) => {
  return await prisma.subsidiaryOrganization.delete({
    where: { id }
  });
};
