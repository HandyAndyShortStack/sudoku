module.exports = solve;

function solve(sudoku) {

  if (sudoku.isSolved) {
    return sudoku;
  }

  if (sudoku.isValid) {
    return solve(sudoku.fillNext());
  }

  return solve(sudoku.increment());
}
