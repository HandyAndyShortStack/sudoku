var valid9x9 = require('./valid9x9.js');

module.exports = sudoku;

function sudoku(arr, config) {

  if (typeof config === 'undefined') {
    config = {}
  }

  if (config.openIndicies) {
    var openIndicies = config.openIndicies;
  } else {
    var openIndicies = [];
    arr.forEach(function(item, index) {
      if (item === 0) {
        openIndicies.push(index);
      }
    });
  }

  var index;
  if (config.index) {
    index = config.index;
  }

  var isValid = valid9x9(arr, index);

  return {
    arr: arr,
    openIndicies: openIndicies,
    isValid: isValid
  };
};
