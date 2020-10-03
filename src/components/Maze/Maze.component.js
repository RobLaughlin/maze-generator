import React from 'react';
import { Container } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight } from '../../actions/Dimensions.actions';
import MediaQuery from 'react-responsive';

class Maze extends React.Component {
    static PAD = {
        X: 20,
        Y: 20
    };

    constructor(props) {
        super(props);
        this.windowResized = this.windowResized.bind(this);
        this.mazeTopContainer = React.createRef();
        this.mazeContainer = React.createRef();
    }

    render() {
        return(
            <div className="w-100 d-flex" ref={this.mazeTopContainer}>
                <MediaQuery minWidth={600}>
                    <Container id="mazeContainer" ref={this.mazeContainer} style={{
                        width: this.props.width.val.toString() + 'px',
                        height: this.props.height.val.toString() + 'px'
                    }}>
                    </Container>
                </MediaQuery>
                <MediaQuery maxWidth={599}>
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
        const padX = (Maze.PAD.X * 2);
        const padY = (Maze.PAD.Y * 2);
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
        density: state.dimensions.density
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);