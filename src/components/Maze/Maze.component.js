import React from 'react';
import { Canvas } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, setMazeDims } from '../../actions/Dimensions.actions';
import MediaQuery from 'react-responsive';
import maze from '../../modules/maze/Maze';

class Maze extends React.Component {
    static PAD = {
        X: 40,
        Y: 40
    };

    constructor(props) {
        super(props);
        this.mClicked = this.mClicked.bind(this);
        this.windowResized = this.windowResized.bind(this);
        this.canvasContainer = React.createRef();
        this.canvas = React.createRef();
    }

    render() {
        const density = this.props.density.val;
        const width = (this.props.width.val * density);
        const height = (this.props.height.val * density);

        return(
            <div className="w-100 d-flex border-bottom border-dark" ref={this.canvasContainer} 
                onClick={() => {
                    this.mClicked(this.canvas, this.props.width.val, this.props.height.val, density)
                }}>
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

    componentDidUpdate() {
        const width = this.canvasContainer.current.clientWidth - Maze.PAD.X;
        const height = (window.innerWidth > this.props.MAX_WIDTH) ?
                        this.canvasContainer.current.clientHeight - Maze.PAD.Y :
                        this.canvasContainer.current.clientWidth - Maze.PAD.Y;

        this.props.setMazeDims(width, height);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized);
    }

    mClicked(canvas, width, height, density) {
        var m = new maze(width, height);
        var generated = m.generate(0, 0, 1, 1);

        var ctx = canvas.current.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.beginPath();

        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';

        generated.forEach(cell => {
            let swcX = density * cell.index.row;
            let swcY = density * (this.props.height.val - cell.index.column)
            
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
            
        });
    }

    windowResized() {
        const width = this.canvasContainer.current.clientWidth - Maze.PAD.X;
        const height = (window.innerWidth > this.props.MAX_WIDTH) ?
                        this.canvasContainer.current.clientHeight - Maze.PAD.Y :
                        this.canvasContainer.current.clientWidth - Maze.PAD.Y;
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
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
        setMazeDims : (width, height)       => { dispatch(setMazeDims(width, height))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);