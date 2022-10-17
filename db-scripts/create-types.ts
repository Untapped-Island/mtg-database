import { PrismaClient } from '@prisma/client';
import EnumValues from '../json/EnumValues.json';
const prisma = new PrismaClient();

const mapTypes = EnumValues.card.types.map(type => {
  return {id: type}
})

const mapSubtypes = EnumValues.card.subtypes.map(subtype => {
  return {id: subtype}
})

const mapSupertypes = EnumValues.card.supertypes.map(supertype => {
  return {id: supertype}
})

// console.log(mapTypes)

async function main() {
  await prisma.type.createMany({
    data: mapTypes
  })

  await prisma.subType.createMany({
    data: mapSubtypes
  })

  await prisma.superType.createMany({
    data: mapSupertypes
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