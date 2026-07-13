const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create default tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Kiaan Core HQ',
      domain: 'hq.kiaan.core'
    }
  });

  // Hash password
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create admin user
  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@kiaan.com',
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin'
    }
  });

  console.log('Seeding finished. Added user: admin@kiaan.com / password123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
