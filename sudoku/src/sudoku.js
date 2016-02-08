var valid9x9 = require('./valid9x9.js');

module.exports = sudoku;

function sudoku(arr, config) {

  if (typeof config === 'undefined') {
    config = {};
  }

  if (config.openIndices) {
    var openIndices = config.openIndices;
  } else {
    var openIndices = [];
    arr.forEach(function(item, index) {
      if (item === 0) {
        openIndices.push(index);
      }
    });
  }

  var isValid = valid9x9(arr, config.index);
  var isSolved = isValid && arr.indexOf(0) === -1;

  return {
    arr: arr,
    openIndices: openIndices,
    isValid: isValid,
    isSolved: isSolved,
    fillNext: fillNext.bind(null, arr, openIndices),
    increment: increment.bind(null, arr, openIndices),
    toString: toString.bind(null, arr),
    toCSV: toCSV.bind(null, arr)
  };
};

function fillNext(arr, openIndices) {
  var index;
  var newArr = arr.slice();

  for (var i = 0; i < openIndices.length; i += 1) {
    index = openIndices[i];
    if (arr[index] === 0) {
      break; 
    }
  }

  newArr[index] = 1;

  return sudoku(newArr, {
    openIndices: openIndices,
    index: index
  });
}

function increment(arr, openIndices) {
  var openIndex = openIndices.length - 1;
  var newArr = arr.slice();

  for (var i = 0; i < openIndices.length; i += 1) {
    var nextIndex = openIndices[i];
    if (arr[nextIndex] === 0) {
      openIndex = i - 1;
      break; 
    }
  }

  var index = openIndices[openIndex];
  while (newArr[index] === 9) {
    newArr[index] = 0;
    openIndex -= 1;
    index = openIndices[openIndex];
  }

  newArr[index] += 1;

  return sudoku(newArr, {
    openIndices: openIndices,
    index: index
  });
}

function toString(arr) {
  return arr.join('').match(/.{1,9}/g).join('\n');
}

function toCSV(arr) {
  var output = toString(arr)
      .trim()
      .split('\n')
      .map(function(line) {
        return line.split('').join(',');
      })
      .join('\n');
  return output + '\n';
} 
