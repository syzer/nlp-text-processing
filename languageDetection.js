// run with
// nodemon -w ./ -x 'cat languageDetection.js | node -p'
//
// so first Bayesian approach with bigrams
// is not as much effective as using trigrams
//
// let's try franc lib.. it uses trigrams
//
// https://en.wikipedia.org/wiki/Ternary_search_tree
// https://en.wikipedia.org/wiki/Multi-key_quicksort
// https://en.wikipedia.org/wiki/American_flag_sort


const franc = require('franc')
franc.all('O Brasil caiu 26 posições')
// list

// franc.all('Grüezi mitenand', { whitelist: ['deu', 'ita', 'plt', 'fra', 'por', 'eng', 'ces'] })
// [ [ 'deu', 1 ],
// [ 'plt', 0.7428977272727273 ],...


