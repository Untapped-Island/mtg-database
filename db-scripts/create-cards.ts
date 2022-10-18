import { PrismaClient } from '@prisma/client';
import { cardsArray } from './clean-script'
const prisma = new PrismaClient();

async function main() {
  await Promise.all(cardsArray.map(async (card, i) => {
    await prisma.card.create({
      data: {
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
        keywords: {
          connect: card.keywords.map(keyword => ({ id: keyword }))
        },
        sets: {
          connect: card.sets.map(set => ({ id: set }))
        },
        power: card.power,
        toughness: card.toughness,
        manaCost: card.manaCost,
        manaValue: card.manaValue,
        colors: card.colors,
        colorIdentities: card.colorIdentities,
        formats: card.formats,
      }
    })
  }))
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