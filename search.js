// @flow
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
// True

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

// Test on bigger data set
// need to cleanup
// TODO tc,tz => to
const words = require('word-list-google')
    .twentyThousands
    .filter(w => !'ta,tb,tz,ta,tc,ct,n,z,o,a,p,d,q,f,r,t,n,z,o,a,p,d,q,f,r,l,y,m,b,s,e,h,x,w,v,u,k,j,g,c'.split(',')
        .includes(w))
// Const spellCheck2 = new n.Spellcheck(t.tokenize(words.join(' ')))
const spellCheck2 = new n.Spellcheck(words)

const test3 = 'I wuold likes to thank'
    .split(' ')
    .map(e => spellCheck2.getCorrections(e))
    .map(R.slice(0, 2))
    .join('|')
// I|would|liked,like|toc,toy|thanx,thanks

// good algo
const soundex = n.SoundEx
const test = soundex.compare('hadoop', 'hadop')
// True

// easy algo
const methaphone = n.Metaphone
const test2 = methaphone.compare('hadoop', 'hadop')
// True
