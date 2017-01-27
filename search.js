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

const t = new n.TreebankWordTokenizer()
const spellCheck = new n.Spellcheck(t.tokenize(phdFile[0]))

'I wuold like to thank'
    .split(' ')
    .map(e => spellCheck.getCorrections(e))
    .map(R.slice(0, 1))
    .join(' ')
// I would like to thanks


// good algo
const soundex = n.SoundEx
const test = soundex.compare('hadoop', 'hadop')
// true

// easy algo
const methaphone = n.Metaphone
const test2 = methaphone.compare('hadoop', 'hadop')
// true