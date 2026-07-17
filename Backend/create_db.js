const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'mysql://root:@localhost:3306/mysql'
    }
  }
});

async function main() {
  await prisma.$executeRawUnsafe('CREATE DATABASE IF NOT EXISTS `boilerplate`;');
  console.log("Database 'boilerplate' successfully created!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
