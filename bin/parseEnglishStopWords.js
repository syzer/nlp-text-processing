const Task = require('data.task')
const fs = require('fs')
const dataDir = __dirname + '/../data/'

const readFile = filename =>
    new Task((rej, res) =>
        fs.readFile(filename, 'utf-8', (err, contents) =>
            err ? rej(err) : res(contents)))

const writeFile = (filename, contents) =>
    new Task((rej, res) =>
        fs.writeFile(filename, contents, (err, success) =>
            err ? rej(err) : res(success)))

const app =
    readFile(dataDir + 'english-stop-words.txt')
        .map(e => e.split(/\n|\t/gi))
        .map(JSON.stringify)
        .chain(contents => writeFile(dataDir + 'english-stop-words.json', contents))

app.fork(console.error, console.log)
