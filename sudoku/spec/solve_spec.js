var fs = require('fs');

var solve = require('../src/solve.js');
var sudoku = require('../src/sudoku.js');
var parse = require('../src/parse.js');

describe('solve', function() {

  var easySudoku;
  var solvedSudoku;
  var blankSudoku;

  beforeEach(function() {
    easySudoku = sudoku(parse(fs.readFileSync('spec/easy_example.csv', 'utf8')));
    solvedSudoku = sudoku(parse(fs.readFileSync('spec/solved_example.csv', 'utf8')));
    blankSudoku = sudoku(parse(fs.readFileSync('spec/blank_example.csv', 'utf8')));
  });

  describe('given a valid sudoku', function() {

    it('returns a solved sudoku', function() {
      expect(solve(easySudoku).isSolved).toBeTruthy();
    });
  });

  describe('given a solved sudoku', function() {
    it('returns the sudoku', function() {
      expect(solve(solvedSudoku).isSolved).toBeTruthy();
    });
  });

  describe('given a blank sudoku', function() {
    it('returns a solved sudoku', function() {
      expect(solve(blankSudoku).isSolved).toBeTruthy();
    });
  });
});
