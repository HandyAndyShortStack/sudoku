var helpers = require('./support/sudoku_helpers.js');

describe('sudoku', function() {

  var easySudoku = helpers.getSudoku('easy');
  var invalidSudoku = helpers.getSudoku('invalid');
  var solvedSudoku = helpers.getSudoku('solved');
  var filledInvalidSudoku = helpers.getSudoku('filled_invalid');

  var inProgressBelow9Sudoku = helpers.getSudoku('easy');
  var inProgressAt9Sudoku = helpers.getSudoku('easy');
  var inProgressDoubleAt9Sudoku = helpers.getSudoku('easy');

  inProgressBelow9Sudoku.arr[0] = 1;
  inProgressAt9Sudoku.arr[0] = 1;
  inProgressAt9Sudoku.arr[1] = 9;
  inProgressDoubleAt9Sudoku.arr[0] = 1;
  inProgressDoubleAt9Sudoku.arr[1] = 9;
  inProgressDoubleAt9Sudoku.arr[2] = 9;

  describe('.arr', function() {

    it('is the array passed to the sudoku function', function() {
      expect(easySudoku.arr).toEqual(helpers.parseCSV('easy'));
    });
  });

  describe('.openIndices', function() {

    it('has the same length as the number of empty squares', function() {
      expect(easySudoku.openIndices.length).toEqual(45);
    });

    it('is an array of indices for empty squares', function() {
      expect(easySudoku.openIndices.slice(0, 4)).toEqual([0, 1, 2, 5]);
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

  describe('#toCSV', function() {

    it('returns a csv string describing the array', function() {
      expect(easySudoku.toCSV().slice(0, 17)).toEqual('0,0,0,2,6,0,7,0,1');
      expect(easySudoku.toCSV().slice(18, 35)).toEqual('6,8,0,0,7,0,0,9,0');
    });
  });
});
