const cards = require('../json/simplified-cards-v2.json')

const colorsEnum = {
  'R': 1 << 0,
  'G': 1 << 1,
  'U': 1 << 2,
  'W': 1 << 3,
  'B': 1 << 4,
}
const formatsEnum = {
  'brawl': 1 << 0,
  'commander': 1 << 1,
  'duel': 1 << 2,
  'future': 1 << 3 ,
  'frontier': 1 << 4,
  'gladiator': 1 << 5,
  'historic': 1 << 6,
  'historicbrawl': 1 << 7,
  'legacy': 1 << 8,
  'modern': 1 << 9,
  'oldschool': 1 << 10,
  'pauper': 1 << 11,
  'paupercommander': 1 << 12,
  'penny': 1 << 13,
  'pioneer': 1 << 14,
  'premodern': 1 << 15,
  'standard': 1 << 16,
  'vintage': 1 << 17,
}

const cardsArray = [];
for (let card of cards) {
  // console.log(simplifiedCards[card as keyof typeof simplifiedCards])

  let colors = 0
  card.colors.forEach((color) => {
    colors = colors | colorsEnum[color]
  })
  let colorIdentities = 0
  card.colors.forEach((color) => {
    colorIdentities = colorIdentities | colorsEnum[color]
  })
  let formats = 0
  card.legalities.forEach((format) => {
    formats = formats | formatsEnum[format]
  })
 
  cardsArray.push({
    colors: colors,
    colorIdentities: colorIdentities,
    formats: formats,
    keywords: card.keywords,
    manaValue: card.manaValue,
    manaCost: card.manaCost,
    name: card.name,
    power: card.power,
    sets: card.printings,
    subtypes: card.subtypes,
    supertypes: card.supertypes,
    toughness: card.toughness,
    type: card.type,
    types: card.types,
  })
}

function parseToughness(card) {
  if (card.toughness !== null && card.toughness !== '*') {
    card.toughness = parseFloat(card.toughness)
  }
  // Set 'wildcard' toughness values to 100.
  if (card.toughness === '*') {
    card.toughness = 100;
  }
}

function parsePower(card) {
  if (card.power !== null && card.power !== '*') {
    card.power = parseFloat(card.power)
  }
  // Set 'wildcard' power values to 100.
  if (card.power === '*') {
    card.power = 100;
  }
}

for (let card of cardsArray) {
  parseToughness(card);
  parsePower(card);  
}

module.exports = { cardsArray }