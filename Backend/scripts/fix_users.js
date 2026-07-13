const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const roles = await prisma.role.findMany();
    const superAdminRole = roles.find(r => r.name === 'Super Admin');

    if (superAdminRole) {
      await prisma.user.updateMany({
        where: { email: 'admin@kiaan.com' },
        data: { roleId: superAdminRole.id, department: 'Engineering', team: 'Frontend Devs' }
      });
    }

    await prisma.user.updateMany({
      where: { email: 'sales@kiaan.com' },
      data: { department: 'Sales', team: 'Inbound Sales' }
    });

    await prisma.user.updateMany({
      where: { email: 'support@kiaan.com' },
      data: { department: 'Support', team: 'Tier 1 Support' }
    });

    console.log('Users updated successfully with real data!');
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
