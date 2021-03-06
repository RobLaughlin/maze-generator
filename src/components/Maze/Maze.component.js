import React from 'react';
import { Canvas } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, setMazeDims } from '../../actions/Dimensions.actions';
import { clearHandlers as clear, generate, active as generating } from '../../actions/Generation.actions';
import { downloadClicked as dlHandler } from '../../actions/Download.actions';

import MediaQuery from 'react-responsive';
import maze from '../../modules/maze/Maze';
import GridIndex from '../../modules/maze/GridIndex';

class Maze extends React.Component {
    // Internal padding of maze inside its container.
    static PAD = {
        X: 40,
        Y: 40
    };

    constructor(props) {
        super(props);
        this.windowResized      = this.windowResized.bind(this);
        this.renderMaze         = this.renderMaze.bind(this);
        this.renderSolution     = this.renderSolution.bind(this);
        this.mazeDimsChanged    = this.mazeDimsChanged.bind(this);
        this.drawCell           = this.drawCell.bind(this);
        this.drawCellSolution   = this.drawCellSolution.bind(this);
        this.cancelAnimation    = this.cancelAnimation.bind(this);
        this.generateBtnClicked = this.generateBtnClicked.bind(this);
        this.solveBtnClicked    = this.solveBtnClicked.bind(this);
        this.skipBtnClicked     = this.skipBtnClicked.bind(this);
        this.downloadBtnClicked = this.downloadBtnClicked.bind(this);
        this.generateMaze       = this.generateMaze.bind(this);

        this.canvasContainer    = React.createRef();
        this.canvas             = React.createRef();

        this.animationTimer     = null; // Timer to control animation FPS.
        this.state = { 
            maze                : null, // The maze to generate. 
            currentFrame        : null, // The current frame of animation 
            currentGeneration   : null, // String value of either "maze", "solution", or null.
         };

         
    }

    render() {
        const density   = this.props.density.val;
        const width     = (this.props.width.val * density);
        const height    = (this.props.height.val * density);

        return(
            <div className="w-100 d-flex" ref={this.canvasContainer} >
                <MediaQuery minWidth={this.props.MIN_WIDTH}>
                    <Canvas 
                        ref={this.canvas} 
                        style={{ width: width, height: height }}
                        width={width} 
                        height={height}
                        className={(this.state.maze === null) ? 'border border-dark' : ''}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={this.props.MAX_WIDTH}>
                    <Canvas 
                        ref={this.canvas} 
                        className={'mt-3 mb-3 ' + ((this.state.maze === null) ? 'border border-dark' : '')}
                        style={{ width: width, height: height }} 
                        width={width} 
                        height={height}
                    />
                </MediaQuery>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResized);
        this.windowResized();
    }

    // Autoscale the dimensions of the maze so other components can access these dimensions.
    mazeDimsChanged() {
        const { MAX_WIDTH, setMazeDims } = this.props;

        const width     = this.canvasContainer.current.clientWidth  - Maze.PAD.X;

        // Set height equal to the width of the browser width meets certain requirements.
        const height    = (window.innerWidth > MAX_WIDTH)                           ?
                        this.canvasContainer.current.clientHeight   - Maze.PAD.Y    :
                        this.canvasContainer.current.clientWidth    - Maze.PAD.Y;

        setMazeDims(width, height);
        return { width, height };
    }

    componentDidUpdate(prevProps) {
        const { mazeDims, width, height, density } = this.props;
        var ctx = this.canvas.current.getContext('2d');

        // Change for changes in viewport scale via browser resizing
        if (mazeDims.width !== prevProps.mazeDims.width || mazeDims.height !== prevProps.mazeDims.height) {
            this.cancelAnimation(ctx);
            this.mazeDimsChanged();
            this.setState({ maze: null });
        }

        // Check for changes in width, height, or density via the sliders
        else if (width.val !== prevProps.width.val || height.val !== prevProps.height.val || density.val !== prevProps.density.val) {
            this.cancelAnimation(ctx);
            this.setState({ maze: null });
        }

        const { generateClicked, solveClicked, skipClicked, dlClicked, clearHandlers, downloadClicked } = this.props;

        
        if      (generateClicked)   { this.generateBtnClicked(ctx) }
        else if (solveClicked)      { this.solveBtnClicked(ctx); }
        else if (skipClicked)       { this.skipBtnClicked(ctx); }
        else if (dlClicked)         { this.downloadBtnClicked(ctx); }

        clearHandlers();
        downloadClicked(false);
    }

    // Calculate a random starting point and ending point based on the opposite of the entrance given.
    // Ex: Given "Top" will return a random cell on the top of the maze with an exit on the bottom.
    static getMazeStartAndFinish(entrance, xCellLen, yCellLen) {
        switch (entrance) {
            case "Top":
                return {
                    start   : [Math.floor(Math.random() * xCellLen), yCellLen - 1],
                    end     : [Math.floor(Math.random() * xCellLen), 0]
                }
            case "Bottom":
                return {
                    start   : [Math.floor(Math.random() * xCellLen), 0],
                    end     : [Math.floor(Math.random() * xCellLen), yCellLen - 1]
                }
            case "Right":
                return {
                    start   : [xCellLen - 1, Math.floor(Math.random() * yCellLen)],
                    end     : [0, Math.floor(Math.random() * yCellLen)]
                }
            case "Left":
            default:
                return {
                    start   : [0, Math.floor(Math.random() * yCellLen)],
                    end     : [xCellLen - 1, Math.floor(Math.random() * yCellLen)]
                }
        }
    }

    generateMaze() {
        const {width, height, entrance} = this.props;
        let mz = new maze(width.val, height.val);
        const { start, end } = Maze.getMazeStartAndFinish(entrance, width.val, height.val);
        mz.generate(start[0], start[1], end[0], end[1]);
        return mz
    }

    downloadBtnClicked(ctx) {
        var link = document.createElement('a');
        link.setAttribute('download', 'Maze.png');
        link.setAttribute('href', this.canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click(); 
    }

    
    generateBtnClicked(ctx) {
        const {animationEnabled} = this.props;

        // Always generate a new maze when the generate button is clicked
        let mz = this.generateMaze();
        this.setState({ maze: mz }, (self=this) => { self.renderMaze(ctx, animationEnabled); });
    }

    solveBtnClicked(ctx) {
        const {animationEnabled} = this.props;

        // Only generate a new solution if there is no current maze data
        if (this.state.maze === null) {
            let mz = this.generateMaze();
            this.setState({ maze: mz }, (self=this) => {
                self.renderSolution(ctx, animationEnabled);
            });
        }
        else {
            this.renderSolution(ctx, animationEnabled);
        }
    }

    skipBtnClicked(ctx) {
        if      (this.state.currentGeneration === 'maze')       { this.renderMaze(ctx, false) }
        else if (this.state.currentGeneration === 'solution')   { this.renderSolution(ctx, false) }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized);
    }

    // Clear canvas and cancel any current animation
    cancelAnimation(ctx) {
        if (this.animationTimer !== null) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }

        this.clearCanvas(ctx);
        
        if (this.state.currentFrame !== null) {
            cancelAnimationFrame(this.state.currentFrame);
            this.setState({ currentFrame: null });
        } 
    }

    // Clear the canvas
    clearCanvas(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    }

    // Draw a cell with width and height based off of current density
    drawCell(ctx, cell) {
        let density = this.props.density.val;
        let swcX = density * cell.index.row;
        let swcY = density * (this.props.height.val - cell.index.column);
        
        ctx.strokeStyle = 'black';
        ctx.beginPath();

        // Check if the cell being checked is the start or end of the maze and color the cell appropriately.
        if ('end' in cell || 'start' in cell) {
            if ('start' in cell)    { ctx.fillStyle = 'green'; }
            else                    { ctx.fillStyle = 'red'; }

            let cenX = (density * cell.index.row) + (density / 2);
            let cenY = (density * (this.props.height.val - cell.index.column)) - (density / 2);

            ctx.arc(cenX, cenY, density / 4, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }

        else {
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

        ctx.closePath();
    }

    // Same as drawCell except looks at available neighbors to determine what path to draw
    drawCellSolution(ctx, cell) {
        if (this.state.maze === null) { return; }

        ctx.strokeStyle = 'green';
        ctx.beginPath();

        let density = this.props.density.val;
        let cenX = (density * cell.index.row) + (density / 2);
        let cenY = (density * (this.props.height.val - cell.index.column)) - (density / 2);

        const generated = this.state.maze.generated;

        // Adjacent neighbors
        let south   = new GridIndex(cell.index.row, cell.index.column - 1);
        let west    = new GridIndex(cell.index.row - 1, cell.index.column);
        let north   = new GridIndex(cell.index.row, cell.index.column + 1);
        let east    = new GridIndex(cell.index.row + 1, cell.index.column);

        // Check if a certain neighbor is part of the solution and whether to draw a solution path to it
        if (!cell.down.enabled && this.state.maze.validCellIndex(south) && 'solved' in generated[south.row][south.column]) {
            ctx.moveTo(cenX, cenY);
            ctx.lineTo(cenX, cenY + (density / 2));
            ctx.stroke();
        }
        
        if (!cell.left.enabled && this.state.maze.validCellIndex(west) && 'solved' in generated[west.row][west.column]) {
            ctx.moveTo(cenX, cenY);
            ctx.lineTo(cenX - (density / 2), cenY);
            ctx.stroke();
        }

        if (!cell.up.enabled && this.state.maze.validCellIndex(north) && 'solved' in generated[north.row][north.column]) {
            ctx.moveTo(cenX, cenY);
            ctx.lineTo(cenX, cenY - (density / 2));
            ctx.stroke();
        } 
        
        if (!cell.right.enabled && this.state.maze.validCellIndex(east) && 'solved' in generated[east.row][east.column]) {
            ctx.moveTo(cenX, cenY);
            ctx.lineTo(cenX + (density / 2), cenY);
            ctx.stroke();
        }

        ctx.closePath();
    }

    // Recursive call to draw frames in a series
    renderCells(ctx, cells, animated, draw, i=0) {
        let self = this;
 
        if (i < cells.length) {
            // Pretty ugly, but currently the only nice way to set state, control FPS, and use requestAnimationFrame 
            // all at the same time.
            if (animated) {
                draw(ctx, cells[i]);
                self.animationTimer = setTimeout(() => {
                    self.setState({
                        currentFrame: requestAnimationFrame(() => { self.renderCells(ctx, cells, animated, draw, i + 1)})
                    }) 
                }, 1000 / self.props.framerate);
            } 
            else {
                // We run through each cell in the frame and draw it instead of using recursion if animation is disabled.
                // For large mazes, using recursion can exceed the maximum call stack size
                // which isn't a problem with requestAnimationFrame, but is a problem without it.
                cells.forEach(cell => {
                    draw(ctx, cell);
                });
                self.props.generating(false);
                
                // Old method (only works with small mazes)
                // self.renderCells(ctx, cells, animated, draw, i + 1);
            } 
        }
        else {
            self.props.generating(false);
        }
    }

    // Render the maze without a solution
    renderMaze(ctx, animated=false) {
        this.cancelAnimation(ctx);
        if (this.state.maze === null) { return; }

        this.setState({ currentGeneration: 'maze' }, (self=this) => {
            self.props.generating(true);
            self.renderCells(ctx, self.state.maze.ordered, animated, self.drawCell);
        });
        
    }

    // Render the maze with a solution
    renderSolution(ctx, animated=false) {
        this.cancelAnimation(ctx);
        if (this.state.maze === null) { return; }

        this.setState({ currentGeneration: 'solution' }, (self=this) => {
            self.renderCells(ctx, self.state.maze.ordered, false, self.drawCell);
            self.props.generating(true);
            self.renderCells(ctx, self.state.maze.orderedSolution, animated, self.drawCellSolution);
        });
    }

    // Rescale maze dimensions on window resize
    windowResized() {
        const {width, height} = this.mazeDimsChanged();
        
        const density   = this.props.density.val;
        const maxWidth  = Math.floor(width / density);
        const maxHeight = Math.floor(height/ density);

        this.props.setWidth(maxWidth, maxWidth);
        this.props.setHeight(maxHeight, maxHeight);
    }
}

const mapStateToProps = function(state) {
    return {
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH,

        width: state.dimensions.width,
        height: state.dimensions.height,
        density: state.dimensions.density,
        mazeDims: state.dimensions.mazeDims,

        generateClicked: state.generation.generateBtn,
        solveClicked: state.generation.solveBtn,
        skipClicked: state.generation.skipBtn,
        entrance: state.generation.entrance,

        framerate: state.animation.framerate.val,
        animationEnabled: state.animation.enabled,

        dlClicked: state.download.clicked
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth        : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight       : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
        setMazeDims     : (width, height)       => { dispatch(setMazeDims(width, height))},
        startGeneration : ()                    => { dispatch(generate()) },
        clearHandlers   : ()                    => { dispatch(clear()) },
        generating      : (status)              => { dispatch(generating(status)) },
        downloadClicked : (click)               => { dispatch(dlHandler(click)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);