// https://mtgjson.com/data-models/legalities/
// TODO - Create a bitwise operation for each of the legalities.
// The last number in the operation just needs to be incremented.

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

module.exports = formatsEnum;