const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding more users...');
  
  // Find tenant
  const tenant = await prisma.tenant.findFirst({ where: { domain: 'hq.kiaan.core' }});
  
  if (!tenant) {
    console.log("No tenant found!");
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create sales user
  await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'sales@kiaan.com' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'sales@kiaan.com',
      passwordHash,
      firstName: 'Sales',
      lastName: 'Agent'
    }
  });

  // Create support user
  await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'support@kiaan.com' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'support@kiaan.com',
      passwordHash,
      firstName: 'Support',
      lastName: 'Staff'
    }
  });

  console.log('Seeding finished. Added sales and support users.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
