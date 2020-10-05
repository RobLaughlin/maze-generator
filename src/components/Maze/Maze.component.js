import React from 'react';
import { Canvas } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, setMazeDims } from '../../actions/Dimensions.actions';
import { stop } from '../../actions/Generation.actions';

import MediaQuery from 'react-responsive';
import maze from '../../modules/maze/Maze';
import GridIndex from '../../modules/maze/GridIndex';

class Maze extends React.Component {
    static PAD = {
        X: 40,
        Y: 40
    };

    constructor(props) {
        super(props);
        this.windowResized      = this.windowResized.bind(this);
        this.renderMaze         = this.renderMaze.bind(this);
        this.renderSolution     = this.renderSolution.bind(this);

        this.canvasContainer    = React.createRef();
        this.canvas             = React.createRef();
    }

    render() {
        const density   = this.props.density.val;
        const width     = (this.props.width.val * density);
        const height    = (this.props.height.val * density);

        return(
            <div className="w-100 d-flex border-bottom border-dark" ref={this.canvasContainer} >
                <MediaQuery minWidth={this.props.MIN_WIDTH}>
                    <Canvas ref={this.canvas} style={{ width: width, height: height }} width={width} height={height}/>
                </MediaQuery>
                <MediaQuery maxWidth={this.props.MAX_WIDTH}>
                    <Canvas ref={this.canvas} className="mt-3 mb-3" style={{ width: width, height: height }} width={width} height={height}/>
                </MediaQuery>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResized);
        this.windowResized();
    }

    
    componentDidUpdate(prevProps) {
        // Autoscale the dimensions of the maze so other components can access these dimensions.
        const { MAX_WIDTH, mazeDims, setMazeDims } = this.props;
        if (mazeDims.width !== prevProps.mazeDims.width || mazeDims.height !== prevProps.mazeDims.height) {

            const width     = this.canvasContainer.current.clientWidth  - Maze.PAD.X;

            // Set height equal to the width of the browser width meets certain requirements.
            const height    = (window.innerWidth > MAX_WIDTH)                ?
                            this.canvasContainer.current.clientHeight   - Maze.PAD.Y    :
                            this.canvasContainer.current.clientWidth    - Maze.PAD.Y;
    
            setMazeDims(width, height);
        }

        // Maze generation
        const { width, height, active, start, solve, stop } =  this.props;

        if (start) {
            let maze_ = new maze(width.val, height.val);
            maze_.generate(0, 0, width.val - 1, 0);

            // Clear maze
            var ctx = this.canvas.current.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);

            this.renderMaze(ctx, maze_);
            if (solve) { 
                this.renderSolution(ctx, maze_) 
            }

            stop();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized);
    }

   renderMaze(ctx, mazeObj) {
        console.log('e');
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        const generated = mazeObj.generated;

        for (const row in generated){
            for (const column in generated[row]) {
                let cell = generated[row][column];
                let density = this.props.density.val;
                let swcX = density * cell.index.row;
                let swcY = density * (this.props.height.val - cell.index.column);
                
                if (cell.down.enabled) {
                    ctx.moveTo(swcX, swcY);
                    ctx.lineTo(swcX + density, swcY);
                    ctx.stroke();
                }
    
                if (cell.left.enabled) {
                    ctx.moveTo(swcX, swcY);
                    ctx.lineTo(swcX, swcY - density);
                    ctx.stroke();
                }
    
                if (cell.up.enabled) {
                    ctx.moveTo(swcX, swcY - density);
                    ctx.lineTo(swcX + density, swcY - density);
                    ctx.stroke();
                } 
                
                if (cell.right.enabled) {
                    ctx.moveTo(swcX + density, swcY);
                    ctx.lineTo(swcX + density, swcY - density);
                    ctx.stroke();
                }
            }
        }
        ctx.closePath();
    }

    renderSolution(ctx, mazeObj) {
        ctx.beginPath();
        ctx.strokeStyle = 'green';

        const generated = mazeObj.generated;
        const solution = mazeObj.solution;

        for (const row in solution) {
            for (const column in solution[row]) {
                let cell = solution[row][column];
                let density = this.props.density.val;
                let cenX = (density * cell.index.row) + (density / 2);
                let cenY = (density * (this.props.height.val - cell.index.column)) - (density / 2);

                let south = new GridIndex(cell.index.row, cell.index.column - 1);
                let west = new GridIndex(cell.index.row - 1, cell.index.column);
                let north = new GridIndex(cell.index.row, cell.index.column + 1);
                let east = new GridIndex(cell.index.row + 1, cell.index.column);

                if (!cell.down.enabled && mazeObj.validCellIndex(south) && 'solved' in generated[south.row][south.column]) {
                    ctx.moveTo(cenX, cenY);
                    ctx.lineTo(cenX, cenY + (density / 2));
                    ctx.stroke();
                }
                
                if (!cell.left.enabled && mazeObj.validCellIndex(west) && 'solved' in generated[west.row][west.column]) {
                    ctx.moveTo(cenX, cenY);
                    ctx.lineTo(cenX - (density / 2), cenY);
                    ctx.stroke();
                }
    
                if (!cell.up.enabled && mazeObj.validCellIndex(north) && 'solved' in generated[north.row][north.column]) {
                    ctx.moveTo(cenX, cenY);
                    ctx.lineTo(cenX, cenY - (density / 2));
                    ctx.stroke();
                } 
                
                if (!cell.right.enabled && mazeObj.validCellIndex(east) && 'solved' in generated[east.row][east.column]) {
                    ctx.moveTo(cenX, cenY);
                    ctx.lineTo(cenX + (density / 2), cenY);
                    ctx.stroke();
                }
            }
        }
        ctx.closePath();
    }

    // // Rescale maze dimensions on window resize
    windowResized() {
        const width     = this.canvasContainer.current.clientWidth  - Maze.PAD.X;

        // Set height equal to the width of the browser width meets certain requirements.
        const height    = (window.innerWidth > this.props.MAX_WIDTH)                ?
                        this.canvasContainer.current.clientHeight   - Maze.PAD.Y    :
                        this.canvasContainer.current.clientWidth    - Maze.PAD.Y;
        
        const density = this.props.density.val;
        const maxWidth = Math.floor(width / density);
        const maxHeight = Math.floor(height/ density);

        this.props.setMazeDims(width, height);
        this.props.setWidth(maxWidth, maxWidth);
        this.props.setHeight(maxHeight, maxHeight);
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height,
        density: state.dimensions.density,
        mazeDims: state.dimensions.mazeDims,
        start: state.generation.start,
        active: state.generation.active,
        solve: state.generation.solve,
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth        : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight       : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
        setMazeDims     : (width, height)       => { dispatch(setMazeDims(width, height))},
        stop            : ()                    => { dispatch(stop()) } 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);