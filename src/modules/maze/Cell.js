import Box from "./Box";
import GridIndex from "./GridIndex";

/**
 * Box with additional information such as position on a grid and if the cell has been visited or not.
 * @memberof module:Maze
 * @alias Cell
 * @extends Box
 */
class Cell extends Box {
    /**
     * Initialize a cell object.
     * @param {GridIndex} index - {@link GridIndex} of the cell instance on a 2D grid.
     * @param {boolean} [visited=false] - If the cell has been visited or not.
     */
    constructor(index, visited=false) {
        super();

        /** @property {GridIndex} index Position on a 2D grid. */
        this.index = index;

        /** @property {boolean} visited If the cell has been visited or not. */
        this.visited = visited;
    }

    /**
     * Fetch all the possible adjacent neighbors on a grid based off of the cell's position.
     * @returns {Map<string, GridIndex>} - A map of each adjacent neighbor keyed to the respective direction of that neighbor.
     */
    getNeighborIndices() {
        return new Map([
            ['LEFT'  ,   new GridIndex(this.index.row - 1, this.index.column)],
            ['RIGHT' ,   new GridIndex(this.index.row + 1, this.index.column)],
            ['UP'    ,   new GridIndex(this.index.row, this.index.column + 1)],
            ['DOWN'  ,   new GridIndex(this.index.row, this.index.column - 1)]
        ]);
    }
}

export default Cell;