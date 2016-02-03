var fs = require('fs');

var valid9x9 = require('../src/valid9x9.js');
var parse = require('../src/parse.js');

describe('valid9x9', function() {

  var valid = parse(fs.readFileSync('spec/easy_example.csv', 'utf8'));
  var invalid = parse(fs.readFileSync('spec/invalid_example.csv', 'utf8'));

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
