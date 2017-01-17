const fs = require('fs')
const R = require('ramda')
// const { map: ostMap } = require('object-stream-tools')
const { map, filter, none, split, isEmpty, join, trim, replace } = R

module.exports = R.pipe(
    e => e.toString(),
    split(/\n|\t/gi),
    filter(none(isEmpty)),
    map(trim),
    map(replace(/"/gi, '')),
    map(replace(/'/gi, '’')),
    join(' '),
    replace(/\ \./g, '.')
    // replace(/\ \ /g, ''),
    // e => [e],
    // JSON.stringify
)
