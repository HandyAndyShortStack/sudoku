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

