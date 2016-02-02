var sudoku = require('./sudoku.js');

var input;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    input = chunk;
  }
});
