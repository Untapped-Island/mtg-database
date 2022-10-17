import { PrismaClient } from '@prisma/client';
// import simplifiedCards from '../json/simplified-cards.json';
import simplifiedCardsV2 from '../json/simplified-cards-v2.json';

const cards = <ICardJSON[]>simplifiedCardsV2

enum Colors {
  'R' = 1 << 0,
  'G' = 1 << 1,
  'U' = 1 << 2,
  'W' = 1 << 3,
  'B' = 1 << 4,
}

let color = 0
color = color | Colors['R']
console.log(color)

interface ICardJSON {
  colorIdentity: string[];
  colors: string[];
  layout: string;
  manaValue: number;
  manaCost: string;
  name: string;
  power: string;
  subtypes: string[];
  supertypes: string[];
  toughness: string;
  type: string;
  types: string[];
}

interface ICardData {
  // colorIdentity: string[];
  colors: number;
  // layout: string;
  manaValue: number;
  manaCost: string;
  name: string;
  power: string;
  subtypes: string[];
  supertypes: string[];
  toughness: string;
  type: string;
  types: string[];
}

const cardsArray = [] as ICardData[];
for (let card of cards) {
  // console.log(simplifiedCards[card as keyof typeof simplifiedCards])

  let colors = 0
  card.colors.forEach((color: string) => {
    colors = colors | Colors[color as keyof typeof Colors]
  })
  cardsArray.push(<ICardData>{
    colors: colors,
    manaValue: card.manaValue,
    manaCost: card.manaCost,
    name: card.name,
    power: card.power,
    subtypes: card.subtypes,
    supertypes: card.supertypes,
    toughness: card.toughness,
    type: card.type,
    types: card.types,
  })
}

console.log(cardsArray[5])

// for (let index = 0; index < 24000; index++) {
//   console.log(cardsArray[index].name, ' ... ', cardsArray[index].data.name)
//   console.log(cardsArray[index].data.colors)
//   console.log(cardsArray[index].data.colorIdentity)
  
// }


// console.table(simplifiedCards)
// console.log(Object.entries(simplifiedCards))
// const artifacts = Object.entries(simplifiedCards).filter(([name, card]) => {
//   if (card.subtypes.includes('Goblin')) {
//     return true
//   } else return false
// })

// console.table(artifacts)