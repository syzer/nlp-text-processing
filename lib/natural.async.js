const n = require('natural')

const save = classifier => fileName =>
    new Promise((res, rej) =>
        classifier.save(fileName, err =>
            err ? rej(err) : res()))

const newBayes = () => {
    const bayes = new n.BayesClassifier
    bayes.saveAsync = save(bayes)

    return bayes
}

module.exports = { newBayes }