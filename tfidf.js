const n = require('natural')
const R = require('ramda')
const lib = require('./lib/natural.async')

const { concat, merge } = require('ramda')

// Term Freq Inverse Document Frequency
const tfidf = lib.newTfidf()

const phd2009 = require('./data/phd2009.acknowledgements.json')
const scrapedArticle = require('./data/example.scraped.articles.json')

const docs = concat(phd2009, scrapedArticle)

docs.map(doc => tfidf.addDocument(doc))

// const tf = 2
// const idf = 1 + Math.log(10/(1 + howmanydocs have a word))

tfidf.tfidfs('student', console.log)
tfidf.listTerms(9).map(console.log)

// tfidf
//     .tfidfsAsync('deserves')
//     .then((stats, i) => {
//         console.log(i, stats)
//     })

// TODO download

// const wordnet = require('wordnet-db')
// console.log(wordnet)

const wordnet = lib.newWordNet()

// http://sentiwordnet.isti.cnr.it/
// http://wordnet.princeton.edu
wordnet.lookupAsync('otter')
    .then(glossary => glossary
        // .map((({ptrs}) => ptrs)))
        .map((({pos}) => pos)))
    .then(console.log)

