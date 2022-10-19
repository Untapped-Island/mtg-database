import { PrismaClient } from '@prisma/client';
import EnumValues from '../json/EnumValues.json';
const prisma = new PrismaClient();

const sets = EnumValues.data.card.watermark.map(watermark => {
  if (watermark.includes('set (')) {
    return { id: watermark.substring(5, 8) }
  }
})

async function main() {
  await prisma.type.createMany({
    data: sets
  })
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