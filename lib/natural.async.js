const n = require('natural')

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

module.exports = {
    newBayes,
    newLogisticRegressionClassifier
}