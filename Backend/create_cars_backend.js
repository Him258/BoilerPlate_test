const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const schemaService = require('./src/modules/project/schema.service');

async function run() {
  try {
    const project = await prisma.project.findFirst({
      where: { refId: 'pro-d5835bd5' }
    });
    if (!project) throw new Error("No project found with refId pro-d5835bd5");
    
    const bookingsColumns = [
      { name: 'carId', type: 'VARCHAR(255)', required: true },
      { name: 'userId', type: 'VARCHAR(255)', required: false },
      { name: 'status', type: 'VARCHAR(50)', required: true },
      { name: 'totalAmount', type: 'DECIMAL(10,2)', required: true },
      { name: 'pickupDate', type: 'DATETIME', required: true },
      { name: 'returnDate', type: 'DATETIME', required: true }
    ];
    
    await schemaService.createTable(project, 'bookings', bookingsColumns).catch(e => {
      if (!e.message.includes('already exists')) throw e;
    });
    console.log("Created bookings table");

    const favoritesColumns = [
      { name: 'carId', type: 'VARCHAR(255)', required: true },
      { name: 'userId', type: 'VARCHAR(255)', required: false }
    ];
    
    await schemaService.createTable(project, 'favorites', favoritesColumns).catch(e => {
      if (!e.message.includes('already exists')) throw e;
    });
    console.log("Created favorites table");
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log('Cars table already exists.');
    } else {
      console.error(err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

run();
