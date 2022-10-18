import { PrismaClient } from '@prisma/client';
import EnumValues from '../json/EnumValues.json';
const prisma = new PrismaClient();

const abilityWords = EnumValues.keywords.abilityWords.map(keyword => {
  return { id: keyword }
})

const keywordAbilities = EnumValues.keywords.keywordAbilities.map(keyword => {
  return { id: keyword }
})

const keywordActions = EnumValues.keywords.keywordActions.map(keyword => {
  return { id: keyword }
})

const keywords = [...abilityWords, ...keywordAbilities, ...keywordActions]

async function main() {
  await prisma.type.createMany({
    data: keywords
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