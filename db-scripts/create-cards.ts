import { PrismaClient } from '@prisma/client';
import { cardsArray } from '../json-scripts/cleaning-script'
const prisma = new PrismaClient();

async function main() {
  for (let card of cardsArray) {
    const data = {
      id: card.id,
      name: card.name,
      fullType: card.type,
      types: {
        connect: card.types.map((type: string) => ({ id: type }))
      },
      subTypes: {
        connect: card.subtypes.map((subType: string) => ({ id: subType }))
      },
      superTypes: {
        connect: card.supertypes.map((superType: string) => ({ id: superType }))
      },
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