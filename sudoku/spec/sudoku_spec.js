var fs = require('fs');

var sudoku = require('../src/sudoku.js');
var parse = require('../src/parse.js');

describe('sudoku', function() {

  var easyExample = fs.readFileSync('spec/easy_example.csv', 'utf8');
  var invalidExample = fs.readFileSync('spec/invalid_example.csv', 'utf8');
  var solvedExample = fs.readFileSync('spec/solved_example.csv', 'utf8');
  var filledInvalidExample = fs.readFileSync('spec/filled_invalid_example.csv', 'utf8');
  var easySudoku;
  var invalidSudoku;
  var solvedSudoku;
  var filledInvalidSudoku;

  beforeEach(function() {
    easySudoku = sudoku(parse(easyExample));
    invalidSudoku = sudoku(parse(invalidExample));
    solvedSudoku = sudoku(parse(solvedExample));
    filledInvalidSudoku = sudoku(parse(filledInvalidExample));
  });

  describe('.arr', function() {

    it('is the array passed to the sudoku function', function() {
      expect(easySudoku.arr).toEqual(parse(easyExample));
    });
  });

  describe('.openIndicies', function() {

    it('has the same length as the number of empty squares', function() {
      expect(easySudoku.openIndicies.length).toEqual(45);
    });

    it('is an array of indicies for empty squares', function() {
      expect(easySudoku.openIndicies.slice(0, 4)).toEqual([0, 1, 2, 5]);
    });
  });

  describe('.isValid', function() {

    it('is true if the sudoku is valid', function() {
      expect(easySudoku.isValid).toBeTruthy();
    });

    it('is false if the sudoku is invalid', function() {
      expect(invalidSudoku.isValid).toBeFalsy();
    });
  });

  describe('.isSolved', function() {

    it('is true if the sudoku is filled and valid', function() {
      expect(solvedSudoku.isSolved).toBeTruthy();
    });

    it('is false if the sudoku is not filled', function() {
      expect(easySudoku.isSolved).toBeFalsy();
    });

    it('is false if the sudoku is filled but not valid', function() {
      expect(filledInvalidSudoku.isSolved).toBeFalsy();
    })
  });
});
