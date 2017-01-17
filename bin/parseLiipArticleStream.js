#!/usr/bin/env node

const fs = require('fs')
const R = require('ramda')
const { map: ostMap } = require('object-stream-tools')
const { map, filter, none, split, isEmpty, join, trim, replace } = R
const { readFile, writeFile, readFileStream } = require('function-file-tools')
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

const app2 = fs.createReadStream(dataDir + 'example.scraped.liip.txt', 'utf-8')
    .pipe(ostMap(parseFile))
    .pipe(process.stdout)

const app3 = readFileStream(dataDir + 'example.scraped.liip.txt')
    .map(parseFile)
    .fork(console.error, console.log)
