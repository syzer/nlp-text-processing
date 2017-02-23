const rake = require('node-rake')
const sentenceToCompress = require('./data/sentenceToCompres.json')

// TODO knowlege graph preload
// TODO sentense => ast parser

// integer linear programming to find subtree of the whole sentence
// LSTM

rake.generate(sentenceToCompress.text)
    .splice(0, 12).join('|')
// metal rock humans | food Aliens | basically | insects

// Turns out that rake is not so good for text compresion
