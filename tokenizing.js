const path = require('path')
const n = require('natural')

const str = "Hmm, your computer seems to be *offline*. Blaa"
const str2 = "so sending messages won’t work at the moment. Only visible to you"
const exKudos = 'Thank you @joscha and @kevinmoilar for doing an awesome job on the foodways offer!'.split(' ')

const lazyFox = 'Lazy fox jumped over some other thing'.split(' ')

const tokenizer = new n.WordTokenizer
const tokenizer2 = new n.WordPunctTokenizer()
const tokenizer3 = new n.TreebankWordTokenizer()
const agresiveTokenizer = new n.AggressiveTokenizer()
const splitSentences = new n.RegexpTokenizer({ pattern: /[!?.]/ })

tokenizer.tokenize(str)
// [ 'Hmm', 'your', 'computer', 'seems', 'to', 'be', 'offline']

tokenizer2.tokenize(str)
// ['Hmm', ', ', 'your', 'computer', 'seems', 'to', 'be', ' *']

tokenizer3.tokenize(str)
// ['Hmm', ',', 'your', 'computer', 'seems', 'to', 'be', '*', 'offline', '*', '.', 'Blaa' ]

splitSentences.tokenize(str)
// [ 'Hmm, your computer seems to be *offline*', ' Blaa' ]

// available in Es/Rus/and so on
const porter = n.PorterStemmer
const lancaster = n.LancasterStemmer
porter.stem('salsas')
// salsa
porter.tokenizeAndStem(str)
// [ 'hmm', 'comput', 'seem', 'offlin', 'blaa' ]

const ngram = n.NGrams
ngram.bigrams(str + str2)
// [ [ 'Hmm', 'your' ], [ 'your', 'computer' ], [ 'computer', 'seems' ],
ngram.ngrams(str + str2, 5)
// [ [ 'Hmm', 'your', 'computer', 'seems', 'to' ],

// with padding
ngram.ngrams(str + str2, 5, '[Start]', '[End]')
// [ [ '[Start]', '[Start]', '[Start]', '[Start]', 'Hmm' ],
// [ '[Start]', '[Start]', '[Start]', 'Hmm', 'your' ],

// for short... or removing dupes
n.JaroWinklerDistance('cats', 'cat')
// 0.9416666666666667

n.JaroWinklerDistance('not', 'related')
// 0.4920634920634921

// how many to (edit|substititions|turn) to get other string
n.LevenshteinDistance('not', 'related')
// 6

n.JaroWinklerDistance('cats', 'cat')
// 0.9

// very good
// split to ngrams.. same nagrams / total ngrams
// cuts to bigrams and compare
n.DiceCoefficient('cats', 'cat')
// 0.8 => similar

n.DiceCoefficient('not', 'related')
// 0 => not related

const Tag = n.BrillPOSTagger
const base = './node_modules/natural/lib/natural/brill_pos_tagger'
// rules engine:
// NNS CD CURRENT-WORD-IS-NUMBER YES
const rule = base + '/data/English/tr_from_brill_paper.txt'
const lexicon = base + '/data/English/lexicon_from_posjs.json'
const category = 'N'

// this api is stupid
const tagAsync = (lexicon, rule, category) =>
    new Promise((res, rej) => {
        const tagger = new Tag(lexicon, rule, category,
            err => err ? rej(err) : res(tagger))
    })

tagAsync(lexicon, rule, category)
// .then(tag => console.log(tag.tag(exKudos)))
    .catch(console.error)

// VBN - verb
// DT - determiner
// JJ adjective
// NNS - plural
// NNP - noun, proper
// NN - noun

// [ [ 'Thank', 'VB' ],
// [ 'you', 'PRP' ],
// [ '@joscha', 'N' ],
// [ 'and', 'CC' ],
// [ '@kevinmoilar', 'N' ],
// [ 'for', 'IN' ],
// [ 'doing', 'VBG' ],
// [ 'an', 'DT' ],
// [ 'awesome', 'JJ' ],
// [ 'job', 'NN' ],
// [ 'on', 'IN' ],
// [ 'the', 'DT' ],
// [ 'foodways', 'N' ],
// [ 'offer!', 'N' ] ]

const train = [
    {
        label: 'spam',
        text: 'We are currently verifying our subscribers email accounts in other to increase the efficiency of our webmail futures. During this course you are required to provide the verification desk with the following details so that your account could be verified;'
    },
    {
        label: 'spam',
        text: 'After the last annual calculations of your account activity we have determined that you are eligible to receive a tax refund of $479.30 .Please submit the tax refund request and allow us 2-6 days in order toprocess it.'
    },
    {
        label: 'inbox',
        text: '-tagger is trained on the Parole corpus, so the rules it uses to compute word classes for new words or homographs reflect the composition and usage in the Parole corpus (see report below). Under optimal circumstances the tagger attains 97% correct POS-tagging. '
    }
]

const test = [
    { label: 'spam', text: 'refund are requested' },
    { label: 'inbox', text: 'compute support vector machine' },
    { label: 'inbox', text: 'refunds for viagra' }
]

const lib = require('./lib/natural.async')
// const classifier = lib.newBayes()
const classifier = lib.newLogisticRegressionClassifier()

train.map(({ text, label }) =>
    classifier.addDocument(text, label))

classifier.train()

classifier
    .saveAsync('bayes.json')
    .catch(console.error)

// TODO abstract away
const accuracy = test
        .map(({ label }) => label)
        .filter((testLabel, i) =>
            classifier.classify(test[i].text) === testLabel)
        .length / test.length

console.log(`Prediction accuracy ${accuracy}`)

