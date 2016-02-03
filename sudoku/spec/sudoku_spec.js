var fs = require('fs');

var sudoku = require('../src/sudoku.js');
var parse = require('../src/parse.js');

describe('sudoku', function() {

  var easyExample = fs.readFileSync('spec/easy_example.csv', 'utf8');
  var easySudoku;

  beforeEach(function() {
    easySudoku = sudoku(parse(easyExample));
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
      // expect(easySudoku.isValid).toBeTruthy();
    });
  });
});
