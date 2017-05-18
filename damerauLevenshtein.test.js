// nodemon -w ./ -x 'cat damerauLevenshtein.test.js | node -p'
const natural = require('natural')
const damerau = require('./damerauLevenshtein')
const levenshtein = natural.LevenshteinDistance

const opts = {
    insertion_cost: 1,
    deletion_cost: 4,
    substitution_cost: 4
}

// (u'jellyfish', u'smellyfish')
levenshtein('abba', 'baab', opts)
damerau('abba', 'baab', opts)

levenshtein("ones", "onez", opts)
damerau("ones", "onez", opts)