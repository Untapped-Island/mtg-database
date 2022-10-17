import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.color.createMany({
    data: [
      { id: 'B', full: 'Black' },
      { id: 'R', full: 'Red' },
      { id: 'G', full: 'Green' },
      { id: 'W', full: 'White' },
      { id: 'U', full: 'Blue' },
    ],
  })

  const allColors = await prisma.color.findMany();
  console.dir(allColors, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })