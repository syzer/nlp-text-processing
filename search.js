//@flow
const n = require('natural')
const R = require('ramda')
const lib = require('./lib/natural.async')

const trie = new n.Trie()

const phdFile = require('./data/phd2009.acknowledgements.json')
const phdWords = phdFile[0].split(' ')

phdWords.map(e => trie.addString(e))

trie.keysWithPrefix('tha')
// [ 'that', 'thank', 'thanks' ]

trie.contains('thanks')
// true

trie.findMatchesOnPath('collaboration')
// [ '', 'co', 'coll' ]
