import Maze from "../modules/maze/Maze";

function mazeTest() {
    let maze = new Maze(10, 10);
    let mGen = maze.generator(4, 5);
    let cell;
    do {
        cell = mGen.next();
        console.log(cell);
    } while (!cell.done);
}

export default mazeTest;