module.exports = sudoku;

function sudoku(arr, config) {

  if (typeof config === 'undefined') {
    config = {}
  }

  if (config.openIndicies) {
    var openIndicies = openIndicies;
  } else {
    var openIndicies = [];
    arr.forEach(function(item, index) {
      if (item === 0) {
        openIndicies.push(index);
      }
    });
  }

  return {
    arr: arr,
    openIndicies: openIndicies
  };
};
