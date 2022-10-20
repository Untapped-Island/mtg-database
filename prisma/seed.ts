import { PrismaClient } from "@prisma/client";
import EnumValues from '../json/EnumValues.json';
import { cardsArray } from '../json-scripts/cleaning-script'
const prisma = new PrismaClient();

// Create arrays of types with id properties
const mapTypes = EnumValues.data.card.types.map(type => {
  return {id: type}
})

const mapSubtypes = EnumValues.data.card.subtypes.map(subtype => {
  return {id: subtype}
})

const mapSupertypes = EnumValues.data.card.supertypes.map(supertype => {
  return {id: supertype}
})

// Main function where our seed will run.
// Combined from the create-types and create-cards scripts.

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