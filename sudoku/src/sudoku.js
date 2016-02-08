var valid9x9 = require('./valid9x9.js');

module.exports = sudoku;

function sudoku(arr, config) {

  if (typeof config === 'undefined') {
    config = {};
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

  return {
    arr: arr,
    openIndicies: openIndicies,
    isValid: isValid,
    isSolved: isSolved,
    fillNext: fillNext.bind(null, arr, openIndicies),
    increment: increment.bind(null, arr, openIndicies),
    toString: toString.bind(null, arr),
    toCSV: toCSV.bind(null, arr)
  };
};

function fillNext(arr, openIndicies) {
  var index;
  var newArr = arr.slice();

  for (var i = 0; i < openIndicies.length; i += 1) {
    index = openIndicies[i];
    if (arr[index] === 0) {
      break; 
    }
  }

  newArr[index] = 1;

  return sudoku(newArr, {
    openIndicies: openIndicies,
    index: index
  });
}

function increment(arr, openIndicies) {
  var openIndex = openIndicies.length - 1;
  var newArr = arr.slice();

  for (var i = 0; i < openIndicies.length; i += 1) {
    var nextIndex = openIndicies[i];
    if (arr[nextIndex] === 0) {
      openIndex = i - 1;
      break; 
    }
  }

  var index = openIndicies[openIndex];
  while (newArr[index] === 9) {
    newArr[index] = 0;
    openIndex -= 1;
    index = openIndicies[openIndex];
  }

  newArr[index] += 1;

  return sudoku(newArr, {
    openIndicies: openIndicies,
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
