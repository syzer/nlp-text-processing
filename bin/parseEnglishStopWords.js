#!/usr/bin/env node

const { readFile, writeFile } = require('../lib')
const dataDir = __dirname + '/../data/'

const app =
    readFile(dataDir + 'english-stop-words.txt')
        .map(e => e.split(/\n|\t/gi))
        .map(JSON.stringify)
        .chain(contents => writeFile(dataDir + 'english-stop-words.json', contents))

app.fork(console.error, console.log)
