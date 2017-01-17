#!/usr/bin/env node

const { readFile, writeFile } = require('function-file-tools')
const Task = require('data.task')
const textract = require('textract')
const rake = require('node-rake')
const parse = require('../lib/rakeParse')
const dataDir = __dirname + '/../data/'

// { preserveLineBreaks: true }
const extractText = (fileName, config = {}) => new Task((rej, res) =>
    textract.fromFileWithPath(fileName, config, (err, text) =>
        err ? rej(err) : res(text)))

const task = extractText(dataDir + '/phd2009.pdf')
    .map(str => str.substring(0, 3000))
    .map(parse)

task.fork(console.error, data => {
    console.log(data)
    console.log(rake.generate(data).slice(0, 5))
})

// [ ' Waikato July 2009 © 2009 Olena Medelyan Humancompetitive automatic topic indexing ',
// ' Olena Medelyan Abstract Topic indexing ',
// ' highly rewarding voluntary work ',
// ' comparing automatically generated topics ',
// ' Acknowledgements Ian Witten deserves ' ]
