import React from 'react';
import { Container } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight } from '../../actions/Dimensions.actions';
import MediaQuery from 'react-responsive';

class Maze extends React.Component {
    constructor(props) {
        super(props);
        this.windowResized = this.windowResized.bind(this);
        this.mazeTopContainer = React.createRef();
        this.mazeContainer = React.createRef();
    }

    render() {
        return(
            <div className="w-100 d-flex border-bottom border-dark" ref={this.mazeTopContainer}>
                <MediaQuery minWidth={this.props.MIN_WIDTH}>
                    <Container id="mazeContainer" ref={this.mazeContainer} style={{
                        width: this.props.width.val.toString() + 'px',
                        height: this.props.height.val.toString() + 'px'
                    }}>
                    </Container>
                </MediaQuery>
                <MediaQuery maxWidth={this.props.MAX_WIDTH}>
                    <Container className="mt-3" id="mazeContainer" ref={this.mazeContainer} style={{
                        width: this.props.width.val.toString() + 'px',
                        height: this.props.width.val.toString() + 'px'
                    }}>
                    </Container>
                </MediaQuery>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResized);
        this.windowResized();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized);
    }

    windowResized() {
        const padX = (this.props.PAD_X * 2);
        const padY = (this.props.PAD_Y * 2);
        const width = this.mazeTopContainer.current.clientWidth;
        const height = this.mazeTopContainer.current.clientHeight;
        const newWidth = Math.floor((width - padX) / this.props.density.min) * this.props.density.min
        const newHeight = Math.floor((height - padY) / this.props.density.min) * this.props.density.min

        this.props.setWidth(newWidth, newWidth, this.props.width.min);
        this.props.setHeight(newHeight, newHeight, this.props.height.min);
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height,
        density: state.dimensions.density,
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH,
        PAD_X: state.CONSTANTS.MAZE_PAD.X,
        PAD_Y: state.CONSTANTS.MAZE_PAD.Y,
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);