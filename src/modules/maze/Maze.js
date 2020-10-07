import GridIndex from "./GridIndex";
import Cell from "./Cell";
import { produce } from 'immer';

/**
 * @module Maze
 */

 /**
  * 2D Grid of {@link Cell} objects containing maze data generated using explicit recursive depth-first search.
  * 
  * Explanation from Wikipedia as follows:
  * 
  * A disadvantage of the recursive implicit stack approach is a large depth of recursion.
  * In the worst case, the routine may need to recur on every cell of the area being processed, which may 
  * exceed the maximum recursion stack depth in many environments. As a solution, the same backtracking method 
  * can be implemented with an explicit stack, which is usually allowed to grow much bigger with no harm.
  * 
  * [Wikipedia]{@link https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation}
  */
class Maze {
    constructor(rows, columns) {
        /** @property {int} rows Maximum number of rows in the maze. */
        this.rows = rows;

        /** @property {int} columns Maximum number of columns in the maze. */
        this.columns = columns;

        this.reset();
    }

    /**
     * 2D Mapping of [Cells]{@link Cell} containing previously generated maze data. Keyed by [row][column].
     * @type {Object} 
     */
    get generated() { return this._cells }

    /**
     * 1D List of cells that keeps the order of the cells in which they were chosen during generation.
     * @type {(Cell)|Array} 
     */
    get ordered() { return this._ordered }

    /**
     * 1D List of cells that keeps the ordered solution of the cells in which they were chosen during generation.
     * @type {(Cell)|Array} 
     */
    get orderedSolution() { return this._orderedSolution }

    /**
     * 2D Mapping of [Cells]{@link Cell} containing the solved maze data. Keyed by [row][column].
     * @type {Object} 
     */
    get solution() { return this._solution }

    /**
     * Determines whether a given 2D [Index]{@link GridIndex} is out of range in the cells array.
     * @param {GridIndex} index - The 2D index to check for.
     * @returns {boolean} If the given index is in range.
     */
    validCellIndex(index) {
        return  (index.row < this.rows)         && 
                (index.column < this.columns)   &&
                (index.row >= 0)                &&
                (index.column >= 0);
    }

    /**
     * Given a mapping of [Walls]{@link Wall} to [Index]{@link GridIndex}:
     * 1. First determine whether the index is valid.
     * 2. If the index is valid and the cell at that index is unvisited, push it to the unvisited neighbors array.
     * @param {Map<Wall, GridIndex>} indices - A mapping of [Walls]{@link Wall} to [Index]{@link GridIndex}.
     * @example
     * Maze.getUnvisitedCells(Cell.getNeighborIndices()) // Gets all unvisited neighbors
     * @returns {((Cell|Wall)|Array)}
     * A tuple-like array of length 2 with the unvisited cell as the first parameter and the respective wall as the second parameter.
     */
    getUnvisitedCells(indices) {
        let neighbors = [];

        indices.forEach((i, wall) => {
            if (this.validCellIndex(i)) {
                let cell = this._cells[i.row][i.column];
                if (!cell.visited) { neighbors.push([cell, wall]); }
            }
        });

        return neighbors;
    }

    /**
    * Main generator method for generating the maze.
    * Uses row and column instead of {@link GridIndex} to have easier implementation for consumers.
    * @param {int} startRow - Starting row index of the maze.
    * @param {int} startColumn - Starting column index of the maze.
    * @param {int} endRow - End row index of the maze.
    * @param {int} endColumn - End column index of the maze.
    * @returns {((Object|Object)|Array)} The generated maze data and the solution data, respectively. Both keyed by [row][column].
    * The first cell is always the cell chosen by index at (row, column).
    * 
    * @example
    * // Algorithm (Recursive depth-first search with explicit stack):
    * 1. Choose the initial cell, mark it as visited and push it to the stack.
    * 2. While the stack is not empty.
    *      1. Pop a cell from the stack and make it a current cell.
    *      2. If the current cell has any neighbours which have not been visited.
    *          1. Push the current cell to the stack.
    *          2. Choose one of the unvisited neighbours.
    *          3. Remove the wall between the current cell and the chosen cell.
    *          4. Mark the chosen cell as visited and push it to the stack.
    */
    generate(startRow, startColumn, endRow, endColumn) {

        // Bounds checking for the given starting index.
        let index = new GridIndex(startRow, startColumn);
        if (!this.validCellIndex(index)) { 
            throw RangeError ('Starting index out of range.'); 
        }

        // Bounds checking for the given ending index.
        let endIndex = new GridIndex(endRow, endColumn);
        if (!this.validCellIndex(endIndex)) { 
            throw RangeError ('End index out of range.'); 
        }

        this.reset();

        // (1) Choose the initial cell, mark it as visited and push it to the stack.
        let stack = [];
        let initialCell = this._cells[index.row][index.column];
        
        initialCell.visited = true;
        initialCell.setWalls(false);
        stack.push(initialCell);

        // (2) While the stack is not empty:
        while (stack.length > 0) {
        
            // (3) Pop a cell from the stack and make it a current cell.
            let currentCell = stack.pop();

            // (4) If the current cell has any neighbours which have not been visited:
            let neighbors = this.getUnvisitedCells(currentCell.getNeighborIndices());
    
            if (neighbors.length > 0) {

                // (5) Choose one of the unvisited neighbours.
                let i = Math.floor(Math.random() * neighbors.length);
                let nextCell = neighbors[i][0];
                let wall = neighbors[i][1];
                
                // (6) Remove the wall between the current cell and the chosen cell.
                currentCell.toggleWall(wall, false);
                nextCell.toggleOpposite(wall, false);
                
                // (7) Push the current cell to the stack.
                // We do this later instead of earlier as we want to toggle the wall before pushing to the stack.
                stack.push(currentCell);

                // (8) Mark the chosen cell as visited and push it to the stack.
                nextCell.visited = true;
                stack.push(nextCell);
                this._cells[nextCell.index.row][nextCell.index.column] = nextCell
                this._ordered.push(nextCell);

                // Set the solved path
                if (nextCell.index.row === endIndex.row && nextCell.index.column === endIndex.column) {
                    stack.forEach(cell => {
                        let r = cell.index.row;
                        let c = cell.index.column;
                        cell.solved = true;
                        this._orderedSolution.push(cell);

                        if (r in this._solution) {
                            this._solution[r][c] = cell;
                        }
                        else {
                            this._solution[r] = { c: cell }
                        }

                    });
                }
            }
        }

        return [this.generated, this.solution];
   }

   /** Reset the maze. */
   reset() {
        this._cells = {};
        this._solution = {};
        this._ordered = [];
        this._orderedSolution = [];

        for (let r = 0; r < this.rows; r++) {
            this._cells[r] = {};
            for (let c = 0; c < this.columns; c++) {
                this._cells[r][c] = new Cell(new GridIndex(r, c));
            }
        }
   }

}

export default Maze;