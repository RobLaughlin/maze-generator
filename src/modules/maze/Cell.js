import Box from "./Box";
import GridIndex from "./GridIndex";

class Cell extends Box {
    constructor(index, visited=false) {
        super();
        this.index = index;
        this.visited = visited;
    }
}

Cell.prototype.getNeighborIndices = function() {
    return {
        'LEFT'  :   new GridIndex(this.index.row - 1, this.index.column),
        'RIGHT' :   new GridIndex(this.index.row + 1, this.index.column),
        'UP'    :   new GridIndex(this.index.row, this.index.column + 1),
        'DOWN'  :   new GridIndex(this.index.row, this.index.column - 1)
    };
};

export default Cell;