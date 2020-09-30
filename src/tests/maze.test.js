import Maze from "../modules/maze/Maze"

function mazeTest() {
    let maze = new Maze(10, 10);
    let mGen = maze.generator(4, 5);
    console.log(mGen.next());
}

export default mazeTest