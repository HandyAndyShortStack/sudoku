var helpers = require('./support/sudoku_helpers.js');

var valid9x9 = require('../src/valid9x9.js');

describe('valid9x9', function() {

  var valid = helpers.parseCSV('easy');
  var invalid = helpers.parseCSV('invalid');

  describe('given a valid sudoku array', function() {

    it('returns true', function() {
      expect(valid9x9(valid)).toBeTruthy();
    });
  });

  describe('given an invalid sudoku array', function() {

    it('returns false if given no index', function() {
      expect(valid9x9(invalid)).toBeFalsy();
    });

    it('returns false if given a relevant index', function() {
      expect(valid9x9(invalid, 3)).toBeFalsy();
      expect(valid9x9(invalid, 66)).toBeFalsy();
    });

    it('returns true if given an irrelevant index', function() {
      expect(valid9x9(invalid, 4)).toBeTruthy();
    });
  });
});
