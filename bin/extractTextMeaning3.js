#!/usr/bin/env node

// nodemon -w ./ -x 'cat ../data/karpathy.blog.post.txt | node extractTextMeaning3.js'
const rake = require('node-rake')
const fs = require('fs')
// const str = fs.createReadStream('../data/karpathy.blog.post.txt', 'utf-8')
const R = require('ramda')
const { map: ostMap, streamToArray, arrayToStream } = require('object-stream-tools')
const { map, filter, none, split, isEmpty, join, trim, replace } = R

const parseFile = R.pipe(
  e => e.toString(),
  split(/\n|\t/gi),
  filter(none(isEmpty)),
  map(trim),
  map(replace(/"/gi, '')),
  map(replace(/'/gi, '’')),
  join(' '),
  replace(/\ \./g, '.'),
  // replace(/\ \ /g, ''),
  // e => [e],
  JSON.stringify)

process.stdin
  .pipe(ostMap(parseFile))
  .pipe(streamToArray())
  .on('data', ([data]) =>
    arrayToStream(rake.generate(data.slice(0, 5700)).slice(0, 5))
      .pipe(ostMap(e => e += '|'))
      .pipe(process.stdout))
