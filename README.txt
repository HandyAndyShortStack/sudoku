# Andy's Sudoku Solver
This is a brute force backtracking sudoku solver.  It is written in javascript using a combination of functional and object oriented techniques.  You will need [node.js](https://nodejs.org/en/) to run the program.

## Usage
The `solve` program takes a valid sudoku in CSV format from stdin, and writes the completed sudoku to stdout.  Here is an example usage assuming that `pwd` is the directory containing this readme file:

```
cat sudoku/spec/support/easy_example.csv | sudoku/solve
```

should output the following to your terminal:

```
4,3,5,2,6,9,7,8,1
6,8,2,5,7,1,4,9,3
1,9,7,8,3,4,5,6,2
8,2,6,1,9,5,3,4,7
3,7,4,6,8,2,9,1,5
9,5,1,7,4,3,6,2,8
5,1,9,3,2,6,8,7,4
2,4,8,9,5,7,1,3,6
7,6,3,4,1,8,2,5,9
```

## Running the Tests
In order to run the tests, you will need [npm](https://www.npmjs.com/).  `cd` into the `sudoku` directory and run `npm install`.  To run the tests use the command `npm test` from the `sudoku` directory.

## How It Works
My solver uses a brute force technique with backtracking.  This approach is perhaps best understood by reading my original recursive `solve` function, which can be found in `sudoku/src/solve.js`:

```
function solve(sudoku) {

  if (sudoku.isSolved) {
    return sudoku;
  }

  if (sudoku.isValid) {
    return solve(sudoku.fillNext());
  }

  return solve(sudoku.increment());
}
```

The `solve` function first checks if the sudoku is solved, and returns the sudoku if this is the case.  If the sudoku is not solved, it then checks if the sudoku has any repeated numbers in any of its rows, columns, or boxes.  If there are no repeated numbers, it fills the lowest indexed open cell with a 1, then calls `solve` on this new sudoku.  If there are repeated numbers in a row, column, or box, the sudoku is 'incremented' and `solve` is called on the resulting sudoku.

### increment() and Backtracking
The `increment` function looks for the highest indexed cell filled by the solver.  If the value of that cell is less than 9, the cell value is incremented by one.  If the value of the highest indexed cell filled by the solver is 9, the value of that cell is reset to 0.  This process is repeated until a cell with a value less than 9 is found and incremented.  In this way the `increment` function can potentially backtrack all the way to the first open cell.
