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
    
    console.log('Attempting to create legacy project with projectType="hospital"...');
    const proj1 = await projectService.createProject({
      name: 'Test Legacy Hospital ' + Date.now(),
      tenantId: tenant.id,
      creatorId: user ? user.id : null,
      projectType: 'hospital'
    });
    console.log('Project 1 created successfully with modules!', proj1.id);

    console.log('Attempting to create modular project with modules=["doctors", "patients"]...');
    const proj2 = await projectService.createProject({
      name: 'Test Modular Clinic ' + Date.now(),
      tenantId: tenant.id,
      creatorId: user ? user.id : null,
      modules: ['doctors', 'patients']
    });
    console.log('Project 2 created successfully with modules!', proj2.id);

  } catch (error) {
    console.error('Project creation failed:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}
test();
