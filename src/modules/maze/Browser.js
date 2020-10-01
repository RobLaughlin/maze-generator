import Maze from './Maze';

try {
    window.Maze = Maze;
} catch (error) {
    console.log('There was an error attaching the Maze module to window.');
}