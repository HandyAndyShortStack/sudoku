var helpers = require('./support/sudoku_helpers.js');

var parse = require('../src/parse.js');

describe('parse', function() {

  var easyExample = helpers.readCSV('easy');
  var result;

  beforeEach(function() {
    result = parse(easyExample); 
  });

  it('creates an array from the input csv string', function() {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('has the correct number of squares', function() {
    expect(result.length).toEqual(81);
  });

  it('converts dashes to zeros', function() {
    expect(result[0]).toEqual(0);
  });

  it('converts all values to integers', function() {
    expect(typeof result[8]).toEqual('number');
  });
});
