import GridIndex from "./GridIndex";
import Cell from "./Cell";

class Maze {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = Array.from({length: rows}, (_, r) =>
            Array.from({length: columns}, (_, c) => (
                new Cell(new GridIndex(r, c))
            ))
        );
    }
}


Maze.prototype.validCellIndex = function(index) {
    return  (index.row < this.rows)         && 
            (index.column < this.columns)   &&
            (index.row >= 0)                &&
            (index.column >= 0);
};

Maze.prototype.getUnvisitedNeighbors = function(indices) {
    let neighbors = [];

    indices.forEach((i, wall) => {
        if (this.validCellIndex(i)) {
            let cell = this.cells[i.row][i.column];
            if (!cell.visited) { neighbors.push([cell, wall]); }
        }
    });

    return neighbors;
};

Maze.prototype.generator = function* (row, column) {
    let index = new GridIndex(row, column);
    if (!this.validCellIndex(index)) { throw RangeError ('Starting index out of range.'); }

    let stack = [];
    let initialCell = this.cells[index.row][index.column];
    initialCell.visited = true;
    stack.push(initialCell);
    yield initialCell;

    while (stack.length > 0) {
        let currentCell = stack.pop();
        let neighbors = this.getUnvisitedNeighbors(currentCell.getNeighborIndices());

        if (neighbors.length > 0) {
            let i = Math.floor(Math.random() * neighbors.length);
            let nextCell = neighbors[i][0];
            let wall = neighbors[i][1];
            
            nextCell.visited = true;
            nextCell.toggleOpposite(wall, false);
            stack.push(currentCell);
            stack.push(nextCell);
            yield nextCell;
        }
    }
};

export default Maze;