import React from 'react';
import { Container } from './Maze.styled';
import { connect } from 'react-redux';
import { changeWidth, changeHeight } from '../../actions/Dimensions.actions';

class Maze extends React.Component {
    static PAD = {
        X: 20,
        Y: 20
    };

    constructor(props) {
        super(props);
        this.windowResized = this.windowResized.bind(this);
        this.mazeRef = React.createRef();
    }

    render() {
        return(
            <div className="w-100 d-flex" ref={this.mazeRef}>
                <Container id="mazeContainer" style={{
                    width: this.props.width.val.toString() + 'px',
                    height: this.props.height.val.toString() + 'px'
                }}>
                </Container>
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
        const width = this.mazeRef.current.clientWidth;
        const height = this.mazeRef.current.clientHeight;
        const padX = (Maze.PAD.X * 2);
        const padY = (Maze.PAD.Y * 2);

        this.props.setWidth(width - padX, width - padX, 50);
        this.props.setHeight(height - padY, height - padY, 50);
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Maze);