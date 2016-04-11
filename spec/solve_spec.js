var helpers = require('./support/sudoku_helpers.js');

var solve = require('../src/solve.js');

describe('solve', function() {

  var easySudoku = helpers.getSudoku('easy');
  var solvedSudoku = helpers.getSudoku('solved');
  var blankSudoku = helpers.getSudoku('blank');

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
