const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const modules = ['Dashboard', 'CRM', 'Billing', 'Users', 'Roles', 'Master Data', 'Reports', 'Settings'];
const actions = ['read', 'write', 'delete'];

async function main() {
  console.log('Seeding Permissions...');
  for (const resource of modules) {
    for (const action of actions) {
      // Upsert permission
      await prisma.permission.upsert({
        where: {
          resource_action: {
            resource,
            action,
          }
        },
        update: {},
        create: {
          resource,
          action,
        }
      });
    }
  }
  
  console.log('Permissions seeded.');

  // Create default Super Admin role if it doesn't exist
  let superAdmin = await prisma.role.findFirst({
    where: { name: 'Super Admin', isSystem: true }
  });

  if (!superAdmin) {
    console.log('Creating Super Admin role...');
    superAdmin = await prisma.role.create({
      data: {
        name: 'Super Admin',
        description: 'Full access to all system features and settings.',
        isSystem: true
      }
    });
  }

  // Assign all permissions to Super Admin
  const allPermissions = await prisma.permission.findMany();
  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdmin.id,
          permissionId: perm.id
        }
      },
      update: {},
      create: {
        roleId: superAdmin.id,
        permissionId: perm.id
      }
    });
  }
  console.log('Super Admin permissions synced.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
