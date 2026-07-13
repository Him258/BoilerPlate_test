const prisma = require('../../config/db');

exports.getFiles = async (tenantId, parentId) => {
  return await prisma.file.findMany({
    where: { 
      tenantId,
      parentId: parentId 
    },
    orderBy: [
      { isFolder: 'desc' },
      { createdAt: 'desc' }
    ]
  });
};

exports.createFile = async (tenantId, data) => {
  return await prisma.file.create({
    data: {
      tenantId,
      name: data.name,
      url: data.url,
      mimetype: data.mimetype,
      size: data.size,
      parentId: data.parentId,
      isFolder: false
    }
  });
};

exports.createFolder = async (tenantId, name, parentId) => {
  return await prisma.file.create({
    data: {
      tenantId,
      name,
      mimetype: 'folder',
      size: 0,
      isFolder: true,
      parentId
    }
  });
};

exports.renameFile = async (tenantId, id, newName) => {
  const file = await prisma.file.findFirst({ where: { id, tenantId }});
  if (!file) throw new Error("File not found");

  return await prisma.file.update({
    where: { id },
    data: { name: newName }
  });
};

exports.deleteFile = async (tenantId, id) => {
  const file = await prisma.file.findFirst({ where: { id, tenantId }});
  if (!file) throw new Error("File not found");

  return await prisma.file.delete({
    where: { id }
  });
};
