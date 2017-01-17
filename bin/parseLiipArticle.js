#!/usr/bin/env node

const R = require('ramda')
const { map, filter, none, split, isEmpty, join, trim, replace } = R
const { readFile, writeFile } = require('../lib')
const dataDir = __dirname + '/../data/'

const parseFile = R.pipe(
    split(/\n|\t/gi),
    filter(none(isEmpty)),
    map(trim),
    map(replace(/"/gi, '')),
    map(replace(/'/gi, '’')),
    join(' '),
    e => [e],
    JSON.stringify
)

const app =
    readFile(dataDir + 'example.scraped.liip.txt')
        .map(parseFile)
        .chain(contents => writeFile(dataDir + 'example.scraped.articles2.json', contents))

app.fork(console.error, console.log)
