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

  var isValid = valid9x9(arr, config.index);
  var isSolved = isValid && arr.indexOf(0) === -1;

  function fillNext() {

    var index;
    for (var i = 0; i < openIndicies.length; i += 1) {
      index = openIndicies[i];
      if (arr[index] === 0) {
        break; 
      }
    }

    var newArr = arr.slice();
    newArr.splice(index, 1, 1);

    return sudoku(newArr, {
      openIndicies: openIndicies,
      index: index
    });
  }

  return {
    arr: arr,
    openIndicies: openIndicies,
    isValid: isValid,
    isSolved: isSolved,
    fillNext: fillNext
  };
};
