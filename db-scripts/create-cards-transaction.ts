import { PrismaClient } from '@prisma/client';
import { cardsArray } from '../json-scripts/cleaning-script'
const prisma = new PrismaClient();

const createCards = cardsArray.map((card) => {
  return prisma.card.create({
    data: {
      id: card.id,
      name: card.name,
      fullType: card.type,
      types: {
        connect: card.types.map(type => ({ id: type }))
      },
      subTypes: {
        connect: card.subtypes.map(subType => ({ id: subType }))
      },
      superTypes: {
        connect: card.supertypes.map(superType => ({ id: superType }))
      },
      power: card.power,
      toughness: card.toughness,
      manaCost: card.manaCost,
      manaValue: card.manaValue,
      colors: card.colors,
      colorIdentity: card.colorIdentity,
      formats: 0,
    }
  })
})

async function main() {
  await prisma.$transaction(createCards)
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