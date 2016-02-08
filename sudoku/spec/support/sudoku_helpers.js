module.exports = {
  readCSV: readCSV,
  parseCSV: parseCSV
}

var fs = require('fs');

var parse = require('../../src/parse.js');

function readCSV(name) {
  return fs.readFileSync('spec/' + name + '_example.csv', 'utf8');
}

function parseCSV(name) {
  return parse(readCSV(name));
}

