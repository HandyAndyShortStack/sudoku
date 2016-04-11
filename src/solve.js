module.exports = solve;

// The following is the original recursive solve function.
// Please pardon the CSS style comments; I found the slashes unsightly.
/*
function solve(sudoku) {

  if (sudoku.isSolved) {
    return sudoku;
  }

  if (sudoku.isValid) {
    return solve(sudoku.fillNext());
  }

  return solve(sudoku.increment());
}
*/

// Here is the solve function rewritten iteratively by the babel compiler:
function solve(_x) {
  var _again = true;

  _function: while (_again) {
    var sudoku = _x;
    _again = false;

    if (sudoku.isSolved) {
      return sudoku;
    }

    if (sudoku.isValid) {
      _x = sudoku.fillNext();
      _again = true;
      continue _function;
    }

    _x = sudoku.increment();
    _again = true;
    continue _function;
  }
}
