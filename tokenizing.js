const n = require('natural')

const str = "Hmm, your computer seems to be *offline*. Blaa"
const str2 = "so sending messages won’t work at the moment. Only visible to you"
const exKudos = 'Thank you @joscha and @kevinmoilar for doing an awesome job on the foodways offer!'.split(' ')

const lazyFox = 'Lys soldered the beautiful jewelery pieces'.split(' ')
// Lazy fox jumped over some other thing

const tokenizer = new n.WordTokenizer
const tokenizer2 = new n.WordPunctTokenizer()
const tokenizer3 = new n.TreebankWordTokenizer()
const agresiveTokenizer = new n.AggressiveTokenizer()
const splitSentences = new n.RegexpTokenizer({pattern: /[!?.]/ })

tokenizer.tokenize(str)
// [ 'Hmm', 'your', 'computer', 'seems', 'to', 'be', 'offline']

tokenizer2.tokenize(str)
// ['Hmm', ', ', 'your', 'computer', 'seems', 'to', 'be', ' *']

tokenizer3.tokenize(str)
// ['Hmm', ',', 'your', 'computer', 'seems', 'to', 'be', '*', 'offline', '*', '.', 'Blaa' ]

splitSentences.tokenize(str)
// [ 'Hmm, your computer seems to be *offline*', ' Blaa' ]

// avaible in Es/Rus/and so on
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

// how many to turn
n.LevenshteinDistance('not', 'related')
// 6

n.JaroWinklerDistance('cats', 'cat')
// 0.9
