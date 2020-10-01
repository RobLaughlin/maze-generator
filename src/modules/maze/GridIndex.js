/** Position on a 2D grid at index (row, column). 
 * @memberof module:Maze
 * @alias GridIndex
*/
class GridIndex {
    /**
     * Create a 2D index position on a grid.
     * @param {int} row - The first, Row position in the grid.
     * @param {int} column - The second, column position in the grid.
     * 
    */
    constructor(row, column) {
        /** @property {int} row The row position on the grid.*/
        this.row = row;

        /** @property {int} column The column position on the grid.*/
        this.column = column;
    }
}

export default GridIndex;