import { PrismaClient } from '@prisma/client';
import { Card } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  // Prisma does not support bitwise operations, according to their docs.
  // So we write a raw SQL query to perform the necessary operation.
  // This grabs all Blue cards!
//  const reds = await prisma.$queryRaw<Card[]>`SELECT * FROM "Card" WHERE ((colors >> 2) & 1 = 1)`
//   reds.forEach(red => {
//     console.log(red.name, red.colors)
//   })

// We can do full text searches on the name of a card!
// Return every card that matches the PostgreSQL search of "god OR planeswalker"
  const result = await prisma.card.findMany({
    where: {
      AND: [
        {
          name: {
            search: 'swamp',
          },
        },
        {
          fullType: {
            contains: 'Basic Land',
          },
        },
      ],
    },
  })
  console.log(result)
  
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

