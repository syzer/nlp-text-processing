#!/usr/bin/env node

const { readFile, writeFile } = require('function-file-tools')
const dataDir = __dirname + '/../data/'

const app =
    readFile(dataDir + 'example.scraped.article.txt')
        .map(e => e.split(/\n|\t/gi))
        .map(e => e.filter(f => !!f))
        .map(e => e.map(f => f.trim()))
        // currently rake is unstable
        .map(e => e.map(f => f.replace(/"/gi,'')))
        .map(e => e.map(f => f.replace(/'/gi,'’')))
        .map(e => e.join(' '))
        .map(e => [e])
        .map(JSON.stringify)
        .chain(contents => writeFile(dataDir + 'example.scraped.articles.json', contents))

app.fork(console.error, console.log)
