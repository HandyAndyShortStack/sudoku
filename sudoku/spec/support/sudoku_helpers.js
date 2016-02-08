module.exports = {
  readCSV: readCSV
}

var fs = require('fs');

function readCSV(name) {
  return fs.readFileSync('spec/' + name + '_example.csv', 'utf8');
}

