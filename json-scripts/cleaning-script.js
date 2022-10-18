const atomicJSON = require('./AtomicCards.json');
const fs = require('fs');

const colorsEnum = {
  'R': 1 << 0,
  'G': 1 << 1,
  'U': 1 << 2,
  'W': 1 << 3,
  'B': 1 << 4,
}

const formatEnum = {
  'brawl': 1 << 0,
  'duel': 1 << 1,
  'frontier': 1 << 2, 
}

const cardsArray = [];

// console.log(atomicJSON.data)

for (let name of Object.keys(atomicJSON.data)) {
  card = atomicJSON.data[name][0]
  let colors = 0;
  let colorIdentity = 0
  let formats = []
  if (card.layout === 'normal' && card.identifiers.scryfallOracleId) {    
    
    card.colors.forEach((color) => {
      colors = colors | colorsEnum[color]
    })

    card.colorIdentity.forEach((color) => {
      colorIdentity = colorIdentity | colorsEnum[color]
    })

    if (card.legalities) {
      Object.keys(card.legalities).forEach(format => {
        formats.push(format)
      })
    }
    
    cardsArray.push({
      id: card.identifiers.scryfallOracleId,
      colorIdentity: colorIdentity,
      colors: colors,
      manaValue: card.manaValue,
      manaCost: card.manaCost || null,
      name: card.name,
      power: card.power || null,
      subtypes: card.subtypes,
      supertypes: card.supertypes,
      toughness: card.toughness || null,
      type: card.type,
      types: card.types,
      keywords: card.keywords || [],
      formats: formats,
    })
  }

  // })
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



const sampleCards = cardsArray.slice(500, 1000);
module.exports = { cardsArray, sampleCards };

// const data = JSON.stringify(sliced)
// fs.writeFileSync('./cleaned-cards.json', data)