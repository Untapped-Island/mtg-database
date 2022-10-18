// https://mtgjson.com/data-models/legalities/
// TODO - Create a bitwise operation for each of the legalities.
// The last number in the operation just needs to be incremented.

const formatEnum = {
  'brawl': 1 << 0,
  'duel': 1 << 1,
  'frontier': 1 << 2, 
}

module.exports = formatEnum;