import { PrismaClient } from '@prisma/client';
import { cardsArray } from '../json-scripts/cleaning-script'
const prisma = new PrismaClient();

// We call this function when running the script.
async function main() {
  for (let card of cardsArray) {
    const data = {
      id: card.id,
      name: card.name,
      fullType: card.type,
      Type: {
        connect: card.types.map((type: string) => ({ id: type }))
      },
      SubType: {
        connect: card.subtypes.map((subType: string) => ({ id: subType }))
      },
      SuperType: {
        connect: card.supertypes.map((superType: string) => ({ id: superType }))
      },
      // keywords: {
      //   connect: card.keywords.map((keyword: string) => ({ id: keyword }))
      // },
      // sets: {
      //   connect: card.sets.map((set: string) => ({ id: set }))
      // },
      power: card.power,
      toughness: card.toughness,
      manaCost: card.manaCost,
      manaValue: card.manaValue,
      colors: card.colors,
      colorIdentity: card.colorIdentity,
      formats: 0,
    };

    await prisma.card.upsert({
      where: { id: card.id },
      update: data,
      create: data,
    })
    console.log(card.name)
  }
  // await prisma.$transaction([
  //   prisma.card.createMany({ data: createCards }),

  // ])
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