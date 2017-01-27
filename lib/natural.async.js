const n = require('natural')
// TODO err handling in general

// its a library code after all
const promisify = (obj, fn) =>
    (...args) =>
        new Promise((resolve, reject) =>
            fn.call(obj, ...args, results =>
                resolve(results)))

// because node
const promisifyWithError = (obj, fn) =>
    (...args) =>
        new Promise((resolve, reject) =>
            fn.call(obj, ...args, (err, results) =>
                err ? reject(err) : resolve(results)))

const newBayes = () => {
    const classifier = new n.BayesClassifier

    classifier.saveAsync = promisify(classifier, classifier.save)
    classifier.loadAsync = promisifyWithError(
        n.BayesClassifier,
        n.BayesClassifier.load
    )

    return classifier
}

const newLogisticRegressionClassifier = () => {
    const classifier = new n.LogisticRegressionClassifier

    classifier.saveAsync = promisify(classifier, classifier.save)
    classifier.loadAsync = promisifyWithError(
        n.LogisticRegressionClassifier,
        n.LogisticRegressionClassifier.load
    )

    return classifier
}

// TODO
// reversed params to be consistent with other stuff
const newTfidf = () => {
    const tfidf = new n.TfIdf()

    // const todo = []

    // const calculateTfidf = new Promise((resolve, reject) =>
    //     tfidf.tfidfs(term, (i, stats) => {
    //         console.log(stats, i)
    //         resolve(stats, i)
    //     }))

    // tfidf.tfidfsAsync = (term) =>

    return tfidf
}

const newWordNet = () => {
    const wordnet = new n.WordNet()

    wordnet.lookupAsync = promisify(wordnet, wordnet.lookup)
    wordnet.getAsync = promisify(wordnet, wordnet.get)

    return wordnet
}

// TODO
const Tag = n.BrillPOSTagger
const base = './../node_modules/natural/lib/natural/brill_pos_tagger'
// rules engine:
// NNS CD CURRENT-WORD-IS-NUMBER YES
const rule = base + '/data/English/tr_from_brill_paper.txt'
const lexicon = base + '/data/English/lexicon_from_posjs.json'
const category = 'N'

// this api is stupid
// usage:
// newEnTagAsync()
//  .then(tag => console.log(tag.tag('otter')))
const newEnTagAsync = (lexicon, rule, category) =>
    new Promise((res, rej) => {
        const tagger = new Tag(lexicon, rule, category,
            err => err ? rej(err) : res(tagger))
    })

module.exports = {
    newBayes,
    newLogisticRegressionClassifier,
    newTfidf,
    newEnTagAsync,
    newWordNet
}