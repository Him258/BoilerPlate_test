const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const projectService = require('./src/modules/project/project.service');

async function test() {
  try {
    const tenant = await prisma.tenant.findFirst();
    if (!tenant) {
      console.log('No tenants found in the DB. Did restore fail?');
      return;
    }
    const user = await prisma.user.findFirst({ where: { tenantId: tenant.id }});
    console.log('Found Tenant:', tenant.id);
    console.log('Found User:', user ? user.id : 'No user');

    console.log('Attempting to create project...');
    const proj = await projectService.createProject({
      name: 'Test Project ' + Date.now(),
      tenantId: tenant.id,
      creatorId: user ? user.id : null
    });
    console.log('Project created successfully!', proj.id);
  } catch (error) {
    console.error('Project creation failed:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}
test();
