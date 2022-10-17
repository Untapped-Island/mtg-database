const cards = require('../json/simplified-cards-v2.json')

const colorsEnum = {
  'R': 1 << 0,
  'G': 1 << 1,
  'U': 1 << 2,
  'W': 1 << 3,
  'B': 1 << 4,
}

const cardsArray = [];
for (let card of cards) {
  // console.log(simplifiedCards[card as keyof typeof simplifiedCards])

  let colors = 0
  card.colors.forEach((color) => {
    colors = colors | colorsEnum[color]
  })
  cardsArray.push({
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