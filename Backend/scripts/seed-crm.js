const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CRM data...');

  // Get the first tenant
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) {
    console.log('No tenant found. Please run main seed script first.');
    return;
  }

  // Check if leads exist
  const existingLeads = await prisma.lead.count({ where: { tenantId: tenant.id } });
  if (existingLeads === 0) {
    console.log('Creating sample leads...');
    
    const lead1 = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1 555-0100',
        companyName: 'TechFlow Inc.',
        source: 'Website',
        owner: 'Alice Freeman',
        dealAmount: 12500.00,
        status: 'NEW'
      }
    });

    const lead2 = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: 'Michael Chen',
        email: 'mchen@globalcorp.com',
        phone: '+1 555-0231',
        companyName: 'Global Corp',
        source: 'Referral',
        owner: 'Bob Smith',
        dealAmount: 8500.00,
        status: 'CONTACTED'
      }
    });

    const lead3 = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: 'Emma Williams',
        email: 'emma.w@startupsynergy.com',
        phone: '+1 555-0899',
        companyName: 'Startup Synergy',
        source: 'Event',
        owner: 'Alice Freeman',
        dealAmount: 25000.00,
        status: 'QUALIFIED'
      }
    });

    console.log('Creating sample tasks...');
    await prisma.task.createMany({
      data: [
        {
          tenantId: tenant.id,
          leadId: lead1.id,
          title: 'Initial Discovery Call',
          description: 'Call Sarah to understand TechFlow needs.',
          dueDate: new Date(Date.now() + 86400000), // Tomorrow
          assignedTo: 'Alice Freeman',
          priority: 'High',
          status: 'Pending'
        },
        {
          tenantId: tenant.id,
          leadId: lead2.id,
          title: 'Send Proposal',
          description: 'Draft and send initial proposal to Michael.',
          dueDate: new Date(Date.now() + 172800000), // Day after tomorrow
          assignedTo: 'Bob Smith',
          priority: 'Medium',
          status: 'In Progress'
        }
      ]
    });
    
    console.log('CRM Data Seeding completed!');
  } else {
    console.log('Leads already exist, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
