# Andy's Sudoku Solver
This is a brute force backtracking sudoku solver.  It is written in javascript using a combination of functional and object oriented techniques.  You will need [node.js](https://nodejs.org/en/) to run the program.

## Usage
The `solve` program takes a valid sudoku in CSV format from stdin, and writes the completed sudoku to stdout.  Here is an example usage assuming that `pwd` is the directory containing this readme file:

```
cat spec/support/easy_example.csv | ./solve
```

This should output the following to your terminal:

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
In order to run the tests, you will need [npm](https://www.npmjs.com/).  Run `npm install` in the project rood directory.  To run the tests use the command `npm test` from the same location.

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

The `solve` function first checks if the sudoku is solved, and returns the sudoku if this is the case.  If the sudoku is not solved, it then checks if the sudoku has any repeated numbers in any rows, columns, or boxes.  If there are no repeated numbers, it fills the lowest indexed open cell with a 1, then calls `solve` on this new sudoku.  If there are repeated numbers in a row, column, or box, the sudoku is 'incremented' and `solve` is called on the resulting sudoku.

### increment() and Backtracking
The `increment` function looks for the highest indexed cell filled by the solver.  If the value of that cell is less than 9, the cell value is incremented by one.  If the value of the highest indexed cell filled by the solver is 9, the value of that cell is reset to 0.  This process is repeated until a cell with a value less than 9 is found and incremented.  In this way the `increment` function can potentially backtrack all the way to the first open cell.

## Efficiency
"Our intuitions about how programs spend their time is usually completely wrong."  
-[Douglas Crockford](https://www.youtube.com/watch?v=NPlMcUxFOlY&m=27&s=49)

For this program I consider n to be the set of unfilled cells in the input sudoku.  Checking sudoku validity and completeness, filling the next empty cell with a 1, and incrementing the last filled cell when its value is less than 9 are all individually so inexpensive that I will not consider them to be significant factors in the time complexity of the program.  All of these operations, however, are compounded when the program backtracks.  In the best case scenario for the configuration of n, the program will never have to backtrack and its performance will scale linearly as n scales - O(n).  Usually we can expect that backtracks will be spread out fairly evenly across the input.  In this, the expected case, performance will scale exponentially with n - somewhere in the order of O(2^n).  For inputs requiring a lot of backtracking, the program's performance will move towards factorial space.  Given worst case input, the program will perform somewhere between exponential and factorial space; O(n!) will never actually be reached.

## Reflections
I learned about the viability of using brute force with backtracking to solve 9x9 sudokus years ago when I was first learning to program with python.  I didn't end up implementing a sudoku solving program at that time, and I was excited to have an occasion to try it out for this challenge.

### Design Decisions
I chose to use a brute force backtracking approach for this program because it seemed like the easiest strategy to implement.  If I ever write another sudoku solver I will try incorporating other techniques, but simple backtracking seemed like a good first step to take in the problem area.

#### Language Choice
I decided to use javascript for this project for four reasons, one of which turned out to be based on a false assumption.  The other language choices I considered were ruby and python.

##### Language Familiarity
I have been working heavily with javascript for a few years now both in the browser and in node, and I have become very comfortable using it to make software.  Despite its annoying quirks and its sometimes tortured syntax, javascript stands out among the languages I've used as having enormous flexibility that runs deeper than alternate syntaxes.  Using javascript I can explore programming in functional, classical, and prototypal styles if I want, and even mix and match them in the same program.  I like a lot of things about how the javascript ecosystem is set up and maintained, and my continuing engagement with the language powers a positive feedback loop that keeps me excited about using javascript to solve problems.

##### Language Performance
I knew that this program was going to have to crunch a lot of numbers.  Though I realize that my own design decisions have the greatest potential impact on the performance of the software I write, I have noticed that for resource intensive programs I write in the same way in ruby, python, and javascript, the javascript implementation always runs the fastest.  In this respect I was happy with my decision to use javascript because the following [sudoku](https://en.wikipedia.org/wiki/File:Sudoku_puzzle_hard_for_brute_force.jpg) designed to defeat brute force algorithms (found at `sudoku/spec/support/hard_example.csv`) took my program just under 30 minutes to complete on my mac mini:

```
-,-,-,-,-,-,-,-,-
-,-,-,-,-,3,-,8,5
-,-,1,-,2,-,-,-,-
-,-,-,5,-,7,-,-,-
-,-,4,-,-,-,1,-,-
-,9,-,-,-,-,-,-,-
5,-,-,-,-,-,-,7,3
-,-,2,-,1,-,-,-,-
-,-,-,-,4,-,-,-,9
```

I expect that it could have taken hours had I written an equivalent implementation in ruby.  That is an important real world difference between running the program while I do other things and running the program overnight.

Javascipt benefits from having competing implementations maintained by Google, Microsoft, and Mozilla constantly racing for superior performance.  My other language choices do not have the same resources invested in their implementations, and do not hold up against javascript when language performance is an important consideration.

##### Available Testing Frameworks
While I prefer RSpec, I am comfortable using jasmine to test my javascript projects.  I like it okay.  I don't have much experience with python testing frameworks; perhaps testing in python is awesome.  Because I wanted to use familiar tools to take a test driven approach with parts of this challenge, javascript was an acceptable choice.

##### Tail Recursion
One of the first files I wrote for this program was the recursive `solve` function explained earlier in the "How it Works" section.  I consider this to be a very beautiful function.  I was eager to try out tail recursion in javascript, as it is included in the ES6 standard.  This was a poor decision.  Node/v8 doesn't yet implement tail call optimization.  Because of my insufficient research on the subject I had to replace my lovely recursive `solve` function with an ugly iterative version or overrun my call stack when the program ran with some valid inputs.

#### Architecture and Design Patterns
Even though the challenge document included explicit language stating "You must use an object oriented approach", I knew I wanted to write this program functionally at the outset.  The exception to this was the object oriented design of the `sudoku` objects.  `sudoku` includes initializing code, instance properties, and instance variables.  Though I did not make use of `Object.freeze` or the 'writable' and 'configurable' metaproperties accessible through `Object.defineProperties`, `sudoku` objects are meant to be immutable once initialized.  This made testing much easier than I am accustomed to, as I did not have to deal with reinitializing `sudoku` objects in each individual test.  It also made them play nice with the more functionally designed areas of the program.

### Regrets
"I've had a few.  But then again, too few to mention."  
-Paul Anka

I wish I were more like Paul.  
*Sigh.*

#### Dealing with Bad Input
My program does not deal gracefully with bad input.  It throws no appropriate errors when given input of the wrong length or format.  While a solution is guaranteed eventually for all valid sudoku inputs, there is a sizable class of invalid inputs that will cause the program to run forever without error.  This is a serious flaw that I would have liked to address had I budgeted more time for the project.

#### Extensibility
Though only classic 9x9 sudokus were mentioned in the challenge document, I wanted to make extending the capability of this program to deal with other sudoku formats as easy as possible.  To this end I separated the task of checking sudoku validity into its own `valid9x9` function, but both the `fillNext` and `increment` functions included as instance methods of `sudoku` objects are impaired in their extensibility by expecting only numeric cell values.  Also, the `increment` function is hard coded to cap cell values at 9.  I could have done a better job at making `sudoku` extensible, but I realize too that doing so would probably be premature optimization.

#### Performance Optimizations
I was able to speed up my sudoku validity checking by making `valid9x9` take an optional index argument that makes the function only check if the value at the specified cell index conflicts with the values of other cells in that cell's row, column, or box.  I realize that I could have included a similar optimization in the `fillNext` and `increment` functions by passing the index within the `openIndices` array of the latest filled cell's index to these functions through the `sudoku` function's `config` object.  This would save time looking for the latest filled cell's `openIndices` index on each call to those functions.  There are certainly other places where I could trade a little memory for a lot of time, but I would need to meditate more to uncover them.

### Conclusion
This is the kind of project that got me interested in programming in the first place.  I love solving problems and juggling complexity in my head.  Though it has some serious flaws, I am happy with how my solution turned out and I had a great time working on it.  I hope you find my code and my English easy to read and understand.
