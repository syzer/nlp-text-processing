const n = require('natural')
// TODO err handling in general

const save = classifier => fileName =>
    new Promise((res, rej) =>
        classifier.save(fileName, err =>
            err ? rej(err) : res()))

const newBayes = () => {
    const classifier = new n.BayesClassifier
    classifier.saveAsync = save(classifier)

    return classifier
}

const newLogisticRegressionClassifier = () => {
    const classifier = new n.LogisticRegressionClassifier
    classifier.saveAsync = save(classifier)

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

    wordnet.lookupAsync = word =>
        new Promise((resolve, reject) =>
            wordnet.lookup(word, results =>
                resolve(results)))

    return wordnet
}

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