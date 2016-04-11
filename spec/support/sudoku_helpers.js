module.exports = {
  readCSV: readCSV,
  parseCSV: parseCSV,
  getSudoku: getSudoku
}

var fs = require('fs');

var parse = require('../../src/parse.js');
var sudoku = require('../../src/sudoku.js');

function readCSV(name) {
  return fs.readFileSync('spec/support/' + name + '_example.csv', 'utf8');
}

function parseCSV(name) {
  return parse(readCSV(name));
}

function getSudoku(name) {
  return sudoku(parseCSV(name));
}
