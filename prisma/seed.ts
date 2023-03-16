import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const free = await prisma.plan.upsert({
    where: {
      name: 'Free',
    },
    update: {},
    create: {
      name: 'Free',
      description: 'Our free plan to try the tool',
      price: 0,
      currency: 'EUR',
      frequency: 'monthly',
    },
  });
  const startup = await prisma.plan.upsert({
    where: {
      name: 'Startup',
    },
    update: {},
    create: {
      name: 'Startup',
      description: 'Ideal for companies with up to 100 users',
      price: 99,
      currency: 'EUR',
      frequency: 'monthly',
    },
  });
  const enterprise = await prisma.plan.upsert({
    where: {
      name: 'Enterprise',
    },
    update: {},
    create: {
      name: 'Enterprise',
      description: 'For larger companies',
      price: 199,
      currency: 'EUR',
      frequency: 'monthly',
    },
  });
  console.log({ free, startup, enterprise });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
