const damerau = require('./damerauLevenshtein')
const distance = require('natural').LevenshteinDistance

// (u'jellyfish', u'smellyfish')
distance('abba', 'baab')
damerau('abba', 'baab')

