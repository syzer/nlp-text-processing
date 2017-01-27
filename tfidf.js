//@flow
const n = require('natural')
const R = require('ramda')
const lib = require('./lib/natural.async')

// Term Freq Inverse Document Frequency
const tfidf = lib.newTfidf()

const phd2009 = require('./data/phd2009.acknowledgements.json')
const scrapedArticle = require('./data/example.scraped.articles.json')

const docs = phd2009.concat(scrapedArticle, [
    `Each approach has merits. It is usually cheaper (approach 1) to kill a superfluous feature at the requirements stage, before it has wasted implementation resources. This is also better for the morale of the team: developers get frustrated when something they imple- mented gets discarded; that form of waste is worse than tossing out a requirement before anything has been done with it. On the other hand, agilists are right that sometimes the best way (approach 2) to find out if something will be useful is to build it, show it, and see whether it fits.`,
    `Sometimes, but not always. The problem here is dogmatism. Upfront requirements are useful; iterative development is useful. Condemning either of these two complemen- tary techniques in the name of some absolutist ideology does not help projects, but actu- ally harms them.`,
    `The agile criticism is right on target when it lamba sts the huge requirements documents, sometimes running into the thousands of pages, that some bureaucratic environ- ments demand. While describing every single detail in advance is necessary for some life-critical systems (typically embedded systems, for example in transportation), for most business systems such documents are overkill; they become so complex that it is hard to get them right (contradictions and ambiguities creep in), and so unwieldy that they end up forgotten on a shelf rather than being used for the development.`,
    `This criticism of agile does not justify throwing away the notion of upfront written requirements. First, we should note that even a strict definition of “waste” as anything that does not get delivered to the customer does not necessarily exclude requirements documents, since requirements often provide a good basis for writing system documentation. But there are even more fundamental reasons to retain a certain dose of upfront requirements. Software, in spite of its specificities (its virtual nature, the ease of changing it), is an engi- neering artifact. There is no justification for renouncing the basic engineering technique of specifying what you are going to do, in writing and at the appropriate level of detail, before you do it.`
])

docs.map(doc => tfidf.addDocument(doc))

// const tf = 2
// const idf = 1 + Math.log(10/(1 + howmanydocs have a word))

tfidf.tfidfs('agile criticism', (i, stats) =>
    console.log(`Doc ${i}, relevance: ${stats}`))

// phd:
// Doc 0, relevance: 18.88751059801299
// agile criticism:
// Doc 4, relevance: 3.386294361119891
// Doc 5, relevance: 3.386294361119891

// TODO filter out `so`
const docsTopics = docs.map((doc,i) =>
    tfidf.listTerms(i)
        .splice(0, 3)
        .map(R.props(['term', 'tfidf']))
)
console.log(docsTopics)
// [ 'phd', 18.88751059801299 ]
// [ 'thank', 18.88751059801299 ]
// [ 'ian', 12.59167373200866 ]

// lib.newEnTagAsync()
//  .then(tag => docs.map((doc,i) =>
//      tfidf.listTerms(i)
//          .splice(0, 3)
//          .map(R.props(['term', 'tfidf']))
//          .map(e => ({
             // pos: tag.tag(e[0]),
             // name: e[0]
         // }))))
    // .catch(console.error)

// http://sentiwordnet.isti.cnr.it/
// http://wordnet.princeton.edu
const wordnet = lib.newWordNet()

wordnet
    .lookupAsync('otter')
    .then(R.map(R.props(['synsetOffset', 'pos', 'ptrs', 'gloss', 'synonyms'])))
    // .then(console.log)
// 'freshwater carnivorous mammal having webbed and clawed feet and dark brown fur ',

// since we have synsetOffset
wordnet
    .getAsync(2447450, 'n')
    .then(R.prop('gloss'))
    .then(console.log)
// freshwater carnivorous mammal having webbed and clawed feet and dark brown fur
