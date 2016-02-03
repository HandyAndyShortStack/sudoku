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
  var inProgressBelow9Sudoku;
  var inProgressAt9Sudoku;
  var inProgressDoubleAt9Sudoku;

  beforeEach(function() {
    easySudoku = sudoku(parse(easyExample));
    invalidSudoku = sudoku(parse(invalidExample));
    solvedSudoku = sudoku(parse(solvedExample));
    filledInvalidSudoku = sudoku(parse(filledInvalidExample));

    inProgressBelow9Sudoku = sudoku(parse(easyExample)).fillNext();
    inProgressAt9Sudoku = sudoku(parse(easyExample)).fillNext().fillNext();
    inProgressDoubleAt9Sudoku = sudoku(parse(easyExample)).fillNext().fillNext();

    for (var i = 0; i < 8; i += 1) {
      inProgressAt9Sudoku = inProgressAt9Sudoku.increment();
      inProgressDoubleAt9Sudoku = inProgressDoubleAt9Sudoku.increment();
    }
    inProgressDoubleAt9Sudoku = inProgressDoubleAt9Sudoku.fillNext();
    for (var i = 0; i < 8; i += 1) {
      inProgressDoubleAt9Sudoku = inProgressDoubleAt9Sudoku.increment();
    }
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

  describe('#fillNext', function() {

    it('returns a new sudoku with the lowest open index filled with a 1', function() {
      expect(easySudoku.fillNext().arr[0]).toEqual(1);
      expect(easySudoku.fillNext().fillNext().arr[1]).toEqual(1);
    });
  });

  describe('#increment', function() {

    describe('the latest filled square is below 9', function() {

      it('returns a new sudoku with the latest filled square incremented', function() {
        expect(inProgressBelow9Sudoku.increment().arr[0]).toEqual(2);
      });
    });

    describe('the latest filled square is 9', function() {

      it('returns a new sudoku with the latest filled square reset to 0', function() {
        expect(inProgressAt9Sudoku.increment().arr[1]).toEqual(0);
      });

      it('returns a new sudoku with the next-to-latest filled square incremented', function() {
        expect(inProgressAt9Sudoku.increment().arr[0]).toEqual(2);
      });
    });

    describe('the latest two filled squares are 9', function() {

      it('returns a new sudoku with the latest two filled squares reset to 0', function() {
        expect(inProgressDoubleAt9Sudoku.increment().arr[1]).toEqual(0);
        expect(inProgressDoubleAt9Sudoku.increment().arr[2]).toEqual(0);
      });

      it('returns a new sudoku with the next-to-next-to-latest filled square incremented', function() {
        expect(inProgressDoubleAt9Sudoku.increment().arr[0]).toEqual(2);
      });
    });
  });

  describe('#toString', function() {

    it('returns a compact string describing array', function() {
      expect(easySudoku.toString().slice(0, 9)).toEqual('000260701');
      expect(easySudoku.toString().slice(10, 19)).toEqual('680070090');
    });
  });
});
